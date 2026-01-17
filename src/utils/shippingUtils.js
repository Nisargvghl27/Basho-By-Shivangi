
export const SHIPPING_RATES = {
  standard: {
    base: 50,            // Base cost for the first 1kg
    perKg: 40,           // Cost for every additional kg
    freeThreshold: 2000, // Free shipping if order > ₹2000
  },
  express: {
    base: 150,           // Base cost for the first 1kg
    perKg: 80,           // Cost for every additional kg
    freeThreshold: 5000, 
  },
  international: {
    base: 1500,
    perKg: 800,
    freeThreshold: 25000,
  }
};

export const TAX_RATES = {
  india: 0.18, // 18% GST
  usa: 0.08,
  uk: 0.20,
  eu: 0.21,
};

/**
 * Calculate shipping cost based on subtotal and weight
 * @param {number} subtotal - The price subtotal
 * @param {string} method - 'standard' | 'express' | 'international'
 * @param {number} totalWeight - Total weight in Kilograms (default 0)
 * @param {string} country - Destination country
 */
export const calculateShipping = (subtotal, method = 'standard', totalWeight = 0, country = 'India') => {
  const rates = SHIPPING_RATES[method] || SHIPPING_RATES.standard;
  
  // 1. Check for Free Shipping eligibility
  if (subtotal >= rates.freeThreshold) {
    return 0;
  }
  
  // 2. Weight-based Calculation
  // If weight is 1kg or less (or 0), return just the base rate
  if (totalWeight <= 1) {
    return rates.base;
  }

  // Calculate additional weight (rounding up to nearest kg)
  // e.g., 1.2kg becomes 2kg total -> 1kg base + 1kg additional
  const additionalWeight = Math.ceil(totalWeight - 1);
  const additionalCost = additionalWeight * (rates.perKg || 0);
  
  return rates.base + additionalCost;
};

export const calculateTax = (subtotal, country = 'India') => {
  const taxRate = TAX_RATES[country.toLowerCase()] || TAX_RATES.india;
  return subtotal * taxRate;
};

/**
 * Helper to calculate all totals at once
 */
export const calculateTotal = (subtotal, shippingMethod = 'standard', totalWeight = 0, country = 'India') => {
  const shipping = calculateShipping(subtotal, shippingMethod, totalWeight, country);
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