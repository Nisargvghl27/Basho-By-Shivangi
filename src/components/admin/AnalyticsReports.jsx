"use client";

import { useState, useEffect } from "react";
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Eye, 
  MousePointer, 
  BarChart3, 
  PieChart, 
  Filter,
  FileText,
  Package,
  CreditCard,
  Target,
  Clock,
  Activity,
  IndianRupee
} from "lucide-react";

export default function AnalyticsReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedReport, setSelectedReport] = useState("overview");
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-01-31"
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("all");

  useEffect(() => {
    // Initialize with current month
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    setDateRange({
      start: firstDay.toISOString().split('T')[0],
      end: lastDay.toISOString().split('T')[0]
    });
  }, []);

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 5234000,
      totalOrders: 892,
      totalUsers: 3247,
      conversionRate: 3.2,
      averageOrderValue: 5867,
      totalPageViews: 45678,
      uniqueVisitors: 12456,
      bounceRate: 42.3,
      avgSessionDuration: 245
    },
    sales: {
      revenueByMonth: [
        { month: "Jan", revenue: 1200000, orders: 205 },
        { month: "Feb", revenue: 1500000, orders: 267 },
        { month: "Mar", revenue: 1800000, orders: 312 },
        { month: "Apr", revenue: 1600000, orders: 278 },
        { month: "Apr", revenue: 1400000, orders: 245 },
        { month: "Jun", revenue: 1700000, orders: 298 }
      ],
      topProducts: [
        { name: "Ceramic Dinner Set", revenue: 890000, orders: 30, growth: 12.5 },
        { name: "Handmade Coffee Mug", revenue: 560000, orders: 224, growth: 8.3 },
        { name: "Artistic Vase", revenue: 420000, orders: 47, growth: -2.1 },
        { name: "Pottery Planters Set", revenue: 380000, orders: 63, growth: 15.7 }
      ],
      categoryPerformance: [
        { category: "Dinnerware", revenue: 2800000, orders: 456, percentage: 53.5 },
        { category: "Drinkware", revenue: 1500000, orders: 267, percentage: 28.7 },
        { category: "Decor", revenue: 780000, orders: 134, percentage: 14.9 },
        { category: "Garden", revenue: 164000, orders: 35, percentage: 3.1 }
      ]
    },
    traffic: {
      sources: [
        { source: "Direct", visitors: 4567, percentage: 36.7, conversion: 4.2 },
        { source: "Organic Search", visitors: 3890, percentage: 31.2, conversion: 3.8 },
        { source: "Social Media", visitors: 2345, percentage: 18.8, conversion: 2.9 },
        { source: "Referral", visitors: 1234, percentage: 9.9, conversion: 5.1 },
        { source: "Email", visitors: 420, percentage: 3.4, conversion: 6.7 }
      ],
      pages: [
        { page: "/shop/dinnerware", views: 12345, unique: 8901, avgTime: 245, bounceRate: 38.2 },
        { page: "/shop/drinkware", views: 9876, unique: 6789, avgTime: 198, bounceRate: 41.5 },
        { page: "/", views: 8234, unique: 5678, avgTime: 156, bounceRate: 45.3 },
        { page: "/shop", views: 6789, unique: 4567, avgTime: 234, bounceRate: 39.8 },
        { page: "/about", views: 3456, unique: 2345, avgTime: 89, bounceRate: 52.1 }
      ],
      devices: [
        { device: "Desktop", users: 7890, percentage: 63.4, conversion: 3.8 },
        { device: "Mobile", users: 4123, percentage: 33.1, conversion: 2.4 },
        { device: "Tablet", users: 443, percentage: 3.5, conversion: 2.9 }
      ]
    },
    customers: {
      acquisition: [
        { month: "Jan", newCustomers: 234, returningCustomers: 567 },
        { month: "Feb", newCustomers: 289, returningCustomers: 612 },
        { month: "Mar", newCustomers: 345, returningCustomers: 678 },
        { month: "Apr", newCustomers: 298, returningCustomers: 634 },
        { month: "May", newCustomers: 312, returningCustomers: 689 },
        { month: "Jun", newCustomers: 356, returningCustomers: 723 }
      ],
      demographics: {
        ageGroups: [
          { age: "18-24", percentage: 12.3 },
          { age: "25-34", percentage: 34.5 },
          { age: "35-44", percentage: 28.7 },
          { age: "45-54", percentage: 18.9 },
          { age: "55+", percentage: 5.6 }
        ],
        locations: [
          { location: "New York", customers: 1234, percentage: 38.0 },
          { location: "Los Angeles", customers: 890, percentage: 27.4 },
          { location: "Chicago", customers: 567, percentage: 17.5 },
          { location: "Houston", customers: 345, percentage: 10.6 },
          { location: "Others", customers: 211, percentage: 6.5 }
        ]
      },
      behavior: {
        avgLifetimeValue: 45678,
        avgPurchaseFrequency: 2.3,
        churnRate: 12.5,
        retentionRate: 87.5
      }
    }
  };

  const exportReport = (format) => {
    // In a real app, this would generate and download the report
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const MetricCard = ({ title, value, change, icon: Icon, color = "blue", format = "number" }) => {
    const isPositive = change > 0;
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {format === "currency" ? `₹${value.toLocaleString()}` : 
               format === "percentage" ? `${value}%` : 
               format === "duration" ? `${Math.floor(value / 60)}m ${value % 60}s` :
               value.toLocaleString()}
            </p>
            {change !== undefined && (
              <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                <span>{Math.abs(change)}% from last period</span>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics & Reports</h1>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportReport('pdf')}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </button>
            <button
              onClick={() => exportReport('csv')}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "sales", label: "Sales Analytics", icon: IndianRupee },
              { id: "traffic", label: "Traffic & Conversion", icon: Eye },
              { id: "customers", label: "Customer Insights", icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedReport(tab.id)}
                  className={`py-3 px-6 border-b-2 font-medium text-sm flex items-center ${
                    selectedReport === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Report */}
          {selectedReport === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                  title="Total Revenue" 
                  value={analyticsData.overview.totalRevenue} 
                  change={12.5} 
                  icon={IndianRupee} 
                  color="green"
                  format="currency"
                />
                <MetricCard 
                  title="Total Orders" 
                  value={analyticsData.overview.totalOrders} 
                  change={8.3} 
                  icon={ShoppingCart} 
                  color="blue"
                />
                <MetricCard 
                  title="Conversion Rate" 
                  value={analyticsData.overview.conversionRate} 
                  change={2.1} 
                  icon={Target} 
                  color="purple"
                  format="percentage"
                />
                <MetricCard 
                  title="Avg Order Value" 
                  value={analyticsData.overview.averageOrderValue} 
                  change={-1.2} 
                  icon={Package} 
                  color="orange"
                  format="currency"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                  title="Total Users" 
                  value={analyticsData.overview.totalUsers} 
                  change={15.7} 
                  icon={Users} 
                  color="indigo"
                />
                <MetricCard 
                  title="Page Views" 
                  value={analyticsData.overview.totalPageViews} 
                  change={18.2} 
                  icon={Eye} 
                  color="teal"
                />
                <MetricCard 
                  title="Bounce Rate" 
                  value={analyticsData.overview.bounceRate} 
                  change={-3.4} 
                  icon={Activity} 
                  color="red"
                  format="percentage"
                />
                <MetricCard 
                  title="Avg Session Duration" 
                  value={analyticsData.overview.avgSessionDuration} 
                  change={5.6} 
                  icon={Clock} 
                  color="yellow"
                  format="duration"
                />
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Revenue Trend</h3>
                  <div className="h-64 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Revenue Chart Visualization</p>
                      <p className="text-sm mt-1">Chart library integration needed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Traffic Sources</h3>
                  <div className="h-64 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <PieChart className="w-12 h-12 mx-auto mb-2" />
                      <p>Traffic Sources Chart</p>
                      <p className="text-sm mt-1">Chart library integration needed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sales Analytics */}
          {selectedReport === "sales" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sales Performance</h3>
                <div className="flex items-center space-x-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="dinnerware">Dinnerware</option>
                    <option value="drinkware">Drinkware</option>
                    <option value="decor">Decor</option>
                    <option value="garden">Garden</option>
                  </select>
                  <select
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Payment Methods</option>
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="upi">UPI</option>
                  </select>
                </div>
              </div>

              {/* Top Products Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">Top Products</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Orders
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Growth
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {analyticsData.sales.topProducts.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            ₹{product.revenue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {product.orders}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className={`flex items-center ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {product.growth > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                              {Math.abs(product.growth)}%
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Category Performance */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Category Performance</h4>
                <div className="space-y-3">
                  {analyticsData.sales.categoryPerformance.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{category.category}</span>
                      </div>
                      <div className="flex items-center space-x-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400">₹{category.revenue.toLocaleString()}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{category.orders} orders</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Traffic Analytics */}
          {selectedReport === "traffic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Traffic Sources</h4>
                  <div className="space-y-3">
                    {analyticsData.traffic.sources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{source.source}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{source.visitors.toLocaleString()}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{source.percentage}%</span>
                          <span className="text-sm font-medium text-green-600">{source.conversion}% conv</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Device Breakdown */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Device Breakdown</h4>
                  <div className="space-y-3">
                    {analyticsData.traffic.devices.map((device, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{device.device}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{device.users.toLocaleString()}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{device.percentage}%</span>
                          <span className="text-sm font-medium text-green-600">{device.conversion}% conv</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Pages */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">Top Pages</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Page
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Views
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Unique
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Avg Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Bounce Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {analyticsData.traffic.pages.map((page, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {page.page}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {page.views.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {page.unique.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {Math.floor(page.avgTime / 60)}m {page.avgTime % 60}s
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                            {page.bounceRate}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Customer Analytics */}
          {selectedReport === "customers" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard 
                  title="Avg Lifetime Value" 
                  value={analyticsData.customers.behavior.avgLifetimeValue} 
                  change={8.7} 
                  icon={IndianRupee} 
                  color="green"
                  format="currency"
                />
                <MetricCard 
                  title="Purchase Frequency" 
                  value={analyticsData.customers.behavior.avgPurchaseFrequency} 
                  change={3.2} 
                  icon={ShoppingCart} 
                  color="blue"
                />
                <MetricCard 
                  title="Retention Rate" 
                  value={analyticsData.customers.behavior.retentionRate} 
                  change={2.1} 
                  icon={Users} 
                  color="purple"
                  format="percentage"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Acquisition */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Customer Acquisition</h4>
                  <div className="space-y-3">
                    {analyticsData.customers.acquisition.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{data.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">New: {data.newCustomers}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Returning: {data.returningCustomers}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Age Demographics */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Age Demographics</h4>
                  <div className="space-y-3">
                    {analyticsData.customers.demographics.ageGroups.map((group, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{group.age}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${group.percentage * 3}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{group.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Geographic Distribution</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analyticsData.customers.demographics.locations.map((location, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{location.location}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{location.percentage}%</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {location.customers.toLocaleString()} customers
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}