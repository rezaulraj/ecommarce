import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
