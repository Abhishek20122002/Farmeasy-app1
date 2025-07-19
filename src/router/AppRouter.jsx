// router/AppRouter.jsx
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { RoleContext } from "../context/RoleContext";
import { ROLES } from "../utils/constants";

// Layouts
import FarmerLayout from "../layouts/FarmerLayout";
import BankLayout from "../layouts/BankLayout";
import MerchantLayout from "../layouts/MerchantLayout";
import AdminLayout from "../layouts/AdminLayout";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Farmer Pages
import FarmerDashboard from "../pages/farmer/Dashboard";
import LoanFormPage from "../pages/farmer/LoanFormPage";
import SchemesPage from "../pages/farmer/SchemesPage";
import GrievancesPage from "../pages/farmer/GrievancesPage";

// Bank Pages
import BankDashboard from "../pages/bank/Dashboard";
import AddScheme from "../pages/bank/AddScheme";
import ApplyRequestsPage from "../pages/bank/ApplyRequestsPage";

// Merchant Pages
import MerchantDashboard from "../pages/merchant/Dashboard";
import AddItemPage from "../pages/merchant/AddItemPage";
import OrdersPage from "../pages/merchant/OrdersPage";

// Admin Pages
import GrievanceListPage from "../pages/admin/GrievanceListPage";

// Notification Page
import NotificationListPage from "../pages/notifications/NotificationListPage";

const AppRouter = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { role } = useContext(RoleContext);

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Farmer Routes */}
        {role === ROLES.FARMER && (
          <Route path="/*" element={<FarmerLayout />}>
            <Route path="dashboard" element={<FarmerDashboard />} />
            <Route path="loan-form" element={<LoanFormPage />} />
            <Route path="schemes" element={<SchemesPage />} />
            <Route path="grievances" element={<GrievancesPage />} />
            <Route path="notifications" element={<NotificationListPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}

        {/* Bank Routes */}
        {role === ROLES.BANK && (
          <Route path="/*" element={<BankLayout />}>
            <Route path="dashboard" element={<BankDashboard />} />
            <Route path="add-scheme" element={<AddScheme />} />
            <Route path="apply-requests" element={<ApplyRequestsPage />} />
            <Route path="notifications" element={<NotificationListPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}

        {/* Merchant Routes */}
        {role === ROLES.MERCHANT && (
          <Route path="/*" element={<MerchantLayout />}>
            <Route path="dashboard" element={<MerchantDashboard />} />
            <Route path="add-item" element={<AddItemPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="notifications" element={<NotificationListPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}

        {/* Admin (Gov) Routes */}
        {role === ROLES.ADMIN && (
          <Route path="/*" element={<AdminLayout />}>
            <Route path="grievances" element={<GrievanceListPage />} />
            <Route path="notifications" element={<NotificationListPage />} />
            <Route path="*" element={<Navigate to="/grievances" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;