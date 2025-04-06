import {
  ChartLine,
  ClipboardPlus,
  Cog,
  Home,
  Package,
  PackagePlus,
  ShoppingCart,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// Sidebar links data
const sidebarLinks = [
  {
    path: "/admin/dashboard", // Correct path
    icon: <Home className="w-5 h-5 mr-2" />,
    label: "Dashboard",
    role: "admin",
  },
  {
    path: "/admin/orders", // Correct path
    icon: <ShoppingCart className="w-5 h-5 mr-2" />,
    label: "Orders",
    role: "admin",
  },
  {
    path: "/admin/customer", // Correct path
    icon: <User className="w-5 h-5 mr-2" />,
    label: "Customer",
    role: "admin",
  },
  {
    path: "/admin/analytics", // Correct path
    icon: <ChartLine className="w-5 h-5 mr-2" />,
    label: "Analytics",
    role: "admin",
  },
  {
    path: "/admin/products", // Correct path
    icon: <Package className="w-5 h-5 mr-2" />,
    label: "Products",
    role: "admin",
  },
  {
    path: "/admin/product", // Correct path
    icon: <PackagePlus className="w-5 h-5 mr-2" />,
    label: "Add Product",
    role: "admin",
  },
  {
    path: "/admin/category", // Correct path
    icon: <ClipboardPlus className="w-5 h-5 mr-2" />,
    label: "Category",
    role: "admin",
  },
  {
    path: "/admin/settings", // Correct path
    icon: <Cog className="w-5 h-5 mr-2" />,
    label: "Settings",
    role: "admin",
  },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar, userRole }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white w-64 px-4 py-2 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <button onClick={toggleSidebar} className="lg:hidden cursor-pointer">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <nav>
        <ul>
          {sidebarLinks.map((link) => {
            if (link.role === userRole) {
              return (
                <li key={link.path} className="mb-4">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-200 ${
                        isActive ? "bg-blue-100 text-blue-900" : ""
                      }`
                    }
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
