import React, { useState, useEffect } from "react";
import ChangeInfo from '../../Components/ChangeInfo/ChangeInfo';
import ChangePasswordProfile from '../../Components/change-password/change-password-profile';
import Profile from '../../components/Profile/Profile';
import './UserProfile.css';
import { getUserById } from "../../services/userService";

const UserProfile = () => {
    const [user, setUser] = useState(null); // Use a single user object
    const [selectedOption, setSelectedOption] = useState('Profile');
    const [userError, setUserError] = useState(null);

    useEffect(() => {
        // Fetch User
        async function fetchUser() {
            try {
                const data = await getUserById(localStorage.getItem("userId"));
                setUser(data); // Set the user state with fetched data
            } catch (error) {
                setUserError(error.message);  // Set error for users
            }
        }
        fetchUser();
    }, []);

    if (userError) {
        return <div>Error: {userError}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    const userData = {
        profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s",
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
                        </ul>
                    </div>
                    <div className="col-md-9">
                        {selectedOption === 'Profile' && <Profile user={userData} />}
                        {selectedOption === 'Change Info' && <ChangeInfo type={'user'} />}
                        {selectedOption === 'Change Password' && <ChangePasswordProfile />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
