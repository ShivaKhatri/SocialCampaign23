import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBusiness.css';
import { createBusiness } from '../../services/businessService';

const CreateBusiness = ({ userId, onBusinessCreated }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        BusinessName: '',
        Address: '',
        Phone: '',
        Email: '',
        Description: '',
    });

    const [errors, setErrors] = useState({});

    // Validate required fields
    const validateFields = () => {
        let newErrors = {};

        if (!formData.BusinessName.trim()) {
            newErrors.BusinessName = "Business Name is required.";
        } else if (formData.BusinessName.length > 100) {
            newErrors.BusinessName = "Business Name cannot exceed 100 characters.";
        }

        if (!formData.Address.trim()) {
            newErrors.Address = "Address is required.";
        } else if (formData.Address.length > 200) {
            newErrors.Address = "Address cannot exceed 200 characters.";
        }

        if (!formData.Phone.trim()) {
            newErrors.Phone = "Phone number is required.";
        } else if (!/^\d{10,15}$/.test(formData.Phone)) {
            newErrors.Phone = "Phone number must be between 10 and 15 digits.";
        }

        if (!formData.Email.trim()) {
            newErrors.Email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
            newErrors.Email = "Invalid email format.";
        }

        if (!formData.Description.trim()) {
            newErrors.Description = "Description is required.";
        } else if (formData.Description.length > 500) {
            newErrors.Description = "Description cannot exceed 500 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear error when user types
    };

  

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setErrors({ general: "User ID is required to create a business." });
            return;
        }

        if (!validateFields()) {
            return;
        }

        try {
            const newBusiness = await createBusiness({ ...formData, userId });
            onBusinessCreated(newBusiness);
            navigate('/business-profile');
        } catch (err) {
            setErrors({ general: err.message });
        }
    };

    return (
        <div className="create-business-container">
            <h2>Create a New Business</h2>
            {errors.general && <p className="error-message">{errors.general}</p>}
            <form onSubmit={handleSubmit} className="business-form" encType="multipart/form-data">
                <label>
                    Business Name:
                    <input type="text" name="BusinessName" value={formData.BusinessName} onChange={handleChange} required />
                    {errors.BusinessName && <span className="error-text">{errors.BusinessName}</span>}
                </label>

                <label>
                    Address:
                    <input type="text" name="Address" value={formData.Address} onChange={handleChange} required />
                    {errors.Address && <span className="error-text">{errors.Address}</span>}
                </label>

                <label>
                    Phone:
                    <input type="tel" name="Phone" value={formData.Phone} onChange={handleChange} required />
                    {errors.Phone && <span className="error-text">{errors.Phone}</span>}
                </label>

                <label>
                    Email:
                    <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />
                    {errors.Email && <span className="error-text">{errors.Email}</span>}
                </label>

                <label>
                    Description:
                    <textarea name="Description" value={formData.Description} onChange={handleChange} required />
                    {errors.Description && <span className="error-text">{errors.Description}</span>}
                </label>

              

                <button type="submit" className="submit-btn">Create Business</button>
            </form>
        </div>
    );
};

export default CreateBusiness;
