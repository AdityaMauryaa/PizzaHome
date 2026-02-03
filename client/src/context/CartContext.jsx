import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [], totalAmount: 0 });
      return;
    }
    
    try {
      setLoading(true);
      const res = await api.get("/cart");
      // Ensure items is always an array
      setCart({
        items: res.data?.items || [],
        totalAmount: res.data?.totalAmount || 0
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart({ items: [], totalAmount: 0 });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    await api.post("/cart", { productId, quantity });
    fetchCart();
  };

  const updateQuantity = async (itemId, quantity) => {
    // Optimistic update
    const previousCart = { ...cart };
    const updatedItems = (cart?.items || []).map(item => 
      item._id === itemId ? { ...item, quantity } : item
    );
    const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCart({ items: updatedItems, totalAmount: newTotal });

    try {
      await api.put(`/cart/${itemId}`, { quantity });
    } catch (error) {
      // Revert on error
      setCart(previousCart);
      console.error("Failed to update quantity:", error);
    }
  };

  const removeItem = async (itemId) => {
    // Optimistic update
    const previousCart = { ...cart };
    const updatedItems = (cart?.items || []).filter(item => item._id !== itemId);
    const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCart({ items: updatedItems, totalAmount: newTotal });

    try {
      await api.delete(`/cart/${itemId}`);
    } catch (error) {
      // Revert on error
      setCart(previousCart);
      console.error("Failed to remove item:", error);
    }
  };

  const clearCart = async () => {
    await api.delete("/cart");
    setCart({ items: [], totalAmount: 0 });
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
