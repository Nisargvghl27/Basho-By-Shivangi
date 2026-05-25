"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthVisual from "../AuthVisual";
import "../auth.css";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";

// ─── Helper: save new user doc (gracefully skips existing users) ───────────────
async function saveUserToFirestore(user, fullName) {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: fullName || user.displayName || "Anonymous",
      email: user.email,
      role: "Customer",
      status: "Active",
      joinDate: serverTimestamp(),
      lastLogin: serverTimestamp(),
      totalOrders: 0,
      totalSpent: 0,
      phone: user.phoneNumber || "N/A",
    });
  }
}

// ─── Inline error banner ───────────────────────────────────────────────────────
const ErrorBanner = ({ message }) =>
  message ? (
    <div
      role="alert"
      style={{
        padding: "0.75rem 1rem",
        marginBottom: "1.25rem",
        borderRadius: "0.5rem",
        background: "rgba(185,28,28,0.15)",
        border: "1px solid rgba(185,28,28,0.4)",
        color: "#fca5a5",
        fontSize: "0.875rem",
        lineHeight: 1.5,
        animation: "fadeUp 0.2s ease forwards",
      }}
    >
      {message}
    </div>
  ) : null;

// ─── Field-level validation ────────────────────────────────────────────────────
function validate({ name, email, password, confirmPassword }) {
  if (!name.trim()) return "Please enter your full name.";
  if (!email.trim()) return "Please enter your email address.";
  if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return null;
}

// ─── Page ──────────────────────────────────────────────────────────────────────
const SignupPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Stable change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // clear error as user types
  }, []);

  // ── Email/password signup ─────────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validationError = validate(formData);
      if (validationError) {
        setError(validationError);
        return;
      }
      try {
        setLoading(true);
        setError("");
        const credential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await updateProfile(credential.user, { displayName: formData.name });
        await saveUserToFirestore(credential.user, formData.name);
        router.push("/shop");
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setError("That email is already registered. Try signing in instead.");
        } else {
          console.error("Signup Error:", err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [formData, router]
  );

  // ── Google signup ─────────────────────────────────────────────────────────
  const handleGoogleSignup = useCallback(async () => {
    if (googleLoading) return;
    try {
      setGoogleLoading(true);
      setError("");
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      await saveUserToFirestore(result.user, result.user.displayName);
      router.push("/shop");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        console.error("Google Error:", err);
        setError(err.message);
      }
    } finally {
      setGoogleLoading(false);
    }
  }, [googleLoading, router]);

  const isBusy = loading || googleLoading;

  // Field config to avoid repetitive JSX
  const fields = [
    { name: "name",            type: "text",     placeholder: "Your full name",        label: "Full Name",       autoComplete: "name" },
    { name: "email",           type: "email",    placeholder: "pottery@basho.studio",  label: "Email Address",   autoComplete: "email" },
    { name: "password",        type: "password", placeholder: "Password (6+ chars)",   label: "Password",        autoComplete: "new-password" },
    { name: "confirmPassword", type: "password", placeholder: "Confirm your password", label: "Confirm Password",autoComplete: "new-password" },
  ];

  return (
    <div className="basho-auth">
      <AuthVisual />
      <div className="form-experience">
        <div className="grain-texture" />
        <div className="ambient-glow" />
        <div className="form-container">
          <header className="form-header">
            <span className="header-accent">Begin Your Journey</span>
            <h1 className="form-title">Join Our Community</h1>
            <p className="form-subtitle">Start your journey into pottery and Japanese culture</p>
          </header>

          {/* Inline error */}
          <ErrorBanner message={error} />

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {fields.map(({ name, type, placeholder, label, autoComplete }, i) => (
              <div
                key={name}
                className="form-field"
                style={{ animationDelay: `${0.05 + i * 0.07}s` }}
              >
                <label
                  htmlFor={`signup-${name}`}
                  className={focusedField === name ? "focused" : ""}
                >
                  {label}
                </label>
                <div className="input-wrapper">
                  <input
                    id={`signup-${name}`}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField(null)}
                    disabled={isBusy}
                    autoComplete={autoComplete}
                    required
                  />
                </div>
              </div>
            ))}

            {/* Submit */}
            <button
              id="signup-submit-btn"
              type="submit"
              className="primary-button"
              style={{ animationDelay: "0.33s" }}
              disabled={isBusy}
            >
              <span className="button-content">
                {loading ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(234,232,228,0.3)",
                        borderTopColor: "#EAE8E4",
                        borderRadius: "50%",
                        animation: "spin 0.6s linear infinite",
                      }}
                    />
                    <span>Creating Account…</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider" style={{ animationDelay: "0.4s" }}>
            <span className="line" />
            <span className="text">Or continue with</span>
            <span className="line" />
          </div>

          {/* Google */}
          <button
            id="signup-google-btn"
            className="social-button"
            style={{ animationDelay: "0.46s" }}
            onClick={handleGoogleSignup}
            disabled={isBusy}
          >
            {googleLoading ? (
              <span
                style={{
                  display: "inline-block",
                  width: 18,
                  height: 18,
                  border: "2px solid rgba(234,232,228,0.3)",
                  borderTopColor: "#EAE8E4",
                  borderRadius: "50%",
                  animation: "spin 0.6s linear infinite",
                }}
              />
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            <span>{googleLoading ? "Signing in…" : "Continue with Google"}</span>
          </button>

          {/* Toggle */}
          <div className="auth-toggle" style={{ animationDelay: "0.52s" }}>
            <p>
              Already part of our community?{" "}
              <Link href="/auth/login" className="toggle-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;