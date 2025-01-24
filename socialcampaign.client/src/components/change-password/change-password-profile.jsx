// ChangePassword.js
import React  from 'react';
import { useState } from 'react';
import { toast , ToastContainer } from 'react-toastify';

import '../ChangeInfo/changeInfo.css';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChangePasswordProfile = () => {
   const [newPassword, setNewPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [showNewPassword, setShowNewPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const handleSubmit = (e) => {
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
      
              toast.success("Password changed successfully!", { position: "top-center", autoClose: 1500 });
             
          };
      
  return (
    <div className='info-container'>
      <ToastContainer/>
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
                        placeholder="enter new password"
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
                        placeholder="confirm new password"
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

        <button type='submit'   className="btn btn-primary mt-3">Save</button>
      </form>
    </div>
  );
};
export default ChangePasswordProfile