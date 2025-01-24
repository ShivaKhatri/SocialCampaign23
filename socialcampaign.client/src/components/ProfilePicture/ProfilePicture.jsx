// ProfilePicture.js
import React, { useState } from 'react';
import '../ChangeInfo/changeInfo.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-toastify/dist/ReactToastify.css';



const ProfilePicture = () => {
  const [image, setImage] = useState('https://placehold.co/180x180?text=profile'); // Default placeholder image
  const [initialImage, setInitialImage] = useState('https://placehold.co/180x180?text=profile');;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    } else {
      toast.error('Failed to load image. Please try again.');
    }
  };

  const handleSave = () => {
    console.log('save image worked')
    if (image === initialImage) {
  toast.warn("No changes are made!", { position: "top-center", autoClose: 1500 });
    
      console.log(' if of save image worked')
    } else {
     
      setInitialImage(image); // Update the initial image to the new one
      toast.success("Profile image changed successfully!", { position: "top-center", autoClose: 1500 });
    }
  };

  return (
    <div className='info-container'>
        <ToastContainer />
      <div className='info-heading'>
        <h3>Profile Picture</h3>
      </div>
      <div className='d-flex flex-column mt-4'>
        <img src={image} alt="Profile" className="img-thumbnail profile-image rounded-circle" />
        <label htmlFor="imageUpload" className="btn btn-link mt-3">Change Picture</label>
        <input
          id="imageUpload"
          type="file"
          className="form-control mt-3"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
      <button type="button" className="btn btn-primary mt-3" onClick={handleSave}>Save</button>
    </div>
  );
};

export default ProfilePicture;
