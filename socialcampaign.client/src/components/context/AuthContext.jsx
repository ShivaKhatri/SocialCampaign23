import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create Context
export const AuthContext = createContext();

// Helper function to check if a JWT is expired
function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // decode the JWT payload
        // JWT `exp` is in seconds; convert to milliseconds for comparison
        return Date.now() >= payload.exp * 1000;
    } catch (error) {
        // If there's any error decoding, consider the token invalid
        return true;
    }
}

export const AuthProvider = ({ children }) => {
    // On initial load, retrieve any stored token from localStorage or sessionStorage
    const storedToken =
        localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');

    // Initialize state with a valid token if it exists
    const [token, setToken] = useState(() => {
        if (storedToken) {
            // Check if the existing token is expired
            if (isTokenExpired(storedToken)) {
                localStorage.removeItem('jwtToken');
                sessionStorage.removeItem('jwtToken');
                return null;
            }
            return storedToken;
        }
        return null;
    });

    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));

    // Keep `isLoggedIn` in sync with `token`
    useEffect(() => {
        setIsLoggedIn(Boolean(token));
    }, [token]);

    // LOGIN: Accept a token and a "rememberMe" flag
    const login = useCallback((newToken, rememberMe = false) => {
        if (!newToken) return;

        // If token is already expired, do nothing
        if (isTokenExpired(newToken)) {
            console.error("Received an expired or invalid token.");
            return;
        }

        setToken(newToken);
        // Decide where to store the token
        if (rememberMe) {
            localStorage.setItem('jwtToken', newToken);
        } else {
            sessionStorage.setItem('jwtToken', newToken);
        }
    }, []);

    // LOGOUT: Clear everything
    const logout = useCallback(() => {
        localStorage.removeItem('jwtToken');
        sessionStorage.removeItem('jwtToken');
        setToken(null);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
