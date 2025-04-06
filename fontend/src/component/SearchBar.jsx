import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

const SearchBar = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full fixed inset-0 z-[88889] bg-transparent bg-opacity-20 backdrop-blur-sm flex items-start justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[999] p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
        aria-label="Close"
      >
        <X className="text-red-600 w-6 h-6" />
      </button>

      {/* Search Input Container */}
      <div className="w-[90%] md:w-[60%] lg:w-[50%] bg-white rounded-lg shadow-lg z-[999] mt-12 px-6 py-4">
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-700"
          placeholder="Search for products, brands, or categories..."
        />

        {/* Skeleton Loading Effect */}
        {isLoading && (
          <div className="mt-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/4 animate-pulse"></div>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && (
          <div className="mt-4">
            <p className="text-gray-700">Search results will appear here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
