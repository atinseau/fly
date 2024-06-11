import type { AdapterNames } from "../global";
import type { Graph } from "./graph";
import * as Adapters from '@/adapters'

const getAdapterByVertex = (graph: Graph<AdapterNames>, vertex: string) => {
  const name = graph.getData(vertex)
  if (!name) {
    throw new Error('Vertex not found')
  }
  return Adapters[name]
}

export {
  getAdapterByVertex
}