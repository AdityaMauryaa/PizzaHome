export default function CategoryNav({ categories, selected, onSelect }) {
  if (!Array.isArray(categories)) {
    return null;
  }

  return (
    <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat.name)}
          className={`px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all transform hover:scale-105 shadow-md
            ${
              selected === cat.name
                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-red-100 hover:to-orange-100 hover:text-red-600"
            }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
