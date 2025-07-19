import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner, Row, Col, Alert } from 'react-bootstrap';
import {
  getLoanFormDetail,
  updateLoanForm,
  downloadDocument,
} from '../../services/farmer-service';

const UpdateLoanFormPage = () => {
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    landSize: '',
    annualIncome: '',
  });

  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [landFile, setLandFile] = useState(null);
  const [formId, setFormId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const data = await getLoanFormDetail();
      setFormId(data.id);
      setFormData({
        amount: data.amount,
        purpose: data.purpose,
        landSize: data.landSize,
        annualIncome: data.annualIncome,
      });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: 'Failed to load loan form.' });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.purpose || !formData.landSize || !formData.annualIncome) {
      return setMessage({ type: 'danger', text: 'All fields are required.' });
    }

    setLoading(true);
    try {
      await updateLoanForm(formData, aadhaarFile, panFile, landFile);
      setMessage({ type: 'success', text: 'Loan form updated successfully.' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: 'Failed to update loan form.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (type) => {
    try {
      const blob = await downloadDocument(formId, type);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_document.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
      alert(`Failed to download ${type} document.`);
    }
  };

  return (
    <Card className="mt-4 p-4 shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
      <h3 className="text-success mb-4">Update Loan Application</h3>

      {message.text && (
        <Alert variant={message.type}>{message.text}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Loan Amount (₹)</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Enter loan amount"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Purpose of Loan</Form.Label>
          <Form.Control
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            placeholder="E.g., Buy seeds, machinery"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Land Size (in acres)</Form.Label>
          <Form.Control
            type="number"
            name="landSize"
            value={formData.landSize}
            onChange={handleInputChange}
            placeholder="E.g., 2.5"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Annual Income (₹)</Form.Label>
          <Form.Control
            type="number"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleInputChange}
            placeholder="Enter annual income"
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Aadhaar Upload</Form.Label>
              <Form.Control type="file" onChange={(e) => handleFileChange(e, setAadhaarFile)} />
              <Button variant="link" onClick={() => handleDownload('aadhaar')}>
                Download Aadhaar
              </Button>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>PAN Upload</Form.Label>
              <Form.Control type="file" onChange={(e) => handleFileChange(e, setPanFile)} />
              <Button variant="link" onClick={() => handleDownload('pan')}>
                Download PAN
              </Button>
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-4">
              <Form.Label>Land Document Upload</Form.Label>
              <Form.Control type="file" onChange={(e) => handleFileChange(e, setLandFile)} />
              <Button variant="link" onClick={() => handleDownload('land')}>
                Download Land Doc
              </Button>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="success" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Update Loan Form'}
        </Button>
      </Form>
    </Card>
  );
};

export default UpdateLoanFormPage;
