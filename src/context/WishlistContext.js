// src/context/WishlistContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
      setIsInitialized(true);
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isInitialized]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems; // Already in wishlist
      }
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};