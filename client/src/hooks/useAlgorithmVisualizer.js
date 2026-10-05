import { useState, useEffect, useRef, useCallback } from 'react';

// ────────────────────────────────────────────────────────
// Step generators — each returns an array of frame objects.
// Every frame has { array, comparing, swapping, sorted, description }
// plus algorithm‑specific extras (pointers, graph state, etc.).
// ────────────────────────────────────────────────────────

function generateBubbleSortSteps(src) {
  const steps = [];
  const arr = [...src];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: `Starting Bubble Sort on ${n} elements. We'll repeatedly compare adjacent pairs and swap if they're out of order.`,
  });

  for (let i = 0; i < n - 1; i++) {
    const alreadySorted = Array.from({ length: i }, (_, k) => n - 1 - k);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: alreadySorted,
      description: `Pass ${i + 1}: Bubbling up the ${ordinal(i + 1)} largest element to its final position.`,
    });

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: alreadySorted,
        description: `Comparing index ${j} (${arr[j]}) with index ${j + 1} (${arr[j + 1]}).`,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: alreadySorted,
          description: `${arr[j + 1]} > ${arr[j]} → Swapped! Element ${arr[j + 1]} moves right.`,
        });
      } else {
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: alreadySorted,
          description: `${arr[j]} ≤ ${arr[j + 1]} — already in order, no swap needed.`,
        });
      }
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: '✅ Array is fully sorted! Bubble Sort complete.',
  });

  return steps;
}

function generateQuickSortSteps(src) {
  const steps = [];
  const arr = [...src];
  const sortedFlags = new Set();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pivotIndex: -1,
    partitionRange: null,
    description: `Starting Quick Sort on ${arr.length} elements. We pick a pivot and partition—elements smaller go left, larger go right.`,
  });

  function partition(a, low, high) {
    const pivot = a[high];

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      sorted: [...sortedFlags],
      pivotIndex: high,
      partitionRange: [low, high],
      description: `Pivot chosen: ${pivot} (index ${high}). Partitioning range [${low}..${high}].`,
    });

    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...a],
        comparing: [j, high],
        swapping: [],
        sorted: [...sortedFlags],
        pivotIndex: high,
        partitionRange: [low, high],
        description: `Compare ${a[j]} (index ${j}) with pivot ${pivot}. ${a[j] <= pivot ? a[j] + ' ≤ ' + pivot + ' → move to left partition.' : a[j] + ' > ' + pivot + ' → stays in right partition.'}`,
      });

      if (a[j] <= pivot) {
        i++;
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          steps.push({
            array: [...a],
            comparing: [],
            swapping: [i, j],
            sorted: [...sortedFlags],
            pivotIndex: high,
            partitionRange: [low, high],
            description: `Swap index ${i} ↔ index ${j} to place ${a[i]} in the left partition.`,
          });
        }
      }
    }

    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    sortedFlags.add(i + 1);

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [...sortedFlags],
      pivotIndex: i + 1,
      partitionRange: [low, high],
      description: `Pivot ${pivot} placed at its final position (index ${i + 1}). Everything left is smaller, everything right is larger.`,
    });

    return i + 1;
  }

  function qsort(a, low, high) {
    if (low < high) {
      const pi = partition(a, low, high);
      qsort(a, low, pi - 1);
      qsort(a, pi + 1, high);
    } else if (low === high) {
      sortedFlags.add(low);
    }
  }

  qsort(arr, 0, arr.length - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: arr.length }, (_, k) => k),
    pivotIndex: -1,
    partitionRange: null,
    description: '✅ Array is fully sorted! Quick Sort complete.',
  });

  return steps;
}

