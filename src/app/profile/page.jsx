"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import AuthVisual from "../auth/AuthVisual";
import "../auth/auth.css";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/auth/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsub();
  }, [router]);

  if (!user) return null;

  const provider =
    user.providerData[0]?.providerId === "google.com"
      ? "Google"
      : "Email & Password";

  return (
    <div className="basho-auth">
      {/* LEFT SIDE – BRAND / POETIC VISUAL */}
      <AuthVisual>
        <blockquote className="auth-quote">
          In every curve of clay,
          <br />
          a story remembers—
          <br />
          <em>who shaped it.</em>
        </blockquote>

        <span className="auth-quote-caption">
          — THE WAY OF WABI-SABI
        </span>
      </AuthVisual>

      {/* RIGHT SIDE – PROFILE CONTENT */}
      <div className="form-experience">
        <div className="grain-texture" />
        <div className="ambient-glow" />

        <div className="form-container">
          <header className="form-header">
            <span className="header-accent">Your Space</span>
            <h1 className="form-title">Studio Profile</h1>
            <p className="form-subtitle">
              A quiet reflection of your journey with Basho
            </p>
          </header>

          {/* PROFILE AVATAR */}
          <div className="flex justify-center mb-10">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full object-cover ring-2 ring-clay shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-clay flex items-center justify-center text-3xl font-bold text-charcoal">
                {(user.displayName || user.email)[0].toUpperCase()}
              </div>
            )}
          </div>

          {/* PROFILE DETAILS */}
          <div className="space-y-6 text-center mb-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-warm/60 mb-1">
                Name
              </p>
              <p className="profile-value profile-name">
                {user.displayName || "Basho Member"}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-warm/60 mb-1">
                Email
              </p>
              <p className="profile-value profile-subtle">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-warm/60 mb-1">
                Signed in via
              </p>
              <p className="profile-value profile-subtle">
                {provider}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-warm/60 mb-1">
                Member since
              </p>
              <p className="profile-value profile-subtle">
                {new Date(user.metadata.creationTime).toDateString()}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <button
            onClick={() => router.push("/shop")}
            className="primary-button mb-6"
          >
            <span className="button-content">
              <span>Continue Exploring</span>
              <svg
                className="arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>

          <button
            onClick={async () => {
              await signOut(auth);
              router.push("/");
            }}
            className="primary-button"
          >
            <span className="button-content">
              <span>Sign Out</span>
              <svg
                className="arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        <footer className="page-footer">
          <span>Handcrafted with intention</span>
        </footer>
      </div>
    </div>
  );
}
