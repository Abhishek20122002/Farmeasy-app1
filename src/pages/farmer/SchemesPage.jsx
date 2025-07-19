import React, { useEffect, useState } from "react";
import { applyForScheme, getAllSchemes } from "../../services/farmer-service";
import { Card, Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

const SchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [filterBank, setFilterBank] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [amounts, setAmounts] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const res = await getAllSchemes();
      setSchemes(res);
    } catch (error) {
      console.error("Error fetching schemes:", error);
    }
  };

  const handleAmountChange = (schemeId, value) => {
    setAmounts(prev => ({ ...prev, [schemeId]: value }));
  };

  const handleApply = async (schemeId, bankName, schemeName) => {
    const amount = amounts[schemeId];
    setMessage("");
    setError("");

    if (!amount) {
      setError("Please enter an amount before applying.");
      return;
    }

    try {
      await applyForScheme(schemeId, { amount });
      setMessage(`You have applied for the ${schemeName} from ${bankName}.`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data); // e.g., "You have already applied to this scheme."
      } else {
        setError("Application failed. Please try again later.");
      }
    }
  };

  const filteredSchemes = schemes.filter(s =>
    (filterBank === "all" || s.bankDTO.bankName === filterBank) &&
    (filterType === "all" || s.schemeType === filterType)
  );

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Available Loan Schemes</h2>

      {message && <Alert variant="success" onClose={() => setMessage("")} dismissible>{message}</Alert>}
      {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

      <Row className="mb-4">
        <Col>
          <Form.Select value={filterBank} onChange={e => setFilterBank(e.target.value)}>
            <option value="all">All Banks</option>
            <option value="State Bank of India">State Bank of India</option>
            <option value="Punjab National Bank">Punjab National Bank</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="all">All Scheme Types</option>
            <option value="Short Term">Short Term</option>
            <option value="Long Term">Long Term</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredSchemes.map(scheme => (
          <Col md={6} lg={4} key={scheme.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{scheme.schemeName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{scheme.bankDTO.bankName}</Card.Subtitle>
                <Card.Text>
                  <strong>Tenure:</strong> {scheme.tenure}<br />
                  <strong>ROI:</strong> {scheme.roi}<br />
                  <strong>Description:</strong> {scheme.schemeDescription}
                </Card.Text>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={amounts[scheme.id] || ""}
                  onChange={e => handleAmountChange(scheme.id, e.target.value)}
                  className="mb-2"
                />
                <Button
                  variant="primary"
                  onClick={() => handleApply(scheme.id, scheme.bankDTO.bankName, scheme.schemeName)}
                >
                  Apply
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SchemesPage;
