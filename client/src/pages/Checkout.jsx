import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { CreditCard, Lock } from "lucide-react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    try {
      setLoading(true);
      const res = await api.post("/orders");
      clearCart();
      navigate("/order-success", { state: { order: res.data.order || res.data } });
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <p className="text-gray-600 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold"
          >
            Go to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">💳 Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item._id} className="flex justify-between items-center border-b pb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-700">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{cart.totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-gray-800 pt-2 border-t">
                <span>Total</span>
                <span className="text-2xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  ₹{cart.totalAmount}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CreditCard size={24} />
              Payment Method
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="border-2 border-orange-500 bg-orange-50 rounded-xl p-4 cursor-pointer">
                <p className="font-semibold text-gray-800">💵 Cash on Delivery</p>
                <p className="text-sm text-gray-600 mt-1">Pay when you receive your order</p>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-full font-bold text-lg hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
            >
              <Lock size={20} />
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            <p className="text-gray-500 text-xs text-center mt-4">
              🔒 Your payment information is safe and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

