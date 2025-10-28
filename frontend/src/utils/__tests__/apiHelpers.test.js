import { fetchTasks, deleteTaskById } from "../apiHelpers";
import api from "../../api";

jest.mock("../../api");
jest.mock("axios");


describe("apiHelpers utilities", () => {
  test("fetchTasks returns data", async () => {
    const mockData = [{ id: 1, title: "Test" }];
    api.get.mockResolvedValue({ data: mockData });

    const result = await fetchTasks();
    expect(result).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith("/tasks");
  });

  test("deleteTaskById calls API correctly", async () => {
    api.delete.mockResolvedValue({});

    const id = 123;
    const result = await deleteTaskById(id);
    expect(api.delete).toHaveBeenCalledWith("/tasks/123");
    expect(result).toBe(id);
  });
});
