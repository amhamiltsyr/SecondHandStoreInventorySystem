import React, { useState, useEffect } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import "./Marketplace.css";
import MarketCard from "./MarketCard";

const Marketplace: React.FC = () => {
  const [items, setItems] = useState<
    Array<{
      id: number;
      title: string;
      description: string;
      imageUrl: string;
      price: number;
    }>
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0); // Track total number of items

  const itemsPerPage = 20;

  // Fetch items based on the current page
  const fetchItems = (page: number) => {
    const startItemId = (page - 1) * itemsPerPage;

    fetch(`http://127.0.0.1:8000/upload/getNextTwenty/${startItemId}`)
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data);

        const newItems = parsedData.map((item: any) => ({
          id: item.pk,
          title: item.fields.name,
          description: item.fields.description,
          imageUrl: `http://127.0.0.1:8000${item.fields.image}`,
          price: item.fields.price,
        }));

        // Update total items count
        setTotalItems((prevTotal) => prevTotal + newItems.length);

        // Add new items
        setItems(newItems);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch items when currentPage changes
  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages based on total items received and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
      </Row>

      {/* Pagination controls */}
      <Pagination className="d-flex justify-content-center mt-4">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages || 1)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
};

export default Marketplace;
