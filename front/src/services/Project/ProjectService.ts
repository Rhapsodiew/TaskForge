import api from "../api";

export const getAllProject = async () => {
  const response = await api.get("/projects");
  return response.data;
};