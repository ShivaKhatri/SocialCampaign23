const API_BASE_URL = `${__API_BASE_URL__}/api/BusinessAds`;

//  Fetch all business ads (Admin or promotional management)
export const getAllBusinessAds = async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

//  Fetch ads for a specific business
export const getAdsByBusinessId = async (businessId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/business/${businessId}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`No ads found for business ID: ${businessId}`);
                return [];
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching ads:", error);
        throw new Error("Failed to fetch ads for this business");
    }
};

//  Fetch a single ad by ID
export const getBusinessAdById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch business ad");
    }
    return response.json();
};

//  Create a new business ad (Handles FormData & includes businessId)
export const createBusinessAd = async (businessId, adData) => {
    const formData = new FormData();
    formData.append("BusinessId", businessId);
    formData.append("Title", adData.title);
    formData.append("Description", adData.description);
    formData.append("Status", "Pending"); // Default status is Pending

    if (adData.image) {
        formData.append("image", adData.image);
    }

    const response = await fetch(API_BASE_URL, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to create business ad");
    }

    return response.json();
};

//  Update an existing business ad (Handles image, text fields, and status)
export const updateBusinessAd = async (id, adData) => {
    const formData = new FormData();
    formData.append("Title", adData.title);
    formData.append("Description", adData.description);
    formData.append("Status", adData.status); // Status update

    if (adData.image) {
        formData.append("image", adData.image);
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to update business ad");
    }

    return response.json();
};

//  Change the status of an ad (Admin action)
export const updateBusinessAdStatus = async (id, newStatus) => {
    const response = await fetch(`${API_BASE_URL}/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), // Send only the status
    });

    if (!response.ok) {
        throw new Error("Failed to update business ad status");
    }

    return response.json();
};

export const getApprovedAds = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/approved`);
        if (!response.ok) {
            throw new Error(`Failed to fetch approved ads. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching approved ads:", error);
        throw error;
    }
};

//  Delete a business ad (Soft delete)
export const deleteBusinessAd = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete business ad");
    }
    return response.json();
};
