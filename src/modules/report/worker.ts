import { Worker } from "bullmq";
import { connection } from "../connection";

export const reportWorker = new Worker(
  "report-generation",
  async (job) => {
    console.log(`Generating ${job.name} report:`, job.data.reportId);
    // Simulate report generation
    await new Promise((resolve) =>
      setTimeout(resolve, 5000 + Math.random() * 10000)
    );
    console.log(`✅ Report job ${job.name} completed`);
  },
  { connection, concurrency: 2 }
);
