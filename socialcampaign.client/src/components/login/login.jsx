import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warn("Please fill in all fields!", { position: "top-center", autoClose: 1500 });
            return;
        }

        try {
            const response = await fetch("https://localhost:53328/api/Users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Store the JWT token and user info in localStorage
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('userType', data.userType);
                localStorage.setItem('email', data.email);

                toast.success("Login successful!", { position: "top-center", autoClose: 1500 });

                setTimeout(() => {
                    navigate("/home");  // Redirect to home or dashboard
                }, 1000);
            } else {
                const error = await response.json();
                toast.error(error.message || "Invalid email or password!", { position: "top-center", autoClose: 1500 });
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again later.", { position: "top-center", autoClose: 1500 });
        }
    };

    return (
        <div className="loginCont">
            <ToastContainer />
            <div className="loginCard">
                <div className='logoCard text-center mb-3'>
                    <h3 className='text-primary fw-bold'>Awareness App</h3>
                </div>
                <h3 className='loginHead text-center'>Login</h3>
                <form className='loginForm' onSubmit={handleLogin} noValidate>
                    <div className="loginFormCard">
                        <label htmlFor="email" className='mb-1 fw-bold'>Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control mb-3"
                            name="email"
                            autoComplete="on"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password" className='mb-1 fw-bold'>Password</label>
                        <div className="passwordFieldWrapper mb-3">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-control"
                                name="password"
                                autoComplete="on"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="passwordToggleIcon">
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="pointer"
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label htmlFor="rememberMe" className="ms-2">Remember Me</label>
                            </div>
                            <Link to="/forgot-password" className="link">Forgot Password?</Link>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                </form>
                <div className="signUpBut text-center mt-3">
                    <span>Don't have an Account? </span>
                    <Link to="/signup" className="link">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
