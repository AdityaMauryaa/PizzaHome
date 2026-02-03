import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// Load env
dotenv.config();
// DB
import connectDB from "./db/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

// Middleware
import logger from "./utils/logger.js";
import apiKeyMiddleware from "./utils/apiKeyMiddleware.js";
import errorHandler from "./utils/errorHandler.js";

// Init app
const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Global Middleware ----------
app.use(cors(
  {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

// ---------- DB ----------
connectDB();
// ---------- Public Routes ----------
app.use("/api/auth", authRoutes);

// ---------- API Key Protected Routes ----------
app.use("/api", apiKeyMiddleware);

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);

// ---------- Health Check ----------
app.get("/", (req, res) => {
  res.send("🚀 Pizza Ordering API is running");
});

// ---------- Error Handler (LAST) ----------
app.use(errorHandler);

// ---------- Server ----------
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
