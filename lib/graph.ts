
export type JsonGraph = {
  vertices: string[]
  edges: Record<string, { vertex: string, direction: 0 | 1 }[]>
}

export type GraphEdge = { vertex: string, direction: 0 | 1 }

export class Graph<Data> {

  public vertices: string[] = []

  private verticesData: Record<string, Data> = {}
  private edges: Record<string, GraphEdge[]> = {}

  static from(json: JsonGraph) {
    const graph = new Graph()
    graph['edges'] = json.edges
    graph['vertices'] = json.vertices
    return graph
  }

  addVertex(id: string, data?: Data) {
    if (this.vertices.includes(id)) {
      return this
    }
    this.vertices.push(id)
    this.edges[id] = []
    if (data) {
      this.verticesData[id] = data
    }
    return this
  }

  addEdge(from: string, to: string) {
    if (from === to) {
      throw new Error('Cannot create a self-referencing edge')
    }

    if (!this.edges[from]) {
      this.addVertex(from)
    }
    if (!this.edges[to]) {
      this.addVertex(to)
    }

    this.edges[from].push({ vertex: to, direction: 1 })
    this.edges[to].push({ vertex: from, direction: 0 })
    return this
  }

  getVertices() {
    return this.vertices
  }

  getEdges<T>(vertex?: T): T extends string ? GraphEdge[] : Record<string, GraphEdge[]> {
    if (typeof vertex === 'string') {
      return this.edges[vertex] as any
    }
    return this.edges as any
  }

  incoming(vertex?: string) {
    // if no vertex is provided, return all vertices that have no incoming edges
    // it's mean that they are the starting point of the graph
    if (!vertex) {
      return this.vertices.filter(v => this.edges[v].find((e) => e.direction === 0) === undefined)
    }

    return this.edges[vertex]
      .filter(e => e.direction === 1)
      .map(e => e.vertex)
  }


  outgoing(vertex?: string) {
    // if no vertex is provided, return all vertices that have no outgoing edges
    // it's mean that they are the ending point of the graph
    if (!vertex) {
      return this.vertices.filter(v => this.edges[v].find((e) => e.direction === 1) === undefined)
    }

    return this.vertices
      .filter(v => this.edges[v].find((e) => {
        return e.vertex === vertex && e.direction === 1
      }))
  }

  sibling(vertex: string) {
    const incoming = this.incoming(vertex)
    return incoming.flatMap(v => this.outgoing(v).filter(v => v !== vertex))
  }

  getData(vertex: string) {
    return this.verticesData[vertex]
  }

  toJSON() {
    return {
      vertices: this.vertices,
      edges: this.edges,
    }
  }

}