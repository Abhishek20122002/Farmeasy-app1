import React from 'react';
import AdminNavbar from '@/components/navbar/AdminNavbar';
import AdminSidebar from '@/components/sidebar/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
      <AdminSidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <AdminNavbar />
        <main className="flex-grow-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
