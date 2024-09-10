import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const Marketplace: React.FC = () => {
  const items = [
    {
      id: 1,
      title: "Item 1",
      description: "Description 1",
      imageUrl: "https://placehold.co/400",
    },
    {
      id: 2,
      title: "Item 2",
      description: "Description 2",
      imageUrl: "https://placehold.co/400",
    },
    {
      id: 3,
      title: "Item 3",
      description: "Description 3",
      imageUrl: "https://placehold.co/400",
    },
  ];

  return (
    <Row>
      {items.map((item) => (
        <Col key={item.id} md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={item.imageUrl} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Button variant="primary">View Item</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Marketplace;
