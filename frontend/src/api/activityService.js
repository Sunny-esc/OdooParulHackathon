import api from "./apiClient";

export const getActivities = async (params = {}) => {
  const response = await api.get("activities/", { params });
  return response.data;
};

export const getActivity = async (activityId) => {
  const response = await api.get(`activities/${activityId}/`);
  return response.data;
};

export const createActivity = async (payload) => {
  const response = await api.post("activities/", payload);
  return response.data;
};

export const updateActivity = async (activityId, payload) => {
  const response = await api.patch(`activities/${activityId}/`, payload);
  return response.data;
};

export const deleteActivity = async (activityId) => {
  await api.delete(`activities/${activityId}/`);
};
