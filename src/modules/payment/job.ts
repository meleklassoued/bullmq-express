import { paymentQueue } from "./queue";
export async function addPaymentJobs() {
  // Process subscription payment
  await paymentQueue.add(
    "process-subscription",
    {
      userId: "user_789",
      subscriptionId: "sub_premium_monthly",
      amount: 2999, // in cents
      currency: "USD",
      paymentMethodId: "pm_card_visa",
    },
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 },
    }
  );

  // Refund processing
  await paymentQueue.add(
    "process-refund",
    {
      orderId: "order_456",
      amount: 1500,
      reason: "customer-request",
      refundId: "ref_123",
    },
    { delay: 1000 }
  );

  // Daily payment reconciliation
  await paymentQueue.add(
    "payment-reconciliation",
    {
      date: new Date().toISOString().split("T")[0],
      providerId: "stripe",
    },
    {
      repeat: { pattern: "0 2 * * *" }, // Daily at 2 AM
      removeOnComplete: 30,
    }
  );
}
