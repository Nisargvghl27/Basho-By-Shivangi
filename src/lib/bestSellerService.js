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

// 1. Get Best Sellers (Always returns 5 items if available)
export const getBestSellers = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const snapshot = await getDocs(q);
    
    const allProducts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // 1. Get explicitly marked Best Sellers
    const markedBestSellers = allProducts
      .filter(product => product.isBestSeller === true)
      .sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

    // 2. Get other products to fill the gaps
    const otherProducts = allProducts
      .filter(product => product.isBestSeller !== true)
      .sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
    
    // 3. Combine to ensure we have 5 items (1 Main + 4 Side)
    // This fills the grid even if you haven't marked enough best sellers
    const finalCollection = [...markedBestSellers, ...otherProducts].slice(0, 5);
    
    return finalCollection;
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }
};

// 2. Add Product to Best Sellers (max 5)
export const addToBestSellers = async (productId) => {
  try {
    const currentBestSellersCount = (await getBestSellers()).filter(p => p.isBestSeller).length;
    
    if (currentBestSellersCount >= 5) {
      throw new Error("Maximum 5 best sellers allowed. Please remove one first.");
    }

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

// 4. Get All Products with Best Seller Status (for Admin)
export const getProductsWithBestSellerStatus = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const snapshot = await getDocs(q);
    
    const allProducts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return allProducts.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error fetching products with best seller status:", error);
    return [];
  }
};

// 5. Get Best Seller Count
export const getBestSellerCount = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const snapshot = await getDocs(q);
    return snapshot.docs.filter(doc => doc.data().isBestSeller === true).length;
  } catch (error) {
    console.error("Error getting best seller count:", error);
    return 0;
  }
};