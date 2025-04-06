import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  images: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: false,
  },
});

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;
