// utils/constants.js

// Role constants
export const ROLES = {
  FARMER: "FARMER",
  BANK: "BANK",
  MERCHANT: "MERCHANT",
  ADMIN: "ADMIN",
};

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOAN_FORM: "/farmer/form",
  ADD_SCHEME: "/bank/add-scheme",
  APPLY_SCHEME: "/farmer/apply",
  GET_ITEMS: "/farmer/items",
  GRIEVANCES: "/grievences",
  NOTIFICATIONS: "/notifications",
};

// Statuses
export const STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
};

// Misc
export const MAX_LOAN_SCHEMES = 3;