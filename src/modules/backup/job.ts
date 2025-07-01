import { dataBackupQueue } from "./queue";
export async function addBackupJobs() {
  // Database backup
  await dataBackupQueue.add(
    "database-backup",
    {
      backupId: "db_backup_" + Date.now(),
      databases: ["users", "orders", "products"],
      destination: "s3://backups/database/",
      compression: true,
      encryption: true,
    },
    {
      repeat: { pattern: "0 3 * * *" }, // Daily at 3 AM
      removeOnComplete: 7,
      removeOnFail: 3,
    }
  );

  // User data export
  await dataBackupQueue.add(
    "export-user-data",
    {
      userId: "user_gdpr_request",
      requestId: "export_req_789",
      includeDeleted: false,
      format: "json",
    },
    { priority: 8 }
  ); // High priority for GDPR compliance
}
