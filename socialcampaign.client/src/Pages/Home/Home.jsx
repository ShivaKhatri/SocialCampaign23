import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Campaign from '../../components/Campaign/Campaign';
import Advertisements from '../../components/Advertisement/Advertisement';
import './Home.css';
import HeroSection from '../../components/HeroSection/HeroSection';

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
                description: 'Forests are the lifeline of our planet, acting as the lungs of the Earth by providing us with oxygen, storing carbon, and maintaining the balance of our ecosystem. They are home to countless species of plants and animals, safeguarding biodiversity and sustaining life. Beyond their ecological importance, forests offer us clean water, fertile soil, and natural resources that support livelihoods and economies. However, deforestation and human activities are rapidly depleting this invaluable resource.',
                imageUrl: 'http://parker-design.co.uk/assets/social-awareness-campaign-3.jpg',
                owner:'John Doe',
                ownerImg:'https://placehold.co/40',
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
                owner:'John Doe',
                ownerImg:'https://placehold.co/40',
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
            <HeroSection/>
            <div className="container-fluid">
                
                <div className='home-content' >
                    {/* Left side: Fixed Profile */}
                    {/* <div className="col-md-3 profile-col">
                       
                    </div> */}

                    {/* Middle: Campaigns Section */}
                    <div className=" campaigns-col">
                        <div className="campaigns-section">
                            {campaigns.map((campaign) => (
                                <Campaign key={campaign.id} campaign={campaign} />
                            ))}
                        </div>
                    </div>

                    {/* Right side: Advertisements */}
                    <div className="ads-container">
                        <Advertisements />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
