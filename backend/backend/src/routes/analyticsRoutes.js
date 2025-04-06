import express from "express";
import { adminRoute, protectRoutes } from "../middlewares/authMiddleware.js";
import { getAnalyticsData, getDailySalesData } from "../controllers/analyticsController.js";

const router = express.Router();
router.get("/", protectRoutes, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dailySaleDate = await getDailySalesData(startDate, endDate);

    res.json({
      analyticsData,
      dailySaleDate,
    });
  } catch (error) {
    console.log("Error in the analyties data ", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export default router;
