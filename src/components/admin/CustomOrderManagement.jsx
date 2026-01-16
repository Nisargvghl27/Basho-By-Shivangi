"use client";

import { useState, useEffect } from "react";
import { 
  FileText, Check, X, IndianRupee, Loader2 
} from "lucide-react";
import { fetchAllRequests, updateRequestStatus } from "../../lib/customOrderService";

export default function CustomOrderManagement() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Action State
  const [quotePrice, setQuotePrice] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadRequests = async () => {
    setLoading(true);
    const data = await fetchAllRequests();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

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
      alert("Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Custom Order Requests</h1>

      {/* Requests List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-12 text-center"><Loader2 className="animate-spin w-8 h-8 mx-auto text-blue-500"/></div>
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
                      <div className="text-sm truncate max-w-xs">{req.description}</div>
                      {req.referenceImage && <span className="text-xs text-blue-500 flex items-center mt-1"><FileText className="w-3 h-3 mr-1"/> Has Image</span>}
                    </td>
                    <td className="px-6 py-4 text-sm">{req.budgetRange}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full uppercase font-bold ${
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        req.status === 'quoted' ? 'bg-blue-100 text-blue-800' :
                        req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {req.status}
                      </span>
                      {req.adminPrice && <div className="text-xs mt-1 font-bold">₹{req.adminPrice}</div>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedRequest(req)}
                        className="text-blue-600 hover:text-blue-900 border border-blue-200 px-3 py-1 rounded-md text-sm"
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

      {/* Management Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <h3 className="font-bold text-lg">Manage Request</h3>
              <button onClick={() => setSelectedRequest(null)}><X className="w-5 h-5"/></button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Request Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Details</h4>
                  <div className="space-y-3">
                    <p className="text-sm"><span className="font-semibold">Client:</span> {selectedRequest.userName}</p>
                    <p className="text-sm"><span className="font-semibold">Email:</span> {selectedRequest.email}</p>
                    <p className="text-sm"><span className="font-semibold">Budget:</span> {selectedRequest.budgetRange}</p>
                    <p className="text-sm"><span className="font-semibold">Description:</span></p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                      {selectedRequest.description}
                    </p>
                  </div>
                </div>
                
                {/* Reference Image */}
                <div>
                   <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Reference</h4>
                   {selectedRequest.referenceImage ? (
                     <a href={selectedRequest.referenceImage} target="_blank" rel="noreferrer" className="block relative group">
                        <img src={selectedRequest.referenceImage} alt="Ref" className="w-full h-48 object-cover rounded-lg border"/>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 bg-black/70 text-white text-xs px-2 py-1 rounded">View Full</span>
                        </div>
                     </a>
                   ) : (
                     <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                       No Image Provided
                     </div>
                   )}
                </div>
              </div>

              {/* Action Area */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Admin Action</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Set Price Quote (₹)</label>
                    <div className="relative">
                      <IndianRupee className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                      <input 
                        type="number" 
                        value={quotePrice} 
                        onChange={(e) => setQuotePrice(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border rounded-lg bg-transparent"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Internal/Response Note</label>
                    <input 
                      type="text" 
                      value={adminNote} 
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg bg-transparent"
                      placeholder="Optional notes..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <button 
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={isSubmitting}
                    className="flex items-center px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50"
                  >
                    <X className="w-4 h-4 mr-2"/> Reject
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('quoted')}
                    disabled={isSubmitting || !quotePrice}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Check className="w-4 h-4 mr-2"/>}
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