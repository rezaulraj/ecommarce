import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  getUserOrderList,
  makeProductOrderRequest,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { adminRoute, protectRoutes } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", protectRoutes, adminRoute, getAllOrders);
router.get("/:orderId", protectRoutes, adminRoute, getSingleOrder);
router.post("/", protectRoutes, makeProductOrderRequest);

// order status update
router.put(
  "/orderstatus/:orderId",
  protectRoutes,
  adminRoute,
  updateOrderStatus
);

// delete order
router.delete("/delete-order/:orderId", protectRoutes, adminRoute, deleteOrder);

// independent user
router.get("/get-user-buy-product/:userId", protectRoutes, getUserOrderList);

export default router;
