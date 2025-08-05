import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  loginUser,
  registerUser,
  logoutUser,
  getProfile,
} from "@/services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user on app mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile(); // must hit a /me or /profile API
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);

      toast({
        title: "🎉 Login Successful",
        description: `Welcome, ${data.user.name || data.user.email}`,
      });

      return true;
    } catch (err) {
      toast({
        title: "❌ Login Failed",
        description: err?.response?.data?.error || "Invalid credentials.",
        variant: "destructive",
      });
      return false;
    }
  };

  // ✅ REGISTER
  const register = async (name, email, password) => {
    try {
      const data = await registerUser({ name, email, password });
      setUser(data.user); // if your backend returns `user`

      toast({
        title: "✅ Registered Successfully",
        description: `Welcome, ${data.user?.name || "User"}!`,
      });

      return true;
    } catch (err) {
      toast({
        title: "❌ Registration Failed",
        description: err?.response?.data?.error || "Something went wrong.",
        variant: "destructive",
      });
      return false;
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      toast({
        title: "👋 Logged Out",
        description: "You have been logged out successfully.",
      });
    } catch (err) {
      toast({
        title: "❌ Logout Failed",
        description: err?.response?.data?.error || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const value = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
