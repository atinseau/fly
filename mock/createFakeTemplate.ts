import { createRunner, createTemplate, prisma } from "../lib/prisma"


const createFakeTemplate = async () => {
  const name = 'My Template'

  // delete existing template
  await prisma.adapter.deleteMany({
    where: {
      template: {
        name
      }
    }
  })

  let template = await prisma.template.findFirst({
    include: {
      adapters: true,
      runners: true
    },
    where: {
      name
    }
  })

  if (!template) {
    template = await createTemplate('My Template')
  }

  if (!template.runners.length) {
    template.runners = [
      await createRunner(template.id)
    ]
  }

  return template
}

export {
  createFakeTemplate
}