import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./change-password.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { changeUserPassword } from "../../services/userService";
import { AuthContext } from "../context/AuthContext"; // Import Auth Context

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext); // Access logout function from context

    // Get userId from localStorage
    const userId = localStorage.getItem("userId");

    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            toast.warn("Please fill in all fields!", { position: "top-center", autoClose: 1500 });
            return;
        }

        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters!", { position: "top-center", autoClose: 1500 });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!", { position: "top-center", autoClose: 1500 });
            return;
        }

        try {
            await changeUserPassword(userId, newPassword);
            toast.success("Password changed successfully! Logging you out...", { position: "top-center", autoClose: 1500 });

            setTimeout(() => {
                logout(); // Log out the user
                navigate("/"); // Redirect to login page
            }, 200);
        } catch (error) {
            toast.error(error.message || "Failed to change password.");
        }
    };

    return (
        <div className="changePasswordCont">
            <ToastContainer />
            <div className="form-group">
                <div className='logoCard'>
                    <h3 className='text-primary'>Awareness App</h3>
                </div>
                <h4 className="text-center fs-4 mb-4">Change Password</h4>

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

                <button onClick={handleChangePassword} className="btn btn-primary mt-3">
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default ChangePassword;
