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
  Image,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    // Mock data with nested categories
    const mockCategories = [
      {
        id: 1,
        name: "Dinnerware",
        slug: "dinnerware",
        description: "Complete dinner sets and individual pieces",
        image: "/api/placeholder/200/200",
        status: "Active",
        productCount: 45,
        subcategories: [
          {
            id: 11,
            name: "Dinner Sets",
            slug: "dinner-sets",
            description: "Complete dinner sets for multiple people",
            image: "/api/placeholder/200/200",
            status: "Active",
            productCount: 12,
            subcategories: []
          },
          {
            id: 12,
            name: "Plates",
            slug: "plates",
            description: "Individual plates of various sizes",
            image: "/api/placeholder/200/200",
            status: "Active",
            productCount: 18,
            subcategories: []
          },
          {
            id: 13,
            name: "Bowls",
            slug: "bowls",
            description: "Soup bowls, cereal bowls, and serving bowls",
            image: "/api/placeholder/200/200",
            status: "Active",
            productCount: 15,
            subcategories: []
          }
        ]
      },
      {
        id: 2,
        name: "Drinkware",
        slug: "drinkware",
        description: "Mugs, glasses, and cups",
        image: "/api/placeholder/200/200",
        status: "Active",
        productCount: 32,
        subcategories: [
          {
            id: 21,
            name: "Coffee Mugs",
            slug: "coffee-mugs",
            description: "Handcrafted coffee and tea mugs",
            image: "/api/placeholder/200/200",
            status: "Active",
            productCount: 20,
            subcategories: []
          },
          {
            id: 22,
            name: "Tea Cups",
            slug: "tea-cups",
            description: "Traditional and modern tea cups",
            image: "/api/placeholder/200/200",
            status: "Active",
            productCount: 12,
            subcategories: []
          }
        ]
      },
      {
        id: 3,
        name: "Decor",
        slug: "decor",
        description: "Decorative pottery and art pieces",
        image: "/api/placeholder/200/200",
        status: "Active",
        productCount: 28,
        subcategories: [
          {
            id: 31,
            name: "Vases",
            slug: "vases",
            description: "Decorative vases for flowers and display",
            image: "/api/placeholder/200/200",
            status: "Active",
            productCount: 16,
            subcategories: []
          },
          {
            id: 32,
            name: "Wall Art",
            slug: "wall-art",
            description: "Handcrafted pottery wall decorations",
            image: "/api/placeholder/200/200",
            status: "Inactive",
            productCount: 12,
            subcategories: []
          }
        ]
      },
      {
        id: 4,
        name: "Garden",
        slug: "garden",
        description: "Outdoor and garden pottery",
        image: "/api/placeholder/200/200",
        status: "Active",
        productCount: 18,
        subcategories: []
      }
    ];
    setCategories(mockCategories);
  }, []);

  const toggleCategoryExpansion = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleCategoryStatus = (categoryId) => {
    const updateCategoryStatus = (cats) => {
      return cats.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, status: cat.status === 'Active' ? 'Inactive' : 'Active' };
        }
        if (cat.subcategories && cat.subcategories.length > 0) {
          return { ...cat, subcategories: updateCategoryStatus(cat.subcategories) };
        }
        return cat;
      });
    };
    setCategories(updateCategoryStatus(categories));
  };

  const deleteCategory = (categoryId) => {
    if (confirm("Are you sure you want to delete this category? This will also delete all subcategories.")) {
      const removeCategory = (cats) => {
        return cats.filter(cat => cat.id !== categoryId).map(cat => {
          if (cat.subcategories && cat.subcategories.length > 0) {
            return { ...cat, subcategories: removeCategory(cat.subcategories) };
          }
          return cat;
        });
      };
      setCategories(removeCategory(categories));
    }
  };

  const getAllCategoriesFlat = (cats, level = 0, parent = null) => {
    let result = [];
    cats.forEach(cat => {
      result.push({ ...cat, level, parent });
      if (cat.subcategories && cat.subcategories.length > 0) {
        result = result.concat(getAllCategoriesFlat(cat.subcategories, level + 1, cat.name));
      }
    });
    return result;
  };

  const CategoryForm = ({ category, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      status: category?.status || "Active",
      parent: parentCategory || ""
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    const flatCategories = getAllCategoriesFlat(categories).filter(cat => !category || cat.id !== category.id);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {category ? "Edit Category" : "Add New Category"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug (URL-friendly name)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Parent Category
              </label>
              <select
                value={formData.parent}
                onChange={(e) => setFormData({...formData, parent: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">None (Root Category)</option>
                {flatCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {'  '.repeat(cat.level)}{cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category Image
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.status === 'Active'}
                  onChange={(e) => setFormData({...formData, status: e.target.checked ? 'Active' : 'Inactive'})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
              </label>
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
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
              {hasSubcategories && (
                <button
                  onClick={() => toggleCategoryExpansion(category.id)}
                  className="mr-2 text-gray-400 hover:text-gray-600"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              )}
              {!hasSubcategories && <span className="mr-6"></span>}
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded mr-3 flex items-center justify-center">
                  {isExpanded ? <FolderOpen className="w-4 h-4 text-gray-500" /> : <Folder className="w-4 h-4 text-gray-500" />}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {category.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {category.slug}
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
            {category.description}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
            {category.productCount} products
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 py-1 text-xs rounded-full ${
              category.status === 'Active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {category.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setShowEditModal(true);
                }}
                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteCategory(category.id)}
                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleCategoryStatus(category.id)}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {category.status === 'Active' ? (
                  <ToggleRight className="w-5 h-5 text-green-600" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-red-600" />
                )}
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Category Management</h1>
        <button
          onClick={() => {
            setParentCategory("");
            setShowAddModal(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
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

      {/* Modals */}
      {showAddModal && (
        <CategoryForm
          onClose={() => setShowAddModal(false)}
          onSave={(data) => {
            const newCategory = {
              ...data,
              id: Date.now(),
              image: "/api/placeholder/200/200",
              productCount: 0,
              subcategories: []
            };
            
            if (data.parent) {
              // Add as subcategory
              const addToParent = (cats) => {
                return cats.map(cat => {
                  if (cat.id == data.parent) {
                    return {
                      ...cat,
                      subcategories: [...(cat.subcategories || []), newCategory]
                    };
                  }
                  if (cat.subcategories && cat.subcategories.length > 0) {
                    return { ...cat, subcategories: addToParent(cat.subcategories) };
                  }
                  return cat;
                });
              };
              setCategories(addToParent(categories));
            } else {
              // Add as root category
              setCategories([...categories, newCategory]);
            }
          }}
        />
      )}

      {showEditModal && selectedCategory && (
        <CategoryForm
          category={selectedCategory}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCategory(null);
          }}
          onSave={(data) => {
            const updateCategory = (cats) => {
              return cats.map(cat => {
                if (cat.id === selectedCategory.id) {
                  return { ...cat, ...data };
                }
                if (cat.subcategories && cat.subcategories.length > 0) {
                  return { ...cat, subcategories: updateCategory(cat.subcategories) };
                }
                return cat;
              });
            };
            setCategories(updateCategory(categories));
          }}
        />
      )}
    </div>
  );
}
