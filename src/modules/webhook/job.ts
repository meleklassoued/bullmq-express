import { webhookQueue } from "./queue";
export async function addWebhookJobs() {
  // Order webhook
  await webhookQueue.add(
    "deliver-webhook",
    {
      webhookId: "wh_order_created",
      url: "https://merchant.example.com/webhooks/orders",
      payload: {
        event: "order.created",
        orderId: "order_789",
        amount: 5000,
        customerId: "cust_123",
      },
      signature: "sha256=abc123...",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Source": "payment-system",
      },
    },
    {
      attempts: 5,
      backoff: { type: "exponential", delay: 2000 },
    }
  );

  // User event webhook
  await webhookQueue.add("deliver-webhook", {
    webhookId: "wh_user_upgrade",
    url: "https://analytics.example.com/events",
    payload: {
      event: "user.plan_upgraded",
      userId: "user_456",
      newPlan: "premium",
      timestamp: new Date().toISOString(),
    },
  });
}
