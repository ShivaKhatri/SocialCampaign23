import React, { useState, useEffect } from "react";
import { Tabs, Tab, Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";

const Profile = () => {
  const userData = {
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s",
    name: "John Doe",
    email: "john@example.com",
    bio: "Enthusiast of environmental causes and tech.",
    location: "California, USA",
    website: "https://johndoe.com",
  };

  const [user, setUser] = useState(null);
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

  useEffect(() => {
    setUser(userData);
  }, []);

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
          {/* Profile Tab Content */}
        </Tab>

        {/* Campaigns Tab */}
        <Tab eventKey="campaigns" title="My Campaigns">
          {/* Campaigns Tab Content */}
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

      {/* Notification Modal */}
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
