import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Campaign from '../../components/Campaign/Campaign';
import Advertisements from '../../components/Advertisement/Advertisement';
import './Home.css';
import HeroSection from '../../components/HeroSection/HeroSection';
import { getApprovedCampaigns } from '../../services/campaignService';
import { getApprovedAds } from '../../services/businessAdService';

const Home = () => {
    const [user, setUser] = useState(null);
    const [campaigns, setCampaigns] = useState([]);
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const campaignsData = await getApprovedCampaigns();
                const adsData = await getApprovedAds();

                console.log("Fetched Campaigns:", campaignsData);
                console.log("Fetched Ads:", adsData); // Debugging log

                setCampaigns(campaignsData);
                setAds(adsData);
            } catch (error) {
                console.error('Failed to fetch approved campaigns or ads:', error);
            }
        };


        // Mock user data
        const userData = {
            profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s',
            name: 'John Doe',
            email: 'john@example.com',
            bio: 'Enthusiast of environmental causes and tech.',
            location: 'California, USA',
            website: 'https://johndoe.com',
        };

        setUser(userData);

        fetchData();
    }, []);

    return (
        <div className="home-container">
            <HeroSection />
            <div className="container-fluid">
                <div className='home-content'>

                    {/* Middle: Campaigns Section */}
                    <div className="campaigns-col">
                        <div className="campaigns-section">
                            {campaigns.length > 0 ? (
                                campaigns.map((campaign) => (
                                    <Campaign key={campaign.id} campaignData={campaign} />
                                ))
                            ) : (
                                <p>No approved campaigns available.</p>
                            )}
                        </div>
                    </div>

                    {/* Right side: Advertisements */}
                    <div className="ads-container">
                        {ads.length > 0 ? <Advertisements ads={ads} /> : <p>No approved ads available.</p>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;
