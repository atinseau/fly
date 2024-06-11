import type { Job } from "bullmq";
import { prisma } from "../prisma";
import { Graph, type JsonGraph } from "../graph";
import type { AdapterNames } from "../../global";
import { getAdapterByVertex } from "../adapter";
import queueManager from ".";

type Data = {
  templateId: string
  runnerId: string
  jsonGraph: JsonGraph
}

const hydrate = async ({ runnerId, templateId }: Data) => {
  const runner = await prisma.runner.findUnique({
    where: {
      id: runnerId
    }
  })

  if (!runner) {
    throw new Error('Runner not found')
  }

  const template = await prisma.template.findUnique({
    where: {
      id: templateId
    }
  })

  if (!template) {
    throw new Error('Template not found')
  }

  return {
    runner,
    template
  }
}

const job = async (job: Job<Data>) => {
  const { jsonGraph } = job.data
  const { runner, template } = await hydrate(job.data)
  const graph = Graph.from<AdapterNames>(jsonGraph)
  const Adapter = getAdapterByVertex(graph, job.name)
  const adapter = new Adapter()
  await adapter.job()

  const incomming = graph.incoming(job.name)

  console.log(`Processing job for runner ${runner.id} and template ${template.id}`)
  return true
}

export default job
