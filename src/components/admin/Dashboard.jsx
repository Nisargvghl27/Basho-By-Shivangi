"use client";

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee, // Changed from DollarSign
  ShoppingCart, 
  Users, 
  Package, 
  AlertTriangle, 
  Star,
  Download,
  BarChart3
} from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../lib/firebase";

// Reusable Statistic Card
const StatCard = ({ title, value, icon: Icon, color = "blue", prefix = "" }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 lg:p-6">
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
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);
  
  // State for dynamic data
  const [salesData, setSalesData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stockAlerts, setStockAlerts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0, 
    revenue: 0,    
    profit: 0,     
    orders: 0,     
    users: 0,      
    products: 0,   
    categories: 0  
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Products
        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 2. Fetch Orders (Sorted by date)
        const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersList = ordersSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          createdAtDate: doc.data().createdAt?.toDate() || new Date() 
        }));

        // 3. Fetch Users (Count unique emails from orders as fallback)
        const uniqueEmails = new Set(ordersList.map(o => o.shipping?.email).filter(Boolean));
        const usersCount = uniqueEmails.size;

        // --- CALCULATIONS ---

        // A. Stats
        const totalRevenue = ordersList.reduce((acc, order) => acc + (parseFloat(order.total) || 0), 0);
        const totalOrders = ordersList.length;
        const totalItemsSold = ordersList.reduce((acc, order) => {
            const items = order.items || [];
            return acc + items.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
        }, 0);
        
        const uniqueCategories = new Set(productsList.map(p => p.category).filter(Boolean)).size;

        setStats({
          totalSales: totalItemsSold,
          revenue: totalRevenue,
          profit: totalRevenue * 0.30, // Est 30% profit
          orders: totalOrders,
          users: usersCount,
          products: productsList.length,
          categories: uniqueCategories
        });

        // B. Stock Alerts (Filter products with low stock)
        const lowStockThreshold = 5;
        const alerts = productsList
          .filter(p => (parseInt(p.stock) || 0) < lowStockThreshold)
          .map(p => ({
            name: p.name,
            stock: p.stock,
            threshold: lowStockThreshold
          }))
          .slice(0, 5); 
        setStockAlerts(alerts);

        // C. Recent Orders (Top 5)
        const recent = ordersList.slice(0, 5).map(order => ({
          id: order.id,
          customer: order.shipping?.firstName ? `${order.shipping.firstName} ${order.shipping.lastName}` : "Guest",
          amount: order.total,
          status: order.status ? (order.status.charAt(0).toUpperCase() + order.status.slice(1)) : "Pending",
          date: order.createdAtDate.toISOString().split('T')[0]
        }));
        setRecentOrders(recent);

        // D. Best Selling Products
        const productSalesMap = {};
        ordersList.forEach(order => {
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
        setBestSellingProducts(bestSellers);

        // E. Sales Chart Data
        const monthlyData = {};
        ordersList.forEach(order => {
          const month = order.createdAtDate.toLocaleString('default', { month: 'short' });
          if (!monthlyData[month]) {
            monthlyData[month] = { month, sales: 0, orders: 0 };
          }
          monthlyData[month].sales += (parseFloat(order.total) || 0);
          monthlyData[month].orders += 1;
        });

        const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const chartData = monthsOrder
          .filter(m => monthlyData[m])
          .map(m => monthlyData[m]);
        
        setSalesData(chartData.length > 0 ? chartData : []);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedPeriod]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading Dashboard...</div>;
  }

  return (
    <div className="p-2 sm:p-4 lg:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Welcome to your admin dashboard</p>
      </div>
      
      {/* Period Selector and Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex-1 max-w-xs sm:max-w-none">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="flex items-center">
          <button className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <StatCard title="Total Items Sold" value={stats.totalSales} icon={TrendingUp} color="blue" />
        <StatCard title="Revenue" value={stats.revenue} prefix="₹" icon={IndianRupee} color="green" />
        <StatCard title="Est. Profit (30%)" value={stats.profit} prefix="₹" icon={TrendingUp} color="purple" />
        <StatCard title="Total Orders" value={stats.orders} icon={ShoppingCart} color="orange" />
        <StatCard title="Active Products" value={stats.products} icon={Package} color="indigo" />
        <StatCard title="Total Users" value={stats.users} icon={Users} color="teal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Sales Overview</h2>
          <div className="h-48 sm:h-64 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg">
            {salesData.length > 0 ? (
               <div className="w-full px-4 overflow-x-auto">
                 <div className="flex items-end justify-between h-32 gap-2 min-w-[300px]">
                    {salesData.map((data, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 flex-1">
                        <div 
                          className="w-full bg-blue-500 rounded-t opacity-80 hover:opacity-100 transition-all"
                          style={{ height: `${stats.revenue > 0 ? (data.sales / stats.revenue) * 200 : 0}%`, minHeight: '10%' }} 
                        ></div>
                        <span className="text-xs text-gray-500">{data.month}</span>
                      </div>
                    ))}
                 </div>
               </div>
            ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 px-4">
                  <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" />
                  <p className="text-sm sm:text-base">No sales data available yet</p>
                </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">Order ID</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400 hidden sm:table-cell">Customer</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">Amount</th>
                  <th className="text-left py-2 text-gray-600 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 font-medium text-xs sm:text-sm" title={order.id}>{order.id.slice(0,8)}...</td>
                    <td className="py-2 text-xs sm:text-sm hidden sm:table-cell">{order.customer}</td>
                    <td className="py-2 text-xs sm:text-sm">₹{order.amount}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="text-center py-4 text-gray-500">No recent orders</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stock Alerts and Best Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
        {/* Stock Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" />
            Stock Alerts (Low Stock)
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {stockAlerts.length > 0 ? stockAlerts.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg gap-2">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{item.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Stock: {item.stock} (Threshold: {item.threshold})
                  </p>
                </div>
                <button className="px-3 py-1 text-xs sm:text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 w-full sm:w-auto">
                  Restock
                </button>
              </div>
            )) : (
              <p className="text-sm text-gray-500">No items are currently low on stock.</p>
            )}
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" />
            Best Selling Products
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {bestSellingProducts.length > 0 ? bestSellingProducts.map((product, index) => (
              <div key={index} className="flex flex-col p-3 border border-gray-200 dark:border-gray-700 rounded-lg gap-2">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{product.name}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span>{product.sales} sold</span>
                  <span>₹{product.revenue.toLocaleString()}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-sm text-gray-500">No sales data available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}