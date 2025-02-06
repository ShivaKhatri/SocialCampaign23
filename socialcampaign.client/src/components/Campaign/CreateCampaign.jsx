// src/Components/campaign/CreateCampaign.jsx

import React, { useState } from 'react';
import './CreateCampaign.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCampaign } from '../../services/campaignService';

const CreateCampaign = ({ onCampaignCreated }) => {
    // Use strings for date fields in YYYY-MM-DD format
    const [formData, setFormData] = useState({
        Title: '',
        Description: '',
        StartDate: '',
        EndDate: ''
    });
    const [campaignPicture, setCampaignPicture] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCampaignPicture(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (
            !formData.Title.trim() ||
            !formData.Description.trim() ||
            !formData.StartDate.trim() ||
            !formData.EndDate.trim()
        ) {
            toast.warn('All fields are required!', { position: 'top-center', autoClose: 1500 });
            return;
        }

        // Convert date strings to Date objects for comparison
        const start = new Date(formData.StartDate);
        const end = new Date(formData.EndDate);
        if (start >= end) {
            toast.error('Start date must be before End date!', { position: 'top-center', autoClose: 1500 });
            return;
        }

        // Build FormData to send to the backend
        const dataToSend = new FormData();
        dataToSend.append('Title', formData.Title);
        dataToSend.append('Description', formData.Description);
        // The dates are already in YYYY-MM-DD format from the native date input
        dataToSend.append('StartDate', formData.StartDate);
        dataToSend.append('EndDate', formData.EndDate);

        // Append the CreatedById from localStorage (if available)
       
        dataToSend.append('CreatedById', localStorage.getItem("userId"));
        

        if (campaignPicture) {
            dataToSend.append('CampaignPicture', campaignPicture);
        }

        try {
            await createCampaign(dataToSend);
            toast.success('Campaign created successfully!', { position: 'top-center', autoClose: 1500 });
            // Call the callback to notify the parent that the campaign was created.
            if (onCampaignCreated) {
                onCampaignCreated();
            }
        } catch (error) {
            toast.error(error.message || 'Failed to create campaign', { position: 'top-center', autoClose: 1500 });
        }
    };

    return (
        <div className="info-container">
            <ToastContainer />
            <div className="info-heading">
                <h3>Create Campaign</h3>
            </div>
            <form className="info-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">Title</label>
                    <input
                        type="text"
                        placeholder="Enter campaign title"
                        className="form-control"
                        id="Title"
                        value={formData.Title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <textarea
                        placeholder="Enter campaign description"
                        className="form-control"
                        id="Description"
                        rows="4"
                        value={formData.Description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="StartDate" className="form-label">Start Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="StartDate"
                        value={formData.StartDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="EndDate" className="form-label">End Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="EndDate"
                        value={formData.EndDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="CampaignPicture" className="form-label">Campaign Picture</label>
                    <input
                        type="file"
                        className="form-control"
                        id="CampaignPicture"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Campaign</button>
            </form>
        </div>
    );
};

export default CreateCampaign;
