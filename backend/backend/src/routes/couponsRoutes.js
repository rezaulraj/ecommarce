import express from "express";
import { protectRoutes } from "../middlewares/authMiddleware.js";
import { getCoupon, validateCoupon } from "../controllers/couponeController.js";

const router = express.Router();

router.get("/", protectRoutes, getCoupon);
router.get("/validate", protectRoutes, validateCoupon);

export default router;
