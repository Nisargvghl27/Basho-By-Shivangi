"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader2, Send } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { submitCustomRequest } from '../../lib/customOrderService';

export default function CustomRequestPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    budgetRange: "100-300",
    description: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const requestData = {
        ...formData,
        userId: "guest", // Replace with auth ID if available
      };

      await submitCustomRequest(requestData, imageFile);
      alert("Request submitted successfully! We will contact you shortly.");
      router.push('/shop');
    } catch (error) {
      alert("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-rice-paper">
      <Header />
      <div className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-rice-paper mb-4">Custom Commission Request</h1>
          <p className="text-stone-warm">Have a specific vision? Let&apos;s bring it to life.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-300">Your Name</label>
              <input 
                required
                className="w-full bg-charcoal-light border border-white/10 rounded-lg p-3 text-white focus:border-clay focus:outline-none transition-colors"
                value={formData.userName}
                onChange={e => setFormData({...formData, userName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-300">Email Address</label>
              <input 
                required
                type="email"
                className="w-full bg-charcoal-light border border-white/10 rounded-lg p-3 text-white focus:border-clay focus:outline-none transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-300">Budget Range ($)</label>
            <select 
              className="w-full bg-charcoal-light border border-white/10 rounded-lg p-3 text-white focus:border-clay focus:outline-none"
              value={formData.budgetRange}
              onChange={e => setFormData({...formData, budgetRange: e.target.value})}
            >
              <option value="50-100">$50 - $100</option>
              <option value="100-300">$100 - $300</option>
              <option value="300-500">$300 - $500</option>
              <option value="500+">$500+</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-300">Description of your Vision</label>
            <textarea 
              required
              rows={5}
              placeholder="Describe shape, size, color, purpose..."
              className="w-full bg-charcoal-light border border-white/10 rounded-lg p-3 text-white focus:border-clay focus:outline-none transition-colors"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-300">Reference Image (Optional)</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {preview ? (
                <img src={preview} alt="Preview" className="h-40 object-contain rounded-lg shadow-lg" />
              ) : (
                <>
                  <Upload className="w-10 h-10 text-clay mb-3" />
                  <p className="text-sm text-stone-400">Click to upload a sketch or inspiration</p>
                </>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-clay hover:bg-clay/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
            Submit Request
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}