import React, { createContext, useState, useEffect, useCallback } from "react";

// Create Context
export const AuthContext = createContext();

// Helper function to check if a JWT is expired
function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        return Date.now() >= payload.exp * 1000; // Compare with current time
    } catch (error) {
        return true; // If there's an error decoding, consider the token invalid
    }
}

export const AuthProvider = ({ children }) => {
    const storedToken =
        localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

    const [token, setToken] = useState(() => {
        if (storedToken && !isTokenExpired(storedToken)) {
            return storedToken;
        } else {
            localStorage.removeItem("jwtToken");
            sessionStorage.removeItem("jwtToken");
            return null;
        }
    });

    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));

    // Auto logout if token expires
    useEffect(() => {
        if (token && isTokenExpired(token)) {
            console.log("Token expired. Logging out...");
            logout();
        }
    }, [token]);

    // Login: Store the token securely
    const login = useCallback((newToken, rememberMe = false) => {
        if (!newToken || isTokenExpired(newToken)) {
            console.error("Received an expired or invalid token.");
            return;
        }

        setToken(newToken);
        setIsLoggedIn(true);

        if (rememberMe) {
            localStorage.setItem("jwtToken", newToken);
        } else {
            sessionStorage.setItem("jwtToken", newToken);
        }
    }, []);

    // Logout: Clear everything
    const logout = useCallback(() => {
        console.log("Logging out...");
        localStorage.removeItem("jwtToken");
        sessionStorage.removeItem("jwtToken");
        localStorage.removeItem("userId"); // Also remove user ID
        sessionStorage.clear(); // Clear all session storage
        setToken(null);
        setIsLoggedIn(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
