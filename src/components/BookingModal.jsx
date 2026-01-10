"use client";

import { useState } from "react";
import { X, Loader2, Users, CheckCircle } from "lucide-react";
import { bookWorkshop } from "../lib/workshopService";
import { auth } from "../lib/firebase";

export default function BookingModal({ workshop, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState("form"); // form | success

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    seats: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Check if user is logged in
    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to book a workshop. Please sign in first.");
      setLoading(false);
      return;
    }

    // 2. Basic validation for seat availability
    if (formData.seats > workshop.seats) {
      setError(`Only ${workshop.seats} seats remaining.`);
      setLoading(false);
      return;
    }

    // 3. Attempt Booking
    const result = await bookWorkshop(workshop.id, formData, parseInt(formData.seats));

    if (result.success) {
      setStep("success");
      if (onSuccess) onSuccess(); // Callback to refresh data in parent
    } else {
      setError(result.error || "Booking failed. Please try again.");
    }
    setLoading(false);
  };

  if (!workshop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X size={24} />
        </button>

        {step === "success" ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Confirmed!</h3>
            <p className="text-gray-500">
              You have successfully booked {formData.seats} seat(s) for <br/>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{workshop.title}</span>.
            </p>
            <button 
              onClick={onClose}
              className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-black transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Workshop</h3>
              <p className="text-sm text-gray-500 mt-1">{workshop.title}</p>
              <div className="flex items-center gap-2 mt-2 text-xs font-medium text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded">
                <Users size={12} />
                {workshop.seats} seats remaining
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input required name="name" type="text" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input required name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input required name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+1 234..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Seats</label>
                  <input required name="seats" type="number" min="1" max={workshop.seats} value={formData.seats} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
                  {error}
                </div>
              )}

              <div className="pt-2">
                 <div className="flex justify-between items-center mb-4 text-sm font-semibold">
                    <span>Total Price:</span>
                    <span>₹{workshop.price * formData.seats}</span>
                 </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center"
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}