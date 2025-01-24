// ChangeInfo.js
import React, { useState } from 'react';
import './changeInfo.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ChangeInfo = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, contact } = formData;

    if (!firstName && !lastName && !email && !contact) {
      toast.warn('No changes are made!',{ position: "top-center", autoClose: 1500 });
      return;
    }

    toast.success('Information changed successfully',{ position: "top-center", autoClose: 1500 });
    // Add further logic for saving the form data if necessary
  };

  return (
    <div className='info-container'>
      <ToastContainer/>
      <div className='info-heading'>
        <h3>Change Info</h3>
      </div>

      <form className="info-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            placeholder='Jon'
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
            placeholder='Doe'
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
            placeholder='jone@gmail.com'
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
            placeholder='1234589000'
            className="form-control"
            id="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default ChangeInfo;
