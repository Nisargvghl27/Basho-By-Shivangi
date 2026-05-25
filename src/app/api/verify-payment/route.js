import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, updateDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import crypto from 'crypto';
import nodemailer from 'nodemailer'; // 1. Import Nodemailer
import { generatePdfInvoice } from '../../../utils/generatePdfInvoice';

const db = getFirestore(app);

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();
    console.log('Payment verification request:', { razorpay_order_id, razorpay_payment_id });

    // Verify Razorpay signature
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay secret key (RAZORPAY_KEY_SECRET) is not configured on the server');
      return NextResponse.json(
        { success: false, error: 'Payment gateway not configured', details: 'Razorpay secret key is missing on the server.' },
        { status: 500 }
      );
    }

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

      const dateObj = orderData.createdAt?.toDate ? orderData.createdAt.toDate() : new Date();
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      const shippingName = `${orderData.shipping?.firstName || 'Guest'} ${orderData.shipping?.lastName || ''}`.trim();
      const shippingEmail = orderData.shipping?.email || 'No Email';
      const shippingPhone = orderData.shipping?.phone || 'No Phone';
      const shippingAddressString = [
        orderData.shipping?.address,
        orderData.shipping?.city,
        orderData.shipping?.state ? `${orderData.shipping.state} - ${orderData.shipping.zipCode || ''}` : orderData.shipping?.zipCode,
        orderData.shipping?.country || 'India'
      ].filter(Boolean).join(", ");

      const subtotalVal = orderData.subtotal !== undefined ? orderData.subtotal : (orderData.items || []).reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0);
      const shippingCostVal = orderData.shippingCost !== undefined ? orderData.shippingCost : (orderData.shipping_cost || 0);
      const taxVal = orderData.tax !== undefined ? orderData.tax : (orderData.subtotal !== undefined ? (orderData.tax || 0) : subtotalVal * 0.18);
      const totalAmount = orderData.total || (subtotalVal + shippingCostVal + taxVal);

      const notesText = typeof orderData.notes === 'string' ? orderData.notes : (orderData.notes?.customerNote || orderData.notes?.note || orderData.notes?.message || '');
      const notesHtml = notesText 
        ? `<p style="margin: 6px 0 0 0; font-size: 12px; color: #4b5563; border-top: 1px solid #e5e7eb; padding-top: 6px;"><strong>Note:</strong> ${notesText}</p>` 
        : '';

      const compactItemsHtml = (orderData.items || []).map(item => `
        <tr>
          <td style="padding-bottom: 8px; font-size: 12px; color: #374151;">
            <div style="font-weight: 500;">${item.name || item.title || 'Unknown Item'}</div>
            <div style="font-size: 11px; color: #6b7280;">Qty: ${item.quantity || 1}</div>
          </td>
          <td align="right" valign="top" style="padding-bottom: 8px; font-size: 12px; font-weight: 500; color: #111827;">
            ₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
          </td>
        </tr>
      `).join('');

      // Generate PDF using jsPDF utility
      const orderDocData = {
        items: orderData.items || [],
        shipping: orderData.shipping || {},
        total: totalAmount,
        subtotal: subtotalVal,
        shippingCost: shippingCostVal,
        tax: taxVal,
        paymentMethod: orderData.paymentMethod || 'Razorpay/Online',
        createdAt: orderData.createdAt || { toDate: () => dateObj },
        status: orderData.status || 'completed',
        notes: notesText,
        razorpayPaymentId: orderData.razorpayPaymentId || 'N/A'
      };
      const pdf = generatePdfInvoice(orderDoc.id, orderDocData);
      const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

      const mailOptions = {
        from: `"Basho Pottery" <${process.env.EMAIL_USER}>`,
        to: orderData.shipping.email, // Send to the shipping email provided in checkout
        subject: `Order Confirmed - #${orderDoc.id.slice(0, 8).toUpperCase()}`,
        attachments: [
          {
            filename: `Invoice_${orderDoc.id.slice(0, 8).toUpperCase()}.pdf`,
            content: pdfBuffer,
          }
        ],
        html: `
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f3f4f6; padding: 20px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1f2937;">
            <tr>
              <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #e5e7eb; overflow: hidden; text-align: left; padding: 24px;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding-bottom: 20px; border-bottom: 1px solid #f3f4f6;">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td>
                            <h2 style="margin: 0; font-size: 20px; font-weight: bold; color: #111827;">Order Details</h2>
                            <p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">ID: ${orderDoc.id.toUpperCase()}</p>
                          </td>
                          <td align="right">
                            <span style="font-family: 'Georgia', serif; font-size: 18px; font-weight: bold; color: #A65D3D; letter-spacing: 1px; text-transform: uppercase;">Basho Pottery</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Main Columns Content -->
                  <tr>
                    <td style="padding-top: 24px; padding-bottom: 10px;">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <!-- Left Column -->
                          <td width="48%" valign="top">
                            
                            <!-- Customer Information -->
                            <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px;">Customer Information</h4>
                            <div style="background-color: #f9fafb; border-radius: 8px; padding: 12px; margin-bottom: 16px; border: 1px solid #e5e7eb; min-height: 80px;">
                              <p style="margin: 0 0 4px 0; font-size: 13px; color: #111827; font-weight: 600;">${shippingName}</p>
                              <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563;">${shippingEmail}</p>
                              <p style="margin: 0; font-size: 12px; color: #4b5563;">Phone: ${shippingPhone}</p>
                            </div>

                            <!-- Shipping Address -->
                            <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px;">Shipping Address</h4>
                            <div style="background-color: #f9fafb; border-radius: 8px; padding: 12px; margin-bottom: 16px; border: 1px solid #e5e7eb; min-height: 70px;">
                              <p style="margin: 0; font-size: 12px; color: #4b5563; line-height: 1.4;">${shippingAddressString}</p>
                            </div>

                            <!-- Payment Information -->
                            <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px;">Payment Information</h4>
                            <div style="background-color: #f9fafb; border-radius: 8px; padding: 12px; border: 1px solid #e5e7eb;">
                              <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563; text-transform: capitalize;">Method: ${orderData.paymentMethod || 'Razorpay/Online'}</p>
                              <p style="margin: 0 0 4px 0; font-size: 13px; color: #A65D3D; font-weight: 600;">Total: ₹${(totalAmount || 0).toLocaleString('en-IN')}</p>
                              <p style="margin: 0; font-size: 11px; color: #9ca3af; word-break: break-all;">Ref: ${orderData.razorpayPaymentId || 'N/A'}</p>
                            </div>

                          </td>

                          <!-- Spacer -->
                          <td width="4%">&nbsp;</td>

                          <!-- Right Column -->
                          <td width="48%" valign="top">

                            <!-- Order Information -->
                            <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px;">Order Information</h4>
                            <div style="background-color: #f9fafb; border-radius: 8px; padding: 12px; margin-bottom: 16px; border: 1px solid #e5e7eb;">
                              <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563;">Date: ${formattedDate}</p>
                              <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563;">Status: Completed</p>
                              ${notesHtml}
                            </div>

                            <!-- Items -->
                            <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px;">Items</h4>
                            <div style="background-color: #f9fafb; border-radius: 8px; padding: 12px; border: 1px solid #e5e7eb;">
                              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                ${compactItemsHtml}
                                <tr style="border-top: 1px solid #e5e7eb;">
                                  <td style="padding-top: 8px; font-size: 12px; color: #4b5563;">Subtotal</td>
                                  <td align="right" style="padding-top: 8px; font-size: 12px; color: #111827;">₹${(subtotalVal || 0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr>
                                  <td style="padding-top: 4px; font-size: 12px; color: #4b5563;">Shipping</td>
                                  <td align="right" style="padding-top: 4px; font-size: 12px; color: #111827;">₹${(shippingCostVal || 0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr>
                                  <td style="padding-top: 4px; font-size: 12px; color: #4b5563;">Tax (18% GST)</td>
                                  <td align="right" style="padding-top: 4px; font-size: 12px; color: #111827;">₹${(taxVal || 0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr>
                                  <td style="padding-top: 8px; border-top: 1px solid #e5e7eb; font-weight: bold; font-size: 12px; color: #111827;">Total</td>
                                  <td align="right" style="padding-top: 8px; border-top: 1px solid #e5e7eb; font-weight: bold; font-size: 12px; color: #A65D3D;">₹${(totalAmount || 0).toLocaleString('en-IN')}</td>
                                </tr>
                              </table>
                            </div>

                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer & Call to Action -->
                  <tr>
                    <td align="center" style="padding-top: 24px; border-top: 1px solid #f3f4f6;">
                      <p style="margin: 0; font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.4;">
                        Your payment has been successfully verified.<br>
                        This is an automated order confirmation invoice from Basho Pottery.<br>
                        For any support, please contact: <strong>bashothelabel@gmail.com</strong>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
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