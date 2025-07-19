// src/components/commons/NotFound.jsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center text-center py-5" style={{ minHeight: '100vh' }}>
      <h1 className="display-4 fw-bold mb-3">404 - Page Not Found</h1>
      <p className="text-muted mb-4">Sorry, the page you’re looking for doesn’t exist.</p>
      <Link to="/">
        <Button variant="primary">Go Back to Home</Button>
      </Link>
    </Container>
  );
};

export default NotFound;