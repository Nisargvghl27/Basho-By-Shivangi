"use client";

import { useState, useEffect } from "react";
// 🔥 Firebase Imports
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase"; 

import { 
  Search, 
  Download, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText,
  Calendar,
  DollarSign,
  User,
  CreditCard,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const ordersPerPage = 10;

  // ==========================================
  // 🔥 1. FETCH REAL ORDERS FROM FIREBASE
  // ==========================================
  useEffect(() => {
    //
    const ordersRef = collection(db, "orders");
    // Sort by creation time (newest first)
    const q = query(ordersRef, orderBy("createdAt", "desc"));

    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => {
        const data = doc.data();
        
        // Format Timestamp to readable date
        const dateObj = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          year: 'numeric', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });

        const itemsList = Array.isArray(data.items) ? data.items : [];
        const calculatedSubtotal = itemsList.reduce((sum, item) => sum + (parseFloat(item.price || 0) * parseInt(item.quantity || 1, 10)), 0);
        const subtotalVal = data.subtotal !== undefined ? data.subtotal : calculatedSubtotal;
        const shippingCostVal = data.shippingCost !== undefined ? data.shippingCost : (data.shipping_cost !== undefined ? data.shipping_cost : 0);
        const taxVal = data.tax !== undefined ? data.tax : (data.subtotal !== undefined ? (data.tax || 0) : calculatedSubtotal * 0.18);

        // Map Firestore data to UI structure
        return {
          id: doc.id,
          rawOrderId: data.razorpayOrderId || "N/A",
          customer: {
            name: `${data.shipping?.firstName || "Guest"} ${data.shipping?.lastName || ""}`.trim(),
            email: data.shipping?.email || "No Email",
            phone: data.shipping?.phone || "No Phone",
          },
          items: itemsList,
          // Default to Razorpay/Online if not specified
          paymentMethod: data.paymentMethod || "Razorpay/Online", 
          totalAmount: data.total || 0,
          subtotal: subtotalVal,
          shippingCost: shippingCostVal,
          tax: taxVal,
          orderDate: formattedDate,
          // Map Firestore 'status' (lowercase) to UI 'deliveryStatus' (Capitalized)
          deliveryStatus: data.status ? (data.status.charAt(0).toUpperCase() + data.status.slice(1)) : "Pending", 
          shippingAddress: data.shipping 
            ? [data.shipping.address, data.shipping.city, data.shipping.postalCode].filter(Boolean).join(", ") || "No Address Provided"
            : "No Address Provided",
          trackingNumber: data.trackingNumber || "",
          notes: data.notes || "",
        };
      });

      setOrders(ordersData);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // ==========================================
  // 🔥 2. FILTERING LOGIC
  // ==========================================
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Normalize status for comparison
    const currentStatus = order.deliveryStatus.toLowerCase();
    const filterStatus = selectedStatus.toLowerCase();
    
    const matchesStatus = selectedStatus === "all" || currentStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleExportCSV = () => {
    try {
      if (orders.length === 0) {
        alert("No data available to export.");
        return;
      }

      const headers = [
        "Order ID",
        "Customer Name",
        "Customer Email",
        "Customer Phone",
        "Items Purchased",
        "Total Amount (₹)",
        "Payment Method",
        "Order Date",
        "Delivery Status",
        "Shipping Address"
      ];

      const rows = orders.map(order => {
        const itemsList = (Array.isArray(order.items) ? order.items : [])
          .map(item => {
            if (!item) return 'Unknown Item';
            const name = item.name || item.title || 'Unknown Item';
            const qty = item.quantity !== undefined ? item.quantity : 1;
            return `${name} (x${qty})`;
          })
          .join("; ");

        return [
          order.id || '',
          order.customer?.name || 'Guest',
          order.customer?.email || 'No Email',
          order.customer?.phone || 'No Phone',
          itemsList,
          order.totalAmount || 0,
          order.paymentMethod || 'Razorpay/Online',
          order.orderDate || '',
          order.deliveryStatus || 'Pending',
          order.shippingAddress || 'No Address Provided'
        ];
      });

      const csvContent = [
        headers.join(","),
        ...rows.map(row => 
          row.map(value => {
            const valString = String(value ?? "");
            if (valString.includes(",") || valString.includes('"') || valString.includes("\n")) {
              return `"${valString.replace(/"/g, '""')}"`;
            }
            return valString;
          }).join(",")
        )
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `orders_report_${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export orders: " + error.message);
    }
  };

  // ==========================================
  // 🔥 3. UPDATE STATUS IN FIREBASE
  // ==========================================
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      // Save as lowercase to match other logic
      await updateDoc(orderRef, {
        status: newStatus.toLowerCase()
      });
      // Update local state for immediate feedback (though snapshot will also catch it)
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, deliveryStatus: newStatus }));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'completed': 
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'completed':
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  // (OrderDetailsModal has been moved outside of render body to the bottom of the file)

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Order Management</h1>
        <button 
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders by ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{order.customer.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{order.customer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      ₹{order.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {order.orderDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(order.deliveryStatus)}`}>
                          {getStatusIcon(order.deliveryStatus)}
                          <span className="ml-1">{order.deliveryStatus}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{filteredOrders.length > 0 ? indexOfFirstOrder + 1 : 0}</span> to{' '}
                <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of{' '}
                <span className="font-medium">{filteredOrders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {/* Simplified pagination dots for brevity in UI, but functional */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setShowOrderDetails(false);
            setSelectedOrder(null);
          }}
          updateOrderStatus={updateOrderStatus}
        />
      )}
    </div>
  );
}

// ==========================================
// 🔥 4. MODAL COMPONENT (Declared outside of render)
// ==========================================
const OrderDetailsModal = ({ order, onClose, updateOrderStatus }) => {
  if (!order) return null;

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div id="printable-invoice" className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Order Details</h3>
            <p className="text-sm text-gray-500">ID: {order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 no-print"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Customer Information</h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{order.customer?.name || "Guest"}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{order.customer?.email || "No Email"}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{order.customer?.phone || "No Phone"}</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Shipping Address</h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-700 dark:text-gray-300">{order.shippingAddress}</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Payment Information</h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">₹{order.totalAmount}</span>
                </div>
                <div className="text-xs text-gray-500 break-all mt-1">Ref: {order.rawOrderId}</div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Order Information</h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Date: {order.orderDate}</span>
                </div>
                <div className="flex items-center">
                  <Package className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Status: {order.deliveryStatus}</span>
                </div>
                {order.notes && (typeof order.notes === 'string' ? order.notes.trim() : (order.notes.customerNote || order.notes.note || order.notes.message || '')) && (
                   <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 border-t border-gray-600 pt-2">
                     Notes: {typeof order.notes === 'object' 
                       ? (order.notes.customerNote || order.notes.note || order.notes.message) 
                       : order.notes}
                   </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Items</h4>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-60 overflow-y-auto">
                {(order.items || []).map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
                    <div>
                      {/* Handle both title or name property depending on cart structure */}
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title || item.name || "Unknown Item"}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </div>
                  </div>
                ))}
                
                <div className="space-y-1.5 pt-3 mt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-gray-100">₹{(order.subtotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                    <span className="text-gray-900 dark:text-gray-100">₹{(order.shippingCost || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Tax (18% GST)</span>
                    <span className="text-gray-900 dark:text-gray-100">₹{(order.tax || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Total</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 no-print">
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Update Status:</label>
            <select
              value={order.deliveryStatus}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={printInvoice}
              className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <FileText className="w-4 h-4 mr-2" />
              Print Invoice
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};