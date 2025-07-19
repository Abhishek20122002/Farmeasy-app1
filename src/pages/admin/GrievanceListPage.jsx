import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Alert, Container } from 'react-bootstrap';
import { getAllGrievances, updateGrievance } from '../../services/gov-service';

const GrievanceListPage = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      const res = await getAllGrievances();
      setGrievances(res.data);
    } catch (err) {
      console.error('Error loading grievances:', err);
      setError('Failed to load grievances');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    const response = prompt('Enter your response to the grievance:');
    if (!response) return;

    try {
      await updateGrievance(id, {
        response,
        status: 'RESOLVED',
      });
      alert('Grievance updated successfully!');
      fetchGrievances();
    } catch (err) {
      console.error('Error updating grievance:', err);
      alert('Failed to update grievance');
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">All Grievances</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : grievances.length === 0 ? (
        <Alert variant="info">No grievances available.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Farmer Name</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((grievance, index) => (
              <tr key={grievance.id}>
                <td>{index + 1}</td>
                <td>{grievance.farmerName}</td>
                <td>{grievance.subject}</td>
                <td>{grievance.message}</td>
                <td>{grievance.status}</td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleUpdate(grievance.id)}
                  >
                    Respond
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default GrievanceListPage;
