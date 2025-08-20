import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check localStorage token on app load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axiosInstance
                .get("/dashboard", { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => setCurrentUser(res.data.user))
                .catch(() => setCurrentUser(null))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // Function to update context after login
    const loginUser = (user, token) => {
        localStorage.setItem("token", token);
        setCurrentUser(user);
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, loginUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
