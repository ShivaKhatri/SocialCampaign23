import React, { useState } from "react";
import { Tab, Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContentModeration = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Reports data with post/comment details
  const reports = [
    {
      id: 301,
      content: "Inappropriate post content...",
      contentType: "Post",
      reportReason: "Spam",
      originalContent: "This is the full content of the original post.",
      owner: {
        name: "John Doe",
        profilePic: "https://placehold.co/20",
      },
    },
    {
      id: 302,
      content: "This comment violates guidelines.",
      contentType: "Comment",
      reportReason: "Harassment",
      originalContent: "This is the comment in question.",
      owner: {
        name: "Jane Smith",
        profilePic: "https://placehold.co/20",
      },
    },
  ];

  const handleView = (report) => {
    setSelectedReport(report);
    setShowViewModal(true);
  };

  const handleWarnUser = () => {
    toast.success("Warning message sent to user!");
  };

  const handleDeleteClick = (report) => {
    setSelectedReport(report);
    setShowConfirmModal(true); // Show confirmation modal
  };

  const handleConfirmDelete = () => {
    setShowConfirmModal(false);
    toast.success("Content deleted successfully!");
  };

  return (
    <div >
           

      <Row className="my-4">
        <Col>
          <Card>
            <Card.Header>Content Moderation</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Content</th>
                    <th>Content Type</th>
                    <th>Report Reason</th>
                    <th>Owner</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.content}</td>
                      <td>{report.contentType}</td>
                      <td>{report.reportReason}</td>
                      <td>
                        <img
                          src={report.owner.profilePic}
                          alt="Profile"
                          className="me-2"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        />
                        {report.owner.name}
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-2"
                          onClick={() => {  handleView(report);}}
                        >
                          View
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={()=>{ toast.success("Warning message sent to user!");}}
                        >
                          Warn User
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteClick(report)}
                        >
                          Delete
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

      {/* Modal for Viewing Report Details */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <>
              <p>
                <strong>ID:</strong> {selectedReport.id}
              </p>
              <p>
                <strong>Reported Content:</strong> {selectedReport.content}
              </p>
              <p>
                <strong>Original {selectedReport.contentType}:</strong>{" "}
                {selectedReport.originalContent}
              </p>
              <p>
                <strong>Content Type:</strong> {selectedReport.contentType}
              </p>
              <p>
                <strong>Report Reason:</strong> {selectedReport.reportReason}
              </p>
              <p>
                <strong>Owner:</strong> 
                <img
                src={selectedReport.owner.profilePic}
                alt="Profile"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
              />
                 {selectedReport.owner.name}
              </p>
              
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal for Delete */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this{" "}
          <strong>{selectedReport?.contentType}</strong>? This action cannot be
          undone.
          <br />
          <p>
            <strong>Reported Content:</strong> {selectedReport?.content}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

   {/* Toast Container */}
  
    </div>
  );
};

export default ContentModeration;
