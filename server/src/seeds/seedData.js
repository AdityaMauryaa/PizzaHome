import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import connectDB from "../db/db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Inventory from "../models/Inventory.js";

const seedData = async () => {
  try {
    await connectDB();

    console.log("🧹 Clearing existing data...");
    await Category.deleteMany();
    await Product.deleteMany();
    await Inventory.deleteMany();

    // ---------- Categories ----------
    const categories = await Category.insertMany([
      { name: "Pizza", description: "Delicious hot pizzas" },
      { name: "Cold Drinks", description: "Chilled beverages" },
      { name: "Breads", description: "Freshly baked breads" },
    ]);

    const [pizzaCat, drinkCat, breadCat] = categories;

    // ---------- Products ----------
    const products = await Product.insertMany([
      // 🍕 Pizzas
      {
        name: "Margherita",
        price: 199,
        category: "Pizza",
        description: "Classic cheese and tomato pizza",
        image:
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400",
      },
      {
        name: "Pepperoni",
        price: 299,
        category: "Pizza",
        description: "Pepperoni with mozzarella",
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
      },
      {
        name: "BBQ Chicken",
        price: 349,
        category: "Pizza",
        description: "Smoky BBQ chicken pizza",
        image:
          "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400",
      },
      {
        name: "Veggie Supreme",
        price: 279,
        category: "Pizza",
        description: "Loaded with fresh vegetables",
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
      },
      {
        name: "Hawaiian",
        price: 319,
        category: "Pizza",
        description: "Ham and pineapple classic",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      },
      {
        name: "Meat Lovers",
        price: 399,
        category: "Pizza",
        description: "Loaded with assorted meats",
        image:
          "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&blend=70",
      },
      {
        name: "Four Cheese",
        price: 329,
        category: "Pizza",
        description: "Blend of 4 premium cheeses",
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
      },
      {
        name: "Mexican Fiesta",
        price: 359,
        category: "Pizza",
        description: "Spicy jalapeño and salsa",
        image:
          "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400",
      },

      // 🥤 Cold Drinks
      {
        name: "Coca-Cola",
        price: 49,
        category: "Cold Drinks",
        description: "Chilled Coke 500ml",
        image:
          "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400",
      },
      {
        name: "Pepsi",
        price: 49,
        category: "Cold Drinks",
        description: "Refreshing Pepsi 500ml",
        image:
          "https://images.unsplash.com/photo-1605184861755-8f190fea96a5?w=400",
      },
      {
        name: "Sprite",
        price: 45,
        category: "Cold Drinks",
        description: "Lemon-lime soda 500ml",
        image:
          "https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400",
      },
      {
        name: "Fanta Orange",
        price: 45,
        category: "Cold Drinks",
        description: "Orange flavored soda",
        image:
          "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
      },
      {
        name: "Mountain Dew",
        price: 50,
        category: "Cold Drinks",
        description: "Citrus blast energy drink",
        image:
          "https://images.unsplash.com/photo-1629203849831-6817a8e85551?w=400",
      },
      {
        name: "Iced Tea",
        price: 60,
        category: "Cold Drinks",
        description: "Refreshing lemon iced tea",
        image:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
      },
      {
        name: "Fresh Lemonade",
        price: 70,
        category: "Cold Drinks",
        description: "Freshly squeezed lemonade",
        image:
          "https://images.unsplash.com/photo-1523677011781-c91d1bbe4a7b?w=400",
      },
      {
        name: "Mineral Water",
        price: 30,
        category: "Cold Drinks",
        description: "1 liter mineral water",
        image:
          "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
      },

      // 🍞 Breads
      {
        name: "Garlic Bread",
        price: 129,
        category: "Breads",
        description: "Toasted garlic bread with herbs",
        image:
          "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400",
      },
      {
        name: "Cheese Sticks",
        price: 149,
        category: "Breads",
        description: "Cheesy bread sticks with marinara",
        image:
          "https://images.unsplash.com/photo-1625944525533-473f1a3a5e91?w=400",
      },
      {
        name: "Breadsticks",
        price: 99,
        category: "Breads",
        description: "Crunchy baked breadsticks",
        image:
          "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400",
      },
      {
        name: "Stuffed Garlic Bread",
        price: 169,
        category: "Breads",
        description: "Garlic bread stuffed with cheese",
        image:
          "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=400",
      },
      {
        name: "Pizza Rolls",
        price: 139,
        category: "Breads",
        description: "Mini pizza-flavored bread rolls",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
      },
      {
        name: "Cheesy Breadbowl",
        price: 189,
        category: "Breads",
        description: "Bread bowl filled with cheese dip",
        image:
          "https://images.unsplash.com/photo-1612182062422-feba7c4f2e3b?w=400",
      },
      {
        name: "Herb Focaccia",
        price: 159,
        category: "Breads",
        description: "Italian focaccia with rosemary",
        image:
          "https://images.unsplash.com/photo-1588795945-b8a8cfb0c6c3?w=400",
      },
      {
        name: "Garlic Knots",
        price: 119,
        category: "Breads",
        description: "Soft twisted garlic knots",
        image:
          "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400",
      },
    ]);

    // ---------- Inventory ----------
    const inventoryData = products.map((product) => ({
      product: product._id,
      quantity: 50, // initial stock
      lastUpdated: Date.now(),
    }));

    await Inventory.insertMany(inventoryData);

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
