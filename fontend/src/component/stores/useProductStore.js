import { create } from "zustand";

import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  categorys: [],
  loading: false,

  //   create new product
  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: false });
    try {
      const res = await axiosInstance.post("/products", productData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      });

      const data = res.data;
      if (res.status === 200 || res.status === 201) {
        set((prevState) => ({
          products: [...prevState.products, data],
          loading: false,
        }));
        toast.success("Product created successfully!");
      } else {
        throw new Error(data.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating category:", error);

      // Handle different types of errors
      if (error.response) {
        toast.error(error.response.data.error || "Failed to create product.");
      } else if (error.request) {
        toast.error("No response from the server. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/products");
      set({ products: response?.data?.productList, loading: false });
      console.log("response?.data", response?.data?.productList);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch AllProducts",
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {},

  toggleFeaturedProduct: async (id) => {},

  //  =================== Create A New Category ===========================
  setCategory: (categorys) => set({ categorys }),

  createCategorys: async (categoryData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post(
        "/categorys/postCategory",
        categoryData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct content type
          },
        }
      );
      const data = res.data;

      if (res.status === 200 || res.status === 201) {
        set((prevState) => ({
          categorys: [...prevState.categorys, data],
          loading: false,
        }));
        toast.success("Category created successfully!");
      } else {
        throw new Error(data.message || "Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);

      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error(error.response.data.error || "Failed to create category.");
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from the server. Please try again.");
      } else {
        // Something happened in setting up the request
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      set({ loading: false });
    }
  },

  fetchCategory: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/categorys");
      set({ categorys: response?.data });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch Category",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
