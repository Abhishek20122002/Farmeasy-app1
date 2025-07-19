// src/components/commons/Loader.jsx
import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  // Map to Bootstrap sizes
  const spinnerSize = size === 'sm' ? 'sm' : undefined;

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center py-5">
      <Spinner animation="border" variant="success" size={spinnerSize} role="status" />
      <span className="mt-3 text-muted">{text}</span>
    </Container>
  );
};

export default Loader;