const API_BASE_URL = `${__API_BASE_URL__}/api/businesses`;

// Function to get authentication token from localStorage
const getAuthToken = () => localStorage.getItem('jwtToken');

// Function to add authentication headers
const addAuthHeader = (headers = {}) => {
    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

// **Fetch all businesses for the logged-in user**
export const getBusinesses = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...addAuthHeader(),
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch businesses.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching businesses:", error);
        throw error;
    }
};

// **Fetch a single business by ID**
export const getBusinessById = async (businessId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/business/${businessId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...addAuthHeader(),
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch business details.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching business:", error);
        throw error;
    }
};

// **Create a new business (Supports file upload)**
export const createBusiness = async (businessData) => {
    try {
        console.log("Creating business with data:", businessData);

        const formData = new FormData();
        formData.append("BusinessName", businessData.BusinessName);
        formData.append("Address", businessData.Address);
        formData.append("Phone", businessData.Phone);
        formData.append("Email", businessData.Email);
        formData.append("Description", businessData.Description);
        formData.append("userId", businessData.userId); // Ensure the userId is included

        const response = await fetch(`${API_BASE_URL}`, {
            method: "POST",
            headers: addAuthHeader(), // Do NOT set Content-Type (fetch auto-sets it for FormData)
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create business.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating business:", error);
        throw error;
    }
};

// **Update an existing business (Supports file upload)**
export const updateBusiness = async (businessId, updatedData) => {
    try {
        console.log(`Updating business (ID: ${businessId}) with data:`, updatedData);

        const formData = new FormData();
        formData.append("BusinessName", updatedData.BusinessName);
        formData.append("Address", updatedData.Address);
        formData.append("Phone", updatedData.Phone);
        formData.append("Email", updatedData.Email);
        formData.append("Description", updatedData.Description);

        const response = await fetch(`${API_BASE_URL}/business/${businessId}`, {
            method: "PUT",
            headers: addAuthHeader(), // Do NOT set Content-Type (fetch auto-sets it for FormData)
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update business.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating business:", error);
        throw error;
    }
};

// **Soft delete a business (Only owner can delete)**
export const deleteBusiness = async (businessId) => {
    try {
        console.log(`Deleting business (ID: ${businessId})`);

        const response = await fetch(`${API_BASE_URL}/business/${businessId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...addAuthHeader(),
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete business.");
        }

        console.log(`Business (ID: ${businessId}) deleted successfully.`);
        return { message: "Business deleted successfully." };
    } catch (error) {
        console.error("Error deleting business:", error);
        throw error;
    }
};
