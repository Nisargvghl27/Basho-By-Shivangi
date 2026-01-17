"use client";

import { useState, useEffect } from "react";
import { 
  Building2, Mail, Phone, Calendar, CheckCircle, MessageSquare 
} from "lucide-react";
import { fetchCorporateInquiries, updateCorporateStatus } from "../../lib/corporateService";
import LottieLoader from "../LottieLoader"; // <--- Import New Loader

export default function CorporateInquiryManagement() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchCorporateInquiries();
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatus = async (id, newStatus) => {
    setInquiries(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    
    try {
      await updateCorporateStatus(id, newStatus);
    } catch (error) {
      console.error("Failed to update status");
      loadData();
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96">
      {/* --- USED NEW LOADER HERE --- */}
      <LottieLoader className="w-32 h-32" text="Loading Inquiries..." />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Corporate Inquiries</h1>
        <div className="text-sm text-gray-500">Total: {inquiries.length}</div>
      </div>

      <div className="grid gap-4">
        {inquiries.length === 0 ? (
          <div className="p-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
            No corporate inquiries received yet.
          </div>
        ) : (
          inquiries.map((inq) => (
            <div key={inq.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col lg:flex-row gap-6 justify-between transition-all hover:shadow-md">
              
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{inq.companyName}</h3>
                  <span className={`px-2.5 py-0.5 text-xs rounded-full uppercase font-bold tracking-wider border ${
                    inq.status === 'new' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                    inq.status === 'contacted' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                    'bg-green-50 text-green-700 border-green-100'
                  }`}>
                    {inq.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {inq.createdAt?.seconds ? new Date(inq.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-600 dark:text-gray-300">
                  <p className="flex items-center gap-2"><Building2 size={14} className="text-gray-400"/> {inq.contactPerson}</p>
                  <p className="flex items-center gap-2"><Mail size={14} className="text-gray-400"/> {inq.email}</p>
                  <p className="flex items-center gap-2"><Phone size={14} className="text-gray-400"/> {inq.phone}</p>
                  <p className="flex items-center gap-2"><Calendar size={14} className="text-gray-400"/> Type: <span className="capitalize font-medium">{inq.inquiryType}</span></p>
                </div>

                <div className="mt-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300 italic border border-gray-100 dark:border-gray-700 relative">
                  <MessageSquare size={16} className="absolute top-3 right-3 text-gray-300"/>
                  "{inq.message}"
                </div>
                
                <div className="flex gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide pt-1">
                  <span>Team Size: {inq.teamSize || 'N/A'}</span>
                  <span className="w-px h-4 bg-gray-300"></span>
                  <span>Budget: {inq.budget || 'N/A'}</span>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col gap-3 justify-center lg:border-l border-gray-100 dark:border-gray-700 pt-4 lg:pt-0 lg:pl-6 min-w-[180px]">
                {inq.status !== 'contacted' && inq.status !== 'closed' && (
                  <button 
                    onClick={() => handleStatus(inq.id, 'contacted')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Mail size={14} /> Mark Contacted
                  </button>
                )}
                
                {inq.status !== 'closed' && (
                  <button 
                    onClick={() => handleStatus(inq.id, 'closed')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 border border-green-200 hover:bg-green-100 text-green-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    <CheckCircle size={14} /> Close Inquiry
                  </button>
                )}

                {inq.status === 'closed' && (
                   <div className="text-center text-sm text-green-600 font-medium flex items-center justify-center gap-2 py-2">
                      <CheckCircle size={16}/> Resolved
                   </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}