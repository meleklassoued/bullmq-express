import { reportQueue } from "./queue";
export async function addReportJobs() {
  // Monthly sales report
  await reportQueue.add(
    "generate-sales-report",
    {
      reportId: "sales_2024_01",
      userId: "admin_001",
      dateRange: {
        start: "2024-01-01",
        end: "2024-01-31",
      },
      format: "pdf",
      includeCharts: true,
    },
    { priority: 3 }
  );

  // User analytics report
  await reportQueue.add("user-analytics", {
    reportId: "analytics_weekly",
    metrics: ["activeUsers", "signups", "churnRate"],
    segmentBy: "plan",
  });
}
