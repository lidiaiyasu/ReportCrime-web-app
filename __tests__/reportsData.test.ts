import {
  listReports,
  createReport,
  getReportById,
  getDashboardStats,
} from "@/lib/data/reports";

describe("reports data layer", () => {
  it("lists the seeded reports", () => {
    const reports = listReports();
    expect(reports.length).toBeGreaterThanOrEqual(2);
  });

  it("filters by query across title/suspect/victim", () => {
    const reports = listReports({ query: "theft" });
    expect(reports.every((r) => r.crimeTitle.toLowerCase().includes("theft"))).toBe(
      true
    );
  });

  it("filters by status", () => {
    const reports = listReports({ status: "closed" });
    expect(reports.every((r) => r.status === "closed")).toBe(true);
  });

  it("creates a new report and assigns an incrementing ID", () => {
    const before = listReports().length;
    const report = createReport({
      crimeTitle: "Test Vandalism Case",
      crimeType: "other",
      region: "addis",
      date: "2025-09-01",
      description: "Graffiti on a public building.",
      victimName: "City of Addis Ababa",
    });
    expect(report.id).toMatch(/^CR\d{3}$/);
    expect(report.status).toBe("open");
    expect(listReports().length).toBe(before + 1);
    expect(getReportById(report.id)?.crimeTitle).toBe("Test Vandalism Case");
  });

  it("computes dashboard stats consistent with the report list", () => {
    const stats = getDashboardStats();
    const all = listReports();
    expect(stats.totalCases).toBe(all.length);
    expect(stats.closedCases).toBe(all.filter((r) => r.status === "closed").length);
  });
});
