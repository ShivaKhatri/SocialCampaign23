import React, { useState } from "react";
import { Tab, Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BusinessManagement = () => {
  // Dummy Data for Businesses
  const [businesses, setBusinesses] = useState([
    {
      id: 101,
      name: "Green Energy Co.",
      location: "New York, USA",
      status: "Pending",
    },
    {
      id: 102,
      name: "Eco-friendly Solutions",
      location: "California, USA",
      status: "Pending",
    },
    {
      id: 103,
      name: "SolarTech Innovations",
      location: "Texas, USA",
      status: "Pending",
    },
  ]);

  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [currentBusiness, setCurrentBusiness] = useState(null); // Selected business for confirmation
  const [actionType, setActionType] = useState(""); // "approve" or "reject"

  // Open Confirmation Modal
  const handleConfirmAction = (business, type) => {
    setCurrentBusiness(business);
    setActionType(type);
    setShowModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentBusiness(null);
    setActionType("");
  };

  // Approve or Reject Action
  const handleAction = () => {
    if (currentBusiness) {
      const updatedBusinesses = businesses.map((business) =>
        business.id === currentBusiness.id
          ? {
              ...business,
              status: actionType === "approve" ? "Approved" : "Rejected",
            }
          : business
      );
      setBusinesses(updatedBusinesses);

      // Show appropriate toast message
      if (actionType === "approve") {
        toast.success(`${currentBusiness.name} has been approved successfully!`);
      } else {
        toast.error(`${currentBusiness.name} has been rejected successfully!`);
      }
    }
    handleCloseModal(); // Close the modal
  };

  return (
    <div >
      
      <Row className="my-4">
        <Col>
          <Card>
            <Card.Header>Business Profile Management</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Business Name</th>
                    <th>Business Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {businesses.map((business) => (
                    <tr key={business.id}>
                      <td>{business.id}</td>
                      <td>{business.name}</td>
                      <td>{business.location}</td>
                      <td>{business.status}</td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => handleConfirmAction(business, "approve")}
                          disabled={business.status !== "Pending"}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleConfirmAction(business, "reject")}
                          disabled={business.status !== "Pending"}
                        >
                          Reject
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

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm {actionType === "approve" ? "Approval" : "Rejection"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {actionType === "approve" ? "approve" : "reject"} the business{" "}
          <strong>{currentBusiness?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant={actionType === "approve" ? "success" : "danger"}
            onClick={handleAction}
          >
            {actionType === "approve" ? "Approve" : "Reject"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toastify Notification Container */}
      
    </div>
  );
};

export default BusinessManagement;
