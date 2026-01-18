"use client";

import { useState, useEffect } from "react";
import { 
  FileText, Check, X, IndianRupee, AlertCircle 
} from "lucide-react";
import { fetchAllRequests, updateRequestStatus } from "../../lib/customOrderService";
import { auth } from "../../lib/firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import LottieLoader from "../LottieLoader";

export default function CustomOrderManagement() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [user, setUser] = useState(null);
  
  const [quotePrice, setQuotePrice] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadRequests();
      } else {
        setLoading(false);
        setError("You must be logged in to view requests.");
      }
    });
    return () => unsubscribe();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllRequests();
      setRequests(data);
    } catch (err) {
      console.error("Load Error:", err);
      setError("Failed to load data. Check console for permissions error.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    if (!selectedRequest) return;
    setIsSubmitting(true);
    try {
      await updateRequestStatus(selectedRequest.id, {
        status,
        adminPrice: status === 'quoted' ? Number(quotePrice) : selectedRequest.adminPrice,
        adminNote: adminNote
      });
      await loadRequests();
      setSelectedRequest(null);
      setQuotePrice("");
      setAdminNote("");
    } catch (error) {
      console.error(error);
      alert("Update failed. Check if you have Admin permissions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        {/* --- USED NEW LOADER HERE --- */}
        <LottieLoader className="w-32 h-32" text="Loading Requests..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700 flex flex-col items-center gap-3">
        <AlertCircle className="w-10 h-10"/>
        <h3 className="font-bold text-lg">Access Denied / Error</h3>
        <p>{error}</p>
        {!user && (
            <a href="/auth/login" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Log In as Admin
            </a>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Custom Order Requests</h1>
        <button onClick={loadRequests} className="text-sm text-blue-500 hover:underline">Refresh</button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No custom requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium">{req.userName}</div>
                      <div className="text-xs text-gray-500">{req.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm truncate max-w-xs text-gray-700 dark:text-gray-300">{req.description}</div>
                      {req.referenceImage && <span className="text-xs text-blue-500 flex items-center mt-1"><FileText className="w-3 h-3 mr-1"/> Has Image</span>}
                    </td>
                    <td className="px-6 py-4 text-sm">${req.budgetRange}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full uppercase font-bold ${
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        req.status === 'quoted' ? 'bg-blue-100 text-blue-800' :
                        req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {req.status}
                      </span>
                      {req.adminPrice && <div className="text-xs mt-1 font-bold">Price: ₹{req.adminPrice}</div>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedRequest(req)}
                        className="text-blue-600 hover:text-blue-900 border border-blue-200 px-3 py-1 rounded-md text-sm hover:bg-blue-50"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <h3 className="font-bold text-lg">Manage Request</h3>
              <button onClick={() => setSelectedRequest(null)} className="hover:bg-gray-200 p-1 rounded"><X className="w-5 h-5"/></button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Details</h4>
                  <div className="space-y-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm">
                    <p><span className="font-semibold text-gray-600">Client:</span> {selectedRequest.userName}</p>
                    <p><span className="font-semibold text-gray-600">Email:</span> {selectedRequest.email}</p>
                    <p><span className="font-semibold text-gray-600">Budget:</span> ${selectedRequest.budgetRange}</p>
                    <div className="pt-2 border-t mt-2">
                        <span className="font-semibold text-gray-600 block mb-1">Description:</span>
                        <p className="text-gray-700 dark:text-gray-300 italic">"{selectedRequest.description}"</p>
                    </div>
                  </div>
                </div>
                
                <div>
                   <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Reference</h4>
                   {selectedRequest.referenceImage ? (
                     <a href={selectedRequest.referenceImage} target="_blank" rel="noreferrer" className="block relative group overflow-hidden rounded-lg border border-gray-200">
                        <img src={selectedRequest.referenceImage} alt="Ref" className="w-full h-48 object-cover"/>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 bg-white text-black text-xs px-3 py-1 rounded font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">View Full Image</span>
                        </div>
                     </a>
                   ) : (
                     <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                       <FileText className="w-8 h-8 mb-2 opacity-50"/>
                       <span className="text-xs">No Image Provided</span>
                     </div>
                   )}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Admin Action</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Set Price Quote (₹)</label>
                    <div className="relative">
                      <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                      <input 
                        type="number" 
                        value={quotePrice} 
                        onChange={(e) => setQuotePrice(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Internal/Response Note</label>
                    <input 
                      type="text" 
                      value={adminNote} 
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Optional notes for the client..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <button 
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={isSubmitting}
                    className="flex items-center px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2"/> Reject
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('quoted')}
                    disabled={isSubmitting || !quotePrice}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
                  >
                    {isSubmitting ? <LottieLoader className="w-6 h-6"/> : <Check className="w-4 h-4 mr-2"/>}
                    Approve & Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}