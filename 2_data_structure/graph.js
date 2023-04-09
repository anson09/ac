// tags: #graph #data-structure
class DirectedGraph {
  constructor() {
    this._vertices = new Map();
    this._edges = new Map();
    this._edgesCount = 0;
  }

  addVertex(key, value) {
    this._vertices.set(key, value);
    if (!this._edges.has(key)) {
      this._edges.set(key, new Map());
    }
    return this;
  }

  hasVertex(key) {
    return this._vertices.has(key);
  }

  removeVertex(key) {
    if (!this.hasVertex(key)) return false;

    this.removeEdges(key);
    this._edges.delete(key);
    this._vertices.delete(key);
    return true;
  }

  getVerticesCount() {
    return this._vertices.size;
  }

  addEdge(srcKey, destKey, weight = 1) {
    if (!this._vertices.has(srcKey)) {
      throw new Error(`addEdge: vertex "${srcKey}" not found`);
    }

    if (!this._vertices.has(destKey)) {
      throw new Error(`addEdge: vertex "${destKey}" not found`);
    }

    if (typeof weight !== "number") {
      throw new Error("addEdge: expects a numberic weight");
    }

    if (srcKey === destKey) return this;

    this._edges.get(srcKey).set(destKey, weight);
    this._edgesCount += 1;
    return this;
  }

  hasEdge(srcKey, destKey) {
    return (
      this.hasVertex(srcKey) &&
      this.hasVertex(destKey) &&
      this._edges.get(srcKey).has(destKey)
    );
  }

  getWeight(srcKey, destKey) {
    if (this.hasVertex(srcKey) && srcKey === destKey) {
      return 0;
    }

    if (!this.hasEdge(srcKey, destKey)) {
      return Infinity;
    }

    return this._edges.get(srcKey).get(destKey);
  }

  removeEdge(srcKey, destKey) {
    if (!this.hasEdge(srcKey, destKey)) {
      return false;
    }

    this._edges.get(srcKey).delete(destKey);
    this._edgesCount -= 1;
    return true;
  }

  removeEdges(key) {
    if (!this.hasVertex(key)) {
      return 0;
    }

    let removedEdgesCount = 0;
    this._edges.forEach((destEdges, srcKey) => {
      if (destEdges.has(key)) {
        this.removeEdge(srcKey, key);
        removedEdgesCount += 1;
      }
    });

    removedEdgesCount += this._edges.get(key).size;
    this._edgesCount -= this._edges.get(key).size;
    this._edges.set(key, new Map());
    return removedEdgesCount;
  }

  getEdgesCount() {
    return this._edgesCount;
  }

  traverseDfs(srcKey, cb) {
    const traverseDfsRecursive = (key, visited = new Set()) => {
      if (!this.hasVertex(key) || visited.has(key)) return;

      cb(key, this._vertices.get(key));
      visited.add(key);

      this._edges.get(key).forEach((_, destKey) => {
        traverseDfsRecursive(destKey, visited);
      });
    };
    traverseDfsRecursive(srcKey);
  }

  traverseBfs(srcKey, cb) {
    if (!this.hasVertex(srcKey)) return;

    const queue = [srcKey];
    const visited = new Set([srcKey]);

    while (queue.length) {
      const nextKey = queue.pop();
      cb(nextKey, this._vertices.get(nextKey));
      this._edges.get(nextKey).forEach((_, destKey) => {
        if (!visited.has(destKey)) {
          queue.unshift(destKey);
          visited.add(destKey);
        }
      });
    }
  }

  clear() {
    this._vertices = new Map();
    this._edges = new Map();
    this._edgesCount = 0;
  }

  getAllPath(start, end) {
    const allPath = [];

    if (!this.hasVertex(start) || !this.hasVertex(end)) return allPath;
    if (start === end) return [start];

    traverseDfsRecursive.call(this, start);

    return allPath;

    function traverseDfsRecursive(current, path = []) {
      if (!current || path.includes(current)) return;

      path.push(current);

      if (current === end) {
        allPath.push(path);
        return;
      }

      this._edges.get(current).forEach((_, destKey) => {
        traverseDfsRecursive.call(this, destKey, structuredClone(path));
      });
    }
  }
}
class Graph extends DirectedGraph {
  removeEdges(key) {
    if (!this.hasVertex(key)) {
      return 0;
    }

    let removedEdgesCount = 0;

    this._edges.get(key).forEach((_, destKey) => {
      this.removeEdge(key, destKey);
      removedEdgesCount += 1;
    });

    return removedEdgesCount;
  }

  addEdge(sourceKey, destKey, weight) {
    super.addEdge(sourceKey, destKey, weight);
    return super.addEdge(destKey, sourceKey, weight);
  }

  removeEdge(sourceKey, destKey) {
    super.removeEdge(sourceKey, destKey);
    return super.removeEdge(destKey, sourceKey);
  }

  getEdgesCount() {
    return super.getEdgesCount() / 2;
  }
}

/* test code */
const assert = require("node:assert/strict");

const directedGraph = new DirectedGraph();
directedGraph
  .addVertex("v1", 1)
  .addVertex("v2", 2)
  .addVertex("v3", 3)
  .addVertex("v4", 4)
  .addVertex("v5", 5);

directedGraph
  .addEdge("v1", "v2", 2)
  .addEdge("v1", "v3", 3)
  .addEdge("v2", "v4", 1)
  .addEdge("v3", "v5", 1)
  .addEdge("v5", "v2", 2)
  .addEdge("v3", "v4", 2);

directedGraph.traverseDfs("v1", (key, value) =>
  console.log(`${key}: ${value}`)
);

assert.deepEqual(directedGraph.getAllPath("v1", "v4"), [
  ["v1", "v2", "v4"],
  ["v1", "v3", "v5", "v2", "v4"],
  ["v1", "v3", "v4"],
]);

const graph = new Graph();

graph
  .addVertex("v1", 1)
  .addVertex("v2", 2)
  .addVertex("v3", 3)
  .addVertex("v4", 4)
  .addVertex("v5", 5);

graph
  .addEdge("v1", "v2", 2)
  .addEdge("v2", "v3", 3)
  .addEdge("v1", "v3", 6)
  .addEdge("v2", "v4", 1)
  .addEdge("v4", "v3", 1)
  .addEdge("v4", "v5", 4)
  .addEdge("v3", "v5", 2);

assert.equal(graph.getEdgesCount(), 7);
assert.equal(graph.removeEdges("v2"), 3);
assert.equal(graph.getEdgesCount(), 4);
