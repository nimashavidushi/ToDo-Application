export const filterCompletedTasks = (tasks) => {
  return tasks.filter((task) => task.completed);
};

export const filterPendingTasks = (tasks) => {
  return tasks.filter((task) => !task.completed);
};
