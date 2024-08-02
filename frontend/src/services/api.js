import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getEmployees = () => api.get("/employee");
export const createEmployee = (data) => api.post("/employee", data);
export const updateEmployee = (id, data) => api.put(`/employee/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employee/${id}`);

export const getLeaves = () => api.get("/leave");
export const createLeave = (data) => api.post("/leave", data);
export const updateLeave = (id, data) => api.put(`/leave/${id}`, data);
export const deleteLeave = (id) => api.delete(`/leave/${id}`);

const apis = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
};

export default apis;
