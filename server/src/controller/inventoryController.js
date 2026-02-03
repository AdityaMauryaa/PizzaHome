import Inventory from "../models/Inventory.js";
import Product from "../models/Product.js";

/**
 * @desc    Get inventory status
 * @route   GET /api/inventory
 */
export const getInventoryStatus = async (req, res, next) => {
  try {
    const inventory = await Inventory.find().populate(
      "product",
      "name price category"
    );

    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Check stock availability for a product
 * @route   GET /api/inventory/:productId
 */
export const checkStockAvailability = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const inventory = await Inventory.findOne({ product: productId }).populate(
      "product",
      "name"
    );

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    res.status(200).json({
      product: inventory.product.name,
      availableQuantity: inventory.quantity,
      inStock: inventory.quantity > 0,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update inventory (admin / system use)
 * @route   PUT /api/inventory/:productId
 */
export const updateInventory = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 0) {
      return res
        .status(400)
        .json({ message: "Quantity cannot be negative" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const inventory = await Inventory.findOneAndUpdate(
      { product: productId },
      {
        quantity,
        lastUpdated: Date.now(),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Inventory updated successfully",
      inventory,
    });
  } catch (error) {
    next(error);
  }
};
