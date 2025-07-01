import { Worker } from "bullmq";
import { connection } from "../connection";

export const emailWorker = new Worker(
  "email-notifications",
  async (job) => {
    console.log(
      `Processing ${job.name} for email:`,
      job.data.email || job.data.template
    );
    // Simulate email processing
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );
    console.log(`✅ Email job ${job.name} completed`);
  },
  { connection, concurrency: 10 }
);
