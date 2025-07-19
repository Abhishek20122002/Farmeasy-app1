import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import { submitLoanForm } from '../../services/farmer-service';

const LoanFormPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', contact: '', gender: '', age: '', cibil: '',
    address: '', district: '', state: '', pinCode: '',
    aadhaarNumber: '', panNumber: '',
    salary: '', collateralType: '',
    guarantorName: '', guarantorContact: '', guarantorRelation: '',
    landAmount: '', khsraNumber: '', landOwnership: '',
    soilType: '', cropType: ''
  });

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [landFile, setLandFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage({ type: '', text: '' });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'aadhaar') setAadhaarFile(file);
    else if (type === 'pan') setPanFile(file);
    else if (type === 'land') setLandFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!aadhaarFile || !panFile || !landFile) {
      setMessage({ type: 'danger', text: 'All PDF files are required.' });
      return;
    }

    setLoading(true);
    try {
      await submitLoanForm(formData, aadhaarFile, panFile, landFile);
      setMessage({ type: 'success', text: 'Loan application submitted successfully!' });

      setFormData({
        name: '', email: '', contact: '', gender: '', age: '', cibil: '',
        address: '', district: '', state: '', pinCode: '',
        aadhaarNumber: '', panNumber: '',
        salary: '', collateralType: '',
        guarantorName: '', guarantorContact: '', guarantorRelation: '',
        landAmount: '', khsraNumber: '', landOwnership: '',
        soilType: '', cropType: ''
      });
      setAadhaarFile(null);
      setPanFile(null);
      setLandFile(null);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: 'Failed to submit loan application.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-success">💰 Farmer Loan Application Form</h2>

      {message.text && (
        <Alert variant={message.type}>{message.text}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control name="contact" value={formData.contact} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">-- Select --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>CIBIL Score</Form.Label>
              <Form.Control type="number" name="cibil" value={formData.cibil} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Salary (₹)</Form.Label>
              <Form.Control type="number" name="salary" value={formData.salary} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control name="address" value={formData.address} onChange={handleChange} required />
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Control name="district" value={formData.district} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control name="state" value={formData.state} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>PIN Code</Form.Label>
              <Form.Control name="pinCode" value={formData.pinCode} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Aadhaar Number</Form.Label>
              <Form.Control name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Aadhaar PDF Upload</Form.Label>
              <Form.Control type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'aadhaar')} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>PAN Number</Form.Label>
              <Form.Control name="panNumber" value={formData.panNumber} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>PAN PDF Upload</Form.Label>
              <Form.Control type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'pan')} required />
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <h5 className="text-primary mt-4">Guarantor & Land Details</h5>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Guarantor Name</Form.Label>
              <Form.Control name="guarantorName" value={formData.guarantorName} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Guarantor Contact</Form.Label>
              <Form.Control name="guarantorContact" value={formData.guarantorContact} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Guarantor Relation</Form.Label>
              <Form.Control name="guarantorRelation" value={formData.guarantorRelation} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Collateral Type</Form.Label>
              <Form.Control name="collateralType" value={formData.collateralType} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Land Amount (₹)</Form.Label>
              <Form.Control name="landAmount" value={formData.landAmount} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Khasra Number</Form.Label>
              <Form.Control name="khsraNumber" value={formData.khsraNumber} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Land Ownership</Form.Label>
              <Form.Control name="landOwnership" value={formData.landOwnership} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Soil Type</Form.Label>
              <Form.Control name="soilType" value={formData.soilType} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Crop Type</Form.Label>
              <Form.Control name="cropType" value={formData.cropType} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Land Details PDF Upload</Form.Label>
          <Form.Control type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'land')} required />
        </Form.Group>

        <Button variant="success" type="submit" disabled={loading}>
          {loading ? <><Spinner size="sm" animation="border" /> Submitting...</> : 'Submit Application'}
        </Button>
      </Form>
    </Container>
  );
};

export default LoanFormPage;
