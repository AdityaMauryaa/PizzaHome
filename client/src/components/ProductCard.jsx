import { Plus, Minus, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function ProductCard({ product, onAdd, onUpdate, onRemove }) {
  const { role } = useAuth();
  const [qty, setQty] = useState(product.quantity || 1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">₹{product.price}</span>
          {role === "provider" ? (
            <div className="flex gap-2 items-center">
              <button
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors active:scale-95"
                onClick={() => {
                  if (qty > 1) {
                    setQty(qty - 1);
                    onUpdate && onUpdate(product, qty - 1);
                  }
                }}
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold">{qty}</span>
              <button
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors active:scale-95"
                onClick={() => {
                  setQty(qty + 1);
                  onUpdate && onUpdate(product, qty + 1);
                }}
              >
                <Plus size={16} />
              </button>
              <button
                className="ml-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all active:scale-95"
                onClick={() => onRemove && onRemove(product)}
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={async () => {
                setAdding(true);
                await onAdd(product);
                setAdded(true);
                setTimeout(() => {
                  setAdding(false);
                  setTimeout(() => setAdded(false), 300);
                }, 600);
              }}
              disabled={adding}
              className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600'
              } disabled:opacity-70`}
            >
              {adding ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : added ? (
                <><Check size={18} /> Added!</>
              ) : (
                <><Plus size={18} /> Add</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
