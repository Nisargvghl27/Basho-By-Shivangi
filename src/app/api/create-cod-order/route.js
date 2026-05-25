import { NextResponse } from 'next/server';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import nodemailer from 'nodemailer';
import { generatePdfInvoice } from '../../../utils/generatePdfInvoice';

const db = getFirestore(app);

export async function POST(request) {
  try {
    const { items, shipping, total, subtotal, tax, shippingCost, totalWeight, paymentMethod, userId } = await request.json();
    
    // Create COD order in Firestore
    const orderRef = await addDoc(collection(db, 'orders'), {
      items: items || [],
      shipping: shipping || {},
      total: total || 0,
      subtotal: subtotal !== undefined ? subtotal : (items || []).reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0),
      shippingCost: shippingCost || 0,
      tax: tax !== undefined ? tax : 0,
      totalWeight: totalWeight || 0,
      paymentMethod: paymentMethod || 'cod',
      status: 'confirmed', // COD orders are confirmed immediately
      paymentStatus: 'pending', // Payment pending until delivery
      createdAt: serverTimestamp(),
      currency: 'INR',
      userId: userId || null,
      notes: {
        customerName: `${shipping?.firstName || ''} ${shipping?.lastName || ''}`,
        customerEmail: shipping?.email || '',
        customerPhone: shipping?.phone || '',
        paymentType: 'Cash on Delivery',
      },
    });

    // Send Bill/Invoice Email Logic for COD
    try {
      const isPlaceholderUser = process.env.EMAIL_USER === 'your_gmail@gmail.com';
      const isPlaceholderPass = process.env.EMAIL_PASS === 'your_16_char_app_password';
      
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || isPlaceholderUser || isPlaceholderPass) {
        console.warn('COD Bill email not sent: Email service is not configured or using placeholders in .env.local');
      } else if (shipping?.email) {
        // Configure Transporter (Same as your welcome email)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const dateObj = new Date();
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          year: 'numeric', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });

        const shippingName = `${shipping?.firstName || 'Guest'} ${shipping?.lastName || ''}`.trim();
        const shippingEmail = shipping?.email || 'No Email';
        const shippingPhone = shipping?.phone || 'No Phone';
        const shippingAddressString = [
          shipping?.address,
          shipping?.city,
          shipping?.state ? `${shipping.state} - ${shipping.zipCode || ''}` : shipping?.zipCode,
          shipping?.country || 'India'
        ].filter(Boolean).join(", ");

        const notesText = shipping?.notes || '';
        const notesHtml = notesText 
          ? `<p style="margin: 6px 0 0 0; font-size: 12px; color: #4b5563; border-top: 1px solid #e5e7eb; padding-top: 6px;"><strong>Note:</strong> ${notesText}</p>` 
          : '';

        const compactItemsHtml = (items || []).map(item => `
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

        const shippingCostVal = shippingCost || 0;
        const taxVal = tax !== undefined ? tax : ((subtotal !== undefined) ? tax || 0 : (total - shippingCostVal) * 0.18);
        const subtotalVal = subtotal !== undefined ? subtotal : (total - shippingCostVal - taxVal);

        // Generate PDF using jsPDF utility
        const orderDocData = {
          items: items || [],
          shipping: shipping || {},
          total: total || 0,
          subtotal: subtotalVal,
          shippingCost: shippingCostVal,
          tax: taxVal,
          paymentMethod: paymentMethod || 'cod',
          createdAt: { toDate: () => dateObj },
          status: 'confirmed',
          notes: notesText
        };
        const pdf = generatePdfInvoice(orderRef.id, orderDocData);
        const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

        const mailOptions = {
          from: `"Basho Pottery" <${process.env.EMAIL_USER}>`,
          to: shipping.email,
          subject: `Order Confirmed - #${orderRef.id.slice(0, 8).toUpperCase()}`,
          attachments: [
            {
              filename: `Invoice_${orderRef.id.slice(0, 8).toUpperCase()}.pdf`,
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
                              <p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">ID: ${orderRef.id.toUpperCase()}</p>
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
                                <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563; text-transform: capitalize;">Method: Cash on Delivery (COD)</p>
                                <p style="margin: 0 0 4px 0; font-size: 13px; color: #A65D3D; font-weight: 600;">Total: ₹${(total || 0).toLocaleString('en-IN')}</p>
                                <p style="margin: 0; font-size: 11px; color: #9ca3af; word-break: break-all;">Ref: cod_${orderRef.id}</p>
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
                                <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563;">Status: Confirmed</p>
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
                                    <td align="right" style="padding-top: 8px; border-top: 1px solid #e5e7eb; font-weight: bold; font-size: 12px; color: #A65D3D;">₹${(total || 0).toLocaleString('en-IN')}</td>
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
                          Please keep the cash ready at the time of delivery.<br>
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
        console.log('COD Bill sent successfully to:', shipping.email);
      }
    } catch (emailError) {
      console.error('Failed to send COD bill email:', emailError);
    }

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
