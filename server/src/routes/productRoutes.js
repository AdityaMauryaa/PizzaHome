import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "../controller/productController.js";

const router = express.Router();

/**
 * GET /api/products
 * Fetch all products
 */
router.get("/", getAllProducts);

/**
 * GET /api/products/category/:categoryId
 * Fetch products by category
 */
router.get("/category/:categoryId", getProductsByCategory);

/**
 * GET /api/products/:id
 * Fetch single product
 */
router.get("/:id", getProductById);

export default router;
