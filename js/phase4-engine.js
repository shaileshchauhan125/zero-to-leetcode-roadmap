// Phase 4: Advanced Problem Solving Engine - Strategic Analysis System
class Phase4Engine {
    constructor() {
        // Problem pattern recognition system
        this.patternRecognizer = {
            patterns: new Map(),
            currentPattern: null,
            recognitionAccuracy: 0,
            trainingData: []
        };
        
        // Complexity analysis system
        this.complexityAnalyzer = {
            currentAlgorithm: null,
            analysisResults: {},
            comparisonData: [],
            optimizationSuggestions: []
        };
        
        // Optimization workshop
        this.optimizationWorkshop = {
            currentProblem: null,
            optimizationStages: ['analyze', 'identify', 'optimize', 'validate'],
            currentStage: 0,
            improvements: []
        };
        
        // Problem solver interface
        this.problemSolver = {
            currentProblem: null,
            solutionSteps: [],
            activeStep: 0,
            strategies: ['brute-force', 'optimize', 'pattern-match'],
            selectedStrategy: null
        };
        
        this.init();
    }

    init() {
        console.log('🎯 Phase 4 Advanced Problem Solving Engine initializing...');
        this.setupGlobalFunctions();
        this.setupEventListeners();
        this.initializePatterns();
        this.loadProblemDatabase();
        console.log('✅ Phase 4 Engine ready for advanced problem solving!');
    }

