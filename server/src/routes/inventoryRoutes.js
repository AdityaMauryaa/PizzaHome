import express from "express";
import {
  getInventoryStatus,
  updateInventory,
  checkStockAvailability,
} from "../controller/inventoryController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

/**
 * GET /api/inventory
 * Get inventory status
 */
router.get("/", authMiddleware, getInventoryStatus);

/**
 * PUT /api/inventory/:productId
 * Update inventory for a product
 */
router.put("/:productId", authMiddleware, updateInventory);

/**
 * GET /api/inventory/check/:productId
 * Check stock availability for a product
 */
router.get("/check/:productId", authMiddleware, checkStockAvailability);

export default router;
