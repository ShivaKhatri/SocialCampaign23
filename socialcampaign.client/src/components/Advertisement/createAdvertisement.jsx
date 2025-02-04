import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateBusinessAd } from "../../services/businessAdService";
import "./advertisements.css";

const CreateAdvertisement = ({ adData, onUpdateSuccess }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(
        adData.imageUrl ? `https://localhost:53328${adData.imageUrl}` : "https://placehold.co/500"
    );

    const [formData, setFormData] = useState({
        title: adData?.title || "",
        description: adData?.description || "",
        image: null, // Stores the selected file
    });

    if (!adData) return null; // Prevents errors if no adData is passed

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle File Change (Update Image Preview)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });

            // Show image preview immediately
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const updatedAd = await updateBusinessAd(adData.businessAdId, formData);

            // Notify user of success
            toast.success("Ad updated successfully!", { position: "top-center", autoClose: 1500 });

            // Call the update function to refresh the ads list in AdsManager
            onUpdateSuccess();

            // Reset editing mode
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update ad!", { position: "top-center", autoClose: 1500 });
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <div className="card">
                <img
                    src={previewImage} // Use updated preview image
                    className="active-image"
                    alt="Ad"
                />
                <div className="card-body">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                className="form-control mb-2"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter ad title"
                            />
                            <textarea
                                className="form-control mb-2"
                                id="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter ad description"
                            ></textarea>
                            <input type="file" className="form-control mb-2" onChange={handleFileChange} />

                            {/* Save and Cancel Buttons */}
                            <div className="d-flex gap-2">
                                <button className="btn btn-success" onClick={handleSave}>
                                    Save
                                </button>
                                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h5 className="card-title text-primary">{adData.title}</h5>
                            <p className="card-text">{adData.description}</p>

                            {/* Edit Button */}
                            <button className="btn btn-primary mt-2" onClick={() => setIsEditing(true)}>
                                Edit Ad
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateAdvertisement;
