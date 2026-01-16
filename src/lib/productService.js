// src/lib/productService.js
import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";

const COLLECTION_NAME = "products";

// --- CRUD Operations ---

// 1. Fetch All Products
export const fetchAllProducts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// 2. Fetch Single Product
export const fetchProductById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting product:", error);
    return null;
  }
};

// 3. Create Product (Accepts Image URL directly)
export const createProduct = async (productData, imageUrl) => {
  try {
    // Use the provided URL or a placeholder
    const finalImageUrl = imageUrl || "https://via.placeholder.com/400";

    // Save to Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock),
      image: finalImageUrl,       // The provided Cloudinary Link
      images: [finalImageUrl],    // Array format for compatibility
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { id: docRef.id, ...productData, image: finalImageUrl };
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// 4. Update Product (Accepts Image URL directly)
export const updateProduct = async (productId, productData, imageUrl) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, productId);
    
    let updateData = {
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock),
      updatedAt: serverTimestamp()
    };

    // If a new image URL is provided, update it
    if (imageUrl) {
      updateData.image = imageUrl;
      updateData.images = [imageUrl];
    }

    await updateDoc(docRef, updateData);
    return { id: productId, ...updateData };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// 5. Delete Product
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, productId));
    return productId;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// 6. Get Related Products
export const getRelatedProducts = async (currentProductId, category) => {
    const all = await fetchAllProducts();
    return all.filter(p => p.id !== currentProductId && p.category === category).slice(0, 4);
};