import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const FarmerNavbar = () => {
  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/farmer/dashboard">
          FarmEasy - Farmer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="farmer-navbar-nav" />
        <Navbar.Collapse id="farmer-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/farmer/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/farmer/schemes">Schemes</Nav.Link>
            <Nav.Link as={Link} to="/farmer/loan-form">Loan Form</Nav.Link>
            <Nav.Link as={Link} to="/farmer/items">Items</Nav.Link>
            <Nav.Link as={Link} to="/farmer/notifications">Notifications</Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FarmerNavbar;
