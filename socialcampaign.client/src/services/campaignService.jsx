// campaignService.js
const API_BASE_URL = "https://localhost:53328/api/Campaigns";

export const getAllCampaigns = async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const getCampaignById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch campaign");
    }
    return response.json();
};

export const createCampaign = async (campaign) => {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign),
    });
    if (!response.ok) {
        throw new Error("Failed to create campaign");
    }
    return response.json();
};

export const updateCampaign = async (id, campaign) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign),
    });
    if (!response.ok) {
        throw new Error("Failed to update campaign");
    }
    return response.json();
};

export const deleteCampaign = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete campaign");
    }
    return response.json();
};
