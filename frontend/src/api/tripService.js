import api from "./apiClient";

export const getTrips = async (params) => {
  const response = await api.get("trips/", { params });
  return response.data;
};

export const getTrip = async (tripId) => {
  const response = await api.get(`trips/${tripId}/`);
  return response.data;
};

export const createTrip = async (payload) => {
  const response = await api.post("trips/", payload);
  return response.data;
};

export const updateTrip = async (tripId, payload) => {
  const response = await api.patch(`trips/${tripId}/`, payload);
  return response.data;
};

export const deleteTrip = async (tripId) => {
  await api.delete(`trips/${tripId}/`);
};

export const getBudgetReport = async (tripId) => {
  const response = await api.get(`trips/${tripId}/budget_report/`);
  return response.data;
};

export const copyTrip = async (tripId) => {
  const response = await api.post(`trips/${tripId}/copy/`);
  return response.data;
};
