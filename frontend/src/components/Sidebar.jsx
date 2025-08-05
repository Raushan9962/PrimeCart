
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen p-4 bg-gray-900 text-white fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/admin" className="hover:underline">Dashboard</Link>
        <Link to="/admin/products" className="hover:underline">Products</Link>
        <Link to="/admin/add" className="hover:underline">Add Product</Link>
        <Link to="/admin/logout" className="hover:underline">Logout</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
