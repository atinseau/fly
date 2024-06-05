import { createFakeTemplate } from "./mock/createFakeTemplate";
import { createAdapters, getAdapterGraph, type AdapterGraphData } from "./lib/prisma/adapter";
import { Graph } from "./lib/graph";
import { GraphLoader } from "./lib/GraphLoader";

const mockTemplate = await createFakeTemplate()
const mockGraph = new Graph<AdapterGraphData>()

mockGraph.addVertex('1', 'GmailAdapter')
mockGraph.addVertex('2', 'FacebookAdapter')
mockGraph.addVertex('3', 'GithubAdapter')
mockGraph.addVertex('4', 'TwitterAdapter')
mockGraph.addVertex('5', 'PhysicalAdapter')
mockGraph.addVertex('6', 'WelcomeAdapter')

mockGraph.addEdge('1', '2') // Gmail -> Facebook
mockGraph.addEdge('1', '3') // Gmail -> Github
mockGraph.addEdge('2', '5') // Facebook -> Physical
mockGraph.addEdge('2', '4') // Facebook -> Twitter
mockGraph.addEdge('3', '4') // Github -> Twitter
mockGraph.addEdge('5', '6') // Physical -> Welcome
mockGraph.addEdge('4', '6') // Twitter -> Welcome

const { graph } = await createAdapters(mockTemplate.id, mockGraph)

const graphLoader = new GraphLoader(graph)

