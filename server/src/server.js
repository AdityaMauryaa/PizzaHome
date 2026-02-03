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
const port = process.env.PORT || 3000;

// ---------- Global Middleware ----------
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:5173', 'http://localhost:3000'];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  exposedHeaders: ['set-cookie'],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

// ---------- DB ----------
connectDB();    
// ---------- Public Routes (No API Key Required) ----------
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// ---------- API Key Protected Routes ----------
app.use("/api", apiKeyMiddleware);

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
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
