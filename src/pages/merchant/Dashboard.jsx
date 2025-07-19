import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItemsByMerchant, getOrdersForMerchant } from '../../services/merchant-service';

const MerchantDashboard = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [ordersPending, setOrdersPending] = useState(0);
  const [itemsSold, setItemsSold] = useState(0);

  useEffect(() => {
    // Fetch total items
    getItemsByMerchant()
      .then(items => {
        setTotalItems(items.length);
        // Calculate total sold
        const sold = items.reduce((acc, item) => acc + (item.totalSold || 0), 0);
        setItemsSold(sold);
      })
      .catch(err => console.error("Error fetching items", err));

    // Fetch orders and calculate pending
    getOrdersForMerchant()
      .then(orders => {
        const pending = orders.filter(order => order.status === 'PENDING').length;
        setOrdersPending(pending);
      })
      .catch(err => console.error("Error fetching orders", err));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">🏪 Merchant Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/merchant/add-item" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all border border-gray-100">
          <h2 className="text-xl font-semibold text-green-600 mb-2">➕ Add New Item</h2>
          <p className="text-gray-600">Add fresh items to your product catalog.</p>
        </Link>

        <Link to="/merchant/orders" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all border border-gray-100">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">📦 View Orders</h2>
          <p className="text-gray-600">Check all customer orders placed for your items.</p>
        </Link>

        <Link to="/merchant/items" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all border border-gray-100">
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">📋 Manage Items</h2>
          <p className="text-gray-600">Update or delete items in your inventory.</p>
        </Link>
      </div>

      <div className="mt-10 bg-gray-50 border rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">📊 Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow text-center">
            <h4 className="text-lg font-medium">Total Items</h4>
            <p className="text-2xl text-green-700 font-bold">{totalItems}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <h4 className="text-lg font-medium">Orders Pending</h4>
            <p className="text-2xl text-blue-700 font-bold">{ordersPending}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <h4 className="text-lg font-medium">Items Sold</h4>
            <p className="text-2xl text-yellow-600 font-bold">{itemsSold}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
