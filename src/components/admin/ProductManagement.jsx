"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Plus, Search, Edit, Trash2, Package,
  X, Loader2, Image as ImageIcon, Save, Tag,
  DollarSign, Box, Layers, AlignLeft, ChevronDown
} from "lucide-react";
import { fetchAllProducts, createProduct, updateProduct, deleteProduct } from "../../lib/productService";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    brand: "Basho",
    category: "Dinnerware", 
    subtitle: "", 
    price: "",
    stock: "",
    status: "active",
    tags: "", 
    description: "",
    imageUrl: "" 
  });

  // Load Products
  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open Edit Modal
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      sku: product.sku,
      brand: product.brand || "Basho",
      category: product.category || "Dinnerware",
      subtitle: product.subtitle || "",
      price: product.price,
      stock: product.stock,
      status: product.status || "active",
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : (product.tags || ""),
      description: product.description || "",
      imageUrl: product.image || "" 
    });
    setShowAddModal(true);
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setFormData({
        name: "", sku: "", brand: "Basho", category: "Dinnerware",
        subtitle: "", price: "", stock: "", status: "active", tags: "", description: "", imageUrl: ""
    });
    setShowAddModal(false);
  };

  // Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const processedData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };
      // Remove imageUrl from processedData as it's passed separately
      delete processedData.imageUrl;

      if (editingId) {
        await updateProduct(editingId, processedData, formData.imageUrl);
      } else {
        await createProduct(processedData, formData.imageUrl);
      }
      
      await loadProducts();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Operation failed. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      await loadProducts();
    }
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let filtered = products;
    const lowerSearch = searchTerm.toLowerCase();

    if (lowerSearch) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        p.sku?.toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedCategory !== "all") filtered = filtered.filter(p => p.category === selectedCategory);
    return filtered;
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 relative h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Product Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your catalog and inventory</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="relative min-w-[200px]">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Dinnerware">Dinnerware</option>
            <option value="Drinkware">Drinkware</option>
            <option value="Decor">Decor</option>
            <option value="Garden">Garden</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="p-24 flex justify-center flex-col items-center text-gray-500">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500 mb-2"/>
            <span className="text-sm">Loading products...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex-shrink-0 relative">
                            {product.image ? (
                              <img src={product.image} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-400">
                                <ImageIcon className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 max-w-[150px] truncate">{product.subtitle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">{product.sku}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">₹{product.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                          {product.stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEditClick(product)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- ADD / EDIT MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 z-10">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {editingId ? 'Update existing product details' : 'Fill in the information to create a new product'}
                </p>
              </div>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900/50">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- LEFT COLUMN: Media & Status (4 cols) --- */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Image Card */}
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Product Image
                    </h3>
                    
                    {/* Preview Area */}
                    <div className="aspect-square w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 mb-4 flex items-center justify-center relative group">
                        {formData.imageUrl ? (
                          <img 
                            src={formData.imageUrl} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                            onError={(e) => {e.target.src = 'https://via.placeholder.com/400?text=Invalid+URL'}}
                          />
                        ) : (
                          <div className="text-center text-gray-400 p-4">
                            <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <span className="text-sm">No image preview</span>
                          </div>
                        )}
                    </div>

                    {/* URL Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cloudinary URL</label>
                      <input 
                        required
                        type="url" 
                        name="imageUrl" 
                        value={formData.imageUrl} 
                        onChange={handleInputChange} 
                        className="w-full p-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        placeholder="https://res.cloudinary.com/..." 
                      />
                      <p className="text-[11px] text-gray-500 leading-tight">
                        Paste the direct link to your image hosted on Cloudinary or another CDN.
                      </p>
                    </div>
                  </div>

                  {/* Status Card */}
                  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Visibility</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Product Status</label>
                        <div className="relative">
                            <select 
                              name="status" 
                              value={formData.status} 
                              onChange={handleInputChange} 
                              className="w-full p-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer shadow-sm"
                            >
                              <option value="active">Active (Visible)</option>
                              <option value="inactive">Inactive (Hidden)</option>
                              <option value="draft">Draft</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- RIGHT COLUMN: Details (8 cols) --- */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* General Info Card */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                      <Layers className="w-4 h-4" /> General Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Name <span className="text-red-500">*</span></label>
                        <input 
                          required 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none" 
                          placeholder="e.g. Ceramic Vase No. 1"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subtitle / Short Desc</label>
                        <input 
                          name="subtitle" 
                          value={formData.subtitle} 
                          onChange={handleInputChange} 
                          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none" 
                          placeholder="e.g. Hand-thrown Stoneware" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">SKU <span className="text-red-500">*</span></label>
                        <input 
                          required 
                          name="sku" 
                          value={formData.sku} 
                          onChange={handleInputChange} 
                          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm" 
                          placeholder="BSH-001"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Brand</label>
                        <input 
                          name="brand" 
                          value={formData.brand} 
                          onChange={handleInputChange} 
                          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none" 
                        />
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                       <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                         <AlignLeft className="w-4 h-4" /> Description
                       </label>
                       <textarea 
                          name="description" 
                          value={formData.description} 
                          onChange={handleInputChange} 
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                          placeholder="Write a detailed description of the product..."
                       />
                    </div>
                  </div>

                  {/* Pricing & Inventory */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                      <DollarSign className="w-4 h-4" /> Pricing & Inventory
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price (₹) <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <input 
                            required 
                            type="number" 
                            name="price" 
                            value={formData.price} 
                            onChange={handleInputChange} 
                            className="w-full pl-8 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none" 
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock Quantity <span className="text-red-500">*</span></label>
                        <div className="relative">
                           <Box className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                           <input 
                              required 
                              type="number" 
                              name="stock" 
                              value={formData.stock} 
                              onChange={handleInputChange} 
                              className="w-full pl-9 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none" 
                              placeholder="0"
                            />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Categorization */}
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                      <Tag className="w-4 h-4" /> Categorization
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <div className="relative">
                            <select 
                              name="category" 
                              value={formData.category} 
                              onChange={handleInputChange} 
                              className="w-full p-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer shadow-sm"
                            >
                              <option value="Dinnerware">Dinnerware</option>
                              <option value="Drinkware">Drinkware</option>
                              <option value="Decor">Decor</option>
                              <option value="Garden">Garden</option>
                              <option value="Sets">Sets</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
                        <input 
                          name="tags" 
                          value={formData.tags} 
                          onChange={handleInputChange} 
                          className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none" 
                          placeholder="Separated by commas (e.g. gift, mugs)" 
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-end gap-3 z-10">
              <button 
                type="button" 
                onClick={resetForm} 
                className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-sm transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2"/> Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {editingId ? "Update Product" : "Save Product"}
                  </>
                )}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}