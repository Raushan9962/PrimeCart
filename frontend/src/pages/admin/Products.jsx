
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchProducts();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul className="space-y-2">
        {products.map(p => (
          <li key={p._id} className="border p-2 flex justify-between">
            {p.name}
            <button onClick={() => deleteProduct(p._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
