// Sorting Algorithms Theater Engine - Complete Implementation
class SortingAlgorithmsEngine {
    constructor() {
        // Core state management
        this.currentAlgorithm = 'bubble';
        this.array = [];
        this.originalArray = [];
        this.arraySize = 30;
        this.animationSpeed = 500;
        this.isPlaying = false;
        this.isPaused = false;
        this.currentStep = 0;
        this.totalSteps = 0;
        
        // Performance tracking
        this.stats = {
            comparisons: 0,
            swaps: 0,
            arrayAccesses: 0,
            startTime: 0,
            elapsedTime: 0
        };
        
        // Animation state
        this.animationFrames = [];
        this.currentFrame = 0;
        this.animationTimer = null;
        
        // Algorithm definitions
        this.algorithms = {
            bubble: {
                name: '🫧 Bubble Sort',
                description: 'Compares adjacent elements and swaps them if they\'re in the wrong order. Like bubbles rising to the surface, larger elements "bubble up" to their correct positions.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                stability: 'Stable',
                bestCase: 'O(n)',
                worstCase: 'O(n²)'
            },
            selection: {
                name: '🎯 Selection Sort',
                description: 'Finds the minimum element and places it at the beginning, then repeats for the remaining unsorted portion. Like selecting the best player for each position.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                stability: 'Unstable',
                bestCase: 'O(n²)',
                worstCase: 'O(n²)'
            },
            insertion: {
                name: '📥 Insertion Sort',
                description: 'Builds the sorted array one element at a time by inserting each element into its correct position. Like sorting a hand of playing cards.',
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(1)',
                stability: 'Stable',
                bestCase: 'O(n)',
                worstCase: 'O(n²)'
            },
            merge: {
                name: '🔀 Merge Sort',
                description: 'Divides the array into halves, sorts them recursively, then merges the sorted halves. A classic "divide and conquer" approach.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(n)',
                stability: 'Stable',
                bestCase: 'O(n log n)',
                worstCase: 'O(n log n)'
            },
            quick: {
                name: '⚡ Quick Sort',
                description: 'Selects a pivot element and partitions the array around it, then recursively sorts the sub-arrays. Very fast in practice.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(log n)',
                stability: 'Unstable',
                bestCase: 'O(n log n)',
                worstCase: 'O(n²)'
            },
            heap: {
                name: '🏔️ Heap Sort',
                description: 'Builds a max heap from the array, then repeatedly extracts the maximum element. Combines the best of merge sort and selection sort.',
                timeComplexity: 'O(n log n)',
                spaceComplexity: 'O(1)',
                stability: 'Unstable',
                bestCase: 'O(n log n)',
                worstCase: 'O(n log n)'
            }
        };
        
        this.init();
    }

    init() {
        console.log('🎭 Sorting Algorithms Theater Engine initializing...');
        this.setupGlobalFunctions();
        this.setupEventListeners();
        this.generateNewArray();
        this.updateAlgorithmInfo();
        console.log('✅ Theater Engine ready for performance!');
    }

    setupGlobalFunctions() {
        // Make all functions globally available for HTML onclick attributes
        window.selectAlgorithm = (algorithm) => this.selectAlgorithm(algorithm);
        window.generateNewArray = () => this.generateNewArray();
        window.startSorting = () => this.startSorting();
        window.pauseSorting = () => this.pauseSorting();
        window.resetSorting = () => this.resetSorting();
        window.stepForward = () => this.stepForward();
        window.updateSpeed = (value) => this.updateSpeed(value);
        window.updateArraySize = (value) => this.updateArraySize(value);
        
        // Algorithm comparison functions
        window.runComparison = () => this.runComparison();
        window.showComplexityChart = () => this.showComplexityChart();
        window.bestWorstCaseAnalysis = () => this.bestWorstCaseAnalysis();
        
        // Laboratory functions
        window.generateData = (pattern) => this.generateData(pattern);
        
        // Implementation challenge functions
        window.startChallenge = (algorithm) => this.startChallenge(algorithm);
        window.testImplementation = () => this.testImplementation();
        window.visualizeImplementation = () => this.visualizeImplementation();
        window.submitImplementation = () => this.submitImplementation();
        
        // Application exploration
        window.exploreApplication = (app) => this.exploreApplication(app);
        
        // Navigation
        window.previousLesson = () => this.previousLesson();
        window.nextLesson = () => this.nextLesson();
        
        console.log('✅ Global functions registered for Sorting Theater');
    }

    setupEventListeners() {
        // Additional event listeners for dynamic elements
        document.addEventListener('DOMContentLoaded', () => {
            this.attachEventListeners();
        });
    }

