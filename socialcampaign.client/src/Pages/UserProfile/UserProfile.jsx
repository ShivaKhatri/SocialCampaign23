// src/components/UserProfile/UserProfile.jsx

import React, { useState, useEffect } from "react";
import ChangeInfo from '../../components/ChangeInfo/ChangeInfo';
import ChangePasswordProfile from '../../components/change-password/change-password-profile';
import Profile from '../../components/Profile/Profile';
import CreateCampaign from '../../components/campaign/CreateCampaign'; // Adjust the path as needed
import './UserProfile.css';
import { getUserById } from "../../services/userService";
import { getCampaignsByCreator } from "../../services/campaignService";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [userError, setUserError] = useState(null);
    const [campaignError, setCampaignError] = useState(null);
    const [selectedOption, setSelectedOption] = useState('Profile');
    // This state is used to pass the active tab to Profile.
    const [activeProfileTab, setActiveProfileTab] = useState("profile");

    // Fetch user data on mount.
    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getUserById(localStorage.getItem("userId"));
                setUser(data);
            } catch (error) {
                setUserError(error.message);
            }
        }
        fetchUser();
    }, []);

    // Once the user is loaded, fetch the campaigns for that user.
    useEffect(() => {
        // If your user object includes a property such as "userId".
        if (user && user.userId) {
            async function fetchCampaigns() {
                try {
                    const data = await getCampaignsByCreator(user.userId);
                    setCampaigns(data);
                } catch (error) {
                    setCampaignError(error.message);
                }
            }
            fetchCampaigns();
        }
    }, [user]);

    if (userError) {
        return <div>Error: {userError}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    // Construct userData similar to what you already do.
    const userData = {
        id: user.userId, // Ensure your user object has a unique id (e.g. userId)
        profilePicture: `${__API_BASE_URL__}${user.profilePicture}`,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email,
        joined: user.createdAt,
    };

    return (
        <div className='profile-container'>
            <div className="container mt-5">
                <div className="row gap-2 profile-container" style={{ flexWrap: 'nowrap' }}>
                    <div className="col-md-3">
                        <ul className="list-group list-options">
                            <li
                                className={`list-group-item list-element ${selectedOption === 'Profile' ? 'active' : ''}`}
                                onClick={() => setSelectedOption('Profile')}
                            >
                                Profile
                            </li>
                            <li
                                className={`list-group-item list-element ${selectedOption === 'Change Info' ? 'active' : ''}`}
                                onClick={() => setSelectedOption('Change Info')}
                            >
                                Change Info
                            </li>
                            <li
                                className={`list-group-item list-element ${selectedOption === 'Change Password' ? 'active' : ''}`}
                                onClick={() => setSelectedOption('Change Password')}
                            >
                                Change Password
                            </li>
                            <li
                                className={`list-group-item list-element ${selectedOption === 'Create Campaign' ? 'active' : ''}`}
                                onClick={() => setSelectedOption('Create Campaign')}
                            >
                                Create Campaign
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        {selectedOption === 'Profile' && (
                            <Profile
                                user={userData}
                                campaigns={campaigns}  // Pass the fetched campaigns here.
                                activeTab={activeProfileTab}
                            />
                        )}
                        {selectedOption === 'Change Info' && <ChangeInfo type={'user'} />}
                        {selectedOption === 'Change Password' && <ChangePasswordProfile />}
                        {selectedOption === 'Create Campaign' && (
                            <CreateCampaign onCampaignCreated={() => {
                                // When a campaign is created, switch back to the Profile view with the "campaigns" tab active.
                                setSelectedOption("Profile");
                                setActiveProfileTab("campaigns");
                                // Optionally, refresh the campaigns by fetching them again.
                                if (user && user.userId) {
                                    getCampaignsByCreator(user.userId)
                                        .then(data => setCampaigns(data))
                                        .catch(err => console.error(err));
                                }
                            }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
