import { imageProcessingQueue } from "./queue";
export async function addImageProcessingJobs() {
  // Profile picture upload
  await imageProcessingQueue.add(
    "resize-image",
    {
      imageId: "img_789",
      userId: "user_123",
      originalPath: "/uploads/original/profile_pic.jpg",
      sizes: [
        { width: 150, height: 150, suffix: "thumb" },
        { width: 400, height: 400, suffix: "medium" },
        { width: 800, height: 800, suffix: "large" },
      ],
    },
    { priority: 5 }
  );

  // Bulk image optimization
  await imageProcessingQueue.add(
    "optimize-images",
    {
      batchId: "batch_001",
      imageIds: ["img_100", "img_101", "img_102"],
      quality: 85,
      format: "webp",
    },
    { priority: 2 }
  );
}
