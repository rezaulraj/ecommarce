import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    downPrice: {
      type: Number,
      min: 0,
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    image: {
      type: [String],
      required: true,
    },
    size: {
      type: [String],
      required: false,
    },
    color: {
      type: [String],
      required: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
