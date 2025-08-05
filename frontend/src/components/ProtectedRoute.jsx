
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProtectedRoute = ({ adminOnly = false }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    if (adminOnly && !decoded.isAdmin) return <Navigate to="/" />;
    return <Outlet />;
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
