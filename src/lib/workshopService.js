import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  runTransaction
} from "firebase/firestore";

const workshopRef = collection(db, "workshops");

// READ ALL
export const fetchAllWorkshops = async () => {
  const snapshot = await getDocs(workshopRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// GET UPCOMING WORKSHOP (Prioritizes "Featured", then falls back to nearest date)
export const getUpcomingWorkshop = async () => {
  try {
    // 1. Get all workshops
    const allWorkshops = await fetchAllWorkshops();
    
    // 2. Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // 3. Find specific FEATURED workshop (Future date only)
    const featuredWorkshop = allWorkshops.find(w => 
      w.status === "active" && 
      w.date >= today && 
      w.isFeatured === true
    );

    // If a featured workshop exists, return it immediately
    if (featuredWorkshop) {
      return featuredWorkshop;
    }

    // 4. Fallback: If no featured workshop, get the NEAREST upcoming one
    const nearestWorkshop = allWorkshops
      .filter(w => w.status === "active" && w.date >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

    return nearestWorkshop || null;

  } catch (error) {
    console.error("Error fetching upcoming workshop:", error);
    return null;
  }
};

// CREATE
export const createWorkshop = async (data, imageUrl) => {
  await addDoc(workshopRef, {
    ...data,
    image: imageUrl,
    createdAt: serverTimestamp(),
  });
};

// UPDATE
export const updateWorkshop = async (id, data, imageUrl) => {
  const workshopDoc = doc(db, "workshops", id);
  await updateDoc(workshopDoc, {
    ...data,
    image: imageUrl,
    updatedAt: serverTimestamp(),
  });
};

// DELETE
export const deleteWorkshop = async (id) => {
  await deleteDoc(doc(db, "workshops", id));
};

// BOOK WORKSHOP (Transaction)
export const bookWorkshop = async (workshopId, userDetails, seatsRequested, paymentDetails) => {
  try {
    const result = await runTransaction(db, async (transaction) => {
      // 1. Get the latest workshop data
      const workshopDocRef = doc(db, "workshops", workshopId);
      const workshopDoc = await transaction.get(workshopDocRef);

      if (!workshopDoc.exists()) {
        throw "Workshop does not exist!";
      }

      const workshopData = workshopDoc.data();
      const currentSeats = parseInt(workshopData.seats || 0);
      const title = workshopData.title;

      // 2. Check availability
      if (currentSeats < seatsRequested) {
        throw "Sorry, not enough seats available.";
      }

      // 3. Subtract seats from workshop
      const newSeatCount = currentSeats - seatsRequested;
      transaction.update(workshopDocRef, { seats: newSeatCount });

      // 4. Create a booking record
      const newBookingRef = doc(collection(db, "bookings"));
      transaction.set(newBookingRef, {
        workshopId,
        workshopTitle: title,
        customerName: userDetails.name,
        customerEmail: userDetails.email,
        customerPhone: userDetails.phone,
        seatsBooked: seatsRequested,
        totalPrice: parseFloat(workshopData.price) * seatsRequested,
        status: "confirmed",
        paymentId: paymentDetails.paymentId,
        orderId: paymentDetails.orderId,
        bookedAt: serverTimestamp(),
      });
      
      return { id: newBookingRef.id };
    });

    return { success: true, bookingId: result.id };
  } catch (e) {
    console.error("Booking failed: ", e);
    return { success: false, error: e.toString() };
  }
};