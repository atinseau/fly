import { createRunner, createTemplate, prisma } from "../lib/prisma"
import { createAdapters } from "../lib/prisma/adapter"


const createFakeTemplate = async () => {
  const name = 'My Template'
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
    template.adapters = await createAdapters({
      name: 'GmailAdapter',
      children: [
        {
          name: 'GithubAdapter',
        },
        {
          name: 'FacebookAdapter'
        }
      ]
    })
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