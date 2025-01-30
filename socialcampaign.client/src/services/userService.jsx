const API_BASE_URL = "https://localhost:53328/api/Users";

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

export const createUser = async (user) => {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: addAuthHeader({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
    }

    return response.json();
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
