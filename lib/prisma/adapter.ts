import type * as Adapters from '@/adapters'

export type AdapterGraph = {
  name: keyof typeof Adapters
  children?: AdapterGraph[]
}

const createAdapters = async (graph: AdapterGraph) => {

  return []

}

export {
  createAdapters
}