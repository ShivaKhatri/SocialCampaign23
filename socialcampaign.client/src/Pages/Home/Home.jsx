import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Campaign from '../../components/Campaign/Campaign';
import Advertisements from '../../components/Advertisement/Advertisement';
import './Home.css';

const Home = () => {
    const [user, setUser] = useState(null); // Mock user data
    const [campaigns, setCampaigns] = useState([]); // Mock campaigns

    useEffect(() => {
        // Mock user data
        const userData = {
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s',
            name: 'John Doe',
            email: 'john@example.com',
            bio: 'Enthusiast of environmental causes and tech.',
            location: 'California, USA',
            website: 'https://johndoe.com',
        };

        // Mock campaigns data
        const campaignsData = [
            {
                id: 1,
                title: 'Save the Forest',
                description: 'Join us to protect the forests!',
                imageUrl: 'http://parker-design.co.uk/assets/social-awareness-campaign-3.jpg',
                startDate: '2025-01-01',
                endDate: '2025-06-01',
                likes: 120,
                comments: [
                    { username: 'Alice', text: 'I love this campaign!', likes: 5 },
                    { username: 'Bob', text: 'Count me in!', likes: 3 },
                ],
            },
            {
                id: 2,
                title: 'Clean the Oceans',
                description: 'Help us clean the oceans.',
                imageUrl: 'https://images.squarespace-cdn.com/content/v1/5bf6028b266c07c1f750e3be/1543200972690-UJ768YYCF3U5RFU6QIMG/magazine_mockup_2',
                startDate: '2025-02-01',
                endDate: '2025-07-01',
                likes: 80,
                comments: [
                    { username: 'Charlie', text: 'This is so important!', likes: 10 },
                    { username: 'David', text: 'Great initiative!', likes: 2 },
                ],
            },
        ];

        setUser(userData);
        setCampaigns(campaignsData);
    }, []);

    return (
        <div className="home-container">
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    {/* Left side: Fixed Profile */}
                    <div className="col-md-3 profile-col">
                        <div className="profile-section">
                            <div className="profile-header">
                                <img src={user?.profilePicture} alt="Profile" className="profile-picture" />
                                <div className="profile-info">
                                    <h2 className="profile-name">{user?.name}</h2>
                                    <p className="profile-bio">{user?.bio}</p>
                                </div>
                            </div>
                            <div className="profile-details">
                                <ul className="profile-list">
                                    <li><strong>Email:</strong> {user?.email}</li>
                                    <li><strong>Location:</strong> {user?.location}</li>
                                    <li><strong>Website:</strong> <a href={user?.website} target="_blank" rel="noopener noreferrer">{user?.website}</a></li>
                                </ul>
                                <div className="profile-buttons">
                                    <button className="btn btn-primary">View Profile</button>
                                    <button className="btn btn-secondary">View Liked Campaigns</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle: Campaigns Section */}
                    <div className="col-md-6 campaigns-col">
                        <div className="campaigns-section">
                            {campaigns.map((campaign) => (
                                <Campaign key={campaign.id} campaign={campaign} />
                            ))}
                        </div>
                    </div>

                    {/* Right side: Advertisements */}
                    <div className="col-md-3 ads-col">
                        <Advertisements />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
