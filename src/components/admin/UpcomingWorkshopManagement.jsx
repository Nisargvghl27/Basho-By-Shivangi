"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Calendar,
  Clock,
  IndianRupee,
  Users,
  Image as ImageIcon,
  Star
} from "lucide-react";
import { 
  createWorkshop, 
  getUpcomingWorkshop, 
  fetchAllWorkshops, 
  updateWorkshop 
} from "../../lib/workshopService";

export default function UpcomingWorkshopManagement() {
  const [currentUpcoming, setCurrentUpcoming] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Form State captures all details needed for the frontend
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    date: "",
    time: "",
    price: "",
    seats: "",
    imageUrl: "",
    description: "", 
  });

  // Fetch the current upcoming workshop on load
  useEffect(() => {
    fetchCurrentUpcoming();
  }, []);

  const fetchCurrentUpcoming = async () => {
    const data = await getUpcomingWorkshop();
    setCurrentUpcoming(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Un-feature all currently featured active workshops to ensure the new one is unique
      const allWorkshops = await fetchAllWorkshops();
      const featured = allWorkshops.filter(w => w.isFeatured === true);
      
      await Promise.all(featured.map(w => 
        updateWorkshop(w.id, { isFeatured: false }, w.image)
      ));

      // 2. Prepare payload for new workshop
      const payload = { 
        ...formData,
        status: "active",
        isFeatured: true // FORCE this to be featured so it appears on homepage
      };
      
      // Separate image URL from payload as per service structure
      const imageUrl = formData.imageUrl;
      delete payload.imageUrl;

      // 3. Create the new workshop
      await createWorkshop(payload, imageUrl);
      
      // 4. Reset form and refresh view
      setFormData({
        title: "",
        subtitle: "",
        date: "",
        time: "",
        price: "",
        seats: "",
        imageUrl: "",
        description: "",
      });
      await fetchCurrentUpcoming();
      alert("Upcoming Workshop Added Successfully!");
      
    } catch (error) {
      console.error("Error creating workshop:", error);
      alert("Failed to create workshop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          Upcoming Workshop Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Add a new Featured Workshop to display on the Home Page.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: ADD NEW FORM */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            Set New Upcoming Workshop
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Image URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Workshop Image (Cloudinary Link)
              </label>
              <div className="flex gap-4 items-start">
                <input
                  required
                  name="imageUrl"
                  placeholder="https://res.cloudinary.com/..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              {formData.imageUrl && (
                 <div className="mt-2 h-32 w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                 </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  required
                  name="title"
                  placeholder="e.g., Wheel Throwing Basics"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subtitle
                </label>
                <input
                  required
                  name="subtitle"
                  placeholder="e.g., A beginner friendly session"
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
                  placeholder="2500"
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
                  placeholder="15"
                  value={formData.seats}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Full description for the details page..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-medium flex items-center justify-center shadow-lg hover:shadow-blue-500/30 mt-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publish to Home Page"}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: PREVIEW CURRENT */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Currently on Home Page
          </h2>
          
          {currentUpcoming ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 group">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img 
                  src={currentUpcoming.image || "/api/placeholder/800/600"} 
                  alt={currentUpcoming.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Star size={12} className="fill-black" /> FEATURED
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-2">
                  {currentUpcoming.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 font-light">
                  {currentUpcoming.subtitle}
                </p>

                <div className="space-y-3 border-t border-gray-100 dark:border-gray-700 pt-6">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="font-medium">{currentUpcoming.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Clock className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="font-medium">{currentUpcoming.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Users className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="font-medium">{currentUpcoming.seats} Seats Available</span>
                  </div>
                  <div className="flex items-center text-gray-900 dark:text-white font-bold text-lg mt-2">
                    <IndianRupee className="w-5 h-5 mr-3 text-green-600" />
                    {currentUpcoming.price}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
              <p>No active featured workshop found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}