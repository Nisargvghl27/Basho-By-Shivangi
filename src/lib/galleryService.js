// src/lib/galleryService.js
import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";

const COLLECTION_NAME = "gallery";

// READ: Fetch items by category
export const fetchGalleryByCategory = async (category) => {
  try {
    const galleryRef = collection(db, COLLECTION_NAME);
    let q;

    if (category === "all" || !category) {
      q = query(galleryRef, orderBy("order", "asc"));
    } else {
      q = query(galleryRef, where("category", "==", category), orderBy("order", "asc"));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching ${category} gallery:`, error);
    return [];
  }
};

// CREATE: Add new item (Image or Video) via URL
export const addGalleryItem = async (data) => {
  try {
    // Validate required fields
    if (data.type === 'image' && !data.image) throw new Error("Image URL is required");
    if (data.type === 'video' && !data.videoUrl) throw new Error("Video URL is required");

    await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      // Ensure numeric order
      order: Number(data.order) || 1,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

// DELETE: Remove item
export const deleteGalleryItem = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};