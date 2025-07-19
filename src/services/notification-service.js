import { privateAxios } from "./helper";

// Get all notifications for the logged-in farmer
export const getAllNotifications = () => {
  return privateAxios.get("/notifications/").then(res => res.data);
};

// Get a specific notification by ID and mark it as read
export const getNotificationById = (id) => {
  return privateAxios.get(`/notifications/detail/${id}`).then(res => res.data);
};