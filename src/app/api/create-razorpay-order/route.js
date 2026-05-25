import { NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import Razorpay from 'razorpay';

const db = getFirestore(app);

// Initialize Razorpay lazily using environment variables for security
let razorpay = null;
function getRazorpay() {
  if (razorpay) return razorpay;
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are missing.');
  }

  razorpay = new Razorpay({ key_id, key_secret });
  return razorpay;
}

export async function POST(request) {
  try {
    const body = await request.text();
    const data = JSON.parse(body);

    const { items, shipping, total, amount, receipt, subtotal, tax, shippingCost, totalWeight, userId } = data;

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

    // Try to get Razorpay instance
    let rzpInstance;
    try {
      rzpInstance = getRazorpay();
    } catch (initError) {
      console.error('Razorpay Init Error:', initError);
      return NextResponse.json(
        {
          error: 'Razorpay not configured',
          details: 'Razorpay keys are not configured on the server. Please check your environment variables.'
        },
        { status: 500 }
      );
    }

    // Create order with Razorpay
    const razorpayOrder = await rzpInstance.orders.create({
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
      subtotal: subtotal !== undefined ? subtotal : (items || []).reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0),
      shippingCost: shippingCost || 0,
      tax: tax !== undefined ? tax : 0,
      totalWeight: totalWeight || 0,
      status: 'pending',
      paymentStatus: 'pending',
      razorpayOrderId: razorpayOrder.id,
      createdAt: serverTimestamp(),
      currency: 'INR',
      userId: userId || null,
    });

    // Return the created Razorpay order to the client
    return NextResponse.json(razorpayOrder);

  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);

    // Check if it's a credentials error (often happens if env vars are missing)
    if (error.message && (
      error.message.includes('key_id') ||
      error.message.includes('key_secret') ||
      error.message.includes('authentication') ||
      error.message.includes('credentials')
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