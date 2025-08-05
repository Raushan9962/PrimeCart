
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/products", form, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setForm({ name: "", price: "", image: "" });
    alert("Product added!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="border p-2" />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
