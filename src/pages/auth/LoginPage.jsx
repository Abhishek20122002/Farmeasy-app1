// src/pages/common/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { login as loginService } from '../../services/user-service';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setMessage({ type: 'danger', text: 'Username and Password are required.' });
      return;
    }

    setLoading(true);
    setMessage({});

    try {
      const jwtToken = await loginService(formData);

      localStorage.setItem("data", JSON.stringify({
        accessToken: jwtToken.accessToken,
        user: jwtToken.user
      }));

      const roleRouteMap = {
        ROLE_BANK: '/bank/dashboard',
        ROLE_FARMER: '/farmer/dashboard',
        ROLE_MERCHANT: '/merchant/dashboard',
        ROLE_GOV: '/admin/grievances',
      };

      const userRole = jwtToken.user.role;
      const route = roleRouteMap[userRole];

      if (route) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        setTimeout(() => navigate(route), 1500);
      } else {
        setMessage({ type: 'danger', text: 'Unknown role. Cannot redirect.' });
      }

    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        setMessage({ type: 'danger', text: error.response.data.message });
      } else {
        setMessage({ type: 'danger', text: 'Login failed due to server error.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-4 shadow-sm border-0 rounded-4">
            <h3 className="text-center mb-4">Login</h3>

            {message.text && (
              <Alert variant={message.type} onClose={() => setMessage({})} dismissible>
                {message.text}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-grid mb-3">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>

              <div className="text-center">
                <span>Don't have an account? </span>
                <Link to="/register">Register here</Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
