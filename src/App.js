// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { RoleProvider, useRole } from './context/RoleContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import FarmerNavbar from './components/navbar/FarmerNavbar';
import BankNavbar from './components/navbar/BankNavbar';
import MerchantNavbar from './components/navbar/MerchantNavbar';
import GovernmentNavbar from './components/navbar/GovernmentNavbar';
import DefaultNavbar from './components/navbar/DefaultNavbar';

import FarmerDashboard from './pages/farmer/Dashboard';
import LoanFormPage from './pages/farmer/LoanFormPage';
import GrievancesPage from './pages/farmer/GrievancesPage';
import SchemesPage from './pages/farmer/SchemesPage';
import UpdateLoanFormPage from './pages/farmer/UpdateLoanFormPage';

import BankDashboard from './pages/bank/Dashboard';
import AddScheme from './pages/bank/AddScheme';
import ApplyRequestsPage from './pages/bank/ApplyRequestsPage';
import SchemeRulesPage from './pages/bank/SchemeRulesPage';
import BankSchemesPage from "./pages/bank/BankSchemesPage";

import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const { role } = useRole();

  const renderNavbar = () => {
    switch (role) {
      case 'FARMER':
        return <FarmerNavbar />;
      case 'BANK':
        return <BankNavbar />;
      case 'MERCHANT':
        return <MerchantNavbar />;
      case 'GOVERNMENT':
        return <GovernmentNavbar />;
      default:
        return <DefaultNavbar />;
    }
  };

  return (
    <Router>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Farmer routes */}
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/loan-form" element={<LoanFormPage />} />
        <Route path="/farmer/grievances" element={<GrievancesPage />} />
        <Route path="/farmer/view-schemes" element={<SchemesPage />} />
        <Route path="/farmer/update-loan/:id" element={<UpdateLoanFormPage />} />

        {/* Add other role-based routes as needed */}

        {/* Bank routes */}
        <Route path="/bank/dashboard" element={<BankDashboard />} />
        <Route path="/bank/add-scheme" element={<AddScheme />} />
        <Route path="/bank/apply-requests" element={<ApplyRequestsPage />} />
        <Route path="/bank/scheme-rules" element={<SchemeRulesPage />} />
        <Route path="/bank/my-schemes" element={<BankSchemesPage />} />

      </Routes>
    </Router>
  );
};

function App() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}

export default App;
