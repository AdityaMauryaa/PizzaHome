import express from "express";
import { getAllCategories } from "../controller/categoryController.js";

const router = express.Router();

/**
 * GET /api/categories
 * Fetch all categories
 */
router.get("/", getAllCategories);

export default router;
