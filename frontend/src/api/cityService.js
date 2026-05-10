import api from "./apiClient";

export const getCities = async (params = {}) => {
  const response = await api.get("cities/", { params });
  return response.data;
};

export const getCity = async (cityId) => {
  const response = await api.get(`cities/${cityId}/`);
  return response.data;
};
