"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthVisual from "../AuthVisual";
import "../auth.css";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";

// ─── Helper: upsert user doc in Firestore ─────────────────────────────────────
async function ensureUserInFirestore(user) {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || user.email.split("@")[0],
      email: user.email,
      role: "Customer",
      status: "Active",
      joinDate: serverTimestamp(),
      lastLogin: serverTimestamp(),
      totalOrders: 0,
      totalSpent: 0,
      phone: user.phoneNumber || "N/A",
    });
    return "Active";
  } else {
    // If the user already exists, grab their status and return it
    await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
    return userSnap.data().status || "Active";
  }
}

// ─── Inline error banner ───────────────────────────────────────────────────────
const ErrorBanner = ({ message }) =>
  message ? (
    <div
      role="alert"
      className="error-banner"
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

// ─── Page ──────────────────────────────────────────────────────────────────────
const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // Stable change handler — no new function on every keystroke
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // clear error as user types
  }, []);

  // ── Email/password login ──────────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        setError("Please fill in both fields.");
        return;
      }
      try {
        setLoading(true);
        setError("");
        const credential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const status = await ensureUserInFirestore(credential.user);

        if (status === "Blocked") {
          await signOut(auth);
          setError("Your account has been blocked by the administrator.");
          return;
        }

        router.push("/shop");
      } catch (err) {
        console.error(err);
        setError("Invalid email or password. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData, router]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") handleSubmit(e);
    },
    [handleSubmit]
  );

  // ── Google login ──────────────────────────────────────────────────────────
  const handleGoogleLogin = useCallback(async () => {
    if (googleLoading) return;
    try {
      setGoogleLoading(true);
      setError("");
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const status = await ensureUserInFirestore(result.user);
      
      if (status === "Blocked") {
        await signOut(auth);
        setError("Your account has been blocked by the administrator.");
        return;
      }
      
      router.push("/shop");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError(err.message);
      }
    } finally {
      setGoogleLoading(false);
    }
  }, [googleLoading, router]);

  // ── Forgot password ───────────────────────────────────────────────────────
  const handleForgotPassword = useCallback(async () => {
    if (!formData.email) {
      setError("Enter your email above first, then click Forgot password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setResetSent(true);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }, [formData.email]);

  const isBusy = loading || googleLoading;

  return (
    <div className="basho-auth">
      <AuthVisual />

      <div className="form-experience">
        <div className="grain-texture" />
        <div className="ambient-glow" />

        <div className="form-container">
          <header className="form-header">
            <span className="header-accent">Welcome Back</span>
            <h1 className="form-title">Enter the Studio</h1>
            <p className="form-subtitle">Continue your creative exploration</p>
          </header>

          {/* Inline error / success */}
          <ErrorBanner message={error} />
          {resetSent && (
            <div
              style={{
                padding: "0.75rem 1rem",
                marginBottom: "1.25rem",
                borderRadius: "0.5rem",
                background: "rgba(21,128,61,0.15)",
                border: "1px solid rgba(21,128,61,0.4)",
                color: "#86efac",
                fontSize: "0.875rem",
                animation: "fadeUp 0.2s ease forwards",
              }}
            >
              Password reset email sent — check your inbox.
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-field" style={{ animationDelay: "0.05s" }}>
              <label htmlFor="login-email" className={focusedField === "email" ? "focused" : ""}>
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="pottery@basho.studio"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isBusy}
                  autoComplete="email"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-field" style={{ animationDelay: "0.12s" }}>
              <label htmlFor="login-password" className={focusedField === "password" ? "focused" : ""}>
                Password
              </label>
              <div className="input-wrapper">
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isBusy}
                  autoComplete="current-password"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Options row */}
            <div className="form-options" style={{ animationDelay: "0.18s" }}>
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkbox-custom">
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="link-button"
                onClick={handleForgotPassword}
                disabled={isBusy}
                suppressHydrationWarning
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              className="primary-button"
              style={{ animationDelay: "0.24s" }}
              disabled={isBusy}
              suppressHydrationWarning
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
                    <span>Signing In…</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider" style={{ animationDelay: "0.3s" }}>
            <span className="line" />
            <span className="text">Or continue with</span>
            <span className="line" />
          </div>

          {/* Google */}
          <button
            id="login-google-btn"
            className="social-button"
            style={{ animationDelay: "0.36s" }}
            onClick={handleGoogleLogin}
            disabled={isBusy}
            suppressHydrationWarning
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
          <div className="auth-toggle" style={{ animationDelay: "0.42s" }}>
            <p>
              New to Basho?{" "}
              <Link href="/auth/signup" className="toggle-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;