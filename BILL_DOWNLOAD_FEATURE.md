# Bill Download Feature Implementation

## Overview
This document outlines the new feature that allows users to download invoices/bills for their orders both via email links and from their user profile.

## Features Implemented

### 1. **API Endpoint: `/api/download-bill`**
**Location:** `src/app/api/download-bill/route.js`

**Functionality:**
- Generates PDF invoices on-demand
- Security: Verifies user email matches the order's shipping email
- Handles PDF generation with proper formatting
- Returns downloadable PDF file

**Query Parameters:**
- `orderId` (required): The Firestore document ID of the order
- `email` (required): The user's email for verification

**Usage:**
```javascript
// In frontend:
const billUrl = `/api/download-bill?orderId=${orderId}&email=${encodeURIComponent(userEmail)}`;
```

**Example:**
```
GET /api/download-bill?orderId=abc123def456&email=user@example.com
```

---

### 2. **User Profile/Orders Page**
**Location:** `src/app/profile/page.jsx`

**Features:**
- Displays user profile information
- Lists all orders for authenticated user
- Shows order status (pending, processing, shipped, delivered, etc.)
- Shows payment status (paid, pending)
- Displays order items, dates, and totals
- One-click invoice download button for each order
- Responsive design with dark theme matching brand

**Functionality:**
- Fetches orders from Firestore filtered by user email
- Orders sorted by creation date (newest first)
- Shows empty state if no orders exist
- Loading states for better UX
- Logout button for user sessions

---

### 3. **Email Enhancement**
**Location:** `src/app/api/verify-payment/route.js`

**Changes Made:**
- Added download button/link in order confirmation emails
- Direct download link with order ID and email verification
- Link to user profile page for managing all orders
- Enhanced email styling to match brand

**Email Elements Added:**
1. Download Invoice Button (CTA button in email)
2. Link to profile page in footer
3. Dynamic URL generation with base domain from environment variable

---

### 4. **Header Navigation Update**
**Location:** `src/components/Header.jsx`

**Changes Made:**
- Added "My Orders" link to mobile menu (for authenticated users)
- Existing profile icon/link on desktop (already present)
- Mobile menu shows "My Orders" link below navigation links

---

## Database Requirements

### Order Document Structure (Firestore)
```javascript
{
  id: "doc-id",
  shipping: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "India"
  },
  items: [
    {
      name: "Ceramic Mug",
      title: "Ceramic Mug", // Alternative field name
      price: 599,
      quantity: 2
    }
  ],
  total: 1400,
  status: "completed", // pending, processing, shipped, delivered
  paymentStatus: "paid", // pending, paid
  createdAt: Timestamp,
  razorpayOrderId: "order_123",
  razorpayPaymentId: "pay_123",
  // Optional fields used for totals calculation
  shipping_cost: 50,
  tax: 252
}
```

---

## Security Features

1. **Email Verification:** Users can only download invoices for orders matched to their email
2. **Authentication:** Profile page requires Firebase authentication
3. **Query Parameter Validation:** Both orderId and email parameters are required
4. **Firestore Security Rules:** Should include rules to prevent unauthorized access

---

## Environment Variables Required

For email functionality to work properly:
```bash
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
NEXTAUTH_URL=https://yourdomain.com  # Used in bill download links
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret
```

---

## Files Modified/Created

### New Files:
1. `src/app/api/download-bill/route.js` - PDF generation endpoint

### Modified Files:
1. `src/app/profile/page.jsx` - Complete rewrite with orders management
2. `src/app/api/verify-payment/route.js` - Added download link to email
3. `src/components/Header.jsx` - Added mobile menu "My Orders" link
4. `package.json` - Added `pdfkit` dependency

---

## PDF Invoice Features

The generated PDF includes:
- Company logo and branding
- Order ID and date
- Customer name, email, phone
- Shipping address
- Itemized list with quantities and prices
- Subtotal, shipping cost, tax breakdown
- Final total amount
- Footer with contact information

---

## User Flow

### Scenario 1: Download from Email
1. User receives order confirmation email after successful payment
2. Email contains "Download Invoice" button
3. Clicking button opens `/api/download-bill` with order ID and email
4. PDF is generated and downloaded to user's device

### Scenario 2: Download from Profile
1. Authenticated user navigates to `/profile`
2. Page displays all their orders
3. Each order shows summary and "Download Invoice" button
4. Clicking button triggers same PDF generation API

---

## Testing Checklist

- [ ] User can access `/profile` when logged in
- [ ] Profile page shows all user's orders
- [ ] Download button generates PDF without errors
- [ ] PDF downloads with correct filename
- [ ] Email verification prevents unauthorized downloads
- [ ] Email contains working download link
- [ ] Mobile menu shows "My Orders" when logged in
- [ ] Empty state displays correctly when no orders exist
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Loading states display correctly

---

## Performance Considerations

1. **PDF Generation:** Done server-side on-demand (no caching)
2. **Firestore Queries:** Uses indexed queries on `shipping.email` field
3. **Email Delivery:** Non-blocking (email failure doesn't fail payment verification)

---

## Future Enhancements

1. Add PDF caching to avoid regenerating same invoices
2. Add invoice list export/batch download
3. Add return/refund management
4. Add order tracking with real-time updates
5. Add invoice email resend functionality
6. Add custom invoice templates
7. Add GST invoice generation (if applicable)

---

## Support

For issues or questions about implementation:
- Check browser console for errors
- Check server logs for PDF generation errors
- Verify Firestore security rules allow read access
- Verify email configuration in environment variables
