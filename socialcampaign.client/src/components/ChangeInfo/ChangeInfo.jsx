import React, { useState } from 'react';
import './changeInfo.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeInfo = ({ type }) => {
  const [formData, setFormData] = useState(
    type === 'user'
      ? {
          firstName: '',
          lastName: '',
          email: '',
          contact: '',
        }
      : {
          businessName: '',
          email: '',
          contact: '',
          location: '',
          description: '',
        }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).every((value) => !value.trim());

    if (isEmpty) {
      toast.warn('No changes are made!', { position: 'top-center', autoClose: 1500 });
      return;
    }

    toast.success('Information changed successfully', { position: 'top-center', autoClose: 1500 });
    // Add further logic for saving the form data if necessary
  };

  return (
    <div className="info-container">
      <ToastContainer />
      <div className="info-heading">
        <h3>Change {type === 'user' ? 'Info' : 'Business Info'}</h3>
      </div>

      <form className="info-form" onSubmit={handleSubmit}>
        {type === 'user' ? (
          <>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                placeholder="Jon"
                className="form-control"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="form-control"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                placeholder="jon@gmail.com"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact Number</label>
              <input
                type="text"
                placeholder="1234589000"
                className="form-control"
                id="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label htmlFor="businessName" className="form-label">Business Name</label>
              <input
                type="text"
                placeholder="Your Business Name"
                className="form-control"
                id="businessName"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                placeholder="business@gmail.com"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact Number</label>
              <input
                type="text"
                placeholder="1234567890"
                className="form-control"
                id="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                placeholder="City, State"
                className="form-control"
                id="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                placeholder="Describe your business"
                className="form-control"
                id="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default ChangeInfo;
