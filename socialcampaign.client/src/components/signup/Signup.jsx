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
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validation for empty fields
        const { firstName, lastName, email, password } = formData;
        if (!firstName || !lastName || !email || !password) {
            toast.warn("All fields are required!", {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error(
                "Password must be at least 8 characters long and include a special character.",
                {
                    position: "top-center",
                    autoClose: 1500,
                }
            );
            return;
        }

        // Attempt to create user
        try {
            const user = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                passwordHash: formData.password, // Backend expects "PasswordHash"
                userType: formData.userType, // Pass userType
            };

            await createUser(user);
            setSuccess("User registered successfully!");
            toast.success("Sign-up successful!", {
                position: "top-center",
                autoClose: 1500,
            });
            setTimeout(() => {
                navigate("/");
            }, 1000);

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                userType: "User", // Reset to default
            });
        } catch (err) {
            setError(err.message || "Failed to register user.");
            toast.error(error, {
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
                        <div className="passwordFieldWrapper ">
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
