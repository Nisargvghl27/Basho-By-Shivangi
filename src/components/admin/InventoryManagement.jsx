"use client";

import { useState, useEffect } from "react";
// 櫨 Firebase Imports
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../../lib/firebase";

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
  ChevronRight,
  X
} from "lucide-react";

export default function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStockLevel, setSelectedStockLevel] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showStockUpdateModal, setShowStockUpdateModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [autoRestockEnabled, setAutoRestockEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 10;

  // ==========================================
  // 櫨 1. FETCH ORDERS (For Sales Stats)
  // ==========================================
  useEffect(() => {
    const q = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date()
      }));
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, []);

  // ==========================================
  // 櫨 2. FETCH PRODUCTS & CALCULATE STATS
  // ==========================================
  useEffect(() => {
    const q = query(collection(db, "products")); // Assuming 'products' is your collection
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => {
        const data = doc.data();
        
        // Calculate Sales Logic
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        let weeklySales = 0;
        let monthlySales = 0;

        // Iterate through all orders to count sales for this product
        if (orders.length > 0) {
          orders.forEach(order => {
            if (order.items && Array.isArray(order.items)) {
              order.items.forEach(item => {
                // Check if item ID matches (handle both id and objectId variations)
                if (item.id === doc.id || item.productId === doc.id) {
                  const qty = parseInt(item.quantity) || 1;
                  if (order.createdAt >= oneWeekAgo) weeklySales += qty;
                  if (order.createdAt >= oneMonthAgo) monthlySales += qty;
                }
              });
            }
          });
        }

        // Determine Stock Status
        const stock = parseInt(data.stock) || 0;
        const threshold = data.lowStockThreshold || lowStockThreshold;
        let status = "In Stock";
        if (stock === 0) status = "Out of Stock";
        else if (stock <= 5) status = "Critical";
        else if (stock <= threshold) status = "Low Stock";

        return {
          id: doc.id,
          name: data.name || "Unnamed Product",
          sku: data.sku || `SKU-${doc.id.slice(0, 6).toUpperCase()}`,
          category: data.category || "Uncategorized",
          currentStock: stock,
          lowStockThreshold: threshold,
          maxStock: data.maxStock || 100,
          supplier: data.supplier || "Basho Studio",
          unitPrice: parseFloat(data.price) || 0,
          totalValue: (parseFloat(data.price) || 0) * stock,
          stockStatus: status,
          trend: weeklySales > 0 ? "up" : "stable", // Simplified trend logic
          weeklySales: weeklySales,
          monthlySales: monthlySales,
          autoRestock: data.autoRestock ?? true
        };
      });

      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orders, lowStockThreshold]); // Re-run when orders update to recalculate stats

  // ==========================================
  // 櫨 3. ACTIONS
  // ==========================================

  const updateStock = async (productId, newStock) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        stock: parseInt(newStock)
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock");
    }
  };

  const toggleAutoRestock = async (product) => {
    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        autoRestock: !product.autoRestock
      });
    } catch (error) {
      console.error("Error updating auto-restock:", error);
    }
  };

  const handleAddProduct = async (formData) => {
    try {
      await addDoc(collection(db, "products"), {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        sku: formData.sku,
        supplier: formData.supplier,
        description: "New inventory item", // Default
        images: ["/api/placeholder/400/400"], // Placeholder
        createdAt: serverTimestamp(),
        lowStockThreshold: parseInt(formData.lowStockThreshold),
        autoRestock: true
      });
      setShowAddProductModal(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  // ==========================================
  // 櫨 4. FILTERS & PAGINATION
  // ==========================================
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    // Fix stock level filtering logic
    let matchesStockLevel = true;
    if (selectedStockLevel === "low") matchesStockLevel = product.stockStatus === "Low Stock";
    if (selectedStockLevel === "critical") matchesStockLevel = product.stockStatus === "Critical";
    if (selectedStockLevel === "out") matchesStockLevel = product.stockStatus === "Out of Stock";
    
    return matchesSearch && matchesCategory && matchesStockLevel;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Critical': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Out of Stock': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // ==========================================
  // 櫨 5. MODALS
  // ==========================================
  const StockUpdateModal = ({ product, onClose }) => {
    const [newStock, setNewStock] = useState(product.currentStock);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      await updateStock(product.id, newStock);
      setIsSubmitting(false);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Update Stock</h3>
            <button onClick={onClose}><X className="w-5 h-5 text-gray-500" /></button>
          </div>
          
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {isSubmitting ? "Updating..." : "Update Stock"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AddProductModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
      name: "", sku: "", category: "Dinnerware", price: "", stock: "", supplier: "", lowStockThreshold: 10
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      await handleAddProduct(formData);
      setIsSubmitting(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
           <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Add New Product</h3>
            <button onClick={onClose}><X className="w-5 h-5 text-gray-500" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input required type="text" className="w-full p-2 border rounded dark:bg-gray-700" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm mb-1">SKU</label>
                <input required type="text" className="w-full p-2 border rounded dark:bg-gray-700" 
                  value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm mb-1">Category</label>
                <select className="w-full p-2 border rounded dark:bg-gray-700"
                   value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                   <option>Dinnerware</option><option>Drinkware</option><option>Decor</option><option>Garden</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Supplier</label>
                <input required type="text" className="w-full p-2 border rounded dark:bg-gray-700" 
                  value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm mb-1">Price (₹)</label>
                <input required type="number" step="0.01" className="w-full p-2 border rounded dark:bg-gray-700" 
                  value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm mb-1">Initial Stock</label>
                <input required type="number" className="w-full p-2 border rounded dark:bg-gray-700" 
                  value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {isSubmitting ? "Adding..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stockStatus === "Low Stock").length;
  const criticalStockProducts = products.filter(p => p.stockStatus === "Critical").length;
  const totalInventoryValue = products.reduce((sum, p) => sum + p.totalValue, 0);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading inventory...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Inventory Management</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => setShowAddProductModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
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
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totalProducts}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{lowStockProducts}</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">{criticalStockProducts}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">₹{totalInventoryValue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Settings & Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4">
         {/* Settings */}
         <div className="flex flex-col lg:flex-row gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Global Low Stock Alert:
            </label>
            <input
              type="number"
              min="1"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-1 border rounded bg-white dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="flex items-center">
             <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <input type="checkbox" checked={autoRestockEnabled} onChange={(e) => setAutoRestockEnabled(e.target.checked)} />
                <span>Auto-Restock System Active</span>
             </label>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="p-2 border rounded dark:bg-gray-700">
             <option value="all">All Categories</option>
             <option value="Dinnerware">Dinnerware</option>
             <option value="Drinkware">Drinkware</option>
             <option value="Decor">Decor</option>
             <option value="Garden">Garden</option>
          </select>
          <select value={selectedStockLevel} onChange={(e) => setSelectedStockLevel(e.target.value)} className="p-2 border rounded dark:bg-gray-700">
             <option value="all">All Levels</option>
             <option value="low">Low Stock</option>
             <option value="critical">Critical</option>
             <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-300">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-300">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-300">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-300">Mo. Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.sku}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                       <span className={`font-bold ${product.currentStock <= product.lowStockThreshold ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`}>
                         {product.currentStock}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStockStatusColor(product.stockStatus)}`}>
                      {product.stockStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      {product.monthlySales}
                      {product.trend === 'up' ? <TrendingUp className="w-4 h-4 text-green-500 ml-1"/> : <TrendingDown className="w-4 h-4 text-gray-400 ml-1"/>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => { setSelectedProduct(product); setShowStockUpdateModal(true); }}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Edit Stock"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                         onClick={() => toggleAutoRestock(product)}
                         className={`p-1 ${product.autoRestock ? 'text-green-600' : 'text-gray-400'}`}
                         title="Toggle Auto-Restock"
                      >
                         {product.autoRestock ? <Bell className="w-4 h-4"/> : <BellOff className="w-4 h-4"/>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentProducts.length === 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-between items-center border-t border-gray-200 dark:border-gray-600">
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage===1} className="px-3 py-1 bg-white border rounded disabled:opacity-50">Prev</button>
          <span className="text-sm">Page {currentPage} of {totalPages || 1}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage===totalPages || totalPages===0} className="px-3 py-1 bg-white border rounded disabled:opacity-50">Next</button>
        </div>
      </div>

      {showStockUpdateModal && selectedProduct && (
        <StockUpdateModal
          product={selectedProduct}
          onClose={() => { setShowStockUpdateModal(false); setSelectedProduct(null); }}
        />
      )}

      {showAddProductModal && (
        <AddProductModal onClose={() => setShowAddProductModal(false)} />
      )}
    </div>
  );
}