import { createContext, useState, useEffect } from "react";
import { getAuthToken } from "../utils/";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const token = getAuthToken();

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (err) {
                setUser(null);
                removeAuthToken();
            }
        }

        setLoading(false);
    }, []);



    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
