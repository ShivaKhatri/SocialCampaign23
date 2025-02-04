const API_BASE_URL = `${__API_BASE_URL__}${"/api/Users"}`;

// Function to get the authentication token (assumes it's stored in localStorage)
const getAuthToken = () => {

    return localStorage.getItem('jwtToken');  // Or wherever you store your token
}

// Function to add authorization header
const addAuthHeader = (headers = {}) => {
    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    console.log("Request Headers:", headers);
    return headers;
}
export const getUserInfo = async (userId) => {
    try {
        console.log(`Calling API: /api/Users/${userId}/userinfo`);
        const response = await fetch(`${API_BASE_URL}/${userId}/userinfo`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...addAuthHeader(),
            },
        });

        console.log("Raw response from API:", response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch user data.");
        }

        const userData = await response.json();
        console.log("User data received:", userData);
        return userData;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
};
export const changeUserPassword = async (userId, newPassword) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${userId}/change-password`, {
            method: "PUT",
            headers: {
                ...addAuthHeader(), // Ensure authentication is included
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newPassword })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update password.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
};
//**Login Function**
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();
        localStorage.setItem("jwtToken", data.token); // Save token for future requests
        return data;
    } catch (error) {
        console.error("Login Error:", error.message);
        throw error;
    }
};

export const getAllUsers = async () => {
    const response = await fetch(`${API_BASE_URL}`, {
        headers: addAuthHeader(),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const getUserById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        headers: addAuthHeader(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    return response.json();
};


export const createUser = async (formData) => {
    try {
        // DEBUG: Log FormData fields to ensure all data is being sent
        for (let [key, value] of formData.entries()) {
            console.log(`FormData Key: ${key}`, value);
        }

        const response = await fetch(`${API_BASE_URL}`, {
            method: "POST",
            body: formData,  // FormData must be sent without setting Content-Type
        });

        if (!response.ok) {
            let errorMessage = "Failed to register user.";
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) { }

            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error;
    }
};



export const updateUser = async (id, user) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: addAuthHeader({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }

    return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: addAuthHeader(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete user");
    }

    return response.json();
};

export const updateUserProfilePicture = async (userId, formData) => {
    try {
        console.log("Uploading profile picture for user ID:", userId);

        const response = await fetch(`${API_BASE_URL}/${userId}/upload-profile-picture`, {
            method: "PUT",
            headers: addAuthHeader(),
            body: formData, // Do NOT set Content-Type manually for FormData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Profile Picture Update Error:", errorData);
            throw new Error(errorData.message || "Failed to update profile picture.");
        }

        return await response.json(); // Expect { imageUrl: "http://..." }
    } catch (error) {
        console.error("Error updating profile picture:", error);
        throw error;
    }
};

export const updateUserInfo = async (userId, userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${userId}/update-info`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...addAuthHeader(), // Add authentication header here
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update user information.");
        }

        return await response.json(); // Expect { firstName, lastName, email }
    } catch (error) {
        console.error("Error updating user information:", error);
        throw error;
    }
};
