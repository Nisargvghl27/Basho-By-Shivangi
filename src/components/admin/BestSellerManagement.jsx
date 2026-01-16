"use client";

import { useState, useEffect } from "react";
import { 
  Star, 
  Crown, 
  Package, 
  Check, 
  X, 
  Loader2,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Grid,
  List
} from "lucide-react";
import { getProductsWithBestSellerStatus, addToBestSellers, removeFromBestSellers, getBestSellerCount } from "../../lib/bestSellerService";

export default function BestSellerManagement() {
  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("name"); // name, price, category, date

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch(sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return (a.price || 0) - (b.price || 0);
        case "category":
          return a.category.localeCompare(b.category);
        case "date":
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);
          return dateB.getTime() - dateA.getTime();
        default:
          return 0;
      }
    });

  // Load products and best sellers
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const allProducts = await getProductsWithBestSellerStatus();
      const bestSellerProducts = allProducts.filter(p => p.isBestSeller);
      
      setProducts(allProducts);
      setBestSellers(bestSellerProducts);
    } catch (error) {
      console.error("Error loading best seller data:", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Add product to best sellers
  const handleAddToBestSellers = async (productId) => {
    try {
      setActionLoading(true);
      setError(null);
      setSuccess(null);
      
      await addToBestSellers(productId);
      await loadData(); // Refresh data
      
      setSuccess(`Product added to Best Sellers successfully!`);
    } catch (error) {
      console.error("Error adding to best sellers:", error);
      setError(error.message || "Failed to add to best sellers. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  // Remove from best sellers
  const handleRemoveFromBestSellers = async (productId) => {
    try {
      setActionLoading(true);
      setError(null);
      setSuccess(null);
      
      await removeFromBestSellers(productId);
      await loadData(); // Refresh data
      
      setSuccess("Product removed from Best Sellers successfully!");
    } catch (error) {
      console.error("Error removing from best sellers:", error);
      setError("Failed to remove from best sellers. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  // Clear notifications
  const clearNotifications = () => {
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Best Seller Management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-xl shadow-lg">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Best Sellers Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage featured products on homepage (Max 5)</p>
            </div>
          </div>
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={actionLoading}
          >
            <RefreshCw className={`w-4 h-4 ${actionLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-400 font-medium mb-1">Active Best Sellers</p>
                <p className="text-3xl font-bold text-yellow-300">{bestSellers.length}/5</p>
              </div>
              <div className="p-3 bg-yellow-900 rounded-lg">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Available Slots</p>
                <p className="text-3xl font-bold text-gray-100">{5 - bestSellers.length}</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <Package className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400 font-medium mb-1">Total Products</p>
                <p className="text-3xl font-bold text-blue-300">{products.length}</p>
              </div>
              <div className="p-3 bg-blue-900 rounded-lg">
                <Grid className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
          <button onClick={clearNotifications} className="text-red-600 hover:text-red-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
          <Check className="w-5 h-5 text-green-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-green-800 font-medium">{success}</p>
          </div>
          <button onClick={clearNotifications} className="text-green-600 hover:text-green-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Current Best Sellers */}
      {bestSellers.length > 0 && (
        <div className="mb-8 bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-900 rounded-lg">
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">Current Best Sellers</h2>
              <span className="px-3 py-1 bg-yellow-900 text-yellow-300 text-sm font-medium rounded-full">
                {bestSellers.length}/5 slots
              </span>
            </div>
            <div className="text-sm text-gray-400">
              {5 - bestSellers.length} slots available
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {bestSellers.map((product) => (
              <div key={product.id} className="bg-gray-800 rounded-xl border border-gray-600 p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <div className="w-full h-32 bg-gray-700 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={product.image || '/api/placeholder/200/150'} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-400 text-white text-xs font-bold rounded-full shadow-lg">
                      <Crown className="w-3 h-3" />
                      Best Seller
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-100 text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-gray-400 truncate">{product.category}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-600">
                    <span className="text-sm font-bold text-green-400">
                      {product.priceFormatted || `₹${Number(product.price || 0).toFixed(2)}`}
                    </span>
                    <button
                      onClick={() => handleRemoveFromBestSellers(product.id)}
                      disabled={actionLoading}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove from Best Sellers"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-gray-900 rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="category">Sort by Category</option>
              <option value="date">Sort by Date</option>
            </select>
            <div className="flex border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 transition-colors ${
                  viewMode === "grid" 
                    ? "bg-yellow-500 text-white" 
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 transition-colors ${
                  viewMode === "list" 
                    ? "bg-yellow-500 text-white" 
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-gray-900 rounded-lg shadow">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-100">All Products</h2>
            <span className="text-sm text-gray-400">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </span>
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-medium mb-2">No products found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-gray-800 rounded-xl border border-gray-600 p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <div className="w-full h-32 bg-gray-700 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={product.image || '/api/placeholder/200/150'} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.isBestSeller && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-400 text-white text-xs font-bold rounded-full shadow-lg">
                        <Crown className="w-3 h-3" />
                        Best Seller
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-100 text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-gray-400 truncate">{product.category}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-600">
                    <span className="text-sm font-bold text-green-400">
                      {product.priceFormatted || `₹${Number(product.price || 0).toFixed(2)}`}
                    </span>
                    <button
                      onClick={() => product.isBestSeller 
                        ? handleRemoveFromBestSellers(product.id)
                        : handleAddToBestSellers(product.id)
                      }
                      disabled={actionLoading || (!product.isBestSeller && bestSellers.length >= 5)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        product.isBestSeller
                          ? "text-red-400 hover:text-red-300 hover:bg-red-900"
                          : "bg-yellow-500 text-white hover:bg-yellow-600"
                      }`}
                      title={product.isBestSeller ? "Remove from Best Sellers" : 
                        bestSellers.length >= 5 ? "Maximum 5 best sellers allowed" : "Add to Best Sellers"}
                    >
                      {product.isBestSeller ? "Remove" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-6 hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image || '/api/placeholder/64/64'} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-100 truncate">{product.name}</h3>
                      {product.isBestSeller && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-400 text-white text-xs font-bold rounded-full">
                          <Crown className="w-3 h-3" />
                          Best Seller
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 truncate">{product.category}</p>
                    <p className="text-sm font-medium text-green-400">
                      {product.priceFormatted || `₹${Number(product.price || 0).toFixed(2)}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => product.isBestSeller 
                        ? handleRemoveFromBestSellers(product.id)
                        : handleAddToBestSellers(product.id)
                      }
                      disabled={actionLoading || (!product.isBestSeller && bestSellers.length >= 5)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        product.isBestSeller
                          ? "text-red-400 hover:text-red-300 hover:bg-red-900"
                          : "bg-yellow-500 text-white hover:bg-yellow-600"
                      }`}
                      title={product.isBestSeller ? "Remove from Best Sellers" : 
                        bestSellers.length >= 5 ? "Maximum 5 best sellers allowed" : "Add to Best Sellers"}
                    >
                      {product.isBestSeller ? "Remove" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
