// Problem Patterns & Recognition Engine - Complete Implementation
class ProblemPatternsEngine {
    constructor() {
        // Core state management
        this.currentPattern = null;
        this.quizScore = 0;
        this.totalQuestions = 3;
        this.answeredQuestions = new Set();
        this.certificationProgress = {
            patternLibraryComplete: true,
            detectiveTrainingScore: 0,
            practiceProblemsCompleted: 0,
            certificationEligible: false
        };
        
        // Pattern definitions with comprehensive data
        this.patterns = {
            'two-pointers': {
                name: '👆 Two Pointers',
                description: 'Use two pointers moving toward each other or in the same direction to solve problems efficiently.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                frequency: '25%',
                keywords: ['Sorted Array', 'Target Sum', 'Palindrome', 'Remove Duplicates'],
                visualization: this.createTwoPointersVisualization,
                problems: [
                    'Two Sum II (sorted array)',
                    'Valid Palindrome', 
                    'Container With Most Water',
                    'Remove Duplicates from Sorted Array',
                    '3Sum',
                    'Trapping Rain Water'
                ],
                indicators: [
                    'Problem mentions sorted array',
                    'Looking for pairs/triplets that sum to target',
                    'Need to check palindrome properties',
                    'Removing elements from sorted structure',
                    'Finding optimal pairs in array'
                ]
            },
            'sliding-window': {
                name: '🪟 Sliding Window',
                description: 'Maintain a sliding window over data to find optimal subarrays or substrings efficiently.',
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(k)',
                frequency: '20%',
                keywords: ['Maximum/Minimum', 'Subarray Sum', 'Substring', 'Fixed/Variable Size'],
                visualization: this.createSlidingWindowVisualization,
                problems: [
                    'Longest Substring Without Repeating Characters',
                    'Maximum Sum Subarray of Size K',
                    'Minimum Window Substring',
                    'Longest Repeating Character Replacement',
                    'Permutation in String',
                    'Sliding Window Maximum'
                ],
                indicators: [
                    'Find longest/shortest substring',
                    'Subarray with specific property',
                    'Window of fixed or variable size',
                    'Contiguous elements',
                    'Optimize over all possible subarrays'
                ]
            },
            'binary-search': {
                name: '🔍 Binary Search',
                description: 'Eliminate half of the search space in each iteration to find elements or boundaries efficiently.',
                timeComplexity: 'O(log n)',
                spaceComplexity: 'O(1)',
                frequency: '15%',
                keywords: ['Sorted Data', 'Search Target', 'Find Boundary', 'Peak/Valley'],
                visualization: this.createBinarySearchVisualization,
                problems: [
                    'Search in Rotated Sorted Array',
                    'Find Peak Element',
                    'Search for a Range',
                    'Find Minimum in Rotated Sorted Array',
                    'Search Insert Position',
                    'Find First and Last Position'
                ],
                indicators: [
                    'Sorted or partially sorted array',
                    'Search for specific element',
                    'Find insertion point',
                    'Logarithmic time requirement',
                    'Find peak/valley/boundary'
                ]
            },
            'graph-traversal': {
                name: '🌊 BFS/DFS Traversal',
                description: 'Systematically explore graphs and trees using breadth-first or depth-first strategies.',
                timeComplexity: 'O(V + E)',
                spaceComplexity: 'O(V)',
                frequency: '15%',
                keywords: ['Trees', 'Graphs', 'Connected Components', 'Shortest Path'],
                visualization: this.createGraphTraversalVisualization,
                problems: [
                    'Number of Islands',
                    'Binary Tree Level Order Traversal',
                    'Course Schedule',
                    'Word Ladder',
                    'Clone Graph',
                    'Surrounded Regions'
                ],
                indicators: [
                    'Tree or graph structure',
                    'Find connected components',
                    'Level-by-level processing',
                    'Shortest path in unweighted graph',
                    'Explore all reachable nodes'
                ]
            },
            'dynamic-programming': {
                name: '🧮 Dynamic Programming',
                description: 'Break problems into smaller subproblems and build solutions from previously computed results.',
                timeComplexity: 'Various',
                spaceComplexity: 'O(n) to O(n²)',
                frequency: '10%',
                keywords: ['Optimal Solutions', 'Overlapping Subproblems', 'Memoization', 'Bottom-up'],
                visualization: this.createDynamicProgrammingVisualization,
                problems: [
                    'Climbing Stairs',
                    'House Robber',
                    'Longest Common Subsequence',
                    'Coin Change',
                    'Edit Distance',
                    'Maximum Subarray'
                ],
                indicators: [
                    'Find optimal solution',
                    'Count number of ways',
                    'Overlapping subproblems',
                    'Recursive structure with memoization',
                    'Build solution from smaller parts'
                ]
            }
        };
        
        // Quiz questions with detailed explanations
        this.quizQuestions = [
            {
                id: 1,
                title: 'Container With Most Water',
                description: 'You are given an array of heights representing vertical lines. Find two lines that together with the x-axis form a container that holds the most water.',
                example: 'Input: [1,8,6,2,5,4,8,3,7]\nOutput: 49 (lines at indices 1 and 8)',
                correctAnswer: 'two-pointers',
                options: ['two-pointers', 'sliding-window', 'binary-search', 'graph-traversal'],
                explanation: {
                    why: 'Two Pointers is optimal because we need to find the maximum area between two lines. Starting with pointers at both ends and moving the shorter line inward ensures we don\'t miss the optimal solution.',
                    approach: [
                        'Place one pointer at the beginning, one at the end',
                        'Calculate area: min(height[left], height[right]) × (right - left)',
                        'Move the pointer with the smaller height inward',
                        'Track the maximum area found'
                    ],
                    complexity: {
                        time: 'O(n) - Single pass through array',
                        space: 'O(1) - Only using two pointers'
                    }
                }
            },
            {
                id: 2,
                title: 'Longest Substring Without Repeating Characters',
                description: 'Given a string, find the length of the longest substring without repeating characters.',
                example: 'Input: "abcabcbb"\nOutput: 3 (substring "abc")',
                correctAnswer: 'sliding-window',
                options: ['two-pointers', 'sliding-window', 'binary-search', 'dynamic-programming'],
                explanation: {
                    why: 'Sliding Window is perfect because we need to find the longest valid substring, which requires expanding and contracting a window based on the duplicate constraint.',
                    approach: [
                        'Use a hashmap to track character positions',
                        'Expand window by moving right pointer',
                        'When duplicate found, shrink window from left',
                        'Track maximum window size encountered'
                    ],
                    complexity: {
                        time: 'O(n) - Each character visited at most twice',
                        space: 'O(min(m,n)) - Size of character set'
                    }
                }
            },
            {
                id: 3,
                title: 'Search in Rotated Sorted Array',
                description: 'You are given a sorted array that has been rotated at some pivot. Search for a target value in O(log n) time.',
                example: 'Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4 (index of target)',
                correctAnswer: 'binary-search',
                options: ['two-pointers', 'sliding-window', 'binary-search', 'graph-traversal'],
                explanation: {
                    why: 'Binary Search handles rotation elegantly. Even though the array is rotated, we can still eliminate half the search space by identifying which half is properly sorted.',
                    approach: [
                        'Compare middle element with left and right bounds',
                        'Determine which half is properly sorted',
                        'Check if target lies in the sorted half',
                        'Eliminate the half that doesn\'t contain target'
                    ],
                    complexity: {
                        time: 'O(log n) - Binary search behavior maintained',
                        space: 'O(1) - No extra space needed'
                    }
                }
            }
        ];
        
        // Practice problems organized by difficulty
        this.practiceProblems = {
            easy: [
                {
                    id: 'two-sum',
                    title: '1. Two Sum',
                    pattern: 'Hash Map',
                    description: 'Find two numbers in an array that add up to a target sum.',
                    difficulty: 'Easy',
                    submissions: '2.1M',
                    solution: this.getTwoSumSolution
                },
                {
                    id: 'valid-palindrome',
                    title: '125. Valid Palindrome',
                    pattern: 'Two Pointers',
                    description: 'Check if a string is a palindrome, ignoring non-alphanumeric characters.',
                    difficulty: 'Easy',
                    submissions: '1.8M',
                    solution: this.getValidPalindromeSolution
                },
                {
                    id: 'best-time-stock',
                    title: '121. Best Time to Buy and Sell Stock',
                    pattern: 'One Pass',
                    description: 'Find the maximum profit from buying and selling a stock once.',
                    difficulty: 'Easy',
                    submissions: '2.3M',
                    solution: this.getBestTimeStockSolution
                }
            ],
            medium: [
                {
                    id: 'longest-substring',
                    title: '3. Longest Substring Without Repeating Characters',
                    pattern: 'Sliding Window',
                    description: 'Find the length of the longest substring without repeating characters.',
                    difficulty: 'Medium',
                    submissions: '3.5M',
                    solution: this.getLongestSubstringSolution
                },
                {
                    id: 'container-water',
                    title: '11. Container With Most Water',
                    pattern: 'Two Pointers',
                    description: 'Find two lines that form a container holding the most water.',
                    difficulty: 'Medium',
                    submissions: '1.9M',
                    solution: this.getContainerWaterSolution
                },
                {
                    id: 'search-rotated',
                    title: '33. Search in Rotated Sorted Array',
                    pattern: 'Modified Binary Search',
                    description: 'Search for a target in a rotated sorted array in O(log n) time.',
                    difficulty: 'Medium',
                    submissions: '1.4M',
                    solution: this.getSearchRotatedSolution
                }
            ],
            hard: [
                {
                    id: 'median-arrays',
                    title: '4. Median of Two Sorted Arrays',
                    pattern: 'Binary Search on Answer',
                    description: 'Find the median of two sorted arrays in O(log(min(m,n))) time.',
                    difficulty: 'Hard',
                    submissions: '1.1M',
                    solution: this.getMedianArraysSolution
                },
                {
                    id: 'sliding-window-maximum',
                    title: '239. Sliding Window Maximum',
                    pattern: 'Deque + Sliding Window',
                    description: 'Find the maximum in each sliding window of size k.',
                    difficulty: 'Hard',
                    submissions: '789K',
                    solution: this.getSlidingWindowMaxSolution
                }
            ]
        };
        
        this.init();
    }

