"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthVisual from "../AuthVisual";
import "../auth.css";

// 🔥 Firebase
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";

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

  // =========================
  // EMAIL + PASSWORD SIGNUP
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      router.push("/shop");
    } catch (error) {
      // ✅ Email already exists → redirect to login
      if (error.code === "auth/email-already-in-use") {
        router.push("/auth/login");
        return;
      }

      // Other errors → log silently
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE SIGNUP (SILENT)
  // =========================
  const handleGoogleSignup = async () => {
    if (googleLoading) return;

    try {
      setGoogleLoading(true);

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      await signInWithPopup(auth, provider);
      router.push("/shop");
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        console.error(error);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };

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
            <p className="form-subtitle">
              Start your journey into pottery and Japanese culture
            </p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="form-field">
              <input
                name="email"
                type="email"
                placeholder="pottery@basho.studio"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="form-field">
              <input
                name="password"
                type="password"
                placeholder="••••••••••"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="form-field">
              <input
                name="confirmPassword"
                type="password"
                placeholder="••••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* 🔒 SIGNUP BUTTON (UI UNCHANGED) */}
            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              <span className="button-content">
                <span>
                  {loading ? "Creating Account..." : "Create Account"}
                </span>
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
          </form>

          <div className="auth-divider">
            <span className="line" />
            <span className="text">Or continue with</span>
            <span className="line" />
          </div>

          {/* 🔵 GOOGLE BUTTON (UI SAME) */}
          <button
            className="social-button"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </span>
          </button>

          <div className="auth-toggle">
            <p>
              Already part of our community?{" "}
              <Link href="/auth/login" className="toggle-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <footer className="page-footer">
          <span>Handcrafted with intention</span>
        </footer>
      </div>
    </div>
  );
};

export default SignupPage;
