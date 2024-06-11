import { Hono } from "hono";
import { validateRunner } from "./schema";
import { prisma } from "../../lib/prisma";
import queueManager from "../../lib/runner";
import { getAdapterGraph } from "../../lib/prisma/adapter";

const router = new Hono()

router.post('/', validateRunner, async (c) => {

  const { templateId } = c.req.valid('json')

  const template = await prisma.template.findUnique({
    where: {
      id: templateId
    }
  })

  if (!template) {
    return c.json({ error: 'Template not found' }, 404)
  }

  const adapterGraph = await getAdapterGraph(template.id)
  const incoming = adapterGraph.incoming()

  const runner = await prisma.runner.create({
    data: {
      templateId: template.id,
      state: {
        activeJobs: incoming
      },
    }
  })

  const queue = await queueManager.addQueue(runner.id)
  const jobs = []

  for (const vertex of incoming) {
    const j = await queue.add(vertex, {
      templateId,
      runnerId: runner.id,
      jsonGraph: adapterGraph.toJSON(),
    })
    jobs.push(j)
  }

  return c.json(jobs)
})

export default router
