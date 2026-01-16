// src/lib/bestSellerService.js
import { db } from "./firebase";
import { 
  collection, 
  getDocs, 
  getDoc,
  updateDoc, 
  doc,
  query,
  orderBy,
  limit,
  where 
} from "firebase/firestore";

const COLLECTION_NAME = "products";

// 1. Get All Best Sellers (up to 5)
export const getBestSellers = async () => {
  try {
    // First get all products, then filter and sort in JavaScript
    const q = query(collection(db, COLLECTION_NAME));
    const snapshot = await getDocs(q);
    
    const allProducts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Filter best sellers and sort by createdAt
    const bestSellers = allProducts
      .filter(product => product.isBestSeller === true)
      .sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime(); // Most recent first
      })
      .slice(0, 5); // Limit to 5
    
    return bestSellers;
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }
};

// 2. Add Product to Best Sellers (max 5)
export const addToBestSellers = async (productId) => {
  try {
    // Check current best sellers count
    const currentBestSellers = await getBestSellers();
    
    if (currentBestSellers.length >= 5) {
      throw new Error("Maximum 5 best sellers allowed. Please remove one first.");
    }

    // Set product as best seller
    const productRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(productRef, { 
      isBestSeller: true,
      updatedAt: new Date()
    });

    return { success: true, productId };
  } catch (error) {
    console.error("Error adding to best sellers:", error);
    throw error;
  }
};

// 3. Remove from Best Sellers
export const removeFromBestSellers = async (productId) => {
  try {
    const productRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(productRef, { 
      isBestSeller: false,
      updatedAt: new Date()
    });
    return { success: true, productId };
  } catch (error) {
    console.error("Error removing from best sellers:", error);
    throw error;
  }
};

// 4. Get All Products with Best Seller Status
export const getProductsWithBestSellerStatus = async () => {
  try {
    // Simple query without ordering to avoid index requirement
    const q = query(collection(db, COLLECTION_NAME));
    const snapshot = await getDocs(q);
    
    const allProducts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort by createdAt in JavaScript
    return allProducts.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(0);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
  } catch (error) {
    console.error("Error fetching products with best seller status:", error);
    return [];
  }
};

// 5. Get Best Seller Count
export const getBestSellerCount = async () => {
  try {
    const bestSellers = await getBestSellers();
    return bestSellers.length;
  } catch (error) {
    console.error("Error getting best seller count:", error);
    return 0;
  }
};
