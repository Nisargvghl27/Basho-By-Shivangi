"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Plus, Search, Edit, Trash2, Package,
  X, Loader2
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
  const [editingId, setEditingId] = useState(null); // Tracks if we are editing
  
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
    imageUrl: "" // New field for the image URL
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
      imageUrl: product.image || "" // Populate existing image URL
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
      // Process tags into array
      const processedData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };
      // Remove imageUrl from processedData as it's passed separately
      delete processedData.imageUrl;

      if (editingId) {
        // UPDATE Existing Product
        await updateProduct(editingId, processedData, formData.imageUrl);
      } else {
        // CREATE New Product
        await createProduct(processedData, formData.imageUrl);
      }
      
      // Success
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
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Product Management</h1>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-transparent"
        >
          <option value="all">All Categories</option>
          <option value="Dinnerware">Dinnerware</option>
          <option value="Drinkware">Drinkware</option>
          <option value="Decor">Decor</option>
          <option value="Garden">Garden</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-blue-500"/></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          {product.image ? (
                            <img src={product.image} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <Package className="h-full w-full p-2 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium">₹{product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEditClick(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL (Add/Edit) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800 z-10">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image URL Input & Preview */}
              <div className="space-y-4">
                <div className="flex justify-center">
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Preview" className="h-48 object-contain rounded-lg border" />
                    ) : (
                      <div className="h-48 w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400">
                        <Package className="w-10 h-10 mb-2" />
                        <p className="text-sm">Image preview will appear here</p>
                      </div>
                    )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cloudinary Image URL</label>
                  <input 
                    required
                    type="url" 
                    name="imageUrl" 
                    value={formData.imageUrl} 
                    onChange={handleInputChange} 
                    className="w-full p-2 border rounded-lg bg-transparent" 
                    placeholder="https://res.cloudinary.com/..." 
                  />
                  <p className="text-xs text-gray-500">Paste the direct link to your image on Cloudinary.</p>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">SKU</label>
                  <input required name="sku" value={formData.sku} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-transparent">
                    <option value="Dinnerware">Dinnerware</option>
                    <option value="Drinkware">Drinkware</option>
                    <option value="Decor">Decor</option>
                    <option value="Garden">Garden</option>
                    <option value="Sets">Sets</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subtitle</label>
                  <input name="subtitle" value={formData.subtitle} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-transparent" placeholder="e.g. Stoneware • Hand-dipped" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (₹)</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock</label>
                  <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-transparent">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-medium">Description</label>
                 <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    className="w-full p-2 border rounded-lg bg-transparent h-24" 
                 />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <input name="tags" value={formData.tags} onChange={handleInputChange} className="w-full p-2 border rounded-lg bg-transparent" placeholder="mugs, handmade, gift" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button type="button" onClick={resetForm} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
                  {editingId ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}