import { NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../../../lib/firebase';

const db = getFirestore(app);

export async function POST(request) {
  try {
    const body = await request.text();
    const data = JSON.parse(body);
    
    // Generate unique session ID
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(-6)}`;
    
    // Create checkout session document
    const sessionRef = await addDoc(collection(db, 'checkout_sessions'), {
      sessionId: sessionId,
      items: data.items || [],
      shippingInfo: data.shippingInfo || {},
      paymentMethod: data.paymentMethod || '',
      subtotal: data.subtotal || 0,
      shippingCost: data.shippingCost || 0,
      taxAmount: data.taxAmount || 0,
      total: data.total || 0,
      currency: 'INR',
      status: 'active', // active, completed, expired
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    });

    return NextResponse.json({
      sessionId: sessionId,
      status: 'created',
      message: 'Checkout session created successfully'
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', status: 500 },
      { status: 500 }
    );
  }
}