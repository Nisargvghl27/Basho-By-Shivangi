"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Search, 
  Download, 
  Calendar, 
  Percent, 
  IndianRupee, // Updated Icon
  Tag, 
  Users, 
  TrendingUp, 
  ToggleLeft, 
  ToggleRight,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function CouponManagement() {
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDiscountType, setSelectedDiscountType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const couponsPerPage = 10;

  useEffect(() => {
    // Mock coupons data with Rupees
    const mockCoupons = [
      {
        id: 1,
        code: "SUMMER2024",
        name: "Summer Sale",
        description: "Get 20% off on all summer collection items",
        discountType: "percentage",
        discountValue: 20,
        maxDiscountAmount: 500,
        minOrderAmount: 100,
        applicableCategories: ["Dinnerware", "Drinkware"],
        applicableProducts: [],
        usageLimit: 1000,
        usageCount: 156,
        userLimit: 5,
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        status: "Active",
        createdAt: "2023-12-15",
        totalSavings: 3120.50,
        totalOrders: 156
      },
      {
        id: 2,
        code: "WELCOME10",
        name: "Welcome Discount",
        description: "Special discount for new customers",
        discountType: "percentage",
        discountValue: 10,
        maxDiscountAmount: 100,
        minOrderAmount: 50,
        applicableCategories: ["All"],
        applicableProducts: [],
        usageLimit: 500,
        usageCount: 89,
        userLimit: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        status: "Active",
        createdAt: "2023-12-01",
        totalSavings: 445.00,
        totalOrders: 89
      },
      {
        id: 3,
        code: "FREESHIP",
        name: "Free Shipping",
        description: "Free shipping on orders above ₹750",
        discountType: "shipping",
        discountValue: 0,
        maxDiscountAmount: 0,
        minOrderAmount: 750,
        applicableCategories: ["All"],
        applicableProducts: [],
        usageLimit: null,
        usageCount: 234,
        userLimit: null,
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        status: "Active",
        createdAt: "2024-01-10",
        totalSavings: 1170.00,
        totalOrders: 234
      },
      {
        id: 4,
        code: "VIP25",
        name: "VIP Customer Special",
        description: "Exclusive 25% off for VIP members",
        discountType: "percentage",
        discountValue: 25,
        maxDiscountAmount: 1000,
        minOrderAmount: 0,
        applicableCategories: ["All"],
        applicableProducts: [],
        usageLimit: 200,
        usageCount: 45,
        userLimit: 10,
        startDate: "2024-01-10",
        endDate: "2024-02-10",
        status: "Active",
        createdAt: "2024-01-05",
        totalSavings: 2250.00,
        totalOrders: 45
      },
      {
        id: 5,
        code: "FLAT50",
        name: "Flat ₹500 Off",
        description: "Get ₹500 off on orders above ₹2000",
        discountType: "fixed",
        discountValue: 500,
        maxDiscountAmount: 0,
        minOrderAmount: 2000,
        applicableCategories: ["Dinnerware"],
        applicableProducts: [],
        usageLimit: 100,
        usageCount: 0,
        userLimit: 2,
        startDate: "2024-02-01",
        endDate: "2024-04-30",
        status: "Inactive",
        createdAt: "2024-01-20",
        totalSavings: 0,
        totalOrders: 0
      }
    ];
    setCoupons(mockCoupons);
  }, []);

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || coupon.status === selectedStatus;
    const matchesDiscountType = selectedDiscountType === "all" || coupon.discountType === selectedDiscountType;
    
    return matchesSearch && matchesStatus && matchesDiscountType;
  });

  const indexOfLastCoupon = currentPage * couponsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
  const currentCoupons = filteredCoupons.slice(indexOfFirstCoupon, indexOfLastCoupon);
  const totalPages = Math.ceil(filteredCoupons.length / couponsPerPage);

  const toggleCouponStatus = (couponId) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === couponId 
        ? { ...coupon, status: coupon.status === 'Active' ? 'Inactive' : 'Active' }
        : coupon
    ));
  };

  const deleteCoupon = (couponId) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      setCoupons(coupons.filter(coupon => coupon.id !== couponId));
    }
  };

  const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code ${code} copied to clipboard!`);
  };

  const CouponForm = ({ coupon, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      code: coupon?.code || "",
      name: coupon?.name || "",
      description: coupon?.description || "",
      discountType: coupon?.discountType || "percentage",
      discountValue: coupon?.discountValue || "",
      maxDiscountAmount: coupon?.maxDiscountAmount || "",
      minOrderAmount: coupon?.minOrderAmount || "",
      applicableCategories: coupon?.applicableCategories || ["All"],
      usageLimit: coupon?.usageLimit || "",
      userLimit: coupon?.userLimit || "",
      startDate: coupon?.startDate || "",
      endDate: coupon?.endDate || "",
      status: coupon?.status || "Active"
    });

    const generateCouponCode = () => {
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setFormData({...formData, code: randomCode});
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {coupon ? "Edit Coupon" : "Create New Coupon"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Coupon Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SUMMER2024"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateCouponCode}
                    className="px-3 py-2 bg-gray-200 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Coupon Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Discount Type
                </label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                  <option value="shipping">Free Shipping</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Discount Value
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={formData.discountType === 'percentage' ? '20' : formData.discountType === 'fixed' ? '500' : '0'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Discount Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.maxDiscountAmount}
                  onChange={(e) => setFormData({...formData, maxDiscountAmount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0 (no limit)"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Order Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.minOrderAmount}
                  onChange={(e) => setFormData({...formData, minOrderAmount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Applicable Categories
                </label>
                <select
                  value={formData.applicableCategories[0]}
                  onChange={(e) => setFormData({...formData, applicableCategories: [e.target.value]})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Dinnerware">Dinnerware</option>
                  <option value="Drinkware">Drinkware</option>
                  <option value="Decor">Decor</option>
                  <option value="Garden">Garden</option>
                </select>
              </div>
            </div>
            
            {/* Rest of form remains standard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Usage Limit
                </label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({...formData, usageLimit: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Leave empty for unlimited"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Per User Limit
                </label>
                <input
                  type="number"
                  value={formData.userLimit}
                  onChange={(e) => setFormData({...formData, userLimit: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Leave empty for unlimited"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {coupon ? "Update Coupon" : "Create Coupon"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Calculate statistics
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter(c => c.status === 'Active').length;
  const totalUsage = coupons.reduce((sum, c) => sum + c.usageCount, 0);
  const totalSavings = coupons.reduce((sum, c) => sum + c.totalSavings, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Coupons & Discount Control</h1>
        <button
          onClick={() => setShowCouponModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Coupon
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Coupons</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {totalCoupons}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Tag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Coupons</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                {activeCoupons}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Usage</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {totalUsage}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Savings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                ₹{totalSavings.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <IndianRupee className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Table omitted for brevity, logic identical to previous, just replacing $ with ₹ in JSX */}
      {/* ... (Same filters section) ... */}

      {/* Coupons Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Coupon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Conditions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Validity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center">
                        <span className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {coupon.code}
                        </span>
                        <button onClick={() => copyCouponCode(coupon.code)} className="ml-2 text-gray-400 hover:text-gray-600">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm font-medium mt-1">{coupon.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      {coupon.discountType === 'percentage' && <Percent className="w-4 h-4 mr-1" />}
                      {coupon.discountType === 'fixed' && <IndianRupee className="w-4 h-4 mr-1" />}
                      {coupon.discountType === 'shipping' && <Tag className="w-4 h-4 mr-1" />}
                      <span>
                        {coupon.discountType === 'percentage' && `${coupon.discountValue}%`}
                        {coupon.discountType === 'fixed' && `₹${coupon.discountValue}`}
                        {coupon.discountType === 'shipping' && 'Free Shipping'}
                      </span>
                      {coupon.maxDiscountAmount > 0 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          (max ₹{coupon.maxDiscountAmount})
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="text-xs">
                      <div>Min: ₹{coupon.minOrderAmount}</div>
                      <div>Cat: {coupon.applicableCategories.join(', ')}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="text-xs">
                      <div>{coupon.usageCount} used</div>
                      <div className="text-green-600 dark:text-green-400">
                        Saved: ₹{coupon.totalSavings.toFixed(2)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {coupon.startDate} → {coupon.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      coupon.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                     <div className="flex items-center space-x-2">
                        <button onClick={() => {setSelectedCoupon(coupon); setShowCouponModal(true);}} className="text-yellow-600 hover:text-yellow-900"><Edit className="w-4 h-4"/></button>
                        <button onClick={() => deleteCoupon(coupon.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4"/></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination same as before */}
      </div>

      {showCouponModal && (
        <CouponForm
          coupon={selectedCoupon}
          onClose={() => { setShowCouponModal(false); setSelectedCoupon(null); }}
          onSave={(data) => {
            if (selectedCoupon) {
              setCoupons(coupons.map(c => c.id === selectedCoupon.id ? { ...c, ...data } : c));
            } else {
              setCoupons([...coupons, { ...data, id: Date.now(), usageCount: 0, totalSavings: 0 }]);
            }
          }}
        />
      )}
    </div>
  );
}