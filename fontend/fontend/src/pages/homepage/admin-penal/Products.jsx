import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../../component/stores/useProductStore";

const Products = () => {
  const navigate = useNavigate();
  const { products, deleteProduct, toggleFeaturedProduct } = useProductStore();
  // Sample product data
  const [product, setProduct] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Product 1",
      description: "This is a sample product description.",
      price: 29.99,
      colors: ["Red", "Blue", "Green"],
      sizes: ["S", "M", "L"],
      isFeatured: false,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Product 2",
      description: "This is another sample product description.",
      price: 49.99,
      colors: ["Black", "White"],
      sizes: ["M", "L", "XL"],
      isFeatured: true,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      title: "Product 3",
      description: "This is yet another sample product description.",
      price: 99.99,
      colors: ["Yellow", "Purple"],
      sizes: ["S", "L"],
      isFeatured: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [featuredQuery, setFeaturedQuery] = useState("all"); // Default to "all"

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle featured status filter change
  const handleFeaturedFilter = (e) => {
    setFeaturedQuery(e.target.value);
  };

  // Filter products based on search query and featured status
  const filteredProducts = product.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFeatured =
      featuredQuery === "all" ||
      (featuredQuery === "true" && product.isFeatured) ||
      (featuredQuery === "false" && !product.isFeatured);

    return matchesSearch && matchesFeatured;
  });

  // Handle delete product
  const handleDeleteProduct = (id) => {
    setProduct(product.filter((product) => product.id !== id));
  };

  // Handle edit product (navigate to create product page)
  const handleEditProduct = (product) => {
    navigate(`/create-product`, { state: { product } });
  };

  // Toggle featured status
  const toggleFeatured = (id) => {
    setProduct(
      product.map((product) =>
        product.id === id
          ? { ...product, isFeatured: !product.isFeatured }
          : product
      )
    );
  };
  console.log("products", products);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">All Products</h1>

        {/* Search Bar and Featured Filter */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-10/12 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={featuredQuery}
            onChange={handleFeaturedFilter}
            className="w-2/12 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="true">Featured</option>
            <option value="false">Not Featured</option>
          </select>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Colors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sizes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products &&
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product?.image ? product?.image[0] : ""}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate">
                      {product.title.length > 20
                        ? product.title.substring(0, 20) + "..."
                        : product.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {product.color.map((color, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {product.size.map((size, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => toggleFeatured(product.id)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold ${
                          product.isFeatured
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.isFeatured ? "Featured" : "Not Featured"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
