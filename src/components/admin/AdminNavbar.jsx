"use client";

import { Bell, User, Menu, Building2, UserPlus, Mail, Inbox } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import Link from "next/link";

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  // Listen for Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "Admin User",
          email: currentUser.email,
          photoURL: currentUser.photoURL
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen for Notifications from Subscribers, Corporate Inquiries, and Contact Inquiries
  useEffect(() => {
    let readIds = [];
    try {
      const stored = localStorage.getItem("read_notification_ids");
      if (stored) readIds = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to load read notification IDs:", e);
    }

    let subs = [];
    let corps = [];
    let conts = [];

    const updateCombinedNotifications = () => {
      const combined = [
        ...subs.map(item => ({
          id: `sub_${item.id}`,
          type: "subscription",
          title: "New Newsletter Signup",
          message: item.email,
          time: item.subscribedAt?.toDate?.() || (item.subscribedAt ? new Date(item.subscribedAt) : new Date()),
          href: "/admin/users"
        })),
        ...corps.map(item => ({
          id: `corp_${item.id}`,
          type: "corporate",
          title: item.companyName ? `Corporate: ${item.companyName}` : "New Corporate Inquiry",
          message: `From ${item.contactPerson || item.email || "Anonymous"}`,
          time: item.createdAt?.toDate?.() || (item.createdAt ? new Date(item.createdAt) : new Date()),
          href: "/admin/corporate-inquiries"
        })),
        ...conts.map(item => ({
          id: `cont_${item.id}`,
          type: "contact",
          title: item.subject ? `Contact Us: ${item.subject}` : "New Contact Inquiry",
          message: `From ${item.name || item.email || "Anonymous"}`,
          time: item.createdAt?.toDate?.() || (item.createdAt ? new Date(item.createdAt) : new Date()),
          href: "/admin/contact-inquiries"
        }))
      ];

      // Sort by time descending
      combined.sort((a, b) => b.time - a.time);

      setNotifications(combined);
      
      // Calculate unread count
      const unread = combined.filter(n => !readIds.includes(n.id)).length;
      setUnreadCount(unread);
    };

    // Subscriptions listener
    const qSubs = query(collection(db, "subscribers"), orderBy("subscribedAt", "desc"), limit(10));
    const unsubSubs = onSnapshot(qSubs, (snapshot) => {
      subs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateCombinedNotifications();
    }, (err) => console.error("Error fetching subscribers:", err));

    // Corporate inquiries listener
    const qCorps = query(collection(db, "corporate_inquiries"), orderBy("createdAt", "desc"), limit(10));
    const unsubCorps = onSnapshot(qCorps, (snapshot) => {
      corps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateCombinedNotifications();
    }, (err) => console.error("Error fetching corporate inquiries:", err));

    // Contact inquiries listener
    const qConts = query(collection(db, "contact_inquiries"), orderBy("createdAt", "desc"), limit(10));
    const unsubConts = onSnapshot(qConts, (snapshot) => {
      conts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateCombinedNotifications();
    }, (err) => console.error("Error fetching contact inquiries:", err));

    return () => {
      unsubSubs();
      unsubCorps();
      unsubConts();
    };
  }, []);

  // Click outside notification dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleNotifications = () => {
    const nextState = !showNotifications;
    setShowNotifications(nextState);
    if (nextState && notifications.length > 0) {
      // Mark all current visible notification IDs as read
      try {
        const stored = localStorage.getItem("read_notification_ids");
        const currentRead = stored ? JSON.parse(stored) : [];
        const newRead = Array.from(new Set([...currentRead, ...notifications.map(n => n.id)]));
        localStorage.setItem("read_notification_ids", JSON.stringify(newRead));
        setUnreadCount(0);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getIcon = (type) => {
    switch (type) {
      case "subscription":
        return <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "corporate":
        return <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "contact":
        return <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      default:
        return <Inbox className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-2 sm:px-4 lg:px-8">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-2 sm:mr-4"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Notifications */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={handleToggleNotifications}
              className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full animate-pulse"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white font-sans">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 font-medium rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                <div className="max-h-[360px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700 custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                      <Inbox className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <Link 
                        key={item.id} 
                        href={item.href}
                        onClick={() => setShowNotifications(false)}
                        className="flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shrink-0">
                          {getIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                            {item.message}
                          </p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 font-medium">
                            {getRelativeTime(item.time)}
                          </p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="relative group transition-all duration-500 hover:-translate-y-0.5">
              {/* Glow Effect */}
              <span className="absolute inset-0 rounded-full bg-clay/0 scale-100 transition-all duration-700 group-hover:scale-110 group-hover:bg-clay/5 group-hover:opacity-0" />
              
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm overflow-hidden">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-clay to-clay/90 flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {user ? user.name : "Loading..."}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                {user ? user.email : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}