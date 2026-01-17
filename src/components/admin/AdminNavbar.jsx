"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
  const [notifications, setNotifications] = useState(3);
  const [user, setUser] = useState(null);
  const { searchQuery, setSearchQuery, performSearch } = useSearch();

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

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery); // Triggers AI check inside Context
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch(searchQuery); // Triggers AI check inside Context
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-2 sm:px-4 lg:px-8">
        {/* Left side */}
        <div className="flex items-center flex-1">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-2 sm:mr-4"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          {/* Search Bar */}
          <div className="hidden sm:block ml-0 sm:ml-4 flex-1 max-w-xs sm:max-w-lg">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products, orders, users..."
                className="w-full pl-8 sm:pl-10 pr-20 sm:pr-24 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-600 text-white text-xs sm:text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Notifications */}
          <div className="relative">
            <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            {notifications > 0 && (
              <span className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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