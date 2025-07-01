import { Queue } from "bullmq";
import { connection } from "../connection";

export const webhookQueue = new Queue("webhook-delivery", { connection });
