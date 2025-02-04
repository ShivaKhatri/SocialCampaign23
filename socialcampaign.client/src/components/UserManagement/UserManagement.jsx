import React, { useState } from "react";
import { Tab, Row, Col, Card, Table, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 401, name: "John Doe", email: "johndoe@example.com", status: "Active" },
    { id: 402, name: "Jane Smith", email: "janesmith@example.com", status: "Active" },
    { id: 403, name: "Alice Johnson", email: "alicejohnson@example.com", status: "Banned" },
    { id: 404, name: "Bob Brown", email: "bobbrown@example.com", status: "Active" },
  ]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(""); // "ban" or "activate"

  const handleActionClick = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setShowConfirmModal(true);
  };

  const handleConfirmAction = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              status: actionType === "ban" ? "Banned" : "Active",
            }
          : user
      )
    );
    setShowConfirmModal(false);

    const toastMessage =
      actionType === "ban"
        ? `${selectedUser.name} has been banned.`
        : `${selectedUser.name} has been activated.`;
    toast.success(toastMessage);
  };

  return (
    <div >
       
      <Row className="my-4">
        <Col>
          <Card>
            <Card.Header>User Management</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.status}</td>
                      <td>
                        {user.status === "Active" ? (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleActionClick(user, "ban")}
                          >
                            Ban
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleActionClick(user, "activate")}
                          >
                            Activate
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

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === "ban" ? "Confirm Ban" : "Confirm Activation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          {actionType === "ban" ? "ban" : "activate"}{" "}
          <strong>{selectedUser?.name}</strong>? This action will change the
          user's status.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button
            variant={actionType === "ban" ? "danger" : "success"}
            onClick={handleConfirmAction}
          >
            {actionType === "ban" ? "Ban" : "Activate"}
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default UserManagement;
