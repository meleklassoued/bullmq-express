import { Worker } from "bullmq";
import { connection } from "../connection";

export const paymentWorker = new Worker(
  "payment-processing",
  async (job) => {
    console.log(`Processing ${job.name} for amount:`, job.data.amount);
    // Simulate payment processing
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 3000)
    );
    console.log(`✅ Payment job ${job.name} completed`);
  },
  { connection, concurrency: 3 }
);
