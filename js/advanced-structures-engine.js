// Advanced Data Structures Engine - Hybrid Button Handler
class AdvancedStructuresEngine {
    constructor() {
        this.binarySearchTree = new BinarySearchTree();
        this.minHeap = new MinHeap();
        this.currentHeapType = 'min';
        this.graph = new Graph();
        this.init();
    }

    init() {
        console.log('🌳 Advanced Structures Engine initializing...');
        
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEngine());
        } else {
            this.setupEngine();
        }
    }

    setupEngine() {
        this.setupGlobalFunctions();
        this.setupEventListeners();
        this.initializeSampleData();
        console.log('✅ Engine ready! All buttons should work now.');
    }

    setupGlobalFunctions() {
        // Make all functions globally available for onclick attributes
        window.addNode = () => this.addNode();
        window.deleteNode = () => this.deleteNode();
        window.clearTree = () => this.clearTree();
        window.traverseTree = (type) => this.traverseTree(type);
        window.showCode = (type) => this.showCode(type);
        
        window.setHeapType = (type) => this.setHeapType(type);
        window.insertHeap = () => this.insertHeap();
        window.extractHeap = () => this.extractHeap();
        window.buildRandomHeap = () => this.buildRandomHeap();
        window.clearHeap = () => this.clearHeap();
        window.showHeapCode = (type) => this.showHeapCode(type);
        
        window.setGraphType = (type) => this.setGraphType(type);
        window.addVertex = () => this.addVertex();
        window.startAddEdge = () => this.startAddEdge();
        window.clearGraph = () => this.clearGraph();
        window.runBFS = () => this.runBFS();
        window.runDFS = () => this.runDFS();
        window.findShortestPath = () => this.findShortestPath();
        
        window.openSocialNetworkProject = () => this.openSocialNetworkProject();
        window.completePhase3 = () => this.completePhase3();
        window.previousLesson = () => this.previousLesson();
        
        console.log('✅ Global functions registered');
    }

    setupEventListeners() {
        // Backup event listeners for buttons that might not have onclick
        this.attachEventListener('.control-btn.add', () => this.addNode());
        this.attachEventListener('.control-btn.delete', () => this.deleteNode());
        this.attachEventListener('.control-btn.clear', () => this.clearTree());
        
        // Traversal buttons
        this.attachEventListener('[onclick*="inorder"]', () => this.traverseTree('inorder'));
        this.attachEventListener('[onclick*="preorder"]', () => this.traverseTree('preorder'));
        this.attachEventListener('[onclick*="postorder"]', () => this.traverseTree('postorder'));
        this.attachEventListener('[onclick*="levelorder"]', () => this.traverseTree('levelorder'));
        
        // Heap buttons
        this.attachEventListener('.heap-btn.insert', () => this.insertHeap());
        this.attachEventListener('.heap-btn.extract', () => this.extractHeap());
        this.attachEventListener('.heap-btn.build', () => this.buildRandomHeap());
        this.attachEventListener('.heap-btn.clear', () => this.clearHeap());
        
        // Graph buttons
        this.attachEventListener('.graph-btn.add-vertex', () => this.addVertex());
        this.attachEventListener('.graph-btn.add-edge', () => this.startAddEdge());
        this.attachEventListener('.graph-btn.clear-graph', () => this.clearGraph());
        this.attachEventListener('.algo-btn.bfs', () => this.runBFS());
        this.attachEventListener('.algo-btn.dfs', () => this.runDFS());
        this.attachEventListener('.algo-btn.shortest', () => this.findShortestPath());
        
        console.log('✅ Event listeners attached');
    }

    attachEventListener(selector, handler) {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('click', handler);
            console.log(`✅ Event listener attached to: ${selector}`);
        } else {
            console.log(`⚠️ Element not found: ${selector}`);
        }
    }

    initializeSampleData() {
        // Tree sample data
        [50, 30, 70, 20, 40, 60, 80].forEach(val => this.binarySearchTree.insert(val));
        this.renderTree();

        // Heap sample data
        [10, 20, 15, 30, 40].forEach(val => this.minHeap.insert(val));
        this.renderHeap();

        // Graph sample data
        ['A', 'B', 'C', 'D'].forEach(vertex => this.graph.addVertex(vertex));
        this.graph.addEdge('A', 'B');
        this.graph.addEdge('B', 'C');
        this.graph.addEdge('C', 'D');
        this.renderGraph();
        
        console.log('✅ Sample data initialized');
    }

    // ===== TREE METHODS =====
    addNode() {
        console.log('🌳 Add Node called');
        const input = document.getElementById('nodeValue');
        
        if (!input) {
            console.error('❌ nodeValue input not found');
            alert('Error: Node value input field not found');
            return;
        }
        
        const value = parseInt(input.value);
        
        if (!value || value < 1 || value > 100) {
            alert('Please enter a valid number between 1 and 100');
            return;
        }
        
        this.binarySearchTree.insert(value);
        this.renderTree();
        alert(`✅ Added ${value} to the tree`);
        input.value = '';
    }

    deleteNode() {
        console.log('🌳 Delete Node called');
        const input = document.getElementById('nodeValue');
        
        if (!input) {
            alert('Error: Node value input field not found');
            return;
        }
        
        const value = parseInt(input.value);
        
        if (!value) {
            alert('Please enter a value to delete');
            return;
        }
        
        this.binarySearchTree.delete(value);
        this.renderTree();
        alert(`✅ Deleted ${value} from the tree`);
        input.value = '';
    }

    clearTree() {
        console.log('🌳 Clear Tree called');
        this.binarySearchTree = new BinarySearchTree();
        this.renderTree();
        alert('✅ Tree cleared');
        document.getElementById('traversalResults').textContent = '';
    }

    traverseTree(type) {
        console.log(`🌳 Traverse Tree called: ${type}`);
        const results = this.binarySearchTree.traverse(type);
        const output = document.getElementById('traversalResults');
        
        if (output) {
            output.textContent = `${type.toUpperCase()} Traversal: ${results.join(' → ')}`;
        }
        
        alert(`✅ ${type.toUpperCase()} traversal: ${results.join(', ')}`);
    }

    renderTree() {
        const canvas = document.getElementById('treeCanvas');
        if (!canvas) return;
        
        if (this.binarySearchTree.isEmpty()) {
            canvas.innerHTML = `
                <div class="empty-tree-message">
                    <h4>🌱 Build Your First Tree!</h4>
                    <p>Add numbers above to see them organized in a binary search tree</p>
                </div>
            `;
            return;
        }
        
        const values = this.binarySearchTree.getAllValues();
        canvas.innerHTML = `
            <div class="tree-display">
                <h4>🌳 Current Tree (Inorder):</h4>
                <div class="tree-values" style="font-size: 1.2rem; color: #10b981; font-weight: bold; margin: 1rem 0;">
                    ${values.join(' → ')}
                </div>
                <p><strong>Total nodes:</strong> ${values.length}</p>
                <p><strong>Structure:</strong> Binary Search Tree (left < root < right)</p>
            </div>
        `;
    }

    // ===== HEAP METHODS =====
    setHeapType(type) {
        console.log(`📊 Set Heap Type called: ${type}`);
        this.currentHeapType = type;
        
        // Update button states
        document.querySelectorAll('.heap-type-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase().includes(type)) {
                btn.classList.add('active');
            }
        });
        
        // Reset heap
        this.minHeap = new MinHeap();
        this.renderHeap();
        alert(`✅ Switched to ${type} heap`);
    }

    insertHeap() {
        console.log('📊 Insert Heap called');
        const input = document.getElementById('heapValue');
        
        if (!input) {
            alert('Error: Heap value input field not found');
            return;
        }
        
        const value = parseInt(input.value);
        
        if (!value || value < 1 || value > 100) {
            alert('Please enter a valid number between 1 and 100');
            return;
        }
        
        this.minHeap.insert(value);
        this.renderHeap();
        alert(`✅ Inserted ${value} into ${this.currentHeapType} heap`);
        input.value = '';
    }

    extractHeap() {
        console.log('📊 Extract Heap called');
        if (this.minHeap.isEmpty()) {
            alert('⚠️ Heap is empty!');
            return;
        }
        
        const extracted = this.minHeap.extract();
        this.renderHeap();
        alert(`✅ Extracted ${extracted} from heap`);
    }

    buildRandomHeap() {
        console.log('📊 Build Random Heap called');
        this.minHeap = new MinHeap();
        const randomValues = [];
        
        for (let i = 0; i < 6; i++) {
            const val = Math.floor(Math.random() * 90) + 10;
            randomValues.push(val);
            this.minHeap.insert(val);
        }
        
        this.renderHeap();
        alert(`✅ Built random heap: [${randomValues.join(', ')}]`);
    }

    clearHeap() {
        console.log('📊 Clear Heap called');
        this.minHeap = new MinHeap();
        this.renderHeap();
        alert('✅ Heap cleared');
    }

    renderHeap() {
        const canvas = document.getElementById('heapVisualization');
        const arrayDisplay = document.getElementById('heapArrayDisplay');
        const sizeDisplay = document.getElementById('heapSize');
        const nextExtractDisplay = document.getElementById('nextExtract');
        
        if (!canvas) return;
        
        if (this.minHeap.isEmpty()) {
            canvas.innerHTML = `
                <div class="empty-heap-message">
                    <h4>📊 Build Your Priority Queue!</h4>
                    <p>Insert values to see heap property maintained</p>
                </div>
            `;
            if (arrayDisplay) arrayDisplay.textContent = '[]';
            if (sizeDisplay) sizeDisplay.textContent = '0';
            if (nextExtractDisplay) nextExtractDisplay.textContent = 'None';
            return;
        }
        
        const heapArray = this.minHeap.getArray();
        canvas.innerHTML = `
            <div class="heap-display">
                <h4>📊 Current ${this.currentHeapType.toUpperCase()} Heap:</h4>
                <div class="heap-values" style="font-size: 1.2rem; color: #3b82f6; font-weight: bold; margin: 1rem 0;">
                    Array: [${heapArray.join(', ')}]
                </div>
                <p><strong>Heap size:</strong> ${heapArray.length}</p>
                <p><strong>Next to extract:</strong> ${heapArray[0]} (highest priority)</p>
                <p><strong>Property:</strong> Parent ≤ Children (Min Heap)</p>
            </div>
        `;
        
        if (arrayDisplay) arrayDisplay.textContent = `[${heapArray.join(', ')}]`;
        if (sizeDisplay) sizeDisplay.textContent = heapArray.length.toString();
        if (nextExtractDisplay) nextExtractDisplay.textContent = heapArray[0]?.toString() || 'None';
    }

    // ===== GRAPH METHODS =====
    setGraphType(type) {
        console.log(`🗺️ Set Graph Type called: ${type}`);
        this.graph.setDirected(type === 'directed');
        
        // Update button states
        document.querySelectorAll('.graph-type-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase() === type) {
                btn.classList.add('active');
            }
        });
        
        this.renderGraph();
        alert(`✅ Switched to ${type} graph`);
    }

    addVertex() {
        console.log('🗺️ Add Vertex called');
        const input = document.getElementById('vertexName');
        
        if (!input) {
            alert('Error: Vertex name input field not found');
            return;
        }
        
        const name = input.value.trim().toUpperCase();
        
        if (!name || name.length > 3) {
            alert('Please enter a vertex name (1-3 characters)');
            return;
        }
        
        if (this.graph.hasVertex(name)) {
            alert(`⚠️ Vertex ${name} already exists`);
            return;
        }
        
        this.graph.addVertex(name);
        this.renderGraph();
        alert(`✅ Added vertex ${name}`);
        input.value = '';
    }

    startAddEdge() {
        console.log('🗺️ Start Add Edge called');
        const vertices = this.graph.getVertices();
        
        if (vertices.length < 2) {
            alert('⚠️ Need at least 2 vertices to add an edge');
            return;
        }
        
        // Simple edge addition between first two vertices for demo
        const from = vertices[0];
        const to = vertices[vertices.length > 1 ? 1 : 0];
        
        this.graph.addEdge(from, to);
        this.renderGraph();
        alert(`✅ Added edge ${from} → ${to}`);
    }

    clearGraph() {
        console.log('🗺️ Clear Graph called');
        this.graph = new Graph();
        this.renderGraph();
        alert('✅ Graph cleared');
        
        const output = document.getElementById('algorithmResults');
        if (output) output.textContent = '';
    }

    renderGraph() {
        const canvas = document.getElementById('graphCanvas');
        if (!canvas) return;
        
        const vertices = this.graph.getVertices();
        const edges = this.graph.getAllEdges();
        
        if (vertices.length === 0) {
            canvas.innerHTML = `
                <div class="empty-graph-message">
                    <h4>🗺️ Build Your Network!</h4>
                    <p>Add vertices and edges to create a graph</p>
                </div>
            `;
            return;
        }
        
        canvas.innerHTML = `
            <div class="graph-display">
                <h4>🗺️ Current Graph Network:</h4>
                <div class="graph-info">
                    <p><strong>Vertices:</strong> ${vertices.join(', ')}</p>
                    <p><strong>Edges:</strong> ${edges.length > 0 ? edges.map(e => `${e.from}→${e.to}`).join(', ') : 'None'}</p>
                    <p><strong>Total vertices:</strong> ${vertices.length}</p>
                    <p><strong>Total edges:</strong> ${edges.length}</p>
                </div>
            </div>
        `;
    }

    runBFS() {
        console.log('🗺️ Run BFS called');
        const vertices = this.graph.getVertices();
        
        if (vertices.length === 0) {
            alert('⚠️ Graph is empty!');
            return;
        }
        
        const result = this.graph.bfs(vertices[0]);
        const output = document.getElementById('algorithmResults');
        
        if (output) {
            output.textContent = `BFS Traversal from ${vertices[0]}:\n${result.join(' → ')}\n\nNodes visited: ${result.length}`;
        }
        
        alert(`✅ BFS from ${vertices[0]}: ${result.join(' → ')}`);
    }

    runDFS() {
        console.log('🗺️ Run DFS called');
        const vertices = this.graph.getVertices();
        
        if (vertices.length === 0) {
            alert('⚠️ Graph is empty!');
            return;
        }
        
        const result = this.graph.dfs(vertices[0]);
        const output = document.getElementById('algorithmResults');
        
        if (output) {
            output.textContent = `DFS Traversal from ${vertices[0]}:\n${result.join(' → ')}\n\nNodes visited: ${result.length}`;
        }
        
        alert(`✅ DFS from ${vertices[0]}: ${result.join(' → ')}`);
    }

    findShortestPath() {
        console.log('🗺️ Find Shortest Path called');
        const vertices = this.graph.getVertices();
        
        if (vertices.length < 2) {
            alert('⚠️ Need at least 2 vertices for shortest path');
            return;
        }
        
        const from = vertices[0];
        const to = vertices[vertices.length - 1];
        const result = this.graph.shortestPath(from, to);
        
        const output = document.getElementById('algorithmResults');
        if (output) {
            if (result.distance === -1) {
                output.textContent = `No path found between ${from} and ${to}`;
            } else {
                output.textContent = `Shortest path ${from} → ${to}:\n${result.path.join(' → ')}\nDistance: ${result.distance}`;
            }
        }
        
        if (result.distance === -1) {
            alert(`⚠️ No path found between ${from} and ${to}`);
        } else {
            alert(`✅ Shortest path ${from} → ${to}: ${result.path.join(' → ')} (distance: ${result.distance})`);
        }
    }

    // ===== CODE TAB METHODS =====
    showCode(type) {
        console.log(`📝 Show Code called: ${type}`);
        // Hide all code contents
        document.querySelectorAll('.code-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected code
        const selectedCode = document.getElementById(`${type}-code`);
        if (selectedCode) {
            selectedCode.classList.add('active');
        }
        
        // Update tab states
        document.querySelectorAll('.code-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Find and activate the clicked tab
        event.target.classList.add('active');
    }

    showHeapCode(type) {
        console.log(`📝 Show Heap Code called: ${type}`);
        this.showCode(type);
    }

    // ===== PROJECT & NAVIGATION METHODS =====
    openSocialNetworkProject() {
        alert(`🚀 Social Network Analyzer Project

This advanced project combines all data structures:

🗺️ Graph: Store users and friendships
🌳 BST: Index users by ID for fast lookup  
📊 Heap: Priority queue for friend suggestions
🔗 Hash Table: Username-to-user mapping
🧭 Algorithms: BFS/DFS for connection paths

Ready to start this comprehensive project?`);
    }

    completePhase3() {
        alert(`🎉 PHASE 3 COMPLETE! 🎉

You've mastered:
✅ Object-Oriented Programming
✅ Advanced Data Structures
✅ Trees, Heaps, and Graphs
✅ Algorithm Implementation

Ready for Phase 4: Advanced Topics?`);
        
        const proceed = confirm("Continue to Phase 4?");
        if (proceed) {
            window.location.href = '../phase4/sorting-algorithms.html';
        }
    }

    previousLesson() {
        window.location.href = 'oop-fundamentals.html';
    }
}

// ===== DATA STRUCTURE CLASSES (Same as before) =====

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    
    insert(val) {
        this.root = this._insertNode(this.root, val);
    }
    
    _insertNode(node, val) {
        if (!node) return new TreeNode(val);
        
        if (val < node.val) {
            node.left = this._insertNode(node.left, val);
        } else if (val > node.val) {
            node.right = this._insertNode(node.right, val);
        }
        
        return node;
    }
    
    delete(val) {
        this.root = this._deleteNode(this.root, val);
    }
    
    _deleteNode(node, val) {
        if (!node) return null;
        
        if (val < node.val) {
            node.left = this._deleteNode(node.left, val);
        } else if (val > node.val) {
            node.right = this._deleteNode(node.right, val);
        } else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            
            let minRight = node.right;
            while (minRight.left) minRight = minRight.left;
            node.val = minRight.val;
            node.right = this._deleteNode(node.right, minRight.val);
        }
        
        return node;
    }
    
    traverse(type) {
        const result = [];
        if (type === 'inorder') this._inorder(this.root, result);
        else if (type === 'preorder') this._preorder(this.root, result);
        else if (type === 'postorder') this._postorder(this.root, result);
        else if (type === 'levelorder') this._levelorder(result);
        return result;
    }
    
    _inorder(node, result) {
        if (node) {
            this._inorder(node.left, result);
            result.push(node.val);
            this._inorder(node.right, result);
        }
    }
    
    _preorder(node, result) {
        if (node) {
            result.push(node.val);
            this._preorder(node.left, result);
            this._preorder(node.right, result);
        }
    }
    
    _postorder(node, result) {
        if (node) {
            this._postorder(node.left, result);
            this._postorder(node.right, result);
            result.push(node.val);
        }
    }
    
    _levelorder(result) {
        if (!this.root) return;
        
        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    isEmpty() {
        return this.root === null;
    }
    
    getAllValues() {
        return this.traverse('inorder');
    }
}

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    insert(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }
    
    extract() {
        if (this.isEmpty()) return null;
        
        const min = this.heap[0];
        const last = this.heap.pop();
        
        if (!this.isEmpty()) {
            this.heap[0] = last;
            this._bubbleDown(0);
        }
        
        return min;
    }
    
    _bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) break;
            
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    _bubbleDown(index) {
        while (true) {
            let minIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[minIndex]) {
                minIndex = leftChild;
            }
            
            if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[minIndex]) {
                minIndex = rightChild;
            }
            
            if (minIndex === index) break;
            
            [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
            index = minIndex;
        }
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
    
    getArray() {
        return [...this.heap];
    }
}

