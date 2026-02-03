import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Inventory from "../models/Inventory.js";

/**
 * Helper: Generate Order Reference
 */
const generateOrderRef = () => {
  return `ORD-${Date.now()}`;
};
/**
 * @desc    Place order
 * @route   POST /api/orders
 */
export const placeOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 1️⃣ Validate stock availability
    for (const item of cart.items) {
      const inventory = await Inventory.findOne({
        product: item.product._id,
      });

      if (!inventory || inventory.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.product.name}`,
        });
      }
    }

    // 2️⃣ Deduct inventory
    for (const item of cart.items) {
      await Inventory.findOneAndUpdate(
        { product: item.product._id },
        {
          $inc: { quantity: -item.quantity },
          lastUpdated: Date.now(),
        }
      );
    }

    // 3️⃣ Create order
    const order = await Order.create({
      user: userId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cart.totalAmount,
      status: "PLACED",
      orderRef: generateOrderRef(),
    });

    // 4️⃣ Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged-in user's orders
 * @route   GET /api/orders
 */
export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order details
 * @route   GET /api/orders/:orderId
 */
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("items.product")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure user can access only their order
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
