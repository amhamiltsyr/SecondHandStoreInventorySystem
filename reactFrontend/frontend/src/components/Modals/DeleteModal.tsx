import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";

interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
  };
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  handleClose,
  item,
}) => {
  const [showError, setShowError] = useState(false);

  const handleSave = () => {
    setShowError(false);
    fetch(`http://127.0.0.1:8000/upload/deleteListing/${item.id}`)
      .then(() => {
        handleClose(); // Close modal on successful save
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        setShowError(true);
        throw new Error(error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showError ? (
          <Alert variant="danger">There was an error editing the item.</Alert>
        ) : (
          <></>
        )}
        <div className="mb-3">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
