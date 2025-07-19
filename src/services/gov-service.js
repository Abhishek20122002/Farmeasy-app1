import { privateAxios } from "./helper";

// 1. Get All Grievances
export const getAllGrievances = () => {
  return privateAxios.get("/gov/grievences").then(res => res.data);
};

// 2. Update Grievance by ID
export const updateGrievance = (grievanceId, grievanceResponseData) => {
  return privateAxios.put(`/gov/update-grievences/${grievanceId}`, grievanceResponseData).then(res => res.data);
};