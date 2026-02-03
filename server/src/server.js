import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

// ---------- DB ----------
import connectDB from "./db/db.js";

// ---------- Routes ----------
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

// ---------- Middleware ----------
import logger from "./utils/logger.js";
import apiKeyMiddleware from "./utils/apiKeyMiddleware.js";
import errorHandler from "./utils/errorHandler.js";

// ---------- App ----------
const app = express();
const PORT = process.env.PORT || 3000;

// ---------- CORS ----------
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false); // ❌ never throw
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
};

app.use(cors(corsOptions));

/**
 * 🔥 EXPRESS 5 SAFE OPTIONS HANDLER
 * - Required for CORS preflight
 * - Must come BEFORE routes & auth
 */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ---------- Body & Cookies ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

// ---------- DB ----------
connectDB();

// ---------- Public Routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// ---------- Protected Routes ----------
app.use("/api/cart", apiKeyMiddleware, cartRoutes);
app.use("/api/orders", apiKeyMiddleware, orderRoutes);
app.use("/api/inventory", apiKeyMiddleware, inventoryRoutes);

// ---------- Health ----------
app.get("/", (req, res) => {
  res.send("🚀 Pizza Ordering API is running");
});

// ---------- Error Handler (ALWAYS LAST) ----------
app.use(errorHandler);

// ---------- Server ----------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