function generateMergeSortSteps(src) {
  const steps = [];
  const arr = [...src];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    mergeRange: null,
    description: `Starting Merge Sort on ${n} elements. We split the array recursively, then merge sorted halves.`,
  });

  function mergeSort(a, left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      mergeRange: [left, right],
      splitPoint: mid,
      description: `Split [${left}..${right}] into [${left}..${mid}] and [${mid + 1}..${right}].`,
    });

    mergeSort(a, left, mid);
    mergeSort(a, mid + 1, right);

    // Merge
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      mergeRange: [left, right],
      description: `Merging [${left}..${mid}] = [${leftArr}] with [${mid + 1}..${right}] = [${rightArr}].`,
    });

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: [],
        mergeRange: [left, right],
        description: `Compare left[${i}]=${leftArr[i]} vs right[${j}]=${rightArr[j]}. ${leftArr[i] <= rightArr[j] ? 'Take ' + leftArr[i] + ' from left.' : 'Take ' + rightArr[j] + ' from right.'}`,
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [],
        mergeRange: [left, right],
        description: `Placed ${arr[k]} at index ${k}.`,
      });

      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [],
        mergeRange: [left, right],
        description: `Remaining from left: placed ${arr[k]} at index ${k}.`,
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [],
        mergeRange: [left, right],
        description: `Remaining from right: placed ${arr[k]} at index ${k}.`,
      });
      j++;
      k++;
    }

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      mergeRange: [left, right],
      description: `✓ Merged [${left}..${right}] → [${arr.slice(left, right + 1)}]`,
    });
  }

  mergeSort(arr, 0, n - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    mergeRange: null,
    description: '✅ Array is fully sorted! Merge Sort complete.',
  });

  return steps;
}

function generateBinarySearchSteps(src) {
  const steps = [];
  const arr = [...src].sort((a, b) => a - b);
  const target = arr[Math.floor(Math.random() * arr.length)]; // pick a valid target

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    low: 0,
    high: arr.length - 1,
    mid: -1,
    target,
    found: -1,
    eliminated: [],
    description: `Binary Search: Find ${target} in sorted array [${arr.join(', ')}]. Search space: entire array.`,
  });

  let low = 0;
  let high = arr.length - 1;
  const eliminated = [];
  let found = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    steps.push({
      array: [...arr],
      comparing: [mid],
      swapping: [],
      sorted: [],
      low,
      high,
      mid,
      target,
      found: -1,
      eliminated: [...eliminated],
      description: `low=${low}, high=${high} → mid = ⌊(${low}+${high})/2⌋ = ${mid}. Checking arr[${mid}] = ${arr[mid]}.`,
    });

    if (arr[mid] === target) {
      found = mid;
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [mid],
        low,
        high,
        mid,
        target,
        found: mid,
        eliminated: [...eliminated],
        description: `🎯 Found! arr[${mid}] = ${target}. Target located at index ${mid}.`,
      });
      break;
    } else if (arr[mid] < target) {
      // Eliminate left half
      for (let e = low; e <= mid; e++) eliminated.push(e);
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        low: mid + 1,
        high,
        mid,
        target,
        found: -1,
        eliminated: [...eliminated],
        description: `${arr[mid]} < ${target} → Target is in the RIGHT half. Eliminate indices [${low}..${mid}]. New low = ${mid + 1}.`,
      });
      low = mid + 1;
    } else {
      // Eliminate right half
      for (let e = mid; e <= high; e++) eliminated.push(e);
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        low,
        high: mid - 1,
        mid,
        target,
        found: -1,
        eliminated: [...eliminated],
        description: `${arr[mid]} > ${target} → Target is in the LEFT half. Eliminate indices [${mid}..${high}]. New high = ${mid - 1}.`,
      });
      high = mid - 1;
    }
  }

  if (found === -1) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      low,
      high,
      mid: -1,
      target,
      found: -1,
      eliminated: [...eliminated],
      description: `❌ Target ${target} not found in the array. Search space exhausted.`,
    });
  }

  return steps;
}

