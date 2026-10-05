const seedAlgorithms = [
  {
    title: 'Quick Sort',
    slug: 'quick-sort',
    category: 'Sorting',
    difficulty: 'Medium',
    featured: true,
    rating: 4.9,
    summary: 'A highly efficient, divide-and-conquer algorithm that selects a pivot and partitions elements into sub-arrays.',
    description: 'Quick Sort works by selecting a "pivot" element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. This can be done in-place, requiring very small additional amounts of memory to perform the sorting.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    visualizerType: 'sorting',
    defaultArray: [52, 28, 85, 19, 93, 44, 71, 35, 62, 10],
    tags: ['Divide and Conquer', 'Recursion', 'In-Place', 'Comparison Sort'],
    bannerUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      cpp: `#include <vector>
#include <algorithm>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      java: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}`
    }
  },
  {
    title: 'Merge Sort',
    slug: 'merge-sort',
    category: 'Sorting',
    difficulty: 'Medium',
    featured: false,
    rating: 4.8,
    summary: 'A predictable, stable divide-and-conquer sorting algorithm that divides arrays in half and merges them sorted.',
    description: 'Merge Sort divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge() function is key to the process, carefully assembling sorted subarrays into a unified sequence with guaranteed O(n log n) runtime across all scenarios.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    visualizerType: 'sorting',
    defaultArray: [64, 34, 25, 12, 22, 11, 90, 45, 78, 15],
    tags: ['Divide and Conquer', 'Stable', 'Recursion', 'External Sorting'],
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      cpp: `#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    std::vector<int> leftArr(arr.begin() + left, arr.begin() + mid + 1);
    std::vector<int> rightArr(arr.begin() + mid + 1, arr.begin() + right + 1);
    int i = 0, j = 0, k = left;
    while (i < leftArr.size() && j < rightArr.size()) {
        if (leftArr[i] <= rightArr[j]) arr[k++] = leftArr[i++];
        else arr[k++] = rightArr[j++];
    }
    while (i < leftArr.size()) arr[k++] = leftArr[i++];
    while (j < rightArr.size()) arr[k++] = rightArr[j++];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`,
      java: `public class MergeSort {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    private static void merge(int[] arr, int l, int m, int r) {
        int[] left = java.util.Arrays.copyOfRange(arr, l, m + 1);
        int[] right = java.util.Arrays.copyOfRange(arr, m + 1, r + 1);
        int i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
            arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
        }
        while (i < left.length) arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
    }
}`
    }
  },
  {
    title: 'Bubble Sort',
    slug: 'bubble-sort',
    category: 'Sorting',
    difficulty: 'Easy',
    featured: false,
    rating: 4.5,
    summary: 'The classic educational sorting technique that repeatedly steps through the list, swapping adjacent out-of-order elements.',
    description: 'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping adjacent elements if they are in the wrong order. Small values bubble up to the front, and large values sink to the back. While inefficient for large datasets, it is exceptional for learning array traversals and swapping mechanisms.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    visualizerType: 'sorting',
    defaultArray: [48, 15, 92, 33, 76, 5, 84, 29, 61, 12],
    tags: ['Simple', 'Comparison', 'Elementary', 'In-Place'],
    bannerUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      cpp: `#include <vector>
#include <algorithm>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      java: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`
    }
  },
  {
    title: 'Binary Search',
    slug: 'binary-search',
    category: 'Searching',
    difficulty: 'Easy',
    featured: false,
    rating: 4.9,
    summary: 'A logarithmic search algorithm that finds the position of a target value within a sorted array by halving the search space.',
    description: 'Binary Search works on sorted arrays. It compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half until the value is found or the subarray is empty.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
    },
    spaceComplexity: 'O(1)',
    visualizerType: 'searching',
    defaultArray: [5, 12, 18, 25, 33, 42, 56, 68, 79, 88, 95],
    tags: ['Logarithmic', 'Sorted', 'Divide and Conquer', 'Two Pointers'],
    bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
      python: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      cpp: `#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      java: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
    }
  },
  {
    title: "Dijkstra's Algorithm",
    slug: 'dijkstras-algorithm',
    category: 'Graph Theory',
    difficulty: 'Hard',
    featured: true,
    rating: 5.0,
    summary: 'The premier shortest-path algorithm for finding the minimal distances from a starting node to all other nodes in a weighted graph.',
    description: "Conceived by Edsger W. Dijkstra, this greedy algorithm solves the single-source shortest path problem for graphs with non-negative edge weights. Using a priority queue / min-heap, it explores the closest unvisited node, guaranteeing the optimal path to every destination.",
    timeComplexity: {
      best: 'O(V + E log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)',
    },
    spaceComplexity: 'O(V)',
    visualizerType: 'graph',
    defaultArray: [10, 25, 40, 55, 70, 85, 100],
    tags: ['Greedy', 'Shortest Path', 'Priority Queue', 'Network Routing'],
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `class PriorityQueue {
  constructor() { this.values = []; }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.values.sort((a, b) => a.priority - b.priority);
  }
  dequeue() { return this.values.shift(); }
  isEmpty() { return this.values.length === 0; }
}

