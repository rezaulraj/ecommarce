import { populate } from "dotenv";
import OrderItem from "../models/Order-Item.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getAllOrders = async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orderList);
  } catch (error) {
    console.log("Error in getAlOrders controller", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// get single order
// if inside the nested data we can recive like that
// .populate({ path: "orderItems", populate: {path: "product", populate:"category"} })
export const getSingleOrder = async (req, res) => {
  try {
    const orderList = await Order.findById(req.params.orderId)
      .populate({
        path: "orderItems",
        populate: { path: "product", select: "title price" },
      })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orderList);
  } catch (error) {
    console.log("Error in getAlOrders controller", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// make order

export const makeProductOrderRequest = async (req, res) => {
  try {
    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        try {
          // console.log("Received orderItem:", orderItem);

          // Validate the product reference
          const productExists = await Product.findById(orderItem.product);
          if (!productExists) {
            throw new Error(
              `Product with ID ${orderItem.product} does not exist`
            );
          }

          // Create and save the OrderItem
          const newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            color: orderItem.color,
            size: orderItem.size,
            product: orderItem.product,
          });
          // console.log("New OrderItem instance:", newOrderItem);

          const savedOrderItem = await newOrderItem.save();
          // console.log("Saved OrderItem:", savedOrderItem);

          return savedOrderItem._id;
        } catch (error) {
          console.error("Error in processing orderItem:", error.message);
          throw error;
        }
      })
    );

    // console.log(orderItemsIds);
    const orderItemIdResolve = await orderItemsIds;
    // console.log(orderItemIdResolve);

    // for hacker paspactive
    const totalPrices = await Promise.all(
      orderItemIdResolve.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );

    // console.log(totalPrices);

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      orderItems: orderItemIdResolve,
      shoppingAddress: req.body.shoppingAddress,
      city: req.body.city,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
    });

    order = await order.save();

    res.status(201).json({ message: "Successfully order pleased", order });
  } catch (error) {
    console.log("Error in makeProductOrderRequest controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderStatus = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        status: req.body.status,
      },
      { new: true }
    );
    if (!orderStatus) {
      return res.status(400).json({
        message: "Sorry you can not send any order status",
      });
    }
    res.json(orderStatus);
  } catch (error) {
    console.log("Error from updateOrderStatus controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// delete order
export const deleteOrder = async (req, res) => {
  try {
    // Find the order by ID
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Delete associated orderItems
    await OrderItem.deleteMany({ _id: { $in: order.orderItems } });

    // Delete the order
    await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json({
      message: "Order and associated OrderItems deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteOrder controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// show on user order list

export const getUserOrderList = async (req, res) => {
  try {
    console.log(req.params);
    const userOrderList = await Order.find({
      user: req.params.userId,
    }).populate({
      path: "orderItems",
      populate: { path: "product" },
    }).sort({ createdAt: -1 });
    if (!userOrderList) {
      res.status(404).json({ message: "Order Not Found" });
    }
    res.status(200).json(userOrderList);
  } catch (error) {
    console.log("Error in getUserOrderList controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
