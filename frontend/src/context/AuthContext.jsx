import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

// 1. Give it a default value of null or an empty object 
// to prevent "reading properties of null" before the provider loads.
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 2. Added loading state

  const login = (accessToken) => {
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("profile/");
      setUser(res.data);
    } catch (error) {
      console.error("Profile fetch failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        loading, // 3. Export loading so components know when data is ready
      }}
    >
      {/* 4. Don't render children until we've checked the token/profile */}
      {!loading ? children : <div className="flex items-center justify-center h-screen">Loading...</div>}
    </AuthContext.Provider>
  );
};