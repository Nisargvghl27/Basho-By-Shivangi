"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AuthVisual from '../AuthVisual';
import '../auth.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Login submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

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

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="email" className={focusedField === 'email' ? 'focused' : ''}>
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="pottery@basho.studio"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            <div className="form-field" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="password" className={focusedField === 'password' ? 'focused' : ''}>
                Password
              </label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            <div className="form-options" style={{ animationDelay: '0.3s' }}>
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkbox-custom">
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>Remember me</span>
              </label>
              <button type="button" className="link-button">
                Forgot password?
              </button>
            </div>

            <button 
              type="submit"
              className="primary-button"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="button-content">
                <span>Sign In</span>
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </button>
          </form>

          <div className="auth-divider" style={{ animationDelay: '0.5s' }}>
            <span className="line" />
            <span className="text">Or continue with</span>
            <span className="line" />
          </div>

          <button className="social-button" style={{ animationDelay: '0.6s' }}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="auth-toggle" style={{ animationDelay: '0.7s' }}>
            <p>
              New to Basho?{' '}
              <Link href="/auth/signup" className="toggle-link">
                Create an account
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

export default LoginPage;

