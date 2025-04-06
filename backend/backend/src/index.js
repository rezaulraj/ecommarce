import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import couponsRoutes from "./routes/couponsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json()); // allows you to parse the body of the request
app.use(cookieParser());

// If using ES modules, get the current directory:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  fileUpload({
    useTempFiles: true, // This forces creation of a temp file
    tempFileDir: path.join(__dirname, "temp"), // Temporary directory for storing files
    createParentPath: true, // Creates the directory if it doesn't exist
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);
// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponsRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categorys", categoryRoutes);
// server connection
app.listen(PORT, () => {
  console.log(`The server is running on port http://localhost:${PORT}`);
  connectDB();
});
