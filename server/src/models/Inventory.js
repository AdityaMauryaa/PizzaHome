import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;