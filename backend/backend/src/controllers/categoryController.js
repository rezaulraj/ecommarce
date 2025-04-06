import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
export const getAllCategorys = async (req, res) => {
  try {
    const categoryList = await Category.find();
    if (!categoryList) {
      res.status(404).json({ message: "Thier is no category avilable" });
    }
    res.json(categoryList);
  } catch (error) {
    console.log("Error in GetCategoryControllers ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.idCategory);
    if (!category) {
      return res.status(404).json({ message: "Category id not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.log("The error in getCategoryController", error.message);
    res
      .status(500)
      .json({ message: "Internal Sever error", error: error.message });
  }
};

// create category

export const postCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    let cloudinaryResponse = null;

    // Check if a file was uploaded
    if (req.files && req.files.icon) {
      const file = req.files.icon;

      // Upload the file to Cloudinary
      cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "categories",
      });

      // Delete the temporary file after uploading to Cloudinary
      setTimeout(() => {
        fs.unlink(file.tempFilePath, (err) => {
          if (err) {
            console.error("Failed to delete temporary file:", err);
          } else {
            console.log(
              "Temporary file deleted successfully:",
              file.tempFilePath
            );
          }
        });
      }, 1000);
    }

    // Create the category
    const category = new Category({
      name,
      icon: cloudinaryResponse?.secure_url || "", // Use the Cloudinary URL if available
      color,
    });

    // Save the category to the database
    const savedCategory = await category.save();
    if (!savedCategory) {
      console.error("Category could not be saved.");
      return res
        .status(400)
        .json({ message: "The category cannot be created" });
    }

    // Return the created category
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error in postCategory:", error); // Log the full error object
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// update category idCategory

export const updateCategory = async (req, res) => {
  try {
    const { idCategory } = req.params; // Category ID to update
    const { name, color } = req.body;
    let cloudinaryResponse = null;

    // Find the existing category
    const existingCategory = await Category.findById(idCategory);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if a new file was uploaded
    if (req.files && req.files.icon) {
      const file = req.files.icon;

      // Upload the new file to Cloudinary
      cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "categories",
      });

      // Delete the old image from Cloudinary (if it exists)
      if (existingCategory.icon) {
        const publicId = existingCategory.icon.split("/").pop().split(".")[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(`categories/${publicId}`);
      }

      // Delete the temporary file after uploading to Cloudinary
      setTimeout(() => {
        fs.unlink(file.tempFilePath, (err) => {
          if (err) {
            console.error("Failed to delete temporary file:", err);
          } else {
            console.log(
              "Temporary file deleted successfully:",
              file.tempFilePath
            );
          }
        });
      }, 1000);
    }

    // Update the category
    const updatedCategory = await Category.findByIdAndUpdate(
      idCategory,
      {
        name,
        icon: cloudinaryResponse?.secure_url || existingCategory.icon, // Use new URL if available, otherwise keep the old one
        color,
      },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res
        .status(400)
        .json({ message: "The category could not be updated" });
    }

    // Return the updated category
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error in updateCategory:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// delete category

export const deleteCategory = async (req, res) => {
  try {
    const { idCategory } = req.params; // Category ID to delete

    // Find the category
    const category = await Category.findById(idCategory);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete the image from Cloudinary (if it exists)
    if (category.icon) {
      const publicId = category.icon.split("/").pop().split(".")[0]; // Extract public ID from URL
      await cloudinary.uploader.destroy(`categories/${publicId}`);
    }

    // Delete the category from the database
    const deletedCategory = await Category.findByIdAndDelete(idCategory);
    if (!deletedCategory) {
      return res
        .status(400)
        .json({ message: "The category could not be deleted" });
    }

    // Return success message
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
