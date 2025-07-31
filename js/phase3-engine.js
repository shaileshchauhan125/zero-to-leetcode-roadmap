// Phase 3: Algorithms Foundation Engine - Complete Interactive System
class Phase3Engine {
    constructor() {
        // Algorithm visualization state
        this.sortingDemo = {
            array: [],
            isAnimating: false,
            currentAlgorithm: 'bubble',
            speed: 500,
            comparisons: 0,
            swaps: 0
        };
        
        this.searchingDemo = {
            array: [],
            target: null,
            isSearching: false,
            currentAlgorithm: 'linear',
            steps: 0
        };
        
        this.recursionDemo = {
            stack: [],
            isRunning: false,
            currentFunction: 'fibonacci',
            callCount: 0
        };
        
        this.graphDemo = {
            nodes: new Map(),
            edges: [],
            currentAlgorithm: 'bfs',
            visited: new Set(),
            isTraversing: false
        };
        
        // Canvas contexts
        this.canvases = new Map();
        
        this.init();
    }

    init() {
        console.log('🧮 Phase 3 Algorithms Engine initializing...');
        this.setupGlobalFunctions();
        this.setupEventListeners();
        this.initializeCanvases();
        this.generateInitialData();
        console.log('✅ Phase 3 Engine ready for algorithm visualization!');
    }

