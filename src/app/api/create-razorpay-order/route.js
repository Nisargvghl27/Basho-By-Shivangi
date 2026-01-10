import { NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import Razorpay from 'razorpay';

const db = getFirestore(app);

// Initialize Razorpay with hardcoded test credentials for development
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_S2B1iwpQLEtmSM',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'wsl3TkC3BRcDZdRxGqKxu8J6',
});

export async function POST(request) {
  try {
    const body = await request.text();
    const data = JSON.parse(body);
    
    const { items, shipping, total, amount, receipt } = data;
    
    // Validate required fields
    const orderAmount = amount || total * 100; // Convert to paise
    const orderReceipt = receipt || `order_${Date.now()}`;
    
    if (!orderAmount || orderAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount', details: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }
    
    let razorpayOrder;

// Create order with real Razorpay (no fallback)
razorpayOrder = await razorpay.orders.create({
  amount: Math.round(orderAmount), // Ensure integer paise
  currency: 'INR',
  receipt: orderReceipt,
  notes: {
    customerName: `${shipping?.firstName || ''} ${shipping?.lastName || ''}`.trim(),
    customerEmail: shipping?.email || '',
    itemCount: items?.length || 0,
  },
});

    // Create order in Firestore
    const orderRef = await addDoc(collection(db, 'orders'), {
      items: items || [],
      shipping: shipping || {},
      total: total || amount / 100,
      status: 'pending',
      paymentStatus: 'pending',
      razorpayOrderId: razorpayOrder.id,
      createdAt: serverTimestamp(),
      currency: 'INR',
    });

    // Return the real Razorpay order
    return NextResponse.json(razorpayOrder);
  } catch (error) {
    // Check if it's a credentials error
    if (error.message.includes('key_id') || error.message.includes('key_secret') || error.message.includes('authentication')) {
      return NextResponse.json(
        { 
          error: 'Invalid Razorpay credentials', 
          details: 'Please check your Razorpay API keys',
          credentialsMissing: true
        },
        { status: 401 }
      );
    }
    
    // Return specific error information
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
