import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const GovernmentNavbar = () => {
  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/gov/dashboard">
          FarmEasy - Government
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="gov-navbar-nav" />
        <Navbar.Collapse id="gov-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/gov/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/gov/grievances">Grievances</Nav.Link>
            <Nav.Link as={Link} to="/gov/overview">System Overview</Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GovernmentNavbar;