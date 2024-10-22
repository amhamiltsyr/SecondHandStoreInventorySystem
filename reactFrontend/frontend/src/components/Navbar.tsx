import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";

const AppNavbar: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme); // Update Bootstrap's theme attribute
    localStorage.setItem("theme", newTheme); // Save to localStorage
  };

  useEffect(() => {
    // Set the initial theme on load
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <Navbar
      bg={theme}
      data-bs-theme={theme}
      expand="lg"
      className="fixed-top border-bottom"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="https://placehold.co/30"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
            Marketplace
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/upload">
              <Nav.Link>Upload Item</Nav.Link>
            </LinkContainer>
          </Nav>
          <Button
            variant={theme}
            className="rounded-circle"
            onClick={toggleTheme}
          >
            {" "}
            {theme === "light" ? (
              <i className="bi bi-sun-fill icon-black"></i>
            ) : (
              <i className="bi bi-moon-stars-fill icon-white"></i>
            )}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
