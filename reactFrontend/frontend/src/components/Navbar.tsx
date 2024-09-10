import React, { useState } from "react";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const AppNavbar: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };

  return (
    <Navbar className="fixed-top" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Marketplace</Navbar.Brand>
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
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              label={
                theme === "light" ? (
                  <i className="bi bi-sun"></i>
                ) : (
                  <i className="bi bi-moon"></i>
                )
              }
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
