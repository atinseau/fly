import { zValidator as validator } from "@hono/zod-validator";
import { z } from "zod";
import * as Adapters from '@/adapters'

const validateTemplate = validator('json', z.object({
  name: z.string(),
  adapters: z.array(
    z.object({
      id: z.string(),
      name: z.enum(Object.keys(Adapters) as [keyof typeof Adapters]),
      edges: z
        .array(z.string())
        .min(1)
        .optional()
    })
  )
    .min(1)
    .refine((adapters) => {
      for (const adapter of adapters) {
        if (adapter.edges && adapter.edges.length > 0 && adapter.edges?.includes(adapter.id)) {
          return false
        }
      }
      return true
    }, 'An adapter cannot have an edge to itself.')
    .refine((adapters) => {
      for (const adapter of adapters) {
        if (adapter.edges && adapter.edges.length > 0) {
          for (const edge of adapter.edges) {
            if (!adapters.find((a) => a.id === edge)) {
              return false
            }
          }
        }
      }
      return true
    }, 'This adapter contains an edge that does not exist in the adapters array.')
}))

export {
  validateTemplate
}