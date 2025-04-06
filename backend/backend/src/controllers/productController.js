import cloudinary from "../config/cloudinary.js";
import { redis } from "../config/redis.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import fs from "fs";

// filter product by category
export const filterProducts = async (req, res) => {
  // localhost:3000/api/products?category=03403430, 430043043
  try {
    let filter = {};
    if (req.query.category) {
      filter = { category: req.query.category.split(",") }; // this data as an array
    }

    const productList = await Product.find(filter).populate("category");
    res.status(200).json({ productList });
  } catch (error) {
    console.log("The error in filterProducts controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // find all product
    res.json(products);
  } catch (error) {
    console.log("Error message from product controller:", error.message);
    res.status(500).json({ message: "Internel server error" });
  }
};

// Get products by pagination
export const getProductByPagination = async (req, res) => {
  try {
    const page = req.query.page || 0;
    const productPerPage = 20;
    const totalProduct = await Product.countDocuments();
    const product = await Product.find()
      .populate("category")
      .skip(page * productPerPage)
      .limit(productPerPage);
    res.status(200).json({ totalProduct, product });
  } catch (error) {
    console.log("Error in getProductByPagination controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not in redis, fatch from mongodb
    // .lean() is gonna return a plain javascript object instead of mongodb document
    //which is good for performance

    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured product found" });
    }

    // store in redis for future quick access

    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts Contorller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.files);
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).json("Invalid category");
    console.log("body data", req.body);
    console.log("file data", req.files);
    const { title, description, price, downPrice, brand, size, color } =
      req.body;

    // Validate required fields
    if (!title || !description || !price || !category) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    let images = req.files?.image;
    console.log("uploading data ");
    // If there's only one image, make it an array for uniformity
    if (!Array.isArray(images)) {
      images = images ? [images] : [];
    }
    console.log("uploading data image");
    let cloudinaryUrls = [];
    if (images.length > 0) {
      for (const image of images) {
        console.log("uploading image cloudinary ");
        const imagePath = image.tempFilePath || image.path;
        const cloudinaryResponse = await cloudinary.uploader.upload(imagePath, {
          folder: "products",
        });
        cloudinaryUrls.push(cloudinaryResponse.secure_url);
        console.log("cloudeinary url", cloudinaryUrls);
        // Delete the temporary file after upload
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Remove the file from the server
        }
      }
    } else {
      return res.status(400).json({ message: "Product images are required" });
    }

    const Sizes = Array.isArray(size)
      ? size
      : size
      ? [size]
      : ["not-applicable"];
    const Colors = Array.isArray(color)
      ? color
      : color
      ? [color]
      : ["not-applicable"];

    // If size or color is defined, map them to their appropriate formats
    const uniqueSizes = [...new Set(Sizes.map((s) => s.trim()))];
    const uniqueColors = [...new Set(Colors.map((c) => c.trim()))];

    const product = new Product({
      title: title.trim(),
      description: description.trim(),
      slug: title.trim().toLowerCase().replace(/\s+/g, "-"),
      price,
      downPrice,
      brand: brand || "No Brand",
      image: cloudinaryUrls,
      category: category,
      size: uniqueSizes,
      color: uniqueColors,
    });

    await product.save();
    console.log(product);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.log("Error to createProduct from productController", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// delete a new product
export const deleteProduct = async (req, res) => {
  try {
    // Extract the productId from the route params
    const productId = req.params.productId;

    // Log to verify that productId is correctly extracted
    // console.log(req.params);

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    if (product.image && Array.isArray(product.image)) {
      for (const imageUrl of product.image) {
        const imagePublicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(`products/${imagePublicId}`); // Delete image from Cloudinary
        console.log("delete image from cloudinary");
      }
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(productId);

    res
      .status(200)
      .json({ message: "Product and images deleted successfully" });
  } catch (error) {
    console.log("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// update a new product
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the existing product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).json({ message: "Invalid category" });

    const {
      title,
      description,
      price,
      downPrice,
      brand,
      rating,
      numReviews,
      size,
      color,
    } = req.body;

    // Update the fields only if provided in the request
    if (title) product.title = title.trim();
    if (description) product.description = description.trim();
    if (price) product.price = price;
    if (downPrice) product.downPrice = downPrice;
    if (brand) product.brand = brand;
    if (category) product.category = category.trim();
    if (rating) product.rating = rating;
    if (numReviews) product.numReviews = numReviews;
    // Update slug based on the new title
    if (title) {
      product.slug = title.trim().toLowerCase().replace(/\s+/g, "-");
    }

    // Handle sizes and colors
    if (size) {
      const Sizes = Array.isArray(size) ? size : [size];
      product.size = [...new Set(Sizes.map((s) => s.trim()))];
    }

    if (color) {
      const Colors = Array.isArray(color) ? color : [color];
      product.color = [...new Set(Colors.map((c) => c.trim()))];
    }

    // Handle images
    let images = req.files?.image;
    if (images) {
      // If there's only one image, make it an array
      if (!Array.isArray(images)) {
        images = [images];
      }

      // Delete old images from Cloudinary if new images are uploaded
      if (product.image && Array.isArray(product.image)) {
        for (const imageUrl of product.image) {
          const imagePublicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID
          await cloudinary.uploader.destroy(`products/${imagePublicId}`); // Delete from Cloudinary
        }
      }

      // Upload new images to Cloudinary
      const cloudinaryUrls = [];
      for (const image of images) {
        const imagePath = image.tempFilePath || image.path;
        const cloudinaryResponse = await cloudinary.uploader.upload(imagePath, {
          folder: "products",
        });
        cloudinaryUrls.push(cloudinaryResponse.secure_url);
      }
      // Delete the temporary file after upload
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Remove the file from the server
      }
      // Update the product images
      product.image = cloudinaryUrls;
    }

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get reommendations porducet

export const getRecommendations = async (req, res) => {
  try {
    const porducts = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
          downPrice: 1,
          brand: 1,
          size: 1,
        },
      },
    ]);
    res.json(porducts);
  } catch (error) {
    console.log("Error from getRecommendations", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductsByCategorys = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.log("Error in getProductsByCategorys controller", error.message);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// toggleFeaturedProduct

export const toggleFeaturedProduct = async (req, res) => {
  const { id } = req.params.id;

  try {
    const product = await Product.findById(id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCashe();
      res.json(updatedProduct);
    } else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.log("Error from toggleFeaturedProduct controller", error.message);
    return res.status({
      message: "Internal server error",
      error: error.message,
    });
  }
};

async function updateFeaturedProductsCashe() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products".JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("error in update redis cash");
  }
}