function generateBFSSteps() {
  // Fixed graph for consistent visualization
  const graph = {
    nodes: [
      { id: 'A', x: 300, y: 50 },
      { id: 'B', x: 150, y: 150 },
      { id: 'C', x: 450, y: 150 },
      { id: 'D', x: 80, y: 270 },
      { id: 'E', x: 240, y: 270 },
      { id: 'F', x: 370, y: 270 },
      { id: 'G', x: 520, y: 270 },
    ],
    edges: [
      ['A', 'B'], ['A', 'C'],
      ['B', 'D'], ['B', 'E'],
      ['C', 'F'], ['C', 'G'],
      ['D', 'E'], ['F', 'G'],
    ],
  };

  const adj = {};
  graph.nodes.forEach(n => (adj[n.id] = []));
  graph.edges.forEach(([u, v]) => {
    adj[u].push(v);
    adj[v].push(u);
  });

  const steps = [];
  const startNode = 'A';
  const visited = new Set();
  const queue = [startNode];
  visited.add(startNode);
  const visitOrder = [];
  const visitedEdges = [];

  steps.push({
    graphData: graph,
    visited: [],
    current: null,
    queue: [startNode],
    visitOrder: [],
    visitedEdges: [],
    description: `BFS starting from node ${startNode}. Initialize queue with [${startNode}]. We explore all neighbors level-by-level.`,
    visualizerType: 'graph',
  });

  while (queue.length > 0) {
    const node = queue.shift();
    visitOrder.push(node);

    steps.push({
      graphData: graph,
      visited: [...visited],
      current: node,
      queue: [...queue],
      visitOrder: [...visitOrder],
      visitedEdges: [...visitedEdges],
      description: `Dequeue "${node}". Visit order: [${visitOrder.join(' → ')}]. Exploring ${node}'s neighbors...`,
      visualizerType: 'graph',
    });

    for (const neighbor of adj[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        visitedEdges.push([node, neighbor]);

        steps.push({
          graphData: graph,
          visited: [...visited],
          current: node,
          queue: [...queue],
          visitOrder: [...visitOrder],
          visitedEdges: [...visitedEdges],
          description: `Neighbor "${neighbor}" is unvisited → mark visited and enqueue. Queue: [${queue.join(', ')}].`,
          visualizerType: 'graph',
        });
      } else {
        steps.push({
          graphData: graph,
          visited: [...visited],
          current: node,
          queue: [...queue],
          visitOrder: [...visitOrder],
          visitedEdges: [...visitedEdges],
          description: `Neighbor "${neighbor}" already visited — skip.`,
          visualizerType: 'graph',
        });
      }
    }
  }

  steps.push({
    graphData: graph,
    visited: [...visited],
    current: null,
    queue: [],
    visitOrder: [...visitOrder],
    visitedEdges: [...visitedEdges],
    description: `✅ BFS complete! Visit order: ${visitOrder.join(' → ')}. All ${visited.size} nodes explored.`,
    visualizerType: 'graph',
  });

  return steps;
}

function generateDijkstraSteps() {
  const graph = {
    nodes: [
      { id: 'A', x: 100, y: 160 },
      { id: 'B', x: 260, y: 60 },
      { id: 'C', x: 260, y: 260 },
      { id: 'D', x: 420, y: 60 },
      { id: 'E', x: 420, y: 260 },
      { id: 'F', x: 560, y: 160 },
    ],
    edges: [
      ['A', 'B', 4], ['A', 'C', 2],
      ['B', 'D', 5], ['B', 'C', 1],
      ['C', 'E', 3], ['C', 'D', 8],
      ['D', 'F', 6],
      ['E', 'F', 1], ['E', 'D', 2],
    ],
  };

  const adj = {};
  graph.nodes.forEach(n => (adj[n.id] = []));
  graph.edges.forEach(([u, v, w]) => {
    adj[u].push({ node: v, weight: w });
    adj[v].push({ node: u, weight: w });
  });

  const steps = [];
  const start = 'A';
  const dist = {};
  const prev = {};
  const visited = new Set();
  const visitedEdges = [];

  graph.nodes.forEach(n => {
    dist[n.id] = n.id === start ? 0 : Infinity;
    prev[n.id] = null;
  });

  steps.push({
    graphData: graph,
    distances: { ...dist },
    visited: [],
    current: null,
    visitedEdges: [],
    description: `Dijkstra's from node ${start}. Initialize: dist[${start}]=0, all others=∞.`,
    visualizerType: 'graph',
  });

  const unvisited = new Set(graph.nodes.map(n => n.id));

  while (unvisited.size > 0) {
    // Find min dist unvisited
    let minNode = null;
    let minDist = Infinity;
    for (const nid of unvisited) {
      if (dist[nid] < minDist) {
        minDist = dist[nid];
        minNode = nid;
      }
    }
    if (minNode === null || minDist === Infinity) break;

    visited.add(minNode);
    unvisited.delete(minNode);

    steps.push({
      graphData: graph,
      distances: { ...dist },
      visited: [...visited],
      current: minNode,
      visitedEdges: [...visitedEdges],
      description: `Select "${minNode}" (dist=${minDist}) — closest unvisited node. Mark as visited.`,
      visualizerType: 'graph',
    });

    for (const { node: neighbor, weight } of adj[minNode]) {
      if (visited.has(neighbor)) continue;
      const alt = dist[minNode] + weight;
      const improved = alt < dist[neighbor];

      if (improved) {
        dist[neighbor] = alt;
        prev[neighbor] = minNode;
        visitedEdges.push([minNode, neighbor]);
      }

      steps.push({
        graphData: graph,
        distances: { ...dist },
        visited: [...visited],
        current: minNode,
        visitedEdges: [...visitedEdges],
        description: improved
          ? `Edge ${minNode}→${neighbor} (w=${weight}): ${minDist}+${weight}=${alt} < ${dist[neighbor] === alt ? '∞' : dist[neighbor] + weight} → Update dist[${neighbor}]=${alt}.`
          : `Edge ${minNode}→${neighbor} (w=${weight}): ${minDist}+${weight}=${alt} ≥ ${dist[neighbor]} → No update.`,
        visualizerType: 'graph',
      });
    }
  }

  const distStr = Object.entries(dist)
    .map(([k, v]) => `${k}:${v}`)
    .join(', ');

  steps.push({
    graphData: graph,
    distances: { ...dist },
    visited: [...visited],
    current: null,
    visitedEdges: [...visitedEdges],
    description: `✅ Dijkstra's complete! Shortest distances from ${start}: {${distStr}}.`,
    visualizerType: 'graph',
  });

  return steps;
}