class Graph {
    constructor() {
        this.adjacencyList = new Map();
        this.directed = false;
    }
    
    setDirected(directed) {
        this.directed = directed;
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }
    
    addEdge(from, to) {
        this.addVertex(from);
        this.addVertex(to);
        
        this.adjacencyList.get(from).push(to);
        if (!this.directed) {
            this.adjacencyList.get(to).push(from);
        }
    }
    
    hasVertex(vertex) {
        return this.adjacencyList.has(vertex);
    }
    
    getVertices() {
        return Array.from(this.adjacencyList.keys());
    }
    
    getAllEdges() {
        const edges = [];
        for (const [from, neighbors] of this.adjacencyList) {
            for (const to of neighbors) {
                if (this.directed || from < to) {
                    edges.push({ from, to });
                }
            }
        }
        return edges;
    }
    
    bfs(start) {
        const visited = new Set();
        const queue = [start];
        const result = [];
        
        visited.add(start);
        
        while (queue.length > 0) {
            const vertex = queue.shift();
            result.push(vertex);
            
            const neighbors = this.adjacencyList.get(vertex) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        
        return result;
    }
    
    dfs(start) {
        const visited = new Set();
        const result = [];
        
        const dfsHelper = (vertex) => {
            visited.add(vertex);
            result.push(vertex);
            
            const neighbors = this.adjacencyList.get(vertex) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    dfsHelper(neighbor);
                }
            }
        };
        
        dfsHelper(start);
        return result;
    }
    
    shortestPath(start, end) {
        const queue = [{ vertex: start, path: [start], distance: 0 }];
        const visited = new Set([start]);
        
        while (queue.length > 0) {
            const { vertex, path, distance } = queue.shift();
            
            if (vertex === end) {
                return { path, distance };
            }
            
            const neighbors = this.adjacencyList.get(vertex) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push({
                        vertex: neighbor,
                        path: [...path, neighbor],
                        distance: distance + 1
                    });
                }
            }
        }
        
        return { path: [], distance: -1 };
    }
}

// Initialize the engine
let advancedEngine;

// Multiple initialization methods to ensure it works
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 DOM Content Loaded - initializing engine...');
        advancedEngine = new AdvancedStructuresEngine();
    });
} else {
    console.log('🚀 DOM already ready - initializing engine immediately...');
    advancedEngine = new AdvancedStructuresEngine();
}

console.log('✅ Advanced Data Structures Engine script loaded!');
