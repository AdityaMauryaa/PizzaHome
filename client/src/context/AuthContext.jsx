import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setRole(res.data.user.role);
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setRole(res.data.user.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRole(null);
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data);
      setRole(res.data.role || res.data.user?.role);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, role, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
