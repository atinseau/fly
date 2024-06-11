import { Hono } from "hono";
import { validateTemplate } from "./schema";
import { Graph } from "../../lib/graph";
import { createTemplate } from "../../lib/prisma";
import type { AdapterNames } from "../../global";
import { createAdapters } from "../../lib/prisma/adapter";

const router = new Hono()

router.post('/', validateTemplate, async (c) => {
  try {
    const body = c.req.valid('json')
    const graph = new Graph<AdapterNames>()

    for (const adapter of body.adapters) {
      graph.addVertex(adapter.id, adapter.name)
      for (const edge of adapter.edges || []) {
        graph.addEdge(adapter.id, edge)
      }
    }

    const newTemplate = await createTemplate(body.name)
    const { adapters } = await createAdapters(newTemplate.id, graph)

    return c.json({
      ...newTemplate,
      adapters
    })

  } catch (e) {
    return c.json({ error: (e as Error).message }, 400)
  }
})


export default router