import { formatDate } from "../formatDate";

describe("formatDate utility", () => {
  test("formats date correctly", () => {
    const date = "2025-10-27T10:00:00Z";
    const formatted = formatDate(date);
    expect(formatted).toMatch(/Oct 2025|27 Oct 2025/);
  });

  test("returns empty string for invalid date", () => {
    expect(formatDate(null)).toBe("");
  });
});
