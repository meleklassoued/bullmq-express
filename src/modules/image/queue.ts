import { Queue } from "bullmq";
import { connection } from "../connection";

export const imageProcessingQueue = new Queue("image-processing", {
  connection,
});
