import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import { addItem } from '../../services/merchant-service';

const AddItemPage = () => {
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState({ text: '', variant: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemData.name || !itemData.description || !itemData.price || !imageFile) {
      setMessage({ text: 'Please fill in all fields including image.', variant: 'warning' });
      return;
    }

    try {
      setLoading(true);
      await addItem(itemData, imageFile);
      setMessage({ text: '✅ Item added successfully!', variant: 'success' });
      setItemData({ name: '', description: '', price: '' });
      setImageFile(null);
    } catch (err) {
      setMessage({ text: '❌ Error adding item. Please try again.', variant: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center text-success mb-4">🛒 Add New Item</h2>

            {message.text && (
              <Alert variant={message.variant}>{message.text}</Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="itemName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={itemData.name}
                  onChange={handleChange}
                  placeholder="Enter item name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="itemDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={itemData.description}
                  onChange={handleChange}
                  placeholder="Enter item description"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="itemPrice">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={itemData.price}
                  onChange={handleChange}
                  placeholder="Enter item price"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="itemImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>

              <div className="text-center">
                <Button
                  variant="success"
                  type="submit"
                  disabled={loading}
                  className="px-5"
                >
                  {loading ? <Spinner animation="border" size="sm" /> : 'Add Item'}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddItemPage;
