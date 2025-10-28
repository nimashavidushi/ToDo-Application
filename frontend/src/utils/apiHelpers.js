import api from "../api";

export const fetchTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const deleteTaskById = async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
};
