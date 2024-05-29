// import { createFakeTemplate } from "./mock/createFakeTemplate";

import { createAdapters } from "./lib/prisma/adapter";


// const template = await createFakeTemplate()


// console.log(template)

const adapters = await createAdapters({
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

console.log(adapters)