import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      setUser(response.user);
      toast({
        title: "Đăng nhập thành công",
        description: `Chào mừng ${response.user.name || response.user.username}!`,
      });
      return response;
    } catch (error) {
      toast({
        title: "Đăng nhập thất bại",
        description: error.message || "Vui lòng kiểm tra lại thông tin đăng nhập",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      toast({
        title: "Đăng ký thành công",
        description: "Vui lòng đăng nhập để tiếp tục",
      });
      return response;
    } catch (error) {
      toast({
        title: "Đăng ký thất bại",
        description: error.message || "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Đăng xuất thành công",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
