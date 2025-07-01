import { userOnboardingQueue } from "./queue";

export async function addOnboardingJobs() {
  // Complete onboarding flow
  await userOnboardingQueue.add("start-onboarding", {
    userId: "user_new_001",
    email: "newuser@example.com",
    signupSource: "google-ads",
    plan: "free",
  });

  // Follow-up onboarding email (delayed)
  await userOnboardingQueue.add(
    "onboarding-followup",
    {
      userId: "user_new_001",
      step: "profile-completion",
      reminderCount: 1,
    },
    { delay: 24 * 60 * 60 * 1000 }
  ); // 24 hours delay

  // Onboarding completion check
  await userOnboardingQueue.add(
    "check-onboarding-completion",
    {
      userId: "user_new_001",
      daysAfterSignup: 7,
    },
    { delay: 7 * 24 * 60 * 60 * 1000 }
  ); // 7 days delay
}
