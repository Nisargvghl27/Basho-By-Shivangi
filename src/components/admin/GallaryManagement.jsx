"use client";

import { useState, useEffect } from "react";
import { 
  Plus, Trash2, Link as LinkIcon, Loader2, X, Film, Image as ImageIcon 
} from "lucide-react";
import { fetchGalleryByCategory, addGalleryItem, deleteGalleryItem } from "../../lib/galleryService";

export default function GalleryManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("process");
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    order: 1,
    type: "image",
    image: "",
    videoUrl: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load items when tab changes
  useEffect(() => {
    loadItems();
  }, [activeTab]);

  const loadItems = async () => {
    setLoading(true);
    const data = await fetchGalleryByCategory(activeTab);
    setItems(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addGalleryItem({
        ...formData,
        category: activeTab
      });
      
      setShowModal(false);
      resetForm();
      loadItems();
    } catch (error) {
      console.error(error);
      alert("Failed to add item. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this item?")) {
      await deleteGalleryItem(id);
      loadItems();
    }
  };

  const resetForm = () => {
    setFormData({ 
      title: "", 
      subtitle: "", 
      order: 1, 
      type: "image", 
      image: "", 
      videoUrl: "" 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gallery & Visuals</h1>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("process")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "process" 
              ? "border-blue-600 text-blue-600" 
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Process In Motion
        </button>
        <button
          onClick={() => setActiveTab("studio")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "studio" 
              ? "border-blue-600 text-blue-600" 
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Studio Life
        </button>
      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="p-12 flex justify-center"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-900">
                {/* Display Logic */}
                {item.type === 'video' ? (
                  <>
                     <video src={item.videoUrl} className="w-full h-full object-cover" muted />
                     <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded flex items-center gap-1">
                       <Film size={12} /> Video
                     </div>
                  </>
                ) : (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = "https://via.placeholder.com/300?text=Invalid+URL"}
                  />
                )}

                <button 
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                  <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">#{item.order}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.subtitle || "No subtitle"}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
              No items found. Add a Cloudinary URL to get started.
            </div>
          )}
        </div>
      )}

      {/* Add Item Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">Add to {activeTab === 'process' ? 'Process' : 'Studio'}</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'image' })}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    formData.type === 'image' 
                      ? 'border-blue-600 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <ImageIcon className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-medium">Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'video' })}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    formData.type === 'video' 
                      ? 'border-blue-600 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Film className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-medium">Video</span>
                </button>
              </div>

              {/* URL Inputs */}
              <div className="space-y-4">
                {formData.type === 'video' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Video URL (Cloudinary .mp4)</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input 
                        required
                        value={formData.videoUrl}
                        onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg bg-transparent"
                        placeholder="https://res.cloudinary.com/.../video.mp4"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">
                    {formData.type === 'video' ? 'Poster / Thumbnail Image URL' : 'Image URL'}
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      required
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg bg-transparent"
                      placeholder="https://res.cloudinary.com/.../image.jpg"
                    />
                  </div>
                  {/* Live Preview */}
                  {formData.image && (
                    <div className="mt-2 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-contain" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                  )}
                </div>
              </div>

              {/* Info Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg bg-transparent"
                    placeholder="e.g. Centering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Order</label>
                  <input 
                    type="number"
                    value={formData.order}
                    onChange={e => setFormData({...formData, order: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subtitle (Optional)</label>
                <input 
                  value={formData.subtitle}
                  onChange={e => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg bg-transparent"
                  placeholder="e.g. Beginner Technique"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save URL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}