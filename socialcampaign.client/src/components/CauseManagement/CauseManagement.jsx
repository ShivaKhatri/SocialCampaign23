import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCampaigns, updateCampaign, getCampaignById } from "../../services/campaignService";

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
                console.log(data);
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
            const user = await getCampaignById(campaign.createdById);
            console.log("User Data:", user); // Debugging line to log user data
            setUserData(user);
        } catch (error) {
            console.error("Failed to fetch user details", error);
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
    const handleStatusChange = async (status) => {
        try {
            await updateCampaign(selectedCampaign.id, { status });
            setCampaigns((prev) =>
                prev.map((campaign) =>
                    campaign.id === selectedCampaign.id ? { ...campaign, status } : campaign
                )
            );
            toast.success(`Campaign ${status.toLowerCase()} successfully!`);
            setShowModal(false);
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
                                            <td>{campaign.isDeleted ? "Deleted" : campaign.status}</td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleView(campaign)}
                                                >
                                                    View
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

            {/* Modal for Viewing Campaign Details */}
            {selectedCampaign && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedCampaign.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={selectedCampaign.image}
                            alt={selectedCampaign.title}
                            className="img-fluid rounded"
                            style={{ height: "200px", objectFit: "cover", width: "100%" }}
                        />
                        <p>{selectedCampaign.description}</p>
                        {userData && (
                            <div className="mb-3">
                                <strong>Created By:</strong>
                                <div className="d-flex align-items-center mt-2">
                                    <img
                                        src={userData.image || "https://placehold.co/40"}
                                        alt={userData.name}
                                        className="rounded-circle me-2"
                                        style={{ width: "40px", height: "40px" }}
                                    />
                                    <span>{userData.name}</span>
                                </div>
                            </div>
                            
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        {!selectedCampaign.isDeleted && (
                            <>
                                <Button variant="success" onClick={() => handleStatusChange("Approved")}>
                                    Approve
                                </Button>
                                <Button variant="danger" onClick={() => handleStatusChange("Rejected")}>
                                    Reject
                                </Button>
                            </>
                        )}
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default CauseManagement;
