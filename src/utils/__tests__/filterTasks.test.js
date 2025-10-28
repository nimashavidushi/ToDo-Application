import { filterCompletedTasks, filterPendingTasks } from "../filterTasks";

const mockTasks = [
  { id: 1, title: "Task 1", completed: true },
  { id: 2, title: "Task 2", completed: false },
  { id: 3, title: "Task 3", completed: true },
];

describe("filterTasks utilities", () => {
  test("filters completed tasks correctly", () => {
    const completed = filterCompletedTasks(mockTasks);
    expect(completed).toHaveLength(2);
    expect(completed.every((t) => t.completed)).toBe(true);
  });

  test("filters pending tasks correctly", () => {
    const pending = filterPendingTasks(mockTasks);
    expect(pending).toHaveLength(1);
    expect(pending[0].title).toBe("Task 2");
  });
});
