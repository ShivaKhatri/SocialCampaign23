import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./signup.css";
import { createUser } from "../../services/userService";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userType: "User", // Default to "User"
        businessName: "",
        phone: "",
        address: "",
        description: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for empty fields
        if (formData.userType === "User") {
            const { firstName, lastName, email, password } = formData;
            if (!firstName || !lastName || !email || !password) {
                toast.warn("All fields are required!", {
                    position: "top-center",
                    autoClose: 1500,
                });
                return;
            }
        } else {
            const { businessName, email, phone, address, description } = formData;
            if (!businessName || !email || !phone || !address || !description) {
                toast.warn("All fields are required!", {
                    position: "top-center",
                    autoClose: 1500,
                });
                return;
            }
        }

        // Password validation
        if (formData.userType === "User") {
            const passwordRegex =
                /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
            if (!passwordRegex.test(formData.password)) {
                toast.error(
                    "Password must be at least 8 characters long and include a special character.",
                    {
                        position: "top-center",
                        autoClose: 1500,
                    }
                );
                return;
            }
        }

        // Attempt to create user
        try {
            const user = {
                ...formData,
                passwordHash: formData.password, // Backend expects "PasswordHash"
            };

            await createUser(user);
            toast.success("Sign-up successful!", {
                position: "top-center",
                autoClose: 1500,
            });
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            toast.error("Failed to register user.", {
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
                        <label className="fw-bold mb-1">Register As</label>
                        <div className="d-flex align-items-center mb-3">
                            <div className="form-check me-3">
                                <input
                                    type="radio"
                                    id="registerUser"
                                    name="userType"
                                    className="form-check-input"
                                    value="User"
                                    checked={formData.userType === "User"}
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
                                    name="userType"
                                    className="form-check-input"
                                    value="Business"
                                    checked={formData.userType === "Business"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="registerBusiness" className="form-check-label">
                                    Business
                                </label>
                            </div>
                        </div>

                        {formData.userType === "User" ? (
                            <>
                                <label htmlFor="firstName" className="fw-bold mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="form-control mb-3"
                                    name="firstName"
                                    autoComplete="on"
                                    placeholder="Enter your first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />

                                <label htmlFor="lastName" className="fw-bold mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="form-control mb-3"
                                    name="lastName"
                                    autoComplete="on"
                                    placeholder="Enter your last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />

                                <label htmlFor="email" className="fw-bold mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control mb-3"
                                    name="email"
                                    autoComplete="on"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <label htmlFor="password" className="fw-bold mb-1">
                                    Password
                                </label>
                                <div className="passwordFieldWrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className="form-control mb-3"
                                        name="password"
                                        autoComplete="on"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <div className="passwordToggleIcon mb-3">
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <label htmlFor="businessName" className="fw-bold mb-1">
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    id="businessName"
                                    className="form-control mb-3"
                                    name="businessName"
                                    placeholder="Enter your business name"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                />

                                <label htmlFor="email" className="fw-bold mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control mb-3"
                                    name="email"
                                    placeholder="Enter your business email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <label htmlFor="phone" className="fw-bold mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="form-control "
                                    name="phone"
                                    placeholder="Enter your contact"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Allow only numbers and ensure length is 10 or less
                                        if (/^\d{0,10}$/.test(value)) {
                                            setFormData({ ...formData, phone: value });
                                        }
                                    }}
                                />
                                <small className="text-muted mb-3">
                                    Enter a valid 10-digit phone number.
                                </small>


                                <label htmlFor="address" className="fw-bold mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    className="form-control mb-3"
                                    name="address"
                                    placeholder="Enter your address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />

                                <label htmlFor="description" className="fw-bold mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    className="form-control "
                                    name="description"
                                    placeholder="Enter a brief description of your business"
                                    rows="3"
                                    maxLength="500" // Limits input to 500 characters
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                <small className="text-muted mb-3">
                                    {formData.description.length}/500 characters
                                </small>

                                <label htmlFor="password" className="fw-bold mb-1">
                                    Password
                                </label>
                                <div className="passwordFieldWrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className="form-control mb-3"
                                        name="password"
                                        autoComplete="on"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <div className="passwordToggleIcon mb-3">
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </div>
                                </div>
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
                    <Link to="/" className="link">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
