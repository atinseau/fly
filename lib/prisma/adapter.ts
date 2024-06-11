import { Graph } from '../graph'
import { uuid } from '..'
import { prisma } from './client'
import type { AdapterNames } from '../../global'

const createAdapters = async (templateId: string, graph: Graph<AdapterNames>) => {
  // Fix all incomming ids, graphs accept every string format as id
  // but for prisma we need to convert them to uuid
  // so we can use them as primary key
  // so store every id in a map and re-use it if it's found again in the provided graphs
  const hash = new Map<string, string>()
  const getId = (id: string) => {
    let newId = hash.get(id)
    if (!newId) {
      newId = uuid()
      hash.set(id, newId)
    }
    return newId
  }

  const patchedGraph = new Graph<AdapterNames>()

  for (const vertex of graph.getVertices()) {
    patchedGraph.addVertex(getId(vertex), graph.getData(vertex))
    const vertices = graph.outgoing(vertex)
    for (const edge of vertices) {
      patchedGraph.addEdge(getId(edge), getId(vertex))
    }
  }

  let adapters = await prisma.adapter.createManyAndReturn({
    data: patchedGraph.getVertices().map((vertex) => ({
      id: vertex,
      templateId,
      name: patchedGraph.getData(vertex).toString(),
      prevAdapterIds: patchedGraph.outgoing(vertex),
      nextAdapterIds: patchedGraph.incoming(vertex)
    }))
  })

  return {
    adapters,
    graph: patchedGraph
  }
}

const getAdapterGraph = async (templateId: string) => {
  const adapters = await prisma.adapter.findMany({
    where: {
      templateId
    }
  })
  const graph = new Graph<AdapterNames>()
  for (const adapter of adapters) {
    graph.addVertex(adapter.id, adapter.name as AdapterNames)
    for (const nextAdapterId of adapter.nextAdapterIds) {
      graph.addEdge(adapter.id, nextAdapterId)
    }
  }
  return graph
}

export {
  getAdapterGraph,
  createAdapters
}