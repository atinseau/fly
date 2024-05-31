import { createFakeTemplate } from "./mock/createFakeTemplate";
import { createAdapterGraph } from "./lib/prisma/adapter";
import { uuid } from "./lib";

const template = await createFakeTemplate()

const adapters = await createAdapterGraph(template.id, [
  {
    name: 'GmailAdapter',
    id: "1",
  },
  {
    name: 'FacebookAdapter',
    id: "2",
    deps: [
      "1"
    ]
  },
  {
    id: "3",
    name: 'GithubAdapter',
    deps: [
      "1"
    ],
  },
  {
    id: "4",
    name: 'PhysicalAdapter',
    deps: [
      "2",
      "3"
    ]
  },
  {
    id: "5",
    name: 'TwitterAdapter',
    deps: [
      "2"
    ]
  },
  {
    id: "6",
    name: "WelcomeAdapter",
    deps: [
      "4",
      "5"
    ]
  }
])

console.log(adapters)