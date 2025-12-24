/**
 * Utility functions for cart operations
 */

/**
 * Calculate the total price of an item based on its price and quantity
 * @param {number|string} price - The price of the item (can be a number or string with currency symbol)
 * @param {number} quantity - The quantity of the item
 * @returns {number} The total price for the item
 */
export const calculateItemTotal = (price, quantity = 1) => {
  const numericPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.-]+/g, '')) 
    : price;
  return numericPrice * quantity;
};

/**
 * Calculate the subtotal of selected items in the cart
 * @param {Array} items - Array of cart items
 * @param {Array} selectedItemIds - Array of selected item IDs
 * @returns {number} The subtotal of selected items
 */
export const calculateSubtotal = (items, selectedItemIds = []) => {
  return items
    .filter(item => selectedItemIds.includes(item.id))
    .reduce((sum, item) => {
      return sum + calculateItemTotal(item.price, item.quantity);
    }, 0);
};

/**
 * Calculate shipping cost based on subtotal
 * @param {number} subtotal - The subtotal amount
 * @param {number} freeShippingThreshold - The amount above which shipping is free (default: 1000)
 * @param {number} standardShippingCost - The standard shipping cost (default: 50)
 * @returns {number} The shipping cost
 */
export const calculateShipping = (subtotal, freeShippingThreshold = 1000, standardShippingCost = 50) => {
  return subtotal > freeShippingThreshold ? 0 : standardShippingCost;
};

/**
 * Calculate tax amount based on subtotal
 * @param {number} subtotal - The subtotal amount
 * @param {number} taxRate - The tax rate as a decimal (default: 0.18 for 18%)
 * @returns {number} The tax amount
 */
export const calculateTax = (subtotal, taxRate = 0.18) => {
  return subtotal * taxRate;
};

/**
 * Calculate the total cost including subtotal, shipping, and tax
 * @param {number} subtotal - The subtotal amount
 * @param {number} shipping - The shipping cost
 * @param {number} tax - The tax amount
 * @returns {number} The total cost
 */
export const calculateTotal = (subtotal, shipping, tax) => {
  return subtotal + shipping + tax;
};

/**
 * Format a number as a currency string
 * @param {number} amount - The amount to format
 * @param {string} locale - The locale to use (default: 'en-IN')
 * @param {Object} options - Options for number formatting
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, locale = 'en-IN', options = {}) => {
  const defaultOptions = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };
  
  return new Intl.NumberFormat(locale, defaultOptions).format(amount);
};

/**
 * Get the total number of items in the cart
 * @param {Array} cartItems - Array of cart items
 * @returns {number} Total number of items
 */
export const getCartItemCount = (cartItems) => {
  return cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
};

/**
 * Check if an item is in the cart
 * @param {Array} cartItems - Array of cart items
 * @param {string|number} itemId - The ID of the item to check
 * @returns {boolean} True if the item is in the cart, false otherwise
 */
export const isInCart = (cartItems, itemId) => {
  return cartItems.some(item => item.id === itemId);
};

/**
 * Get the quantity of a specific item in the cart
 * @param {Array} cartItems - Array of cart items
 * @param {string|number} itemId - The ID of the item
 * @returns {number} The quantity of the item in the cart (0 if not found)
 */
export const getItemQuantity = (cartItems, itemId) => {
  const item = cartItems.find(item => item.id === itemId);
  return item ? item.quantity : 0;
};
