import { NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import Razorpay from 'razorpay';

const db = getFirestore(app);

// Initialize Razorpay using ONLY environment variables for security
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.text();
    const data = JSON.parse(body);
    
    const { items, shipping, total, amount, receipt } = data;
    
    // Validate required fields
    // Convert to paise (Razorpay expects amount in smallest currency unit)
    const orderAmount = amount || (total * 100); 
    const orderReceipt = receipt || `order_${Date.now()}`;
    
    if (!orderAmount || orderAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount', details: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }
    
    // Create order with Razorpay
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(orderAmount), // Ensure integer paise
      currency: 'INR',
      receipt: orderReceipt,
      notes: {
        customerName: `${shipping?.firstName || ''} ${shipping?.lastName || ''}`.trim(),
        customerEmail: shipping?.email || '',
        itemCount: items?.length || 0,
      },
    });

    // Create order document in Firestore with pending status
    const orderRef = await addDoc(collection(db, 'orders'), {
      items: items || [],
      shipping: shipping || {},
      total: total || (amount / 100),
      status: 'pending',
      paymentStatus: 'pending',
      razorpayOrderId: razorpayOrder.id,
      createdAt: serverTimestamp(),
      currency: 'INR',
    });

    // Return the created Razorpay order to the client
    return NextResponse.json(razorpayOrder);

  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);

    // Check if it's a credentials error (often happens if env vars are missing)
    if (error.message && (
        error.message.includes('key_id') || 
        error.message.includes('key_secret') || 
        error.message.includes('authentication')
      )) {
      return NextResponse.json(
        { 
          error: 'Invalid Razorpay credentials', 
          details: 'Please check your Razorpay API keys in environment variables',
          credentialsMissing: true
        },
        { status: 401 }
      );
    }
    
    // Return generic error for other issues
    return NextResponse.json(
      { 
        error: 'Failed to create Razorpay order', 
        details: error.message,
        type: error.constructor.name
      },
      { status: error.statusCode || 500 }
    );
  }
}