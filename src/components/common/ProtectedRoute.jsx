import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Spinner, Container, Row, Col, Alert } from 'react-bootstrap';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth(); // Assuming loading support

  if (loading) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="warning">
              You must be logged in to access this page. Redirecting to login...
            </Alert>
          </Col>
        </Row>
        <Navigate to="/login" replace />
      </Container>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger">
              You are not authorized to access this page.
            </Alert>
          </Col>
        </Row>
        <Navigate to="/unauthorized" replace />
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;