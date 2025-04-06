import React from "react";
import {
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  Calendar,
  Activity,
} from "lucide-react";

const Dashboard = () => {
    console.log("hele dash")
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <Package className="w-6 h-6 text-blue-500" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500">Total Products</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-green-100 rounded-full">
            <Users className="w-6 h-6 text-green-500" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500">Total Customers</p>
            <p className="text-2xl font-bold">567</p>
          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-purple-100 rounded-full">
            <ShoppingCart className="w-6 h-6 text-purple-500" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500">Total Sales</p>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
        </div>

        {/* Total Income */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="p-3 bg-yellow-100 rounded-full">
            <DollarSign className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="ml-4">
            <p className="text-gray-500">Total Income</p>
            <p className="text-2xl font-bold">$45,678</p>
          </div>
        </div>
      </div>

      {/* Charts and Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <Activity className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calendar</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Order ID</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">#12345</td>
                <td className="py-2">John Doe</td>
                <td className="py-2">2023-10-01</td>
                <td className="py-2">$120</td>
                <td className="py-2">
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2">#12346</td>
                <td className="py-2">Jane Smith</td>
                <td className="py-2">2023-10-02</td>
                <td className="py-2">$80</td>
                <td className="py-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2">#12347</td>
                <td className="py-2">Alice Johnson</td>
                <td className="py-2">2023-10-03</td>
                <td className="py-2">$200</td>
                <td className="py-2">
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                    Cancelled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
