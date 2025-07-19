import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const MerchantSidebar = () => {
  return (
    <div
      style={{
        width: '250px',
        minHeight: '100vh',
        backgroundColor: '#fff9db',
        boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
      }}
    >
      <h4 className="mb-4 fw-bold text-warning">Merchant Dashboard</h4>
      <Nav className="flex-column gap-2">
        <Nav.Link as={Link} to="/merchant/dashboard" className="rounded px-3 py-2 text-dark">
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/merchant/items" className="rounded px-3 py-2 text-dark">
          Manage Items
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default MerchantSidebar;
