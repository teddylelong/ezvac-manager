import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

// Employees
export const getEmployees = () => api.get("/employee");
export const createEmployee = (data) => api.post("/employee", data);
export const updateEmployee = (id, data) => api.put(`/employee/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employee/${id}`);

// Leaves
export const getLeaves = () => api.get("/leave");
export const createLeave = (data) => api.post("/leave", data);
export const updateLeave = (id, data) => api.put(`/leave/${id}`, data);
export const deleteLeave = (id) => api.delete(`/leave/${id}`);

// Settings
export const getSettings = () => api.get("/settings");
export const createSettings = (data) => api.post("/settings", data);
export const updateSettings = (id, data) => api.put(`/settings/${id}`, data);
export const deleteSettings = (id) => api.delete(`/settings/${id}`);

const apis = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
  getSettings,
  createSettings,
  updateSettings,
  deleteSettings,
};

export default apis;
