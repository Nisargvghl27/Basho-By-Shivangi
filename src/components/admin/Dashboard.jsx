"use client";

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  AlertTriangle, 
  Star,
  Calendar,
  Download,
  BarChart3
} from "lucide-react";

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [salesData, setSalesData] = useState([]);
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
    // Mock data for demonstration
    setStats({
      totalSales: 1248,
      revenue: 52340,
      profit: 15680,
      orders: 892,
      users: 3247,
      products: 156,
      categories: 12
    });

    // Mock sales chart data
    const mockSalesData = selectedPeriod === "monthly" 
      ? [
          { month: "Jan", sales: 4000, orders: 120 },
          { month: "Feb", sales: 3000, orders: 98 },
          { month: "Mar", sales: 5000, orders: 145 },
          { month: "Apr", sales: 4500, orders: 132 },
          { month: "May", sales: 6000, orders: 178 },
          { month: "Jun", sales: 5500, orders: 167 }
        ]
      : [
          { year: "2020", sales: 24000, orders: 890 },
          { year: "2021", sales: 35000, orders: 1240 },
          { year: "2022", sales: 42000, orders: 1456 },
          { year: "2023", sales: 52340, orders: 1789 },
          { year: "2024", sales: 48000, orders: 1634 }
        ];

    setSalesData(mockSalesData);
  }, [selectedPeriod]);

  const recentOrders = [
    { id: "#12345", customer: "John Doe", amount: 299, status: "Delivered", date: "2024-01-15" },
    { id: "#12346", customer: "Jane Smith", amount: 450, status: "Shipped", date: "2024-01-15" },
    { id: "#12347", customer: "Bob Johnson", amount: 189, status: "Processing", date: "2024-01-14" },
    { id: "#12348", customer: "Alice Brown", amount: 780, status: "Pending", date: "2024-01-14" },
    { id: "#12349", customer: "Charlie Wilson", amount: 320, status: "Delivered", date: "2024-01-13" }
  ];

  const stockAlerts = [
    { name: "Ceramic Bowl Set", stock: 3, threshold: 5 },
    { name: "Handmade Mug", stock: 2, threshold: 10 },
    { name: "Pottery Vase", stock: 4, threshold: 8 }
  ];

  const bestSellingProducts = [
    { name: "Ceramic Dinner Set", sales: 234, revenue: 23400, rating: 4.8 },
    { name: "Handmade Coffee Mug", sales: 189, revenue: 5670, rating: 4.9 },
    { name: "Artistic Vase", sales: 156, revenue: 12480, rating: 4.7 },
    { name: "Pottery Planters", sales: 143, revenue: 8580, rating: 4.6 }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color = "blue" }) => {
    const isPositive = change > 0;
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {typeof value === 'number' && value > 1000 
                ? `$${(value / 1000).toFixed(1)}k` 
                : value}
            </p>
            {change && (
              <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                <span>{Math.abs(change)}% from last month</span>
              </div>
            )}
          </div>
          <div className={`p-3 bg-${color}-100 dark:bg-${color}-900 rounded-lg`}>
            <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
          </div>
        </div>
      </div>
    );
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {[
          { label: "Total Sales", value: stats.totalSales, change: "+12.5%", icon: TrendingUp, color: "blue" },
          { label: "Revenue", value: `$${stats.revenue.toLocaleString()}`, change: "+8.2%", icon: DollarSign, color: "green" },
          { label: "Profit", value: `$${stats.profit.toLocaleString()}`, change: "+15.3%", icon: TrendingUp, color: "purple" },
          { label: "Orders", value: stats.orders, change: "+5.7%", icon: ShoppingCart, color: "orange" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-1">{stat.change}</p>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Sales Overview</h2>
          <div className="h-48 sm:h-64 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-center text-gray-500 dark:text-gray-400 px-4">
              <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" />
              <p className="text-sm sm:text-base">Sales Chart Visualization</p>
              <p className="text-xs sm:text-sm mt-1">Chart library integration needed</p>
            </div>
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
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 font-medium text-xs sm:text-sm">{order.id}</td>
                    <td className="py-2 text-xs sm:text-sm hidden sm:table-cell">{order.customer}</td>
                    <td className="py-2 text-xs sm:text-sm">${order.amount}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stock Alerts and Best Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Stock Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" />
            Stock Alerts
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {stockAlerts.map((item, index) => (
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
            ))}
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500" />
            Best Selling Products
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {bestSellingProducts.map((product, index) => (
              <div key={index} className="flex flex-col p-3 border border-gray-200 dark:border-gray-700 rounded-lg gap-2">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{product.name}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span>{product.sales} sold</span>
                  <span>${product.revenue.toLocaleString()}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
