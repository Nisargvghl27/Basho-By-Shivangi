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

const COLLECTION_NAME = "corporate_inquiries";

// --- 1. Submit New Corporate Inquiry (Public) ---
export const submitCorporateInquiry = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...formData,
      status: "new", // Statuses: new, contacted, closed
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting corporate inquiry:", error);
    throw error;
  }
};

// --- 2. Fetch All Inquiries (Admin) ---
export const fetchCorporateInquiries = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching corporate inquiries:", error);
    return [];
  }
};

// --- 3. Update Status (Admin) ---
export const updateCorporateStatus = async (id, status) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};