import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./UploadForm.css";

const UploadForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ title, description, price });
  };

  return (
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
            <Form.Control
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
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
  );
};

export default UploadForm;
