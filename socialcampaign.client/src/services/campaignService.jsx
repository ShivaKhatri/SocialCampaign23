// campaignService.js
const API_BASE_URL = `${__API_BASE_URL__}${"/api/Campaigns"}`;

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
export const getCampaignsByCreator = async (createdById) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bycreator/${createdById}`);
        if (!response.ok) {
            let errorMessage = "Failed to fetch campaigns.";
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) { }
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in getCampaignsByCreator:", error);
        throw error;
    }
};
export const createCampaign = async (formData) => {
    try {
        // DEBUG: Log FormData fields to ensure all data is being sent
        for (let [key, value] of formData.entries()) {
            console.log(`FormData Key: ${key}`, value);
        }

        const response = await fetch(`${API_BASE_URL}`, {
            method: "POST",
            body: formData, // FormData is sent without manually setting Content-Type
        });

        if (!response.ok) {
            let errorMessage = "Failed to create campaign.";
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) { }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in createCampaign:", error);
        throw error;
    }
};
export const updateCampaign = async (id, formData) => {
    // Debug: Log all FormData entries
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PUT",
            // When sending FormData, do not set the Content-Type header manually.
            body: formData,
        });

        if (!response.ok) {
            // Try to extract error details
            let errorMessage = "Failed to update campaign.";
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                // If parsing fails, you can try response.text()
                const errorText = await response.text();
                console.error("Server error text:", errorText);
            }
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in updateCampaign:", error);
        throw error;
    }
};



export const deleteCampaign = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete campaign");
    }

    return; // Do NOT call response.json() since the server returns no content
};

