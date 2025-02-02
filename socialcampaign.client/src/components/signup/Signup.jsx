// src/components/signup/Signup.jsx

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./signup.css";
import { createUser } from "../../services/userService"; // Existing userService
import { createBusiness } from "../../services/businessService"; // New businessService

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        UserType: "User", // Default registration type
        // User fields
        FirstName: "",
        LastName: "",
        Email: "",
        PasswordHash: "",
        // ProfilePicture: null, // For User (handled separately if needed)

        // Business fields
        BusinessName: "",
        Phone: "",
        Address: "",
        Description: "",
        // Password is already included as 'Password'
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.UserType === "User") {
            // Basic validations
            const { FirstName, LastName, Email, PasswordHash, ProfilePicture } = formData;
            if (!FirstName || !LastName || !Email || !PasswordHash) {
                toast.warn("All user fields are required!", {
                    position: "top-center",
                    autoClose: 1500,
                });
                return;
            }
            // Additional validations if needed (email format, password, etc.)

            // Prepare FormData for multipart/form-data
            const formDataToSend = new FormData();
            formDataToSend.append("FirstName", FirstName);
            formDataToSend.append("LastName", LastName);
            formDataToSend.append("Email", Email);
            formDataToSend.append("PasswordHash", PasswordHash);

            // Only append if a file was chosen
            if (ProfilePicture) {
                formDataToSend.append("ProfilePicture", ProfilePicture);
            }

            try {
                // Use your createUser() from userService
                await createUser(formDataToSend);
                toast.success("User registration successful!", {
                    position: "top-center",
                    autoClose: 1500,
                });
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } catch (err) {
                toast.error(err.message || "Failed to register user.", {
                    position: "top-center",
                    autoClose: 1500,
                });
            }
        }else if (formData.UserType === "Business") {
            // Business Registration Validation
            const { BusinessName, Email, Phone, Address, Description, PasswordHash } = formData;
            if (!BusinessName || !Email || !Phone || !Address || !Description || !PasswordHash) {
                toast.warn("All business fields are required!", {
                    position: "top-center",
                    autoClose: 1500,
                });
                return;
            }
            const phoneRegex = /^[0-9 ()+\-]{7,}$/;

            // Basic check that phone meets minimal length or format requirements
            if (!phoneRegex.test(formData.Phone)) {
                toast.error("Please enter a valid phone number format.", {
                    position: "top-center",
                    autoClose: 1500,
                });
                return;
            }
            // Optional: Add more validations (e.g., email format, password strength)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(Email)) {
                toast.error("Please enter a valid email address.", {
                    position: "top-center",
                    autoClose: 1500,
                });
                return;
            }

            const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
            if (!passwordRegex.test(PasswordHash)) {
                toast.error(
                    "Password must be at least 8 characters long and include a special character.",
                    {
                        position: "top-center",
                        autoClose: 1500,
                    }
                );
                return;
            }

            // Prepare business data
            const businessPayload = {
                businessName: formData.BusinessName,
                email: formData.Email,
                phone: formData.Phone,
                address: formData.Address,
                description: formData.Description,
                passwordHash: formData.PasswordHash, // Send plain-text Password for backend hashing
                // ProfilePicture: formData.ProfilePicture, // Uncomment if handling file uploads
            };

            // Submit Business data to backend using businessService
            try {
                const response = await createBusiness(businessPayload);
                toast.success("Business registration successful!", {
                    position: "top-center",
                    autoClose: 1500,
                });

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } catch (err) {
                // Handle specific error messages returned from the backend
                toast.error(err.message || "Failed to register business.", {
                    position: "top-center",
                    autoClose: 1500,
                });
            }
        }
    };

    return (
        <div className="signUpCont">
            <ToastContainer />
            <div className="signUpCard">
                <div className="logoCard">
                    <h3 className="logo text-primary">Awareness App</h3>
                </div>
                <h3 className="signHead">Sign Up</h3>
                <form className="signUpForm mt-3" onSubmit={handleSubmit}>
                    <div className="signUpFormCard">
                        <label className="fw-bold mb-1">Register As</label>
                        <div className="d-flex align-items-center mb-3">
                            <div className="form-check me-3">
                                <input
                                    type="radio"
                                    id="registerUser"
                                    name="UserType"
                                    className="form-check-input"
                                    value="User"
                                    checked={formData.UserType === "User"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="registerUser" className="form-check-label">
                                    User
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    id="registerBusiness"
                                    name="UserType"
                                    className="form-check-input"
                                    value="Business"
                                    checked={formData.UserType === "Business"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="registerBusiness" className="form-check-label">
                                    Business
                                </label>
                            </div>
                        </div>

                        {formData.UserType === "User" && (
                            <>
                                <label htmlFor="FirstName" className="fw-bold mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="FirstName"
                                    className="form-control mb-3"
                                    name="FirstName"
                                    autoComplete="on"
                                    placeholder="Enter your first name"
                                    value={formData.FirstName}
                                    onChange={handleChange}
                                />

                                <label htmlFor="LastName" className="fw-bold mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="LastName"
                                    className="form-control mb-3"
                                    name="LastName"
                                    autoComplete="on"
                                    placeholder="Enter your last name"
                                    value={formData.LastName}
                                    onChange={handleChange}
                                />

                                <label htmlFor="Email" className="fw-bold mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="Email"
                                    className="form-control mb-3"
                                    name="Email"
                                    autoComplete="on"
                                    placeholder="Enter your email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                />

                                <label htmlFor="Password" className="fw-bold mb-1">
                                    Password
                                </label>
                                <div className="passwordFieldWrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="PasswordHash"
                                        className="form-control mb-3"
                                        name="PasswordHash"
                                        autoComplete="on"
                                        placeholder="Enter password"
                                        value={formData.PasswordHash}
                                        onChange={handleChange}
                                    />
                                    <div className="passwordToggleIcon mb-3">
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                </div>

                                <label htmlFor="ProfilePicture" className="fw-bold mb-1">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    id="ProfilePicture"
                                    name="ProfilePicture"
                                    accept="image/*"
                                    className="form-control mb-3"
                                    onChange={(e) => {
                                        // "e.target.files[0]" is the selected File object
                                        setFormData({ ...formData, ProfilePicture: e.target.files[0] });
                                    }}
                                />
                            </>
                        )}

                        {formData.UserType === "Business" && (
                            <>
                                <label htmlFor="BusinessName" className="fw-bold mb-1">
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    id="BusinessName"
                                    className="form-control mb-3"
                                    name="BusinessName"
                                    autoComplete="on"
                                    placeholder="Enter your business name"
                                    value={formData.BusinessName}
                                    onChange={handleChange}
                                />

                                <label htmlFor="Email" className="fw-bold mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="Email"
                                    className="form-control mb-3"
                                    name="Email"
                                    autoComplete="on"
                                    placeholder="Enter your business email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                />

                                <label htmlFor="Phone" className="fw-bold mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="Phone"
                                    className="form-control mb-3"
                                    name="Phone"
                                    autoComplete="on"
                                    placeholder="Enter your business phone number"
                                    value={formData.Phone}
                                    onChange={handleChange}
                                />

                                <label htmlFor="Address" className="fw-bold mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="Address"
                                    className="form-control mb-3"
                                    name="Address"
                                    autoComplete="on"
                                    placeholder="Enter your business address"
                                    value={formData.Address}
                                    onChange={handleChange}
                                />

                                <label htmlFor="Description" className="fw-bold mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="Description"
                                    className="form-control mb-3"
                                    name="Description"
                                    autoComplete="on"
                                    placeholder="Enter a description for your business"
                                    value={formData.Description}
                                    onChange={handleChange}
                                    rows="4"
                                />

                                <label htmlFor="Password" className="fw-bold mb-1">
                                    Password
                                </label>
                                <div className="passwordFieldWrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="PasswordHash"
                                        className="form-control mb-3"
                                        name="PasswordHash"
                                        autoComplete="on"
                                        placeholder="Enter password"
                                        value={formData.PasswordHash}
                                        onChange={handleChange}
                                    />
                                    <div className="passwordToggleIcon mb-3">
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                </div>

                                {/* ProfilePicture is not handled here since the backend expects JSON */}
                            </>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary mb-3 mt-3"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="loginButCard">
                    <span>Already have an Account? </span>
                    <Link to="/login" className="link">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
