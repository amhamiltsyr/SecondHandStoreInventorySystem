import React, { useState } from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";

const AppNavbar: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };

  return (
    <Navbar bg={theme} data-bs-theme={theme} expand="lg" className="fixed-top">
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
            color={theme}
            className="rounded-circle btn-primary-outline"
            onClick={toggleTheme}
          >
            {" "}
            {theme === "light" ? (
              <i className="bi bi-brightness-high-fill icon-white"></i>
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
