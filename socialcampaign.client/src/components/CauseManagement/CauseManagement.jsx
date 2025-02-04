import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Button, Modal, Badge, Dropdown } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCampaigns, updateCampaignStatus } from "../../services/campaignService";
import { getUserInfo } from "../../services/userService";

const CauseManagement = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState(null);

    // Fetch campaigns on component mount
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const data = await getAllCampaigns();
                setCampaigns(data);
            } catch (error) {
                toast.error("Failed to fetch campaigns");
            }
        };
        fetchCampaigns();
    }, []);

    // Function to handle modal open and fetch user details
    const handleView = async (campaign) => {
        setSelectedCampaign(campaign);
        try {
            const user = await getUserInfo(campaign.createdById);
            setUserData(user);
        } catch (error) {
            toast.error("Failed to fetch user details");
        }
        setShowModal(true);
    };

    // Function to handle modal close
    const handleCloseModal = () => {
        setShowModal(false);
        setUserData(null);
    };
    // Function to handle status update
    const handleStatusChange = async (campaignId, status) => {
        try {
            await updateCampaignStatus(campaignId, status);
            setCampaigns((prev) =>
                prev.map((campaign) =>
                    campaign.campaignId === campaignId ? { ...campaign, status } : campaign
                )
            );
            toast.success(`Campaign status updated to "${status}" successfully!`);
        } catch (error) {
            toast.error("Failed to update campaign status");
        }
    };
    return (
        <div>
            <ToastContainer />
            <Row className="my-4">
                <Col>
                    <Card>
                        <Card.Header>Campaign Management</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campaigns.map((campaign) => (
                                        <tr key={campaign.campaignId}>
                                            <td>{campaign.campaignId}</td>
                                            <td>{campaign.title}</td>
                                            <td>
                                                {campaign.isDeleted ? (
                                                    <Badge bg="dark">Deleted</Badge>
                                                ) : (
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                            variant={
                                                                campaign.status === "Approved" ? "success" :
                                                                    campaign.status === "Rejected" ? "danger" : "warning"
                                                            }
                                                            size="sm"
                                                        >
                                                            {campaign.status}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={() => handleStatusChange(campaign.campaignId, "Approved")}>Approve</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => handleStatusChange(campaign.campaignId, "Pending")}>Pending</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => handleStatusChange(campaign.campaignId, "Rejected")}>Reject</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => handleStatusChange(campaign.campaignId, "Deleted")} className="text-danger">Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                )}
                                            </td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleView(campaign)}
                                                >
                                                    Contact Campaign Host
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {selectedCampaign && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCampaign.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={selectedCampaign.campaignPicture}
                            alt={selectedCampaign.title}
                            className="img-fluid rounded"
                            style={{ height: "200px", objectFit: "cover", width: "100%" }}
                        />
                        <p>{selectedCampaign.description}</p>
                        {userData && (
                            <div className="mb-3">
                                <strong>Created By:</strong>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    {/* User Profile Picture and Name */}
                                    <div className="d-flex align-items-center">
                                        {console.log("User Data:", userData) || null}
                                        <img
                                            src={userData.profilePicture || "https://placehold.co/40"}
                                            alt={userData.firstName}
                                            className="rounded-circle me-2"
                                            style={{ width: "40px", height: "40px" }}
                                        />
                                        <span>{userData.firstName} {userData.lastName}</span>
                                    </div>
                                    
                                    {/* User Email on the Right Side */}
                                    <div className="text-muted">
                                        <strong>Email:</strong>
                                        <small> {userData.email}</small>
                                    </div>
                                </div>
                            </div>
                        )}

                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default CauseManagement;
