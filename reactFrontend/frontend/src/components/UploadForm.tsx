import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Modal,
  InputGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./UploadForm.css";
import config from "../config";

const UploadForm: React.FC = () => {
  //state management declarations
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchCSRFToken() {
    const response = await fetch("${config.apiBaseUrl}/upload/get-csrf-token/");
    const data = await response.json();
    return data.csrfToken;
  }

  //submit function with api call to create new item
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!image) {
      console.error("No image selected");
      setShowError(true);
      return;
    }

    // Create a FormData object to send form data including the image
    const formData = new FormData();
    formData.append("name", title); // Assuming `title` is the name of the item
    formData.append("description", description || ""); // Default to empty string if description is not provided
    formData.append("price", price.toString()); // Ensure price is sent as a string
    formData.append("image", image);

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/upload/createListing/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // If the response is successful, log the details and show the modal
        console.log({ title, description, price });
        setShowModal(true);
        setShowError(false);
      } else {
        // Handle server errors or validation errors from the API
        console.error("Failed to create listing. Status:", response.status);
        setShowError(true);
      }
    } catch (error) {
      // Handle network or fetch errors
      console.error("Error during fetch:", error);
      setShowError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const csrfToken = await fetchCSRFToken();
    setLoading(true);
    // Form data to send image as a file
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/upload/uploadImage/",
        {
          method: "POST",
          headers: {
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      setLoading(false);
      // Update title and price based on AI response
      if (data.cost !== "error" && data.product_listing !== "error") {
        setTitle(data.product_listing);
        setPrice(data.cost);
      } else {
        alert("Error processing the image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <Card className="upload-card">
        <Card.Body>
          <Card.Title>Upload New Item</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>

            <Button
              className="btn-analyze mb-3"
              disabled={loading}
              onClick={handleAnalyze}
            >
              Analyze
            </Button>
            {loading ? <Spinner style={{ marginLeft: 10 }}></Spinner> : <></>}

            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  value={price}
                  placeholder="Enter amount"
                  aria-label="Amount"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            {showError ? (
              <Alert variant="danger">
                There was an error uploading the item.
              </Alert>
            ) : (
              <></>
            )}

            <Button variant="primary" type="submit">
              Upload
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Item Successfully Uploaded</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <LinkContainer to="/">
            <Button variant="primary">View Marketplace</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadForm;
