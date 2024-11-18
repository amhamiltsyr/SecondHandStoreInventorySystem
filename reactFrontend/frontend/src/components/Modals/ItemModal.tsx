import React from "react";
import { Modal, Button, Image } from "react-bootstrap";

interface ItemModalProps {
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

const ItemModal: React.FC<ItemModalProps> = ({ show, handleClose, item }) => {
  return (
    <Modal className="itemModal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          View Item: <strong>{item.title}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <Image className="img" src={item.imageUrl} fluid rounded />
        </div>
        <hr />
        Price: <strong>${item.price}</strong>
        <hr />
        Description: {item.description}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModal;
