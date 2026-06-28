import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    //Al iniciar, se restaura la sesión desde localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (newToken,userData) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);

        navigate("/login");
    };

    const isAuthenticated = !!token;

    return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}