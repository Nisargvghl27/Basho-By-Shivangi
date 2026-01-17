"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Users, 
  Gift, 
  Briefcase, 
  Send, 
  Loader2, 
  CheckCircle2 
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { submitCorporateInquiry } from '../../lib/corporateService';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function CorporatePage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    teamSize: "",
    budget: "",
    inquiryType: "gifting", // gifting, workshop, collaboration
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitCorporateInquiry(formData);
      setSubmitted(true);
      // Reset form logic could go here, but usually better to show success state
    } catch (error) {
      console.error(error);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-charcoal text-rice-paper">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Grain */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-clay/30 bg-clay/10 text-clay text-xs uppercase tracking-widest font-bold mb-6"
          >
            <Briefcase size={14} />
            Corporate Partnerships
          </motion.div>
          
          <motion.h1 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-serif text-rice-paper mb-6 leading-tight"
          >
            Mindful Gifting for <span className="text-clay italic">Modern Teams</span>
          </motion.h1>
          
          <motion.p 
            initial="hidden" 
            animate="visible" 
            variants={fadeInUp}
            className="text-lg md:text-xl text-stone-warm max-w-2xl mx-auto font-light leading-relaxed"
          >
            Bring the grounding nature of clay to your business. Whether through handcrafted artisanal gifts or immersive team-building pottery workshops, we help you create meaningful connections.
          </motion.p>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="px-4 py-16 md:py-24 bg-charcoal-light/30 border-y border-border-subtle">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Card 1: Gifting */}
            <motion.div variants={fadeInUp} className="group bg-charcoal border border-border-subtle p-8 rounded-2xl hover:border-clay/30 transition-all duration-500 hover:shadow-lg hover:shadow-clay/5">
              <div className="w-14 h-14 bg-clay/10 rounded-full flex items-center justify-center text-clay mb-6 group-hover:bg-clay group-hover:text-white transition-colors duration-500">
                <Gift size={28} />
              </div>
              <h3 className="text-2xl font-serif text-rice-paper mb-4">Corporate Gifting</h3>
              <p className="text-stone-warm leading-relaxed mb-6 font-light">
                Move beyond generic swag. Gift your clients and employees handcrafted stoneware that tells a story.
              </p>
              <ul className="space-y-3 text-sm text-stone-300">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2"></span>
                  Custom logo embossing & branding options
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2"></span>
                  Curated hampers (Tea sets, Planters, Dinnerware)
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2"></span>
                  Eco-friendly, plastic-free packaging
                </li>
              </ul>
            </motion.div>

            {/* Card 2: Workshops */}
            <motion.div variants={fadeInUp} className="group bg-charcoal border border-border-subtle p-8 rounded-2xl hover:border-clay/30 transition-all duration-500 hover:shadow-lg hover:shadow-clay/5">
              <div className="w-14 h-14 bg-clay/10 rounded-full flex items-center justify-center text-clay mb-6 group-hover:bg-clay group-hover:text-white transition-colors duration-500">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-serif text-rice-paper mb-4">"Pottery & Peace" Workshops</h3>
              <p className="text-stone-warm leading-relaxed mb-6 font-light">
                A tactile break from screens. Our guided sessions focus on mindfulness, creativity, and team cohesion.
              </p>
              <ul className="space-y-3 text-sm text-stone-300">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2"></span>
                  Private studio sessions for teams of 5-15
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2"></span>
                  On-site workshops for larger corporate events
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2"></span>
                  Includes all materials, glazing, and firing
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- INQUIRY FORM --- */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif text-rice-paper mb-4">Start a Collaboration</h2>
            <p className="text-stone-warm">Fill out the form below and we'll get back to you within 24 hours.</p>
          </motion.div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="bg-charcoal-light border border-clay/30 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-serif text-rice-paper mb-2">Inquiry Received!</h3>
              <p className="text-stone-warm">Thank you for reaching out. We are excited to see what we can create together.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-clay hover:text-white underline underline-offset-4"
              >
                Send another inquiry
              </button>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit} 
              className="bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 space-y-8"
            >
              {/* Company & Contact Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-300">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 text-stone-500 w-5 h-5" />
                    <input 
                      required
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-charcoal-light border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay transition-all placeholder:text-stone-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-300">Contact Person</label>
                  <input 
                    required
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full bg-charcoal-light border border-white/10 rounded-lg px-4 py-3 text-white focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay transition-all placeholder:text-stone-600"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-300">Email Address</label>
                  <input 
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-charcoal-light border border-white/10 rounded-lg px-4 py-3 text-white focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay transition-all placeholder:text-stone-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-300">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-charcoal-light border border-white/10 rounded-lg px-4 py-3 text-white focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay transition-all placeholder:text-stone-600"
                  />
                </div>
              </div>

              {/* Requirement Details */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-300">Inquiry Type</label>
                  <select 
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full bg-charcoal-light border border-white/10 rounded-lg px-4 py-3 text-white focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay appearance-none cursor-pointer"
                  >
                    <option value="gifting">Corporate Gifting</option>
                    <option value="workshop">Team Workshop</option>
                    <option value="collaboration">Brand Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-300">Estimated Team Size</label>
                  <input 
                    type="text"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    placeholder="e.g. 15, 50+"
                    className="w-full bg-charcoal-light border border-white/10 rounded-lg px-4 py-3 text-white focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay transition-all placeholder:text-stone-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-300">Approx. Budget</label>
                  <input 
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="₹"
                    className="w-full bg-charcoal-light border border-white/10 rounded-lg px-4 py-3 text-white focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay transition-all placeholder:text-stone-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-300">Tell us about your requirement</label>
                <textarea 
                  required
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your vision, preferred dates, or specific product interests..."
                  className="w-full bg-charcoal-light border border-white/10 rounded-lg px-4 py-3 text-white focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay transition-all placeholder:text-stone-600 resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-clay hover:bg-clay/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-clay/20 hover:scale-[1.01] disabled:opacity-70 disabled:scale-100"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
                Submit Inquiry
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}