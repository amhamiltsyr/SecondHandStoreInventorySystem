import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const Upload: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ title, description, imageUrl });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Upload New Item</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

          <Form.Group className="mb-3" controlId="imageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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

export default Upload;
