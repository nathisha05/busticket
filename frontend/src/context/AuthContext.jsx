import { createContext, useState, useContext } from "react";
import api from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    return savedUser && savedToken ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed"
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user: newUser } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed"
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
