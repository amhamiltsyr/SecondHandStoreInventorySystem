import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Pagination,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
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

  const changePageSize = (newSize: number) => {
    setCurrentPage(Math.round(startItemID / newSize));
    setItemsPerPage(newSize);
    fetchItems(newSize);
  };

  const getInitialItemsPerPage = () => {
    const savedItemsPerPage = localStorage.getItem("itemsPerPage");
    return savedItemsPerPage ? parseInt(savedItemsPerPage) : 8;
  };
  const [itemsPerPage, setItemsPerPage] = useState(getInitialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [startItemID, setStartItemID] = useState(0);
  const [totalItems, setTotalItems] = useState(0); // Track total number of items

  // Fetch items based on the current page
  const fetchItems = (itemsPerPageFetch: number, page?: number) => {
    if (page) {
      setStartItemID((page - 1) * itemsPerPageFetch);
    } else {
      page = 0;
      setCurrentPage(Math.floor(startItemID / itemsPerPageFetch));
    }

    fetch(
      `http://127.0.0.1:8000/upload/getNext/${itemsPerPageFetch}/${startItemID}`
    )
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data.items);
        const totalCount = data.total_count;
        const newItems = parsedData.map((item: any) => ({
          id: item.pk,
          title: item.fields.name,
          description: item.fields.description,
          imageUrl: `http://127.0.0.1:8000${item.fields.image}`,
          price: item.fields.price,
        }));

        // Update total items count
        setTotalItems(totalCount);

        // Add new items
        setItems(newItems);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch items when currentPage changes
  useEffect(() => {
    fetchItems(itemsPerPage, currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("itemsPerPage", itemsPerPage.toString());
  }, [itemsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages based on total items received and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between controls">
        <Pagination className="controls">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
        <div>
          Current Page: <strong>{currentPage}</strong>
        </div>
        <DropdownButton
          variant="secondary"
          title={`Items Per Page: ${itemsPerPage}`}
        >
          <Dropdown.Item onClick={() => changePageSize(4)}>
            Items Per Page: 4
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changePageSize(8)}>
            Items Per Page: 8
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changePageSize(12)}>
            Items Per Page: 12
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changePageSize(16)}>
            Items Per Page: 16
          </Dropdown.Item>
          <Dropdown.Item onClick={() => changePageSize(20)}>
            Items Per Page: 20
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <hr />
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
