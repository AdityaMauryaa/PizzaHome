import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: ["Pizza", "Cold Drinks", "Breads"],
    },

    description: {
      type: String,
    },

    image: {
      type: String, // image URL
    },
  },
  {
    timestamps: true,
  }
);

const Product= mongoose.model("Product", productSchema);
export default Product;