
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setForm({ name: data.name, price: data.price, image: data.image });
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`/api/products/${id}`, form, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    alert("Product updated!");
    navigate("/admin/products");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 max-w-sm">
        <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border p-2" />
        <input type="text" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="border p-2" />
        <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="border p-2" />
        <button className="bg-blue-600 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
