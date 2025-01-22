// businessAdService.js
const API_BASE_URL = "https://localhost:53328/api/BusinessAds";

export const getAllBusinessAds = async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const getBusinessAdById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch business ad");
    }
    return response.json();
};

export const createBusinessAd = async (businessAd) => {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(businessAd),
    });
    if (!response.ok) {
        throw new Error("Failed to create business ad");
    }
    return response.json();
};

export const updateBusinessAd = async (id, businessAd) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(businessAd),
    });
    if (!response.ok) {
        throw new Error("Failed to update business ad");
    }
    return response.json();
};

export const deleteBusinessAd = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete business ad");
    }
    return response.json();
};
