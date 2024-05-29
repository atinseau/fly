import { prisma } from "./client"

export type RunnerState = {
  //
}

const createRunner = (templateId: string) => {
  const runner = prisma.runner.create({
    data: {
      templateId,
      state: {},
    }
  })
  return runner
}

export {
  createRunner
}