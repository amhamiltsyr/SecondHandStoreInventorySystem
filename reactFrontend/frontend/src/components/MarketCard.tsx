import React from "react";
import { Card, Button } from "react-bootstrap";
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
  return (
    <Card
      className="marketCard"
      style={{ minWidth: "220px", maxWidth: "400px" }}
    >
      <div className="card-img-wrapper">
        <Card.Img variant="top" src={imageUrl} className="card-img" />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>${price}</strong>
        </Card.Text>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">View Item</Button>
      </Card.Body>
    </Card>
  );
};

export default MarketCard;
