import { Queue } from "bullmq";
import { connection } from "../connection";

export const userOnboardingQueue = new Queue("user-onboarding", { connection });
