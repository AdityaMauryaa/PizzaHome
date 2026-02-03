import express from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderById,
} from "../controller/orderController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/orders
 * Place order
 */
router.post("/", authMiddleware, placeOrder);

/**
 * GET /api/orders
 * Get logged-in user's orders
 */
router.get("/", authMiddleware, getUserOrders);

/**
 * GET /api/orders/:orderId
 * Get order details
 */
router.get("/:orderId", authMiddleware, getOrderById);

export default router;
