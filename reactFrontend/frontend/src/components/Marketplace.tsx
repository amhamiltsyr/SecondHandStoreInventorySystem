import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Marketplace.css";
import MarketCard from "./MarketCard";

const Marketplace: React.FC = () => {
  const items = [
    {
      id: 1,
      title: "Item 1",
      description: "Description 1",
      imageUrl: "https://placehold.co/400",
      price: 1,
    },
    {
      id: 2,
      title: "Item 2",
      description: "Description 2",
      imageUrl: "https://placehold.co/400",
      price: 2,
    },
    {
      id: 3,
      title: "Item 3",
      description: "Description 3",
      imageUrl: "https://placehold.co/400",
      price: 3,
    },
    {
      id: 4,
      title: "Item 4",
      description: "Description 4",
      imageUrl: "https://placehold.co/400",
      price: 4,
    },
    {
      id: 5,
      title: "Item 5",
      description: "Description 5",
      imageUrl: "https://placehold.co/600x700",
      price: 5,
    },
  ];

  return (
    <Row className="h">
      {items.map((item) => (
        <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <MarketCard
            id={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            price={item.price}
          />
        </Col>
      ))}
    </Row>
  );
};

export default Marketplace;
