// src/Components/Profile/Profile.jsx

import React, { useState, useEffect } from "react";
import { Tabs, Tab, Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
// Import your delete, update, and create services
import { deleteCampaign, updateCampaign } from "../../services/campaignService";

const Profile = ({ user, campaigns: campaignsProp = [], activeTab = "profile" }) => {
    // Initialize the active tab key based on the prop
    const [activeKey, setActiveKey] = useState(activeTab);

    // When the activeTab prop changes, update the internal activeKey state.
    useEffect(() => {
        setActiveKey(activeTab);
    }, [activeTab]);

    // Profile image state
    const [image, setImage] = useState(`${user.profilePicture}`);
    const [initialImage, setInitialImage] = useState(image);
    const [showModal, setShowModal] = useState(false);

    // Use the campaigns passed as a prop. If none are provided, start with an empty array.
    const [campaignList, setCampaignList] = useState(campaignsProp);

    // Update campaignList whenever campaignsProp changes.
    useEffect(() => {
        setCampaignList(campaignsProp);
    }, [campaignsProp]);

    // State for the "View Campaign" modal (for show more)
    const [viewCampaign, setViewCampaign] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Other state variables for followed causes and notifications
    const [followedCauses, setFollowedCauses] = useState([
        {
            id: 4,
            image: "https://placehold.co/400?text=Clean+Water",
            title: "Clean Water",
            description: "Ensuring clean water for everyone.",
        },
    ]);
    const [notifications, setNotifications] = useState([
        { id: 1, title: "New Campaign", details: "A new campaign has been added." },
        { id: 2, title: "Campaign Update", details: "The campaign 'Save the Earth' has been updated." },
    ]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);

    // Handlers for profile image (for user profile, not campaign)
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        } else {
            toast.error("Failed to load image. Please try again.");
        }
    };

    const handleSaveImage = () => {
        if (image === initialImage) {
            toast.warn("No changes are made!", { position: "top-center", autoClose: 1500 });
        } else {
            setInitialImage(image);
            toast.success("Profile image changed successfully!", { position: "top-center", autoClose: 1500 });
        }
    };

    // Handler for opening the detail modal when "Show More" is clicked
    const handleShowMore = (campaign) => {
        setViewCampaign(campaign);
        setShowDetailModal(true);
    };

    // Handler for editing a campaign (can be reused for both modals)
    const handleEditCampaign = (campaign) => {
        setSelectedCampaign(campaign);
        setShowModal(true);
    };

    const handleCampaignChange = (e) => {
        const { name, value } = e.target;
        setSelectedCampaign((prev) => ({ ...prev, [name]: value }));
    };

    // **********************
    // UPDATED: Image Upload for Campaign Update
    // Instead of immediately uploading the file,
    // we store the file in the selectedCampaign state.
    // **********************
    const handleCampaignImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Immediately show a local preview.
            const previewUrl = URL.createObjectURL(file);
            // Save both the preview URL and the actual file.
            setSelectedCampaign((prev) => ({ ...prev, image: previewUrl, file }));
        } else {
            toast.error("Failed to upload the image. Please try again.");
        }
    };
    // **********************

    // Updated saveCampaign function that builds a FormData object and calls the updateCampaign service.
    const saveCampaign = async () => {
        const { title, description, image, id, file } = selectedCampaign;
        const startDate = selectedCampaign.startDate;
        const endDate = selectedCampaign.endDate;

        if (!title || !description || !image || !startDate || !endDate) {
            toast.error("All fields are required. Changes are not saved.", {
                position: "top-center",
                autoClose: 1500,
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("Title", title);
            formData.append("Description", description);
            formData.append("StartDate", startDate);
            formData.append("EndDate", endDate);

            if (file) {
                formData.append("CampaignPicture", file);
            }
            formData.append("CampaignId", id);

            // Call update API
            const updatedCampaignResponse = await updateCampaign(id, formData);

            // Force image reload by appending a timestamp
            const updatedCampaign = {
                ...updatedCampaignResponse,
                image: `${updatedCampaignResponse.CampaignPicture}?t=${Date.now()}`,  // <- Cache Buster
            };

            // Update the state list
            setCampaignList((prev) =>
                prev.map((c) => (c.id === id ? updatedCampaign : c))
            );

            toast.success("Campaign updated successfully!", {
                position: "top-center",
                autoClose: 1500,
            });
        } catch (error) {
            toast.error("Failed to update campaign. Please try again.", {
                position: "top-center",
                autoClose: 1500,
            });
        }
        setShowModal(false);
    };




    const handleUnfollowCause = (causeId) => {
        setFollowedCauses((prev) => prev.filter((cause) => cause.id !== causeId));
        toast.success("Unfollowed the cause successfully!", {
            position: "top-center",
            autoClose: 1500,
        });
    };

    const openNotificationDetails = (notification) => {
        setSelectedNotification(notification);
    };

    // Delete campaign handler with confirmation
    const handleDeleteCampaign = async (campaignId) => {
        if (window.confirm("Are you sure you want to delete this campaign?")) {
            try {
                await deleteCampaign(campaignId);
                setCampaignList((prev) => prev.filter((c) => c.id !== campaignId));
                toast.success("Campaign deleted successfully!", { position: "top-center", autoClose: 1500 });
                setShowDetailModal(false);
            } catch (error) {
                toast.error("Failed to delete campaign", { position: "top-center", autoClose: 1500 });
            }
        }
    };
    useEffect(() => {
        setCampaignList(campaignsProp.map(campaign => ({
            ...campaign,
            image: `${campaign.image}?t=${Date.now()}`
        })));
    }, [campaignsProp]);
    // For description truncation
    const descriptionThreshold = 100;

    return (
        <div className="info-container">
            <ToastContainer />
            <div className="info-heading">
                <h3>Profile</h3>
            </div>

            <Tabs
                activeKey={activeKey}
                onSelect={(k) => setActiveKey(k)}
                id="profile-tabs"
                className="mt-4"
            >
                {/* Profile Tab */}
                <Tab eventKey="profile" title="Profile">
                    <div className="tab-pane fade show active mt-4">
                        <div className="d-flex flex-column">
                            <img src={image} alt="Profile" className="img-thumbnail profile-image rounded-circle" />
                            <label htmlFor="imageUpload" className="btn btn-link mt-1" style={{ fontSize: "14px" }}>
                                Change Picture
                            </label>
                            <input
                                id="imageUpload"
                                type="file"
                                className="form-control mt-1"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </div>
                        <div className="profile-section">
                            <h2 className="profile-name">{user.name}</h2>
                            <ul className="profile-list">
                                <li><strong>Email:</strong> {user.email}</li>
                                <li><strong>Joined:</strong> {user.joined}</li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSaveImage}>
                            Save
                        </button>
                    </div>
                </Tab>

                {/* Campaigns Tab */}
                <Tab eventKey="campaigns" title="My Campaigns">
                    <div className="campaigns-list mt-4">
                        {campaignList.length > 0 ? (
                            campaignList.map((campaign) => {
                                const isLong = campaign.description.length > descriptionThreshold;
                                const truncatedDescription = isLong
                                    ? campaign.description.substring(0, descriptionThreshold) + "..."
                                    : campaign.description;
                                return (
                                    <div key={campaign.id} className="card mb-3" style={{ minHeight: "180px" }}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img
                                                    src={campaign.image}
                                                    className="myCampaign-image img-fluid rounded-start"
                                                    alt={campaign.title}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{campaign.title}</h5>
                                                    <p className="card-text">
                                                        {truncatedDescription}
                                                        {isLong && (
                                                            <span
                                                                className="text-primary"
                                                                style={{ cursor: "pointer", marginLeft: "5px" }}
                                                                onClick={() => handleShowMore(campaign)}
                                                            >
                                                                Show more
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="card-text">
                                                        <small className="text-muted">
                                                            Start: {campaign.startDate} | End: {campaign.endDate}
                                                        </small>
                                                    </p>
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={() => handleEditCampaign(campaign)}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center">No campaigns found.</p>
                        )}
                    </div>
                </Tab>

                {/* Followed Causes Tab */}
                <Tab eventKey="followed-causes" title="Followed Causes">
                    <div className="followed-causes mt-4">
                        {followedCauses.length > 0 ? (
                            followedCauses.map((cause) => (
                                <div key={cause.id} className="card mb-3" style={{ height: "180px" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img
                                                src={cause.image}
                                                className="myCampaign-image img-fluid rounded-start"
                                                alt={cause.title}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{cause.title}</h5>
                                                <p className="card-text">{cause.description}</p>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => handleUnfollowCause(cause.id)}
                                                >
                                                    Unfollow
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">You are not following any causes.</p>
                        )}
                    </div>
                </Tab>

                {/* Notifications Tab */}
                <Tab eventKey="notifications" title="Notifications">
                    <div className="notifications mt-4">
                        {notifications.length > 0 ? (
                            <ul className="list-group">
                                {notifications.map((notification) => (
                                    <li
                                        key={notification.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        onClick={() => openNotificationDetails(notification)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {notification.title}
                                        <span className="badge bg-primary rounded-pill">Details</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center">No notifications available.</p>
                        )}
                    </div>
                </Tab>
            </Tabs>

            {/* Modal for Viewing Campaign Details (with Edit and Delete options) */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{viewCampaign?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {viewCampaign && (
                        <>
                            <img
                                src={viewCampaign.image}
                                alt={viewCampaign.title}
                                className="img-fluid mb-3"
                            />
                            <p>{viewCampaign.description}</p>
                            <p>
                                <small className="text-muted">
                                    Start: {viewCampaign.startDate} | End: {viewCampaign.endDate}
                                </small>
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            // Switch to edit mode for this campaign
                            setSelectedCampaign(viewCampaign);
                            setShowDetailModal(false);
                            setShowModal(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            handleDeleteCampaign(viewCampaign.id);
                        }}
                    >
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Editing Campaign */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Campaign</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCampaign && (
                        <Form>
                            <Form.Group controlId="campaignTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={selectedCampaign.title}
                                    onChange={handleCampaignChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="campaignDescription" className="mt-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={selectedCampaign.description}
                                    onChange={handleCampaignChange}
                                />
                            </Form.Group>
                            {/* New fields for StartDate and EndDate */}
                            <Form.Group controlId="campaignStartDate" className="mt-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={selectedCampaign.startDate ? selectedCampaign.startDate.split("T")[0] : ""}
                                    onChange={handleCampaignChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="campaignEndDate" className="mt-3">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    value={selectedCampaign.endDate ? selectedCampaign.endDate.split("T")[0] : ""}
                                    onChange={handleCampaignChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="campaignImage" className="mt-3">
                                <Form.Label>Image</Form.Label>
                                <div>
                                    <img
                                        src={selectedCampaign.image}
                                        alt="Campaign Preview"
                                        className="img-thumbnail mb-3"
                                        style={{ maxWidth: "100%" }}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCampaignImageUpload}
                                        className="form-control"
                                    />
                                </div>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveCampaign}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Viewing Notification Details */}
            <Modal show={selectedNotification !== null} onHide={() => setSelectedNotification(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedNotification?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{selectedNotification?.details}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSelectedNotification(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Profile;