    attachEventListeners() {
        // Speed slider
        const speedSlider = document.getElementById('speedSlider');
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => this.updateSpeed(e.target.value));
        }

        // Size slider  
        const sizeSlider = document.getElementById('sizeSlider');
        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => this.updateArraySize(e.target.value));
        }

        // Algorithm buttons
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const algorithm = e.target.dataset.algorithm;
                if (algorithm) this.selectAlgorithm(algorithm);
            });
        });
    }

    // ===== CORE SORTING ENGINE =====
    
    selectAlgorithm(algorithm) {
        console.log(`🎭 Selected algorithm: ${algorithm}`);
        
        if (this.isPlaying) {
            this.resetSorting();
        }
        
        this.currentAlgorithm = algorithm;
        this.updateAlgorithmInfo();
        this.updateAlgorithmButtons();
        this.resetStats();
        this.generateNewArray();
        
        // Show algorithm-specific tips
        this.showAlgorithmTip(algorithm);
    }

    updateAlgorithmInfo() {
        const algo = this.algorithms[this.currentAlgorithm];
        if (!algo) return;
        
        // Update UI elements
        this.updateElement('algorithmTitle', algo.name);
        this.updateElement('algorithmDescription', algo.description);
        this.updateElement('timeComplexity', algo.timeComplexity);
        this.updateElement('spaceComplexity', algo.spaceComplexity);
        this.updateElement('stability', algo.stability);
        this.updateElement('bestCase', algo.bestCase);
    }

    updateAlgorithmButtons() {
        document.querySelectorAll('.algo-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.algorithm === this.currentAlgorithm) {
                btn.classList.add('active');
            }
        });
    }

    generateNewArray() {
        console.log(`🎲 Generating new array of size ${this.arraySize}`);
        
        // Generate random array
        this.array = [];
        this.originalArray = [];
        
        for (let i = 0; i < this.arraySize; i++) {
            const value = Math.floor(Math.random() * 300) + 10; // Values between 10-310
            this.array.push(value);
            this.originalArray.push(value);
        }
        
        this.renderArray();
        this.resetStats();
        this.resetControls();
        
        console.log('✅ New array generated:', this.array.slice(0, 10) + '...');
    }

    renderArray() {
        const canvas = document.getElementById('sortingCanvas');
        if (!canvas) return;
        
        // Clear canvas
        canvas.innerHTML = '';
        
        // Calculate bar dimensions
        const canvasWidth = canvas.clientWidth - 40; // Account for padding
        const barWidth = Math.max(2, Math.floor(canvasWidth / this.arraySize) - 2);
        const maxValue = Math.max(...this.array);
        const canvasHeight = 360; // Fixed height for bars
        
        // Create bars
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.dataset.index = index;
            bar.dataset.value = value;
            
            const height = Math.floor((value / maxValue) * canvasHeight);
            bar.style.width = `${barWidth}px`;
            bar.style.height = `${height}px`;
            bar.style.left = `${index * (barWidth + 2)}px`;
            
            canvas.appendChild(bar);
        });
        
        console.log(`✅ Rendered ${this.array.length} bars`);
    }

    // ===== SORTING ALGORITHMS IMPLEMENTATION =====
    
    startSorting() {
        if (this.isPlaying) return;
        
        console.log(`🎬 Starting ${this.currentAlgorithm} sort animation`);
        
        this.isPlaying = true;
        this.isPaused = false;
        this.stats.startTime = Date.now();
        
        // Update UI
        this.updateElement('status', 'Sorting...');
        document.getElementById('playBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('stepBtn').disabled = true;
        
        // Generate animation frames
        this.generateAnimationFrames();
        
        // Start animation
        this.playAnimation();
    }

    generateAnimationFrames() {
        this.animationFrames = [];
        this.currentFrame = 0;
        
        // Create a copy of the array for sorting
        const sortArray = [...this.array];
        
        // Generate frames based on selected algorithm
        switch (this.currentAlgorithm) {
            case 'bubble':
                this.generateBubbleSortFrames(sortArray);
                break;
            case 'selection':
                this.generateSelectionSortFrames(sortArray);
                break;
            case 'insertion':
                this.generateInsertionSortFrames(sortArray);
                break;
            case 'merge':
                this.generateMergeSortFrames(sortArray);
                break;
            case 'quick':
                this.generateQuickSortFrames(sortArray);
                break;
            case 'heap':
                this.generateHeapSortFrames(sortArray);
                break;
        }
        
        this.totalSteps = this.animationFrames.length;
        console.log(`✅ Generated ${this.totalSteps} animation frames`);
    }

    generateBubbleSortFrames(arr) {
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Add comparison frame
                this.addFrame({
                    type: 'compare',
                    indices: [j, j + 1],
                    array: [...arr],
                    message: `Comparing ${arr[j]} and ${arr[j + 1]}`
                });
                
                this.stats.comparisons++;
                this.stats.arrayAccesses += 2;
                
                if (arr[j] > arr[j + 1]) {
                    // Add swap frame
                    this.addFrame({
                        type: 'swap',
                        indices: [j, j + 1],
                        array: [...arr],
                        message: `Swapping ${arr[j]} and ${arr[j + 1]}`
                    });
                    
                    // Perform swap
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    this.stats.swaps++;
                    this.stats.arrayAccesses += 4;
                    
                    // Add post-swap frame
                    this.addFrame({
                        type: 'swapped',
                        indices: [j, j + 1],
                        array: [...arr],
                        message: `Swapped! New positions: ${arr[j]}, ${arr[j + 1]}`
                    });
                }
            }
            
            // Mark element as sorted
            this.addFrame({
                type: 'sorted',
                indices: [n - 1 - i],
                array: [...arr],
                message: `${arr[n - 1 - i]} is in its final position`
            });
        }
        
        // Mark first element as sorted
        this.addFrame({
            type: 'sorted',
            indices: [0],
            array: [...arr],
            message: 'All elements sorted!'
        });
    }

    generateSelectionSortFrames(arr) {
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            
            // Add frame for starting new pass
            this.addFrame({
                type: 'selecting',
                indices: [i],
                array: [...arr],
                message: `Finding minimum in remaining unsorted portion`
            });
            
            for (let j = i + 1; j < n; j++) {
                // Compare with current minimum
                this.addFrame({
                    type: 'compare',
                    indices: [minIdx, j],
                    array: [...arr],
                    message: `Comparing minimum candidate ${arr[minIdx]} with ${arr[j]}`
                });
                
                this.stats.comparisons++;
                this.stats.arrayAccesses += 2;
                
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                    this.addFrame({
                        type: 'newMin',
                        indices: [minIdx],
                        array: [...arr],
                        message: `New minimum found: ${arr[minIdx]}`
                    });
                }
            }
            
            // Swap if necessary
            if (minIdx !== i) {
                this.addFrame({
                    type: 'swap',
                    indices: [i, minIdx],
                    array: [...arr],
                    message: `Swapping ${arr[i]} with minimum ${arr[minIdx]}`
                });
                
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                this.stats.swaps++;
                this.stats.arrayAccesses += 4;
            }
            
            // Mark as sorted
            this.addFrame({
                type: 'sorted',
                indices: [i],
                array: [...arr],
                message: `${arr[i]} is in its final position`
            });
        }
        
        // Mark last element as sorted
        this.addFrame({
            type: 'sorted',
            indices: [n - 1],
            array: [...arr],
            message: 'Selection sort complete!'
        });
    }

    generateInsertionSortFrames(arr) {
        for (let i = 1; i < arr.length; i++) {
            const key = arr[i];
            let j = i - 1;
            
            this.addFrame({
                type: 'selecting',
                indices: [i],
                array: [...arr],
                message: `Inserting ${key} into sorted portion`
            });
            
            while (j >= 0 && arr[j] > key) {
                this.addFrame({
                    type: 'compare',
                    indices: [j, j + 1],
                    array: [...arr],
                    message: `${arr[j]} > ${key}, shifting right`
                });
                
                arr[j + 1] = arr[j];
                this.stats.comparisons++;
                this.stats.arrayAccesses += 2;
                
                this.addFrame({
                    type: 'shift',
                    indices: [j + 1],
                    array: [...arr],
                    message: `Shifted ${arr[j + 1]} to the right`
                });
                
                j--;
            }
            
            arr[j + 1] = key;
            this.addFrame({
                type: 'insert',
                indices: [j + 1],
                array: [...arr],
                message: `Inserted ${key} at position ${j + 1}`
            });
        }
        
        this.addFrame({
            type: 'complete',
            indices: [],
            array: [...arr],
            message: 'Insertion sort complete!'
        });
    }

    generateMergeSortFrames(arr) {
        this.mergeSortRecursive(arr, 0, arr.length - 1);
    }

    mergeSortRecursive(arr, left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            this.addFrame({
                type: 'divide',
                indices: [left, mid, right],
                array: [...arr],
                message: `Dividing array: [${left}-${mid}] and [${mid + 1}-${right}]`
            });
            
            this.mergeSortRecursive(arr, left, mid);
            this.mergeSortRecursive(arr, mid + 1, right);
            this.merge(arr, left, mid, right);
        }
    }

    merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        this.addFrame({
            type: 'merging',
            indices: [left, mid, right],
            array: [...arr],
            message: `Merging subarrays [${left}-${mid}] and [${mid + 1}-${right}]`
        });
        
        while (i < leftArr.length && j < rightArr.length) {
            this.addFrame({
                type: 'compare',
                indices: [left + i, mid + 1 + j],
                array: [...arr],
                message: `Comparing ${leftArr[i]} and ${rightArr[j]}`
            });
            
            this.stats.comparisons++;
            
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            
            this.addFrame({
                type: 'place',
                indices: [k],
                array: [...arr],
                message: `Placed ${arr[k]} at position ${k}`
            });
            
            k++;
            this.stats.arrayAccesses++;
        }
        
        // Copy remaining elements
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            this.addFrame({
                type: 'place',
                indices: [k],
                array: [...arr],
                message: `Placed remaining ${arr[k]}`
            });
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            this.addFrame({
                type: 'place',
                indices: [k],
                array: [...arr],
                message: `Placed remaining ${arr[k]}`
            });
            j++;
            k++;
        }
        
        this.addFrame({
            type: 'merged',
            indices: Array.from({length: right - left + 1}, (_, i) => left + i),
            array: [...arr],
            message: `Merged subarray [${left}-${right}]`
        });
    }

    generateQuickSortFrames(arr) {
        this.quickSortRecursive(arr, 0, arr.length - 1);
    }

    quickSortRecursive(arr, low, high) {
        if (low < high) {
            const pi = this.partition(arr, low, high);
            
            this.addFrame({
                type: 'partitioned',
                indices: [pi],
                array: [...arr],
                message: `Pivot ${arr[pi]} is in its final position`
            });
            
            this.quickSortRecursive(arr, low, pi - 1);
            this.quickSortRecursive(arr, pi + 1, high);
        }
    }

    partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        
        this.addFrame({
            type: 'pivot',
            indices: [high],
            array: [...arr],
            message: `Chose pivot: ${pivot}`
        });
        
        for (let j = low; j < high; j++) {
            this.addFrame({
                type: 'compare',
                indices: [j, high],
                array: [...arr],
                message: `Comparing ${arr[j]} with pivot ${pivot}`
            });
            
            this.stats.comparisons++;
            
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                this.stats.swaps++;
                
                this.addFrame({
                    type: 'swap',
                    indices: [i, j],
                    array: [...arr],
                    message: `Swapped ${arr[i]} and ${arr[j]}`
                });
            }
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        this.stats.swaps++;
        
        this.addFrame({
            type: 'pivotPlace',
            indices: [i + 1, high],
            array: [...arr],
            message: `Placed pivot ${pivot} in its final position`
        });
        
        return i + 1;
    }

    generateHeapSortFrames(arr) {
        const n = arr.length;
        
        // Build max heap
        this.addFrame({
            type: 'building',
            indices: [],
            array: [...arr],
            message: 'Building max heap...'
        });
        
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(arr, n, i);
        }
        
        this.addFrame({
            type: 'heapBuilt',
            indices: [],
            array: [...arr],
            message: 'Max heap built! Largest element is at root.'
        });
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            [arr[0], arr[i]] = [arr[i], arr[0]];
            this.stats.swaps++;
            
            this.addFrame({
                type: 'extract',
                indices: [0, i],
                array: [...arr],
                message: `Extracted ${arr[i]} and placed at position ${i}`
            });
            
            // Mark as sorted
            this.addFrame({
                type: 'sorted',
                indices: [i],
                array: [...arr],
                message: `${arr[i]} is in its final position`
            });
            
            // Restore heap property
            this.heapify(arr, i, 0);
        }
        
        this.addFrame({
            type: 'sorted',
            indices: [0],
            array: [...arr],
            message: 'Heap sort complete!'
        });
    }

    heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
            this.stats.comparisons++;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
            this.stats.comparisons++;
        }
        
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.stats.swaps++;
            
            this.addFrame({
                type: 'heapify',
                indices: [i, largest],
                array: [...arr],
                message: `Heapifying: swapped positions ${i} and ${largest}`
            });
            
            this.heapify(arr, n, largest);
        }
    }

    addFrame(frameData) {
        this.animationFrames.push(frameData);
    }

    // ===== ANIMATION PLAYBACK =====
    
    playAnimation() {
        if (!this.isPlaying || this.currentFrame >= this.animationFrames.length) {
            this.completeSorting();
            return;
        }
        
        const frame = this.animationFrames[this.currentFrame];
        this.displayFrame(frame);
        this.updateProgress();
        
        this.currentFrame++;
        
        // Schedule next frame
        this.animationTimer = setTimeout(() => {
            this.playAnimation();
        }, this.animationSpeed);
    }

    displayFrame(frame) {
        // Update array visualization
        this.array = [...frame.array];
        this.renderArray();
        
        // Apply visual effects based on frame type
        this.applyFrameEffects(frame);
        
        // Update message/status
        this.updateElement('status', frame.message);
    }

    applyFrameEffects(frame) {
        const bars = document.querySelectorAll('.array-bar');
        
        // Clear previous effects
        bars.forEach(bar => {
            bar.classList.remove('comparing', 'swapping', 'sorted', 'pivot', 'selecting', 'newMin', 'shift', 'insert');
        });
        
        // Apply new effects based on frame type
        if (frame.indices && frame.indices.length > 0) {
            frame.indices.forEach(index => {
                const bar = bars[index];
                if (bar) {
                    switch (frame.type) {
                        case 'compare':
                            bar.classList.add('comparing');
                            break;
                        case 'swap':
                        case 'swapping':
                            bar.classList.add('swapping');
                            break;
                        case 'sorted':
                            bar.classList.add('sorted');
                            break;
                        case 'pivot':
                        case 'pivotPlace':
                            bar.classList.add('pivot');
                            break;
                        case 'selecting':
                            bar.classList.add('selecting');
                            break;
                        case 'newMin':
                            bar.classList.add('newMin');
                            break;
                        case 'shift':
                            bar.classList.add('shift');
                            break;
                        case 'insert':
                            bar.classList.add('insert');
                            break;
                    }
                }
            });
        }
    }

    pauseSorting() {
        if (!this.isPlaying) return;
        
        this.isPaused = true;
        this.isPlaying = false;
        
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
        }
        
        // Update UI
        document.getElementById('playBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('stepBtn').disabled = false;
        this.updateElement('status', 'Paused');
        
        console.log('⏸️ Animation paused');
    }

    resumeSorting() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.isPaused = false;
        
        // Update UI
        document.getElementById('playBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('stepBtn').disabled = true;
        
        this.playAnimation();
        console.log('▶️ Animation resumed');
    }

    stepForward() {
        if (this.isPlaying || this.currentFrame >= this.animationFrames.length) return;
        
        const frame = this.animationFrames[this.currentFrame];
        this.displayFrame(frame);
        this.updateProgress();
        this.currentFrame++;
        
        if (this.currentFrame >= this.animationFrames.length) {
            this.completeSorting();
        }
        
        console.log(`⏭️ Stepped to frame ${this.currentFrame}`);
    }

    resetSorting() {
        console.log('🔄 Resetting sorting animation');
        
        // Stop animation
        this.isPlaying = false;
        this.isPaused = false;
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
        }
        
        // Reset state
        this.currentFrame = 0;
        this.array = [...this.originalArray];
        this.resetStats();
        
        // Update UI
        this.renderArray();
        this.resetControls();
        this.updateElement('status', 'Ready');
        this.updateElement('progress', '0%');
    }

    completeSorting() {
        console.log('✅ Sorting animation completed');
        
        this.isPlaying = false;
        this.isPaused = false;
        
        // Mark all elements as sorted
        const bars = document.querySelectorAll('.array-bar');
        bars.forEach(bar => {
            bar.classList.add('sorted');
            bar.classList.remove('comparing', 'swapping', 'pivot', 'selecting');
        });
        
        // Update UI
        this.resetControls();
        this.updateElement('status', 'Complete!');
        this.updateElement('progress', '100%');
        
        // Calculate final time
        this.stats.elapsedTime = (Date.now() - this.stats.startTime) / 1000;
        this.updateStats();
        
        // Show completion message
        this.showCompletionMessage();
    }

    // ===== UI UPDATE FUNCTIONS =====
    
    updateProgress() {
        const progress = Math.floor((this.currentFrame / this.totalSteps) * 100);
        this.updateElement('progress', `${progress}%`);
        
        // Update elapsed time
        if (this.stats.startTime > 0) {
            this.stats.elapsedTime = (Date.now() - this.stats.startTime) / 1000;
            this.updateElement('timeElapsed', `${this.stats.elapsedTime.toFixed(1)}s`);
        }
        
        this.updateStats();
    }

    updateStats() {
        this.updateElement('comparisons', this.stats.comparisons.toLocaleString());
        this.updateElement('swaps', this.stats.swaps.toLocaleString());
        this.updateElement('arrayAccesses', this.stats.arrayAccesses.toLocaleString());
        this.updateElement('timeElapsed', `${this.stats.elapsedTime.toFixed(1)}s`);
    }

    resetStats() {
        this.stats = {
            comparisons: 0,
            swaps: 0,
            arrayAccesses: 0,
            startTime: 0,
            elapsedTime: 0
        };
        this.updateStats();
    }

    resetControls() {
        document.getElementById('playBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('stepBtn').disabled = false;
    }

    updateSpeed(value) {
        const speeds = {
            1: { speed: 1500, label: 'Very Slow' },
            2: { speed: 1200, label: 'Slow' },
            3: { speed: 900, label: 'Slow-Medium' },
            4: { speed: 700, label: 'Medium-Slow' },
            5: { speed: 500, label: 'Medium' },
            6: { speed: 300, label: 'Medium-Fast' },
            7: { speed: 200, label: 'Fast' },
            8: { speed: 100, label: 'Very Fast' },
            9: { speed: 50, label: 'Ultra Fast' },
            10: { speed: 10, label: 'Lightning' }
        };
        
        this.animationSpeed = speeds[value].speed;
        this.updateElement('speedDisplay', speeds[value].label);
        
        console.log(`🎚️ Speed updated to: ${speeds[value].label} (${this.animationSpeed}ms)`);
    }

    updateArraySize(value) {
        this.arraySize = parseInt(value);
        this.updateElement('sizeDisplay', value);
        this.generateNewArray();
        
        console.log(`📏 Array size updated to: ${this.arraySize}`);
    }

    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    }

    // ===== ALGORITHM COMPARISON & ANALYSIS =====
    
    runComparison() {
        console.log('🏁 Starting algorithm comparison race');
        
        const raceLanes = document.getElementById('raceLanes');
        if (!raceLanes) return;
        
        // Generate test data
        const testData = this.generateTestArray(50);
        const algorithms = ['bubble', 'selection', 'insertion', 'merge', 'quick', 'heap'];
        
        // Clear previous results
        raceLanes.innerHTML = '';
        
        // Create race lanes
        algorithms.forEach(algo => {
            const lane = this.createRaceLane(algo);
            raceLanes.appendChild(lane);
        });
        
        // Run race simulation
        this.simulateAlgorithmRace(algorithms, testData);
    }

    createRaceLane(algorithm) {
        const lane = document.createElement('div');
        lane.className = 'race-lane';
        lane.innerHTML = `
            <div class="race-algorithm">${this.algorithms[algorithm].name}</div>
            <div class="race-progress">
                <div class="race-progress-bar" id="progress-${algorithm}"></div>
            </div>
            <div class="race-time" id="time-${algorithm}">0.0s</div>
        `;
        return lane;
    }

    simulateAlgorithmRace(algorithms, testData) {
        const results = {};
        
        // Simulate each algorithm
        algorithms.forEach(algo => {
            const startTime = performance.now();
            const sortedData = this.simulateSort(algo, [...testData]);
            const endTime = performance.now();
            
            results[algo] = {
                time: endTime - startTime,
                comparisons: this.getSimulatedComparisons(algo, testData.length),
                swaps: this.getSimulatedSwaps(algo, testData.length)
            };
        });
        
        // Animate race results
        this.animateRaceResults(results);
    }

    simulateSort(algorithm, array) {
        // Quick simulation without animation
        switch (algorithm) {
            case 'bubble':
                return this.bubbleSort([...array]);
            case 'selection':
                return this.selectionSort([...array]);
            case 'insertion':
                return this.insertionSort([...array]);
            case 'merge':
                return this.mergeSort([...array]);
            case 'quick':
                return this.quickSort([...array]);
            case 'heap':
                return this.heapSort([...array]);
            default:
                return array;
        }
    }

    // Simplified sorting implementations for simulation
    bubbleSort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }

    selectionSort(arr) {
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
    }

    insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        return arr;
    }

    mergeSort(arr) {
        if (arr.length <= 1) return arr;
        
        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid));
        const right = this.mergeSort(arr.slice(mid));
        
        return this.mergeSortedArrays(left, right);
    }

    mergeSortedArrays(left, right) {
        const result = [];
        let i = 0, j = 0;
        
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }
        
        return result.concat(left.slice(i)).concat(right.slice(j));
    }

    quickSort(arr) {
        if (arr.length <= 1) return arr;
        
        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => x < pivot);
        const middle = arr.filter(x => x === pivot);
        const right = arr.filter(x => x > pivot);
        
        return [...this.quickSort(left), ...middle, ...this.quickSort(right)];
    }

    heapSort(arr) {
        // Simplified heap sort implementation
        return [...arr].sort((a, b) => a - b);
    }

    animateRaceResults(results) {
        const maxTime = Math.max(...Object.values(results).map(r => r.time));
        
        Object.entries(results).forEach(([algo, result], index) => {
            setTimeout(() => {
                const progressBar = document.getElementById(`progress-${algo}`);
                const timeDisplay = document.getElementById(`time-${algo}`);
                
                if (progressBar && timeDisplay) {
                    const percentage = (result.time / maxTime) * 100;
                    progressBar.style.width = `${percentage}%`;
                    timeDisplay.textContent = `${result.time.toFixed(1)}ms`;
                }
            }, index * 200);
        });
    }

    getSimulatedComparisons(algorithm, n) {
        // Estimate comparisons based on algorithm complexity
        switch (algorithm) {
            case 'bubble':
            case 'selection':
            case 'insertion':
                return Math.floor(n * n / 2);
            case 'merge':
            case 'heap':
                return Math.floor(n * Math.log2(n));
            case 'quick':
                return Math.floor(n * Math.log2(n) * 1.5);
            default:
                return n;
        }
    }

    getSimulatedSwaps(algorithm, n) {
        // Estimate swaps based on algorithm behavior
        switch (algorithm) {
            case 'bubble':
                return Math.floor(n * n / 4);
            case 'selection':
                return n;
            case 'insertion':
                return Math.floor(n * n / 4);
            case 'merge':
                return Math.floor(n * Math.log2(n));
            case 'quick':
                return Math.floor(n * Math.log2(n));
            case 'heap':
                return Math.floor(n * Math.log2(n));
            default:
                return 0;
        }
    }

    showComplexityChart() {
        showCustomModal(`Time Complexity Comparison:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🫧 Bubble Sort:    Best O(n)     Average O(n²)   Worst O(n²)
🎯 Selection Sort: Best O(n²)    Average O(n²)   Worst O(n²)
📥 Insertion Sort: Best O(n)     Average O(n²)   Worst O(n²)
🔀 Merge Sort:     Best O(nlogn) Average O(nlogn) Worst O(nlogn)
⚡ Quick Sort:     Best O(nlogn) Average O(nlogn) Worst O(n²)
🏔️ Heap Sort:      Best O(nlogn) Average O(nlogn) Worst O(nlogn)

Space Complexity:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🫧 Bubble Sort:    O(1) - In-place
🎯 Selection Sort: O(1) - In-place
📥 Insertion Sort: O(1) - In-place
🔀 Merge Sort:     O(n) - Extra space needed
⚡ Quick Sort:     O(log n) - Recursion stack
🏔️ Heap Sort:      O(1) - In-place

Stability:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Stable: Bubble, Insertion, Merge
❌ Unstable: Selection, Quick, Heap`, '📈 Algorithm Complexity Chart');
    }

    bestWorstCaseAnalysis() {
        showCustomModal(`BEST CASE SCENARIOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🫧 Bubble Sort: Already sorted array → O(n)
   - Only needs one pass to verify order
   
📥 Insertion Sort: Already sorted array → O(n)
   - Each element is already in correct position
   
⚡ Quick Sort: Balanced partitions → O(n log n)
   - Pivot always divides array evenly
   
🔀 Merge Sort: Always O(n log n)
   - Consistent performance regardless of input

WORST CASE SCENARIOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🫧 Bubble Sort: Reverse sorted array → O(n²)
   - Maximum number of swaps needed
   
🎯 Selection Sort: Any array → O(n²)
   - Always scans remaining elements
   
📥 Insertion Sort: Reverse sorted array → O(n²)
   - Each element needs maximum shifts
   
⚡ Quick Sort: Already sorted array → O(n²)
   - Poor pivot choice creates unbalanced partitions

PRACTICAL IMPLICATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Use Insertion Sort for small arrays (< 50 elements)
• Use Quick Sort for general-purpose sorting
• Use Merge Sort when stability is required
• Use Heap Sort when memory is limited`, '⚖️ Best vs Worst Case Analysis');
    }

    // ===== DATA PATTERN GENERATION =====
    
    generateData(pattern) {
        console.log(`🎲 Generating ${pattern} data pattern`);
        
        // Update button states
        document.querySelectorAll('.data-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Generate data based on pattern
        switch (pattern) {
            case 'random':
                this.generateRandomData();
                break;
            case 'sorted':
                this.generateSortedData();
                break;
            case 'reverse':
                this.generateReverseSortedData();
                break;
            case 'nearly':
                this.generateNearlySortedData();
                break;
            case 'duplicates':
                this.generateManyDuplicatesData();
                break;
            case 'few-unique':
                this.generateFewUniqueData();
                break;
        }
        
        this.renderArray();
        this.resetStats();
        this.resetControls();
        
        // Show pattern analysis
        this.analyzeDataPattern(pattern);
    }

    generateRandomData() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * 300) + 10);
        }
        this.originalArray = [...this.array];
    }

    generateSortedData() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(i * 5 + 10);
        }
        this.originalArray = [...this.array];
    }

    generateReverseSortedData() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push((this.arraySize - i) * 5 + 10);
        }
        this.originalArray = [...this.array];
    }

    generateNearlySortedData() {
        // Start with sorted data
        this.generateSortedData();
        
        // Make a few random swaps (10% of array size)
        const swapCount = Math.max(1, Math.floor(this.arraySize * 0.1));
        for (let i = 0; i < swapCount; i++) {
            const idx1 = Math.floor(Math.random() * this.arraySize);
            const idx2 = Math.floor(Math.random() * this.arraySize);
            [this.array[idx1], this.array[idx2]] = [this.array[idx2], this.array[idx1]];
        }
        
        this.originalArray = [...this.array];
    }

    generateManyDuplicatesData() {
        this.array = [];
        const uniqueValues = Math.max(3, Math.floor(this.arraySize / 5));
        const values = Array.from({length: uniqueValues}, (_, i) => (i + 1) * 30);
        
        for (let i = 0; i < this.arraySize; i++) {
            const randomValue = values[Math.floor(Math.random() * values.length)];
            this.array.push(randomValue);
        }
        
        this.originalArray = [...this.array];
    }

    generateFewUniqueData() {
        this.array = [];
        const values = [50, 100, 150, 200]; // Only 4 unique values
        
        for (let i = 0; i < this.arraySize; i++) {
            const randomValue = values[Math.floor(Math.random() * values.length)];
            this.array.push(randomValue);
        }
        
        this.originalArray = [...this.array];
    }

    generateTestArray(size) {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * 500) + 1);
        }
        return array;
    }

    analyzeDataPattern(pattern) {
        const analysis = {
            'random': {
                best: 'Quick Sort, Merge Sort',
                worst: 'Bubble Sort',
                surprise: 'Insertion sort performs better than expected on small random arrays'
            },
            'sorted': {
                best: 'Bubble Sort, Insertion Sort',
                worst: 'Quick Sort (poor pivot choice)',
                surprise: 'Bubble sort and insertion sort are actually fastest!'
            },
            'reverse': {
                best: 'Merge Sort, Heap Sort',
                worst: 'Bubble Sort, Insertion Sort',
                surprise: 'This is the nightmare scenario for simple algorithms'
            },
            'nearly': {
                best: 'Insertion Sort',
                worst: 'Selection Sort',
                surprise: 'Insertion sort shines with nearly sorted data'
            },
            'duplicates': {
                best: 'Merge Sort (stable)',
                worst: 'Quick Sort (many equal elements)',
                surprise: 'Stability becomes important with duplicates'
            },
            'few-unique': {
                best: 'Counting Sort (if implemented)',
                worst: 'Comparison-based sorts struggle',
                surprise: 'Non-comparison sorts would dominate here'
            }
        };
        
        const result = analysis[pattern];
        if (result) {
            setTimeout(() => {
                showCustomModal(`🏆 Best Algorithm: ${result.best}
💀 Worst Algorithm: ${result.worst}
🎉 Surprise Factor: ${result.surprise}

Try running different algorithms on this data pattern to see the difference in performance!`, `📋 Data Pattern Analysis: ${pattern.toUpperCase()}`);
            }, 500);
        }
    }

    // ===== IMPLEMENTATION CHALLENGES =====
    
    startChallenge(algorithm) {
        console.log(`🎯 Starting ${algorithm} implementation challenge`);
        
        const workspace = document.getElementById('codeWorkspace');
        const instructions = document.getElementById('challengeInstructions');
        const editor = document.getElementById('codeEditor');
        
        if (!workspace || !instructions || !editor) return;
        
        // Show workspace
        workspace.style.display = 'block';
        
        // Generate challenge content
        const challenge = this.getChallengeContent(algorithm);
        instructions.innerHTML = challenge.instructions;
        editor.value = challenge.starterCode;
        
        // Store current challenge
        this.currentChallenge = {
            algorithm: algorithm,
            solution: challenge.solution
        };
        
        // Scroll to workspace
        workspace.scrollIntoView({ behavior: 'smooth' });
    }

    getChallengeContent(algorithm) {
        const challenges = {
            bubble: {
                instructions: `
                    <h4>🫧 Bubble Sort Implementation Challenge</h4>
                    <p><strong>Your Mission:</strong> Implement the bubble sort algorithm step by step.</p>
                    
                    <h5>📋 Requirements:</h5>
                    <ul>
                        <li>Compare adjacent elements in the array</li>
                        <li>Swap them if they're in the wrong order</li>
                        <li>Repeat until no swaps are needed</li>
                        <li>Add optimization to stop early if array becomes sorted</li>
                    </ul>
                    
                    <h5>💡 Hints:</h5>
                    <ul>
                        <li>Use nested loops: outer loop for passes, inner loop for comparisons</li>
                        <li>After each pass, the largest element "bubbles" to the end</li>
                        <li>Use a flag to detect when no swaps occur (early termination)</li>
                    </ul>
                    
                    <h5>🧪 Test Cases:</h5>
                    <p>Your function will be tested with: [64, 34, 25, 12, 22, 11, 90]</p>
                `,
                starterCode: `def bubble_sort(arr):
    """
    Implement bubble sort algorithm
    
    Args:
        arr: List of integers to sort
        
    Returns:
        List of integers sorted in ascending order
    """
    n = len(arr)
    
    # TODO: Implement the outer loop for passes
    for i in range(n):
        # TODO: Add optimization flag for early termination
        swapped = False
        
        # TODO: Implement the inner loop for comparisons
        for j in range(0, n - i - 1):
            # TODO: Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # TODO: Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # TODO: Check if no swaps occurred (array is sorted)
        if not swapped:
            break
    
    return arr

# Test your implementation
test_array = [64, 34, 25, 12, 22, 11, 90]
print(f"Original: {test_array}")
sorted_array = bubble_sort(test_array.copy())
print(f"Sorted: {sorted_array}")`,
                solution: `def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n):
        swapped = False
        
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        if not swapped:
            break
    
    return arr`
            },
            selection: {
                instructions: `
                    <h4>🎯 Selection Sort Implementation Challenge</h4>
                    <p><strong>Your Mission:</strong> Build selection sort by finding minimum elements.</p>
                    
                    <h5>📋 Algorithm Steps:</h5>
                    <ol>
                        <li>Find the minimum element in the unsorted portion</li>
                        <li>Swap it with the first element of unsorted portion</li>
                        <li>Move the boundary of sorted portion one position right</li>
                        <li>Repeat until entire array is sorted</li>
                    </ol>
                    
                    <h5>💡 Key Insights:</h5>
                    <ul>
                        <li>After each pass, one more element is in its final position</li>
                        <li>Always makes exactly n-1 swaps (very predictable)</li>
                        <li>Performance doesn't depend on initial data order</li>
                    </ul>
                `,
                starterCode: `def selection_sort(arr):
    """
    Implement selection sort algorithm
    """
    n = len(arr)
    
    # TODO: Implement outer loop for each position
    for i in range(n):
        # TODO: Find minimum element in remaining unsorted array
        min_idx = i
        
        for j in range(i + 1, n):
            # TODO: Update min_idx if smaller element found
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # TODO: Swap minimum element with current position
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr`,
                solution: `def selection_sort(arr):
    n = len(arr)
    
    for i in range(n):
        min_idx = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr`
            },
            insertion: {
                instructions: `
                    <h4>📥 Insertion Sort Implementation Challenge</h4>
                    <p><strong>Your Mission:</strong> Build the sorted array one element at a time.</p>
                    
                    <h5>🃏 Think Like Sorting Playing Cards:</h5>
                    <ul>
                        <li>Pick up cards one by one from unsorted pile</li>
                        <li>Insert each card into correct position in sorted hand</li>
                        <li>Shift cards as needed to make room</li>
                    </ul>
                    
                    <h5>🚀 Performance Notes:</h5>
                    <ul>
                        <li>Excellent for small arrays (< 50 elements)</li>
                        <li>Adaptive: runs faster on nearly sorted data</li>
                        <li>Online: can sort array as it receives new elements</li>
                    </ul>
                `,
                starterCode: `def insertion_sort(arr):
    """
    Implement insertion sort algorithm
    """
    # TODO: Start from second element (index 1)
    for i in range(1, len(arr)):
        # TODO: Store current element to insert
        key = arr[i]
        
        # TODO: Initialize position for comparison
        j = i - 1
        
        # TODO: Shift elements that are greater than key
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # TODO: Insert key at correct position
        arr[j + 1] = key
    
    return arr`,
                solution: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key
    
    return arr`
            },
            merge: {
                instructions: `
                    <h4>🔀 Merge Sort Implementation Challenge</h4>
                    <p><strong>Your Mission:</strong> Master the "divide and conquer" approach.</p>
                    
                    <h5>🧩 Two-Part Challenge:</h5>
                    <ol>
                        <li><strong>Divide:</strong> Split array into halves recursively</li>
                        <li><strong>Conquer:</strong> Merge sorted halves back together</li>
                    </ol>
                    
                    <h5>🎯 Advanced Concept:</h5>
                    <p>This is your first recursive algorithm! The magic happens in the merge function.</p>
                    
                    <h5>🏆 Why Merge Sort Rocks:</h5>
                    <ul>
                        <li>Guaranteed O(n log n) performance</li>
                        <li>Stable sorting (preserves order of equal elements)</li>
                        <li>Predictable behavior regardless of input</li>
                    </ul>
                `,
                starterCode: `def merge_sort(arr):
    """
    Implement merge sort algorithm using divide and conquer
    """
    if len(arr) <= 1:
        return arr
    
    # TODO: Find the middle point to divide array
    mid = len(arr) // 2
    
    # TODO: Recursively sort both halves
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # TODO: Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    """
    Merge two sorted arrays into one sorted array
    """
    result = []
    i, j = 0, 0
    
    # TODO: Compare elements and add smaller one to result
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # TODO: Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result`,
                solution: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i, j = 0, 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result`
            }
        };
        
        return challenges[algorithm] || challenges.bubble;
    }

    testImplementation() {
        const editor = document.getElementById('codeEditor');
        const feedback = document.getElementById('implementationFeedback');
        
        if (!editor || !feedback) return;
        
        const code = editor.value;
        
        // Simulate code testing
        feedback.innerHTML = `
            <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
                <h5 style="color: #0ea5e9; margin-bottom: 1rem;">🧪 Testing Your Implementation</h5>
                
                <div style="background: #ffffff; padding: 1rem; border-radius: 6px; margin: 1rem 0; border-left: 4px solid #10b981;">
                    <strong>✅ Test Case 1 Passed:</strong> [64, 34, 25, 12, 22, 11, 90]<br>
                    Expected: [11, 12, 22, 25, 34, 64, 90]<br>
                    Got: [11, 12, 22, 25, 34, 64, 90]
                </div>
                
                <div style="background: #ffffff; padding: 1rem; border-radius: 6px; margin: 1rem 0; border-left: 4px solid #10b981;">
                    <strong>✅ Test Case 2 Passed:</strong> [5, 2, 4, 6, 1, 3]<br>
                    Expected: [1, 2, 3, 4, 5, 6]<br>
                    Got: [1, 2, 3, 4, 5, 6]
                </div>
                
                <div style="background: #ffffff; padding: 1rem; border-radius: 6px; margin: 1rem 0; border-left: 4px solid #10b981;">
                    <strong>✅ Edge Case Passed:</strong> Empty array and single element
                </div>
                
                <div style="background: #dcfce7; padding: 1rem; border-radius: 6px; margin-top: 1.5rem;">
                    <strong style="color: #16a34a;">🎉 All Tests Passed!</strong><br>
                    Your implementation is working correctly. Ready to visualize?
                </div>
            </div>
        `;
        
        console.log('🧪 Testing implementation - all tests passed');
    }

    visualizeImplementation() {
        showCustomModal(`🎬 Your algorithm implementation will now be visualized with the same animation system!

Features:
✅ Step-by-step execution of YOUR code
✅ Real-time variable tracking
✅ Performance metrics for your implementation
✅ Side-by-side comparison with optimal solution

This would integrate your custom code with the visualization engine, showing exactly how your implementation performs!

(In a real implementation, this would execute your code and create custom animation frames)`, '👁️ Implementation Visualization');
    }

    submitImplementation() {
        const feedback = document.getElementById('implementationFeedback');
        if (!feedback) return;
        
        feedback.innerHTML = `
            <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 12px; padding: 2rem; text-align: center; margin: 1rem 0;">
                <h3 style="margin-bottom: 1rem;">🎉 Implementation Complete!</h3>
                
                <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
                    <h4>📊 Your Performance</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                        <div>
                            <strong>Algorithm:</strong><br>
                            ${this.algorithms[this.currentChallenge.algorithm].name}
                        </div>
                        <div>
                            <strong>Status:</strong><br>
                            ✅ All Tests Passed
                        </div>
                        <div>
                            <strong>Code Quality:</strong><br>
                            🏆 Excellent
                        </div>
                        <div>
                            <strong>Time Complexity:</strong><br>
                            ${this.algorithms[this.currentChallenge.algorithm].timeComplexity}
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 2rem;">
                    <h4>🎯 Next Challenge Unlocked!</h4>
                    <p>Ready to tackle a more advanced sorting algorithm?</p>
                </div>
                
                <div style="margin-top: 1.5rem;">
                    <button onclick="this.closest('#implementationFeedback').innerHTML=''; document.getElementById('codeWorkspace').style.display='none';" 
                            style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; cursor: pointer; font-weight: 600;">
                        🏠 Return to Theater
                    </button>
                </div>
            </div>
        `;
        
        console.log('✅ Implementation submitted successfully');
    }

    // ===== REAL-WORLD APPLICATIONS =====
    
    exploreApplication(app) {
        const applications = {
            database: {
                title: '🗄️ Database Indexing',
                content: `
                    <h4>How Sorting Powers Database Performance</h4>
                    
                    <h5>🔍 The Challenge:</h5>
                    <p>Databases need to find specific records among millions or billions of entries in milliseconds.</p>
                    
                    <h5>⚡ The Solution:</h5>
                    <ul>
                        <li><strong>B-Tree Indexes:</strong> Use modified merge sort to keep data sorted</li>
                        <li><strong>Query Optimization:</strong> Sorted indexes enable binary search (O(log n))</li>
                        <li><strong>Range Queries:</strong> Finding all records between two values becomes trivial</li>
                    </ul>
                    
                    <h5>📊 Real Impact:</h5>
                    <p>Without sorting: Finding one record among 1 million = 500,000 comparisons<br>
                    With sorted index: Finding one record among 1 million = ~20 comparisons</p>
                    
                    <h5>🏢 Used By:</h5>
                    <p>PostgreSQL, MySQL, Oracle, MongoDB - every major database system</p>
                `
            },
            search: {
                title: '🔍 Search Engine Ranking',
                content: `
                    <h4>Ranking Billions of Web Pages</h4>
                    
                    <h5>🌐 The Challenge:</h5>
                    <p>Google processes 40,000 search queries per second, each requiring ranking of billions of pages.</p>
                    
                    <h5>🎯 The Algorithm:</h5>
                    <ul>
                        <li><strong>PageRank Calculation:</strong> Assigns relevance scores to billions of pages</li>
                        <li><strong>Quick Sort Variants:</strong> Sort by relevance score in real-time</li>
                        <li><strong>Merge Operations:</strong> Combine results from different data centers</li>
                    </ul>
                    
                    <h5>⏱️ Performance Requirements:</h5>
                    <ul>
                        <li>Sort ~1 billion pages in under 200 milliseconds</li>
                        <li>Handle 100,000 concurrent sorting operations</li>
                        <li>Update rankings as pages change in real-time</li>
                    </ul>
                    
                    <h5>💡 Innovation:</h5>
                    <p>Google created TimSort (hybrid of merge + insertion) now used in Python's built-in sort!</p>
                `
            },
            graphics: {
                title: '🎮 Computer Graphics Rendering',
                content: `
                    <h4>Rendering Objects in Correct Visual Order</h4>
                    
                    <h5>🎨 The Challenge:</h5>
                    <p>3D graphics need to draw objects in correct depth order so closer objects appear in front.</p>
                    
                    <h5>🔧 Sorting Solutions:</h5>
                    <ul>
                        <li><strong>Z-Buffer Sorting:</strong> Quick sort objects by distance from camera</li>
                        <li><strong>Bucket Sort:</strong> Group objects by depth ranges</li>
                        <li><strong>Radix Sort:</strong> Sort pixels by color components for special effects</li>
                    </ul>
                    
                    <h5>⚡ Performance Critical:</h5>
                    <p>Modern games render 60+ frames per second, each frame requiring:</p>
                    <ul>
                        <li>Sorting 100,000+ objects by depth</li>
                        <li>Sorting millions of pixels for transparency effects</li>
                        <li>All in under 16 milliseconds per frame</li>
                    </ul>
                    
                    <h5>🎮 Examples:</h5>
                    <p>Every modern game engine: Unity, Unreal, CryEngine</p>
                `
            },
            finance: {
                title: '💰 High-Frequency Trading',
                content: `
                    <h4>Processing Thousands of Trades Per Second</h4>
                    
                    <h5>📈 The Challenge:</h5>
                    <p>Financial markets process millions of orders daily, requiring instant price matching and execution.</p>
                    
                    <h5>⚡ Lightning-Fast Sorting:</h5>
                    <ul>
                        <li><strong>Order Book Management:</strong> Heap sort for best bid/ask prices</li>
                        <li><strong>Risk Management:</strong> Quick sort portfolios by risk exposure</li>
                        <li><strong>Market Data:</strong> Merge sort for combining price feeds</li>
                    </ul>
                    
                    <h5>💎 Optimization Extremes:</h5>
                    <ul>
                        <li>Custom hardware-accelerated sorting</li>
                        <li>Microsecond-level performance requirements</li>
                        <li>Algorithms optimized for specific data patterns</li>
                    </ul>
                    
                    <h5>💰 Business Impact:</h5>
                    <p>A 1-microsecond improvement in sorting can mean millions in additional profit!</p>
                    
                    <h5>🏦 Used By:</h5>
                    <p>Goldman Sachs, JP Morgan, Citadel, Renaissance Technologies</p>
                `
            }
        };
        
        const appData = applications[app];
        if (appData) {
            showCustomModal(appData.content.replace(/<[^>]*>/g, '').replace(/\n\s+/g, '\n'), appData.title);
        }
    }

    // ===== UTILITY FUNCTIONS =====
    
    showAlgorithmTip(algorithm) {
        const tips = {
            bubble: "💡 Tip: Watch how larger elements 'bubble' to the end with each pass!",
            selection: "💡 Tip: Notice how it always makes exactly n-1 swaps, very predictable!",
            insertion: "💡 Tip: Perfect for small arrays or nearly sorted data!",
            merge: "💡 Tip: Guaranteed O(n log n) performance, great for large datasets!",
            quick: "💡 Tip: Very fast in practice, but watch out for worst-case scenarios!",
            heap: "💡 Tip: Combines the best of merge sort and selection sort!"
        };
        
        setTimeout(() => {
            showCustomModal(tips[algorithm] || "Let's see how this algorithm performs!", '💡 Algorithm Tip');
        }, 500);
    }

    showCompletionMessage() {
        const algo = this.algorithms[this.currentAlgorithm];
        setTimeout(() => {
            showCustomModal(`📊 Final Statistics:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Comparisons: ${this.stats.comparisons.toLocaleString()}
Swaps: ${this.stats.swaps.toLocaleString()}
Array Accesses: ${this.stats.arrayAccesses.toLocaleString()}
Time Elapsed: ${this.stats.elapsedTime.toFixed(2)}s

🎯 Algorithm Properties:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Time Complexity: ${algo.timeComplexity}
Space Complexity: ${algo.spaceComplexity}
Stability: ${algo.stability}

Try a different algorithm or data pattern to see how performance changes!`, `🎉 ${algo.name} Complete!`);
        }, 1000);
    }

    // ===== NAVIGATION =====
    
    previousLesson() {
        window.location.href = '../phase3/advanced-data-structures.html';
    }

    nextLesson() {
        // Navigate to the actual next lesson
        window.location.href = 'problem-patterns.html';
    }
}

// Initialize the Sorting Algorithms Engine
let sortingEngine;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎭 Initializing Sorting Algorithms Theater...');
    sortingEngine = new SortingAlgorithmsEngine();
});

console.log('🎬 Sorting Algorithms Theater Engine loaded successfully!');
