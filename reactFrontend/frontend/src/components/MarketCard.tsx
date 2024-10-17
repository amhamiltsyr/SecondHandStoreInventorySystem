import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Dropdown } from "react-bootstrap";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import "./MarketCard.css";

interface MarketCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

const MarketCard: React.FC<MarketCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  price,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [theme, setTheme] = useState("light");

  const handleEdit = () => setShowEditModal(true);
  const handleDelete = () => setShowDeleteModal(true);
  const handleClose = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const currentTheme =
      document.documentElement.getAttribute("data-bs-theme") || "light";
    setTheme(currentTheme);

    // Optional: Listen for theme changes if dynamically updated elsewhere
    const observer = new MutationObserver(() => {
      const updatedTheme =
        document.documentElement.getAttribute("data-bs-theme") || "light";
      setTheme(updatedTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Card
        className="marketCard"
        style={{ minWidth: "220px", maxWidth: "400px" }}
      >
        <div className="card-img-wrapper">
          <Card.Img variant="top" src={imageUrl} className="card-img" />
          <Badge bg="secondary" className="item-id-bubble">
            Item ID: {id}
          </Badge>
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>${price}</strong>
          </Card.Text>
          <Card.Text>{description}</Card.Text>
          <div className="d-flex">
            <Button variant="primary">View Item</Button>
            <Dropdown className="rightAlign">
              <Dropdown.Toggle
                as={Button}
                variant={theme === "light" ? "light" : "dark"}
                className="no-caret"
              >
                <i className="bi bi-three-dots"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEdit}>Edit Item</Dropdown.Item>
                <Dropdown.Item onClick={handleDelete}>
                  Delete Item
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Body>
      </Card>

      <EditModal
        show={showEditModal}
        handleClose={handleClose}
        item={{ id, title, description, imageUrl, price }} // Pass item data to modal
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleClose}
        item={{ id, title, description, price }}
      />
    </>
  );
};

export default MarketCard;
