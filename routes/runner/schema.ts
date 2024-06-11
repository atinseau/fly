import { zValidator } from "@hono/zod-validator";
import { z } from "zod";


const validateRunner = zValidator('json', z.object({
  templateId: z.string().uuid(),
}))

export {
  validateRunner
}