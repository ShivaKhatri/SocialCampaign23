import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);

    // Check if the user is logged in when the app starts
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]); // Re-run if token changes

    const login = (newToken) => {
        setIsLoggedIn(true);
        setToken(newToken); // Store the token in state
        localStorage.setItem('jwtToken', newToken); // Store the token in localStorage
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null); // Remove token from state
        localStorage.removeItem('jwtToken'); // Remove the token from localStorage
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
