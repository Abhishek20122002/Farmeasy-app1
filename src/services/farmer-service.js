import { privateAxios } from "./helper";

// 1. Update Farmer Profile
export const updateFarmer = (farmerId, farmerData) => {
  return privateAxios.put(`/farmer/${farmerId}`, farmerData).then(res => res.data);
};

// 2. Get Farmer by ID
export const getFarmerById = (farmerId) => {
  return privateAxios.get(`/farmer/${farmerId}`).then(res => res.data);
};

// 3. Get All Farmers
export const getAllFarmers = () => {
  return privateAxios.get("/farmer/").then(res => res.data);
};

// 4. Delete Farmer
export const deleteFarmer = (farmerId) => {
  return privateAxios.delete(`/farmer/${farmerId}`).then(res => res.data);
};

// 5. Submit Loan Form
export const submitLoanForm = async (loanFormData, aadhaar, pan, land) => {
  const formData = new FormData();
  formData.append("loanForm", JSON.stringify(loanFormData));
  formData.append("aadhaar", aadhaar);
  formData.append("pan", pan);
  formData.append("land", land);

  // Get token from localStorage (must match your login storage key)
  const token = localStorage.getItem("token"); // ✅ Correct now

  return privateAxios.post("/farmer/form", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
  });
};

// 6. Update Loan Form
export const updateLoanForm = (loanForm, aadhaar, pan, land) => {
  const formData = new FormData();
  formData.append("loanFormDTO", JSON.stringify(loanForm));
  formData.append("aadhaar", aadhaar);
  formData.append("pan", pan);
  formData.append("land", land);

  return privateAxios.put("/farmer/updateForm", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then(res => res.data);
};

// 7. Get Loan Form Detail
export const getLoanFormDetail = () => {
  return privateAxios.get("/farmer/getFormDetail").then(res => res.data);
};

// 8. Download Document (aadhaar, pan, land)
export const downloadDocument = (id, documentType) => {
  return privateAxios.get(`/farmer/download?id=${id}&documentType=${documentType}`, {
    responseType: "blob", // For file downloads
  }).then(res => res.data);
};

// 9. Get All Schemes (accessible to farmer)
export const getAllSchemes = () => {
  return privateAxios.get("/farmer/schemes").then(res => res.data);
};

// 10. Apply for a Scheme
export const applyForScheme = (schemeId, applyData) => {
  return privateAxios.post(`/farmer/apply/${schemeId}`, applyData).then(res => res.data);
};

// 11. Get Apply Status
export const getApplyStatus = () => {
  return privateAxios.get("/farmer/apply-status").then(res => res.data);
};

// 12. Get Specific Item
export const getItemById = (itemId) => {
  return privateAxios.get(`/farmer/item/${itemId}`).then(res => res.data);
};

// 13. Get All Items
export const getAllItems = () => {
  return privateAxios.get("/farmer/items").then(res => res.data);
};

// 14. Book an Item
export const bookItem = (itemId, bookingData) => {
  return privateAxios.post(`/farmer/item-booking/${itemId}`, bookingData).then(res => res.data);
};

// 15. Submit Grievance
export const submitGrievance = (grievanceData) => {
  return privateAxios.post("/farmer/grievences", grievanceData).then(res => res.data);
};