import { NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../../../lib/firebase';

const db = getFirestore(app);

export async function POST(request) {
  try {
    const { items, shipping, total, paymentMethod } = await request.json();
    
    // Create COD order in Firestore
    const orderRef = await addDoc(collection(db, 'orders'), {
      items: items || [],
      shipping: shipping || {},
      total: total || 0,
      paymentMethod: paymentMethod || 'cod',
      status: 'confirmed', // COD orders are confirmed immediately
      paymentStatus: 'pending', // Payment pending until delivery
      createdAt: serverTimestamp(),
      currency: 'INR',
      notes: {
        customerName: `${shipping?.firstName || ''} ${shipping?.lastName || ''}`,
        customerEmail: shipping?.email || '',
        customerPhone: shipping?.phone || '',
        paymentType: 'Cash on Delivery',
      },
    });

    // Return order details
    const orderData = {
      id: orderRef.id,
      entity: 'order',
      amount: total * 100, // Convert to paise for consistency
      currency: 'INR',
      receipt: `cod_${orderRef.id}`,
      status: 'confirmed',
      payment_method: 'cod',
      created_at: Math.floor(Date.now() / 1000),
    };

    return NextResponse.json(orderData);
  } catch (error) {
    console.error('Error creating COD order:', error);
    return NextResponse.json(
      { error: 'Failed to create COD order' },
      { status: 500 }
    );
  }
}
