// src/services/businessAdService.js

const API_BASE_URL = `${__API_BASE_URL__}${"/api/Businesses"}`;

// Create a new Business
export const createBusiness = async (businessData) => {
    try {
        // Log the raw form data object
        console.log("Business data (raw object):", businessData);

        // Log the JSON-stringified version to see exactly what's sent in the request body
        console.log("Business data (JSON stringified):", JSON.stringify(businessData, null, 2));

        const response = await fetch(`${API_BASE_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Include authentication headers if required
            },
            body: JSON.stringify(businessData),
        });

        if (!response.ok) {
            // Attempt to parse the error message from the response
            let errorMessage = "Failed to create business.";
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                // If response is not JSON, keep the default error message
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();

        // Log the response data
        console.log("Response from server:", data);

        return data;
    } catch (error) {
        // Re-throw the error to be handled in the Signup component
        throw error;
    }
};

// Additional functions can be added here (e.g., getBusinesses, getBusinessById, updateBusiness, deleteBusiness)