    setupGlobalFunctions() {
        // Pattern recognition functions
        window.recognizePattern = (problemText) => this.recognizePattern(problemText);
        window.trainPatternRecognizer = (pattern, examples) => this.trainPatternRecognizer(pattern, examples);
        window.selectPattern = (patternId) => this.selectPattern(patternId);
        window.analyzePatternMatch = (problemId) => this.analyzePatternMatch(problemId);
        
        // Complexity analysis functions
        window.analyzeComplexity = (algorithm, input) => this.analyzeComplexity(algorithm, input);
        window.compareComplexities = (alg1, alg2) => this.compareComplexities(alg1, alg2);
        window.visualizeComplexity = (algorithm) => this.visualizeComplexity(algorithm);
        window.calculateSpaceTime = (algorithm) => this.calculateSpaceTime(algorithm);
        
        // Optimization functions
        window.startOptimization = (problemId) => this.startOptimization(problemId);
        window.nextOptimizationStage = () => this.nextOptimizationStage();
        window.applyOptimization = (technique) => this.applyOptimization(technique);
        window.validateOptimization = () => this.validateOptimization();
        
        // Problem solving functions
        window.loadProblem = (problemId) => this.loadProblem(problemId);
        window.selectStrategy = (strategy) => this.selectStrategy(strategy);
        window.executeStep = (stepId) => this.executeStep(stepId);
        window.solveProblem = () => this.solveProblem();
        
        // Analysis functions
        window.generateAnalysisReport = () => this.generateAnalysisReport();
        window.exportOptimizations = () => this.exportOptimizations();
        
        console.log('✅ Phase 4 global functions registered');
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeUI();
            this.setupInteractiveElements();
        });
        
        // Pattern card interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.pattern-card')) {
                this.handlePatternCardClick(e.target.closest('.pattern-card'));
            }
        });
        
        // Strategy selection
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('strategy-selector')) {
                this.handleStrategyChange(e.target.value);
            }
        });
        
        // Optimization controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('optimization-btn')) {
                this.handleOptimizationButton(e.target);
            }
        });
    }

    initializePatterns() {
        // Initialize common problem patterns
        const patterns = [
            {
                id: 'two-pointers',
                name: 'Two Pointers',
                description: 'Use two pointers moving toward each other or in same direction',
                keywords: ['sorted array', 'pair sum', 'palindrome', 'remove duplicates'],
                examples: ['Two Sum II', 'Valid Palindrome', 'Container With Most Water'],
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(1)',
                difficulty: 'medium'
            },
            {
                id: 'sliding-window',
                name: 'Sliding Window',
                description: 'Maintain a window of elements and slide it through the array',
                keywords: ['substring', 'subarray', 'contiguous', 'maximum', 'minimum'],
                examples: ['Longest Substring Without Repeating Characters', 'Maximum Subarray'],
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(k)',
                difficulty: 'medium'
            },
            {
                id: 'dynamic-programming',
                name: 'Dynamic Programming',
                description: 'Break down problems into subproblems and store solutions',
                keywords: ['optimal', 'maximum', 'minimum', 'count ways', 'fibonacci'],
                examples: ['Climbing Stairs', 'Coin Change', 'Longest Common Subsequence'],
                timeComplexity: 'O(n²)',
                spaceComplexity: 'O(n)',
                difficulty: 'hard'
            },
            {
                id: 'backtracking',
                name: 'Backtracking',
                description: 'Explore all possible solutions and backtrack when needed',
                keywords: ['permutation', 'combination', 'subset', 'generate all'],
                examples: ['N-Queens', 'Generate Parentheses', 'Word Search'],
                timeComplexity: 'O(2ⁿ)',
                spaceComplexity: 'O(n)',
                difficulty: 'hard'
            },
            {
                id: 'binary-search',
                name: 'Binary Search',
                description: 'Divide search space in half repeatedly',
                keywords: ['sorted', 'search', 'find target', 'logarithmic'],
                examples: ['Search in Rotated Array', 'Find Peak Element'],
                timeComplexity: 'O(log n)',
                spaceComplexity: 'O(1)',
                difficulty: 'medium'
            }
        ];
        
        patterns.forEach(pattern => {
            this.patternRecognizer.patterns.set(pattern.id, pattern);
        });
    }

    loadProblemDatabase() {
        // Sample problems for analysis
        this.problemDatabase = [
            {
                id: 'two-sum',
                title: 'Two Sum',
                description: 'Given an array of integers nums and an integer target, return indices of two numbers that add up to target.',
                pattern: 'two-pointers',
                difficulty: 'easy',
                optimizations: ['hash-map', 'sorting']
            },
            {
                id: 'max-subarray',
                title: 'Maximum Subarray',
                description: 'Find the contiguous subarray with the largest sum.',
                pattern: 'sliding-window',
                difficulty: 'easy',
                optimizations: ['kadane-algorithm', 'divide-conquer']
            },
            {
                id: 'longest-palindrome',
                title: 'Longest Palindromic Substring',
                description: 'Given a string s, return the longest palindromic substring in s.',
                pattern: 'dynamic-programming',
                difficulty: 'medium',
                optimizations: ['expand-centers', 'manacher-algorithm']
            }
        ];
    }

    // ===== PATTERN RECOGNITION SYSTEM =====
    
    recognizePattern(problemText) {
        console.log('🔍 Analyzing problem for patterns...');
        
        const keywords = problemText.toLowerCase().split(/\s+/);
        const patternScores = new Map();
        
        // Score each pattern based on keyword matches
        this.patternRecognizer.patterns.forEach((pattern, id) => {
            let score = 0;
            
            pattern.keywords.forEach(keyword => {
                if (keywords.some(word => word.includes(keyword) || keyword.includes(word))) {
                    score += 1;
                }
            });
            
            if (score > 0) {
                patternScores.set(id, score);
            }
        });
        
        // Find best matching pattern
        let bestPattern = null;
        let bestScore = 0;
        
        patternScores.forEach((score, id) => {
            if (score > bestScore) {
                bestScore = score;
                bestPattern = id;
            }
        });
        
        if (bestPattern) {
            this.patternRecognizer.currentPattern = bestPattern;
            this.patternRecognizer.recognitionAccuracy = (bestScore / 5) * 100; // Normalize to percentage
            
            this.displayPatternRecognition(bestPattern, bestScore);
            return this.patternRecognizer.patterns.get(bestPattern);
        }
        
        return null;
    }

    displayPatternRecognition(patternId, confidence) {
        const pattern = this.patternRecognizer.patterns.get(patternId);
        const container = document.getElementById('patternRecognitionResult');
        
        if (container && pattern) {
            container.innerHTML = `
                <div class="pattern-match-result">
                    <div class="pattern-match-header">
                        <h4>🎯 Pattern Recognized: ${pattern.name}</h4>
                        <div class="confidence-score">Confidence: ${Math.round(confidence * 20)}%</div>
                    </div>
                    <div class="pattern-details">
                        <p><strong>Description:</strong> ${pattern.description}</p>
                        <p><strong>Time Complexity:</strong> ${pattern.timeComplexity}</p>
                        <p><strong>Space Complexity:</strong> ${pattern.spaceComplexity}</p>
                        <div class="pattern-examples">
                            <strong>Example Problems:</strong>
                            <ul>
                                ${pattern.examples.map(ex => `<li>${ex}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            
            this.animatePatternMatch(container);
        }
    }

    animatePatternMatch(container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.5s ease';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }

    selectPattern(patternId) {
        const pattern = this.patternRecognizer.patterns.get(patternId);
        if (!pattern) return;
        
        this.patternRecognizer.currentPattern = patternId;
        
        // Update UI to show selected pattern
        document.querySelectorAll('.pattern-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const selectedCard = document.querySelector(`[data-pattern="${patternId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.highlightPatternCard(selectedCard);
        }
        
        // Show pattern details
        this.showPatternImplementation(pattern);
    }

    showPatternImplementation(pattern) {
        const implementationContainer = document.getElementById('patternImplementation');
        if (!implementationContainer) return;
        
        const implementations = {
            'two-pointers': `
                def two_sum_sorted(nums, target):
                    left, right = 0, len(nums) - 1
                    
                    while left < right:
                        current_sum = nums[left] + nums[right]
                        if current_sum == target:
                            return [left, right]
                        elif current_sum < target:
                            left += 1
                        else:
                            right -= 1
                    
                    return []`,
            'sliding-window': `
                def max_subarray(nums):
                    max_sum = current_sum = nums[0]
                    
                    for num in nums[1:]:
                        current_sum = max(num, current_sum + num)
                        max_sum = max(max_sum, current_sum)
                    
                    return max_sum`,
            'dynamic-programming': `
                def longest_palindrome(s):
                    n = len(s)
                    dp = [[False] * n for _ in range(n)]
                    start, max_len = 0, 1
                    
                    # Every single character is palindrome
                    for i in range(n):
                        dp[i][i] = True
                    
                    # Check for palindromes of length 2
                    for i in range(n - 1):
                        if s[i] == s[i + 1]:
                            dp[i][i + 1] = True
                            start, max_len = i, 2
                    
                    # Check for palindromes of length 3 or more
                    for length in range(3, n + 1):
                        for i in range(n - length + 1):
                            j = i + length - 1
                            if s[i] == s[j] and dp[i + 1][j - 1]:
                                dp[i][j] = True
                                start, max_len = i, length
                    
                    return s[start:start + max_len]`
        };
        
        implementationContainer.innerHTML = `
            <div class="pattern-implementation">
                <h4>💻 ${pattern.name} Implementation</h4>
                <pre><code class="python">${implementations[pattern.id] || 'Implementation coming soon...'}</code></pre>
                <div class="complexity-analysis">
                    <div class="complexity-item">
                        <strong>Time:</strong> ${pattern.timeComplexity}
                    </div>
                    <div class="complexity-item">
                        <strong>Space:</strong> ${pattern.spaceComplexity}
                    </div>
                </div>
            </div>
        `;
    }

    highlightPatternCard(card) {
        // Add selection animation
        card.style.transform = 'scale(1.02)';
        card.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
        }, 300);
    }

    // ===== COMPLEXITY ANALYSIS SYSTEM =====
    
    analyzeComplexity(algorithm, inputSize = 1000) {
        console.log(`📊 Analyzing complexity for ${algorithm}`);
        
        const complexityData = this.calculateComplexityMetrics(algorithm, inputSize);
        this.complexityAnalyzer.analysisResults[algorithm] = complexityData;
        
        this.visualizeComplexityAnalysis(algorithm, complexityData);
        return complexityData;
    }

    calculateComplexityMetrics(algorithm, inputSize) {
        const complexityFunctions = {
            'O(1)': (n) => 1,
            'O(log n)': (n) => Math.log2(n),
            'O(n)': (n) => n,
            'O(n log n)': (n) => n * Math.log2(n),
            'O(n²)': (n) => n * n,
            'O(2ⁿ)': (n) => Math.pow(2, Math.min(n, 20)) // Cap for visualization
        };
        
        const algorithmComplexities = {
            'linear-search': 'O(n)',
            'binary-search': 'O(log n)',
            'bubble-sort': 'O(n²)',
            'merge-sort': 'O(n log n)',
            'quick-sort': 'O(n log n)',
            'fibonacci-recursive': 'O(2ⁿ)',
            'fibonacci-dp': 'O(n)',
            'hash-lookup': 'O(1)'
        };
        
        const complexity = algorithmComplexities[algorithm] || 'O(n)';
        const complexityFunction = complexityFunctions[complexity];
        
        const data = [];
        for (let n = 1; n <= inputSize; n *= 2) {
            data.push({
                input: n,
                operations: complexityFunction(n),
                complexity: complexity
            });
        }
        
        return {
            algorithm: algorithm,
            complexity: complexity,
            data: data,
            scalability: this.assessScalability(complexity),
            optimization: this.suggestOptimizations(algorithm, complexity)
        };
    }

    visualizeComplexityAnalysis(algorithm, data) {
        const canvas = document.getElementById('complexityChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        ctx.clearRect(0, 0, width, height);
        
        // Set up chart area
        const margin = 60;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;
        
        // Find max values for scaling
        const maxInput = Math.max(...data.data.map(d => d.input));
        const maxOps = Math.max(...data.data.map(d => d.operations));
        
        // Draw axes
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(margin, height - margin);
        ctx.lineTo(width - margin, height - margin);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, height - margin);
        ctx.stroke();
        
        // Draw complexity curve
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.data.forEach((point, index) => {
            const x = margin + (point.input / maxInput) * chartWidth;
            const y = height - margin - (point.operations / maxOps) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = '#3b82f6';
        data.data.forEach(point => {
            const x = margin + (point.input / maxInput) * chartWidth;
            const y = height - margin - (point.operations / maxOps) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw labels
        ctx.fillStyle = '#374151';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        
        // Title
        ctx.fillText(`${algorithm} - ${data.complexity}`, width / 2, 30);
        
        // X-axis label
        ctx.fillText('Input Size (n)', width / 2, height - 10);
        
        // Y-axis label
        ctx.save();
        ctx.translate(20, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Operations', 0, 0);
        ctx.restore();
    }

    compareComplexities(alg1, alg2) {
        console.log(`⚖️ Comparing ${alg1} vs ${alg2}`);
        
        const data1 = this.analyzeComplexity(alg1);
        const data2 = this.analyzeComplexity(alg2);
        
        this.displayComplexityComparison(data1, data2);
        
        return {
            algorithm1: data1,
            algorithm2: data2,
            recommendation: this.generateRecommendation(data1, data2)
        };
    }

    displayComplexityComparison(data1, data2) {
        const container = document.getElementById('complexityComparison');
        if (!container) return;
        
        container.innerHTML = `
            <div class="complexity-comparison">
                <div class="comparison-header">
                    <h4>⚖️ Algorithm Comparison</h4>
                </div>
                <div class="comparison-grid">
                    <div class="algorithm-comparison">
                        <h5>${data1.algorithm}</h5>
                        <div class="complexity-badge ${this.getComplexityClass(data1.complexity)}">
                            ${data1.complexity}
                        </div>
                        <div class="scalability-indicator">
                            Scalability: ${data1.scalability}
                        </div>
                    </div>
                    <div class="vs-indicator">VS</div>
                    <div class="algorithm-comparison">
                        <h5>${data2.algorithm}</h5>
                        <div class="complexity-badge ${this.getComplexityClass(data2.complexity)}">
                            ${data2.complexity}
                        </div>
                        <div class="scalability-indicator">
                            Scalability: ${data2.scalability}
                        </div>
                    </div>
                </div>
                <div class="comparison-recommendation">
                    ${this.generateRecommendation(data1, data2)}
                </div>
            </div>
        `;
    }

    getComplexityClass(complexity) {
        const classes = {
            'O(1)': 'excellent',
            'O(log n)': 'good',
            'O(n)': 'fair',
            'O(n log n)': 'acceptable',
            'O(n²)': 'poor',
            'O(2ⁿ)': 'terrible'
        };
        
        return classes[complexity] || 'unknown';
    }

    assessScalability(complexity) {
        const scalability = {
            'O(1)': 'Excellent - Constant time',
            'O(log n)': 'Very Good - Logarithmic growth',
            'O(n)': 'Good - Linear growth',
            'O(n log n)': 'Fair - Slightly worse than linear',
            'O(n²)': 'Poor - Quadratic growth',
            'O(2ⁿ)': 'Terrible - Exponential growth'
        };
        
        return scalability[complexity] || 'Unknown';
    }

    suggestOptimizations(algorithm, complexity) {
        const optimizations = {
            'bubble-sort': ['Use merge sort or quick sort for O(n log n)', 'Implement early termination'],
            'linear-search': ['Use binary search if array is sorted', 'Use hash table for O(1) lookup'],
            'fibonacci-recursive': ['Use dynamic programming', 'Use iterative approach', 'Use memoization']
        };
        
        return optimizations[algorithm] || ['Consider algorithm-specific optimizations'];
    }

    generateRecommendation(data1, data2) {
        const complexityOrder = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'];
        
        const index1 = complexityOrder.indexOf(data1.complexity);
        const index2 = complexityOrder.indexOf(data2.complexity);
        
        if (index1 < index2) {
            return `🏆 ${data1.algorithm} is more efficient with ${data1.complexity} complexity`;
        } else if (index2 < index1) {
            return `🏆 ${data2.algorithm} is more efficient with ${data2.complexity} complexity`;
        } else {
            return `⚖️ Both algorithms have similar ${data1.complexity} complexity`;
        }
    }

    // ===== OPTIMIZATION WORKSHOP =====
    
    startOptimization(problemId) {
        console.log(`🔧 Starting optimization for problem: ${problemId}`);
        
        const problem = this.problemDatabase.find(p => p.id === problemId);
        if (!problem) return;
        
        this.optimizationWorkshop.currentProblem = problem;
        this.optimizationWorkshop.currentStage = 0;
        this.optimizationWorkshop.improvements = [];
        
        this.displayOptimizationWorkshop();
    }

    displayOptimizationWorkshop() {
        const container = document.getElementById('optimizationWorkshop');
        if (!container) return;
        
        const { currentProblem, currentStage, optimizationStages } = this.optimizationWorkshop;
        
        container.innerHTML = `
            <div class="optimization-workshop">
                <div class="workshop-header">
                    <h4>🔧 Optimization Workshop: ${currentProblem.title}</h4>
                    <div class="stage-indicator">
                        Stage ${currentStage + 1} of ${optimizationStages.length}: ${optimizationStages[currentStage]}
                    </div>
                </div>
                <div class="workshop-content">
                    ${this.generateStageContent(optimizationStages[currentStage])}
                </div>
                <div class="workshop-controls">
                    <button class="workshop-btn" onclick="nextOptimizationStage()">
                        ${currentStage < optimizationStages.length - 1 ? 'Next Stage' : 'Complete Optimization'}
                    </button>
                </div>
            </div>
        `;
    }

    generateStageContent(stage) {
        const { currentProblem } = this.optimizationWorkshop;
        
        switch(stage) {
            case 'analyze':
                return `
                    <div class="stage-content">
                        <h5>📊 Problem Analysis</h5>
                        <p><strong>Problem:</strong> ${currentProblem.description}</p>
                        <p><strong>Current Pattern:</strong> ${currentProblem.pattern}</p>
                        <p><strong>Difficulty:</strong> ${currentProblem.difficulty}</p>
                        <div class="analysis-metrics">
                            <div class="metric">Complexity: Analyzing...</div>
                            <div class="metric">Bottlenecks: Identifying...</div>
                        </div>
                    </div>
                `;
            
            case 'identify':
                return `
                    <div class="stage-content">
                        <h5>🎯 Bottleneck Identification</h5>
                        <div class="bottleneck-list">
                            <div class="bottleneck-item">Nested loops causing O(n²) complexity</div>
                            <div class="bottleneck-item">Redundant calculations</div>
                            <div class="bottleneck-item">Inefficient data structure usage</div>
                        </div>
                        <div class="optimization-opportunities">
                            <h6>💡 Optimization Opportunities:</h6>
                            ${currentProblem.optimizations.map(opt => `
                                <div class="opportunity">${opt}</div>
                            `).join('')}
                        </div>
                    </div>
                `;
            
            case 'optimize':
                return `
                    <div class="stage-content">
                        <h5>⚡ Apply Optimizations</h5>
                        <div class="optimization-techniques">
                            ${currentProblem.optimizations.map(opt => `
                                <div class="technique-card" onclick="applyOptimization('${opt}')">
                                    <div class="technique-name">${opt}</div>
                                    <div class="technique-impact">Click to apply</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            
            case 'validate':
                return `
                    <div class="stage-content">
                        <h5>✅ Validation Results</h5>
                        <div class="validation-results">
                            <div class="before-after">
                                <div class="before">
                                    <h6>Before Optimization</h6>
                                    <div class="metric">Time: O(n²)</div>
                                    <div class="metric">Space: O(1)</div>
                                </div>
                                <div class="arrow">→</div>
                                <div class="after">
                                    <h6>After Optimization</h6>
                                    <div class="metric improved">Time: O(n)</div>
                                    <div class="metric">Space: O(n)</div>
                                </div>
                            </div>
                            <div class="improvement-summary">
                                <strong>Improvement:</strong> ${this.calculateImprovement()}
                            </div>
                        </div>
                    </div>
                `;
            
            default:
                return '<div>Unknown stage</div>';
        }
    }

    nextOptimizationStage() {
        if (this.optimizationWorkshop.currentStage < this.optimizationWorkshop.optimizationStages.length - 1) {
            this.optimizationWorkshop.currentStage++;
            this.displayOptimizationWorkshop();
        } else {
            this.completeOptimization();
        }
    }

    applyOptimization(technique) {
        console.log(`⚡ Applying optimization: ${technique}`);
        
        this.optimizationWorkshop.improvements.push({
            technique: technique,
            appliedAt: Date.now(),
            impact: this.calculateOptimizationImpact(technique)
        });
        
        // Show optimization effect
        this.showOptimizationEffect(technique);
    }

    showOptimizationEffect(technique) {
        const notification = document.createElement('div');
        notification.className = 'optimization-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">⚡</div>
                <div class="notification-text">
                    <strong>Optimization Applied!</strong><br>
                    ${technique} has been implemented
                </div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border-radius: 12px;
            padding: 1rem;
            z-index: 1000;
            animation: optimizationSlide 0.5s ease-out;
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    calculateOptimizationImpact(technique) {
        const impacts = {
            'hash-map': { timeImprovement: '90%', spaceIncrease: '100%' },
            'sorting': { timeImprovement: '50%', spaceIncrease: '0%' },
            'kadane-algorithm': { timeImprovement: '95%', spaceIncrease: '0%' },
            'divide-conquer': { timeImprovement: '80%', spaceIncrease: '50%' }
        };
        
        return impacts[technique] || { timeImprovement: '50%', spaceIncrease: '25%' };
    }

    calculateImprovement() {
        const improvements = this.optimizationWorkshop.improvements;
        if (improvements.length === 0) return 'No optimizations applied';
        
        return `Applied ${improvements.length} optimization${improvements.length > 1 ? 's' : ''}, achieving significant performance gains`;
    }

    completeOptimization() {
        console.log('🎉 Optimization workshop completed!');
        
        // Show completion celebration
        this.showOptimizationCompletion();
        
        // Generate optimization report
        this.generateOptimizationReport();
    }

    showOptimizationCompletion() {
        // Create celebration effect
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createOptimizationParticle();
            }, i * 100);
        }
    }

    createOptimizationParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = ['⚡', '🚀', '✨'][Math.floor(Math.random() * 3)];
        particle.style.cssText = `
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 1000;
            animation: optimizationParticle 2s ease-out forwards;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
        
        // Add particle animation
        if (!document.getElementById('optimization-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'optimization-particle-animation';
            style.textContent = `
                @keyframes optimizationParticle {
                    0% { transform: translateY(0) scale(0); opacity: 0; }
                    50% { transform: translateY(-200px) scale(1); opacity: 1; }
                    100% { transform: translateY(-400px) scale(0); opacity: 0; }
                }
                
                @keyframes optimizationSlide {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== UTILITY FUNCTIONS =====
    
    generateAnalysisReport() {
        const report = {
            timestamp: new Date().toISOString(),
            patterns: Array.from(this.patternRecognizer.patterns.values()),
            complexityAnalyses: this.complexityAnalyzer.analysisResults,
            optimizations: this.optimizationWorkshop.improvements,
            recommendations: this.generateRecommendations()
        };
        
        console.log('📊 Analysis report generated:', report);
        return report;
    }

    generateRecommendations() {
        return [
            'Focus on pattern recognition for faster problem solving',
            'Always analyze time and space complexity before optimizing',
            'Consider multiple optimization techniques for each problem',
            'Validate optimizations with proper testing'
        ];
    }

    exportOptimizations() {
        const data = this.generateAnalysisReport();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `phase4-analysis-${Date.now()}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }
}

// Initialize Phase 4 Engine
let phase4Engine;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Initializing Phase 4 Advanced Problem Solving Engine...');
    phase4Engine = new Phase4Engine();
});

// Export for global access
window.Phase4Engine = Phase4Engine;

console.log('🎯 Phase 4 Advanced Problem Solving Engine loaded successfully!');
console.log('✨ Ready for pattern recognition, complexity analysis, and optimization!');
