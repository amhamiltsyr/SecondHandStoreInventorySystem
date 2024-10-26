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

  //handle the save changes(delete) button by making an api request
  const handleSave = () => {
    setShowError(false);
    fetch(`http://127.0.0.1:8000/upload/deleteListing/${item.id}`)
      .then(() => {
        handleClose(); // Close modal on successful save
      })
      .catch((error) => {
        setShowError(true); // show error warning if save is unsuccessful
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
        Are you sure you want to remove item <strong>{item.title}</strong>?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" className="button" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" className="button" onClick={handleSave}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
