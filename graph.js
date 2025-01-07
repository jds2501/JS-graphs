class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(element => {
      this.nodes.add(element);
    });
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (!v1.adjacent.has(v2)) {
      v1.adjacent.add(v2);
    }

    if (!v2.adjacent.has(v1)) {
      v2.adjacent.add(v1);
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (v1.adjacent.has(v2)) {
      v1.adjacent.delete(v2);
    }

    if (v2.adjacent.has(v1)) {
      v2.adjacent.delete(v1);
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (this.nodes.has(vertex)) {
      this.nodes.delete(vertex);

      this.nodes.forEach(element => {
        element.adjacent.delete(vertex);
      });
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = [];

    if (start) {
      const dfsStack = [start];

      while (dfsStack.length > 0) {
        const current = dfsStack.pop();
        visited.push(current.value);

        for (const node of current.adjacent) {
          if (!visited.includes(node.value) && !dfsStack.includes(node)) {
            dfsStack.push(node);
          }
        }
      }
    }

    return visited;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = [];

    if (start) {
      const bfsQueue = [start];

      while (bfsQueue.length > 0) {
        const current = bfsQueue.shift();
        visited.push(current.value);

        for (const node of current.adjacent) {
          if (!visited.includes(node.value) && !bfsQueue.includes(node)) {
            bfsQueue.push(node);
          }
        }
      }
    }

    return visited;
  }
}

module.exports = { Graph, Node }