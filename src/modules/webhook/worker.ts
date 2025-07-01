import { Worker } from "bullmq";
import { connection } from "../connection";

export const webhookWorker = new Worker(
  "webhook-delivery",
  async (job) => {
    console.log(`Delivering webhook to:`, job.data.url);
    // Simulate webhook delivery
    await new Promise((resolve) =>
      setTimeout(resolve, 500 + Math.random() * 1500)
    );
    console.log(`✅ Webhook job ${job.name} completed`);
  },
  { connection, concurrency: 15 }
);
