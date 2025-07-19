import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const BankSidebar = () => {
  return (
    <div
      style={{
        width: '250px',
        minHeight: '100vh',
        backgroundColor: '#e7f0fa',
        boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
      }}
    >
      <h4 className="mb-4 fw-bold text-primary">Bank Dashboard</h4>
      <Nav className="flex-column gap-2">
        <Nav.Link as={Link} to="/bank/dashboard" className="rounded px-3 py-2 text-dark" activeClassName="active">
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/bank/schemes" className="rounded px-3 py-2 text-dark">
          Loan Schemes
        </Nav.Link>
        <Nav.Link as={Link} to="/bank/applications" className="rounded px-3 py-2 text-dark">
          Applications
        </Nav.Link>
        <Nav.Link as={Link} to="/bank/grievances" className="rounded px-3 py-2 text-dark">
          Grievances
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default BankSidebar;