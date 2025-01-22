import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgot-password.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleVerify = () => {
        if (!email) {
            toast.warn("Please enter your email!", { position: "top-center", autoClose: 1500 });
            return;
        }

        // Dummy email verification check
        if (email === "salah@test.com") {
            toast.success("Email verified!", { position: "top-center", autoClose: 1500 });
            setTimeout(() => {
                navigate("/change-password");
            }, 1000);
        } else {
            toast.warn("Email not found!", { position: "top-center", autoClose: 1500 });
        }
    };

    return (
        <div className="forgotPasswordCont">
            <ToastContainer />
         
            <div className="form-group">
            <div className='logoCard'>
                    <h3 className='text-primary'>Awareness App</h3>
                </div>
            <h4 className="mb-4 text-center">Verify Email</h4>
                <label htmlFor="email">Enter your email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button onClick={handleVerify} className="btn btn-primary mt-4">Verify</button>
            </div>
        </div>
    );
};

export default ForgotPassword;