function generateInsertionSortSteps(src) {
  const steps = [];
  const arr = [...src];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [0],
    description: `Starting Insertion Sort on ${n} elements. First element is trivially sorted. We'll insert each subsequent element into its correct position.`,
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: Array.from({ length: i }, (_, k) => k),
      description: `Pick element at index ${i} (value=${key}). Insert it into the sorted portion [0..${i - 1}].`,
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [],
        description: `${arr[j]} > ${key} → Shift ${arr[j]} one position right.`,
      });

      arr[j + 1] = arr[j];

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [j, j + 1],
        sorted: [],
        description: `Shifted ${arr[j]} from index ${j} to index ${j + 1}.`,
      });

      j--;
    }

    arr[j + 1] = key;

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      description: `Insert ${key} at index ${j + 1}. Sorted portion now: [0..${i}].`,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: '✅ Array is fully sorted! Insertion Sort complete.',
  });

  return steps;
}

function generateSelectionSortSteps(src) {
  const steps = [];
  const arr = [...src];
  const n = arr.length;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    description: `Starting Selection Sort on ${n} elements. We'll repeatedly find the minimum element from the unsorted portion and place it at the beginning.`,
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: [...arr],
      comparing: [minIdx],
      swapping: [],
      sorted: Array.from({ length: i }, (_, k) => k),
      description: `Pass ${i + 1}: Finding minimum in unsorted range [${i}..${n - 1}]. Current min candidate: index ${minIdx} (${arr[minIdx]}).`,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapping: [],
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `Compare arr[${minIdx}]=${arr[minIdx]} with arr[${j}]=${arr[j]}.`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          comparing: [minIdx],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => k),
          description: `Found smaller element ${arr[minIdx]} at index ${minIdx}. Update minimum candidate.`,
        });
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
        description: `Swap minimum element ${arr[i]} from index ${minIdx} to index ${i}.`,
      });
    } else {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
        description: `Element ${arr[i]} at index ${i} is already the minimum — no swap needed.`,
      });
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: '✅ Array is fully sorted! Selection Sort complete.',
  });

  return steps;
}

