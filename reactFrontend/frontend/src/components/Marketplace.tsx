import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import "./Marketplace.css";
import MarketCard from "./MarketCard";
import LoadingCard from "./LoadingCard";

const Marketplace: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState<
    Array<{
      id: number;
      title: string;
      description: string;
      imageUrl: string;
      price: number;
    }>
  >([]);
  const [page, setPage] = useState(1);

  const loader = useRef(null);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from({ length: 6 }).map((_, index) => ({
        id: index + items.length + 1,
        title: `Item ${index + items.length + 1}`,
        description: `Description of item ${index + items.length + 1}`,
        imageUrl: `https://via.placeholder.com/300x400?text=Item+${
          index + items.length + 1
        }`,
        price: Math.floor(Math.random() * 100) + 1,
      }));
      setItems((prevItems) => [...prevItems, ...newItems]);
      setLoading(false);
    }, 200); // Simulate network delay
  };

  useEffect(() => {
    loadMore(); // Initial load
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  return (
    <>
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
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Col
              key={`loading-${index}`}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <LoadingCard />
            </Col>
          ))}
      </Row>
      <div ref={loader} style={{ height: "1px" }}></div>{" "}
      {/* Invisible div for IntersectionObserver */}
    </>
  );
};

export default Marketplace;
