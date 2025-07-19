import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

// Import dashboards
import FarmerDashboard from './farmer/Dashboard';
import MerchantDashboard from './merchant/Dashboard';
import BankDashboard from './bank/Dashboard';
import GrievanceListPage from './admin/GrievanceListPage';

import welcomeImage from '../assets/images/dashboard-welcome.png'; // 📸 Add an appropriate image in assets

const Dashboard = () => {
  const { role } = useRole();
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!role) {
      navigate('/login');
    } else {
      setRedirected(true);
    }
  }, [role, navigate]);

  const renderDashboard = () => {
    switch (role) {
      case 'FARMER':
        return <FarmerDashboard />;
      case 'MERCHANT':
        return <MerchantDashboard />;
      case 'BANK':
        return <BankDashboard />;
      case 'GOVERNMENT':
        return <GrievanceListPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center mt-20">
            <img src={welcomeImage} alt="Welcome" className="w-64 mb-6" />
            <h2 className="text-3xl font-bold text-red-600 mb-2">Dashboard Not Found</h2>
            <p className="text-gray-600">
              Your role doesn’t match any dashboard. Please contact admin for access.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white p-6">
      {redirected ? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-700 animate-pulse">🌾 Welcome to Your Dashboard</h1>
            <p className="text-lg text-gray-600 mt-2">Serving role: <span className="font-semibold">{role}</span></p>
          </div>
          <div>{renderDashboard()}</div>
        </>
      ) : (
        <div className="text-center text-lg text-gray-600 mt-20">Redirecting to your dashboard...</div>
      )}
    </div>
  );
};

export default Dashboard;
