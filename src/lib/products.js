// src/lib/products.js
import { db, storage } from "./firebase";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const COLLECTION_NAME = "products";

// --- CRUD Operations ---

// 1. Fetch All Products
export async function fetchProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// 2. Get Single Product
export async function getProductById(id) {
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
}

// 3. Add Product (with Image Upload)
export async function addProduct(productData, imageFile) {
  try {
    let imageUrl = "";
    
    // Upload image if provided
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...productData,
      image: imageUrl, // Main image
      images: [imageUrl], // Keep array for gallery compatibility
      price: Number(productData.price),
      stock: Number(productData.stock),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { id: docRef.id, ...productData, image: imageUrl };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

// 4. Update Product
export async function updateProduct(id, productData, imageFile) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    let updateData = {
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock),
      updatedAt: serverTimestamp()
    };

    // Handle Image Update
    if (imageFile) {
      const imageUrl = await uploadImage(imageFile);
      updateData.image = imageUrl;
      updateData.images = [imageUrl];
    }

    await updateDoc(docRef, updateData);
    return { id, ...updateData };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// 5. Delete Product
export async function deleteProduct(id) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return id;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// --- Helper Functions ---

async function uploadImage(file) {
  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}

// Search Helper (Client-side filtering)
export function searchProducts(products, term) {
  if (!term) return products;
  const lowerTerm = term.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerTerm) || 
    p.category.toLowerCase().includes(lowerTerm) ||
    p.sku?.toLowerCase().includes(lowerTerm)
  );
}