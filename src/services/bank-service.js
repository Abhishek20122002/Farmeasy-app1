import { privateAxios } from "./helper";

// 1. Add a new bank
export const addBank = (bankData) => {
  return privateAxios.post("/bank/add-bank", bankData).then((res) => res.data);
};

// 2. Get bank by ID
export const getBankById = (bankId) => {
  return privateAxios.get(`/bank/${bankId}`).then((res) => res.data);
};

// 3. Get all banks
export const getAllBanks = () => {
  return privateAxios.get("/bank/").then((res) => res.data);
};

// 4. Add scheme (bank must be logged in)
export const addScheme = (schemeData) => {
  return privateAxios.post("/bank/add-scheme", schemeData).then((res) => res.data);
};

// 5. Update scheme
export const updateScheme = (schemeId, schemeData) => {
  return privateAxios.put(`/bank/update-scheme/${schemeId}`, schemeData).then((res) => res.data);
};

// 6. Get all schemes for the logged-in bank
export const getSchemesByBank = () => {
  return privateAxios.get("/bank/scheme").then((res) => res.data);
};

// 7. Get all loan applications for the logged-in bank
export const getApplyStatusByBank = () => {
  return privateAxios.get("/bank/apply-status-bank").then((res) => res.data);
};

// 8. Update apply status by application ID
export const updateApplyStatus = (applyId, updateDTO) => {
  return privateAxios.put(`/bank/update-apply-status/${applyId}`, updateDTO).then((res) => res.data);
};

// 9. Get grievances submitted to the bank
export const getGrievences = () => {
  return privateAxios.get("/bank/grievences").then((res) => res.data);
};

export const getBankDashboardStats = () => {
  return privateAxios.get('/bank/dashboard-stats').then((res) => res.data);
};