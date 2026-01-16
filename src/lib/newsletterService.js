import { db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const subscribeToNewsletter = async (email) => {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    // We use the email as the document ID to prevent duplicates
    // If the user subscribes again, it just updates the timestamp
    await setDoc(doc(db, "subscribers", email), {
      email: email,
      subscribedAt: serverTimestamp(),
      source: "footer_signup",
      status: "active"
    });

    return { success: true, message: "Thank you for joining our community!" };
  } catch (error) {
    console.error("Newsletter Error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};