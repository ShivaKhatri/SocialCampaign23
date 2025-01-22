const API_BASE_URL = "https://localhost:53328/api/Users";

export const getAllUsers = async () => {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const getUserById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }
    return response.json();
};

export const createUser = async (user) => {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error("Failed to create user");
    }
    return response.json();
};

export const updateUser = async (id, user) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
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
    });
    if (!response.ok) {
        throw new Error("Failed to delete user");
    }
    return response.json();
};
