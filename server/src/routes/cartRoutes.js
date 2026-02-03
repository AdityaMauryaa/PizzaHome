import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controller/cartController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/cart
 * Add item to cart
 */
router.post("/", authMiddleware, addToCart);

/**
 * GET /api/cart
 * Get cart items
 */
router.get("/", authMiddleware, getCart);

/**
 * PUT /api/cart/:itemId
 * Update item quantity
 */
router.put("/:itemId", authMiddleware, updateCartItem);

/**
 * DELETE /api/cart/:itemId
 * Remove item from cart
 */
router.delete("/:itemId", authMiddleware, removeFromCart);

/**
 * DELETE /api/cart
 * Clear cart
 */
router.delete("/", authMiddleware, clearCart);

export default router;