function dijkstra(graph, start) {
  const distances = {};
  const pq = new PriorityQueue();
  for (let node in graph) {
    distances[node] = node === start ? 0 : Infinity;
  }
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const { val: currNode, priority: currDist } = pq.dequeue();
    if (currDist > distances[currNode]) continue;

    for (let neighbor in graph[currNode]) {
      const weight = graph[currNode][neighbor];
      const distance = currDist + weight;
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        pq.enqueue(neighbor, distance);
      }
    }
  }
  return distances;
}`,
      python: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]

    while pq:
        curr_dist, curr_node = heapq.heappop(pq)
        if curr_dist > distances[curr_node]:
            continue
        for neighbor, weight in graph[curr_node].items():
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    return distances`,
      cpp: `#include <vector>
#include <queue>
#include <limits>

using namespace std;

typedef pair<int, int> pii; // weight, node

vector<int> dijkstra(int V, vector<vector<pii>>& adj, int start) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<int> dist(V, numeric_limits<int>::max());
    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        int u = pq.top().second;
        int d = pq.top().first;
        pq.pop();
        if (d > dist[u]) continue;

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      java: `import java.util.*;

public class Dijkstra {
    public static Map<String, Integer> dijkstra(Map<String, Map<String, Integer>> graph, String start) {
        Map<String, Integer> distances = new HashMap<>();
        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>(Map.Entry.comparingByValue());

        for (String node : graph.keySet()) {
            distances.put(node, node.equals(start) ? 0 : Integer.MAX_VALUE);
        }
        pq.add(new AbstractMap.SimpleEntry<>(start, 0));

        while (!pq.isEmpty()) {
            Map.Entry<String, Integer> curr = pq.poll();
            String currNode = curr.getKey();
            int currDist = curr.getValue();

            if (currDist > distances.get(currNode)) continue;

            for (Map.Entry<String, Integer> neighbor : graph.get(currNode).entrySet()) {
                int newDist = currDist + neighbor.getValue();
                if (newDist < distances.get(neighbor.getKey())) {
                    distances.put(neighbor.getKey(), newDist);
                    pq.add(new AbstractMap.SimpleEntry<>(neighbor.getKey(), newDist));
                }
            }
        }
        return distances;
    }
}`
    }
  },
  {
    title: 'Breadth-First Search (BFS)',
    slug: 'breadth-first-search',
    category: 'Graph Theory',
    difficulty: 'Medium',
    featured: false,
    rating: 4.8,
    summary: 'A layer-by-layer traversal algorithm for graphs and trees utilizing a queue to explore nearest nodes first.',
    description: 'Breadth-First Search starts at the root node (or an arbitrary node of a graph) and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. It guarantees the shortest path on unweighted graphs.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
    visualizerType: 'graph',
    defaultArray: [1, 2, 3, 4, 5, 6, 7, 8],
    tags: ['Queue', 'Shortest Path', 'Level Order', 'Connectivity'],
    bannerUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
      python: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
      cpp: `#include <vector>
#include <queue>
#include <unordered_set>

std::vector<int> bfs(const std::vector<std::vector<int>>& adj, int start) {
    std::vector<int> order;
    std::unordered_set<int> visited;
    std::queue<int> q;

    visited.insert(start);
    q.push(start);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);

        for (int v : adj[u]) {
            if (visited.find(v) == visited.end()) {
                visited.insert(v);
                q.push(v);
            }
        }
    }
    return order;
}`,
      java: `import java.util.*;

