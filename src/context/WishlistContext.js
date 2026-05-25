// src/context/WishlistContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 🔑 Get wishlist key based on user (returns null if unauthenticated)
  const getWishlistKey = (uid) => (uid ? `wishlist_${uid}` : null);

  // 🔁 Listen to auth changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setWishlistItems([]); // Reset local state on user switch/logout

      if (currentUser?.uid) {
        // Load saved wishlist from localStorage only for authenticated users
        const wishlistKey = getWishlistKey(currentUser.uid);
        if (wishlistKey) {
          const savedWishlist = localStorage.getItem(wishlistKey);
          if (savedWishlist) {
            try {
              setWishlistItems(JSON.parse(savedWishlist));
            } catch (e) {
              console.error("Failed to parse wishlist", e);
            }
          }
        }
      }

      setIsInitialized(true);
    });

    return () => unsub();
  }, []);

  // 💾 Save wishlist when it changes
  useEffect(() => {
    if (!isInitialized) return;

    if (user?.uid) {
      const wishlistKey = getWishlistKey(user.uid);
      if (wishlistKey) {
        localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
      }
    }
  }, [wishlistItems, user, isInitialized]);

  const addToWishlist = async (product) => {
    if (!user) {
      return { success: false, message: "Please log in to add items to wishlist", requiresAuth: true };
    }

    setWishlistItems(prevItems => {
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems; // Already in wishlist
      }
      return [...prevItems, product];
    });

    return { success: true, message: "Added to wishlist" };
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