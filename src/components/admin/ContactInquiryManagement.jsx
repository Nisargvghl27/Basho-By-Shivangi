"use client";

import React, { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  updateDoc 
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { 
  Trash2, 
  Search, 
  Mail, 
  MessageSquare,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff
} from "lucide-react";

export default function ContactInquiryManagement() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null); // For viewing details modal

  useEffect(() => {
    // Listen to contact_inquiries collection in real-time
    const q = query(collection(db, "contact_inquiries"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const inquiriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Handle timestamp safely
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      setInquiries(inquiriesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteDoc(doc(db, "contact_inquiries", id));
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  const handleToggleStatus = async (inquiry, e) => {
    e.stopPropagation();
    const newStatus = inquiry.status === "unread" ? "read" : "unread";
    try {
      await updateDoc(doc(db, "contact_inquiries", inquiry.id), {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredInquiries = inquiries.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white mb-2">Contact Inquiries</h2>
          <p className="text-stone-400 text-sm">Manage messages from the contact form</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-charcoal-light border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-clay"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-stone-500">Loading inquiries...</div>
      ) : (
        <div className="bg-charcoal-light border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-4 text-xs font-medium text-stone-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-medium text-stone-400 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-medium text-stone-400 uppercase tracking-wider">Sender</th>
                  <th className="p-4 text-xs font-medium text-stone-400 uppercase tracking-wider">Subject</th>
                  <th className="p-4 text-xs font-medium text-stone-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-stone-500">
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <tr 
                      key={inquiry.id} 
                      className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                          inquiry.status === 'unread' 
                            ? 'bg-clay/10 text-clay border-clay/20' 
                            : 'bg-green-500/10 text-green-400 border-green-500/20'
                        }`}>
                          {inquiry.status === 'unread' ? <Clock size={10} /> : <CheckCircle2 size={10} />}
                          {inquiry.status === 'unread' ? 'Unread' : 'Read'}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-stone-400 whitespace-nowrap">
                        {inquiry.createdAt.toLocaleDateString()} <span className="text-stone-600 text-xs">{inquiry.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-white font-medium">{inquiry.name}</span>
                          <span className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                            <Mail size={10} /> {inquiry.email}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-stone-300 block truncate max-w-[200px]">{inquiry.subject}</span>
                        <span className="text-xs text-stone-500 block truncate max-w-[200px] mt-0.5">{inquiry.message}</span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleToggleStatus(inquiry, e)}
                            className="p-2 hover:bg-white/5 rounded-lg text-stone-400 hover:text-white transition-colors"
                            title={inquiry.status === 'unread' ? "Mark as Read" : "Mark as Unread"}
                          >
                            {inquiry.status === 'unread' ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <button
                            onClick={(e) => handleDelete(inquiry.id, e)}
                            className="p-2 hover:bg-red-500/10 rounded-lg text-stone-400 hover:text-red-400 transition-colors"
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
      )}

      {/* Message Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm">
          <div className="bg-charcoal border border-white/10 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/5 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-serif text-white mb-1">{selectedInquiry.subject}</h3>
                <div className="flex items-center gap-3 text-sm text-stone-400">
                  <span className="flex items-center gap-1"><Mail size={14} /> {selectedInquiry.email}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-600"></span>
                  <span>{selectedInquiry.createdAt.toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="p-2 hover:bg-white/5 rounded-lg text-stone-500 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8">
              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-6">
                <p className="text-stone-300 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                 <a 
                   href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`}
                   className="px-4 py-2 bg-clay text-charcoal font-bold text-xs uppercase tracking-wider rounded hover:bg-white transition-colors flex items-center gap-2"
                 >
                   <Mail size={14} /> Reply via Email
                 </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}