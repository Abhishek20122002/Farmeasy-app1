import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const MerchantNavbar = () => {
  return (
    <Navbar bg="warning" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/merchant/dashboard">
          FarmEasy - Merchant
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="merchant-navbar-nav" />
        <Navbar.Collapse id="merchant-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/merchant/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/merchant/items">Manage Items</Nav.Link>
            <Nav.Link as={Link} to="/merchant/bookings">Bookings</Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MerchantNavbar;
