import { Queue } from "bullmq";
import { connection } from "../connection";

export const dataBackupQueue = new Queue("data-backup", { connection });
