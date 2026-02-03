import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import CategoryNav from "../components/CategoryNav";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { role } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      const categoryList = Array.isArray(res.data) ? res.data : [];
      
      console.log("Fetched categories:", categoryList);
      setCategories(categoryList);

      if (categoryList.length > 0) {
        setSelectedCategory(categoryList[0].name);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/category/${selectedCategory}`);
      const productList = Array.isArray(res.data) ? res.data : [];
      
      console.log(`Products for ${selectedCategory}:`, productList);
      setProducts(productList);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (product) => {
    try {
      await addToCart(product._id, 1);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const handleUpdate = (product, qty) => {
    // Provider update logic
  };

  const handleRemove = (product) => {
    // Provider remove logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🍕 Delicious Menu</h1>
          <p className="text-gray-600">Fresh ingredients, Hot delivery!</p>
        </div>

        <CategoryNav
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-gray-500 text-lg">No products found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAdd={handleAdd}
                onUpdate={role === "provider" ? handleUpdate : undefined}
                onRemove={role === "provider" ? handleRemove : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