function generateDFSSteps() {
  const graph = {
    nodes: [
      { id: 'A', x: 300, y: 50 },
      { id: 'B', x: 150, y: 150 },
      { id: 'C', x: 450, y: 150 },
      { id: 'D', x: 80, y: 270 },
      { id: 'E', x: 240, y: 270 },
      { id: 'F', x: 370, y: 270 },
      { id: 'G', x: 520, y: 270 },
    ],
    edges: [
      ['A', 'B'], ['A', 'C'],
      ['B', 'D'], ['B', 'E'],
      ['C', 'F'], ['C', 'G'],
      ['D', 'E'], ['F', 'G'],
    ],
  };

  const adj = {};
  graph.nodes.forEach(n => (adj[n.id] = []));
  graph.edges.forEach(([u, v]) => {
    adj[u].push(v);
    adj[v].push(u);
  });

  const steps = [];
  const startNode = 'A';
  const visited = new Set();
  const visitOrder = [];
  const visitedEdges = [];
  const stack = [];

  steps.push({
    graphData: graph,
    visited: [],
    current: null,
    stack: [startNode],
    visitOrder: [],
    visitedEdges: [],
    description: `DFS starting from node ${startNode}. Initialize stack with [${startNode}]. We explore deeply along each branch before backtracking.`,
    visualizerType: 'graph',
  });

  function dfsRecursive(node) {
    visited.add(node);
    visitOrder.push(node);
    stack.push(node);

    steps.push({
      graphData: graph,
      visited: [...visited],
      current: node,
      stack: [...stack],
      visitOrder: [...visitOrder],
      visitedEdges: [...visitedEdges],
      description: `Visit "${node}". Visit order: [${visitOrder.join(' → ')}]. Exploring ${node}'s neighbors...`,
      visualizerType: 'graph',
    });

    for (const neighbor of adj[node]) {
      if (!visited.has(neighbor)) {
        visitedEdges.push([node, neighbor]);
        steps.push({
          graphData: graph,
          visited: [...visited],
          current: node,
          stack: [...stack],
          visitOrder: [...visitOrder],
          visitedEdges: [...visitedEdges],
          description: `Neighbor "${neighbor}" is unvisited → recursively explore ${neighbor}.`,
          visualizerType: 'graph',
        });
        dfsRecursive(neighbor);
      } else {
        steps.push({
          graphData: graph,
          visited: [...visited],
          current: node,
          stack: [...stack],
          visitOrder: [...visitOrder],
          visitedEdges: [...visitedEdges],
          description: `Neighbor "${neighbor}" already visited — skip.`,
          visualizerType: 'graph',
        });
      }
    }

    stack.pop();
    steps.push({
      graphData: graph,
      visited: [...visited],
      current: stack.length > 0 ? stack[stack.length - 1] : null,
      stack: [...stack],
      visitOrder: [...visitOrder],
      visitedEdges: [...visitedEdges],
      description: `Backtrack from "${node}".`,
      visualizerType: 'graph',
    });
  }

  dfsRecursive(startNode);

  steps.push({
    graphData: graph,
    visited: [...visited],
    current: null,
    stack: [],
    visitOrder: [...visitOrder],
    visitedEdges: [...visitedEdges],
    description: `✅ DFS complete! Visit order: ${visitOrder.join(' → ')}. All ${visited.size} nodes explored.`,
    visualizerType: 'graph',
  });

  return steps;
}

function generateKadaneSteps(src) {
  const steps = [];
  const arr = [...src];
  const n = arr.length;

  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];
  let start = 0, end = 0, tempStart = 0;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    maxSoFar,
    maxEndingHere,
    currentRange: [0, 0],
    bestRange: [0, 0],
    description: `Kadane's Algorithm: Find maximum sum subarray. Initialize maxSoFar=${maxSoFar}, maxEndingHere=${maxEndingHere}.`,
  });

  for (let i = 1; i < n; i++) {
    const extendSum = maxEndingHere + arr[i];
    const resetSum = arr[i];

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [],
      maxSoFar,
      maxEndingHere,
      currentRange: [tempStart, i - 1],
      bestRange: [start, end],
      description: `At index ${i} (value=${arr[i]}): Extend current subarray (sum=${extendSum}) or start fresh (sum=${resetSum})?`,
    });

    if (resetSum > extendSum) {
      maxEndingHere = resetSum;
      tempStart = i;
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i],
        sorted: [],
        maxSoFar,
        maxEndingHere,
        currentRange: [i, i],
        bestRange: [start, end],
        description: `Start new subarray at index ${i}. maxEndingHere=${maxEndingHere}.`,
      });
    } else {
      maxEndingHere = extendSum;
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        maxSoFar,
        maxEndingHere,
        currentRange: [tempStart, i],
        bestRange: [start, end],
        description: `Extend current subarray. maxEndingHere=${maxEndingHere}.`,
      });
    }

    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = tempStart;
      end = i;
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: end - start + 1 }, (_, k) => start + k),
        maxSoFar,
        maxEndingHere,
        currentRange: [tempStart, i],
        bestRange: [start, end],
        description: `🎯 New maximum! maxSoFar=${maxSoFar}. Best subarray: [${start}..${end}] = [${arr.slice(start, end + 1).join(', ')}].`,
      });
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: end - start + 1 }, (_, k) => start + k),
    maxSoFar,
    maxEndingHere,
    currentRange: [start, end],
    bestRange: [start, end],
    description: `✅ Maximum subarray sum = ${maxSoFar}. Subarray: indices [${start}..${end}] = [${arr.slice(start, end + 1).join(', ')}].`,
  });

  return steps;
}

