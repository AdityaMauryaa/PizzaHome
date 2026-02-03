import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function ProviderDashboard() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data.products || []);
  };

  const handleEdit = (product) => {
    setEditing(product._id);
    setForm(product);
  };

  const handleSave = async () => {
    await api.put(`/products/${editing}`, form);
    setEditing(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const handleAdd = async () => {
    await api.post("/products", form);
    setForm({ name: "", price: "", description: "", image: "" });
    fetchProducts();
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <input
            placeholder="Name"
            className="border p-2 rounded mr-2"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Price"
            className="border p-2 rounded mr-2"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
          <input
            placeholder="Description"
            className="border p-2 rounded mr-2"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <input
            placeholder="Image URL"
            className="border p-2 rounded mr-2"
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
          />
          {editing ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
          ) : (
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAdd}>Add</button>
          )}
        </div>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Description</th>
              <th className="p-2">Image</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="p-2">{p.name}</td>
                <td className="p-2">₹{p.price}</td>
                <td className="p-2">{p.description}</td>
                <td className="p-2"><img src={p.image} alt="" className="h-10 w-10 object-cover rounded" /></td>
                <td className="p-2">
                  <button className="text-blue-500 mr-2" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="text-red-500" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
