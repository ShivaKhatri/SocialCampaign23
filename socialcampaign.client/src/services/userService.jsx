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

