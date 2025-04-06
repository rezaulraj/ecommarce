import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";

const CustomerOrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [previousOrders, setPreviousOrders] = useState([]);
  console.log("orderId", orderId);

  useEffect(() => {
    // Fetch order details based on orderId
    const fetchOrder = async () => {
      // Simulate an API call
      const sampleOrder = {
        id: orderId,
        customer: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1234567890",
        },
        date: "2023-10-15",
        status: "Delivered",
        paymentMethod: "Credit Card",
        shippingAddress: "123 Main St, Springfield, IL, 62701, USA",
        items: [
          {
            id: 1,
            name: "Wireless Bluetooth Headphones",
            price: 99.99,
            quantity: 1,
            image:
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 2,
            name: "Smart Watch",
            price: 199.99,
            quantity: 2,
            image:
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          },
        ],
        total: 499.97,
      };
      setOrder(sampleOrder);
      setStatus(sampleOrder.status);

      // Fetch previous orders for the customer
      const samplePreviousOrders = [
        {
          id: "12344",
          date: "2023-10-10",
          status: "Delivered",
          total: 149.99,
        },
        {
          id: "12343",
          date: "2023-10-05",
          status: "Cancelled",
          total: 99.99,
        },
        {
          id: "12342",
          date: "2023-10-01",
          status: "Delivered",
          total: 199.99,
        },
      ];
      setPreviousOrders(samplePreviousOrders);
    };

    fetchOrder();
  }, [orderId]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Here you would typically make an API call to update the order status
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        className="flex items-center text-blue-500 hover:text-blue-700 mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Orders
      </button>
      <h1 className="text-2xl font-semibold mb-6">Order Details</h1>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Order ID */}
          <div className="flex items-center">
            <ShoppingCart className="w-6 h-6 text-blue-500 mr-2" />
            <div>
              <p className="text-gray-500">Order ID</p>
              <p className="text-lg font-semibold">#{order.id}</p>
            </div>
          </div>

          {/* Customer Name */}
          <div className="flex items-center">
            <User className="w-6 h-6 text-green-500 mr-2" />
            <div>
              <p className="text-gray-500">Customer</p>
              <p className="text-lg font-semibold">{order.customer.name}</p>
            </div>
          </div>

          {/* Order Date */}
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-purple-500 mr-2" />
            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="text-lg font-semibold">{order.date}</p>
            </div>
          </div>

          {/* Order Status */}
          <div className="flex items-center">
            {status === "Delivered" ? (
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500 mr-2" />
            )}
            <div>
              <p className="text-gray-500">Status</p>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="text-lg font-semibold bg-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="text-lg font-semibold">{order.customer.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="text-lg font-semibold">{order.customer.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="text-lg font-semibold">{order.customer.phone}</p>
          </div>
          <div>
            <p className="text-gray-500">Shipping Address</p>
            <p className="text-lg font-semibold">{order.shippingAddress}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border-b border-gray-200"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment and Total */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Payment Method</p>
            <p className="text-lg font-semibold">{order.paymentMethod}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Previous Orders */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Previous Orders</h2>
        <div className="space-y-4">
          {previousOrders.length > 0 ? (
            previousOrders.map((prevOrder) => (
              <div
                key={prevOrder.id}
                className="flex items-center justify-between p-4 border-b border-gray-200"
              >
                <div className="flex items-center">
                  <ShoppingCart className="w-5 h-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-lg font-semibold">#{prevOrder.id}</p>
                    <p className="text-sm text-gray-500">{prevOrder.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {prevOrder.status === "Delivered" ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <p className="text-sm">{prevOrder.status}</p>
                </div>
                <p className="text-lg font-semibold">
                  ${prevOrder.total.toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No previous orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderPage;
