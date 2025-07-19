import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card, Spinner } from 'react-bootstrap';
import { addScheme } from '../../services/bank-service';
import { useNavigate } from 'react-router-dom';

const AddScheme = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schemeName: '',
    schemeCode: '',
    schemeDescription: '',
    benefits: '',
    eligibility: '',
    min_salary: '',
    max_salary: '',
    cibil_score: '',
    documents: '',
    roi: '',
    tenure: '',
    schemeType: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: ["min_salary", "max_salary", "cibil_score"].includes(name)
        ? Number(value) // 🔄 convert string to number
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // Convert numeric fields
      const payload = {
        ...formData,
        min_salary: parseFloat(formData.min_salary),
        max_salary: parseFloat(formData.max_salary),
        cibil_score: parseInt(formData.cibil_score)
      };

      await addScheme(payload);
      setSuccessMsg('Scheme added successfully!');
      setTimeout(() => navigate('/bank/dashboard'), 2000);
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-4">Add New Scheme</h3>

              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
              {successMsg && <Alert variant="success">{successMsg}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Scheme Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="schemeName"
                        value={formData.schemeName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Scheme Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="schemeCode"
                        value={formData.schemeCode}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="schemeDescription"
                        value={formData.schemeDescription}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Benefits</Form.Label>
                      <Form.Control
                        type="text"
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Eligibility</Form.Label>
                      <Form.Control
                        type="text"
                        name="eligibility"
                        value={formData.eligibility}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Documents</Form.Label>
                      <Form.Control
                        type="text"
                        name="documents"
                        value={formData.documents}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Min Salary</Form.Label>
                      <Form.Control
                        type="number"
                        name="min_salary"
                        value={formData.min_salary}
                        onChange={handleChange}
                        step="0.01"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Max Salary</Form.Label>
                      <Form.Control
                        type="number"
                        name="max_salary"
                        value={formData.max_salary}
                        onChange={handleChange}
                        step="0.01"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>CIBIL Score</Form.Label>
                      <Form.Control
                        type="number"
                        name="cibil_score"
                        value={formData.cibil_score}
                        onChange={handleChange}
                        min="0"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Rate of Interest</Form.Label>
                      <Form.Control
                        type="text"
                        name="roi"
                        value={formData.roi}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Tenure</Form.Label>
                      <Form.Control
                        type="text"
                        name="tenure"
                        value={formData.tenure}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Scheme Type</Form.Label>
                      <Form.Control
                        type="text"
                        name="schemeType"
                        value={formData.schemeType}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center mt-3">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" /> Adding...
                      </>
                    ) : (
                      'Add Scheme'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddScheme;
