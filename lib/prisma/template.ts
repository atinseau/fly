import { prisma } from "./client"

const createTemplate = async (name: string) => {
  const template = await prisma.template.create({
    include: {
      adapters: true,
      runners: true
    },
    data: {
      name,
    }
  })
  return template
}

export {
  createTemplate
}