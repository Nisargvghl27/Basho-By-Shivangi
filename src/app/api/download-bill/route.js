import { NextResponse } from 'next/server';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import { generatePdfInvoice } from '../../../utils/generatePdfInvoice';

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

    // Generate PDF using jsPDF utility
    const pdf = generatePdfInvoice(orderId, orderData);

    // Generate PDF Buffer
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