public class BFS {
    public static List<Integer> bfs(Map<Integer, List<Integer>> adj, int start) {
        List<Integer> order = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> q = new LinkedList<>();

        visited.add(start);
        q.add(start);

        while (!q.isEmpty()) {
            int u = q.poll();
            order.add(u);
            for (int v : adj.getOrDefault(u, Collections.emptyList())) {
                if (!visited.contains(v)) {
                    visited.add(v);
                    q.add(v);
                }
            }
        }
        return order;
    }
}`
    }
  },
  {
    title: 'Insertion Sort',
    slug: 'insertion-sort',
    category: 'Sorting',
    difficulty: 'Easy',
    featured: false,
    rating: 4.6,
    summary: 'A simple, intuitive sorting algorithm that builds the final sorted array one item at a time by inserting elements into their correct position.',
    description: 'Insertion Sort iterates through an array and at each iteration, it removes one element, finds the location it belongs within the sorted list, and inserts it there. It is efficient for small data sets and nearly sorted arrays, and is stable and in-place.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    visualizerType: 'sorting',
    defaultArray: [38, 27, 43, 3, 9, 82, 10],
    tags: ['Simple', 'Stable', 'In-Place', 'Adaptive'],
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      cpp: `#include <vector>

void insertionSort(std::vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      java: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`
    }
  },
  {
    title: 'Selection Sort',
    slug: 'selection-sort',
    category: 'Sorting',
    difficulty: 'Easy',
    featured: false,
    rating: 4.4,
    summary: 'A comparison-based algorithm that repeatedly selects the minimum element from the unsorted portion and places it at the beginning.',
    description: 'Selection Sort divides the input list into two parts: a sorted sublist at the front and an unsorted sublist at the back. The algorithm repeatedly selects the smallest (or largest) element from the unsorted sublist, swaps it with the leftmost unsorted element, and moves the sublist boundaries one element to the right.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    visualizerType: 'sorting',
    defaultArray: [64, 25, 12, 22, 11, 90, 88, 45, 50, 33],
    tags: ['Simple', 'In-Place', 'Comparison', 'Unstable'],
    bannerUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
      python: `def selection_sort(arr):
    for i in range(len(arr) - 1):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      cpp: `#include <vector>
#include <algorithm>

void selectionSort(std::vector<int>& arr) {
    for (int i = 0; i < arr.size() - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < arr.size(); j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            std::swap(arr[i], arr[minIdx]);
        }
    }
}`,
      java: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                int temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
            }
        }
    }
}`
    }
  },
  {
    title: 'Depth-First Search (DFS)',
    slug: 'depth-first-search',
    category: 'Graph Theory',
    difficulty: 'Medium',
    featured: false,
    rating: 4.7,
    summary: 'A recursive graph traversal algorithm that explores as far as possible along each branch before backtracking.',
    description: 'Depth-First Search starts at the root node and explores as far as possible along each branch before backtracking. It can be implemented using a stack (iterative) or recursion (implicit stack). DFS is used for topological sorting, cycle detection, pathfinding in mazes, and solving puzzles.',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V)',
    visualizerType: 'graph',
    defaultArray: [1, 2, 3, 4, 5, 6, 7, 8],
    tags: ['Stack', 'Recursion', 'Backtracking', 'Topological Sort'],
    bannerUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  const order = [start];

  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      order.push(...dfs(graph, neighbor, visited));
    }
  }
  return order;
}

// Iterative version
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const order = [];

  while (stack.length > 0) {
    const node = stack.pop();
    if (!visited.has(node)) {
      visited.add(node);
      order.push(node);
      for (const neighbor of (graph[node] || []).reverse()) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  return order;
}`,
      python: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    order = [start]

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            order.extend(dfs(graph, neighbor, visited))
    return order

# Iterative version
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    order = []

    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            order.append(node)
            for neighbor in reversed(graph.get(node, [])):
                if neighbor not in visited:
                    stack.append(neighbor)
    return order`,
      cpp: `#include <vector>
#include <stack>
#include <unordered_set>

void dfsRecursive(const std::vector<std::vector<int>>& adj, int node,
                  std::unordered_set<int>& visited, std::vector<int>& order) {
    visited.insert(node);
    order.push_back(node);

    for (int neighbor : adj[node]) {
        if (visited.find(neighbor) == visited.end()) {
            dfsRecursive(adj, neighbor, visited, order);
        }
    }
}

std::vector<int> dfs(const std::vector<std::vector<int>>& adj, int start) {
    std::unordered_set<int> visited;
    std::vector<int> order;
    dfsRecursive(adj, start, visited, order);
    return order;
}`,
      java: `import java.util.*;

public class DFS {
    public static List<Integer> dfs(Map<Integer, List<Integer>> adj, int start) {
        Set<Integer> visited = new HashSet<>();
        List<Integer> order = new ArrayList<>();
        dfsRecursive(adj, start, visited, order);
        return order;
    }

