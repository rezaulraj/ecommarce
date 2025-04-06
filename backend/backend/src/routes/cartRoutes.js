import express from "express";
import {
  addToCart,
  getCartProducts,
  removeProductFromCart,
  updatedProductQuantity,
} from "../controllers/cartController.js";
import { protectRoutes } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", protectRoutes, getCartProducts);
router.post("/", protectRoutes, addToCart);
router.put("/:id", protectRoutes, updatedProductQuantity);
router.delete("/:id", protectRoutes, removeProductFromCart);
export default router;
