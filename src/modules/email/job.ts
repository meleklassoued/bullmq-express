import { emailQueue } from "./queue";
export async function addEmailJobs() {
  // Welcome email
  await emailQueue.add("welcome-email", {
    userId: "user_123",
    email: "user@example.com",
    name: "John Doe",
    template: "welcome",
  });

  // Password reset email with delay
  await emailQueue.add(
    "password-reset",
    {
      userId: "user_456",
      email: "jane@example.com",
      resetToken: "abc123xyz",
      template: "password-reset",
    },
    { delay: 2000 }
  );

  // Weekly newsletter (repeatable)
  await emailQueue.add(
    "newsletter",
    {
      segmentId: "premium-users",
      template: "weekly-newsletter",
    },
    {
      repeat: { pattern: "0 9 * * 1" }, // Every Monday at 9 AM
      removeOnComplete: 10,
      removeOnFail: 5,
    }
  );
}
