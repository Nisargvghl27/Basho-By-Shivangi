"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // [!code ++]
import { auth, db } from "../lib/firebase"; // [!code ++]

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 🔑 Get cart key based on user
  const getCartKey = (uid) => (uid ? `cart_${uid}` : "guest_cart");

  // 🔁 Listen to auth changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCartItems([]); // 🚨 RESET CART on user change

      const cartKey = getCartKey(currentUser?.uid);
      const savedCart = localStorage.getItem(cartKey);

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }

      setIsInitialized(true);
    });

    return () => unsub();
  }, []);

  // 💾 Save cart when it changes
  useEffect(() => {
    if (!isInitialized) return;

    const cartKey = getCartKey(user?.uid);
    localStorage.setItem(cartKey, JSON.stringify(cartItems));

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartSubtotal(subtotal);
  }, [cartItems, user, isInitialized]);

  // 🔍 Helper: Check Stock in Firestore
  const checkStock = async (productId, requestedQuantity) => {
    try {
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        return { available: false, stock: 0, error: "Product not found" };
      }

      const realStock = parseInt(productSnap.data().stock || 0);
      
      if (requestedQuantity > realStock) {
        return { 
          available: false, 
          stock: realStock, 
          error: realStock === 0 ? "Out of Stock" : `Only ${realStock} items left in stock` 
        };
      }

      return { available: true, stock: realStock };
    } catch (error) {
      console.error("Stock check error:", error);
      // Fallback: allow if check fails (or block depending on preference)
      return { available: true }; 
    }
  };

  // ➕ ADD TO CART (Async with Validation)
  const addToCart = async (product) => {
    // 1. Calculate total desired quantity
    const existingItem = cartItems.find((item) => item.id === product.id);
    const currentQty = existingItem ? existingItem.quantity : 0;
    const itemsToAdd = product.quantity || 1;
    const totalQty = currentQty + itemsToAdd;

    // 2. Validate against Real-Time Stock
    const stockCheck = await checkStock(product.id, totalQty);

    if (!stockCheck.available) {
      return { success: false, message: stockCheck.error };
    }

    // 3. Update State if valid
    setCartItems((prevItems) => {
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + itemsToAdd }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: itemsToAdd }];
    });

    return { success: true, message: "Added to cart" };
  };

  // 🔄 UPDATE QUANTITY (Async with Validation)
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return { success: true };
    }

    // 1. Check if increasing quantity
    const currentItem = cartItems.find(item => item.id === productId);
    if (currentItem && newQuantity > currentItem.quantity) {
      const stockCheck = await checkStock(productId, newQuantity);
      if (!stockCheck.available) {
        return { success: false, message: stockCheck.error };
      }
    }

    // 2. Update State
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    return { success: true };
  };

  // ❌ REMOVE ITEM
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // 🧹 CLEAR CART
  const clearCart = () => {
    setCartItems([]);
    const cartKey = getCartKey(user?.uid);
    localStorage.removeItem(cartKey);
  };

  // 🔢 CART COUNT
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartSubtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};