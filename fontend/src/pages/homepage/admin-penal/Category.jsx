import React, { useEffect, useState } from "react";
import { useProductStore } from "../../../component/stores/useProductStore";
import { Loader, PlusCircle, Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const Category = () => {
  const {
    categorys,
    createCategorys,
    updateCategory,
    deleteCategory,
    loading,
  } = useProductStore();
  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: null,
    color: "#1E2939",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Set image preview when selectedCategory changes
  useEffect(() => {
    if (selectedCategory?.icon) {
      if (typeof selectedCategory.icon === "string") {
        // If the icon is a URL (existing image)
        setImagePreview(selectedCategory.icon);
      } else if (selectedCategory.icon instanceof File) {
        // If the icon is a File object (newly uploaded image)
        setImagePreview(URL.createObjectURL(selectedCategory.icon));
      }
    }
  }, [selectedCategory]);

  // Reset image preview when modal closes
  useEffect(() => {
    if (!activeUpdate) {
      setImagePreview(null);
    }
  }, [activeUpdate]);

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategory({ ...newCategory, icon: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission for creating a new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newCategory.name || !newCategory.icon) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("icon", newCategory.icon);
    formData.append("color", newCategory.color);

    try {
      await createCategorys(formData);
      setNewCategory({ name: "", icon: null, color: "#1E2939" });
      setImagePreview(null);
      toast.success("Category created successfully!");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category.");
    }
  };

  // Handle form submission for updating a category
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory.name || !selectedCategory.icon) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", selectedCategory.name);
    formData.append("icon", selectedCategory.icon);
    formData.append("color", selectedCategory.color);

    try {
      await updateCategory(selectedCategory.id, formData);
      setActiveUpdate(false);
      setImagePreview(null); // Reset image preview
      toast.success("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category.");
    }
  };

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      await deleteCategory(categoryToDelete);
      setConfirmDelete(false);
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Categories</h1>

      {/* Add Category Form */}
      <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Image
            </label>
            <input
              required
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="px-1 h-8 mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) =>
                setNewCategory({ ...newCategory, color: e.target.value })
              }
              className="mt-1 block w-16 h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Creating Category...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <PlusCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                Create Category
              </div>
            )}
          </button>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categorys.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-x-3">
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setActiveUpdate(true);
                    }}
                    className="bg-blue-400 text-gray-100 py-2 px-3 rounded-md shadow-md hover:bg-blue-500 text-sm font-bold hover:scale-105 cursor-pointer"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setCategoryToDelete(category.id);
                      setConfirmDelete(true);
                    }}
                    className="bg-red-400 text-gray-100 py-2 px-3 rounded-md shadow-md hover:bg-red-500 text-sm font-bold hover:scale-105 cursor-pointer"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Category Modal */}
      <Modal
        isOpen={activeUpdate}
        onRequestClose={() => setActiveUpdate(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-semibold mb-4">Update Category</h2>
        <form onSubmit={handleUpdateSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              value={selectedCategory?.name || ""}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  name: e.target.value,
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedCategory({ ...selectedCategory, icon: file });
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="px-1 h-8 mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="color"
              value={selectedCategory?.color || "#1E2939"}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  color: e.target.value,
                })
              }
              className="mt-1 block w-16 h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Updating Category...
              </div>
            ) : (
              "Update Category"
            )}
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={confirmDelete}
        onRequestClose={() => setConfirmDelete(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this category?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setConfirmDelete(false)}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
