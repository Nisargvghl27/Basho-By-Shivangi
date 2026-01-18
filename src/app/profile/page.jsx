"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Download, LogOut, User, Package, Calendar, DollarSign } from "lucide-react";
import Header from "../../components/Header";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Fetch authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserOrders(currentUser.email);
      } else {
        router.push("/auth/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch user's orders from Firestore
  const fetchUserOrders = async (email) => {
    try {
      setLoadingOrders(true);
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("shipping.email", "==", email),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const dateObj = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();

        return {
          id: doc.id,
          orderId: data.razorpayOrderId || "N/A",
          items: data.items || [],
          total: data.total || 0,
          status: data.status || "pending",
          paymentStatus: data.paymentStatus || "pending",
          orderDate: dateObj.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          rawDate: dateObj,
          shipping: data.shipping || {},
        };
      });

      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Handle download bill
  const handleDownloadBill = async (orderId) => {
    try {
      const billUrl = `/api/download-bill?orderId=${orderId}&email=${encodeURIComponent(user.email)}`;
      const link = document.createElement("a");
      link.href = billUrl;
      link.download = `Invoice_${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading bill:", error);
      alert("Failed to download bill. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-clay border-t-rice-paper rounded-full animate-spin"></div>
          <p className="text-rice-paper">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Main Website Header */}
      <Header />

      {/* Profile Header Section */}
      <div className="w-full bg-charcoal py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-charcoal-light to-charcoal border-l-4 border-clay rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-rice-paper">My Profile</h1>
            <p className="text-clay text-sm mt-1">View and download your orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-900/30 hover:bg-red-900/50 border border-red-700 text-red-300 rounded transition-all duration-300 whitespace-nowrap"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Section */}
        <div className="bg-charcoal-light border border-clay/20 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-clay/20 flex items-center justify-center">
              <User className="w-6 h-6 text-clay" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-rice-paper">{user.displayName || user.email}</h2>
              <p className="text-clay text-sm">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div>
          <h3 className="text-2xl font-serif text-rice-paper mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-clay" />
            Your Orders
          </h3>

          {loadingOrders ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-clay border-t-rice-paper rounded-full animate-spin"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-charcoal-light border border-clay/20 rounded-lg p-12 text-center">
              <Package className="w-12 h-12 text-clay/50 mx-auto mb-4" />
              <p className="text-clay">No orders found</p>
              <p className="text-stone-400 text-sm mt-2">Start shopping to see your orders here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-charcoal-light border border-clay/20 rounded-lg p-6 hover:border-clay/40 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                    {/* Order ID */}
                    <div>
                      <p className="text-clay text-xs uppercase tracking-wide mb-1">Order ID</p>
                      <p className="text-rice-paper font-mono text-sm break-all">{order.id.substring(0, 12)}...</p>
                    </div>

                    {/* Date */}
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-clay mt-4" />
                      <div>
                        <p className="text-clay text-xs uppercase tracking-wide mb-1">Date</p>
                        <p className="text-rice-paper text-sm">{order.orderDate}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="text-clay text-xs uppercase tracking-wide mb-1">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          order.status === "completed" || order.status === "delivered"
                            ? "bg-green-900/30 text-green-300 border border-green-700/50"
                            : order.status === "pending"
                            ? "bg-yellow-900/30 text-yellow-300 border border-yellow-700/50"
                            : order.status === "processing"
                            ? "bg-blue-900/30 text-blue-300 border border-blue-700/50"
                            : "bg-gray-900/30 text-gray-300 border border-gray-700/50"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Payment Status */}
                    <div>
                      <p className="text-clay text-xs uppercase tracking-wide mb-1">Payment</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          order.paymentStatus === "paid"
                            ? "bg-green-900/30 text-green-300 border border-green-700/50"
                            : "bg-red-900/30 text-red-300 border border-red-700/50"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>

                    {/* Total */}
                    <div className="flex items-end justify-between lg:justify-start lg:flex-col">
                      <p className="text-clay text-xs uppercase tracking-wide mb-1">Total</p>
                      <p className="text-rice-paper font-semibold text-lg">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mb-4 p-3 bg-charcoal/50 rounded border border-clay/10">
                    <p className="text-clay text-xs uppercase tracking-wide mb-2">Items</p>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-stone-300 text-sm">
                          • {item.name || item.title} (x{item.quantity})
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDownloadBill(order.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-clay/20 hover:bg-clay/30 border border-clay/50 hover:border-clay text-clay rounded transition-all duration-300 group"
                    >
                      <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                      <span className="text-sm font-medium">Download Invoice</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
