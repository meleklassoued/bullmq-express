import { Queue } from "bullmq";
import { connection } from "../connection";

export const paymentQueue = new Queue("payment-processing", { connection });
