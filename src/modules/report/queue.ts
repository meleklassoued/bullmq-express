import { Queue } from "bullmq";
import { connection } from "../connection";

export const reportQueue = new Queue("report-generation", { connection });
