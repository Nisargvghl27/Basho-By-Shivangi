import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, updateDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import crypto from 'crypto';
import nodemailer from 'nodemailer'; // 1. Import Nodemailer

const db = getFirestore(app);

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();
    console.log('Payment verification request:', { razorpay_order_id, razorpay_payment_id });
    
    // Verify Razorpay signature
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

    // Find order in Firestore
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
    const orderData = orderDoc.data(); // 2. Get existing order data (items, shipping info)

    // Update order status in Firestore
    await updateDoc(doc(db, 'orders', orderDoc.id), {
      status: 'completed',
      paymentStatus: 'paid',
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paidAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // 3. Send Bill/Invoice Email Logic
    try {
      // Configure Transporter (Same as your welcome email)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Generate Items HTML List
      const itemsHtml = orderData.items.map(item => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; color: #555;">${item.name} <span style="font-size: 12px; color: #888;">(x${item.quantity})</span></td>
          <td style="padding: 10px; text-align: right; color: #555;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
        </tr>
      `).join('');

      // Calculate totals (Handling cases where total might be stored differently)
      const totalAmount = orderData.total || 0;
      const shippingCost = totalAmount < 1000 ? 50 : 0; // Or fetch from orderData if saved
      // Note: Assuming 'total' in DB includes shipping/tax. You can adjust math based on your DB structure.

      // Define Email Content
      const mailOptions = {
        from: `"Basho Pottery" <${process.env.EMAIL_USER}>`,
        to: orderData.shipping.email, // Send to the shipping email provided in checkout
        subject: `Order Confirmed - #${orderDoc.id.slice(0, 8).toUpperCase()}`,
        html: `
          <div style="font-family: 'Georgia', serif; color: #2c2c2c; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
            
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #A0522D; padding-bottom: 20px;">
              <h1 style="color: #A0522D; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; margin: 0;">Basho Pottery</h1>
              <p style="font-size: 14px; color: #888; margin-top: 5px;">Payment Receipt</p>
            </div>

            <div style="background-color: white; padding: 30px; border-radius: 4px;">
              <p style="color: #555; font-size: 16px;">Hi ${orderData.shipping.firstName},</p>
              <p style="color: #555; font-size: 16px;">Thank you for your purchase! Your payment has been successfully verified.</p>
              
              <div style="margin-top: 25px;">
                <h3 style="color: #333; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Order Summary</h3>
                <p style="font-size: 14px; color: #888;">Order ID: #${orderDoc.id.toUpperCase()}</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  ${itemsHtml}
                </table>

                <div style="margin-top: 15px; text-align: right;">
                  <p style="margin: 5px 0; font-size: 18px; font-weight: bold; color: #A0522D;">Total: ₹${totalAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div style="margin-top: 30px; background-color: #f5f5f5; padding: 15px; border-radius: 4px;">
                <h4 style="margin: 0 0 10px 0; color: #333;">Shipping To:</h4>
                <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">
                  ${orderData.shipping.address}<br>
                  ${orderData.shipping.city}, ${orderData.shipping.state} - ${orderData.shipping.zipCode}<br>
                  Phone: ${orderData.shipping.phone}
                </p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #aaa;">
              <p>If you have any questions, reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} Basho Pottery. All rights reserved.</p>
            </div>
          </div>
        `,
      };

      // Send Mail
      await transporter.sendMail(mailOptions);
      console.log('Bill sent successfully to:', orderData.shipping.email);

    } catch (emailError) {
      // Non-blocking error handling: If email fails, don't fail the payment verification
      console.error('Failed to send bill email:', emailError);
    }

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