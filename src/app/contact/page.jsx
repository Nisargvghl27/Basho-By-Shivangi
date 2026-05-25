"use client";

import React, { useState, memo } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ArrowRight,
  Plus,
  Minus,
  Briefcase,
  ChevronDown
} from "lucide-react";
// Firebase Imports
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ---------------------------------------------------------------------------
// Static Background (Memoized)
// ---------------------------------------------------------------------------
const Background = memo(function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Lightweight static raster grain - Replaces expensive SVG parsing */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ 
          backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png")',
          backgroundSize: '150px'
        }}
      />
      {/* Replaced heavy blur-[120px] orbs with a simple static gradient */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-clay/5 to-transparent opacity-30" />
    </div>
  );
});

// ---------------------------------------------------------------------------
// Contact Form (Isolated & Memoized)
// ---------------------------------------------------------------------------
const ContactForm = memo(function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, "contact_inquiries"), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "General Inquiry",
        message: formData.message,
        status: "unread",
        createdAt: serverTimestamp(),
      });

      // Send contact email notification non-blockingly
      fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "General Inquiry",
          message: formData.message,
        }),
      }).catch((err) => console.error("Failed to send contact emails:", err));

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 relative overflow-hidden">
      {/* Background Gradient for Form */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-clay/5 rounded-full blur-[80px] pointer-events-none" />

      <h2 className="font-serif text-3xl text-rice-paper mb-10">Send a Message</h2>

      {submitted ? (
        <div className="py-20 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <Send className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif text-rice-paper mb-4">Message Sent</h3>
          <p className="text-stone-warm mb-8 max-w-md mx-auto">
            Thank you for your words. We have received your message and will respond as soon as the kiln allows.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-clay hover:text-rice-paper text-sm uppercase tracking-widest font-bold transition-colors border-b border-clay hover:border-rice-paper pb-1"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Name Field */}
            <div className="relative group">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b border-white/20 py-4 text-rice-paper placeholder-transparent focus:outline-none focus:border-clay transition-all duration-300"
                placeholder="Name"
                id="name"
              />
              <label 
                htmlFor="name"
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focusedField === 'name' || formData.name 
                    ? '-top-6 text-xs text-clay tracking-widest uppercase' 
                    : 'top-4 text-stone-500'
                }`}
              >
                Your Name
              </label>
            </div>

            {/* Email Field */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-transparent border-b border-white/20 py-4 text-rice-paper placeholder-transparent focus:outline-none focus:border-clay transition-all duration-300"
                placeholder="Email"
                id="email"
              />
              <label 
                htmlFor="email"
                className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                  focusedField === 'email' || formData.email 
                    ? '-top-6 text-xs text-clay tracking-widest uppercase' 
                    : 'top-4 text-stone-500'
                }`}
              >
                Email Address
              </label>
            </div>
          </div>

          {/* Subject Field */}
          <div className="relative group">
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent border-b border-white/20 py-4 text-rice-paper focus:outline-none focus:border-clay transition-all duration-300 appearance-none rounded-none cursor-pointer"
            >
              <option value="" className="bg-charcoal text-stone-500"></option>
              <option value="General Inquiry" className="bg-charcoal">General Inquiry</option>
              <option value="Order Support" className="bg-charcoal">Order Support</option>
              <option value="Workshops" className="bg-charcoal">Workshops</option>
              <option value="Custom Orders" className="bg-charcoal">Custom Orders</option>
              <option value="Corporate Gifting" className="bg-charcoal">Corporate Gifting</option>
            </select>
            <label 
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                focusedField === 'subject' || formData.subject 
                  ? '-top-6 text-xs text-clay tracking-widest uppercase' 
                  : 'top-4 text-stone-500'
              }`}
            >
              Subject
            </label>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>

          {/* Message Field */}
          <div className="relative group">
            <textarea
              name="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-transparent border-b border-white/20 py-4 text-rice-paper placeholder-transparent focus:outline-none focus:border-clay transition-all duration-300 resize-none"
              placeholder="Message"
              id="message"
            ></textarea>
            <label 
              htmlFor="message"
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                focusedField === 'message' || formData.message 
                  ? '-top-6 text-xs text-clay tracking-widest uppercase' 
                  : 'top-4 text-stone-500'
              }`}
            >
              Your Message
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full md:w-auto px-10 py-4 bg-clay text-charcoal font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden mt-8"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />}
            </span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </form>
      )}
    </div>
  );
});

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------
export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: "Do you ship internationally?", answer: "Yes, we ship to select countries. Please contact us for specific shipping rates if your country is not listed at checkout. Note that customs duties may apply." },
    { question: "Are the ceramics dishwasher safe?", answer: "While our high-fired stoneware is durable and dishwasher safe, we recommend hand washing to preserve the glaze's unique character over time." },
    { question: "How can I book a private workshop?", answer: "Private workshops can be arranged for groups of 4-10 people. Use the form above or visit our Workshops page to check availability." },
    { question: "Do you accept wholesale orders?", answer: "Yes, we partner with select boutiques and restaurants. Please visit our Corporate page or email us directly for our wholesale catalog." }
  ];

  return (
    <div className="bg-charcoal min-h-screen selection:bg-clay selection:text-charcoal relative overflow-hidden font-sans text-stone-warm">
      
      <Background />
      <Header />

      <main className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          
          {/* Header Section */}
          <div className="mb-20 max-w-4xl opacity-0 animate-contact-fade-in" style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}>
            <span className="text-clay text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Contact Us
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-rice-paper mb-8 leading-tight">
              Let&apos;s start a <br />
              <span className="italic text-stone-500">conversation.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-warm max-w-2xl font-light leading-relaxed">
              Whether you&apos;re interested in a custom commission, joining a workshop, 
              or simply want to say hello—we are here to listen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Contact Info & Map */}
            <div className="lg:col-span-5 space-y-12 opacity-0 animate-contact-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              
              {/* Info Grid */}
              <div className="grid grid-cols-1 gap-8">
                {/* Address */}
                <div className="group p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-clay/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-charcoal rounded-full border border-white/10 text-clay group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-rice-paper mb-2">Visit the Studio</h3>
                      <p className="text-stone-warm font-light leading-relaxed">
                        311, Silent Zone, Gavier,<br />
                        Dumas Road,<br />
                        Surat-395007
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="group p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-clay/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-charcoal rounded-full border border-white/10 text-clay group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-rice-paper mb-4">Direct Lines</h3>
                      <div className="space-y-3 font-light">
                        <p className="flex items-center gap-3">
                          <span className="text-stone-500 text-sm uppercase tracking-widest w-12">Mail</span>
                          <span className="text-rice-paper hover:text-clay transition-colors duration-200 cursor-pointer">bashobyshivangi2019@gmail.com</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="group p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-clay/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-charcoal rounded-full border border-white/10 text-clay group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-rice-paper mb-4">Studio Hours</h3>
                      <ul className="space-y-2 font-light text-sm">
                        <li className="flex justify-between w-full min-w-[200px] border-b border-white/5 pb-2">
                          <span>Mon - Fri</span> <span className="text-rice-paper">10:00 AM - 7:00 PM</span>
                        </li>
                        <li className="flex justify-between w-full min-w-[200px] border-b border-white/5 pb-2">
                          <span>Saturday</span> <span className="text-rice-paper">10:00 AM - 5:00 PM</span>
                        </li>
                        <li className="flex justify-between w-full min-w-[200px]">
                          <span>Sunday</span> <span className="text-stone-600 italic">Closed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative h-64 w-full overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-300">
                  {/* Updated to 21°07'48.0"N 72°43'26.4"E (approx 21.130000, 72.724000) */}
                  <iframe 
                    src="https://maps.google.com/maps?q=21.130000,72.724000&z=15&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Basho Studio Location"
                    className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                  ></iframe>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7 opacity-0 animate-contact-fade-in" style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}>
              <ContactForm />
              

            </div>
            
          </div>

          {/* New Section: FAQ */}
          <div className="mt-32 max-w-3xl mx-auto opacity-0 animate-contact-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
             <h2 className="font-serif text-3xl md:text-4xl text-rice-paper text-center mb-16">Frequently Asked</h2>
             <div className="space-y-4">
               {faqs.map((faq, index) => (
                 <div key={index} className="border-b border-white/10">
                   <button 
                     onClick={() => toggleFaq(index)}
                     className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
                   >
                     <span className={`text-lg transition-colors duration-200 font-light ${openFaq === index ? 'text-clay' : 'text-stone-warm group-hover:text-rice-paper'}`}>
                        {faq.question}
                     </span>
                     <span className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-clay' : 'text-stone-600 group-hover:text-rice-paper'}`}>
                       {openFaq === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                     </span>
                   </button>
                   <div 
                     className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
                   >
                     <p className="text-stone-500 font-light leading-relaxed pr-8">{faq.answer}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* New Section: Corporate / Collaboration CTA */}
          <div className="mt-32 mb-12 opacity-0 animate-contact-fade-in" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
             <div className="relative overflow-hidden rounded-sm border border-white/5 bg-white/[0.02] p-10 md:p-16 text-center group">
                 <div className="absolute inset-0 bg-gradient-to-r from-clay/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                 
                 <div className="relative z-10">
                    <Briefcase className="w-10 h-10 text-clay mx-auto mb-6 opacity-80" />
                    <h2 className="font-serif text-3xl text-rice-paper mb-4">Looking for Corporate Gifting?</h2>
                    <p className="text-stone-warm font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                        We offer bespoke ceramic collections for restaurants, hotels, and corporate events. 
                        Create a lasting impression with handmade pieces that tell a story.
                    </p>
                    <Link 
                      href="/corporate"
                      className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-clay hover:text-rice-paper transition-colors duration-200 pb-2 border-b border-clay/30 hover:border-rice-paper"
                    >
                        Explore Corporate Solutions <ArrowRight className="w-4 h-4" />
                    </Link>
                 </div>
             </div>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes contact-fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-contact-fade-in {
          animation: contact-fade-in-up 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}