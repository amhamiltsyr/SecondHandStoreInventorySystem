import React, { useState } from "react";
import { Card, Form, Button, Modal, InputGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./UploadForm.css";

const UploadForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(
      `http://127.0.0.1:8000/upload/createListing/test/${title}/${description}/${price}`
    ).catch((error) => console.error("error:", error));

    console.log({ title, description, price });
    setShowModal(true);
  };

  return (
    <>
      <Card className="upload-card">
        <Card.Body>
          <Card.Title>Upload New Item</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Button
              className="btn-analyze mb-3"
              onClick={() => {
                setTitle("test");
                setPrice("$1");
              }}
            >
              Analyze
            </Button>

            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  aria-label="Amount"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Upload
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Item Successfully Uploaded</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <LinkContainer to="/">
            <Button variant="primary">View Marketplace</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadForm;
