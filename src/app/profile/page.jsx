"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { 
  Download, 
  LogOut, 
  User, 
  Package, 
  Calendar, 
  ChevronDown, 
  MapPin, 
  Clock, 
  CreditCard,
  Settings,
  ChevronRight,
  TrendingUp,
  ShoppingBag,
  Award,
  Box,
  Mail,
  Link2
} from "lucide-react";
import toast from "react-hot-toast";
import Header from "../../components/Header";

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 5;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getStatusClasses = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
    case "delivered":
      return "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50";
    case "pending":
      return "bg-amber-900/40 text-amber-300 border border-amber-700/50";
    case "processing":
      return "bg-blue-900/40 text-blue-300 border border-blue-700/50";
    case "shipped":
      return "bg-indigo-900/40 text-indigo-300 border border-indigo-700/50";
    case "cancelled":
      return "bg-red-900/40 text-red-300 border border-red-700/50";
    default:
      return "bg-stone/10 text-stone border border-stone/30";
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

// ─── Skeleton Components ───────────────────────────────────────────────────────
const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse rounded bg-white/5 ${className}`} />
);

const OrderCardSkeleton = () => (
  <div className="bg-charcoal-light/50 border border-clay/10 rounded-xl p-6">
    <div className="flex justify-between mb-6">
      <SkeletonBlock className="h-6 w-32" />
      <SkeletonBlock className="h-6 w-24 rounded-full" />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <SkeletonBlock className="h-10 w-full" />
      <SkeletonBlock className="h-10 w-full" />
      <SkeletonBlock className="h-10 w-full" />
      <SkeletonBlock className="h-10 w-full" />
    </div>
    <SkeletonBlock className="h-12 w-full rounded-lg" />
  </div>
);

// ─── Components ──────────────────────────────────────────────────────────────

const OrderTracker = ({ status }) => {
  const steps = ["pending", "processing", "shipped", "delivered"];
  const currentStatusStr = (status || "pending").toLowerCase();
  
  // Handle cancelled state
  if (currentStatusStr === "cancelled") {
    return (
      <div className="w-full py-4 px-2">
        <div className="flex items-center text-red-400 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm font-medium">Order Cancelled</span>
        </div>
      </div>
    );
  }

  // Find current step index (default to 0 if not found)
  let currentIndex = steps.indexOf(currentStatusStr);
  if (currentIndex === -1) currentIndex = 0;
  
  // Special case for "completed" which maps to delivered
  if (currentStatusStr === "completed") currentIndex = 3;

  return (
    <div className="w-full py-6 relative">
      {/* Background Line */}
      <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-clay/10 -translate-y-1/2 rounded-full z-0"></div>
      
      {/* Active Line */}
      <div 
        className="absolute top-1/2 left-[10%] h-[2px] bg-clay -translate-y-1/2 rounded-full z-0 transition-all duration-700 ease-in-out"
        style={{ width: `${(currentIndex / (steps.length - 1)) * 80}%` }}
      ></div>

      <div className="relative z-10 flex justify-between">
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          const isActive = idx === currentIndex;
          
          return (
            <div key={step} className="flex flex-col items-center w-1/4">
              <div 
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted 
                    ? "bg-clay text-charcoal shadow-[0_0_15px_rgba(166,93,61,0.4)]" 
                    : "bg-charcoal border-2 border-clay/20 text-clay/30"
                } ${isActive ? "scale-110 ring-4 ring-clay/20" : ""}`}
              >
                {isCompleted ? (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-current opacity-50"></div>
                )}
              </div>
              <span className={`mt-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                isCompleted ? "text-rice-paper" : "text-stone-warm/40"
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderCard = memo(function OrderCard({ order, onDownload, onRefundRequest, isProcessingRefund, animationDelay, isCompact = false }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-charcoal-light/40 border border-clay/15 rounded-xl overflow-hidden
                 hover:border-clay/40 transition-all duration-300
                 animate-fade-in-up opacity-0 shadow-lg group relative`}
      style={{ animationDelay, animationFillMode: "forwards" }}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-clay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="p-5 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-clay/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Package className="w-5 h-5 text-clay" />
              <h4 className="text-rice-paper font-serif text-lg sm:text-xl">
                Order #{order.id.substring(0, 8).toUpperCase()}
              </h4>
            </div>
            <p className="text-stone-warm/60 text-sm flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Placed on {order.orderDate}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${getStatusClasses(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

          {/* Tracker (Only show on full view, not compact) */}
          {!isCompact && (
            <div className="mb-8 bg-charcoal/30 rounded-xl p-2 sm:p-4 border border-clay/5">
              <OrderTracker status={order.status} />
            </div>
          )}
  
          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="text-clay/70 text-xs uppercase tracking-widest font-semibold mb-1">Total Amount</p>
              <p className="text-rice-paper font-semibold text-lg">{formatCurrency(order.total)}</p>
            </div>
            <div>
              <p className="text-clay/70 text-xs uppercase tracking-widest font-semibold mb-1">Items</p>
              <p className="text-rice-paper font-medium">{order.items?.length || 0} items</p>
            </div>
            <div>
              <p className="text-clay/70 text-xs uppercase tracking-widest font-semibold mb-1">Payment</p>
              <div className="flex items-center gap-1.5 text-rice-paper">
                <CreditCard className="w-4 h-4 text-stone-warm/60" />
                <span className="capitalize text-sm font-medium">{order.paymentStatus}</span>
              </div>
            </div>
            <div>
              <p className="text-clay/70 text-xs uppercase tracking-widest font-semibold mb-1">Shipping To</p>
              <div className="flex items-start gap-1.5 text-rice-paper">
                <MapPin className="w-4 h-4 text-stone-warm/60 shrink-0 mt-0.5" />
                <span className="text-sm line-clamp-2" title={order.shipping?.city}>
                  {order.shipping?.city || 'N/A'}, {order.shipping?.state || ''}
                </span>
              </div>
            </div>
          </div>
  
          {/* Actions & Expand */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-clay/10">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-clay hover:text-rice-paper text-sm font-medium flex items-center gap-1 transition-colors"
            >
              {expanded ? "Hide Items" : "View Items"}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
            
            <div className="flex items-center gap-3">
              {order.paymentStatus?.toLowerCase() === 'paid' && !order.refundRequested && !order.refundRejected && (
                <button
                  onClick={() => onRefundRequest(order)}
                  disabled={isProcessingRefund}
                  className={`flex items-center gap-2 px-5 py-2.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 border border-red-900/50 rounded-lg transition-all duration-300 shadow-sm ${isProcessingRefund ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="text-sm font-bold tracking-wide">
                    {isProcessingRefund ? 'Processing...' : 'Request Refund'}
                  </span>
                </button>
              )}
              {order.paymentStatus?.toLowerCase() === 'paid' && order.refundRequested && !order.refundRejected && (
                <div className="flex items-center gap-2 px-5 py-2.5 bg-yellow-900/20 text-yellow-500 border border-yellow-900/50 rounded-lg shadow-sm">
                  <span className="text-sm font-bold tracking-wide">Refund Requested</span>
                </div>
              )}
              {order.paymentStatus?.toLowerCase() === 'paid' && order.refundRejected && (
                <div className="flex items-center gap-2 px-5 py-2.5 bg-red-900/20 text-red-500 border border-red-900/50 rounded-lg shadow-sm">
                  <span className="text-sm font-bold tracking-wide">Refund Rejected</span>
                </div>
              )}
              <button
                onClick={() => onDownload(order.id, order.shipping?.email)}
                className="flex items-center gap-2 px-5 py-2.5 bg-charcoal hover:bg-clay text-clay hover:text-charcoal border border-clay rounded-lg transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span className="text-sm font-bold tracking-wide">Invoice</span>
              </button>
            </div>
          </div>
  
          {/* Expanded Items Area */}
        <div className={`grid transition-all duration-500 ease-in-out ${expanded ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="bg-charcoal/50 rounded-xl border border-clay/10 overflow-hidden divide-y divide-clay/5">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
                  <div className="w-16 h-16 bg-charcoal-light rounded-lg border border-clay/20 flex-shrink-0 overflow-hidden flex items-center justify-center relative group">
                    {item.image || item.image_url ? (
                      <img src={item.image || item.image_url} alt={item.name || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <Box className="w-6 h-6 text-clay/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-rice-paper font-medium text-sm sm:text-base truncate">{item.name || item.title}</p>
                    <p className="text-stone-warm/60 text-xs sm:text-sm mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-clay font-semibold text-sm sm:text-base">{formatCurrency((item.price || 0) * (item.quantity || 1))}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [ordersPage, setOrdersPage] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");

  // Three-phase loading: "auth" → full skeleton, "orders" → list skeleton, false → done
  const [loading, setLoading] = useState("auth");
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Link Order State
  const [linkOrderId, setLinkOrderId] = useState("");
  const [linkOrderEmail, setLinkOrderEmail] = useState("");
  const [linkingOrder, setLinkingOrder] = useState(false);

  // ── Firestore fetch (parallel by email & userId) ──────────────────────────
  const fetchOrders = useCallback(async (email, uid) => {
    try {
      const ordersRef = collection(db, "orders");
      
      const qEmail = query(ordersRef, where("shipping.email", "==", email));
      let qUid = null;
      if (uid) {
        qUid = query(ordersRef, where("userId", "==", uid));
      }

      const [snapEmail, snapUid] = await Promise.all([
        getDocs(qEmail),
        qUid ? getDocs(qUid) : Promise.resolve({ docs: [] })
      ]);

      const seenIds = new Set();
      const combinedDocs = [];

      const processDoc = (docSnap) => {
        if (seenIds.has(docSnap.id)) return;
        seenIds.add(docSnap.id);

        const data = docSnap.data();
        const dateObj = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
        combinedDocs.push({
          id: docSnap.id,
          orderId: data.razorpayOrderId || "N/A",
          items: data.items || [],
          total: data.total || 0,
          status: data.status || "pending",
          paymentStatus: data.paymentStatus || "pending",
          refundRequested: data.refundRequested || false,
          refundRejected: data.refundRejected || false,
          orderDate: dateObj.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          rawDate: dateObj,
          shipping: data.shipping || {},
          _snap: docSnap,
        });
      };

      snapEmail.docs.forEach(processDoc);
      snapUid.docs.forEach(processDoc);

      // Sort by date descending client-side
      combinedDocs.sort((a, b) => b.rawDate - a.rawDate);

      return combinedDocs;
    } catch (err) {
      console.error("fetchOrders error:", err);
      throw err;
    }
  }, []);

  // ── Initial load ──────────────────────────────────────────────────────────
  const loadInitialData = useCallback(
    async (currentUser) => {
      setLoading("orders");
      try {
        // Fetch User profile data from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        // Fetch Orders
        const fetchedOrders = await fetchOrders(currentUser.email, currentUser.uid);
        setAllOrders(fetchedOrders);
        setOrdersPage(1);
        setOrders(fetchedOrders.slice(0, PAGE_SIZE));
        setHasMore(fetchedOrders.length > PAGE_SIZE);
      } catch (err) {
        console.error("Error fetching user data/orders:", err);
      } finally {
        setLoading(false);
      }
    },
    [fetchOrders]
  );

  // ── Handle Refund Request ─────────────────────────────────────────────────
  const [processingRefunds, setProcessingRefunds] = useState(new Set());

  const handleRequestRefund = useCallback(async (order) => {
    if (order.refundRequested || processingRefunds.has(order.id)) return;

    const reason = window.prompt("Please briefly explain why you are requesting a refund. Our team will review your request.");
    if (!reason || reason.trim() === "") return;

    setProcessingRefunds(prev => new Set(prev).add(order.id));

    try {
      // Create a query to check if a refund request already exists for this order
      const refundsRef = collection(db, "refunds");
      const q = query(refundsRef, where("paymentId", "==", order.id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        toast.error("A refund request has already been submitted for this order.");
        // Update local state to hide the button
        setOrders(prevOrders => prevOrders.map(o => o.id === order.id ? { ...o, refundRequested: true } : o));
        setAllOrders(prevOrders => prevOrders.map(o => o.id === order.id ? { ...o, refundRequested: true } : o));
        setProcessingRefunds(prev => {
          const next = new Set(prev);
          next.delete(order.id);
          return next;
        });
        return;
      }

      await addDoc(refundsRef, {
        paymentId: order.id,
        orderId: order.orderId,
        customer: `${order.shipping?.firstName || "Customer"} ${order.shipping?.lastName || ""}`.trim(),
        email: order.shipping?.email || "",
        originalAmount: parseFloat(order.total),
        refundAmount: parseFloat(order.total), // Default to full amount; admin can modify later
        reason: reason,
        status: "Pending",
        requestedAt: serverTimestamp(),
        refundMethod: "Original Payment Method"
      });

      // Update the main order document so we know a refund was requested
      await updateDoc(doc(db, "orders", order.id), {
        refundRequested: true
      });

      // Update the local orders state to reflect the refund request
      setOrders(prevOrders => prevOrders.map(o => 
        o.id === order.id ? { ...o, refundRequested: true } : o
      ));
      setAllOrders(prevOrders => prevOrders.map(o => 
        o.id === order.id ? { ...o, refundRequested: true } : o
      ));

      toast.success(`Refund requested for Order #${order.id.substring(0, 8).toUpperCase()}. Our team will review it shortly.`);
    } catch (err) {
      console.error("Refund request error:", err);
      toast.error("Failed to submit refund request.");
    } finally {
      setProcessingRefunds(prev => {
        const next = new Set(prev);
        next.delete(order.id);
        return next;
      });
    }
  }, [processingRefunds]);

  // ── Load more ─────────────────────────────────────────────────────────────
  const handleLoadMore = useCallback(async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    // Simulate a tiny delay for smooth animation
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const nextPage = ordersPage + 1;
      const nextSlice = allOrders.slice(0, nextPage * PAGE_SIZE);
      setOrders(nextSlice);
      setOrdersPage(nextPage);
      setHasMore(allOrders.length > nextSlice.length);
    } catch (err) {
      console.error("Error loading more orders:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [allOrders, ordersPage, loadingMore]);

  // ── Link Previous Order handler ───────────────────────────────────────────
  const handleLinkOrder = async (e) => {
    e.preventDefault();
    if (!linkOrderId.trim() || !linkOrderEmail.trim() || !user) return;
    setLinkingOrder(true);
    try {
      const trimmedId = linkOrderId.trim();
      const trimmedEmail = linkOrderEmail.trim().toLowerCase();
      
      const orderRef = doc(db, "orders", trimmedId);
      const orderSnap = await getDoc(orderRef);
      
      if (!orderSnap.exists()) {
        toast.error("Order not found. Please check the Order ID.");
        setLinkingOrder(false);
        return;
      }

      const orderData = orderSnap.data();
      const shippingEmail = (orderData.shipping?.email || "").toLowerCase();
      
      if (shippingEmail !== trimmedEmail) {
        toast.error("Checkout email does not match this Order ID.");
        setLinkingOrder(false);
        return;
      }

      if (orderData.userId) {
        if (orderData.userId === user.uid) {
          toast.success("This order is already linked to your account.");
          setLinkOrderId("");
          setLinkOrderEmail("");
          setLinkingOrder(false);
          return;
        } else {
          toast.error("This order is already linked to another account.");
          setLinkingOrder(false);
          return;
        }
      }

      // Link order to logged-in user
      await updateDoc(orderRef, {
        userId: user.uid,
        linkedAt: new Date()
      });

      toast.success("Order successfully linked to your account!");
      setLinkOrderId("");
      setLinkOrderEmail("");
      
      // Refresh order list
      await loadInitialData(user);
    } catch (err) {
      console.error("Error linking order:", err);
      toast.error("Failed to link order: " + err.message);
    } finally {
      setLinkingOrder(false);
    }
  };

  // ── Auth listener ─────────────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadInitialData(currentUser);
      } else {
        router.push("/auth/login");
      }
    });
    return () => unsubscribe();
  }, [router, loadInitialData]);

  // ── Download handler ──────────────────────────────────────────────────────
  const handleDownloadBill = useCallback(
    (orderId, shippingEmail) => {
      try {
        const emailToUse = shippingEmail || user.email;
        const billUrl = `/api/download-bill?orderId=${orderId}&email=${encodeURIComponent(
          emailToUse
        )}`;
        const link = document.createElement("a");
        link.href = billUrl;
        link.download = `Invoice_${orderId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Error downloading bill:", err);
        toast.error("Failed to download bill. Please try again.");
      }
    },
    [user]
  );

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }, [router]);

  // ── Calculated Stats ──────────────────────────────────────────────────────
  const joinDate = userData?.joinDate?.toDate 
    ? userData.joinDate.toDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently';
    
  // If Firestore doesn't have it, calculate from loaded orders (though it might just be the first page)
  const displayTotalOrders = userData?.totalOrders || orders.length;
  const displayTotalSpent = userData?.totalSpent || orders.reduce((sum, o) => sum + o.total, 0);

  // ─── Auth loading skeleton ─────────
  if (loading === "auth") {
    return (
      <div className="min-h-screen bg-charcoal">
        <Header />
        <div className="w-full bg-charcoal py-12">
          <div className="max-w-6xl mx-auto px-4">
             <SkeletonBlock className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-charcoal text-rice-paper pb-20">
      <Header />

      {/* ── Hero Banner ── */}
      <div className="w-full relative bg-charcoal overflow-hidden border-b border-clay/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20rem] -right-[20rem] w-[50rem] h-[50rem] rounded-full bg-clay/5 blur-3xl opacity-50"></div>
          <div className="absolute -bottom-[20rem] -left-[20rem] w-[40rem] h-[40rem] rounded-full bg-stone/5 blur-3xl opacity-50"></div>
          <div className="grain-texture opacity-20"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-charcoal bg-charcoal-light shadow-2xl flex items-center justify-center overflow-hidden z-10 relative">
                {userData?.photoURL || user.photoURL ? (
                  <img src={userData?.photoURL || user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-serif text-clay uppercase">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <Link href="/profile/edit" className="absolute bottom-2 right-2 w-10 h-10 bg-clay text-charcoal rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-20">
                <Settings className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="text-center md:text-left flex-1 mb-2 md:mb-6">
              <h1 className="text-3xl md:text-5xl font-serif text-rice-paper mb-2">{user.displayName || "Valued Customer"}</h1>
              <p className="text-clay/80 flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" /> {user.email}
              </p>
            </div>
            
            <div className="mb-2 md:mb-6 flex gap-4 w-full md:w-auto">
              <button
                onClick={handleLogout}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-red-900/20 hover:bg-red-900/40 border border-red-700/50 text-red-300 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="sticky top-[73px] z-40 bg-charcoal/90 backdrop-blur-md border-b border-clay/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto custom-scrollbar">
            {["overview", "orders", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-5 text-sm font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all duration-300 ${
                  activeTab === tab 
                    ? "border-clay text-clay" 
                    : "border-transparent text-stone-warm/50 hover:text-rice-paper"
                }`}
              >
                {tab === "overview" && <span className="flex items-center gap-2"><User className="w-4 h-4" /> Overview</span>}
                {tab === "orders" && <span className="flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> Order History</span>}
                {tab === "settings" && <span className="flex items-center gap-2"><Settings className="w-4 h-4" /> Settings</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* TAB: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-charcoal-light to-charcoal border border-clay/15 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-clay/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-clay/10 transition-colors duration-500"></div>
                <ShoppingBag className="w-8 h-8 text-clay mb-4" />
                <p className="text-stone-warm/60 text-sm font-medium uppercase tracking-wider mb-1">Total Orders</p>
                <p className="text-3xl font-serif text-rice-paper">{displayTotalOrders}</p>
              </div>
              
              <div className="bg-gradient-to-br from-charcoal-light to-charcoal border border-clay/15 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
                <TrendingUp className="w-8 h-8 text-emerald-400 mb-4" />
                <p className="text-stone-warm/60 text-sm font-medium uppercase tracking-wider mb-1">Total Spent</p>
                <p className="text-3xl font-serif text-rice-paper">{formatCurrency(displayTotalSpent)}</p>
              </div>

              <div className="bg-gradient-to-br from-charcoal-light to-charcoal border border-clay/15 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-amber-500/10 transition-colors duration-500"></div>
                <Award className="w-8 h-8 text-amber-400 mb-4" />
                <p className="text-stone-warm/60 text-sm font-medium uppercase tracking-wider mb-1">Member Since</p>
                <p className="text-2xl font-serif text-rice-paper mt-2">{joinDate}</p>
              </div>
            </div>

            {/* Personal Info & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-charcoal-light/50 border border-clay/10 rounded-2xl p-6 h-full flex flex-col">
                  <h3 className="text-lg font-serif text-rice-paper mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-clay" /> Personal Details
                  </h3>
                  <div className="space-y-5 flex-1">
                    <div>
                      <p className="text-stone-warm/50 text-xs uppercase tracking-wider mb-1">Full Name</p>
                      <p className="text-rice-paper font-medium">{userData?.name || user.displayName || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-stone-warm/50 text-xs uppercase tracking-wider mb-1">Email</p>
                      <p className="text-rice-paper font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-stone-warm/50 text-xs uppercase tracking-wider mb-1">Phone Number</p>
                      <p className="text-rice-paper font-medium">{userData?.phone && userData.phone !== "N/A" ? userData.phone : "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-stone-warm/50 text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Default Address
                      </p>
                      {userData?.defaultAddress?.street ? (
                        <p className="text-rice-paper text-sm leading-relaxed">
                          {userData.defaultAddress.street}
                          {userData.defaultAddress.apartment && `, ${userData.defaultAddress.apartment}`}<br />
                          {[userData.defaultAddress.city, userData.defaultAddress.state, userData.defaultAddress.pincode].filter(Boolean).join(", ")}
                          {userData.defaultAddress.country && <><br />{userData.defaultAddress.country}</>}
                        </p>
                      ) : (
                        <p className="text-stone-warm/40 text-sm italic">Not set — <Link href="/profile/edit" className="text-clay underline-offset-2 underline">add one</Link></p>
                      )}
                    </div>
                    <div className="pt-4 mt-2 border-t border-clay/10">
                      <Link href="/profile/edit" className="text-clay hover:text-rice-paper text-sm font-semibold flex items-center gap-1 transition-colors">
                        Update Details <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders Snippet */}
              <div className="lg:col-span-2">
                <div className="bg-charcoal-light/50 border border-clay/10 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-serif text-rice-paper flex items-center gap-2">
                      <Clock className="w-5 h-5 text-clay" /> Recent Orders
                    </h3>
                    {orders.length > 0 && (
                      <button onClick={() => setActiveTab("orders")} className="text-clay hover:text-rice-paper text-sm font-semibold flex items-center gap-1 transition-colors">
                        View All <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {loading === "orders" ? (
                      <div className="space-y-4"><OrderCardSkeleton /></div>
                    ) : orders.length === 0 ? (
                      <div className="py-12 text-center border-2 border-dashed border-clay/10 rounded-xl">
                        <Package className="w-10 h-10 text-stone-warm/30 mx-auto mb-3" />
                        <p className="text-stone-warm/60 font-medium">No orders yet</p>
                        <Link href="/shop" className="inline-block mt-4 px-6 py-2 bg-clay text-charcoal rounded font-semibold hover:bg-clay/90 transition-colors">Start Shopping</Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 2).map((order) => (
                          <OrderCard 
                            key={order.id} 
                            order={order} 
                            onDownload={handleDownloadBill} 
                            onRefundRequest={handleRequestRefund} 
                            isProcessingRefund={processingRefunds.has(order.id)}
                            isCompact={true} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ORDERS */}
        {activeTab === "orders" && (
          <div className="animate-fade-in-up">
            <div className="mb-6">
              <h2 className="text-2xl font-serif text-rice-paper">Order History</h2>
              <p className="text-stone-warm/60 text-sm mt-1">Track, manage, and download invoices for all your purchases.</p>
            </div>

            {loading === "orders" ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => <OrderCardSkeleton key={i} />)}
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-charcoal-light/30 border border-clay/10 rounded-2xl p-16 text-center">
                <ShoppingBag className="w-16 h-16 text-clay/40 mx-auto mb-6" />
                <h3 className="text-2xl font-serif text-rice-paper mb-2">Your order history is empty</h3>
                <p className="text-stone-warm/60 max-w-md mx-auto mb-8">Discover our hand-crafted pottery collections and find your next favorite piece.</p>
                <Link href="/shop" className="inline-flex px-8 py-3 bg-clay text-charcoal rounded-lg font-bold hover:shadow-[0_0_20px_rgba(166,93,61,0.4)] hover:bg-white transition-all duration-300">
                  Browse Shop
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {orders.map((order, idx) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onDownload={handleDownloadBill}
                      onRefundRequest={handleRequestRefund}
                      isProcessingRefund={processingRefunds.has(order.id)}
                      animationDelay={`${Math.min(idx * 80, 400)}ms`}
                    />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="mt-10 mb-8 flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="flex items-center gap-2 px-8 py-3 bg-charcoal-light border border-clay/30 hover:border-clay text-rice-paper rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(166,93,61,0.2)] disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {loadingMore ? (
                        <>
                          <div className="w-5 h-5 border-2 border-clay border-t-transparent rounded-full animate-spin" />
                          <span className="font-semibold tracking-wide">Loading…</span>
                        </>
                      ) : (
                        <>
                          <span className="font-semibold tracking-wide">View Older Orders</span>
                          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Link Previous/Guest Orders Section */}
            <div className="mt-12 bg-charcoal-light/50 border border-clay/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-serif text-rice-paper mb-2 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-clay" /> Link Previous Orders
              </h3>
              <p className="text-sm text-stone-warm/60 mb-6">
                Did you check out using a different email address or as a guest? Link those orders to your current account so they appear in your history.
              </p>
              
              <form onSubmit={handleLinkOrder} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="linkOrderId" className="block text-xs uppercase tracking-wider text-stone-warm/50 mb-1.5 font-medium">Order ID</label>
                  <input
                    type="text"
                    id="linkOrderId"
                    placeholder="e.g. Df8Rs4ExYwfcV2eB97xM"
                    value={linkOrderId}
                    onChange={(e) => setLinkOrderId(e.target.value)}
                    required
                    className="w-full bg-charcoal border border-clay/20 focus:border-clay rounded-lg px-4 py-2.5 text-rice-paper text-sm focus:outline-none transition-all placeholder:text-stone-warm/30"
                  />
                </div>
                <div>
                  <label htmlFor="linkOrderEmail" className="block text-xs uppercase tracking-wider text-stone-warm/50 mb-1.5 font-medium font-sans">Checkout Email</label>
                  <input
                    type="email"
                    id="linkOrderEmail"
                    placeholder="e.g. nisargvaghela27@gmail.com"
                    value={linkOrderEmail}
                    onChange={(e) => setLinkOrderEmail(e.target.value)}
                    required
                    className="w-full bg-charcoal border border-clay/20 focus:border-clay rounded-lg px-4 py-2.5 text-rice-paper text-sm focus:outline-none transition-all placeholder:text-stone-warm/30 font-sans"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={linkingOrder}
                    className="w-full bg-clay hover:bg-white text-charcoal font-semibold rounded-lg py-2.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {linkingOrder ? (
                      <>
                        <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                        <span>Linking…</span>
                      </>
                    ) : (
                      <span>Link Order</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === "settings" && (
          <div className="animate-fade-in-up max-w-3xl">
            <h2 className="text-2xl font-serif text-rice-paper mb-6">Account Settings</h2>
            
            <div className="bg-charcoal-light/50 border border-clay/10 rounded-2xl overflow-hidden divide-y divide-clay/10">
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h4 className="text-lg font-medium text-rice-paper mb-1">Profile Information</h4>
                  <p className="text-sm text-stone-warm/60">Update your name, phone number, and profile picture.</p>
                </div>
                <Link href="/profile/edit" className="px-6 py-2.5 bg-clay/10 hover:bg-clay text-clay hover:text-charcoal border border-clay/30 rounded-lg transition-all whitespace-nowrap font-semibold">
                  Edit Profile
                </Link>
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h4 className="text-lg font-medium text-rice-paper mb-1">Email Preferences</h4>
                  <p className="text-sm text-stone-warm/60">Your email address ({user.email}) is managed by your authentication provider.</p>
                </div>
                <div className="px-6 py-2.5 bg-stone-warm/5 border border-stone-warm/10 text-stone-warm/50 rounded-lg font-medium cursor-not-allowed">
                  Read Only
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h4 className="text-lg font-medium text-red-400 mb-1">Sign Out</h4>
                  <p className="text-sm text-stone-warm/60">Log out of your account on this device.</p>
                </div>
                <button onClick={handleLogout} className="px-6 py-2.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 rounded-lg transition-all whitespace-nowrap font-semibold">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}