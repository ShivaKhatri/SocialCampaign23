import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Button, Modal, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllBusinessAds, updateBusinessAdStatus } from "../../services/businessAdService";
import { getBusinessById } from "../../services/businessService"; // Import Business API

const PromotionalManagement = () => {
    const [ads, setAds] = useState([]); // Business Ads Data
    const [showModal, setShowModal] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const [businessName, setBusinessName] = useState(""); // Store business name
    const [actionModal, setActionModal] = useState(false);
    const [statusModal, setStatusModal] = useState(false);
    const [currentAction, setCurrentAction] = useState("");
    const [newStatus, setNewStatus] = useState(""); // Holds the selected status when changing

    useEffect(() => {
        fetchBusinessAds();
    }, []);

    // Fetch business ads from API
    const fetchBusinessAds = async () => {
        try {
            const fetchedAds = await getAllBusinessAds();
            setAds(fetchedAds);
        } catch (error) {
            console.error("Error fetching business ads:", error);
            toast.error("Failed to load ads.");
        }
    };

    // Open View Modal & Fetch Business Name
    const handleViewAd = async (ad) => {
        setSelectedAd(ad);
        setShowModal(true);

        try {
            const business = await getBusinessById(ad.businessId); // Fetch Business Name
            setBusinessName(business.businessName);
        } catch (error) {
            setBusinessName("Unknown Business"); // Fallback
        }
    };

    // Close View Modal
    const handleCloseViewModal = () => {
        setShowModal(false);
        setSelectedAd(null);
        setBusinessName(""); // Reset business name
    };

    // Open Approve/Reject Confirmation Modal
    const handleConfirmAction = (ad, action) => {
        setSelectedAd(ad);
        setCurrentAction(action);
        setActionModal(true);
    };

    // Close Approve/Reject Confirmation Modal
    const handleCloseActionModal = () => {
        setActionModal(false);
        setSelectedAd(null);
        setCurrentAction("");
    };

    // Handle Approve/Reject Action
    const handleAction = async () => {
        if (!selectedAd) return;

        try {
            await updateBusinessAdStatus(selectedAd.businessAdId, currentAction === "approve" ? "Approved" : "Rejected");

            fetchBusinessAds(); // Refresh ads after updating status
            toast.success(`Ad "${selectedAd.title}" has been ${currentAction === "approve" ? "Approved" : "Rejected"} successfully!`);
        } catch (error) {
            toast.error(`Failed to ${currentAction} the ad.`);
            console.error(error);
        }

        handleCloseActionModal();
    };

    // Open Status Change Modal
    const handleOpenStatusChangeModal = (ad) => {
        setSelectedAd(ad);
        setNewStatus(ad.status);
        setStatusModal(true);
    };

    // Close Status Change Modal
    const handleCloseStatusModal = () => {
        setStatusModal(false);
        setSelectedAd(null);
        setNewStatus("");
    };

    // Update Ad Status
    const handleStatusUpdate = async () => {
        if (!selectedAd || newStatus === selectedAd.status) return;

        try {
            await updateBusinessAdStatus(selectedAd.businessAdId, newStatus);

            fetchBusinessAds();
            toast.success(`Status changed to "${newStatus}" successfully!`);
        } catch (error) {
            toast.error("Failed to update status.");
            console.error(error);
        }

        handleCloseStatusModal();
    };

    return (
        <div>
            <ToastContainer />

            <Row className="my-4">
                <Col>
                    <Card>
                        <Card.Header>Promotional Post Management</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Post Title</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ads.map((ad) => (
                                        <tr key={ad.businessAdId}>
                                            <td>{ad.businessAdId}</td>
                                            <td>{ad.title}</td>
                                            <td>
                                                <span
                                                    className={`badge px-3 py-2 fw-bold ${ad.status === "Pending"
                                                            ? "bg-warning text-dark"
                                                            : ad.status === "Approved"
                                                                ? "bg-success"
                                                                : "bg-danger"
                                                        }`}
                                                >
                                                    {ad.status}
                                                </span>
                                            </td>
                                            <td>
                                                <Button variant="primary" size="sm" className="me-2" onClick={() => handleViewAd(ad)}>
                                                    View
                                                </Button>

                                                {ad.status === "Pending" ? (
                                                    <>
                                                        <Button
                                                            variant="success"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => handleConfirmAction(ad, "approve")}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleConfirmAction(ad, "reject")}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button variant="outline-dark" size="sm" onClick={() => handleOpenStatusChangeModal(ad)}>
                                                        Change Status
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* View Ad Modal */}
            <Modal show={showModal} onHide={handleCloseViewModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ad Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAd && (
                        <>
                            <h5>{selectedAd.title}</h5>
                            <img
                                src={selectedAd.imageUrl}
                                alt={selectedAd.title}
                                className="img-fluid mb-3"
                                style={{ height: "200px", objectFit: "cover", width: "100%" }}
                            />
                            <p>
                                <strong>Description:</strong> {selectedAd.description}
                            </p>
                            <p>
                                <strong>Business Name:</strong> {businessName || "Loading..."}
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Approve/Reject Confirmation Modal */}
            <Modal show={actionModal} onHide={handleCloseActionModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm {currentAction === "approve" ? "Approval" : "Rejection"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {currentAction} the ad <strong>{selectedAd?.title}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseActionModal}>
                        Cancel
                    </Button>
                    <Button variant={currentAction === "approve" ? "success" : "danger"} onClick={handleAction}>
                        {currentAction === "approve" ? "Approve" : "Reject"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Change Status Modal */}
            <Modal show={statusModal} onHide={handleCloseStatusModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Ad Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStatusModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleStatusUpdate}>
                        Update Status
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PromotionalManagement;
