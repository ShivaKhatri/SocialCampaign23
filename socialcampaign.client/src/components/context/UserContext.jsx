import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "../../services/userService"; // Your user service

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // Track loading state

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token"); // Retrieve JWT token

            if (userId && token) {
                try {
                    const userData = await getUserById(userId, token); // Pass token
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to load user data", error);
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
