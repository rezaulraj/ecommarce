import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useProductStore } from "../../../component/stores/useProductStore";
import { Loader, PlusCircle } from "lucide-react";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [downPrice, setDownPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [size, setSize] = useState(null); // Array of size
  const [color, setColor] = useState(null); // Array of color
  const [category, setCategory] = useState("");
  const { createProduct, loading, categorys } = useProductStore();
  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImage((prevImages) => [...prevImages, ...files]); // Store File objects directly
  };

  // Handle size input change
  const handleSizeChange = (index, e) => {
    const newsize = [...size];
    newsize[index] = e.target.value;
    setSize(newsize);
  };

  // Add a new size field
  const addSizeField = () => {
    setSize([...size, ""]);
  };

  // Remove a size field
  const removeSizeField = (index) => {
    const newsize = size.filter((_, i) => i !== index);
    setSize(newsize);
  };

  // Handle color input change
  const handleColorChange = (index, e) => {
    const newcolor = [...color];
    newcolor[index] = e.target.value;
    setColor(newcolor);
  };

  // Add a new color field
  const addColorField = () => {
    setColor([...color, ""]);
  };

  // Remove a color field
  const removeColorField = (index) => {
    const newcolor = color.filter((_, i) => i !== index);
    setColor(newcolor);
  };

  // Delete an image
  const deleteImage = (index) => {
    const newimage = image.filter((_, i) => i !== index);
    setImage(newimage);
  };

  // Move an image to the first position
  const moveImageToFirst = (index) => {
    const newimage = [...image];
    const [movedImage] = newimage.splice(index, 1); // Remove the image from its current position
    newimage.unshift(movedImage); // Add it to the beginning
    setImage(newimage);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log("from", formData);
    // Append text fields to FormData
    formData.append("title", title.trim());
    formData.append("brand", brand.trim());
    formData.append("description", description);
    formData.append("price", price);
    formData.append("downPrice", downPrice);
    formData.append("category", category.trim());
    // Append size and color as JSON strings
    formData.append("size", JSON.stringify(size));
    formData.append("color", JSON.stringify(color));

    // Append image files to FormData
    image.forEach((image, index) => {
      // Assuming `image` is a File object, if not, you need to convert it
      formData.append("image", image);
    });

    try {
      await createProduct(formData);
      console.log("Product Data:", {
        title,
        brand,
        description,
        price,
        downPrice,
        size,
        color,
        image,
      });

      // Reset form fields
      setTitle("");
      setBrand("");
      setDescription("");
      setPrice(0);
      setDownPrice(0);
      setImage([]);
      setSize([""]);
      setColor([""]);
      setCategory("");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  // Configer Rich text editor
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  // console.log(categorys);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-1 h-8 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="px-1 h-8 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              modules={module}
              className="bg-white rounded-md"
            />
          </div>

          {/* Original Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Original Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="px-1 h-8 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Discounted Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discounted Price
            </label>
            <input
              type="number"
              value={downPrice}
              onChange={(e) => setDownPrice(e.target.value)}
              className="px-1 h-8 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product image
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="px-1 h-8 mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <div className="mt-4 grid grid-cols-5 gap-4">
              {image.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="size-40 rounded-md"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => moveImageToFirst(index)}
                      className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      title="Move to first"
                    >
                      ⭐
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteImage(index)}
                      className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* size */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              size
            </label>
            {size?.map((size, index) => (
              <div key={index} className="flex space-x-4 mt-2">
                <input
                  type="text"
                  placeholder="Size"
                  value={size}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="px-1 h-8 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeSizeField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSizeField}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              + Add Size
            </button>
          </div>

          {/* color */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              color
            </label>
            {color?.map((color, index) => (
              <div key={index} className="flex space-x-4 mt-2">
                <input
                  type="text"
                  placeholder="Color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e)}
                  className="px-1 h-8 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeColorField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addColorField}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              + Add Color
            </button>
          </div>
          {/* category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Selete Category
            </label>
            <select
              name=""
              id=""
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="px-1 h-8 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="none">No Category (Single)</option>
              {categorys.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Createing Product...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <PlusCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Create Product
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
