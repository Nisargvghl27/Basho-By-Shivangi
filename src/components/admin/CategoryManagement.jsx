"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen,
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight,
  Loader2,
  UploadCloud
} from "lucide-react";
import { db, storage } from "../../lib/firebase"; // Import your firebase config
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [flatCategories, setFlatCategories] = useState([]); // Store raw flat data for parent selection
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState("");

  // --- 1. Fetch & Transform Data ---
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "categories"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const flatData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setFlatCategories(flatData);
      const treeData = buildCategoryTree(flatData);
      setCategories(treeData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to convert flat list to nested tree
  const buildCategoryTree = (items) => {
    const itemMap = {};
    const roots = [];

    // Initialize map
    items.forEach(item => {
      itemMap[item.id] = { ...item, subcategories: [] };
    });

    // Link children to parents
    items.forEach(item => {
      if (item.parentId && itemMap[item.parentId]) {
        itemMap[item.parentId].subcategories.push(itemMap[item.id]);
      } else {
        roots.push(itemMap[item.id]);
      }
    });

    return roots;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // --- 2. Image Upload Helper ---
  const handleImageUpload = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `categories/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // --- 3. CRUD Operations ---
  const handleSaveCategory = async (formData, imageFile) => {
    try {
      setLoading(true);
      
      let imageUrl = formData.image;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const categoryData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        parentId: formData.parent || null, // Store null if root
        status: formData.status,
        image: imageUrl || "/api/placeholder/200/200",
        updatedAt: serverTimestamp()
      };

      if (selectedCategory) {
        // UPDATE Existing
        const catRef = doc(db, "categories", selectedCategory.id);
        await updateDoc(catRef, categoryData);
      } else {
        // CREATE New
        await addDoc(collection(db, "categories"), {
          ...categoryData,
          createdAt: serverTimestamp(),
          productCount: 0 // Initialize count
        });
      }

      await fetchCategories(); // Refresh list
      setShowAddModal(false);
      setShowEditModal(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm("Are you sure? This will delete the category and ALL its subcategories.")) return;

    try {
      setLoading(true);
      
      // Recursive delete function
      const deleteRecursive = async (id) => {
        // 1. Find children
        const children = flatCategories.filter(cat => cat.parentId === id);
        
        // 2. Delete children first
        for (const child of children) {
          await deleteRecursive(child.id);
        }

        // 3. Delete the document itself
        await deleteDoc(doc(db, "categories", id));
        
        // Optional: Delete image from storage here if needed
      };

      await deleteRecursive(categoryId);
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      const newStatus = category.status === 'Active' ? 'Inactive' : 'Active';
      const catRef = doc(db, "categories", category.id);
      await updateDoc(catRef, { status: newStatus });
      
      // Optimistic UI update (or just fetchCategories)
      fetchCategories();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // --- 4. Helper Functions ---
  const toggleCategoryExpansion = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // --- 5. Components ---
  const CategoryForm = ({ category, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      status: category?.status || "Active",
      parent: category?.parentId || parentCategory || "",
      image: category?.image || ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(category?.image || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      await onSave(formData, imageFile);
      setIsSubmitting(false);
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    };

    // Filter out self from parent options to prevent circular dependency
    const availableParents = flatCategories.filter(cat => !category || cat.id !== category.id);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {category ? "Edit Category" : "Add New Category"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            
            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug (URL-friendly)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            
            {/* Parent Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Parent Category
              </label>
              <select
                value={formData.parent}
                onChange={(e) => setFormData({...formData, parent: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">None (Root Category)</option>
                {availableParents.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Image
              </label>
              <div className="flex items-center gap-4">
                {previewUrl && (
                  <img src={previewUrl} alt="Preview" className="w-16 h-16 object-cover rounded-lg border" />
                )}
                <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  <UploadCloud className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">Click to upload image</p>
                </label>
              </div>
            </div>
            
            {/* Status */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.status === 'Active'}
                  onChange={(e) => setFormData({...formData, status: e.target.checked ? 'Active' : 'Inactive'})}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
              </label>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {category ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const CategoryRow = ({ category, level = 0 }) => {
    const isExpanded = expandedCategories.has(category.id);
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;
    
    return (
      <>
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
              {/* Expansion Toggle */}
              {hasSubcategories ? (
                <button
                  onClick={() => toggleCategoryExpansion(category.id)}
                  className="mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              ) : (
                <span className="w-6 mr-2"></span>
              )}
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded mr-3 overflow-hidden flex-shrink-0 relative">
                   {category.image ? (
                     <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                   ) : (
                     <Folder className="w-5 h-5 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                   )}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {category.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    /{category.slug}
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-w-[200px] truncate">
            {category.description}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
            {category.productCount || 0}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              category.status === 'Active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {category.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setShowEditModal(true);
                }}
                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => handleToggleStatus(category)}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                title="Toggle Status"
              >
                {category.status === 'Active' ? (
                  <ToggleRight className="w-5 h-5 text-green-600" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-red-600" />
                )}
              </button>

              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
        
        {isExpanded && hasSubcategories && category.subcategories.map(subcategory => (
          <CategoryRow key={subcategory.id} category={subcategory} level={level + 1} />
        ))}
      </>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Category Management</h1>
           <p className="text-sm text-gray-500 dark:text-gray-400">Manage your product categories and subcategories</p>
        </div>
        <button
          onClick={() => {
            setParentCategory("");
            setSelectedCategory(null);
            setShowAddModal(true);
          }}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Loading State */}
      {loading && !showAddModal && !showEditModal && categories.length === 0 && (
          <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
      )}

      {/* Categories Table */}
      {!loading && categories.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <FolderOpen className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No categories found</h3>
              <p className="text-gray-500 dark:text-gray-400">Get started by creating a new category.</p>
          </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category Structure
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {categories.map(category => (
                    <CategoryRow key={category.id} category={category} />
                ))}
                </tbody>
            </table>
            </div>
        </div>
      )}

      {/* Modals */}
      {(showAddModal || showEditModal) && (
        <CategoryForm
          category={selectedCategory}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setSelectedCategory(null);
          }}
          onSave={handleSaveCategory}
        />
      )}
    </div>
  );
}