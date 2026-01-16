"use client";

import { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { 
  Search, Download, Eye, Ban, Unlock, 
  User, AlertTriangle, Trash2, Edit, Check 
} from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination settings
  const usersPerPage = 10;

  // 🔥 1. READ: Fetch Users & Listen for Real-time Updates
  useEffect(() => {
    const usersRef = collection(db, "users");
    // Sort by Last Login to see recent activity first
    const q = query(usersRef, orderBy("lastLogin", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => {
        const data = doc.data();
        
        // Helper to format timestamps
        const formatDate = (timestamp) => {
          if (!timestamp) return "Never";
          // Handle Firestore Timestamp or JS Date
          const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
          return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };

        return {
          id: doc.id,
          name: data.name || "Unknown",
          email: data.email || "No Email",
          role: data.role || "Customer",
          status: data.status || "Active",
          joinDate: formatDate(data.joinDate),
          lastLogin: formatDate(data.lastLogin), // 🔥 Capture Last Login
          totalOrders: data.totalOrders || 0,
          totalSpent: data.totalSpent || 0,
          addresses: data.addresses || []
        };
      });
      
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter Logic
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = user.name.toLowerCase().includes(searchLower) ||
                         user.email.toLowerCase().includes(searchLower);
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // 🔥 2. UPDATE: Toggle Block/Active Status
  const toggleUserStatus = async (user) => {
    const newStatus = user.status === 'Active' ? 'Blocked' : 'Active';
    try {
      await updateDoc(doc(db, "users", user.id), { status: newStatus });
    } catch (error) {
      alert("Failed to update status: " + error.message);
    }
  };

  // 🔥 3. UPDATE: Change User Role
  const updateUserRole = async (userId, newRole) => {
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole });
      // Update local state for immediate UI feedback if modal is open
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
    } catch (error) {
      alert("Failed to update role: " + error.message);
    }
  };

  // 🔥 4. DELETE: Remove User from Firestore
  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setShowUserDetails(false);
      } catch (error) {
        alert("Failed to delete user: " + error.message);
      }
    }
  };

  // User Details Modal
  const UserDetailsModal = ({ user, onClose }) => {
    if (!user) return null;
    const [isEditingRole, setIsEditingRole] = useState(false);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">User Details</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 text-center border border-gray-100 dark:border-gray-600">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{user.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{user.email}</p>
                
                <div className="space-y-4 text-left">
                  {/* Role Editor */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Role:</span>
                    {isEditingRole ? (
                      <div className="flex items-center gap-2">
                        <select 
                          defaultValue={user.role}
                          onChange={(e) => updateUserRole(user.id, e.target.value)}
                          className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-2 py-1 text-xs"
                        >
                          <option value="Customer">Customer</option>
                          <option value="Admin">Admin</option>
                        </select>
                        <button onClick={() => setIsEditingRole(false)} className="text-green-600">
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{user.role}</span>
                        <button onClick={() => setIsEditingRole(true)} className="text-gray-400 hover:text-blue-500">
                          <Edit className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Last Login:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-xs">{user.lastLogin}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => toggleUserStatus(user)}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      user.status === 'Active'
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {user.status === 'Active' ? (
                      <><Ban className="w-4 h-4 mr-2" /> Block User</>
                    ) : (
                      <><Unlock className="w-4 h-4 mr-2" /> Unblock User</>
                    )}
                  </button>

                  <button
                    onClick={() => deleteUser(user.id)}
                    className="w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                 <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Spent</div>
                    <div className="text-xl font-bold dark:text-gray-100">${user.totalSpent}</div>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Orders</div>
                    <div className="text-xl font-bold dark:text-gray-100">{user.totalOrders}</div>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Joined</div>
                    <div className="text-sm font-bold dark:text-gray-100 truncate">{user.joinDate}</div>
                 </div>
              </div>

              {/* Addresses Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" /> User Information
                </h4>
                <div className="space-y-4">
                   <div>
                      <label className="text-xs text-gray-500 uppercase">Phone Number</label>
                      <p className="text-gray-900 dark:text-gray-100">{user.phone || "N/A"}</p>
                   </div>
                   
                   <div>
                      <label className="text-xs text-gray-500 uppercase mb-2 block">Saved Addresses</label>
                      {user.addresses && user.addresses.length > 0 ? (
                        <div className="grid gap-3">
                          {user.addresses.map((addr, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-sm border border-gray-100 dark:border-gray-600">
                              <p className="font-medium text-gray-900 dark:text-gray-100">{addr.type || "Home"}</p>
                              <p className="text-gray-600 dark:text-gray-400">{addr.street}, {addr.city}</p>
                              <p className="text-gray-600 dark:text-gray-400">{addr.state} {addr.zip}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No addresses saved.</p>
                      )}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage user access and details</p>
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {currentUsers.length > 0 ? currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3 text-gray-500">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className={`px-2 py-1 rounded text-xs border ${user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => { setSelectedUser(user); setShowUserDetails(true); }}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-8 h-8 mb-2 opacity-20" />
                      <p>No users found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
             <button 
               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
               disabled={currentPage === 1}
               className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               Previous
             </button>
             <span className="text-sm text-gray-600 dark:text-gray-300">Page {currentPage} of {totalPages || 1}</span>
             <button 
               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
               disabled={currentPage === totalPages || totalPages === 0}
               className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               Next
             </button>
        </div>
      </div>

      {showUserDetails && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => {
            setShowUserDetails(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}