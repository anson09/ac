// tags: #adjacency-list #topological-sorting

// https://leetcode.cn/problems/course-schedule/

// version 1
// time: 124ms | beat 15%
var canFinish = function (numCourses, prerequisites) {
  const requireMap = new Map();
  for (let i = 0; i < numCourses; i++) {
    requireMap.set(i, new Set());
  }
  prerequisites.forEach((i) => requireMap.get(i[0]).add(i[1]));

  const safeKeyQueue = [];
  requireMap.forEach((v, k) => {
    if (v.size === 0) {
      safeKeyQueue.push(k);
      requireMap.delete(k);
    }
  });

  if (requireMap.size === 0) return true;

  while (safeKeyQueue.length > 0) {
    const safeKey = safeKeyQueue.shift();
    requireMap.forEach((v, k) => {
      if (v.has(safeKey)) {
        v.delete(safeKey);
        if (v.size === 0) {
          safeKeyQueue.push(k);
          requireMap.delete(k);
        }
      }
    });
  }

  return !requireMap.size;
};

// verison 2
// time: 76ms | beat 71%
var canFinish = function (numCourses, prerequisites) {
  const queue = [];
  const adjacencyList = new Map();
  const inDegree = new Map();
  for (let i = 0; i < numCourses; i++) {
    adjacencyList.set(i, []);
    inDegree.set(i, 0);
  }

  prerequisites.forEach((i) => {
    adjacencyList.get(i[1]).push(i[0]);
    inDegree.set(i[0], inDegree.get(i[0]) + 1);
  });

  inDegree.forEach((v, k) => v === 0 && queue.push(k));

  while (queue.length !== 0) {
    const node = queue.pop();
    numCourses--;
    for (let i of adjacencyList.get(node)) {
      const newDegree = inDegree.get(i) - 1;
      inDegree.set(i, newDegree);
      if (newDegree === 0) {
        queue.unshift(i);
      }
    }
  }

  return numCourses === 0;
};
