import { Queue, Worker } from "bullmq";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { createBullBoard } from "@bull-board/api";
import express from "express";
import { ExpressAdapter } from "@bull-board/express";
import {
  emailQueue,
  imageProcessingQueue,
  paymentQueue,
  reportQueue,
  webhookQueue,
  userOnboardingQueue,
  dataBackupQueue,
} from "./modules/queues";
import {
  paymentWorker,
  emailWorker,
  imageWorker,
  reportWorker,
  webhookWorker,
  onboardingWorker,
  backupWorker,
} from "./modules/workers";
import {
  addEmailJobs,
  addBackupJobs,
  addImageProcessingJobs,
  addOnboardingJobs,
  addPaymentJobs,
  addReportJobs,
  addWebhookJobs,
} from "./modules/jobs";
// Real-world queue examples

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const {
  addQueue: _addQueue,
  removeQueue: _removeQueue,
  setQueues: _setQueues,
  replaceQueues: _replaceQueues,
} = createBullBoard({
  queues: [
    new BullMQAdapter(emailQueue),
    new BullMQAdapter(imageProcessingQueue),
    new BullMQAdapter(paymentQueue),
    new BullMQAdapter(reportQueue),
    new BullMQAdapter(webhookQueue),
    new BullMQAdapter(userOnboardingQueue),
    new BullMQAdapter(dataBackupQueue),
  ],
  serverAdapter: serverAdapter,
});

async function addAllJobs() {
  await Promise.all([
    addEmailJobs,
    addBackupJobs,
    addOnboardingJobs,
    addPaymentJobs,
    addOnboardingJobs,
    addImageProcessingJobs,
    addWebhookJobs,
    addReportJobs,
  ]);
  console.log("All sample jobs added to queues!");
}

addAllJobs().catch(console.error);

[
  emailWorker,
  imageWorker,
  paymentWorker,
  reportWorker,
  webhookWorker,
  onboardingWorker,
  backupWorker,
].forEach((worker) => {
  worker.on("completed", (job) => {
    console.log(
      `🎉 Job ${job.id} in queue ${job.queueName} completed successfully`
    );
  });

  worker.on("failed", (job, error) => {
    console.error(
      `❌ Job ${job?.id} in queue ${job?.queueName} failed:`,
      error.message
    );
  });

  worker.on("progress", (job, progress) => {
    console.log(`⏳ Job ${job.id} progress: ${progress}%`);
  });
});

const app = express();
app.use("/admin/queues", serverAdapter.getRouter());

app.listen(3000, () => {
  console.log("Running on 3000");
  console.log("For the UI, open http://localhost:3000/admin/queues");
});
