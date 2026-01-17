"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CursorGlow from "../components/CursorGlow";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Instagram, 
  Facebook, 
  Twitter,
  ArrowRight
} from "lucide-react";
// Firebase Imports
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState(null); // Add error state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Add document to 'contact_inquiries' collection
      await addDoc(collection(db, "contact_inquiries"), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "General Inquiry",
        message: formData.message,
        status: "unread", // Default status
        createdAt: serverTimestamp(),
      });

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
    <div className="bg-charcoal min-h-screen selection:bg-clay selection:text-charcoal relative overflow-hidden font-sans text-stone-warm">
      
      {/* --- Texture Overlay --- */}
      <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0">
          <div
              className="absolute inset-0 animate-grain-shift"
              style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
                  backgroundSize: '200px 200px'
              }}
          />
      </div>

      <CursorGlow />
      <Header />

      <main className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          
          {/* Header Section */}
          <div className="mb-20 max-w-4xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
            <div className="lg:col-span-5 space-y-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              
              {/* Info Grid */}
              <div className="grid grid-cols-1 gap-8">
                {/* Address */}
                <div className="group p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-clay/30 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-charcoal rounded-full border border-white/10 text-clay group-hover:scale-110 transition-transform duration-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-rice-paper mb-2">Visit the Studio</h3>
                      <p className="text-stone-warm font-light leading-relaxed">
                        Basho by Shivangi<br />
                        Vesu, Surat<br />
                        Gujarat, India 395007
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="group p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-clay/30 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-charcoal rounded-full border border-white/10 text-clay group-hover:scale-110 transition-transform duration-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-rice-paper mb-4">Direct Lines</h3>
                      <div className="space-y-3 font-light">
                        <p className="flex items-center gap-3">
                          <span className="text-stone-500 text-sm uppercase tracking-widest w-12">Mail</span>
                          <span className="text-rice-paper hover:text-clay transition-colors cursor-pointer">bashobyshivangi2019@gmail.com</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <span className="text-stone-500 text-sm uppercase tracking-widest w-12">Call</span>
                          <span className="text-rice-paper hover:text-clay transition-colors cursor-pointer">+91 98765 43210</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="group p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-clay/30 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-charcoal rounded-full border border-white/10 text-clay group-hover:scale-110 transition-transform duration-500">
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
              <div className="relative h-64 w-full overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.246726294767!2d72.7770851!3d21.1425624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be05274d75f284d%3A0x67258384210085!2sVesu%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Basho Studio Location"
                    className="opacity-70 hover:opacity-100 transition-opacity duration-500"
                  ></iframe>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
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
                          className="w-full bg-transparent border-b border-white/20 py-4 text-rice-paper placeholder-transparent focus:outline-none focus:border-clay transition-all duration-500"
                          placeholder="Name"
                          id="name"
                        />
                        <label 
                          htmlFor="name"
                          className={`absolute left-0 transition-all duration-500 pointer-events-none ${
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
                          className="w-full bg-transparent border-b border-white/20 py-4 text-rice-paper placeholder-transparent focus:outline-none focus:border-clay transition-all duration-500"
                          placeholder="Email"
                          id="email"
                        />
                        <label 
                          htmlFor="email"
                          className={`absolute left-0 transition-all duration-500 pointer-events-none ${
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
                        className="w-full bg-transparent border-b border-white/20 py-4 text-rice-paper focus:outline-none focus:border-clay transition-all duration-500 appearance-none rounded-none"
                      >
                        <option value="" className="bg-charcoal text-stone-500">Select a subject</option>
                        <option value="General Inquiry" className="bg-charcoal">General Inquiry</option>
                        <option value="Order Support" className="bg-charcoal">Order Support</option>
                        <option value="Workshops" className="bg-charcoal">Workshops</option>
                        <option value="Custom Orders" className="bg-charcoal">Custom Orders</option>
                        <option value="Corporate Gifting" className="bg-charcoal">Corporate Gifting</option>
                      </select>
                      <label 
                        className={`absolute left-0 transition-all duration-500 pointer-events-none ${
                          focusedField === 'subject' || formData.subject 
                            ? '-top-6 text-xs text-clay tracking-widest uppercase' 
                            : 'top-4 text-stone-500'
                        }`}
                      >
                        Subject
                      </label>
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
                        className="w-full bg-transparent border-b border-white/20 py-4 text-rice-paper placeholder-transparent focus:outline-none focus:border-clay transition-all duration-500 resize-none"
                        placeholder="Message"
                        id="message"
                      ></textarea>
                      <label 
                        htmlFor="message"
                        className={`absolute left-0 transition-all duration-500 pointer-events-none ${
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
                      className="group relative w-full md:w-auto px-10 py-4 bg-clay text-charcoal font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden mt-8"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      </span>
                      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </button>
                  </form>
                )}
              </div>
              
              {/* Social Links Row */}
              <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start pl-8">
                  <span className="text-stone-600 text-[10px] uppercase tracking-widest">Connect</span>
                  <div className="h-px w-12 bg-white/10" />
                  <a href="#" className="text-stone-500 hover:text-clay transition-all hover:-translate-y-1"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="text-stone-500 hover:text-clay transition-all hover:-translate-y-1"><Facebook className="w-5 h-5" /></a>
                  <a href="#" className="text-stone-500 hover:text-clay transition-all hover:-translate-y-1"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}