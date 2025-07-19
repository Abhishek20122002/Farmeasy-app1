import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import { getSchemesByBank } from "../../services/bank-service";

const BankSchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const data = await getSchemesByBank();
      setSchemes(data);
    } catch (err) {
      console.error("Error fetching schemes:", err);
      setError("Failed to load schemes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">📋 Your Created Schemes</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <Spinner animation="border" />
          <span className="ms-2">Loading schemes...</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : schemes.length === 0 ? (
        <Alert variant="info" className="text-center">No schemes created yet.</Alert>
      ) : (
        <Row>
          {schemes.map((scheme) => (
            <Col md={6} lg={4} key={scheme.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{scheme.schemeName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{scheme.schemeType}</Card.Subtitle>
                  <Card.Text>
                    <strong>Tenure:</strong> {scheme.tenure}<br />
                    <strong>ROI:</strong> {scheme.roi}%<br />
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

export default BankSchemesPage;
