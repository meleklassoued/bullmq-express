import { Worker } from "bullmq";
import { connection } from "../connection";

export const backupWorker = new Worker(
  "data-backup",
  async (job) => {
    console.log(
      `Processing backup ${job.name}:`,
      job.data.backupId || job.data.requestId
    );
    // Simulate backup process
    await new Promise((resolve) =>
      setTimeout(resolve, 3000 + Math.random() * 7000)
    );
    console.log(`✅ Backup job ${job.name} completed`);
  },
  { connection, concurrency: 2 }
);
