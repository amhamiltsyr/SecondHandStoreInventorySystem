import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

interface EditModalProps {
  show: boolean;
  handleClose: () => void;
  item: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  };
}

const EditModal: React.FC<EditModalProps> = ({ show, handleClose, item }) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [showError, setShowError] = useState(false);

  const handleSave = () => {
    setShowError(false);
    fetch(
      `http://127.0.0.1:8000/upload/editListing/${item.id}/test/${title}/${description}/${price}`
    )
      .then(() => {
        handleClose(); // Close modal on successful save
      })
      .catch((error) => {
        setShowError(true);
        throw new Error(error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showError ? (
          <Alert variant="danger">There was an error editing the item.</Alert>
        ) : (
          <></>
        )}
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
