import { Worker } from "bullmq";
import { connection } from "../connection";

export const onboardingWorker = new Worker(
  "user-onboarding",
  async (job) => {
    console.log(`Processing onboarding ${job.name} for user:`, job.data.userId);
    // Simulate onboarding process
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 3000)
    );
    console.log(`✅ Onboarding job ${job.name} completed`);
  },
  { connection, concurrency: 8 }
);
