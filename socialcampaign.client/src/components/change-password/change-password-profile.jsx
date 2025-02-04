import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../ChangeInfo/changeInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { changeUserPassword } from "../../services/userService";
import { AuthContext } from "../context/AuthContext"; // Import Auth Context

const ChangePasswordProfile = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext); // Access logout function from AuthContext

    // Get userId from localStorage
    const userId = localStorage.getItem("userId");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            toast.warn("Please fill in all fields!", { position: "top-center", autoClose: 1500 });
            return;
        }

        if (newPassword.length < 8) {
            toast.warn("Password must be at least 8 characters!", { position: "top-center", autoClose: 1500 });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.warn("Passwords do not match!", { position: "top-center", autoClose: 1500 });
            return;
        }

        try {
            // Call the backend service to change the password
            await changeUserPassword(userId, newPassword);
            toast.success("Password changed successfully! Logging you out...", { position: "top-center", autoClose: 1500 });

            // Wait a moment, then log out the user and redirect to login
            setTimeout(() => {
                logout(); // Clear session data
                navigate("/"); // Redirect to login page
            }, 2000);
        } catch (error) {
            toast.error(error.message || "Failed to change password.");
        }
    };

    return (
        <div className='info-container'>
            <ToastContainer />
            <div className='info-heading'>
                <h3>Change Password</h3>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="newPassword" className="mt-4">New Password</label>
                <div className="passwordFieldWrapper">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        className="form-control"
                        id="newPassword"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div className="passwordToggleIcon">
                        <FontAwesomeIcon
                            icon={showNewPassword ? faEyeSlash : faEye}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        />
                    </div>
                </div>

                <label htmlFor="confirmPassword" className="mt-3">Confirm Password</label>
                <div className="passwordFieldWrapper">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="passwordToggleIcon">
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </div>
                </div>

                <button type='submit' className="btn btn-primary mt-3">Save</button>
            </form>
        </div>
    );
};

export default ChangePasswordProfile;
