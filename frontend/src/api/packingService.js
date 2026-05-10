import api from "./apiClient";

export const getPackingItems = async (params = {}) => {
  const response = await api.get("packing-items/", { params });
  return response.data;
};

export const createPackingItem = async (payload) => {
  const response = await api.post("packing-items/", payload);
  return response.data;
};

export const updatePackingItem = async (itemId, payload) => {
  const response = await api.patch(`packing-items/${itemId}/`, payload);
  return response.data;
};

export const deletePackingItem = async (itemId) => {
  await api.delete(`packing-items/${itemId}/`);
};
