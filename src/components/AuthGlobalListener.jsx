"use client";

import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { auth, db } from "../lib/firebase";

export default function AuthGlobalListener() {
  const router = useRouter();

  useEffect(() => {
    let unsubscribeFirestore = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Clean up previous listener
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
        unsubscribeFirestore = null;
      }

      if (user) {
        // Listen to this user's document in real-time
        const userDocRef = doc(db, "users", user.uid);
        unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.status === "Blocked") {
              // Sign out immediately if they are blocked
              signOut(auth).then(() => {
                toast.error("Your account has been blocked by the administrator.");
                router.push("/auth/login");
              });
            }
          }
        }, (error) => {
          console.error("Error listening to user document", error);
        });
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, [router]);

  // This component doesn't render anything visually
  return null;
}
