import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Button, Alert } from 'react-bootstrap';
import { getSchemesByBank, getBankDashboardStats } from '../../services/bank-service';
import { useNavigate } from 'react-router-dom';

const BankDashboard = () => {
  const [stats, setStats] = useState({
    totalSchemes: 0,
    totalApplications: 0,
    approved: 0,
    pending: 0,
  });

  const [schemes, setSchemes] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingSchemes, setLoadingSchemes] = useState(true);
  const [errorStats, setErrorStats] = useState('');
  const [errorSchemes, setErrorSchemes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchSchemes();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getBankDashboardStats();
      setStats(res);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setErrorStats('Unable to load dashboard statistics.');
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchSchemes = async () => {
    try {
      const data = await getSchemesByBank(); // Using service method directly
      setSchemes(data);
    } catch (err) {
      console.error('Error fetching schemes:', err);
      setErrorSchemes('Unable to load schemes.');
    } finally {
      setLoadingSchemes(false);
    }
  };

  const StatCard = ({ title, value, variant }) => (
    <Card bg="light" className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title className="text-muted">{title}</Card.Title>
        <Card.Text className={`display-6 fw-bold text-${variant}`}>
          {value}
        </Card.Text>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center fw-bold">🏦 Bank Dashboard</h1>

      {/* Stats Section */}
      {loadingStats ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading dashboard statistics...</span>
        </div>
      ) : errorStats ? (
        <Alert variant="danger" className="text-center">{errorStats}</Alert>
      ) : (
        <Row>
          <Col md={6} lg={3}>
            <StatCard title="Total Schemes" value={stats.totalSchemes} variant="primary" />
          </Col>
          <Col md={6} lg={3}>
            <StatCard title="Loan Applications" value={stats.totalApplications} variant="success" />
          </Col>
          <Col md={6} lg={3}>
            <StatCard title="Approved Loans" value={stats.approved} variant="info" />
          </Col>
          <Col md={6} lg={3}>
            <StatCard title="Pending Requests" value={stats.pending} variant="warning" />
          </Col>
        </Row>
      )}

      <hr className="my-4" />

      {/* Action Buttons */}
      <Row className="justify-content-center">
        <Col xs={12} md={4} className="mb-3">
          <Button variant="outline-primary" className="w-100" onClick={() => navigate('/bank/add-scheme')}>
            ➕ Add New Scheme
          </Button>
        </Col>
        <Col xs={12} md={4} className="mb-3">
          <Button variant="outline-success" className="w-100" onClick={() => navigate('/bank/apply-requests')}>
            📄 View Loan Applications
          </Button>
        </Col>
        <Col xs={12} md={4} className="mb-3">
          <Button variant="outline-secondary" className="w-100" onClick={() => navigate('/bank/scheme-rules')}>
            ⚙️ Manage Scheme Rules
          </Button>
        </Col>
      </Row>

      {/* Scheme Cards */}
      <h3 className="mt-5 text-center">📋 Your Created Schemes</h3>
      {loadingSchemes ? (
        <div className="d-flex justify-content-center py-4">
          <Spinner animation="border" />
        </div>
      ) : errorSchemes ? (
        <Alert variant="danger" className="text-center">{errorSchemes}</Alert>
      ) : schemes.length === 0 ? (
        <Alert variant="info" className="text-center">No schemes created yet.</Alert>
      ) : (
        <Row className="mt-3">
          {schemes.map((scheme) => (
            <Col md={6} lg={4} key={scheme.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{scheme.schemeName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{scheme.schemeType}</Card.Subtitle>
                  <Card.Text>
                    <strong>ROI:</strong> {scheme.roi}%<br />
                    <strong>Tenure:</strong> {scheme.tenure} months<br />
                    <strong>Description:</strong> {scheme.schemeDescription}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BankDashboard;
