"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Download, 
  Edit, 
  AlertTriangle, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus,
  Bell,
  BellOff,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStockLevel, setSelectedStockLevel] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showStockUpdateModal, setShowStockUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [autoRestockEnabled, setAutoRestockEnabled] = useState(true);

  const productsPerPage = 10;

  useEffect(() => {
    // Mock inventory data
    const mockProducts = [
      {
        id: 1,
        name: "Ceramic Dinner Set",
        sku: "CDS-001",
        category: "Dinnerware",
        currentStock: 45,
        lowStockThreshold: 10,
        maxStock: 100,
        reorderPoint: 15,
        reorderQuantity: 50,
        lastRestocked: "2024-01-10",
        supplier: "Ceramic Suppliers Inc.",
        unitPrice: 299.99,
        totalValue: 13499.55,
        stockStatus: "In Stock",
        trend: "up",
        weeklySales: 12,
        monthlySales: 48,
        autoRestock: true
      },
      {
        id: 2,
        name: "Handmade Coffee Mug",
        sku: "HCM-002",
        category: "Drinkware",
        currentStock: 8,
        lowStockThreshold: 15,
        maxStock: 80,
        reorderPoint: 20,
        reorderQuantity: 40,
        lastRestocked: "2024-01-05",
        supplier: "Artisan Pottery Co.",
        unitPrice: 24.99,
        totalValue: 199.92,
        stockStatus: "Low Stock",
        trend: "down",
        weeklySales: 18,
        monthlySales: 72,
        autoRestock: true
      },
      {
        id: 3,
        name: "Artistic Vase",
        sku: "AV-003",
        category: "Decor",
        currentStock: 3,
        lowStockThreshold: 8,
        maxStock: 50,
        reorderPoint: 10,
        reorderQuantity: 25,
        lastRestocked: "2024-01-03",
        supplier: "Decorative Arts Ltd.",
        unitPrice: 89.99,
        totalValue: 269.97,
        stockStatus: "Critical",
        trend: "stable",
        weeklySales: 6,
        monthlySales: 24,
        autoRestock: false
      },
      {
        id: 4,
        name: "Pottery Planters Set",
        sku: "PPS-004",
        category: "Garden",
        currentStock: 0,
        lowStockThreshold: 12,
        maxStock: 60,
        reorderPoint: 15,
        reorderQuantity: 30,
        lastRestocked: "2023-12-20",
        supplier: "Garden Pottery Inc.",
        unitPrice: 59.99,
        totalValue: 0,
        stockStatus: "Out of Stock",
        trend: "down",
        weeklySales: 8,
        monthlySales: 32,
        autoRestock: true
      },
      {
        id: 5,
        name: "Serving Bowl",
        sku: "SB-005",
        category: "Dinnerware",
        currentStock: 67,
        lowStockThreshold: 20,
        maxStock: 120,
        reorderPoint: 30,
        reorderQuantity: 60,
        lastRestocked: "2024-01-12",
        supplier: "Ceramic Suppliers Inc.",
        unitPrice: 45.99,
        totalValue: 3081.33,
        stockStatus: "In Stock",
        trend: "up",
        weeklySales: 5,
        monthlySales: 20,
        autoRestock: true
      }
    ];
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesStockLevel = selectedStockLevel === "all" || 
                             (selectedStockLevel === "low" && product.currentStock <= product.lowStockThreshold) ||
                             (selectedStockLevel === "critical" && product.currentStock <= 5) ||
                             (selectedStockLevel === "out" && product.currentStock === 0);
    
    return matchesSearch && matchesCategory && matchesStockLevel;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const updateStock = (productId, newStock) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            currentStock: newStock,
            totalValue: newStock * product.unitPrice,
            stockStatus: newStock === 0 ? "Out of Stock" : 
                        newStock <= 5 ? "Critical" : 
                        newStock <= product.lowStockThreshold ? "Low Stock" : "In Stock"
          }
        : product
    ));
  };

  const toggleAutoRestock = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, autoRestock: !product.autoRestock }
        : product
    ));
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Critical': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Out of Stock': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StockUpdateModal = ({ product, onClose }) => {
    const [newStock, setNewStock] = useState(product.currentStock);
    const [updateReason, setUpdateReason] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      updateStock(product.id, parseInt(newStock));
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Update Stock</h3>
          
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {product.sku}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Stock: {product.currentStock}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Stock Quantity
              </label>
              <input
                type="number"
                min="0"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Update Reason
              </label>
              <select
                value={updateReason}
                onChange={(e) => setUpdateReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select reason</option>
                <option value="restock">New Stock Arrived</option>
                <option value="sale">Sales</option>
                <option value="damage">Damaged Items</option>
                <option value="return">Customer Returns</option>
                <option value="adjustment">Stock Adjustment</option>
                <option value="other">Other</option>
              </select>
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
                Update Stock
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Calculate statistics
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.currentStock <= p.lowStockThreshold).length;
  const criticalStockProducts = products.filter(p => p.currentStock <= 5).length;
  const outOfStockProducts = products.filter(p => p.currentStock === 0).length;
  const totalInventoryValue = products.reduce((sum, p) => sum + p.totalValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Inventory Management</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Inventory
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {totalProducts}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">In inventory</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                {lowStockProducts}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Need attention</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Stock</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                {criticalStockProducts}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Immediate action</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                ${totalInventoryValue.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Inventory value</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Low Stock Alert Threshold:
            </label>
            <input
              type="number"
              min="1"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(parseInt(e.target.value))}
              className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoRestockEnabled}
                onChange={(e) => setAutoRestockEnabled(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Auto-restock Enabled</span>
            </label>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name, SKU, or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Dinnerware">Dinnerware</option>
              <option value="Drinkware">Drinkware</option>
              <option value="Decor">Decor</option>
              <option value="Garden">Garden</option>
            </select>
            
            <select
              value={selectedStockLevel}
              onChange={(e) => setSelectedStockLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stock Levels</option>
              <option value="low">Low Stock</option>
              <option value="critical">Critical Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Monthly Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Auto Restock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {product.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${
                        product.currentStock === 0 ? 'text-red-600 dark:text-red-400' :
                        product.currentStock <= 5 ? 'text-orange-600 dark:text-orange-400' :
                        product.currentStock <= product.lowStockThreshold ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-green-600 dark:text-green-400'
                      }`}>
                        {product.currentStock}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        / {product.maxStock}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStockStatusColor(product.stockStatus)}`}>
                      {product.stockStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      {product.monthlySales}
                      {product.trend === 'up' && <TrendingUp className="w-4 h-4 ml-1 text-green-500" />}
                      {product.trend === 'down' && <TrendingDown className="w-4 h-4 ml-1 text-red-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    ${product.totalValue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleAutoRestock(product.id)}
                      className={`p-1 rounded ${
                        product.autoRestock 
                          ? 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                          : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
                      }`}
                    >
                      {product.autoRestock ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowStockUpdateModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateStock(product.id, product.currentStock + 10)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateStock(product.id, Math.max(0, product.currentStock - 1))}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                <span className="font-medium">{Math.min(indexOfLastProduct, filteredProducts.length)}</span> of{' '}
                <span className="font-medium">{filteredProducts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === i + 1
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Update Modal */}
      {showStockUpdateModal && selectedProduct && (
        <StockUpdateModal
          product={selectedProduct}
          onClose={() => {
            setShowStockUpdateModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
