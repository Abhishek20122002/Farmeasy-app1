import { privateAxios } from "./helper";

// Get all merchants
export const getAllMerchants = () => {
  return privateAxios.get("/merchant/").then(res => res.data);
};

// Get merchant by ID
export const getMerchantById = (merchantId) => {
  return privateAxios.get(`/merchant/${merchantId}`).then(res => res.data);
};

// Update merchant
export const updateMerchant = (merchantData) => {
  return privateAxios.put("/merchant/update", merchantData).then(res => res.data);
};

// Delete merchant
export const deleteMerchant = (merchantId) => {
  return privateAxios.delete(`/merchant/${merchantId}`).then(res => res.data);
};

// Add new item with image (multipart form-data)
export const addItem = (itemDTO, imageFile) => {
  const formData = new FormData();
  formData.append("itemDTO", JSON.stringify(itemDTO));
  formData.append("imageName", imageFile);

  return privateAxios.post("/merchant/add-item", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }).then(res => res.data);
};

// Update item
export const updateItem = (itemId, itemDTO) => {
  return privateAxios.put(`/merchant/update-item/${itemId}`, itemDTO).then(res => res.data);
};

// Delete item
export const deleteItem = (itemId) => {
  return privateAxios.delete(`/merchant/${itemId}`).then(res => res.data);
};

// Get all items by logged-in merchant
export const getItemsByMerchant = () => {
  return privateAxios.get("/merchant/items-merchant").then(res => res.data);
};

// Get all orders made for logged-in merchant
export const getOrdersForMerchant = () => {
  return privateAxios.get("/merchant/orders").then(res => res.data);
};
