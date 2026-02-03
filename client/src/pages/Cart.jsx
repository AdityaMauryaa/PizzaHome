import Navbar from "../components/Navbar";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateQuantity, removeItem, loading } = useCart();
  const navigate = useNavigate();

  if (loading && (!cart || !cart.items)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">🛒 Shopping Cart</h1>

        {!cart?.items || cart.items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart?.items?.map((item) => {
                // Skip items with missing product data
                if (!item?.product) return null;
                
                return (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={item.product.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'}
                      alt={item.product.name || 'Product'}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.product.name || 'Unknown Product'}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {item.product.description || ''}
                      </p>
                      <p className="text-lg font-semibold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mt-2">
                        ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 bg-white rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-800 active:scale-95"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="font-bold text-lg min-w-[2rem] text-center">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-1.5 bg-white rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white transition-all active:scale-95"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all active:scale-95"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart?.items?.length || 0} items)</span>
                    <span className="font-semibold">₹{cart?.totalAmount || 0}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                      ₹{cart?.totalAmount || 0}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-full font-bold text-lg hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>

                <p className="text-gray-500 text-xs text-center mt-4">
                  🔒 Safe and secure checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

