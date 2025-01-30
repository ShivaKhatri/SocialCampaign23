import React, { useState } from 'react';
import ChangeInfo from '../../Components/ChangeInfo/ChangeInfo';
import ChangePasswordProfile from '../../Components/change-password/change-password-profile';
import ProfilePicture from '../../Components/ProfilePicture/ProfilePicture';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './BusinessProfile.css';
import AdsManager from '../../components/AdsManager/AdsManager';
import BusinessStats from '../../components/BusinessStats/BusinessStats';



const BusinessProfile = () => {
  const [selectedOption, setSelectedOption] = useState('Change Info');

  return (
    <>
    <div className="business-profile">
    <div className="container business-profile-container mt-5">
      
      <div className="row gap-2 business-content-container "style={{flexWrap: 'nowrap'}}>
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
              className={`list-group-item list-element ${selectedOption === 'Manage Ads' ? 'active' : ''}`}
              onClick={() => setSelectedOption('Manage Ads')}
            >
              Manage Ads
            </li>
            <li
              className={`list-group-item list-element ${selectedOption === 'Statistics' ? 'active' : ''}`}
              onClick={() => setSelectedOption('Statistics')}
            >
              Statistics
            </li>
            <li
              className={`list-group-item list-element ${selectedOption === 'Change Password' ? 'active' : ''}`}
              onClick={() => setSelectedOption('Change Password')}
            >
              Change Password
            </li>
          </ul>
        </div>
        <div className="col-md-9"
        style={{
          height: selectedOption === 'Change Password' || selectedOption === 'Manage Ads' ? '100vh' : 'auto',
        }}  >
          {selectedOption === 'Change Info' && <ChangeInfo type='business' />}
          {selectedOption === 'Profile Picture' && <ProfilePicture />}
          {selectedOption === 'Manage Ads' && <AdsManager />}
          {selectedOption === 'Statistics' && <BusinessStats />}
          {selectedOption === 'Change Password' && <ChangePasswordProfile />}
   
          
        </div>
      </div>
    </div>
   
    </div>
     </>
  );
};

export default BusinessProfile;
