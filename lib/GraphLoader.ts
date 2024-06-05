import type { Graph } from "./graph";
import type { AdapterGraphData } from "./prisma/adapter";


export class GraphLoader {
  constructor(graph: Graph<AdapterGraphData>) {
    console.log('GraphLoader constructor')
  }
}