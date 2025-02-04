import React, { useState, useEffect } from "react";
import "./changeInfo.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserInfo, getUserInfo } from "../../services/userService"; // User API
import { getBusinessById, updateBusiness, deleteBusiness } from "../../services/businessService"; // Business API

const ChangeInfo = ({ type, businessId,onUpdateSuccess }) => {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(
        type === "user"
            ? {
                firstName: "",
                lastName: "",
                email: "",
            }
            : {
                BusinessName: "",
                Email: "",
                Phone: "",
                Address: "",
                Description: "",
            }
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (type === "user") {
                    const storedUserId = localStorage.getItem("userId");
                    if (storedUserId) {
                        setUserId(storedUserId);
                        const userData = await getUserInfo(storedUserId);
                        setFormData(userData);
                    } else {
                        toast.error("User ID not found! Please log in again.");
                    }
                } else if (type === "business" && businessId) {
                    console.log("Fetching business data for businessId:", businessId);
                    const businessData = await getBusinessById(businessId);
                    console.log("Fetched business data:", businessData);

                    if (businessData) {
                        setFormData({
                            BusinessName: businessData.businessName || "",
                            Email: businessData.email || "",
                            Phone: businessData.phone || "",
                            Address: businessData.address || "",
                            Description: businessData.description || "",
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type, businessId]); // Runs when `type` or `businessId` changes

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEmpty = Object.values(formData).every((value) => !value.trim());

        if (isEmpty) {
            toast.warn("No changes are made!", { position: "top-center", autoClose: 1500 });
            return;
        }

        try {
            if (type === "user") {
                if (!userId) {
                    toast.error("User ID not found! Cannot update.");
                    return;
                }

                const updatedUserInfo = await updateUserInfo(userId, formData);
                setFormData(updatedUserInfo);
                toast.success("User information updated successfully!", { position: "top-center", autoClose: 1500 });
            } else if (type === "business" && businessId) {
                console.log("Updating business data for businessId:", businessId);
                const updatedBusinessInfo = await updateBusiness(businessId, formData);
                console.log("Business updated successfully:", updatedBusinessInfo);
                setFormData(updatedBusinessInfo);
                toast.success("Business information updated successfully!", { position: "top-center", autoClose: 1500 });

                setTimeout(() => {
                    onUpdateSuccess(); // Redirect back to Business List
                }, 100); 
            }
        } catch (error) {
            console.error("Error updating business info:", error);
            toast.error(error.message || "Failed to update information.");
        }
    };
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this business? This action cannot be undone.")) {
            return;
        }

        try {
            await deleteBusiness(businessId);
            toast.success("Business deleted successfully!", { position: "top-center", autoClose: 1500 });

            setTimeout(() => {
                if (onUpdateSuccess) onUpdateSuccess();
            }, 1000);
        } catch (error) {
            console.error("Error deleting business:", error);
            toast.error(error.message || "Failed to delete business.");
        }
    };
    if (loading) {
        return <div>Loading business details...</div>;
    }

    return (
        <div className="info-container">
            <ToastContainer />
            <div className="info-heading">
                <h3>Change {type === "user" ? "Info" : "Business Info"}</h3>
            </div>

            <form className="info-form" onSubmit={handleSubmit}>
                {type === "user" ? (
                    <>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="form-control"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="form-control"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="form-control"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-3">
                            <label htmlFor="BusinessName" className="form-label">Business Name</label>
                            <input
                                type="text"
                                placeholder="Your Business Name"
                                className="form-control"
                                id="BusinessName"
                                value={formData.BusinessName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <input
                                type="email"
                                placeholder="business@gmail.com"
                                className="form-control"
                                id="Email"
                                value={formData.Email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Phone" className="form-label">Phone Number</label>
                            <input
                                type="text"
                                placeholder="1234567890"
                                className="form-control"
                                id="Phone"
                                value={formData.Phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Address" className="form-label">Address</label>
                            <input
                                type="text"
                                placeholder="City, State"
                                className="form-control"
                                id="Address"
                                value={formData.Address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Description" className="form-label">Description</label>
                            <textarea
                                placeholder="Describe your business"
                                className="form-control"
                                id="Description"
                                rows="4"
                                value={formData.Description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </>
                )}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                        Delete Business
                    </button>
                </div>


            </form>
        </div>
    );
};

export default ChangeInfo;
