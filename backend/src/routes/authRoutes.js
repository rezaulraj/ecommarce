import express from "express";
import {
  getProfile,
  login,
  logout,
  refreshToken,
  signUp,
} from "../controllers/authController.js";
import { protectRoutes } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoutes, getProfile)
export default router;
