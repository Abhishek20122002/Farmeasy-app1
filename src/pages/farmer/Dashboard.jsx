import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import farmerDashboardImg from '../../assets/images/farmer-dashboard.png';
import Footer from '../../components/footer/Footer';

const FarmerDashboard = () => {
  return (
    <>
    <p>hello</p>
    <Container fluid className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center py-5">
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="display-5 fw-bold text-primary">Welcome to Farmer Dashboard</h1>
          <p className="lead">Manage your farm activities with ease.</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Img variant="top" src={farmerDashboardImg} alt="Farmer Dashboard" className="rounded-top-4" />
            <Card.Body className="text-center">
              <Card.Text className="mb-4">
                Select an action below to get started.
              </Card.Text>
              <div className="d-grid gap-3">
                <Link to="/farmer/view-schemes">
                  <Button variant="success" size="lg" className="w-100">Apply Scheme</Button>
                </Link>
                <Link to="/farmer/loan-form">
                  <Button variant="primary" size="lg" className="w-100">Loan Form</Button>
                </Link>
                <Link to="/farmer/grievances">
                  <Button variant="warning" size="lg" className="w-100">Raise Grievance</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default FarmerDashboard;
