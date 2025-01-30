import React, { useState, useEffect } from "react";
import { Tabs, Tab, Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";

const Profile = ({ user }) => {

  
  const [image, setImage] = useState(
    "https://placehold.co/180x180?text=profile"
  );
  const [initialImage, setInitialImage] = useState(image);
  const [showModal, setShowModal] = useState(false);
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      image: "https://placehold.co/400?text=Save+the+Earth",
      title: "Save the Earth",
      description: "A campaign to raise awareness about climate change.",
    },
    {
      id: 2,
      image: "https://placehold.co/400?text=Ocean+Cleanup",
      title: "Ocean Cleanup",
      description: "An initiative to remove plastic from the oceans.",
    },
    {
      id: 3,
      image: "https://placehold.co/400?text=Plant+Trees",
      title: "Plant Trees",
      description: "Encouraging individuals to plant trees to combat deforestation.",
    },
  ]);
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
      {
        id: 2,
        title: "Campaign Update",
        details: "The campaign 'Save the Earth' has been updated.",
      },
    ]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
  

 

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

  const handleEditCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleCampaignChange = (e) => {
    const { name, value } = e.target;
    setSelectedCampaign((prev) => ({ ...prev, [name]: value }));
  };

  const handleCampaignImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedImage = URL.createObjectURL(e.target.files[0]);
      setSelectedCampaign((prev) => ({ ...prev, image: uploadedImage }));
    } else {
      toast.error("Failed to upload the image. Please try again.");
    }
  };

  const saveCampaign = () => {
    const { title, description, image } = selectedCampaign;

    if (!title || !description || !image) {
      toast.error("All fields are required. Changes are not saved.", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }

    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === selectedCampaign.id ? { ...c, ...selectedCampaign } : c
      )
    );
    setShowModal(false);
    toast.success("Campaign updated successfully!", { position: "top-center", autoClose: 1500 });
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
  

  return (
    <div className="info-container">
      <ToastContainer />
      <div className="info-heading">
        <h3>Profile</h3>
      </div>

      <Tabs defaultActiveKey="profile" id="profile-tabs" className="mt-4">
        {/* Profile Tab */}
        <Tab eventKey="profile" title="Profile">
          <div className="tab-pane fade show active mt-4">
            <div className="d-flex flex-column">
              <img src={image} alt="Profile" className="img-thumbnail profile-image rounded-circle" />
              <label htmlFor="imageUpload" className="btn btn-link mt-1" style={{fontSize:"14px"}}>Change Picture</label>
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
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="card mb-3" style={{ height: "180px" }}>
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
                      <p className="card-text">{campaign.description}</p>
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
            ))}
          </div>
        </Tab>
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
