import express from "express";
import {
  createProduct,
  deleteProduct,
  filterProducts,
  getAllProducts,
  getFeaturedProducts,
  getProductByPagination,
  getProductsByCategorys,
  getRecommendations,
  toggleFeaturedProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminRoute, protectRoutes } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Product featured Api
router.get("/featured", getFeaturedProducts);

// Recommandation product
router.get("/recommendations", getRecommendations);

// Products by categorys
router.get("/category/:categorys", getProductsByCategorys);

// Product api
router.get("/getAllProducts", protectRoutes, adminRoute, getAllProducts);

// get product by pageination
router.get("/getProductByPage", getProductByPagination);
// searching a product
router.get("/", filterProducts);
router.post("/", protectRoutes, adminRoute, createProduct);
router.delete("/:productId", protectRoutes, adminRoute, deleteProduct);
router.put("/:productId", protectRoutes, adminRoute, updateProduct);

// Product active update
router.patch("/:id", protectRoutes, adminRoute, toggleFeaturedProduct);

export default router;
