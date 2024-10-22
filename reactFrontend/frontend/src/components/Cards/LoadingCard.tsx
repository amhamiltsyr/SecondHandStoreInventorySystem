import React from "react";
import { Card, Placeholder, Spinner } from "react-bootstrap";
import "./LoadingCard.css";

const LoadingCard: React.FC = () => {
  return (
    <Card
      className="marketCard"
      style={{ minWidth: "220px", maxWidth: "400px" }}
    >
      <div className="card-img-wrapper">
        <Spinner className="spinner" />

        <Card.Img variant="top" className="card-img" />
      </div>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={4} />
      </Card.Body>
    </Card>
  );
};

export default LoadingCard;
