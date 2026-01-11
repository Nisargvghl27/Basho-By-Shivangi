// Shipping calculation utilities

export const SHIPPING_RATES = {
  standard: {
    base: 50,
    freeThreshold: 500, // Free shipping for orders above ₹500
  },
  express: {
    base: 150,
    freeThreshold: 1000, // Free express shipping for orders above ₹1000
  },
  international: {
    base: 500,
    freeThreshold: 2000,
  }
};

export const TAX_RATES = {
  // GST rates for India
  india: 0.18, // 18% GST for most goods
  // Add other countries if needed
  usa: 0.08,
  uk: 0.20,
  eu: 0.21,
};

export const calculateShipping = (subtotal, method, country = 'India') => {
  const rates = SHIPPING_RATES[method] || SHIPPING_RATES.standard;
  
  // Check if order qualifies for free shipping
  if (subtotal >= rates.freeThreshold) {
    return 0;
  }
  
  return rates.base;
};

export const calculateTax = (subtotal, country = 'India') => {
  const taxRate = TAX_RATES[country.toLowerCase()] || TAX_RATES.india;
  return subtotal * taxRate;
};

export const calculateTotal = (subtotal, shippingMethod = 'standard', country = 'India') => {
  const shipping = calculateShipping(subtotal, shippingMethod, country);
  const tax = calculateTax(subtotal, country);
  
  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
  };
};

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const getShippingEstimate = (method) => {
  const estimates = {
    standard: '5-7 business days',
    express: '2-3 business days',
    international: '10-15 business days',
  };
  
  return estimates[method] || estimates.standard;
};
