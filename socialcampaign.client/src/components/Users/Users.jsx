import React, { useState, useEffect } from "react";
import './Users.css';
import { getAllUsers } from "../../services/userService";
import { getAllBusinessAds } from "../../services/businessAdService";
import { getAllCampaigns } from "../../services/campaignService"; // Import the campaign service

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [ads, setAds] = useState([]);
    const [campaigns, setCampaigns] = useState([]); // State for campaigns
    const [userError, setUserError] = useState("");  // Separate error state for users
    const [adsError, setAdsError] = useState("");    // Separate error state for ads
    const [campaignError, setCampaignError] = useState(""); // Separate error state for campaigns

    useEffect(() => {
        // Fetch Users
        async function fetchUsers() {
            try {
                const data = await getAllUsers();
                setUsers(data); // Set the users state with fetched data
            } catch (error) {
                setUserError(error.message);  // Set error for users
            }
        }

        // Fetch Business Ads
        async function fetchAds() {
            try {
                const data = await getAllBusinessAds();
                setAds(data);  // Set the ads state with fetched data
            } catch (error) {
                setAdsError(error.message);  // Set error for business ads
            }
        }

        // Fetch Campaigns
        async function fetchCampaigns() {
            try {
                const data = await getAllCampaigns();
                setCampaigns(data);  // Set the campaigns state with fetched data
            } catch (error) {
                setCampaignError(error.message);  // Set error for campaigns
            }
        }

        fetchUsers();
        fetchAds();
        fetchCampaigns(); // Fetch campaigns when component mounts
    }, []);  // Empty dependency array ensures this runs once when the component mounts

    const userContents = userError ? (
        <div>Errors with Users: {userError}</div>
    ) : users.length === 0 ? (
        <p><em>Loading Users... Please refresh once the ASP.NET backend has started.</em></p>
    ) : (
        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const adsContents = adsError ? (
        <div>Errors with Business Ads: {adsError}</div>
    ) : ads.length === 0 ? (
        <p><em>Loading Ads... Please refresh once the ASP.NET backend has started.</em></p>
    ) : (
        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Ad ID</th>
                    <th>Campaign ID</th>
                    <th>Description</th>
                    <th>ImagePath</th>
                </tr>
            </thead>
            <tbody>
                {ads.map(ad => (
                    <tr key={ad.businessId}>
                        <td>{ad.businessId}</td>
                        <td>{ad.campaignId}</td>
                        <td>{ad.adDescription}</td>
                        <td>{ad.imagePath}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const campaignContents = campaignError ? (
        <div>Errors with Campaigns: {campaignError}</div>
    ) : campaigns.length === 0 ? (
        <p><em>Loading Campaigns... Please refresh once the ASP.NET backend has started.</em></p>
    ) : (
        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Campaign ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Approved</th>
                    <th>Image Path</th>
                </tr>
            </thead>
            <tbody>
                {campaigns.map(campaign => (
                    <tr key={campaign.campaignId}>
                        <td>{campaign.campaignId}</td>
                        <td>{campaign.title}</td>
                        <td>{campaign.description}</td>
                        <td>{new Date(campaign.createdAt).toLocaleDateString()}</td>
                        <td>{campaign.approved ? "Yes" : "No"}</td>
                        <td>{campaign.imagePath}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div>
            <div className="d-flex users flex-column items-center justify-center">
                <h1 id="tableLabel">User List</h1>
                {userContents}

                <h1 id="tableLabel">Business Ads List</h1>
                {adsContents}

                <h1 id="tableLabel">Campaign List</h1>
                {campaignContents}
            </div>
        </div>
    );
};

export default UserList;
