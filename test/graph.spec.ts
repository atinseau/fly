import { describe, test, expect } from 'bun:test'
import { Graph } from '../lib/graph'

describe('Graph', () => {

  test.skip('Simple graph', () => {
    const graph = new Graph<{ name: string }>()

    graph
      .addEdge("socks", "shoes")
      .addEdge("shirt", "belt")
      .addEdge("shirt", "tie")
      .addEdge("tie", "jacket")
      .addEdge("belt", "jacket")
      .addEdge("pants", "shoes")
      .addEdge("underpants", "pants")
      .addEdge("pants", "belt")

    const a = graph.incoming()
    expect(a).toEqual(["socks", "shirt", "underpants"])

    const b = graph.incoming("socks")
    expect(b).toEqual(["shoes"])

    const c = graph.incoming("shirt")
    expect(c).toEqual(["belt", "tie"])

    const d = graph.incoming("underpants")
    expect(d).toEqual(["pants"])

    const e = graph.incoming("shoes")
    expect(e).toEqual([]) // shoes is "one" end of the graph

    const f = graph.incoming("belt")
    expect(f).toEqual(["jacket"])

    const g = graph.incoming("tie")
    expect(g).toEqual(["jacket"])

    const h = graph.incoming("pants")
    expect(h).toEqual(["shoes", "belt"])

    const i = graph.incoming("jacket")
    expect(i).toEqual([]) // jacket is "one" end of the graph
  })

  test('Other graph', () => {

    const graph = new Graph()

    graph.addVertex("1", "GmailAdapter")
    graph.addVertex("2", "FacebookAdapter")
    graph.addVertex("3", "GithubAdapter")
    graph.addVertex("4", "PhysicalAdapter")
    graph.addVertex("5", "TwitterAdapter")
    graph.addVertex("6", "WelcomeAdapter")

    graph.addEdge("1", "2")
    graph.addEdge("1", "3")
    graph.addEdge("2", "4")
    graph.addEdge("3", "4")
    graph.addEdge("2", "5")
    graph.addEdge("4", "6")
    graph.addEdge("5", "6")
  })

})