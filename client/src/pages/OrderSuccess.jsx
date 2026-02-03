import { useLocation, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { useEffect } from "react";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="bg-green-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle className="text-green-500 w-14 h-14" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Order Placed Successfully! 🎉
          </h1>
          
          <p className="text-gray-600 text-lg mb-8">
            Thank you for your order. We're preparing your delicious food!
          </p>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Package className="text-red-600" size={24} />
              <p className="text-gray-700 font-semibold">
                Order Reference: <span className="text-red-600 font-bold text-xl">{order.orderRef || order._id}</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8">
            <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
              📋 Order Summary
            </h3>

            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div key={item._id || index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.product?.name || item.product}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-gray-700">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 pt-4 mt-4">
              <div className="flex justify-between items-center text-2xl font-bold text-gray-800">
                <span>Total</span>
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  ₹{order.total || order.totalAmount}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/orders"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-red-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              View Orders <ArrowRight size={20} />
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
