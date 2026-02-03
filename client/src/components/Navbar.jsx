import { ShoppingCart, Pizza, User, Package, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-gradient-to-r from-red-600 to-orange-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:scale-105 transition-transform">
          <Pizza className="w-8 h-8" />
          PizzaHub
        </Link>

        <div className="flex items-center gap-6">
          {user && (
            <Link to="/orders" className="relative group">
              <Package className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </Link>
          )}
          
          <Link to="/cart" className="relative group">
            <ShoppingCart className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.items.length}
              </span>
            )}
          </Link>

          {user?.role === "provider" && (
            <Link to="/provider" className="px-4 py-2 bg-white text-red-600 rounded-full text-sm font-semibold hover:bg-yellow-400 hover:text-red-700 transition-all">
              Dashboard
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
              >
                <User size={20} />
                <span className="font-medium">{user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 px-4 py-2 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="px-4 py-2 bg-white text-red-600 rounded-full font-semibold hover:bg-yellow-400 hover:text-red-700 transition-all">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-yellow-400 text-red-700 rounded-full font-semibold hover:bg-yellow-300 transition-all">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
