import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, updateDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import crypto from 'crypto';

const db = getFirestore(app);

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();
    console.log('Payment verification request:', { razorpay_order_id, razorpay_payment_id });
    
    // Verify Razorpay signature using your secret
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      console.error('Invalid payment signature');
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Find and update order in Firestore
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('razorpayOrderId', '==', razorpay_order_id));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const orderDoc = querySnapshot.docs[0];
    await updateDoc(doc(db, 'orders', orderDoc.id), {
      status: 'completed',
      paymentStatus: 'paid',
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paidAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ 
      success: true,
      orderId: orderDoc.id,
      paymentId: razorpay_payment_id
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
