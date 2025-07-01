import { connection } from "../connection";
import { Queue } from "bullmq";

export const emailQueue = new Queue("email-notifications", { connection });