    init() {
        console.log('🧠 Problem Patterns Engine initializing...');
        this.setupGlobalFunctions();
        this.setupEventListeners();
        this.initializePatternVisualizations();
        this.updateQuizScore();
        console.log('✅ Pattern Recognition Engine ready!');
    }

    setupGlobalFunctions() {
        // Pattern exploration functions
        window.explorePattern = (pattern) => this.explorePattern(pattern);
        
        // Quiz functions
        window.selectAnswer = (questionId, answer) => this.selectAnswer(questionId, answer);
        
        // Classifier functions
        window.classifyProblem = () => this.classifyProblem();
        window.loadExample = () => this.loadExample();
        window.clearClassifier = () => this.clearClassifier();
        
        // Practice arena functions
        window.selectDifficulty = (difficulty) => this.selectDifficulty(difficulty);
        window.startProblem = (problemId) => this.startProblem(problemId);
        
        // Certification functions
        window.startCertification = () => this.startCertification();
        
        // Navigation functions
        window.previousLesson = () => this.previousLesson();
        window.nextLesson = () => this.nextLesson();
        
        console.log('✅ Global functions registered for Pattern Recognition');
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.attachEventListeners();
        });
    }

    attachEventListeners() {
        // Pattern card hover effects
        document.querySelectorAll('.pattern-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animatePatternCard(card, 'enter');
            });
            card.addEventListener('mouseleave', () => {
                this.animatePatternCard(card, 'leave');
            });
        });
        
        // Problem input for classifier
        const problemInput = document.getElementById('problemInput');
        if (problemInput) {
            problemInput.addEventListener('input', () => {
                this.debounceClassification();
            });
        }
    }

    initializePatternVisualizations() {
        // Initialize all pattern visualizations
        Object.keys(this.patterns).forEach(patternKey => {
            const pattern = this.patterns[patternKey];
            if (pattern.visualization) {
                pattern.visualization.call(this, patternKey);
            }
        });
    }

    // ===== PATTERN EXPLORATION =====
    
    explorePattern(patternKey) {
        console.log(`🔍 Exploring pattern: ${patternKey}`);
        this.currentPattern = patternKey;
        const pattern = this.patterns[patternKey];
        
        if (!pattern) {
            console.error(`Pattern ${patternKey} not found`);
            return;
        }
        
        // Create detailed pattern modal
        this.showPatternModal(pattern, patternKey);
    }

    showPatternModal(pattern, patternKey) {
        const modal = this.createPatternModal(pattern, patternKey);
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Auto-close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closePatternModal(modal);
            }
        });
    }

    createPatternModal(pattern, patternKey) {
        const modal = document.createElement('div');
        modal.className = 'pattern-modal-overlay';
        
        modal.innerHTML = `
            <div class="pattern-modal">
                <div class="modal-header">
                    <h3>${pattern.name}</h3>
                    <button class="close-btn" onclick="this.closest('.pattern-modal-overlay').remove()">×</button>
                </div>
                
                <div class="modal-content">
                    <div class="pattern-overview">
                        <div class="pattern-description">
                            <p>${pattern.description}</p>
                        </div>
                        
                        <div class="pattern-stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">Frequency:</span>
                                <span class="stat-value frequency">${pattern.frequency} of problems</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Time:</span>
                                <span class="stat-value">${pattern.timeComplexity}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Space:</span>
                                <span class="stat-value">${pattern.spaceComplexity}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pattern-visualization-container">
                        <h4>🎯 How It Works</h4>
                        <div class="interactive-demo" id="demo-${patternKey}">
                            ${this.generatePatternDemo(patternKey)}
                        </div>
                    </div>
                    
                    <div class="pattern-indicators">
                        <h4>🔍 When to Use This Pattern</h4>
                        <ul class="indicator-list">
                            ${pattern.indicators.map(indicator => `<li>${indicator}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="pattern-problems">
                        <h4>💡 Classic Problems</h4>
                        <div class="problem-list">
                            ${pattern.problems.map(problem => `
                                <div class="problem-item">
                                    <span class="problem-name">${problem}</span>
                                    <button class="try-btn" onclick="this.showProblemHint('${problem}')">Try It</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="pattern-code-example">
                        <h4>💻 Code Template</h4>
                        <div class="code-template">
                            <pre><code>${this.getPatternTemplate(patternKey)}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return modal;
    }

    generatePatternDemo(patternKey) {
        switch (patternKey) {
            case 'two-pointers':
                return `
                    <div class="demo-container">
                        <div class="demo-array">
                            <div class="array-element" data-index="0">1</div>
                            <div class="array-element" data-index="1">2</div>
                            <div class="array-element" data-index="2">3</div>
                            <div class="array-element" data-index="3">4</div>
                            <div class="array-element" data-index="4">5</div>
                        </div>
                        <div class="pointers-container">
                            <div class="pointer left" id="leftPointer">L</div>
                            <div class="pointer right" id="rightPointer">R</div>
                        </div>
                        <div class="demo-controls">
                            <button onclick="patternsEngine.animateTwoPointers()" class="demo-btn">▶ Animate</button>
                            <button onclick="patternsEngine.resetTwoPointers()" class="demo-btn">🔄 Reset</button>
                        </div>
                        <div class="demo-explanation">
                            <p>Watch the pointers move toward each other, checking sums along the way!</p>
                        </div>
                    </div>
                `;
                
            case 'sliding-window':
                return `
                    <div class="demo-container">
                        <div class="demo-array">
                            <div class="array-element highlighted">1</div>
                            <div class="array-element highlighted">2</div>
                            <div class="array-element highlighted">3</div>
                            <div class="array-element">4</div>
                            <div class="array-element">5</div>
                        </div>
                        <div class="window-overlay" id="slidingWindow"></div>
                        <div class="demo-controls">
                            <button onclick="patternsEngine.animateSlidingWindow()" class="demo-btn">▶ Slide Window</button>
                            <button onclick="patternsEngine.resetSlidingWindow()" class="demo-btn">🔄 Reset</button>
                        </div>
                        <div class="demo-explanation">
                            <p>Window expands and contracts to find optimal subarray!</p>
                        </div>
                    </div>
                `;
                
            case 'binary-search':
                return `
                    <div class="demo-container">
                        <div class="demo-array">
                            <div class="array-element">1</div>
                            <div class="array-element">3</div>
                            <div class="array-element highlighted">5</div>
                            <div class="array-element">7</div>
                            <div class="array-element">9</div>
                        </div>
                        <div class="search-controls">
                            <input type="number" id="searchTarget" value="5" min="1" max="9">
                            <button onclick="patternsEngine.animateBinarySearch()" class="demo-btn">🔍 Search</button>
                        </div>
                        <div class="demo-explanation">
                            <p>Eliminate half the search space in each step!</p>
                        </div>
                    </div>
                `;
                
            default:
                return '<p>Interactive demo coming soon!</p>';
        }
    }

    getPatternTemplate(patternKey) {
        const templates = {
            'two-pointers': `def two_pointers_template(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return []  # Not found`,
            
            'sliding-window': `def sliding_window_template(arr, k):
    window_start = 0
    max_sum = 0
    window_sum = 0
    
    # Expand window
    for window_end in range(len(arr)):
        window_sum += arr[window_end]
        
        # Contract window if needed
        if window_end >= k - 1:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[window_start]
            window_start += 1
    
    return max_sum`,
            
            'binary-search': `def binary_search_template(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Not found`,
            
            'graph-traversal': `from collections import deque

def bfs_template(graph, start):
    visited = set()
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            result.append(node)
            
            for neighbor in graph[node]:
                if neighbor not in visited:
                    queue.append(neighbor)
    
    return result`,
            
            'dynamic-programming': `def dp_template(n):
    # Initialize DP table
    dp = [0] * (n + 1)
    
    # Base cases
    dp[0] = 1
    if n > 0:
        dp[1] = 1
    
    # Fill DP table
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]`
        };
        
        return templates[patternKey] || '# Template coming soon!';
    }

    // ===== PATTERN ANIMATIONS =====
    
    animateTwoPointers() {
        const leftPointer = document.getElementById('leftPointer');
        const rightPointer = document.getElementById('rightPointer');
        const elements = document.querySelectorAll('.demo-array .array-element');
        
        if (!leftPointer || !rightPointer) return;
        
        let left = 0;
        let right = elements.length - 1;
        
        const animate = () => {
            if (left >= right) {
                setTimeout(() => {
                    alert('🎯 Two pointers met! Pattern demonstration complete.');
                }, 500);
                return;
            }
            
            // Highlight current elements
            elements.forEach(el => el.classList.remove('comparing'));
            elements[left].classList.add('comparing');
            elements[right].classList.add('comparing');
            
            // Move pointers visually
            const leftPos = elements[left].getBoundingClientRect();
            const rightPos = elements[right].getBoundingClientRect();
            const container = document.querySelector('.demo-container').getBoundingClientRect();
            
            leftPointer.style.left = `${leftPos.left - container.left + 15}px`;
            rightPointer.style.left = `${rightPos.left - container.left + 15}px`;
            
            // Move to next positions
            left++;
            right--;
            
            setTimeout(animate, 1000);
        };
        
        animate();
    }

    resetTwoPointers() {
        const elements = document.querySelectorAll('.demo-array .array-element');
        elements.forEach(el => el.classList.remove('comparing'));
        
        const leftPointer = document.getElementById('leftPointer');
        const rightPointer = document.getElementById('rightPointer');
        
        if (leftPointer && rightPointer) {
            leftPointer.style.left = '15px';
            rightPointer.style.left = '215px';
        }
    }

    animateSlidingWindow() {
        const window = document.getElementById('slidingWindow');
        if (!window) return;
        
        let position = 0;
        const maxPosition = 2; // Can slide 2 positions
        
        const slide = () => {
            if (position > maxPosition) {
                alert('🪟 Sliding window found optimal subarray! Pattern complete.');
                return;
            }
            
            window.style.left = `${position * 52}px`; // 50px width + 2px gap
            position++;
            
            setTimeout(slide, 800);
        };
        
        slide();
    }

    resetSlidingWindow() {
        const window = document.getElementById('slidingWindow');
        if (window) {
            window.style.left = '0px';
        }
    }

    animateBinarySearch() {
        const target = parseInt(document.getElementById('searchTarget').value);
        const elements = document.querySelectorAll('.demo-array .array-element');
        const values = [1, 3, 5, 7, 9];
        
        let left = 0;
        let right = values.length - 1;
        
        const search = () => {
            if (left > right) {
                alert('🔍 Target not found! Binary search complete.');
                return;
            }
            
            const mid = Math.floor((left + right) / 2);
            
            // Clear previous highlights
            elements.forEach(el => el.classList.remove('comparing', 'found'));
            
            // Highlight current range
            for (let i = left; i <= right; i++) {
                elements[i].classList.add('comparing');
            }
            
            // Highlight middle element
            elements[mid].classList.add('found');
            
            setTimeout(() => {
                if (values[mid] === target) {
                    alert(`🎯 Found target ${target} at index ${mid}!`);
                    return;
                } else if (values[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
                
                setTimeout(search, 1000);
            }, 1000);
        };
        
        search();
    }

    // ===== QUIZ FUNCTIONALITY =====
    
    selectAnswer(questionId, selectedAnswer) {
        console.log(`📝 Question ${questionId} answered: ${selectedAnswer}`);
        
        if (this.answeredQuestions.has(questionId)) {
            alert('⚠️ You have already answered this question!');
            return;
        }
        
        const question = this.quizQuestions.find(q => q.id === questionId);
        if (!question) {
            console.error(`Question ${questionId} not found`);
            return;
        }
        
        // Mark question as answered
        this.answeredQuestions.add(questionId);
        
        // Update button states
        const options = document.querySelectorAll(`[data-problem="${questionId}"] .pattern-option`);
        options.forEach(option => {
            option.onclick = null; // Disable further clicks
            
            if (option.textContent.includes(selectedAnswer)) {
                if (selectedAnswer === question.correctAnswer) {
                    option.classList.add('correct');
                    this.quizScore++;
                } else {
                    option.classList.add('incorrect');
                }
            } else if (option.textContent.includes(question.correctAnswer)) {
                option.classList.add('correct');
            }
        });
        
        // Show explanation
        this.showQuestionExplanation(questionId, selectedAnswer === question.correctAnswer);
        
        // Update score
        this.updateQuizScore();
        
        // Check certification eligibility
        this.updateCertificationProgress();
    }

    showQuestionExplanation(questionId, isCorrect) {
        const question = this.quizQuestions.find(q => q.id === questionId);
        const explanation = document.getElementById(`explanation-${questionId}`);
        
        if (!explanation || !question) return;
        
        explanation.style.display = 'block';
        explanation.innerHTML = `
            <div class="explanation-content">
                <h6>${isCorrect ? '✅ Correct!' : '❌ Incorrect, but great try!'} ${question.explanation.why}</h6>
                
                <div class="solution-approach">
                    <h6>🎯 Solution Approach:</h6>
                    <ol>
                        ${question.explanation.approach.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                
                <div class="complexity-analysis">
                    <div class="complexity-item">
                        <strong>Time Complexity:</strong> ${question.explanation.complexity.time}
                    </div>
                    <div class="complexity-item">
                        <strong>Space Complexity:</strong> ${question.explanation.complexity.space}
                    </div>
                </div>
                
                <div class="explanation-footer">
                    <p>💡 <strong>Key Insight:</strong> Pattern recognition is about identifying the underlying structure of the problem, not just memorizing solutions!</p>
                </div>
            </div>
        `;
        
        // Smooth scroll to explanation
        explanation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    updateQuizScore() {
        const scoreElement = document.getElementById('currentScore');
        const totalElement = document.getElementById('totalProblems');
        const feedbackElement = document.getElementById('scoreFeedback');
        
        if (scoreElement) scoreElement.textContent = this.quizScore;
        if (totalElement) totalElement.textContent = this.totalQuestions;
        
        if (feedbackElement) {
            const percentage = Math.round((this.quizScore / this.totalQuestions) * 100);
            let feedback = '';
            
            if (percentage >= 80) {
                feedback = `🏆 Excellent! ${percentage}% - You have strong pattern recognition skills!`;
            } else if (percentage >= 60) {
                feedback = `👍 Good work! ${percentage}% - You're getting the hang of pattern recognition!`;
            } else if (percentage >= 40) {
                feedback = `📚 Keep learning! ${percentage}% - Pattern recognition takes practice!`;
            } else {
                feedback = `💪 Don't give up! ${percentage}% - Review the patterns and try again!`;
            }
            
            feedbackElement.textContent = feedback;
        }
        
        console.log(`📊 Quiz score updated: ${this.quizScore}/${this.totalQuestions}`);
    }

    // ===== PROBLEM CLASSIFIER =====
    
    classifyProblem() {
        const input = document.getElementById('problemInput');
        const results = document.getElementById('analysisResults');
        
        if (!input || !results) {
            console.error('Classifier elements not found');
            return;
        }
        
        const problemText = input.value.trim();
        if (!problemText) {
            alert('Please enter a problem description first!');
            return;
        }
        
        console.log('🤖 Analyzing problem...');
        
        // Show loading state
        results.style.display = 'block';
        results.innerHTML = `
            <div class="analysis-loading">
                <div class="loading-spinner"></div>
                <p>🧠 Analyzing problem patterns...</p>
            </div>
        `;
        
        // Simulate AI analysis with realistic delay
        setTimeout(() => {
            const analysis = this.analyzeProbleMText(problemText);
            this.displayAnalysisResults(analysis);
        }, 2000);
    }

    analyzeProbleMText(text) {
        const analysis = {
            patterns: [],
            primaryPattern: null,
            confidence: 0,
            approach: '',
            complexity: { time: '', space: '' },
            similarProblems: []
        };
        
        const textLower = text.toLowerCase();
        
        // Pattern detection logic
        const patternScores = {};
        
        // Two Pointers indicators
        let twoPointersScore = 0;
        if (textLower.includes('sorted array')) twoPointersScore += 3;
        if (textLower.includes('two sum') || textLower.includes('target sum')) twoPointersScore += 3;
        if (textLower.includes('palindrome')) twoPointersScore += 3;
        if (textLower.includes('remove duplicates')) twoPointersScore += 2;
        if (textLower.includes('container') && textLower.includes('water')) twoPointersScore += 3;
        patternScores['two-pointers'] = twoPointersScore;
        
        // Sliding Window indicators
        let slidingWindowScore = 0;
        if (textLower.includes('substring')) slidingWindowScore += 3;
        if (textLower.includes('subarray')) slidingWindowScore += 3;
        if (textLower.includes('longest') || textLower.includes('maximum') || textLower.includes('minimum')) slidingWindowScore += 2;
        if (textLower.includes('window') || textLower.includes('k size')) slidingWindowScore += 3;
        if (textLower.includes('repeating characters')) slidingWindowScore += 3;
        patternScores['sliding-window'] = slidingWindowScore;
        
        // Binary Search indicators
        let binarySearchScore = 0;
        if (textLower.includes('sorted') && textLower.includes('search')) binarySearchScore += 3;
        if (textLower.includes('rotated')) binarySearchScore += 2;
        if (textLower.includes('log n') || textLower.includes('logarithmic')) binarySearchScore += 3;
        if (textLower.includes('find peak') || textLower.includes('find minimum')) binarySearchScore += 2;
        patternScores['binary-search'] = binarySearchScore;
        
        // Graph Traversal indicators
        let graphScore = 0;
        if (textLower.includes('tree') || textLower.includes('graph')) graphScore += 3;
        if (textLower.includes('nodes') && textLower.includes('edges')) graphScore += 3;
        if (textLower.includes('connected') || textLower.includes('island')) graphScore += 3;
        if (textLower.includes('bfs') || textLower.includes('dfs')) graphScore += 3;
        if (textLower.includes('shortest path')) graphScore += 3;
        patternScores['graph-traversal'] = graphScore;
        
        // Dynamic Programming indicators
        let dpScore = 0;
        if (textLower.includes('optimal') || textLower.includes('maximum') || textLower.includes('minimum')) dpScore += 1;
        if (textLower.includes('count') && textLower.includes('ways')) dpScore += 2;
        if (textLower.includes('subsequence') || textLower.includes('subset')) dpScore += 2;
        if (textLower.includes('coin change') || textLower.includes('climbing stairs')) dpScore += 3;
        if (textLower.includes('overlapping') || textLower.includes('subproblem')) dpScore += 3;
        patternScores['dynamic-programming'] = dpScore;
        
        // Determine primary pattern
        const maxScore = Math.max(...Object.values(patternScores));
        if (maxScore > 0) {
            const primaryPatternKey = Object.keys(patternScores).find(key => patternScores[key] === maxScore);
            analysis.primaryPattern = this.patterns[primaryPatternKey];
            analysis.confidence = Math.min(95, maxScore * 20 + 10); // Convert to percentage
            
            // Add patterns with significant scores
            Object.entries(patternScores).forEach(([key, score]) => {
                if (score >= 2) {
                    analysis.patterns.push({
                        name: this.patterns[key].name,
                        confidence: Math.min(95, score * 20 + 10)
                    });
                }
            });
            
            // Generate approach description
            analysis.approach = this.generateApproachDescription(primaryPatternKey, textLower);
            analysis.complexity = {
                time: this.patterns[primaryPatternKey].timeComplexity,
                space: this.patterns[primaryPatternKey].spaceComplexity
            };
            
            // Find similar problems
            analysis.similarProblems = this.patterns[primaryPatternKey].problems.slice(0, 3);
            
        } else {
            // Fallback for unrecognized patterns
            analysis.patterns.push({ name: '🤔 Pattern Not Clear', confidence: 50 });
            analysis.approach = 'This problem might require a combination of techniques or a less common pattern. Consider breaking it down into smaller subproblems.';
            analysis.complexity = { time: 'Varies', space: 'Varies' };
            analysis.similarProblems = ['Try simplifying the problem', 'Look for hidden patterns', 'Consider brute force first'];
        }
        
        return analysis;
    }

    generateApproachDescription(patternKey, problemText) {
        const approaches = {
            'two-pointers': 'Use two pointers starting from opposite ends (or same end) of the array. Move pointers based on the comparison of their values or sum. This approach works well when you need to find pairs or when the array is sorted.',
            
            'sliding-window': 'Maintain a sliding window that expands and contracts based on the problem constraints. Keep track of window properties (sum, characters, etc.) and update the optimal result as the window slides. Great for subarray/substring problems.',
            
            'binary-search': 'Since the data has some sorted property, use binary search to eliminate half the search space in each iteration. Look for the condition that helps you decide which half to keep searching.',
            
            'graph-traversal': 'Model the problem as a graph or tree. Use BFS for shortest path or level-order processing, DFS for exhaustive search or backtracking. Consider the relationship between elements as edges.',
            
            'dynamic-programming': 'Identify overlapping subproblems and optimal substructure. Build the solution bottom-up using previously computed results, or use memoization for top-down approach.'
        };
        
        return approaches[patternKey] || 'Analyze the problem structure and constraints to determine the most suitable algorithmic approach.';
    }

    displayAnalysisResults(analysis) {
        const results = document.getElementById('analysisResults');
        if (!results) return;
        
        results.innerHTML = `
            <div class="analysis-header">
                <h5>🎯 Pattern Analysis Results</h5>
                ${analysis.confidence > 0 ? `<div class="confidence-score">Confidence: ${analysis.confidence}%</div>` : ''}
            </div>
            
            <div class="detected-patterns">
                <h6>🔍 Detected Patterns:</h6>
                <div class="pattern-tags">
                    ${analysis.patterns.map(pattern => `
                        <span class="pattern-tag" style="opacity: ${pattern.confidence / 100}">
                            ${pattern.name} (${pattern.confidence}%)
                        </span>
                    `).join('')}
                </div>
            </div>
            
            <div class="recommended-approach">
                <h6>⚡ Recommended Approach:</h6>
                <div class="approach-content">
                    <p>${analysis.approach}</p>
                </div>
            </div>
            
            <div class="complexity-analysis">
                <h6>📊 Expected Complexity:</h6>
                <div class="complexity-content">
                    <div class="complexity-item">
                        <strong>Time Complexity:</strong> <code>${analysis.complexity.time}</code>
                    </div>
                    <div class="complexity-item">
                        <strong>Space Complexity:</strong> <code>${analysis.complexity.space}</code>
                    </div>
                </div>
            </div>
            
            <div class="similar-problems">
                <h6>🎯 Similar Problems to Practice:</h6>
                <div class="similar-list">
                    ${analysis.similarProblems.map(problem => `
                        <div class="similar-problem">
                            <span class="problem-name">${problem}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="analysis-footer">
                <p>💡 <strong>Tip:</strong> Practice these similar problems to strengthen your pattern recognition skills!</p>
            </div>
        `;
    }

    loadExample() {
        const input = document.getElementById('problemInput');
        if (!input) return;
        
        const examples = [
            `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,

            `Given a string s, find the length of the longest substring without repeating characters.

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.`,

            `There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4`
        ];
        
        const randomExample = examples[Math.floor(Math.random() * examples.length)];
        input.value = randomExample;
        
        // Auto-classify after loading example
        setTimeout(() => {
            this.classifyProblem();
        }, 500);
    }

    clearClassifier() {
        const input = document.getElementById('problemInput');
        const results = document.getElementById('analysisResults');
        
        if (input) input.value = '';
        if (results) results.style.display = 'none';
    }

    debounceClassification() {
        clearTimeout(this.classificationTimeout);
        this.classificationTimeout = setTimeout(() => {
            // Auto-classify if input has substantial content
            const input = document.getElementById('problemInput');
            if (input && input.value.trim().length > 100) {
                this.classifyProblem();
            }
        }, 2000);
    }

    // ===== PRACTICE ARENA =====
    
    selectDifficulty(difficulty) {
        console.log(`🎯 Selected difficulty: ${difficulty}`);
        
        // Update tab states
        document.querySelectorAll('.difficulty-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Show corresponding problem set
        document.querySelectorAll('.problem-set').forEach(set => {
            set.classList.remove('active');
        });
        
        const targetSet = document.querySelector(`.problem-set.${difficulty}`);
        if (targetSet) {
            targetSet.classList.add('active');
        }
    }

    startProblem(problemId) {
        console.log(`🚀 Starting problem: ${problemId}`);
        
        // Find problem in all difficulty levels
        let problem = null;
        let difficulty = '';
        
        for (const [level, problems] of Object.entries(this.practiceProblems)) {
            const found = problems.find(p => p.id === problemId);
            if (found) {
                problem = found;
                difficulty = level;
                break;
            }
        }
        
        if (!problem) {
            console.error(`Problem ${problemId} not found`);
            return;
        }
        
        this.showProblemModal(problem, difficulty);
    }

    showProblemModal(problem, difficulty) {
        const modal = document.createElement('div');
        modal.className = 'problem-modal-overlay';
        
        modal.innerHTML = `
            <div class="problem-modal">
                <div class="modal-header">
                    <div class="problem-title">
                        <h3>${problem.title}</h3>
                        <div class="problem-badges">
                            <span class="difficulty-badge ${difficulty}">${problem.difficulty}</span>
                            <span class="pattern-badge">${problem.pattern}</span>
                        </div>
                    </div>
                    <button class="close-btn" onclick="this.closest('.problem-modal-overlay').remove()">×</button>
                </div>
                
                <div class="modal-content">
                    <div class="problem-description">
                        <p>${problem.description}</p>
                        <div class="problem-stats">
                            <span>✅ ${problem.submissions} submissions</span>
                            <span>🎯 Pattern: ${problem.pattern}</span>
                        </div>
                    </div>
                    
                    <div class="problem-solution-hint">
                        <h4>💡 Pattern Recognition Hint</h4>
                        <p>This problem uses the <strong>${problem.pattern}</strong> pattern. Think about how the pattern characteristics apply here!</p>
                        <button class="hint-btn" onclick="patternsEngine.showProblemHint('${problem.id}')">
                            Show Detailed Hint
                        </button>
                    </div>
                    
                    <div class="problem-actions">
                        <button class="action-btn primary" onclick="patternsEngine.solveProblem('${problem.id}')">
                            💻 Show Solution
                        </button>
                        <button class="action-btn secondary" onclick="patternsEngine.practiceSimilar('${problem.pattern}')">
                            🎯 Practice Similar
                        </button>
                        <button class="action-btn tertiary" onclick="this.closest('.problem-modal-overlay').remove()">
                            ← Back to Arena
                        </button>
                    </div>
                    
                    <div class="problem-progress">
                        <p>Problems completed in this session: <span id="sessionProgress">${this.certificationProgress.practiceProblemsCompleted}</span></p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    showProblemHint(problemId) {
        // This would show a detailed hint for the specific problem
        alert(`💡 Detailed Hint for ${problemId}:

Look for the key indicators that suggest which pattern to use:
• Check if the input has any special properties (sorted, etc.)
• Identify what you're optimizing for (time, space, etc.)  
• Consider the constraints and edge cases
• Think about how the pattern's core concept applies here

The key to pattern recognition is practice - the more problems you solve, the faster you'll recognize the patterns!`);
    }

    solveProblem(problemId) {
        // This would show the complete solution
        this.certificationProgress.practiceProblemsCompleted++;
        this.updateCertificationProgress();
        
        alert(`🏆 Problem Solved!

Great job working through the pattern recognition process! 

You've now completed ${this.certificationProgress.practiceProblemsCompleted} practice problems.

Keep practicing to build your pattern recognition speed and accuracy!`);
    }

    practiceSimilar(pattern) {
        alert(`🎯 Practice Similar Problems

Here are more problems that use the ${pattern} pattern:

• Study the pattern characteristics
• Identify the key indicators
• Practice the implementation
• Build pattern recognition speed

The more you practice, the faster you'll recognize when to apply each pattern!`);
    }

    // ===== CERTIFICATION SYSTEM =====
    
    updateCertificationProgress() {
        this.certificationProgress.detectiveTrainingScore = Math.round((this.quizScore / this.totalQuestions) * 100);
        
        // Check if eligible for certification
        const isEligible = (
            this.certificationProgress.detectiveTrainingScore >= 80 &&
            this.certificationProgress.practiceProblemsCompleted >= 5
        );
        
        this.certificationProgress.certificationEligible = isEligible;
        
        // Update UI
        const certBtn = document.querySelector('.cert-btn');
        if (certBtn) {
            certBtn.disabled = !isEligible;
            
            if (isEligible) {
                certBtn.textContent = '🎓 Start Certification Test';
                certBtn.style.background = 'linear-gradient(135deg, var(--success-color), #059669)';
            } else {
                certBtn.textContent = `🔒 Complete Requirements (${this.certificationProgress.detectiveTrainingScore}% quiz, ${this.certificationProgress.practiceProblemsCompleted}/5 problems)`;
            }
        }
        
        // Update progress items
        this.updateProgressItems();
    }

    updateProgressItems() {
        const progressItems = document.querySelectorAll('.progress-item');
        if (progressItems.length < 4) return;
        
        // Detective Training
        const detectiveItem = progressItems[1];
        if (this.certificationProgress.detectiveTrainingScore >= 80) {
            detectiveItem.classList.remove('current');
            detectiveItem.classList.add('completed'); 
            detectiveItem.querySelector('.progress-icon').textContent = '✅';
        }
        
        // Practice Arena
        const practiceItem = progressItems[2];
        if (this.certificationProgress.practiceProblemsCompleted >= 5) {
            practiceItem.classList.remove('locked');
            practiceItem.classList.add('completed');
            practiceItem.querySelector('.progress-icon').textContent = '✅';
        } else if (this.certificationProgress.practiceProblemsCompleted > 0) {
            practiceItem.classList.remove('locked');
            practiceItem.classList.add('current');
            practiceItem.querySelector('.progress-icon').textContent = '🔄';
        }
        
        // Certification Test
        const certItem = progressItems[3];
        if (this.certificationProgress.certificationEligible) {
            certItem.classList.remove('locked');
            certItem.classList.add('current');
            certItem.querySelector('.progress-icon').textContent = '🎓';
        }
    }

    startCertification() {
        if (!this.certificationProgress.certificationEligible) {
            alert('⚠️ Please complete the requirements first:\n• Score 80%+ on Detective Training\n• Complete 5+ Practice Problems');
            return;
        }
        
        alert(`🎓 Pattern Recognition Certification Test

You're about to take the comprehensive certification test!

Test Format:
• 20 diverse coding problems
• Pattern identification required
• 60 minutes time limit
• 85% passing score required

Are you ready to prove your pattern recognition mastery?`);
        
        // This would launch the actual certification test
        const proceed = confirm('Start the certification test now?');
        if (proceed) {
            alert('🚀 Certification test would launch here!\n\nThis would be a comprehensive test covering all 5 patterns with real LeetCode-style problems.');
        }
    }

    // ===== UTILITY FUNCTIONS =====
    
    animatePatternCard(card, action) {
        if (action === 'enter') {
            card.style.transform = 'translateY(-4px) scale(1.02)';
            card.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
        }
    }

    closePatternModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    // ===== NAVIGATION =====
    
    previousLesson() {
        window.location.href = 'sorting-algorithms.html';
    }

    nextLesson() {
        alert(`🚀 Coming Next: Time & Space Complexity Analysis

Master the final piece of algorithmic thinking:
⏱️ Big O Notation Deep Dive
📊 Space vs Time Trade-offs
🎯 Complexity Analysis Practice
📈 Algorithm Optimization Strategies
🧠 Interview-Ready Complexity Discussion

This lesson completes your algorithmic foundation, preparing you for Phase 5: LeetCode Mastery!

Ready to continue your journey to coding interview success?`);
    }
}

// Initialize the Problem Patterns Engine
let patternsEngine;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🧠 Initializing Problem Patterns Recognition Engine...');
    patternsEngine = new ProblemPatternsEngine();
});

// CSS for modal animations (add to your CSS file)
const modalStyles = `
.pattern-modal-overlay, .problem-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.pattern-modal-overlay.show, .problem-modal-overlay.show {
    opacity: 1;
}

.pattern-modal, .problem-modal {
    background: var(--bg-primary);
    border-radius: 16px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.9) translateY(20px);
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
}

.pattern-modal-overlay.show .pattern-modal,
.problem-modal-overlay.show .problem-modal {
    transform: scale(1) translateY(0);
}

.modal-header {
    padding: 2rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--text-secondary);
    transition: color 0.3s ease;
}

.close-btn:hover {
    color: var(--error-color);
}

.modal-content {
    padding: 2rem;
}

.confidence-score {
    background: var(--success-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: bold;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(59, 130, 246, 0.2);
    border-left-color: var(--accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.analysis-loading {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary);
}
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

console.log('🎯 Problem Patterns Recognition Engine loaded successfully!');
