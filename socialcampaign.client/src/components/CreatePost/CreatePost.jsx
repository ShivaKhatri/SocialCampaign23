import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = ({ show, handleClose, handlePost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const [category, setCategory] = useState("");

  const handleMediaUpload = (event) => {
    setMedia(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!title || !description || !media || !category) {
      toast.warn("All fields are required!" , { position: "top-center", autoClose: 1500 });
      return;
    }

    const postData = {
      title,
      description,
      media,
      category
    };
    handlePost(postData);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMediaUpload">
              <Form.Label>Media Upload</Form.Label>
              <Form.Control
                type="file"
                onChange={handleMediaUpload}
              />
              {media && <small className="text-muted">Uploaded: {media.name}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Cause Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cause category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
