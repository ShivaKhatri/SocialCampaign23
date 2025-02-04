import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./signup.css";
import { createUser } from "../../services/userService"; // Existing userService

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        PasswordHash: "",
        ProfilePicture: null, // For User (handled separately if needed)
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validations
        const { FirstName, LastName, Email, PasswordHash, ProfilePicture } = formData;
        if (!FirstName || !LastName || !Email || !PasswordHash) {
            toast.warn("All user fields are required!", {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            toast.error("Please enter a valid email address.", {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }

        // Password validation
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
                                setFormData({ ...formData, ProfilePicture: e.target.files[0] });
                            }}
                        />

                        <button type="submit" className="btn btn-primary mb-3 mt-3">
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
