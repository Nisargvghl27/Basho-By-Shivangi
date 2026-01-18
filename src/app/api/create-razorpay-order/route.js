import { NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import Razorpay from 'razorpay';

const db = getFirestore(app);

export async function POST(request) {
  try {
    // Check environment variables first
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Missing Razorpay environment variables:', {
        hasKeyId: !!process.env.RAZORPAY_KEY_ID,
        hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET
      });
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          details: 'Razorpay credentials not configured',
          credentialsMissing: true
        },
        { status: 500 }
      );
    }

    // Initialize Razorpay inside the handler to use latest env vars
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Use request.json() instead of request.text() + JSON.parse()
    const data = await request.json();
    
    const { items, shipping, total, amount, receipt } = data;
    
    // Enhanced input validation
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body', details: 'Request must be a valid JSON object' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid items', details: 'Items array is required and cannot be empty' },
        { status: 400 }
      );
    }

    if (!shipping || typeof shipping !== 'object') {
      return NextResponse.json(
        { error: 'Invalid shipping', details: 'Shipping information is required' },
        { status: 400 }
      );
    }

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
    console.error('Razorpay Order Creation Error:', {
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
      type: error.constructor.name
    });

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
    
    // Return detailed error for debugging
    return NextResponse.json(
      { 
        error: 'Failed to create Razorpay order', 
        details: error.message,
        type: error.constructor.name,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: error.statusCode || 500 }
    );
  }
}