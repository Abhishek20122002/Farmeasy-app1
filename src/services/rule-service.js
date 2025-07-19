import { privateAxios } from "./helper"; // Use authenticated Axios instance

// Create a new scheme rule
export const createSchemeRule = (ruleData) => {
  return privateAxios
    .post("/rules/create", ruleData)
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || "Rule creation failed";
    });
};

// Get all rules for a specific scheme
export const getRulesByScheme = (schemeId) => {
  return privateAxios
    .get(`/rules/scheme/${schemeId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || "Failed to fetch rules";
    });
};

// Delete a specific rule by ruleId
export const deleteSchemeRule = (ruleId) => {
  return privateAxios
    .delete(`/rules/${ruleId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || "Failed to delete rule";
    });
};