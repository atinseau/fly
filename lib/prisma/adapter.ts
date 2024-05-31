import type * as Adapters from '@/adapters'
import { prisma } from './client'
import { union } from 'lodash'
import { uuid } from '..'
import { Graph } from '../graph'

export type AdapterGraphItem = {
  id: string
  deps?: string[]
  name: keyof typeof Adapters
}

const createAdapterGraph = async (templateId: string, adapterGraphs: AdapterGraphItem[]) => {

  const graph = new Graph()

  for (const adapter of adapterGraphs) {
    graph.addVertex(adapter.id)
    if (adapter.deps) {
      for (const dep of adapter.deps) {
        graph.addEdge(adapter.id, dep)
      }
    }
  }

  // let graphs = structuredClone(adapterGraphs)

  // Fix all incomming ids, graphs accept every string format as id
  // but for prisma we need to convert them to uuid
  // so we can use them as primary key
  // so store every id in a map and re-use it if it's found again in the provided graphs
  // const hash = new Map<string, string>()
  // const getId = (id: string) => {
  //   let newId = hash.get(id)
  //   if (!newId) {
  //     newId = uuid()
  //     hash.set(id, newId)
  //   }
  //   return newId
  // }

  // graphs = graphs.map((adapter) => {
  //   let id = getId(adapter.id)
  //   if (adapter.deps) {
  //     adapter.deps = adapter.deps.map(getId)
  //   }
  //   return {
  //     ...adapter,
  //     id
  //   }
  // })

  // let adapters = await prisma.adapter.createManyAndReturn({
  //   data: graphs.map((adapter) => {
  //     return {
  //       id: adapter.id,
  //       name: adapter.name,
  //       prevAdapterIds: adapter.deps,
  //       templateId
  //     }
  //   })
  // })

  // hydrate nextAdapterIds

  // for (const adapter of adapters) {
  //   const nextAdapterIds = adapters.filter((a) => a.prevAdapterIds?.includes(adapter.id)).map((a) => a.id)
  //   adapter.nextAdapterIds = union(adapter.nextAdapterIds, nextAdapterIds)
  // }

  // adapters = await prisma.$transaction([
  //   ...adapters.map((adapter) => prisma.adapter.update({
  //     where: {
  //       id: adapter.id
  //     },
  //     data: adapter
  //   }))
  // ])

  // return adapters
}

export {
  createAdapterGraph
}