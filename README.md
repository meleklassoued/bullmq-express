# BullMQ Express Example:

This project demonstrates how to use [BullMQ](https://doc.bullmq.io) with Express to manage and visualize background jobs and queues in Node.js.

## Overview

The codebase is organized into modules for different job types (email, image processing, payments, reports, web hooks, onboarding, and backups). Each module contains:

- **Queue**: Defines a BullMQ queue for a specific job type.
- **Worker**: Processes jobs from the queue.
- **Job**: Adds sample jobs to the queue.

## Folder Structure

```
src/
  index.ts                # Main entry point, sets up Express and Bull Board
  modules/
    connection.ts         # Redis connection config
    queues.ts             # Exports all queues
    workers.ts            # Exports all workers
    jobs.ts               # Exports all job-adding functions
    <module>/
      queue.ts            # Queue definition for the module
      worker.ts           # Worker for processing jobs
      job.ts              # Function to add sample jobs
```

## How It Works

- Each queue (e.g., email, payment, image) is connected to Redis.
- Workers listen for jobs and process them concurrently.
- Sample jobs are automatically added to each queue on startup.
- The `/admin/queues` dashboard lets you view, retry, or remove jobs.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Docker](https://www.docker.com/) (for running Redis)

### 1. Install Dependencies

```sh
yarn
```

### 2. Start Redis

You can start a local Redis server using Docker:

```sh
docker-compose up -d
```

### 3. Run the Project

For development (with auto-reload):

```sh
yarn dev
```

Or build and start:

```sh
yarn build
yarn start
```

### 4. Open the Dashboard

Visit [http://localhost:3000/admin/queues](http://localhost:3000/admin/queues) in your browser to see all queues and jobs.

## Project Intent

This project is meant as a learning and reference tool for:

- Structuring a scalable BullMQ job system in Node.js
- Managing multiple queues and workers
- Integrating Bull Board for real-time job monitoring
- Demonstrating job options like retries, delays, priorities, and repeatable jobs
