import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const token = localStorage.getItem("hr-token");
  function login(user) {
    setUser(user);
  }
  const logout = () => {
    setUser(null);
    localStorage.removeItem("hr-token");
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (token) {
          const request = await axios.get("http://localhost:4020/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(request);
          if (request.data.success) {
            setUser(request.data.user);
          }
        } else {
          setUser(null);
          setisLoading(false);
        }
      } catch (error) {
        console.log(error);
        if (error.request && !error.request.error) {
          setUser(null);
        }
      } finally {
        setisLoading(false);
      }
    };
    verifyUser();
  }, []);
  return (
    <AuthContext.Provider value={{ login, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext)
export default AuthContext;
