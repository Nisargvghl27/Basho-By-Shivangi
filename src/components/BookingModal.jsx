import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { toast } from 'react-hot-toast'; 
import { bookWorkshop } from '../lib/workshopService'; // Corrected Import

const BookingModal = ({ workshop, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendees: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'attendees' ? parseInt(value) || 1 : value
    }));
  };

  // Helper to load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Load Razorpay Script
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      // 2. Calculate Total Amount
      const totalAmount = workshop.price * formData.attendees * 100; // Convert to paise for Razorpay

      // 3. Create Order on Backend
      const orderResponse = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: totalAmount,
          currency: 'INR',
          receipt: `workshop_${Date.now()}`, // Shorter receipt (max 40 chars)
          // Pass customer details for Razorpay Dashboard Notes
          shipping: {
            firstName: formData.name,
            email: formData.email,
            phone: formData.phone
          }
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // 4. Configure Razorpay Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Basho Pottery", 
        description: `Booking: ${workshop.title} (${formData.attendees} seats)`,
        image: "/images/bgr_logo.png", // Use existing bgr_logo.png
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // 5. Verify Payment on Backend
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              // 6. Save Booking to Database (Firestore)
              await handleBookingSuccess(response.razorpay_payment_id, response.razorpay_order_id);
            } else {
              toast.error('Payment verification failed');
              setLoading(false);
            }
          } catch (error) {
            console.error('Verification Error:', error);
            toast.error('Payment verified but booking failed. Please contact support.');
            setLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#A0522D", 
        },
        modal: {
            ondismiss: function() {
                setLoading(false);
            }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Payment Error:', error);
      toast.error('Something went wrong initiating payment.');
      setLoading(false);
    }
  };

  const handleBookingSuccess = async (paymentId, orderId) => {
    try {
      const userDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      const paymentDetails = {
        paymentId: paymentId,
        orderId: orderId
      };

      // Call the service to update seats and save booking
      const result = await bookWorkshop(workshop.id, userDetails, formData.attendees, paymentDetails);

      if (result.success) {
        toast.success('Workshop booked successfully!');
        if (onSuccess) onSuccess(); // Refresh parent data
        onClose(); // Close the modal
      } else {
        toast.error('Payment successful, but seat reservation failed: ' + result.error);
      }
    } catch (error) {
      console.error('Firestore Save Error:', error);
      toast.error('Critical Error: Payment succeeded but booking failed to save.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!workshop || !mounted) return null;

  // Use createPortal to inject the modal into document.body
  return createPortal(
    <div 
      // Changed to fixed inset-0 to cover whole screen
      // Standardized to onClick for consistent behavior
      // Increased z-index to be higher than header (z-50)
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg sm:max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto"
        // Prevent clicks inside modal from closing it
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#A0522D] to-[#7A3E1B] p-4 sm:p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-wide">
              {workshop.title}
            </h2>
            <p className="text-white/90 text-xs sm:text-sm mt-1">
              Complete your reservation in just a few steps
            </p>
          </div>
          
          {/* FIXED CLOSE BUTTON */}
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Stop click from hitting backdrop
              onClose();
            }}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 sm:p-3 hover:bg-white/20 rounded-full transition-all z-20"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Workshop Summary */}
        <div className="bg-stone-50 p-3 sm:p-4 border-b border-stone-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-xl shadow-sm">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#A0522D]/10 rounded-full flex items-center justify-center">
                <Calendar size={14} className="text-[#A0522D]" />
              </div>
              <div>
                <p className="text-stone-500 text-xs uppercase tracking-wide">Date</p>
                <p className="font-semibold text-stone-800 text-xs sm:text-sm">
                  {new Date(workshop.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-xl shadow-sm">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#A0522D]/10 rounded-full flex items-center justify-center">
                <Clock size={14} className="text-[#A0522D]" />
              </div>
              <div>
                <p className="text-stone-500 text-xs uppercase tracking-wide">Time</p>
                <p className="font-semibold text-stone-800 text-xs sm:text-sm">{workshop.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-xl shadow-sm">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#A0522D]/10 rounded-full flex items-center justify-center">
                <Users size={14} className="text-[#A0522D]" />
              </div>
              <div>
                <p className="text-stone-500 text-xs uppercase tracking-wide">Available</p>
                <p className="font-semibold text-stone-800 text-xs sm:text-sm">
                  {workshop.seats} Seats
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handlePayment} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#A0522D] rounded-full"></div>
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A0522D] focus:border-transparent outline-none transition-all shadow-sm text-sm"
                placeholder="Your Full Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#A0522D] rounded-full"></div>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A0522D] focus:border-transparent outline-none transition-all shadow-sm text-sm"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-wide flex items-center gap-2">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#A0522D] rounded-full"></div>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A0522D] focus:border-transparent outline-none transition-all shadow-sm text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-stone-900 uppercase tracking-wide flex items-center gap-2">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#A0522D] rounded-full"></div>
              Number of Attendees
            </label>
            <div className="relative">
              <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" />
              <input
                type="number"
                name="attendees"
                min="1"
                max={workshop.seats || 5}
                required
                value={formData.attendees}
                onChange={handleChange}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#A0522D] focus:border-transparent outline-none transition-all shadow-sm text-black text-sm"
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-stone-50 to-stone-100 p-3 sm:p-5 rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <div>
              <p className="text-xs sm:text-sm text-stone-500 uppercase tracking-wide">
                Total Amount
              </p>
              <p className="text-lg sm:text-2xl font-bold text-[#A0522D]">
                ₹{(workshop.price * formData.attendees).toLocaleString()}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A0522D] hover:bg-[#8B4513] text-white py-2.5 sm:py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              'Pay & Book Now'
            )}
          </button>

          <p className="text-xs text-center text-stone-600 mt-2 sm:mt-3">
            Secure payment powered by Razorpay
          </p>
        </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default BookingModal;