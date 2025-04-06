import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Truck,
  CreditCard,
} from "lucide-react";

const OrderPage = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: "12345",
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
      date: "2023-10-15",
      status: "Delivered",
      total: 199.99,
    },
    {
      id: "12346",
      customer: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
      },
      date: "2023-10-14",
      status: "Shipped",
      total: 299.99,
    },
    {
      id: "12347",
      customer: {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
      date: "2023-10-13",
      status: "Pending",
      total: 99.99,
    },
    {
      id: "12348",
      customer: {
        name: "Bob Brown",
        email: "bob.brown@example.com",
      },
      date: "2023-10-12",
      status: "Cancelled",
      total: 149.99,
    },
  ];

  const handleRowClick = (orderId) => {
    navigate(`/admin/customer/${orderId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">All Orders</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => handleRowClick(order.id)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <ShoppingCart className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">#{order.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium">
                        {order.customer.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.customer.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-purple-500 mr-2" />
                    <span className="text-sm">{order.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {order.status === "Delivered" ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    ) : order.status === "Shipped" ? (
                      <Truck className="w-5 h-5 text-blue-500 mr-2" />
                    ) : order.status === "Pending" ? (
                      <XCircle className="w-5 h-5 text-yellow-500 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    <span className="text-sm">{order.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-indigo-500 mr-2" />
                    <span className="text-sm">${order.total.toFixed(2)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-sm text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(order.id);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
