import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const FarmerSidebar = () => {
  return (
    <div
      style={{
        width: '250px',
        minHeight: '100vh',
        backgroundColor: '#e6f4ea',
        boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
      }}
    >
      <h4 className="mb-4 fw-bold text-success">Farmer Dashboard</h4>
      <Nav className="flex-column gap-2">
        <Nav.Link as={Link} to="/farmer/dashboard" className="rounded px-3 py-2 text-dark">
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/farmer/form" className="rounded px-3 py-2 text-dark">
          Loan Form
        </Nav.Link>
        <Nav.Link as={Link} to="/farmer/apply-status" className="rounded px-3 py-2 text-dark">
          Application Status
        </Nav.Link>
        <Nav.Link as={Link} to="/farmer/items" className="rounded px-3 py-2 text-dark">
          Book Items
        </Nav.Link>
        <Nav.Link as={Link} to="/farmer/grievances" className="rounded px-3 py-2 text-dark">
          Grievances
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default FarmerSidebar;
