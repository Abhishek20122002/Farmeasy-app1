import { myAxios } from "./helper";

// 1. User Login
export const login = (credentials) => {
  return myAxios.post("/auth/login", credentials).then((res) => res.data);
};

// 2. Farmer Registration
export const registerFarmer = (farmerData) => {
  return myAxios.post("/auth/register/farmer", farmerData).then((res) => res.data);
};

// 3. Bank Registration
export const registerBank = (bankData) => {
  return myAxios.post("/auth/register/bank", bankData).then((res) => res.data);
};

// 4. Merchant Registration
export const registerMerchant = (merchantData) => {
  return myAxios.post("/auth/register/merchant", merchantData).then((res) => res.data);
};