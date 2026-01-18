import { NextResponse } from 'next/server';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import jsPDF from 'jspdf';

const db = getFirestore(app);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const userEmail = searchParams.get('email');

    if (!orderId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing orderId or email' },
        { status: 400 }
      );
    }

    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const orderData = orderSnap.data();

    if (orderData.shipping?.email !== userEmail) {
      return NextResponse.json(
        { error: 'Unauthorized: Email does not match order' },
        { status: 403 }
      );
    }

    // Generate PDF using jsPDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 15;

    // Header
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(24);
    pdf.text('INVOICE', 15, yPosition);

    yPosition += 15;
    pdf.setFontSize(10);
    pdf.setFont('Helvetica', 'normal');
    pdf.text(`Order ID: ${orderId}`, 15, yPosition);
    yPosition += 6;
    
    const orderDate = orderData.createdAt?.toDate ? orderData.createdAt.toDate() : new Date();
    pdf.text(`Date: ${orderDate.toLocaleDateString('en-IN')}`, 15, yPosition);
    yPosition += 6;
    
    pdf.text(`Payment Status: ${orderData.paymentStatus || 'Completed'}`, 15, yPosition);
    yPosition += 10;

    // Divider
    pdf.setDrawColor(160, 82, 45);
    pdf.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 8;

    // Company Info
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Basho Pottery', 15, yPosition);
    yPosition += 6;
    
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Est. 2019 | Handcrafted Pottery', 15, yPosition);
    yPosition += 5;
    pdf.text('Email: bashothelabel@gmail.com', 15, yPosition);
    yPosition += 10;

    // Bill To Section
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text('Bill To:', 15, yPosition);
    yPosition += 6;
    
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`${orderData.shipping?.firstName || ''} ${orderData.shipping?.lastName || ''}`, 15, yPosition);
    yPosition += 5;
    pdf.text(orderData.shipping?.email || '', 15, yPosition);
    yPosition += 5;
    pdf.text(orderData.shipping?.phone || '', 15, yPosition);
    yPosition += 10;

    // Ship To Section
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text('Ship To:', pageWidth / 2, yPosition - 10);
    
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`${orderData.shipping?.address || ''}`, pageWidth / 2, yPosition - 4);
    const cityLine = `${orderData.shipping?.city || ''}, ${orderData.shipping?.state || ''} - ${orderData.shipping?.zipCode || ''}`;
    pdf.text(cityLine, pageWidth / 2, yPosition + 1);
    pdf.text(`${orderData.shipping?.country || 'India'}`, pageWidth / 2, yPosition + 6);
    yPosition += 15;

    // Table Header
    pdf.setFillColor(160, 82, 45);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(10);
    
    pdf.rect(15, yPosition - 5, pageWidth - 30, 6, 'F');
    pdf.text('Item', 18, yPosition);
    pdf.text('Qty', 130, yPosition);
    pdf.text('Unit Price', 150, yPosition);
    pdf.text('Total', pageWidth - 30, yPosition, { align: 'right' });
    
    yPosition += 8;
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(9);

    // Items
    let subtotal = 0;
    (orderData.items || []).forEach((item, index) => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      subtotal += itemTotal;

      const itemName = item.name || item.title || 'Unknown Item';
      pdf.text(itemName, 18, yPosition);
      pdf.text(String(item.quantity || 0), 130, yPosition);
      pdf.text(`₹${(item.price || 0).toFixed(2)}`, 150, yPosition);
      pdf.text(`₹${itemTotal.toFixed(2)}`, pageWidth - 30, yPosition, { align: 'right' });
      yPosition += 5;
    });

    yPosition += 5;
    pdf.setDrawColor(160, 82, 45);
    pdf.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 8;

    // Totals Section
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(10);
    
    const shipping = orderData.shipping_cost || 0;
    const tax = orderData.tax || (subtotal * 0.18);
    const total = orderData.total || (subtotal + shipping + tax);

    pdf.text('Subtotal:', pageWidth - 70, yPosition);
    pdf.text(`₹${subtotal.toFixed(2)}`, pageWidth - 30, yPosition, { align: 'right' });
    yPosition += 6;

    pdf.text('Shipping:', pageWidth - 70, yPosition);
    pdf.text(`₹${shipping.toFixed(2)}`, pageWidth - 30, yPosition, { align: 'right' });
    yPosition += 6;

    pdf.text('Tax (18% GST):', pageWidth - 70, yPosition);
    pdf.text(`₹${tax.toFixed(2)}`, pageWidth - 30, yPosition, { align: 'right' });
    yPosition += 8;

    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(160, 82, 45);
    pdf.text('Total:', pageWidth - 70, yPosition);
    pdf.text(`₹${total.toFixed(2)}`, pageWidth - 30, yPosition, { align: 'right' });

    // Footer
    yPosition = pageHeight - 20;
    pdf.setTextColor(100, 100, 100);
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text('Thank you for your purchase!', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 4;
    pdf.text('For inquiries, contact: bashothelabel@gmail.com', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 4;
    pdf.text(`© ${new Date().getFullYear()} Basho Pottery. All rights reserved.`, pageWidth / 2, yPosition, { align: 'center' });

    // Generate PDF
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice_${orderId}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generating bill:', error);
    return NextResponse.json(
      { error: 'Failed to generate bill', details: error.message },
      { status: 500 }
    );
  }
}
