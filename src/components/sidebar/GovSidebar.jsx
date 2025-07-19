import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const GovSidebar = () => {
  return (
    <div
      style={{
        width: '250px',
        minHeight: '100vh',
        backgroundColor: '#f3e8ff',
        boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
      }}
    >
      <h4 className="mb-4 fw-bold text-primary">Gov Dashboard</h4>
      <Nav className="flex-column gap-2">
        <Nav.Link as={Link} to="/gov/dashboard" className="rounded px-3 py-2 text-dark">
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/gov/grievances" className="rounded px-3 py-2 text-dark">
          Grievances
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default GovSidebar;
