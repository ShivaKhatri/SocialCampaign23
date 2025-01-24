import React, { useState } from 'react';
import ChangeInfo from '../../Components/ChangeInfo/ChangeInfo';
import ChangePasswordProfile from '../../Components/change-password/change-password-profile';
import ProfilePicture from '../../Components/ProfilePicture/ProfilePicture';
import Navbar from '../../Components/Navbar/Navbar';
import './UserProfile.css';
import Footer from '../../Components/Footer/Footer';



const UserProfile = () => {
  const [selectedOption, setSelectedOption] = useState('Change Info');

  return (
    <div className='profile-container'>
      <Navbar />
    <div className="container mt-5">
      
      <div className="row gap-2 profile-container "style={{flexWrap: 'nowrap'}}>
        <div className="col-md-3">
          <ul className="list-group list-options">
            <li
              className={`list-group-item list-element ${selectedOption === 'Change Info' ? 'active' : ''}`}
              onClick={() => setSelectedOption('Change Info')}
            >
              Change Info
            </li>
            <li
              className={`list-group-item list-element ${selectedOption === 'Profile Picture' ? 'active' : ''}`}
              onClick={() => setSelectedOption('Profile Picture')}
            >
              Profile Picture
            </li>
            <li
              className={`list-group-item list-element ${selectedOption === 'Change Password' ? 'active' : ''}`}
              onClick={() => setSelectedOption('Change Password')}
            >
              Change Password
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          {selectedOption === 'Change Info' && <ChangeInfo />}
          {selectedOption === 'Profile Picture' && <ProfilePicture />}
          {selectedOption === 'Change Password' && <ChangePasswordProfile />}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default UserProfile;
