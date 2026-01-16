import React, { useState } from 'react';
import { X, Loader2, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { toast } from 'react-hot-toast'; 
import { bookWorkshop } from '../lib/workshopService'; // Corrected Import

const BookingModal = ({ workshop, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
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
      const totalAmount = workshop.price * formData.attendees;

      // 3. Create Order on Backend
      const orderResponse = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: totalAmount,
          currency: 'INR',
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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Basho Pottery", 
        description: `Booking: ${workshop.title} (${formData.attendees} seats)`,
        image: "/logo.png", // Ensure you have a logo in public folder
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

  if (!workshop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#A0522D] p-6 text-white flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-serif font-bold">{workshop.title}</h2>
            <p className="text-white/80 text-sm mt-1">Complete your reservation</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Workshop Summary */}
        <div className="bg-stone-50 p-4 border-b border-stone-100 flex gap-4 text-sm text-stone-600">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#A0522D]" />
            <span>{new Date(workshop.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#A0522D]" />
            <span>{workshop.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#A0522D]" />
            <span>{workshop.seats} Seats Left</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handlePayment} className="p-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-stone-700">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#A0522D] focus:border-transparent outline-none transition-all"
                placeholder="Your Name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-stone-700">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#A0522D] focus:border-transparent outline-none transition-all"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-stone-700">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#A0522D] focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-stone-700">Number of Attendees</label>
            <div className="relative">
              <Users size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="number"
                name="attendees"
                min="1"
                max={workshop.seats || 5} // Limit max selection to available seats
                required
                value={formData.attendees}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#A0522D] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 mt-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-600">Total Amount</span>
              <span className="text-2xl font-bold text-[#A0522D]">
                ₹{(workshop.price * formData.attendees).toLocaleString()}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A0522D] hover:bg-[#8B4513] text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                'Pay & Book Now'
              )}
            </button>
            <p className="text-xs text-center text-stone-400 mt-3">
              Secure payment powered by Razorpay
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;