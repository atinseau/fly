

// Queue manager

import type { Runner } from "@prisma/client";
import { prisma } from "../prisma";
import { Queue, Worker } from "bullmq";
import job from "./processor";

const connection = {
  host: 'localhost',
  port: 6379
}

class QueueManager {

  private runners: Promise<Runner[]> | null = null;
  private queues: Record<string, Queue> = {};
  private workers: Record<string, Worker> = {};

  // Each runner in the app have a dedicated queue
  // so every time we launch the app, we need to fetch every runner
  // and create a queue for each one
  constructor() {
    this.runners = prisma.runner.findMany()

    this.runners.then((runners) => {
      for (const runner of runners) {
        this.addQueue(runner.id)
      }
    })
  }

  async addQueue(queueName: string) {
    await this.runners // Before creating a queue, we need to make sure we have all the runners
    // Create a new queue

    const name = `{${queueName}}`

    const queue = new Queue(name, {
      connection
    })

    queue.on('error', (err) => {
      console.error(err)
    })

    const worker = new Worker(name, job, {
      connection
    })

    worker.on('failed', (err) => {
      console.error(err?.failedReason)
    })

    this.queues[queueName] = queue
    this.workers[queueName] = worker

    return queue
  }

  public getQueue(queueName: string) {
    return this.queues[queueName]
  }

  public getWorker(queueName: string) {
    return this.workers[queueName]
  }

}

const queueManager = new QueueManager();

export default queueManager;