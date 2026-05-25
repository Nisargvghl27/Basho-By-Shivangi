import jsPDF from 'jspdf';

export function generatePdfInvoice(orderId, orderData) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Helper formatting functions
  const formatVal = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  // Extract variables
  const items = orderData.items || [];
  const shipping = orderData.shipping || {};
  const shippingName = `${shipping.firstName || 'Guest'} ${shipping.lastName || ''}`.trim();
  const shippingEmail = shipping.email || 'No Email';
  const shippingPhone = shipping.phone || 'No Phone';
  const shippingAddressString = [
    shipping.address,
    shipping.city,
    shipping.state ? `${shipping.state} - ${shipping.zipCode || ''}` : shipping.zipCode,
    shipping.country || 'India'
  ].filter(Boolean).join(", ");

  const subtotalVal = orderData.subtotal !== undefined ? orderData.subtotal : items.reduce((sum, item) => sum + (parseFloat(item.price || 0) * parseInt(item.quantity || 1, 10)), 0);
  const shippingCostVal = orderData.shippingCost !== undefined ? orderData.shippingCost : (orderData.shipping_cost || 0);
  const taxVal = orderData.tax !== undefined ? orderData.tax : (orderData.subtotal !== undefined ? (orderData.tax || 0) : subtotalVal * 0.18);
  const totalAmountVal = orderData.total || (subtotalVal + shippingCostVal + taxVal);

  const orderDate = orderData.createdAt?.toDate ? orderData.createdAt.toDate() : new Date();
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const deliveryStatus = orderData.status ? (orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)) : 'Confirmed';
  const paymentMethod = orderData.paymentMethod || 'Razorpay/Online';
  const refId = orderData.razorpayPaymentId || (orderData.paymentMethod === 'cod' ? `cod_${orderId}` : 'N/A');

  // --- PAGE HEADER ---
  // Left: Order Details
  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(17, 24, 39); // text-gray-900 (#111827)
  pdf.text('Order Details', 15, 18);

  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(107, 114, 128); // text-gray-500 (#6b7280)
  pdf.text(`ID: ${orderId.toUpperCase()}`, 15, 23);

  // Right: Brand Logo / Name
  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(166, 93, 61); // Clay Accent (#A65D3D)
  pdf.text('BASHO POTTERY', 195, 20, { align: 'right' });

  // Divider line
  pdf.setDrawColor(229, 231, 235); // border-gray-200 (#e5e7eb)
  pdf.setLineWidth(0.5);
  pdf.line(15, 27, pageWidth - 15, 27);

  // --- COLUMN LAYOUT CONFIG ---
  const leftX = 15;
  const rightX = 110;
  const colWidth = 85;

  // Box Drawing Helper
  const drawCard = (x, y, w, h) => {
    pdf.setFillColor(249, 250, 251); // bg-gray-50 (#f9fafb)
    pdf.setDrawColor(229, 231, 235); // border-gray-200
    pdf.roundedRect(x, y, w, h, 2, 2, 'FD');
  };

  // Section Header Helper
  const drawSectionHeader = (text, x, y) => {
    pdf.setFont('Helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(75, 85, 99); // text-gray-600
    pdf.text(text.toUpperCase(), x, y);
  };

  // --- LEFT COLUMN ---

  // 1. Customer Information
  let currentY = 35;
  drawSectionHeader('Customer Information', leftX, currentY);
  drawCard(leftX, currentY + 4, colWidth, 26);
  
  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(9.5);
  pdf.setTextColor(17, 24, 39);
  pdf.text(shippingName, leftX + 4, currentY + 11);
  
  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(75, 85, 99);
  pdf.text(shippingEmail, leftX + 4, currentY + 16);
  pdf.text(`Phone: ${shippingPhone}`, leftX + 4, currentY + 21);

  // 2. Shipping Address
  currentY = 70;
  drawSectionHeader('Shipping Address', leftX, currentY);
  
  // Wrap address text
  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(75, 85, 99);
  const addressLines = pdf.splitTextToSize(shippingAddressString, colWidth - 8);
  const addressCardHeight = Math.max(26, addressLines.length * 4.5 + 8);
  
  drawCard(leftX, currentY + 4, colWidth, addressCardHeight);
  addressLines.forEach((line, index) => {
    pdf.text(line, leftX + 4, currentY + 11 + (index * 4.5));
  });

  // 3. Payment Information
  currentY = 70 + 4 + addressCardHeight + 5;
  drawSectionHeader('Payment Information', leftX, currentY);
  drawCard(leftX, currentY + 4, colWidth, 26);

  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(75, 85, 99);
  pdf.text(`Method: ${paymentMethod}`, leftX + 4, currentY + 11);
  
  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(9.5);
  pdf.setTextColor(166, 93, 61);
  pdf.text(`Total: ₹${formatVal(totalAmountVal)}`, leftX + 4, currentY + 16);

  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(156, 163, 175); // text-gray-400
  pdf.text(`Ref: ${refId}`, leftX + 4, currentY + 22);


  // --- RIGHT COLUMN ---

  // 1. Order Information
  currentY = 35;
  drawSectionHeader('Order Information', rightX, currentY);
  
  let notesLines = [];
  let notesText = typeof orderData.notes === 'string' ? orderData.notes : (orderData.notes?.customerNote || orderData.notes?.note || orderData.notes?.message || '');
  if (notesText && notesText.trim()) {
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(8);
    notesLines = pdf.splitTextToSize(`Notes: ${notesText.trim()}`, colWidth - 8);
  }
  const orderCardHeight = Math.max(26, 16 + (notesLines.length * 4));

  drawCard(rightX, currentY + 4, colWidth, orderCardHeight);
  
  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(75, 85, 99);
  pdf.text(`Date: ${formattedDate}`, rightX + 4, currentY + 11);
  pdf.text(`Status: ${deliveryStatus}`, rightX + 4, currentY + 16);
  if (notesLines.length > 0) {
    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(107, 114, 128);
    notesLines.forEach((line, index) => {
      pdf.text(line, rightX + 4, currentY + 21 + (index * 4));
    });
  }

  // 2. Items List
  currentY = 35 + 4 + orderCardHeight + 5;
  drawSectionHeader('Items', rightX, currentY);
  
  // Calculate Box Height based on Items
  // 12mm header + 8mm per item + 22mm totals + padding
  const itemsBoxHeight = 12 + (items.length * 8) + 24;
  drawCard(rightX, currentY + 4, colWidth, itemsBoxHeight);

  // Table Headers
  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(8.5);
  pdf.setTextColor(17, 24, 39);
  pdf.text('Item', rightX + 4, currentY + 10);
  pdf.text('Qty', rightX + 48, currentY + 10);
  pdf.text('Total', rightX + colWidth - 4, currentY + 10, { align: 'right' });

  // Items List
  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(75, 85, 99);
  
  items.forEach((item, index) => {
    const itemY = currentY + 17 + (index * 8);
    const itemName = item.name || item.title || 'Unknown Item';
    const itemQty = item.quantity || 1;
    const itemTotal = (parseFloat(item.price || 0) * itemQty);
    
    // Draw Item Name (truncate if too long)
    const truncatedName = pdf.getTextWidth(itemName) > 40 
      ? itemName.slice(0, 22) + '...'
      : itemName;
    pdf.text(truncatedName, rightX + 4, itemY);
    pdf.text(String(itemQty), rightX + 48, itemY);
    pdf.text(`₹${formatVal(itemTotal)}`, rightX + colWidth - 4, itemY, { align: 'right' });
  });

  // Totals Section
  const totalsY = currentY + 17 + (items.length * 8) + 2;
  pdf.setDrawColor(229, 231, 235);
  pdf.line(rightX + 4, totalsY - 2, rightX + colWidth - 4, totalsY - 2);

  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(107, 114, 128);
  pdf.text('Subtotal', rightX + 4, totalsY + 3);
  pdf.text(`₹${formatVal(subtotalVal)}`, rightX + colWidth - 4, totalsY + 3, { align: 'right' });

  pdf.text('Shipping', rightX + 4, totalsY + 7);
  pdf.text(`₹${formatVal(shippingCostVal)}`, rightX + colWidth - 4, totalsY + 7, { align: 'right' });

  pdf.text('Tax (18% GST)', rightX + 4, totalsY + 11);
  pdf.text(`₹${formatVal(taxVal)}`, rightX + colWidth - 4, totalsY + 11, { align: 'right' });

  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(17, 24, 39);
  pdf.line(rightX + 4, totalsY + 14, rightX + colWidth - 4, totalsY + 14);
  pdf.text('Total', rightX + 4, totalsY + 19);
  pdf.setTextColor(166, 93, 61);
  pdf.text(`₹${formatVal(totalAmountVal)}`, rightX + colWidth - 4, totalsY + 19, { align: 'right' });


  // --- PAGE FOOTER ---
  const footerY = pageHeight - 15;
  pdf.setDrawColor(229, 231, 235);
  pdf.line(15, footerY - 5, pageWidth - 15, footerY - 5);

  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(156, 163, 175);
  pdf.text('Thank you for your purchase!', pageWidth / 2, footerY, { align: 'center' });
  pdf.text('For queries or support, contact: bashothelabel@gmail.com', pageWidth / 2, footerY + 4, { align: 'center' });

  return pdf;
}