function generateFibonacciSteps(src) {
  const steps = [];
  const n = Math.min(10, Math.max(2, src[0] || 10));
  const dp = [0, 1];

  steps.push({
    array: [...dp],
    comparing: [],
    swapping: [],
    sorted: [],
    dpTable: [...dp],
    description: `Fibonacci DP: Compute first ${n} Fibonacci numbers. Base cases: F(0)=0, F(1)=1.`,
  });

  for (let i = 2; i <= n; i++) {
    const fibVal = dp[i - 1] + dp[i - 2];

    steps.push({
      array: [...dp],
      comparing: [i - 1, i - 2],
      swapping: [],
      sorted: [],
      dpTable: [...dp],
      description: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]} = ${fibVal}.`,
    });

    dp.push(fibVal);

    steps.push({
      array: [...dp],
      comparing: [],
      swapping: [i],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      dpTable: [...dp],
      description: `Store F(${i}) = ${fibVal}. DP table: [${dp.join(', ')}].`,
    });
  }

  steps.push({
    array: [...dp],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: dp.length }, (_, k) => k),
    dpTable: [...dp],
    description: `✅ Fibonacci sequence computed! F(0) to F(${n}): [${dp.join(', ')}].`,
  });

  return steps;
}


// ────────────────────────
//  Helper
// ────────────────────────
function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ────────────────────────
//  Main hook
// ────────────────────────
export function useAlgorithmVisualizer(
  initialArray = [45, 12, 85, 32, 89, 39, 69, 21, 56, 9],
  algorithmType = 'bubble-sort'
) {
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const timerRef = useRef(null);

  const generateSteps = useCallback(
    (sourceArray, type) => {
      switch (type) {
        case 'bubble-sort':
          return generateBubbleSortSteps(sourceArray);
        case 'quick-sort':
          return generateQuickSortSteps(sourceArray);
        case 'merge-sort':
          return generateMergeSortSteps(sourceArray);
        case 'insertion-sort':
          return generateInsertionSortSteps(sourceArray);
        case 'selection-sort':
          return generateSelectionSortSteps(sourceArray);
        case 'binary-search':
          return generateBinarySearchSteps(sourceArray);
        case 'breadth-first-search':
          return generateBFSSteps();
        case 'depth-first-search':
          return generateDFSSteps();
        case 'dijkstras-algorithm':
          return generateDijkstraSteps();
        case 'kadanes-algorithm':
          return generateKadaneSteps(sourceArray);
        case 'fibonacci-dp':
          return generateFibonacciSteps(sourceArray);
        default:
          return generateBubbleSortSteps(sourceArray);
      }
    },
    []
  );

  const reset = useCallback(
    (newArr = null) => {
      const targetArr = newArr || initialArray;
      setIsPlaying(false);
      clearInterval(timerRef.current);
      const newSteps = generateSteps(targetArr, algorithmType);
      setSteps(newSteps);
      setCurrentStepIndex(0);
    },
    [initialArray, algorithmType, generateSteps]
  );

  useEffect(() => {
    reset(initialArray);
  }, [initialArray, algorithmType, reset]);

  const stepForward = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev < steps.length - 1) {
        return prev + 1;
      }
      setIsPlaying(false);
      return prev;
    });
  }, [steps]);

  const stepBackward = useCallback(() => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const togglePlay = useCallback(() => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [currentStepIndex, steps]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        stepForward();
      }, speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, stepForward]);

  const currentStep = steps[currentStepIndex] || {
    array: initialArray,
    comparing: [],
    swapping: [],
    sorted: [],
    description: '',
  };

  return {
    currentStep,
    array: currentStep.array || [],
    comparing: currentStep.comparing || [],
    swapping: currentStep.swapping || [],
    sorted: currentStep.sorted || [],
    description: currentStep.description || '',
    currentStepIndex,
    totalSteps: steps.length,
    isPlaying,
    speed,
    togglePlay,
    stepForward,
    stepBackward,
    reset,
    setSpeed,
  };
}

export default useAlgorithmVisualizer;
