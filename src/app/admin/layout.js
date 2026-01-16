"use client";

import { Manrope } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase"; // Import auth from your firebase config
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { SearchProvider } from "../../context/SearchContext";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});

// 🔒 AUTHORIZED EMAILS
// Add the 4 specific email addresses here
const AUTHORIZED_EMAILS = [
  "manthanmd21@gmail.com",
  "nisargvaghela27@gmail.com",
  "admin3@example.com",
  "admin4@example.com"
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, check if their email is allowed
        if (AUTHORIZED_EMAILS.includes(user.email)) {
          setIsAuthorized(true);
        } else {
          // Logged in but not authorized -> Redirect to home
          alert("Access Denied: You are not authorized to view this page.");
          router.push("/"); 
        }
      } else {
        // Not logged in -> Redirect to login
        router.push("/auth/login");
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [router]);

  // Show a loading screen while checking permission
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          <p>Verifying access...</p>
        </div>
      </div>
    );
  }

  // If not authorized (and redirection hasn't finished yet), don't render anything
  if (!isAuthorized) {
    return null;
  }

  // Render Admin Panel if authorized
  return (
    <SearchProvider>
      <div className={`${manrope.variable} font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 min-h-screen`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            {/* Page Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="w-full px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}