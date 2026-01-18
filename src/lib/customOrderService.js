import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc,
  updateDoc, 
  query,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";

const COLLECTION_NAME = "custom_orders";

// Cloudinary Configuration
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// --- Helper: Upload Image to Cloudinary ---
const uploadToCloudinary = async (file) => {
  if (!file) return null;
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    console.warn("Cloudinary not configured. Image skipped.");
    return null;
  }
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "basho-custom-requests");

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload Error:", error);
    // Return null instead of throwing to allow text-only submission if image fails
    return null; 
  }
};

// --- CRUD Operations ---

// 1. Submit New Request (User)
export const submitCustomRequest = async (requestData, imageFile) => {
  try {
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile);
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...requestData,
      status: "pending", // pending, quoted, rejected, completed
      adminPrice: null,
      adminNote: "",
      referenceImage: imageUrl || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting request:", error); // Check Console for this error
    throw error;
  }
};

// ... keep existing fetchAllRequests and updateRequestStatus ...
// 2. Fetch All Requests (Admin)
export const fetchAllRequests = async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching requests:", error);
      return [];
    }
  };
  
  // 3. Update Request Status/Price (Admin)
  export const updateRequestStatus = async (requestId, updates) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, requestId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating request:", error);
      throw error;
    }
  };