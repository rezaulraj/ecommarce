import express from "express";
import {
  deleteCategory,
  getAllCategorys,
  getCategoryById,
  postCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { adminRoute, protectRoutes } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", getAllCategorys);
router.get("/:idCategory", getCategoryById);
router.post("/postCategory", protectRoutes, adminRoute, postCategory);
router.put("/updateCategory/:idCategory", protectRoutes, adminRoute, updateCategory);
router.delete(
  "/deleteCategory/:idCategory",
  protectRoutes,
  adminRoute,
  deleteCategory
);
export default router;
