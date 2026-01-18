"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { 
  TrendingUp, 
  IndianRupee, 
  ShoppingCart, 
  Users, 
  Package, 
  AlertTriangle, 
  Star,
  Download,
  BarChart3
} from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";

// Reusable Statistic Card
const StatCard = ({ title, value, icon: Icon, color = "blue", prefix = "" }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 lg:p-6 transition-transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className={`p-2 sm:p-3 rounded-lg bg-${color}-100 dark:bg-${color}-900`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter(); // Initialize Router
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);
  
  // Raw Data Storage
  const [rawOrders, setRawOrders] = useState([]);
  const [rawProducts, setRawProducts] = useState([]);

  // Derived State
  const [stats, setStats] = useState({
    totalSales: 0, 
    revenue: 0,    
    profit: 0,     
    orders: 0,     
    users: 0,      
    products: 0,   
    categories: 0  
  });

  // 1. Initial Data Fetch
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch Products
        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRawProducts(productsList);

        // Fetch Orders (Sorted by date)
        const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersList = ordersSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          createdAtDate: doc.data().createdAt?.toDate() || new Date() 
        }));
        setRawOrders(ordersList);

        // --- STATS CALCULATIONS ---
        const totalRevenue = ordersList.reduce((acc, order) => acc + (parseFloat(order.total) || 0), 0);
        const totalOrders = ordersList.length;
        const totalItemsSold = ordersList.reduce((acc, order) => {
            const items = order.items || [];
            return acc + items.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
        }, 0);
        
        const uniqueEmails = new Set(ordersList.map(o => o.shipping?.email).filter(Boolean));
        const uniqueCategories = new Set(productsList.map(p => p.category).filter(Boolean)).size;

        setStats({
          totalSales: totalItemsSold,
          revenue: totalRevenue,
          profit: totalRevenue * 0.30, 
          orders: totalOrders,
          users: uniqueEmails.size,
          products: productsList.length,
          categories: uniqueCategories
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 2. Dynamic Sales Chart Data
  const salesData = useMemo(() => {
    if (!rawOrders.length) return [];

    const dataMap = {};
    const currentYear = new Date().getFullYear();

    if (selectedPeriod === "monthly") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      months.forEach(m => dataMap[m] = { label: m, sales: 0, orders: 0 });

      rawOrders.forEach(order => {
        const d = order.createdAtDate;
        if (d.getFullYear() === currentYear) {
          const month = d.toLocaleString('default', { month: 'short' });
          if (dataMap[month]) {
            dataMap[month].sales += (parseFloat(order.total) || 0);
            dataMap[month].orders += 1;
          }
        }
      });
      return Object.values(dataMap);
    } 
    else {
      rawOrders.forEach(order => {
        const year = order.createdAtDate.getFullYear().toString();
        if (!dataMap[year]) {
          dataMap[year] = { label: year, sales: 0, orders: 0 };
        }
        dataMap[year].sales += (parseFloat(order.total) || 0);
        dataMap[year].orders += 1;
      });
      return Object.values(dataMap).sort((a, b) => a.label.localeCompare(b.label));
    }
  }, [rawOrders, selectedPeriod]);

  // 3. Stock Alerts
  const stockAlerts = useMemo(() => {
    const lowStockThreshold = 5;
    return rawProducts
      .filter(p => (parseInt(p.stock) || 0) < lowStockThreshold)
      .map(p => ({
        name: p.name,
        stock: p.stock,
        threshold: lowStockThreshold
      }))
      .slice(0, 5);
  }, [rawProducts]);

  // 4. Best Sellers & Recent Orders
  const { bestSellingProducts, recentOrders } = useMemo(() => {
    // Recent Orders
    const recent = rawOrders.slice(0, 5).map(order => ({
      id: order.id,
      customer: order.shipping?.firstName ? `${order.shipping.firstName} ${order.shipping.lastName}` : "Guest",
      amount: order.total,
      status: order.status ? (order.status.charAt(0).toUpperCase() + order.status.slice(1)) : "Pending",
      date: order.createdAtDate.toISOString().split('T')[0]
    }));

    // Best Sellers
    const productSalesMap = {};
    rawOrders.forEach(order => {
      (order.items || []).forEach(item => {
        const name = item.title || item.name || "Unknown Product";
        const qty = parseInt(item.quantity) || 0;
        const revenue = (parseFloat(item.price) || 0) * qty;

        if (!productSalesMap[name]) {
          productSalesMap[name] = { name, sales: 0, revenue: 0, rating: 5.0 };
        }
        productSalesMap[name].sales += qty;
        productSalesMap[name].revenue += revenue;
      });
    });

    const bestSellers = Object.values(productSalesMap)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    return { bestSellingProducts: bestSellers, recentOrders: recent };
  }, [rawOrders]);

  const maxSalesValue = Math.max(...salesData.map(d => d.sales), 1);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
          <div className="text-gray-500">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Overview of your store&apos;s performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            <option value="monthly">Monthly (Current Year)</option>
            <option value="yearly">Yearly (All Time)</option>
          </select>
          <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Items Sold" value={stats.totalSales} icon={TrendingUp} color="blue" />
        <StatCard title="Total Revenue" value={stats.revenue} prefix="₹" icon={IndianRupee} color="green" />
        <StatCard title="Total Orders" value={stats.orders} icon={ShoppingCart} color="orange" />
        <StatCard title="Total Users" value={stats.users} icon={Users} color="teal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dynamic Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sales Overview</h2>
            <div className="flex items-center text-xs text-gray-500 gap-2">
              <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div> Revenue</span>
            </div>
          </div>
          
          <div className="h-64 w-full flex flex-col justify-end">
            {salesData.length > 0 ? (
               <div className="w-full h-full flex items-end justify-between gap-2">
                  {salesData.map((data, i) => {
                    const heightPercent = (data.sales / maxSalesValue) * 100;
                    return (
                      <div key={i} className="group relative flex flex-col items-center justify-end flex-1 h-full">
                        <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                          <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg">
                            <div className="font-semibold">{data.label}</div>
                            <div>₹{data.sales.toLocaleString()}</div>
                            <div className="text-gray-400">{data.orders} orders</div>
                          </div>
                          <div className="w-2 h-2 bg-gray-900 transform rotate-45 mx-auto -mt-1"></div>
                        </div>
                        <div 
                          className="w-full max-w-[40px] bg-blue-500 dark:bg-blue-600 rounded-t hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-300 relative"
                          style={{ height: `${Math.max(heightPercent, 2)}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate w-full text-center">
                          {data.label}
                        </span>
                      </div>
                    );
                  })}
               </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <BarChart3 className="w-10 h-10 mb-2 opacity-50" />
                  <p>No sales data for this period</p>
                </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentOrders.length > 0 ? recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">#{order.id.slice(0,6)}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{order.customer}</td>
                    <td className="px-4 py-3 font-medium">₹{order.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="text-center py-8 text-gray-500">No recent orders found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Alerts & Best Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              Low Stock Alerts
            </h2>
            {stockAlerts.length > 0 && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {stockAlerts.length} items
              </span>
            )}
          </div>
          <div className="space-y-3">
            {stockAlerts.length > 0 ? stockAlerts.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Only <span className="font-bold text-red-600">{item.stock}</span> remaining
                  </p>
                </div>
                {/* Redirects to Inventory Page */}
                <button 
                  onClick={() => router.push('/admin/inventory')}
                  className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Restock
                </button>
              </div>
            )) : (
              <div className="text-center py-6 text-green-600 bg-green-50 dark:bg-green-900/10 rounded-lg">
                <p className="text-sm font-medium">All items are well stocked!</p>
              </div>
            )}
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            Top Performing Products
          </h2>
          <div className="space-y-4">
            {bestSellingProducts.length > 0 ? bestSellingProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full font-bold text-gray-500 text-xs">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">₹{product.revenue.toLocaleString()}</p>
                  <div className="flex items-center justify-end text-xs text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="ml-1 text-gray-500">{product.rating}</span>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-500 text-center py-4">No sales data available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}