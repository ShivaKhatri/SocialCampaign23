import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../services/userService"; // Import login function

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Access login function from context

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Redirect logged-in users to the home page
    useEffect(() => {
        const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');

        if (token) {
            const tokenParts = token.split('.'); // Split JWT token into header, payload, signature
            if (tokenParts.length !== 3) {
                // Invalid token format, clear storage and redirect to login
                localStorage.removeItem('jwtToken');
                sessionStorage.removeItem('jwtToken');
                navigate('/login');
                return;
            }

            const payload = JSON.parse(atob(tokenParts[1])); // Decode the payload
            const expiry = payload.exp * 1000; // Convert expiry to milliseconds

            if (Date.now() >= expiry) {
                console.log("Token has expired, logging out.");
                localStorage.removeItem('jwtToken');
                sessionStorage.removeItem('jwtToken');
                navigate('/login');
            } else {
                navigate('/home');  // Redirect if valid
            }
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warn("Please fill in all fields!", { position: "top-center", autoClose: 1500 });
            return;
        }

        try {
            const data = await loginUser(email, password); // Call the function

            // Store the JWT token in localStorage or sessionStorage based on rememberMe
            if (rememberMe) {
                localStorage.setItem('jwtToken', data.token); // Longer session (stored in localStorage)
            } else {
                sessionStorage.setItem('jwtToken', data.token); // Temporary session (stored in sessionStorage)
            }

            // Store user details
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('userType', data.userType);
            localStorage.setItem('email', data.email);
            localStorage.setItem('profilePicture', data.profilePicture);

            toast.success("Login successful!", { position: "top-center", autoClose: 1500 });

            // Update the AuthContext login state
            login(data.token); // Use login from context

            setTimeout(() => {
                navigate("/home");  // Redirect to home after successful login
            }, 1000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Invalid email or password!", { position: "top-center", autoClose: 1500 });
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
