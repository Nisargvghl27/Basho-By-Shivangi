// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { 
//   LayoutDashboard, 
//   Package, 
//   Tags, 
//   ShoppingCart, 
//   Users, 
//   CreditCard, 
//   Warehouse, 
//   Image, 
//   Ticket, 
//   BarChart3, 
//   Settings,
//   CalendarDays,
//   X,
//   Menu
// } from "lucide-react";

// const menuItems = [
//   { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/admin/products", label: "Products", icon: Package },
//   { href: "/admin/workshops", label: "Workshops", icon: CalendarDays }, 
//   { href: "/admin/categories", label: "Categories", icon: Tags },
//   { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
//   { href: "/admin/users", label: "Users", icon: Users },
//   { href: "/admin/payments", label: "Payments", icon: CreditCard },
//   { href: "/admin/inventory", label: "Inventory", icon: Warehouse },
//   { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
//   { href: "/admin/settings", label: "Settings", icon: Settings },
// ];

// export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
//   const pathname = usePathname();

//   return (
//     <>
//       {/* Mobile sidebar overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//           fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg
//           transform transition-transform duration-300 ease-in-out
//           lg:translate-x-0 lg:static lg:inset-0
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-center flex-1">
//             <img 
//               src="/images/bgr_logo.png" 
//               alt="Basho Logo" 
//               className="w-12 h-12 sm:w-16 sm:h-16 object-contain transition-all duration-300 hover:scale-105"
//             />
//           </div>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <nav className="mt-4 sm:mt-8">
//           <div className="px-2 sm:px-4 space-y-1 sm:space-y-2">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive =
//                 pathname === item.href ||
//                 (item.href !== "/admin" && pathname.startsWith(item.href));

//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={`
//                     flex items-center px-3 sm:px-4 py-2 sm:py-3
//                     text-xs sm:text-sm font-medium rounded-lg
//                     transition-colors duration-200
//                     ${
//                       isActive
//                         ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
//                         : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
//                     }
//                   `}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
//                   <span className="hidden sm:inline">{item.label}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  Warehouse, 
  Image as ImageIcon, // Alias 'Image' as 'ImageIcon'
  Ticket, 
  BarChart3, 
  Settings,
  CalendarDays,
  X,
  Menu
} from "lucide-react";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon }, // Added Gallery Item
  { href: "/admin/workshops", label: "Workshops", icon: CalendarDays }, 
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/inventory", label: "Inventory", icon: Warehouse },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center flex-1">
            <img 
              src="/images/bgr_logo.png" 
              alt="Basho Logo" 
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain transition-all duration-300 hover:scale-105"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-4 sm:mt-8">
          <div className="px-2 sm:px-4 space-y-1 sm:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-3 sm:px-4 py-2 sm:py-3
                    text-xs sm:text-sm font-medium rounded-lg
                    transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}

