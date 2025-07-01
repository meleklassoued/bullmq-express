import { Worker } from "bullmq";
import { connection } from "../connection";

export const imageWorker = new Worker(
  "image-processing",
  async (job) => {
    console.log(
      `Processing ${job.name} for image:`,
      job.data.imageId || job.data.batchId
    );
    // Simulate image processing
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 5000)
    );
    console.log(`✅ Image job ${job.name} completed`);
  },
  { connection, concurrency: 5 }
);
