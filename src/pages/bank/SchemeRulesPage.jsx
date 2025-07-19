import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col, Card } from "react-bootstrap";
import { privateAxios } from "../../utils/helper";

const SchemeRulesPage = () => {
  const [rule, setRule] = useState({
    ruleName: "",       // ✅ Added
    schemeId: "",
    field: "",
    operator: "",
    value: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setRule({
      ...rule,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    try {
      const res = await privateAxios.post("/rules/create", rule);
      setMessage("✅ Rule created successfully.");
      setRule({
        ruleName: "",
        schemeId: "",
        field: "",
        operator: "",
        value: ""
      });
    } catch (err) {
      setError(true);
      setMessage(err.response?.data || "❌ Error creating rule.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 text-center fw-bold">
                📋 Create New Scheme Rule
              </Card.Title>

              {message && (
                <Alert variant={error ? "danger" : "success"}>{message}</Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="ruleName">
                  <Form.Label>Rule Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ruleName"
                    placeholder="e.g. Income Eligibility Rule"
                    value={rule.ruleName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="schemeId">
                  <Form.Label>Scheme ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="schemeId"
                    placeholder="Enter Scheme ID"
                    value={rule.schemeId}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="field">
                  <Form.Label>Field</Form.Label>
                  <Form.Control
                    type="text"
                    name="field"
                    placeholder="e.g. income"
                    value={rule.field}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="operator">
                  <Form.Label>Operator</Form.Label>
                  <Form.Control
                    type="text"
                    name="operator"
                    placeholder="e.g. >, <, ==, >=, etc."
                    value={rule.operator}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="value">
                  <Form.Label>Value</Form.Label>
                  <Form.Control
                    type="text"
                    name="value"
                    placeholder="e.g. 50000"
                    value={rule.value}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    ➕ Create Rule
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

export default SchemeRulesPage;
