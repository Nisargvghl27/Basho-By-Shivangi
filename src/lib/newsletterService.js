import { db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const subscribeToNewsletter = async (email) => {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    // 1. Save to Firebase
    await setDoc(doc(db, "subscribers", email), {
      email: email,
      subscribedAt: serverTimestamp(),
      source: "footer_signup",
      status: "active"
    });

    // 2. Trigger Welcome Email (This was missing in your file)
    fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).catch(err => console.error("Failed to send welcome email:", err));

    return { success: true, message: "Thank you for joining our community!" };
  } catch (error) {
    console.error("Newsletter Error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};