    private static void dfsRecursive(Map<Integer, List<Integer>> adj, int node,
                                     Set<Integer> visited, List<Integer> order) {
        visited.add(node);
        order.add(node);

        for (int neighbor : adj.getOrDefault(node, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                dfsRecursive(adj, neighbor, visited, order);
            }
        }
    }
}`
    }
  },
  {
    title: "Kadane's Algorithm",
    slug: 'kadanes-algorithm',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    featured: false,
    rating: 4.9,
    summary: 'A dynamic programming technique to find the maximum sum of a contiguous subarray in O(n) time.',
    description: "Kadane's Algorithm solves the maximum subarray problem by iterating through the array once, at each position deciding whether to extend the current subarray or start a new one. It maintains the best sum seen so far and updates it when a better sum is found. This elegant single-pass solution is a classic example of optimal substructure in dynamic programming.",
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(1)',
    visualizerType: 'dp',
    defaultArray: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    tags: ['Dynamic Programming', 'Greedy', 'Subarray', 'Optimal'],
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `function kadane(arr) {
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];

  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}

// With indices
function kadaneWithIndices(arr) {
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];
  let start = 0, end = 0, tempStart = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxEndingHere + arr[i]) {
      maxEndingHere = arr[i];
      tempStart = i;
    } else {
      maxEndingHere = maxEndingHere + arr[i];
    }

    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = tempStart;
      end = i;
    }
  }
  return { sum: maxSoFar, start, end };
}`,
      python: `def kadane(arr):
    max_so_far = arr[0]
    max_ending_here = arr[0]

    for i in range(1, len(arr)):
        max_ending_here = max(arr[i], max_ending_here + arr[i])
        max_so_far = max(max_so_far, max_ending_here)

    return max_so_far

# With indices
def kadane_with_indices(arr):
    max_so_far = arr[0]
    max_ending_here = arr[0]
    start = end = temp_start = 0

    for i in range(1, len(arr)):
        if arr[i] > max_ending_here + arr[i]:
            max_ending_here = arr[i]
            temp_start = i
        else:
            max_ending_here += arr[i]

        if max_ending_here > max_so_far:
            max_so_far = max_ending_here
            start = temp_start
            end = i

    return {'sum': max_so_far, 'start': start, 'end': end}`,
      cpp: `#include <vector>
#include <algorithm>

int kadane(const std::vector<int>& arr) {
    int maxSoFar = arr[0];
    int maxEndingHere = arr[0];

    for (int i = 1; i < arr.size(); i++) {
        maxEndingHere = std::max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = std::max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}`,
      java: `public class Kadane {
    public static int kadane(int[] arr) {
        int maxSoFar = arr[0];
        int maxEndingHere = arr[0];

        for (int i = 1; i < arr.length; i++) {
            maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        return maxSoFar;
    }
}`
    }
  },
  {
    title: 'Fibonacci (Dynamic Programming)',
    slug: 'fibonacci-dp',
    category: 'Dynamic Programming',
    difficulty: 'Easy',
    featured: false,
    rating: 4.7,
    summary: 'Computing Fibonacci numbers efficiently using dynamic programming with memoization or tabulation to avoid redundant calculations.',
    description: 'The Fibonacci sequence is a classic demonstration of dynamic programming. While the naive recursive solution has exponential time complexity due to overlapping subproblems, memoization (top-down) or tabulation (bottom-up) reduces it to linear time by storing previously computed values. This optimization showcases the power of dynamic programming.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    visualizerType: 'dp',
    defaultArray: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
    tags: ['Dynamic Programming', 'Memoization', 'Recursion', 'Optimization'],
    bannerUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80',
    code: {
      javascript: `// Memoization (Top-Down)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Tabulation (Bottom-Up)
function fibTab(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Space-optimized
function fibOptimized(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`,
      python: `# Memoization (Top-Down)
def fib_memo(n, memo=None):
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# Tabulation (Bottom-Up)
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0, 1]
    for i in range(2, n + 1):
        dp.append(dp[i - 1] + dp[i - 2])
    return dp[n]

# Space-optimized
def fib_optimized(n):
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr`,
      cpp: `#include <vector>
#include <unordered_map>

// Memoization
int fibMemo(int n, std::unordered_map<int, int>& memo) {
    if (memo.find(n) != memo.end()) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// Tabulation
int fibTab(int n) {
    if (n <= 1) return n;
    std::vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
      java: `import java.util.HashMap;
import java.util.Map;

public class Fibonacci {
    // Memoization
    public static int fibMemo(int n, Map<Integer, Integer> memo) {
        if (memo.containsKey(n)) return memo.get(n);
        if (n <= 1) return n;
        int result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
        memo.put(n, result);
        return result;
    }

    // Tabulation
    public static int fibTab(int n) {
        if (n <= 1) return n;
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`
    }
  }
];

module.exports = seedAlgorithms;
