import React, { useEffect, useState } from 'react';
import { getAllMerchantItems } from '../../services/merchant-service'; // adjust path as needed

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMerchantItems()
      .then((items) => {
        // Simulate each item having 1 or more "orders"
        const mappedOrders = items.flatMap((item, index) => ({
          id: item.id || index + 1,
          itemName: item.name,
          quantity: item.quantity,
          buyer: item.bookedBy || 'Unknown Farmer',
          status: item.status || 'Pending',
          date: item.createdAt?.substring(0, 10) || '2025-07-16',
        }));
        setOrders(mappedOrders);
      })
      .catch((err) => {
        console.error('Error loading orders:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleMarkDelivered = (orderId) => {
    // You can create an API call to update status here
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'Delivered' } : order
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">📦 Orders Management</h1>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Item</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Buyer</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.itemName}</td>
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">{order.buyer}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                      disabled={order.status === 'Delivered'}
                      onClick={() => handleMarkDelivered(order.id)}
                    >
                      Mark Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
