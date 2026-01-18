"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Loader2,
  Calendar,
  Clock,
  Users,
  Search,
  Image as ImageIcon,
  IndianRupee,
  Star // Added Star icon for featured status
} from "lucide-react";
import {
  fetchAllWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
} from "../../lib/workshopService";

export default function WorkshopManagement() {
  const [workshops, setWorkshops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    date: "",
    time: "",
    price: "",
    seats: "",
    status: "active",
    description: "",
    imageUrl: "",
    isFeatured: false, // Added isFeatured
  });

  useEffect(() => {
    (async () => {
      const data = await fetchAllWorkshops();
      setWorkshops(data);
    })();
  }, []);

  const loadWorkshops = async () => {
    const data = await fetchAllWorkshops();
    setWorkshops(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      subtitle: "",
      date: "",
      time: "",
      price: "",
      seats: "",
      status: "active",
      description: "",
      imageUrl: "",
      isFeatured: false, // Reset isFeatured
    });
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { ...formData };
    delete payload.imageUrl;

    if (editingId) {
      await updateWorkshop(editingId, payload, formData.imageUrl);
    } else {
      await createWorkshop(payload, formData.imageUrl);
    }

    await loadWorkshops();
    resetForm();
    setLoading(false);
  };

  const handleEdit = (w) => {
    setEditingId(w.id);
    setFormData({
      title: w.title,
      subtitle: w.subtitle || "",
      date: w.date,
      time: w.time,
      price: w.price,
      seats: w.seats,
      status: w.status || "active",
      description: w.description || "",
      imageUrl: w.image || "",
      isFeatured: w.isFeatured || false, // Load isFeatured
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this workshop?")) {
      await deleteWorkshop(id);
      loadWorkshops();
    }
  };

  const filteredWorkshops = workshops.filter((w) =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-1">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Workshops
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your upcoming events and classes
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Workshop
        </button>
      </div>

      {/* Search and Filters */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search workshops..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Workshop Details
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredWorkshops.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No workshops found matching your search.
                  </td>
                </tr>
              ) : (
                filteredWorkshops.map((w) => (
                  <tr
                    key={w.id}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    {/* Column 1: Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100">
                          {w.image ? (
                            <img
                              src={w.image}
                              alt={w.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {w.title}
                            </h3>
                            {w.isFeatured && (
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                            {w.subtitle || "No subtitle"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Schedule */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          {w.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-2" />
                          {w.time}
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Stats */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                          <IndianRupee className="w-3 h-3 mr-1" />
                          {w.price}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {w.seats} seats
                        </div>
                      </div>
                    </td>

                    {/* Column 4: Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                          w.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {w.status || "active"}
                      </span>
                    </td>

                    {/* Column 5: Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(w)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:hover:bg-blue-900/20"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(w.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:hover:bg-red-900/20"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingId ? "Edit Workshop" : "Create New Workshop"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Image Preview */}
                <div className="flex items-start gap-4">
                  <div className="w-32 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border border-gray-200">
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Image URL
                    </label>
                    <input
                      required
                      name="imageUrl"
                      placeholder="https://..."
                      value={formData.imageUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Paste a direct link to the workshop image (e.g., from Cloudinary).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      required
                      name="title"
                      placeholder="e.g., Advanced Pottery Masterclass"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subtitle (Optional)
                    </label>
                    <input
                      name="subtitle"
                      placeholder="e.g., Learn the art of glazing"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      required
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      name="price"
                      placeholder="0"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Total Seats
                    </label>
                    <input
                      type="number"
                      required
                      name="seats"
                      placeholder="10"
                      value={formData.seats}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Feature Toggle Checkbox */}
                <div className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                      Show this workshop on Home Page
                    </label>
                    <span className="text-xs text-gray-500">
                      Check this to feature this workshop on the main landing page.
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Describe the workshop curriculum..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center"
                  >
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingId ? "Update Workshop" : "Create Workshop"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}