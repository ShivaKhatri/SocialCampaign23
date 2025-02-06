import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangeInfo from '../../components/ChangeInfo/ChangeInfo';
import ChangePasswordProfile from '../../components/change-password/change-password-profile';
import './BusinessProfile.css';
import AdsManager from '../../components/AdsManager/AdsManager';
import BusinessStats from '../../components/BusinessStats/BusinessStats';
import BusinessList from '../../components/BusinessList/BusinessList';
import CreateBusiness from '../../components/CreateBusiness/CreateBusiness';
import { getBusinesses } from '../../services/businessService';

const BusinessProfile = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);
    const [showCreateBusiness, setShowCreateBusiness] = useState(false); // NEW STATE FOR CREATE FORM
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) {
            console.error("ERROR: User ID is required to fetch businesses.");
            setLoading(false);
            return;
        }

        console.log(`Fetching businesses for user ID: ${userId}`);

        getBusinesses(userId)
            .then((data) => {
                console.log("Businesses fetched successfully:", data);
                setBusinesses(data || []); // Ensure it's an array
            })
            .catch((error) => {
                console.error("ERROR fetching businesses:", error);
            })
            .finally(() => {
                console.log("Finished fetching businesses. Setting loading to false.");
                setLoading(false);
            });

    }, [userId]);

    const handleBusinessUpdateSuccess = () => {
        setSelectedBusinessId(null); // Return to business list view
        getBusinesses(userId)
            .then(updatedBusinesses => {
                setBusinesses(updatedBusinesses); // Update list with latest data
            })
            .catch(error => console.error("ERROR updating business list:", error));
    };


    // Function to handle selecting a business
    const handleSelectBusiness = (businessId) => {
        setSelectedBusinessId(businessId);
        setShowCreateBusiness(false); // Hide CreateBusiness form when selecting a business
        setSelectedOption("Change Info");
    };

    const handleBusinessCreated = async (newBusiness) => {
        setBusinesses(prevBusinesses => [...prevBusinesses, newBusiness]); // Add new business to list
        setShowCreateBusiness(false); // Hide form after creating a business

        try {
            const updatedBusinesses = await getBusinesses(userId); // Fetch updated list from API
            setBusinesses(updatedBusinesses);
        } catch (error) {
            console.error("ERROR fetching updated business list:", error);
        }
    };

    // Function to handle clicking "Create a Business"
    const handleShowCreateBusiness = async () => {
        setShowCreateBusiness(true);
        setSelectedBusinessId(null); // Hide business dashboard

        try {
            const updatedBusinesses = await getBusinesses(userId); // Fetch updated business list
            setBusinesses(updatedBusinesses);
        } catch (error) {
            console.error("ERROR fetching updated business list:", error);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="business-profile">
            <div className="container business-profile-container mt-5">
                {showCreateBusiness ? (
                    <CreateBusiness userId={userId} onBusinessCreated={handleBusinessCreated} />
                ) : selectedBusinessId ? (
                    <div>
                        <div className="row gap-2 business-content-container" style={{ flexWrap: 'nowrap' }}>
                            <div className="col-md-3">
                                <ul className="list-group list-options">
                                    <li
                                        className={`list-group-item list-element ${selectedOption === 'Change Info' ? 'active' : ''}`}
                                        onClick={() => setSelectedOption('Change Info')}
                                    >
                                        Change Info
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
                                            className={`list-group-item list-element back-to-list ${selectedOption === 'back' ? 'active' : ''}`}
                                            onClick={() => setSelectedBusinessId(null)}
                                        >
                                            <i className="bi bi-arrow-left-circle"></i> Back to Business List
                                        </li>


                                 
                                </ul>
                            </div>
                            <div
                                className="col-md-9"
                               
                                >
                                    {selectedOption === 'Change Info' && <ChangeInfo
                                        type="business"
                                        businessId={selectedBusinessId}
                                        onUpdateSuccess={handleBusinessUpdateSuccess}
                                    />}
                                {selectedOption === 'Manage Ads' && <AdsManager businessId={selectedBusinessId} />}
                                    {selectedOption === 'Statistics' && <BusinessStats businessId={selectedBusinessId} />}
                                    {selectedOption === 'back' && <ChangeInfo businessId={selectedBusinessId} />}

                            </div>
                        </div>
                    </div>
                ) : (
                  <BusinessList businesses={businesses} onSelectBusiness={handleSelectBusiness} onCreateBusiness={handleShowCreateBusiness} />

                )}

              
            </div>
        </div>
    );
};

export default BusinessProfile;
