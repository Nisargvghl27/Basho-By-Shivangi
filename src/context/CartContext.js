"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";


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

  // ➕ ADD TO CART
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + (product.quantity || 1),
              }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  // 🔄 UPDATE QUANTITY
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
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
