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

    const validEmail = "salah@test.com";
    const validPassword = "password123";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warn("Please fill in all fields!", { position: "top-center", autoClose: 1500 });
            return;
        }

        if (email === validEmail && password === validPassword) {
            toast.success("Login successful!", { position: "top-center", autoClose: 1500 });
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        } else {
            toast.error("Invalid email or password!", { position: "top-center", autoClose: 1500 });
        }
    };

    return (
        <div className="loginCont">
            <ToastContainer />
            <div className="loginCard">
                <div className='logoCard'>
                    <h3 className='text-primary'>Awareness App</h3>
                </div>
                <h3 className='loginHead'>Login</h3>
                <form className='loginForm' onSubmit={handleLogin}>
                    <div className="loginFormCard">
                        <label htmlFor="email" className='mb-1 fw-bold'>Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-control mb-3" 
                            name="email" 
                            autoComplete="on" 
                            placeholder="enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <label htmlFor="password" className='mb-1 fw-bold'>Password</label>
                        <div className="passwordFieldWrapper mb-3">
                            <input 
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-control"
                                name="password"
                                autoComplete="on"
                                placeholder="enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="passwordToggleIcon">
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowPassword(!showPassword)}
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
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                <div className="signUpBut">
                    <span>Don't have an Account?</span>
                    <Link to="/signup" className="link">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