    setupGlobalFunctions() {
        // Sorting algorithm functions
        window.startSorting = (algorithm) => this.startSorting(algorithm);
        window.pauseSorting = () => this.pauseSorting();
        window.resetSorting = () => this.resetSorting();
        window.changeSortSpeed = (speed) => this.changeSortSpeed(speed);
        window.generateRandomArray = () => this.generateRandomArray();
        
        // Searching algorithm functions
        window.startSearching = (algorithm) => this.startSearching(algorithm);
        window.setSearchTarget = (target) => this.setSearchTarget(target);
        window.resetSearching = () => this.resetSearching();
        
        // Recursion demonstration functions
        window.startRecursion = (functionName) => this.startRecursion(functionName);
        window.stepRecursion = () => this.stepRecursion();
        window.resetRecursion = () => this.resetRecursion();
        
        // Graph algorithm functions
        window.startGraphTraversal = (algorithm) => this.startGraphTraversal(algorithm);
        window.addGraphNode = (x, y) => this.addGraphNode(x, y);
        window.addGraphEdge = (from, to) => this.addGraphEdge(from, to);
        window.resetGraph = () => this.resetGraph();
        
        // Complexity analysis functions
        window.analyzeComplexity = (algorithm) => this.analyzeComplexity(algorithm);
        window.compareAlgorithms = (alg1, alg2) => this.compareAlgorithms(alg1, alg2);
        
        // General control functions
        window.updateVisualizationSpeed = (speed) => this.updateVisualizationSpeed(speed);
        window.toggleVisualization = () => this.toggleVisualization();
        
        console.log('✅ Phase 3 global functions registered');
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeUI();
            this.setupCanvasInteractions();
        });
        
        // Algorithm control listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('algorithm-btn')) {
                this.handleAlgorithmButton(e.target);
            }
        });
        
        // Speed control listeners
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('speed-slider')) {
                this.updateSpeed(e.target.value);
            }
        });
    }

    initializeCanvases() {
        const canvasIds = ['sortingCanvas', 'searchingCanvas', 'recursionCanvas', 'graphCanvas'];
        
        canvasIds.forEach(id => {
            const canvas = document.getElementById(id);
            if (canvas) {
                const ctx = canvas.getContext('2d');
                this.canvases.set(id, { canvas, ctx });
                this.setupCanvasSize(canvas);
            }
        });
    }

    setupCanvasSize(canvas) {
        const container = canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        canvas.width = Math.min(rect.width - 40, 600);
        canvas.height = 300;
        
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        canvas.width *= dpr;
        canvas.height *= dpr;
        
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
    }

    generateInitialData() {
        // Generate initial arrays and data structures
        this.generateRandomArray();
        this.generateSearchArray();
        this.createSampleGraph();
    }

    // ===== SORTING ALGORITHMS =====
    
    generateRandomArray(size = 20) {
        this.sortingDemo.array = Array.from({length: size}, 
            () => Math.floor(Math.random() * 150) + 10);
        this.sortingDemo.comparisons = 0;
        this.sortingDemo.swaps = 0;
        this.drawSortingArray();
    }

    drawSortingArray(highlightIndices = [], highlightColor = 'red') {
        const canvasData = this.canvases.get('sortingCanvas');
        if (!canvasData) return;
        
        const { canvas, ctx } = canvasData;
        const { array } = this.sortingDemo;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width * 0.8) / array.length;
        const maxHeight = Math.max(...array);
        const baseY = canvas.height - 50;
        
        array.forEach((value, index) => {
            const barHeight = (value / maxHeight) * (canvas.height - 100);
            const x = (canvas.width * 0.1) + index * barWidth;
            const y = baseY - barHeight;
            
            // Choose color
            if (highlightIndices.includes(index)) {
                ctx.fillStyle = highlightColor;
            } else {
                ctx.fillStyle = '#3b82f6';
            }
            
            // Draw bar
            ctx.fillRect(x, y, barWidth - 2, barHeight);
            
            // Draw value text
            ctx.fillStyle = '#1f2937';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value, x + barWidth/2, y - 5);
        });
        
        // Draw statistics
        ctx.fillStyle = '#374151';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Comparisons: ${this.sortingDemo.comparisons}`, 10, 20);
        ctx.fillText(`Swaps: ${this.sortingDemo.swaps}`, 10, 40);
    }

    async startSorting(algorithm) {
        if (this.sortingDemo.isAnimating) return;
        
        this.sortingDemo.isAnimating = true;
        this.sortingDemo.currentAlgorithm = algorithm;
        this.sortingDemo.comparisons = 0;
        this.sortingDemo.swaps = 0;
        
        const array = [...this.sortingDemo.array];
        
        switch(algorithm) {
            case 'bubble':
                await this.bubbleSort(array);
                break;
            case 'selection':
                await this.selectionSort(array);
                break;
            case 'insertion':
                await this.insertionSort(array);
                break;
            case 'merge':
                await this.mergeSort(array, 0, array.length - 1);
                break;
            case 'quick':
                await this.quickSort(array, 0, array.length - 1);
                break;
        }
        
        this.sortingDemo.isAnimating = false;
        this.celebrateSortCompletion();
    }

    async bubbleSort(array) {
        const n = array.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.sortingDemo.comparisons++;
                
                // Highlight comparison
                this.sortingDemo.array = [...array];
                this.drawSortingArray([j, j + 1], '#f59e0b');
                await this.sleep(this.sortingDemo.speed);
                
                if (array[j] > array[j + 1]) {
                    // Swap
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    this.sortingDemo.swaps++;
                    
                    // Highlight swap
                    this.sortingDemo.array = [...array];
                    this.drawSortingArray([j, j + 1], '#10b981');
                    await this.sleep(this.sortingDemo.speed);
                }
            }
        }
        
        this.sortingDemo.array = [...array];
        this.drawSortingArray(array.map((_, i) => i), '#10b981');
    }

    async selectionSort(array) {
        const n = array.length;
        
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            
            // Highlight current position
            this.drawSortingArray([i], '#8b5cf6');
            await this.sleep(this.sortingDemo.speed);
            
            for (let j = i + 1; j < n; j++) {
                this.sortingDemo.comparisons++;
                
                // Highlight comparison
                this.drawSortingArray([i, j, minIdx], '#f59e0b');
                await this.sleep(this.sortingDemo.speed / 2);
                
                if (array[j] < array[minIdx]) {
                    minIdx = j;
                }
            }
            
            if (minIdx !== i) {
                [array[i], array[minIdx]] = [array[minIdx], array[i]];
                this.sortingDemo.swaps++;
                
                // Highlight swap
                this.sortingDemo.array = [...array];
                this.drawSortingArray([i, minIdx], '#10b981');
                await this.sleep(this.sortingDemo.speed);
            }
        }
    }

    async insertionSort(array) {
        for (let i = 1; i < array.length; i++) {
            const key = array[i];
            let j = i - 1;
            
            // Highlight current element
            this.drawSortingArray([i], '#8b5cf6');
            await this.sleep(this.sortingDemo.speed);
            
            while (j >= 0 && array[j] > key) {
                this.sortingDemo.comparisons++;
                
                // Highlight comparison and shift
                this.drawSortingArray([j, j + 1], '#f59e0b');
                await this.sleep(this.sortingDemo.speed / 2);
                
                array[j + 1] = array[j];
                this.sortingDemo.swaps++;
                j--;
                
                this.sortingDemo.array = [...array];
                this.drawSortingArray();
                await this.sleep(this.sortingDemo.speed / 2);
            }
            
            array[j + 1] = key;
            this.sortingDemo.array = [...array];
            this.drawSortingArray([j + 1], '#10b981');
            await this.sleep(this.sortingDemo.speed);
        }
    }

    async mergeSort(array, left, right) {
        if (left >= right) return;
        
        const mid = Math.floor((left + right) / 2);
        
        // Highlight current section
        const section = Array.from({length: right - left + 1}, (_, i) => left + i);
        this.drawSortingArray(section, '#8b5cf6');
        await this.sleep(this.sortingDemo.speed);
        
        await this.mergeSort(array, left, mid);
        await this.mergeSort(array, mid + 1, right);
        await this.merge(array, left, mid, right);
    }

    async merge(array, left, mid, right) {
        const leftArr = array.slice(left, mid + 1);
        const rightArr = array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            this.sortingDemo.comparisons++;
            
            // Highlight merge operation
            this.drawSortingArray([k, left + i, mid + 1 + j], '#f59e0b');
            await this.sleep(this.sortingDemo.speed);
            
            if (leftArr[i] <= rightArr[j]) {
                array[k] = leftArr[i];
                i++;
            } else {
                array[k] = rightArr[j];
                j++;
            }
            
            this.sortingDemo.array = [...array];
            this.drawSortingArray([k], '#10b981');
            k++;
            await this.sleep(this.sortingDemo.speed / 2);
        }
        
        while (i < leftArr.length) {
            array[k] = leftArr[i];
            this.sortingDemo.array = [...array];
            this.drawSortingArray([k], '#10b981');
            i++;
            k++;
            await this.sleep(this.sortingDemo.speed / 2);
        }
        
        while (j < rightArr.length) {
            array[k] = rightArr[j];
            this.sortingDemo.array = [...array];
            this.drawSortingArray([k], '#10b981');
            j++;
            k++;
            await this.sleep(this.sortingDemo.speed / 2);
        }
    }

    async quickSort(array, low, high) {
        if (low < high) {
            const pi = await this.partition(array, low, high);
            
            await this.quickSort(array, low, pi - 1);
            await this.quickSort(array, pi + 1, high);
        }
    }

    async partition(array, low, high) {
        const pivot = array[high];
        let i = low - 1;
        
        // Highlight pivot
        this.drawSortingArray([high], '#8b5cf6');
        await this.sleep(this.sortingDemo.speed);
        
        for (let j = low; j < high; j++) {
            this.sortingDemo.comparisons++;
            
            // Highlight comparison with pivot
            this.drawSortingArray([j, high], '#f59e0b');
            await this.sleep(this.sortingDemo.speed / 2);
            
            if (array[j] < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
                this.sortingDemo.swaps++;
                
                this.sortingDemo.array = [...array];
                this.drawSortingArray([i, j], '#10b981');
                await this.sleep(this.sortingDemo.speed / 2);
            }
        }
        
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        this.sortingDemo.swaps++;
        
        this.sortingDemo.array = [...array];
        this.drawSortingArray([i + 1], '#10b981');
        await this.sleep(this.sortingDemo.speed);
        
        return i + 1;
    }

    celebrateSortCompletion() {
        // Create celebration effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createSortParticle();
            }, i * 100);
        }
        
        // Update completion statistics
        this.updateSortingStats();
    }

    createSortParticle() {
        const canvas = this.canvases.get('sortingCanvas')?.canvas;
        if (!canvas) return;
        
        const particle = document.createElement('div');
        particle.innerHTML = ['🎉', '✨', '🎊'][Math.floor(Math.random() * 3)];
        particle.style.cssText = `
            position: absolute;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            animation: sortParticle 2s ease-out forwards;
            left: ${Math.random() * canvas.offsetWidth}px;
            top: ${canvas.offsetTop + Math.random() * canvas.offsetHeight}px;
        `;
        
        canvas.parentElement.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
        
        // Add particle animation
        if (!document.getElementById('sort-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'sort-particle-animation';
            style.textContent = `
                @keyframes sortParticle {
                    0% { transform: translateY(0) scale(0); opacity: 0; }
                    50% { transform: translateY(-30px) scale(1); opacity: 1; }
                    100% { transform: translateY(-60px) scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== SEARCHING ALGORITHMS =====
    
    generateSearchArray() {
        this.searchingDemo.array = Array.from({length: 15}, (_, i) => (i + 1) * 5);
        this.searchingDemo.target = this.searchingDemo.array[Math.floor(Math.random() * this.searchingDemo.array.length)];
        this.drawSearchArray();
    }

    drawSearchArray(highlightIndices = [], highlightColor = 'yellow') {
        const canvasData = this.canvases.get('searchingCanvas');
        if (!canvasData) return;
        
        const { canvas, ctx } = canvasData;
        const { array, target } = this.searchingDemo;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const elementWidth = (canvas.width * 0.8) / array.length;
        const elementHeight = 50;
        const startY = (canvas.height - elementHeight) / 2;
        
        array.forEach((value, index) => {
            const x = (canvas.width * 0.1) + index * elementWidth;
            
            // Choose color
            let color = '#e5e7eb';
            if (highlightIndices.includes(index)) {
                color = highlightColor;
            } else if (value === target) {
                color = '#10b981';
            }
            
            // Draw element
            ctx.fillStyle = color;
            ctx.fillRect(x, startY, elementWidth - 2, elementHeight);
            
            // Draw border
            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, startY, elementWidth - 2, elementHeight);
            
            // Draw value
            ctx.fillStyle = '#1f2937';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value, x + elementWidth/2, startY + elementHeight/2 + 6);
        });
        
        // Draw target and steps
        ctx.fillStyle = '#374151';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Target: ${target}`, 10, 20);
        ctx.fillText(`Steps: ${this.searchingDemo.steps}`, 10, 40);
    }

    async startSearching(algorithm) {
        if (this.searchingDemo.isSearching) return;
        
        this.searchingDemo.isSearching = true;
        this.searchingDemo.currentAlgorithm = algorithm;
        this.searchingDemo.steps = 0;
        
        const { array, target } = this.searchingDemo;
        
        switch(algorithm) {
            case 'linear':
                await this.linearSearch(array, target);
                break;
            case 'binary':
                await this.binarySearch(array, target);
                break;
            case 'jump':
                await this.jumpSearch(array, target);
                break;
        }
        
        this.searchingDemo.isSearching = false;
    }

    async linearSearch(array, target) {
        for (let i = 0; i < array.length; i++) {
            this.searchingDemo.steps++;
            
            // Highlight current element
            this.drawSearchArray([i], '#f59e0b');
            await this.sleep(800);
            
            if (array[i] === target) {
                // Found!
                this.drawSearchArray([i], '#10b981');
                this.showSearchResult(true, i);
                return i;
            }
            
            // Not found, mark as eliminated
            this.drawSearchArray([i], '#ef4444');
            await this.sleep(300);
        }
        
        this.showSearchResult(false, -1);
        return -1;
    }

    async binarySearch(array, target) {
        let left = 0;
        let right = array.length - 1;
        
        while (left <= right) {
            this.searchingDemo.steps++;
            const mid = Math.floor((left + right) / 2);
            
            // Highlight search range
            const range = Array.from({length: right - left + 1}, (_, i) => left + i);
            this.drawSearchArray(range, '#e0e7ff');
            await this.sleep(600);
            
            // Highlight middle element
            this.drawSearchArray([mid], '#f59e0b');
            await this.sleep(800);
            
            if (array[mid] === target) {
                // Found!
                this.drawSearchArray([mid], '#10b981');
                this.showSearchResult(true, mid);
                return mid;
            } else if (array[mid] < target) {
                // Eliminate left half
                const eliminated = Array.from({length: mid - left + 1}, (_, i) => left + i);
                this.drawSearchArray(eliminated, '#ef4444');
                left = mid + 1;
            } else {
                // Eliminate right half
                const eliminated = Array.from({length: right - mid + 1}, (_, i) => mid + i);
                this.drawSearchArray(eliminated, '#ef4444');
                right = mid - 1;
            }
            
            await this.sleep(600);
        }
        
        this.showSearchResult(false, -1);
        return -1;
    }

    async jumpSearch(array, target) {
        const n = array.length;
        const step = Math.floor(Math.sqrt(n));
        let prev = 0;
        
        // Jump through blocks
        while (array[Math.min(step, n) - 1] < target) {
            this.searchingDemo.steps++;
            
            // Highlight jump
            this.drawSearchArray([Math.min(step, n) - 1], '#8b5cf6');
            await this.sleep(800);
            
            prev = step;
            step += Math.floor(Math.sqrt(n));
            
            if (prev >= n) {
                this.showSearchResult(false, -1);
                return -1;
            }
        }
        
        // Linear search within block
        while (array[prev] < target) {
            this.searchingDemo.steps++;
            
            this.drawSearchArray([prev], '#f59e0b');
            await this.sleep(600);
            
            prev++;
            
            if (prev === Math.min(step, n)) {
                this.showSearchResult(false, -1);
                return -1;
            }
        }
        
        if (array[prev] === target) {
            this.drawSearchArray([prev], '#10b981');
            this.showSearchResult(true, prev);
            return prev;
        }
        
        this.showSearchResult(false, -1);
        return -1;
    }

    showSearchResult(found, index) {
        const message = found ? 
            `🎉 Found at index ${index}!` : 
            `❌ Not found in array`;
            
        // Show result message
        setTimeout(() => {
            showCustomModal(message);
        }, 500);
    }

    // ===== RECURSION VISUALIZATION =====
    
    async startRecursion(functionName) {
        if (this.recursionDemo.isRunning) return;
        
        this.recursionDemo.isRunning = true;
        this.recursionDemo.currentFunction = functionName;
        this.recursionDemo.stack = [];
        this.recursionDemo.callCount = 0;
        
        switch(functionName) {
            case 'fibonacci':
                await this.visualizeFibonacci(5);
                break;
            case 'factorial':
                await this.visualizeFactorial(5);
                break;
            case 'hanoi':
                await this.visualizeHanoi(3);
                break;
        }
        
        this.recursionDemo.isRunning = false;
    }

    async visualizeFibonacci(n) {
        return await this.fibonacciHelper(n, 0);
    }

    async fibonacciHelper(n, depth) {
        this.recursionDemo.callCount++;
        
        // Add to call stack
        const frame = {
            function: `fib(${n})`,
            depth: depth,
            id: this.recursionDemo.callCount
        };
        
        this.recursionDemo.stack.push(frame);
        this.drawRecursionStack();
        await this.sleep(800);
        
        let result;
        if (n <= 1) {
            result = n;
            frame.result = result;
        } else {
            const left = await this.fibonacciHelper(n - 1, depth + 1);
            const right = await this.fibonacciHelper(n - 2, depth + 1);
            result = left + right;
            frame.result = result;
        }
        
        // Update frame with result
        this.drawRecursionStack();
        await this.sleep(600);
        
        // Remove from call stack
        this.recursionDemo.stack.pop();
        this.drawRecursionStack();
        await this.sleep(400);
        
        return result;
    }

    drawRecursionStack() {
        const canvasData = this.canvases.get('recursionCanvas');
        if (!canvasData) return;
        
        const { canvas, ctx } = canvasData;
        const { stack } = this.recursionDemo;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const frameHeight = 40;
        const frameWidth = 150;
        const startX = (canvas.width - frameWidth) / 2;
        const spacing = 45;
        
        stack.forEach((frame, index) => {
            const y = canvas.height - (index + 1) * spacing - 20;
            
            // Draw frame background
            ctx.fillStyle = frame.result !== undefined ? '#10b981' : '#3b82f6';
            ctx.fillRect(startX, y, frameWidth, frameHeight);
            
            // Draw frame border
            ctx.strokeStyle = '#1f2937';
            ctx.lineWidth = 2;
            ctx.strokeRect(startX, y, frameWidth, frameHeight);
            
            // Draw function call
            ctx.fillStyle = 'white';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(frame.function, startX + frameWidth/2, y + 20);
            
            // Draw result if available
            if (frame.result !== undefined) {
                ctx.fillText(`= ${frame.result}`, startX + frameWidth/2, y + 35);
            }
        });
        
        // Draw call count
        ctx.fillStyle = '#374151';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Total Calls: ${this.recursionDemo.callCount}`, 10, 20);
    }

    // ===== GRAPH ALGORITHMS =====
    
    createSampleGraph() {
        this.graphDemo.nodes.clear();
        this.graphDemo.edges = [];
        
        // Create sample nodes
        const positions = [
            {x: 100, y: 100, id: 'A'},
            {x: 200, y: 50, id: 'B'},
            {x: 300, y: 100, id: 'C'},
            {x: 150, y: 200, id: 'D'},
            {x: 250, y: 200, id: 'E'}
        ];
        
        positions.forEach(pos => {
            this.graphDemo.nodes.set(pos.id, pos);
        });
        
        // Create sample edges
        this.graphDemo.edges = [
            {from: 'A', to: 'B'}, {from: 'A', to: 'D'},
            {from: 'B', to: 'C'}, {from: 'B', to: 'E'},
            {from: 'C', to: 'E'}, {from: 'D', to: 'E'}
        ];
        
        this.drawGraph();
    }

    drawGraph(visitedNodes = [], currentNode = null, traversedEdges = []) {
        const canvasData = this.canvases.get('graphCanvas');
        if (!canvasData) return;
        
        const { canvas, ctx } = canvasData;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw edges
        this.graphDemo.edges.forEach(edge => {
            const fromNode = this.graphDemo.nodes.get(edge.from);
            const toNode = this.graphDemo.nodes.get(edge.to);
            
            if (fromNode && toNode) {
                const isTraversed = traversedEdges.some(e => 
                    (e.from === edge.from && e.to === edge.to) ||
                    (e.from === edge.to && e.to === edge.from)
                );
                
                ctx.strokeStyle = isTraversed ? '#10b981' : '#6b7280';
                ctx.lineWidth = isTraversed ? 3 : 2;
                
                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.stroke();
            }
        });
        
        // Draw nodes
        this.graphDemo.nodes.forEach((node, id) => {
            let color = '#e5e7eb';
            if (id === currentNode) {
                color = '#f59e0b';
            } else if (visitedNodes.includes(id)) {
                color = '#10b981';
            }
            
            // Draw node circle
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw node border
            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw node label
            ctx.fillStyle = '#1f2937';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(id, node.x, node.y + 6);
        });
    }

    async startGraphTraversal(algorithm) {
        if (this.graphDemo.isTraversing) return;
        
        this.graphDemo.isTraversing = true;
        this.graphDemo.visited = new Set();
        
        switch(algorithm) {
            case 'bfs':
                await this.breadthFirstSearch('A');
                break;
            case 'dfs':
                await this.depthFirstSearch('A');
                break;
        }
        
        this.graphDemo.isTraversing = false;
    }

    async breadthFirstSearch(startNode) {
        const queue = [startNode];
        const visited = [];
        const traversedEdges = [];
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (this.graphDemo.visited.has(current)) continue;
            
            this.graphDemo.visited.add(current);
            visited.push(current);
            
            // Highlight current node
            this.drawGraph(visited, current, traversedEdges);
            await this.sleep(1000);
            
            // Find neighbors
            const neighbors = this.graphDemo.edges
                .filter(edge => edge.from === current || edge.to === current)
                .map(edge => edge.from === current ? edge.to : edge.from)
                .filter(neighbor => !this.graphDemo.visited.has(neighbor));
            
            // Add neighbors to queue and mark edges
            for (const neighbor of neighbors) {
                if (!queue.includes(neighbor)) {
                    queue.push(neighbor);
                    traversedEdges.push({from: current, to: neighbor});
                }
            }
            
            // Update visualization
            this.drawGraph(visited, null, traversedEdges);
            await this.sleep(500);
        }
    }

    async depthFirstSearch(startNode) {
        const visited = [];
        const traversedEdges = [];
        
        await this.dfsHelper(startNode, visited, traversedEdges);
    }

    async dfsHelper(node, visited, traversedEdges) {
        if (this.graphDemo.visited.has(node)) return;
        
        this.graphDemo.visited.add(node);
        visited.push(node);
        
        // Highlight current node
        this.drawGraph(visited, node, traversedEdges);
        await this.sleep(1000);
        
        // Find neighbors
        const neighbors = this.graphDemo.edges
            .filter(edge => edge.from === node || edge.to === node)
            .map(edge => edge.from === node ? edge.to : edge.from)
            .filter(neighbor => !this.graphDemo.visited.has(neighbor));
        
        // Recursively visit neighbors
        for (const neighbor of neighbors) {
            traversedEdges.push({from: node, to: neighbor});
            await this.dfsHelper(neighbor, visited, traversedEdges);
        }
        
        // Update visualization
        this.drawGraph(visited, null, traversedEdges);
        await this.sleep(300);
    }

    // ===== UTILITY FUNCTIONS =====
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    changeSortSpeed(speed) {
        this.sortingDemo.speed = parseInt(speed);
    }

    pauseSorting() {
        this.sortingDemo.isAnimating = false;
    }

    resetSorting() {
        this.sortingDemo.isAnimating = false;
        this.generateRandomArray();
    }

    updateVisualizationSpeed(speed) {
        this.sortingDemo.speed = speed;
    }

    analyzeComplexity(algorithm) {
        const complexities = {
            bubble: { time: 'O(n²)', space: 'O(1)' },
            selection: { time: 'O(n²)', space: 'O(1)' },
            insertion: { time: 'O(n²)', space: 'O(1)' },
            merge: { time: 'O(n log n)', space: 'O(n)' },
            quick: { time: 'O(n log n)', space: 'O(log n)' },
            linear: { time: 'O(n)', space: 'O(1)' },
            binary: { time: 'O(log n)', space: 'O(1)' }
        };
        
        return complexities[algorithm] || { time: 'Unknown', space: 'Unknown' };
    }

    updateSortingStats() {
        const statsElement = document.getElementById('sortingStats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="stat">Algorithm: ${this.sortingDemo.currentAlgorithm}</div>
                <div class="stat">Comparisons: ${this.sortingDemo.comparisons}</div>
                <div class="stat">Swaps: ${this.sortingDemo.swaps}</div>
                <div class="stat">Array Size: ${this.sortingDemo.array.length}</div>
            `;
        }
    }
}

// Initialize Phase 3 Engine
let phase3Engine;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🧮 Initializing Phase 3 Algorithms Engine...');
    phase3Engine = new Phase3Engine();
});

// Export for global access
window.Phase3Engine = Phase3Engine;

console.log('🧮 Phase 3 Algorithms Foundation Engine loaded successfully!');
console.log('✨ Ready to visualize sorting, searching, recursion, and graph algorithms!');
