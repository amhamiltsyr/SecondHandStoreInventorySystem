import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Pagination,
  DropdownButton,
  Dropdown,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import "./Marketplace.css";
import MarketCard from "./Cards/MarketCard";
import LoadingCard from "./Cards/LoadingCard";
import config from "../config";

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

  //get items per page from browser storage
  const getInitialItemsPerPage = () => {
    const savedItemsPerPage = localStorage.getItem("itemsPerPage");
    return savedItemsPerPage ? parseInt(savedItemsPerPage) : 8;
  };

  //state management
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getInitialItemsPerPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  //refresh items function
  const refetchItems = () => {
    fetchItems(currentPage, itemsPerPage);
  };

  // Fetch items based on the current page and page size
  const fetchItems = (page: number, itemsPerPageFetch: number) => {
    setLoading(true);
    const startItemID = (page - 1) * itemsPerPageFetch;

    fetch(
      `${config.apiBaseUrl}/upload/getNext/${itemsPerPageFetch}/${startItemID}/${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data.items);
        const totalCount = data.total_count;

        const newItems = parsedData.map((item: any) => ({
          id: item.pk,
          title: item.fields.name,
          description: item.fields.description,
          imageUrl: `${config.apiBaseUrl}/media/${item.fields.image}`,
          price: item.fields.price,
        }));

        setItems(newItems);
        setTotalPages(Math.ceil(totalCount / itemsPerPageFetch));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch items when the currentPage or itemsPerPage changes
  useEffect(() => {
    fetchItems(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  // Save itemsPerPage in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("itemsPerPage", itemsPerPage.toString());
  }, [itemsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Change page size while keeping the current startItemID on the same page
  const changePageSize = (newSize: number) => {
    const currentFirstItemIndex = (currentPage - 1) * itemsPerPage;
    const newPage = Math.floor(currentFirstItemIndex / newSize) + 1; // Calculate new page
    setItemsPerPage(newSize);
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between controls">
        <div className="d-none d-md-block">
          Current Page: <strong>{currentPage}</strong>
        </div>
        <div className="d-flex">
          <InputGroup style={{ marginRight: "20px" }}>
            <InputGroup.Text id="basic-addon1">
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  fetchItems(1, itemsPerPage); // Trigger fetch when Enter is pressed
                }
              }}
            />
            <Button
              variant="primary"
              onClick={() => {
                setCurrentPage(1); // Reset page
                fetchItems(1, itemsPerPage); // Trigger search fetch
              }}
            >
              Search
            </Button>
          </InputGroup>
          <DropdownButton variant="secondary" title={`Items: ${itemsPerPage}`}>
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
      </div>
      <hr />
      <Row
        style={{ marginBottom: "50px" }}
        className="justify-content-center h"
      >
        {items.length === 0 ? <h6>No items found.</h6> : <></>}
        {items.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            {loading ? (
              <LoadingCard></LoadingCard>
            ) : (
              <MarketCard
                id={item.id}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                price={item.price}
                handleChange={refetchItems}
              />
            )}
          </Col>
        ))}
      </Row>

      <Pagination className="d-flex fixed-bottom justify-content-center mt-4">
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
