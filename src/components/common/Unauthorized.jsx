import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Unauthorized = () => {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title as="h1" className="mb-3 fs-2 text-danger">
                🚫 Unauthorized
              </Card.Title>
              <Card.Text className="mb-4 text-muted">
                You do not have access to view this page.
              </Card.Text>
              <Button as={Link} to="/login" variant="primary">
                Login with a different account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;