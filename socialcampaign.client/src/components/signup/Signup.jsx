import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();

        // Validation for empty fields
        if (!name || !email || !contactNumber || !password) {
            toast.warn("All fields are required!", {
                position: "top-center",
                autoClose: 1500,
            });
            return;
          
           
        }

        // Password validation
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must be at least 8 characters long and include a special character.", {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }

        // Success Toast
        toast.success("Sign-up successful!", {
            position: "top-center",
            autoClose: 1500,
        });
        setTimeout(() => {
            navigate("/");
        }, 1000);

        // Additional signup logic can go here
    };

    return (
        <div className="signUpCont">
            <ToastContainer />
            <div className="signUpCard">
                <div className="logoCard">
                    <h3 className="logo text-primary">Awareness App</h3>
                </div>
                <h3 className="signHead">Sign Up</h3>
                <form className="signUpForm mt-3" onSubmit={handleSignup}>
                    <div className="signUpFormCard">
                        <label htmlFor="name" className="fw-bold mb-1">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="form-control mb-3" 
                            name="name" 
                            autoComplete="on" 
                            placeholder="enter your name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        
                        <label htmlFor="email" className="mb-1 fw-bold">Email</label>
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
                        
                        <label htmlFor="contactNumber" className="fw-bold mb-1">Contact Number</label>
                        <input 
                            type="tel" 
                            id="contactNumber" 
                            className="form-control mb-3" 
                            name="contactNumber" 
                            autoComplete="on" 
                            placeholder="enter your contact number" 
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />

                        <label htmlFor="password" className="fw-bold mb-1">Password</label>
                        <div className="passwordFieldWrapper ">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                className="form-control mb-3" 
                                name="password" 
                                autoComplete="on" 
                                placeholder="enter password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="passwordToggleIcon mb-3">
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mb-3 mt-3">Sign Up</button>
                    </div>
                </form>
                <div className="loginButCard">
                    <span>Already have an Account? </span>
                    <Link to="/" className="link">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
