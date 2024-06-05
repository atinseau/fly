import { Hono } from "hono";
import { validateTemplate } from "./schema";
import { Graph } from "../../lib/graph";
import type { AdapterName } from "../../lib/prisma/adapter";

const router = new Hono()

router.post('/', validateTemplate, async (c) => {
  const body = c.req.valid('json')
  const graph = new Graph<AdapterName>()

  for (const adapter of body.adapters) {
    graph.addVertex(adapter.id, adapter.name)
    for (const edge of adapter.edges || []) {
      graph.addEdge(adapter.id, edge)
    }
  }

  console.log(graph.toJSON())

  return c.text('Hello World!')
})


export default router