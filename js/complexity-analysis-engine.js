// Time & Space Complexity Analysis Engine - Complete Implementation
class ComplexityAnalysisEngine {
    constructor() {
        // Core state management
        this.currentInputSize = 100;
        this.activeComplexities = new Set(['constant', 'logarithmic', 'linear']);
        this.chartInstance = null;
        this.practiceScore = 0;
        this.totalChallenges = 6; // 3 challenges × 2 questions each
        this.answeredChallenges = new Set();
        this.optimizationResults = new Map();
        this.interviewSession = null;
        
        // Complexity function definitions for calculations
        this.complexityFunctions = {
            constant: (n) => 1,
            logarithmic: (n) => Math.log2(n),
            linear: (n) => n,
            linearithmic: (n) => n * Math.log2(n),
            quadratic: (n) => n * n,
            exponential: (n) => Math.min(Math.pow(2, Math.min(n, 20)), 1e12) // Cap exponential growth
        };
        
        // Color schemes for different complexities
        this.complexityColors = {
            constant: '#10b981',
            logarithmic: '#3b82f6', 
            linear: '#f59e0b',
            linearithmic: '#ef4444',
            quadratic: '#7c2d12',
            exponential: '#7f1d1d'
        };
        
        // Challenge data with detailed explanations
        this.challenges = {
            1: {
                title: 'Array Operations',
                code: `def find_pair_sum(arr, target):
    seen = set()
    for num in arr:
        complement = target - num
        if complement in seen:
            return True
        seen.add(num)
    return False`,
                questions: {
                    time: {
                        correct: 'O(n)',
                        explanation: 'We iterate through the array once (O(n)), and each hash set lookup and insertion is O(1) on average. Therefore, the overall time complexity is O(n).',
                        breakdown: [
                            'Single loop through array: O(n)',
                            'Hash set operations (in, add): O(1) average',
                            'Total: O(n) × O(1) = O(n)'
                        ]
                    },
                    space: {
                        correct: 'O(n)',
                        explanation: 'In the worst case, we might need to store all elements in the hash set before finding a match, requiring O(n) space.',
                        breakdown: [
                            'Hash set storage: up to n elements',
                            'Other variables: O(1)',
                            'Total space: O(n)'
                        ]
                    }
                }
            },
            2: {
                title: 'Nested Loops',
                code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
                questions: {
                    best: {
                        correct: 'O(n)',
                        explanation: 'Best case occurs when the array is already sorted. The algorithm makes one pass and detects no swaps, then breaks early.',
                        breakdown: [
                            'First pass: O(n) comparisons',
                            'No swaps detected: break early',
                            'Total: O(n) in best case'
                        ]
                    },
                    worst: {
                        correct: 'O(n²)',
                        explanation: 'Worst case occurs when the array is reverse sorted. We need to make n passes, each doing up to n comparisons.',
                        breakdown: [
                            'Outer loop: n iterations',
                            'Inner loop: up to n comparisons per iteration',
                            'Total: O(n) × O(n) = O(n²)'
                        ]
                    }
                }
            },
            3: {
                title: 'Recursive Algorithm',
                code: `def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]`,
                questions: {
                    time: {
                        correct: 'O(n)',
                        explanation: 'With memoization, each Fibonacci number is calculated only once. We compute F(0) through F(n), which is n+1 calculations.',
                        breakdown: [
                            'Each fib(i) computed once: stored in memo',
                            'Total unique subproblems: n+1',
                            'Each computation: O(1) with memo lookup',
                            'Total: O(n)'
                        ]
                    },
                    space: {
                        correct: 'O(n)',
                        explanation: 'The memoization table stores up to n+1 values, and the recursion stack can go up to n levels deep.',
                        breakdown: [
                            'Memo table: O(n) space',
                            'Recursion stack: O(n) depth',
                            'Total space: O(n)'
                        ]
                    }
                }
            }
        };
        
        // Optimization problems with solutions
        this.optimizationProblems = {
            1: {
                title: 'Duplicate Finder',
                current: 'O(n²)',
                target: 'O(n)',
                hint: 'Think about what data structure provides O(1) lookups. A hash set can track seen elements as you iterate through the array once.',
                solution: `def has_duplicates_fast(arr):
    seen = set()
    for item in arr:
        if item in seen:
            return True
        seen.add(item)
    return False`,
                explanation: 'By using a hash set, we can check for duplicates in a single pass. Each lookup and insertion is O(1) on average, making the overall complexity O(n).'
            },
            2: {
                title: 'Fibonacci Calculator', 
                current: 'O(2ⁿ)',
                target: 'O(n)',
                hint: 'Avoid recalculating the same values by storing previously computed results. Consider either memoization (top-down) or dynamic programming (bottom-up).',
                solution: `def fibonacci_fast(n):
    if n <= 1:
        return n
    
    # Bottom-up dynamic programming
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]`,
                explanation: 'By building up the solution from the bottom (F(0), F(1), F(2), ..., F(n)), we avoid redundant calculations. Each value is computed exactly once.'
            }
        };
        
        // Interview scenarios with AI responses
        this.interviewScenarios = {
            junior: {
                title: 'Junior Developer Position - Startup Interview',
                duration: 300, // 5 minutes
                questions: [
                    "Hi! Let's start with something fundamental. Can you explain what Big O notation represents?",
                    "Good! Now, if you had a function that goes through an array once, what would its time complexity be?",
                    "Perfect! What if you had nested loops - one loop inside another loop?",
                    "Great! Can you think of an algorithm that runs in O(log n) time?",
                    "Excellent! Finally, when might you choose an O(n log n) algorithm over an O(n²) one?"
                ]
            },
            senior: {
                title: 'Senior Engineer Role - Tech Company Interview',
                duration: 600, // 10 minutes
                questions: [
                    "Let's dive into complexity analysis. How do you approach analyzing the time complexity of a recursive algorithm?",
                    "Interesting approach. Can you walk me through the space complexity analysis of a recursive solution versus an iterative one?",
                    "Good insight. How would you handle a situation where you need to optimize an algorithm that's currently O(n²)?",
                    "I like that strategy. Can you discuss the trade-offs between time and space complexity in real-world applications?",
                    "Excellent points. How do you communicate complexity trade-offs to non-technical stakeholders?",
                    "Final question: How do you handle amortized analysis when explaining algorithm performance?"
                ]
            },
            faang: {
                title: 'FAANG Company Interview - Senior+ Level',
                duration: 900, // 15 minutes
                questions: [
                    "Let's discuss advanced complexity analysis. Can you explain amortized time complexity and give me a real-world example?",
                    "Great example. Now, how would you analyze the complexity of an algorithm that uses multiple data structures with different access patterns?",
                    "Sophisticated analysis. How do you handle worst-case complexity analysis when dealing with hash tables in production systems?",
                    "Very practical. Can you discuss how you'd optimize a distributed system where network latency affects overall algorithmic complexity?",
                    "Impressive thinking. How do you balance theoretical Big O analysis with real-world performance considerations like cache locality and memory bandwidth?",
                    "Final challenge: Walk me through optimizing a machine learning algorithm where the complexity depends on both data size and model parameters."
                ]
            }
        };
        
        this.init();
    }

    init() {
        console.log('⚡ Complexity Analysis Engine initializing...');
        this.setupGlobalFunctions();
        this.setupEventListeners();
        this.initializeChart();
        this.updateVisualization(this.currentInputSize);
        console.log('✅ Complexity Analysis Engine ready!');
    }

    setupGlobalFunctions() {
        // Global functions for HTML onclick attributes
        window.exploreComplexity = (complexity) => this.exploreComplexity(complexity);
        window.updateVisualization = (size) => this.updateVisualization(size);
        window.toggleComplexity = (checkbox) => this.toggleComplexity(checkbox);
        window.selectComplexity = (challengeId, type, answer) => this.selectComplexity(challengeId, type, answer);
        window.checkOptimization = (problemId) => this.checkOptimization(problemId);
        window.showOptimizationHint = (problemId) => this.showOptimizationHint(problemId);
        window.showOptimalSolution = (problemId) => this.showOptimalSolution(problemId);
        window.startScenario = (scenario) => this.startScenario(scenario);
        window.sendResponse = () => this.sendResponse();
        window.startMasteryAssessment = () => this.startMasteryAssessment();
        window.previousLesson = () => this.previousLesson();
        window.completePhase4 = () => this.completePhase4();
        
        console.log('✅ Global functions registered for Complexity Analysis');
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.attachEventListeners();
        });
    }

    attachEventListeners() {
        // Input size slider
        const slider = document.getElementById('inputSizeSlider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                this.updateVisualization(parseInt(e.target.value));
            });
        }

        // Complexity checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleComplexity(e.target);
            });
        });
    }

    // ===== INTERACTIVE COMPLEXITY VISUALIZER =====
    
    initializeChart() {
        const canvas = document.getElementById('complexityChart');
        if (!canvas) {
            console.warn('Chart canvas not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        this.chartInstance = {
            canvas: canvas,
            ctx: ctx,
            width: canvas.width,
            height: canvas.height
        };
        
        console.log('📊 Chart initialized');
    }

    updateVisualization(inputSize) {
        this.currentInputSize = parseInt(inputSize);
        
        // Update display
        const display = document.getElementById('inputSizeDisplay');
        if (display) {
            display.textContent = this.currentInputSize;
        }
        
        const currentNDisplay = document.getElementById('currentN');
        if (currentNDisplay) {
            currentNDisplay.textContent = this.currentInputSize;
        }
        
        // Redraw chart
        this.drawComplexityChart();
        
        // Update statistics
        this.updateComplexityStats();
        
        console.log(`📈 Visualization updated for n = ${this.currentInputSize}`);
    }

    toggleComplexity(checkbox) {
        const complexity = checkbox.value;
        
        if (checkbox.checked) {
            this.activeComplexities.add(complexity);
        } else {
            this.activeComplexities.delete(complexity);
        }
        
        // Redraw chart and update legend
        this.drawComplexityChart();
        this.updateChartLegend();
        
        console.log(`🎛️ Toggled ${complexity}: ${checkbox.checked}`);
    }

    drawComplexityChart() {
        if (!this.chartInstance) {
            console.warn('Chart not initialized');
            return;
        }
        
        const { ctx, width, height } = this.chartInstance;
        
        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Chart dimensions
        const margin = 60;
        const chartWidth = width - 2 * margin;
        const chartHeight = height - 2 * margin;
        
        // Draw axes
        this.drawAxes(ctx, margin, chartWidth, chartHeight);
        
        // Draw grid
        this.drawGrid(ctx, margin, chartWidth, chartHeight);
        
        // Calculate max value for scaling
        const maxN = this.currentInputSize;
        let maxValue = 0;
        
        this.activeComplexities.forEach(complexity => {
            if (this.complexityFunctions[complexity]) {
                const value = this.complexityFunctions[complexity](maxN);
                maxValue = Math.max(maxValue, value);
            }
        });
        
        // Cap maxValue to prevent extreme scaling
        maxValue = Math.min(maxValue, 1e6);
        
        // Draw complexity curves
        this.activeComplexities.forEach(complexity => {
            this.drawComplexityCurve(ctx, complexity, margin, chartWidth, chartHeight, maxN, maxValue);
        });
        
        // Draw current input size indicator
        this.drawCurrentInputIndicator(ctx, margin, chartWidth, chartHeight, maxN);
    }

    drawAxes(ctx, margin, chartWidth, chartHeight) {
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(margin, margin + chartHeight);
        ctx.lineTo(margin + chartWidth, margin + chartHeight);
        ctx.stroke();
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, margin + chartHeight);
        ctx.stroke();
        
        // Axis labels
        ctx.fillStyle = '#374151';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        
        // X-axis label
        ctx.fillText('Input Size (n)', margin + chartWidth / 2, margin + chartHeight + 40);
        
        // Y-axis label
        ctx.save();
        ctx.translate(20, margin + chartHeight / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Operations', 0, 0);
        ctx.restore();
    }

    drawGrid(ctx, margin, chartWidth, chartHeight) {
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        
        // Vertical grid lines
        for (let i = 1; i <= 10; i++) {
            const x = margin + (chartWidth * i) / 10;
            ctx.beginPath();
            ctx.moveTo(x, margin);
            ctx.lineTo(x, margin + chartHeight);
            ctx.stroke();
        }
        
        // Horizontal grid lines
        for (let i = 1; i <= 10; i++) {
            const y = margin + (chartHeight * i) / 10;
            ctx.beginPath();
            ctx.moveTo(margin, y);
            ctx.lineTo(margin + chartWidth, y);
            ctx.stroke();
        }
    }

    drawComplexityCurve(ctx, complexity, margin, chartWidth, chartHeight, maxN, maxValue) {
        const color = this.complexityColors[complexity];
        const func = this.complexityFunctions[complexity];
        
        if (!func) return;
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        let isFirstPoint = true;
        
        for (let n = 1; n <= maxN; n += Math.max(1, Math.floor(maxN / 100))) {
            const value = func(n);
            const x = margin + (chartWidth * n) / maxN;
            const y = margin + chartHeight - (chartHeight * Math.min(value, maxValue)) / maxValue;
            
            if (isFirstPoint) {
                ctx.moveTo(x, y);
                isFirstPoint = false;
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Add complexity label at the end of the curve
        const endValue = func(maxN);
        const endX = margin + chartWidth;
        const endY = margin + chartHeight - (chartHeight * Math.min(endValue, maxValue)) / maxValue;
        
        ctx.fillStyle = color;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(this.getComplexityNotation(complexity), endX + 10, endY + 5);
    }

    drawCurrentInputIndicator(ctx, margin, chartWidth, chartHeight, maxN) {
        const x = margin + (chartWidth * this.currentInputSize) / maxN;
        
        // Vertical line
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        ctx.beginPath();
        ctx.moveTo(x, margin);
        ctx.lineTo(x, margin + chartHeight);
        ctx.stroke();
        
        ctx.setLineDash([]); // Reset line dash
        
        // Label
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`n = ${this.currentInputSize}`, x, margin - 10);
    }

    getComplexityNotation(complexity) {
        const notations = {
            constant: 'O(1)',
            logarithmic: 'O(log n)',
            linear: 'O(n)',
            linearithmic: 'O(n log n)',
            quadratic: 'O(n²)',
            exponential: 'O(2ⁿ)'
        };
        return notations[complexity] || complexity;
    }

    updateChartLegend() {
        const legend = document.getElementById('chartLegend');
        if (!legend) return;
        
        legend.innerHTML = '';
        
        this.activeComplexities.forEach(complexity => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            
            const color = document.createElement('div');
            color.className = 'legend-color';
            color.style.backgroundColor = this.complexityColors[complexity];
            
            const label = document.createElement('span');
            label.textContent = this.getComplexityNotation(complexity);
            
            legendItem.appendChild(color);
            legendItem.appendChild(label);
            legend.appendChild(legendItem);
        });
    }

    updateComplexityStats() {
        const statsGrid = document.getElementById('statsGrid');
        if (!statsGrid) return;
        
        statsGrid.innerHTML = '';
        
        this.activeComplexities.forEach(complexity => {
            const func = this.complexityFunctions[complexity];
            if (!func) return;
            
            const operations = Math.floor(func(this.currentInputSize));
            const notation = this.getComplexityNotation(complexity);
            
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.innerHTML = `
                <div class="stat-complexity" style="color: ${this.complexityColors[complexity]}">
                    ${notation}
                </div>
                <div class="stat-operations">${operations.toLocaleString()}</div>
                <div class="stat-label">operations</div>
            `;
            
            statsGrid.appendChild(statItem);
        });
    }

    exploreComplexity(complexity) {
        const complexityData = {
            constant: {
                name: 'O(1) - Constant Time',
                description: 'Lightning fast! Performance doesn\'t change with input size. Like accessing a specific page in a book by page number.',
                examples: ['Array access by index', 'Hash table lookup', 'Stack push/pop operations'],
                realWorld: 'Database index lookups, cache retrieval, accessing object properties',
                visualization: 'Flat horizontal line - stays the same regardless of input size'
            },
            logarithmic: {
                name: 'O(log n) - Logarithmic Time', 
                description: 'Scales beautifully! Eliminates half the problem in each step. Like finding a word in a dictionary.',
                examples: ['Binary search', 'Balanced tree operations', 'Heap operations'],
                realWorld: 'Search engines, database queries, finding contacts in phone book',
                visualization: 'Gentle upward curve - grows slowly even for large inputs'
            },
            linear: {
                name: 'O(n) - Linear Time',
                description: 'Reasonable growth. Performance increases proportionally with input. Like reading every page in a book.',
                examples: ['Array iteration', 'Linear search', 'Finding min/max in unsorted array'],
                realWorld: 'Processing every user in a database, iterating through files',
                visualization: 'Straight diagonal line - doubles when input doubles'
            },
            linearithmic: {
                name: 'O(n log n) - Linearithmic Time',
                description: 'Getting expensive but often optimal for sorting. Combines the best of linear and logarithmic.',
                examples: ['Merge sort', 'Heap sort', 'Efficient sorting algorithms'],
                realWorld: 'Sorting large datasets, organizing search results',
                visualization: 'Curved line steeper than linear - but much better than quadratic'
            },
            quadratic: {
                name: 'O(n²) - Quadratic Time',
                description: 'Danger zone! Avoid for large inputs. Often has nested loops. Like comparing every pair of items.',
                examples: ['Bubble sort', 'Selection sort', 'Nested loops over same data'],
                realWorld: 'Comparing all pairs of users, simple matrix operations',
                visualization: 'Steep upward curve - grows very quickly with input size'
            },
            exponential: {
                name: 'O(2ⁿ) - Exponential Time',
                description: 'Computer killer! Only works for tiny inputs. Usually needs optimization or approximation.',
                examples: ['Naive Fibonacci', 'Tower of Hanoi', 'Brute force password cracking'],
                realWorld: 'Cryptography (intentionally slow), some AI problems, combinatorial optimization',
                visualization: 'Nearly vertical line - becomes impossible for moderate inputs'
            }
        };
        
        const data = complexityData[complexity];
        if (!data) return;
        
        alert(`${data.name}

📋 Description:
${data.description}

💡 Common Examples:
• ${data.examples.join('\n• ')}

🌍 Real-World Applications:
${data.realWorld}

📊 Visualization:
${data.visualization}

Try adjusting the input size slider to see how this complexity function behaves!`);
    }

    // ===== COMPLEXITY ANALYSIS PRACTICE =====
    
    selectComplexity(challengeId, questionType, selectedAnswer) {
        const challengeKey = `${challengeId}-${questionType}`;
        
        if (this.answeredChallenges.has(challengeKey)) {
            alert('⚠️ You have already answered this question!');
            return;
        }
        
        const challenge = this.challenges[challengeId];
        if (!challenge) {
            console.error(`Challenge ${challengeId} not found`);
            return;
        }
        
        const question = challenge.questions[questionType];
        if (!question) {
            console.error(`Question type ${questionType} not found for challenge ${challengeId}`);
            return;
        }
        
        const isCorrect = selectedAnswer === question.correct;
        
        // Mark as answered
        this.answeredChallenges.add(challengeKey);
        
        // Update score
        if (isCorrect) {
            this.practiceScore++;
        }
        
        // Update button states
        this.updateChallengeButtons(challengeId, questionType, selectedAnswer, isCorrect);
        
        // Show explanation
        this.showChallengeExplanation(challengeId, questionType, isCorrect);
        
        // Update overall score display
        this.updatePracticeScore();
        
        console.log(`📝 Challenge ${challengeId}-${questionType}: ${isCorrect ? 'Correct' : 'Incorrect'}`);
    }

    updateChallengeButtons(challengeId, questionType, selectedAnswer, isCorrect) {
        const challengeElement = document.querySelector(`[data-challenge="${challengeId}"]`);
        if (!challengeElement) return;
        
        const questionGroup = challengeElement.querySelector(`h6:contains("${questionType}")`);
        if (!questionGroup) return;
        
        const buttons = challengeElement.querySelectorAll('.complexity-option');
        buttons.forEach(button => {
            const buttonAnswer = button.textContent.trim();
            button.onclick = null; // Disable further clicks
            
            if (buttonAnswer === selectedAnswer) {
                button.classList.add(isCorrect ? 'correct' : 'incorrect');
            } else if (buttonAnswer === this.challenges[challengeId].questions[questionType].correct) {
                button.classList.add('correct');
            }
        });
    }

    showChallengeExplanation(challengeId, questionType, isCorrect) {
        const explanation = document.getElementById(`explanation-${challengeId}`);
        if (!explanation) return;
        
        const challenge = this.challenges[challengeId];
        const question = challenge.questions[questionType];
        
        explanation.style.display = 'block';
        explanation.innerHTML = `
            <div class="explanation-content">
                <h6>${isCorrect ? '✅ Correct!' : '❌ Incorrect, but great effort!'}</h6>
                
                <div class="explanation-text">
                    <p><strong>Explanation:</strong> ${question.explanation}</p>
                </div>
                
                <div class="complexity-breakdown">
                    <h6>🔍 Step-by-Step Analysis:</h6>
                    <ul>
                        ${question.breakdown.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="learning-tip">
                    <p>💡 <strong>Pro Tip:</strong> ${this.getComplexityTip(questionType)}</p>
                </div>
            </div>
        `;
        
        // Smooth scroll to explanation
        explanation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    getComplexityTip(questionType) {
        const tips = {
            time: 'To analyze time complexity, count the number of basic operations as a function of input size. Focus on the dominant term and ignore constants.',
            space: 'For space complexity, consider all extra memory used: data structures, recursion stack, and temporary variables. Don\'t count the input itself.',
            best: 'Best case analysis considers the most favorable input. This often occurs with early termination conditions or pre-sorted data.',
            worst: 'Worst case analysis assumes the most challenging input. This is usually what we mean when we discuss Big O without qualifiers.'
        };
        
        return tips[questionType] || 'Practice analyzing complexity by breaking down algorithms into their component operations and counting how they scale with input size.';
    }

    updatePracticeScore() {
        const scoreElement = document.getElementById('currentPracticeScore');
        const totalElement = document.getElementById('totalChallenges');
        const feedbackElement = document.getElementById('practiceScoreFeedback');
        
        if (scoreElement) scoreElement.textContent = this.practiceScore;
        if (totalElement) totalElement.textContent = this.totalChallenges;
        
        if (feedbackElement) {
            const percentage = Math.round((this.practiceScore / this.totalChallenges) * 100);
            let feedback = '';
            
            if (percentage >= 85) {
                feedback = `🏆 Outstanding! ${percentage}% - You have mastered complexity analysis!`;
            } else if (percentage >= 70) {
                feedback = `🎯 Excellent! ${percentage}% - Strong understanding of complexity concepts!`;
            } else if (percentage >= 50) {
                feedback = `👍 Good work! ${percentage}% - You're getting the hang of complexity analysis!`;
            } else {
                feedback = `📚 Keep learning! ${percentage}% - Complexity analysis takes practice. Review the explanations and try again!`;
            }
            
            feedbackElement.textContent = feedback;
        }
    }

    // ===== ALGORITHM OPTIMIZATION CHALLENGES =====
    
    checkOptimization(problemId) {
        const solution = document.getElementById(`solution-${problemId}`);
        const feedback = document.getElementById(`feedback-${problemId}`);
        
        if (!solution || !feedback) {
            console.error(`Optimization elements not found for problem ${problemId}`);
            return;
        }
        
        const userCode = solution.value.trim();
        if (!userCode) {
            feedback.style.display = 'block';
            feedback.innerHTML = `
                <div class="feedback-error">
                    <h6>⚠️ No Solution Provided</h6>
                    <p>Please write your optimized solution in the text area above.</p>
                </div>
            `;
            return;
        }
        
        // Simulate code analysis
        const analysis = this.analyzeOptimization(problemId, userCode);
        this.displayOptimizationFeedback(problemId, analysis);
        
        // Store result for progress tracking
        this.optimizationResults.set(problemId, analysis);
        
        console.log(`🧪 Optimization check for problem ${problemId}: ${analysis.isOptimal ? 'Success' : 'Needs improvement'}`);
    }

    analyzeOptimization(problemId, userCode) {
        const problem = this.optimizationProblems[problemId];
        const codeLower = userCode.toLowerCase();
        
        let analysis = {
            isOptimal: false,
            feedback: '',
            suggestions: [],
            complexity: 'Unknown'
        };
        
        if (problemId === 1) {
            // Duplicate Finder Analysis
            if (codeLower.includes('set()') || codeLower.includes('{}')) {
                if (codeLower.includes('for ') && !codeLower.includes('for i') || !codeLower.includes('for j')) {
                    analysis.isOptimal = true;
                    analysis.complexity = 'O(n)';
                    analysis.feedback = 'Excellent! You used a hash set with a single loop - optimal O(n) solution!';
                } else {
                    analysis.feedback = 'Good use of a set, but check if you can avoid nested loops.';
                    analysis.suggestions.push('Use only one loop to iterate through the array');
                }
            } else if (codeLower.includes('sort')) {
                analysis.complexity = 'O(n log n)';
                analysis.feedback = 'Sorting approach works but isn\'t optimal. Can you do better than O(n log n)?';
                analysis.suggestions.push('Try using a hash set instead of sorting');
            } else {
                analysis.feedback = 'This solution might not be optimal. Consider using a data structure that provides O(1) lookups.';
                analysis.suggestions.push('Think about using a set or dictionary');
            }
        } else if (problemId === 2) {
            // Fibonacci Analysis
            if (codeLower.includes('memo') || codeLower.includes('dp') || codeLower.includes('cache')) {
                analysis.isOptimal = true;
                analysis.complexity = 'O(n)';
                analysis.feedback = 'Perfect! You used memoization/DP to achieve optimal O(n) complexity!';
            } else if (codeLower.includes('for ') && codeLower.includes('range')) {
                analysis.isOptimal = true;
                analysis.complexity = 'O(n)';
                analysis.feedback = 'Excellent! Bottom-up iterative approach achieves optimal O(n) complexity!';
            } else if (codeLower.includes('fibonacci(n-1)') && codeLower.includes('fibonacci(n-2)')) {
                analysis.complexity = 'O(2^n)';
                analysis.feedback = 'This is still the exponential solution. You need to avoid recalculating the same values.';
                analysis.suggestions.push('Use memoization to store previously calculated values');
                analysis.suggestions.push('Or try a bottom-up iterative approach');
            }
        }
        
        return analysis;
    }

    displayOptimizationFeedback(problemId, analysis) {
        const feedback = document.getElementById(`feedback-${problemId}`);
        if (!feedback) return;
        
        feedback.style.display = 'block';
        
        const statusClass = analysis.isOptimal ? 'feedback-success' : 'feedback-improvement';
        
        feedback.innerHTML = `
            <div class="${statusClass}">
                <h6>${analysis.isOptimal ? '🎉 Optimization Successful!' : '🔧 Optimization Opportunity'}</h6>
                
                <div class="feedback-analysis">
                    <p><strong>Analysis:</strong> ${analysis.feedback}</p>
                    ${analysis.complexity !== 'Unknown' ? `<p><strong>Complexity:</strong> ${analysis.complexity}</p>` : ''}
                </div>
                
                ${analysis.suggestions.length > 0 ? `
                    <div class="feedback-suggestions">
                        <h6>💡 Suggestions for Improvement:</h6>
                        <ul>
                            ${analysis.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="feedback-encouragement">
                    <p>${analysis.isOptimal ? 
                        '🏆 Outstanding work! You\'ve successfully optimized this algorithm. This kind of thinking is exactly what tech interviews are looking for!' :
                        '💪 Keep experimenting! Algorithm optimization is a skill that improves with practice. Try implementing the suggestions above.'
                    }</p>
                </div>
            </div>
        `;
    }

    showOptimizationHint(problemId) {
        const problem = this.optimizationProblems[problemId];
        if (!problem) return;
        
        alert(`💡 Optimization Hint for Problem ${problemId}

${problem.hint}

Remember: The goal is to reduce the time complexity from ${problem.current} to ${problem.target}.

Think about:
• What data structures provide faster access?
• Can you avoid redundant calculations?
• Is there a way to solve this in fewer passes through the data?`);
    }

    showOptimalSolution(problemId) {
        const problem = this.optimizationProblems[problemId];
        if (!problem) return;
        
        const solution = document.getElementById(`solution-${problemId}`);
        const feedback = document.getElementById(`feedback-${problemId}`);
        
        if (solution) {
            solution.value = problem.solution;
        }
        
        if (feedback) {
            feedback.style.display = 'block';
            feedback.innerHTML = `
                <div class="feedback-solution">
                    <h6>👁️ Optimal Solution Revealed</h6>
                    
                    <div class="solution-explanation">
                        <p><strong>Explanation:</strong> ${problem.explanation}</p>
                        <p><strong>Complexity:</strong> Optimized from ${problem.current} to ${problem.target}</p>
                    </div>
                    
                    <div class="learning-note">
                        <p>💡 <strong>Learning Note:</strong> Study this solution carefully and try to implement similar optimizations from scratch in the future. The key insight is recognizing the pattern that leads to the optimization.</p>
                    </div>
                </div>
            `;
        }
        
        console.log(`👁️ Showed optimal solution for problem ${problemId}`);
    }

    // ===== INTERVIEW COMMUNICATION SIMULATOR =====
    
    startScenario(scenarioType) {
        const scenario = this.interviewScenarios[scenarioType];
        if (!scenario) {
            console.error(`Scenario ${scenarioType} not found`);
            return;
        }
        
        this.interviewSession = {
            type: scenarioType,
            scenario: scenario,
            currentQuestion: 0,
            startTime: Date.now(),
            responses: []
        };
        
        // Show interview chat interface
        const chatElement = document.getElementById('interviewChat');
        const titleElement = document.getElementById('interviewTitle');
        const timerElement = document.getElementById('interviewTimer');
        
        if (chatElement) chatElement.style.display = 'block';
        if (titleElement) titleElement.textContent = scenario.title;
        
        // Start timer
        this.startInterviewTimer(scenario.duration);
        
        // Clear previous messages and start first question
        this.clearChatMessages();
        this.askNextQuestion();
        
        console.log(`🎤 Started ${scenarioType} interview scenario`);
    }

    startInterviewTimer(duration) {
        let timeLeft = duration;
        const timerElement = document.getElementById('interviewTimer');
        
        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            if (timerElement) {
                timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                // Color coding for time urgency
                if (timeLeft <= 60) {
                    timerElement.style.backgroundColor = '#dc2626'; // Red
                } else if (timeLeft <= 120) {
                    timerElement.style.backgroundColor = '#d97706'; // Orange
                } else {
                    timerElement.style.backgroundColor = '#059669'; // Green
                }
            }
            
            if (timeLeft <= 0) {
                this.endInterviewSession();
                return;
            }
            
            timeLeft--;
        };
        
        // Update immediately and then every second
        updateTimer();
        this.interviewTimer = setInterval(updateTimer, 1000);
    }

    clearChatMessages() {
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
    }

    askNextQuestion() {
        if (!this.interviewSession || this.interviewSession.currentQuestion >= this.interviewSession.scenario.questions.length) {
            this.endInterviewSession();
            return;
        }
        
        const question = this.interviewSession.scenario.questions[this.interviewSession.currentQuestion];
        this.addChatMessage('interviewer', 'Interviewer', question);
        
        // Enable response input
        const responseInput = document.getElementById('responseInput');
        if (responseInput) {
            responseInput.disabled = false;
            responseInput.focus();
        }
    }

    sendResponse() {
        const responseInput = document.getElementById('responseInput');
        if (!responseInput || !this.interviewSession) return;
        
        const response = responseInput.value.trim();
        if (!response) {
            alert('Please enter a response before sending.');
            return;
        }
        
        // Add response to chat
        this.addChatMessage('candidate', 'You', response);
        
        // Store response
        this.interviewSession.responses.push({
            question: this.interviewSession.scenario.questions[this.interviewSession.currentQuestion],
            response: response,
            timestamp: Date.now()
        });
        
        // Clear input
        responseInput.value = '';
        responseInput.disabled = true;
        
        // Move to next question
        this.interviewSession.currentQuestion++;
        
        // Delay before next question to simulate realistic conversation
        setTimeout(() => {
            this.askNextQuestion();
        }, 2000);
    }

    addChatMessage(sender, senderName, message) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}`;
        messageElement.innerHTML = `
            <div class="message-sender">${senderName}</div>
            <div class="message-content">${message}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    endInterviewSession() {
        if (this.interviewTimer) {
            clearInterval(this.interviewTimer);
            this.interviewTimer = null;
        }
        
        if (!this.interviewSession) return;
        
        const duration = Date.now() - this.interviewSession.startTime;
        const completedQuestions = this.interviewSession.responses.length;
        const totalQuestions = this.interviewSession.scenario.questions.length;
        
        // Show completion message
        setTimeout(() => {
            alert(`🎤 Interview Session Complete!

Scenario: ${this.interviewSession.scenario.title}
Questions Answered: ${completedQuestions}/${totalQuestions}
Duration: ${Math.round(duration / 1000)}s

Performance Feedback:
${this.generateInterviewFeedback(completedQuestions, totalQuestions, duration)}

Keep practicing to improve your technical communication skills!`);
            
            // Hide chat interface
            const chatElement = document.getElementById('interviewChat');
            if (chatElement) chatElement.style.display = 'none';
            
        }, 1000);
        
        this.interviewSession = null;
        console.log('🎤 Interview session ended');
    }

    generateInterviewFeedback(completed, total, duration) {
        const completionRate = (completed / total) * 100;
        const avgTimePerQuestion = duration / 1000 / Math.max(completed, 1);
        
        let feedback = '';
        
        if (completionRate >= 90) {
            feedback += '🏆 Excellent completion rate! You answered nearly all questions.\n';
        } else if (completionRate >= 70) {
            feedback += '👍 Good progress! You answered most of the questions.\n';
        } else {
            feedback += '📚 Practice more! Try to answer questions more concisely to cover all topics.\n';
        }
        
        if (avgTimePerQuestion <= 60) {
            feedback += '⚡ Great pacing! You explained concepts efficiently.';
        } else if (avgTimePerQuestion <= 120) {
            feedback += '🎯 Good pacing! Your explanations were thorough.';
        } else {
            feedback += '⏰ Consider being more concise in your explanations.';
        }
        
        return feedback;
    }

    // ===== MASTERY ASSESSMENT =====
    
    startMasteryAssessment() {
        // Check prerequisites
        const practicePercentage = (this.practiceScore / this.totalChallenges) * 100;
        const optimizationCompleted = this.optimizationResults.size;
        const interviewCompleted = this.interviewSession !== null || localStorage.getItem('interviewCompleted') === 'true';
        
        if (practicePercentage < 85) {
            alert(`⚠️ Mastery Assessment Requirements Not Met

Current Status:
• Complexity Analysis: ${practicePercentage.toFixed(1)}% (Need 85%+)
• Algorithm Optimization: ${optimizationCompleted}/2 problems
• Interview Simulation: ${interviewCompleted ? 'Completed' : 'Not completed'}

Please complete the requirements before attempting the mastery assessment.`);
            return;
        }
        
        alert(`🎓 Phase 4 Mastery Assessment

Congratulations! You're ready for the comprehensive mastery assessment.

Assessment Format:
• 15 complexity analysis problems
• 3 algorithm optimization challenges  
• 1 mock interview session
• Time limit: 45 minutes
• Passing score: 85%

This assessment will test everything you've learned in Phase 4:
✅ Sorting Algorithm Analysis
✅ Problem Pattern Recognition  
✅ Time & Space Complexity Mastery

Are you ready to demonstrate your advanced algorithm skills?`);
        
        const proceed = confirm('Begin the Phase 4 Mastery Assessment?');
        if (proceed) {
            alert('🚀 Mastery Assessment would launch here!\n\nThis comprehensive test would validate your mastery of all Phase 4 advanced topics.');
            // In a real implementation, this would launch the actual assessment
        }
    }

    // ===== NAVIGATION & COMPLETION =====
    
    previousLesson() {
        window.location.href = 'problem-patterns.html';
    }

    completePhase4() {
        const celebration = `🎉 PHASE 4 ADVANCED TOPICS COMPLETE! 🎉

You've mastered the most challenging algorithmic concepts:
✅ Sorting Algorithms Theater - Interactive algorithm visualization
✅ Problem Patterns & Recognition - Essential LeetCode skill mastery
✅ Time & Space Complexity Analysis - Professional algorithm analysis

🎓 You now possess advanced algorithmic thinking skills that set you apart from most developers!

🚀 Ready for Phase 5: LeetCode Mastery & Interview Excellence?

Phase 5 includes:
• LeetCode Strategy Framework - Systematic problem-solving approach
• Mock Interview Simulator - AI-powered interview practice
• Portfolio Projects - Showcase your newfound skills`;

        alert(celebration);
        
        setTimeout(() => {
            const proceed = confirm("🚀 Ready to start Phase 5: LeetCode Mastery?");
            if (proceed) {
                alert(`🎊 Congratulations on completing Phase 4!

Phase 5 is under active development and will include:

🎯 LeetCode Strategy Framework
🎪 AI Mock Interview Simulator  
🚀 Portfolio Project Builder
📊 Progress Analytics Dashboard
🎓 Final Certification System

You've built an incredible foundation. Phase 5 will transform you into a LeetCode master ready for any technical interview!

Stay tuned for the ultimate coding interview preparation experience!`);
            } else {
                window.location.href = '../../dashboard.html';
            }
        }, 2000);
    }
}

// Helper function to find elements by text content
function findElementByText(selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).find(el => el.textContent.includes(text));
}

// Initialize the Complexity Analysis Engine
let complexityEngine;

document.addEventListener('DOMContentLoaded', () => {
    console.log('⚡ Initializing Time & Space Complexity Analysis Engine...');
    complexityEngine = new ComplexityAnalysisEngine();
});

// Additional CSS for feedback states (inject into page)
const feedbackStyles = `
<style>
.feedback-success {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
    border: 1px solid var(--success-color);
    border-radius: 12px;
    padding: 2rem;
    color: var(--success-color);
}

.feedback-improvement {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1));
    border: 1px solid var(--warning-color);
    border-radius: 12px;
    padding: 2rem;
    color: var(--warning-color);
}

.feedback-error {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1));
    border: 1px solid var(--error-color);
    border-radius: 12px;
    padding: 2rem;
    color: var(--error-color);
}

.feedback-solution {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
    border: 1px solid var(--accent-primary);
    border-radius: 12px;
    padding: 2rem;
    color: var(--accent-primary);
}

.feedback-analysis, .feedback-suggestions, .feedback-encouragement,
.solution-explanation, .learning-note {
    margin: 1.5rem 0;
}

.feedback-suggestions ul, .solution-explanation {
    background: var(--bg-secondary);
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
}

.explanation-content {
    background: var(--bg-primary);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--success-color);
}

.complexity-breakdown {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1.5rem 0;
}

.complexity-breakdown ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
}

.learning-tip {
    background: rgba(59, 130, 246, 0.1);
    padding: 1rem;
    border-radius: 8px;
    border-left: 3px solid var(--accent-primary);
    margin-top: 1.5rem;
}
</style>
`;

// Inject feedback styles
document.head.insertAdjacentHTML('beforeend', feedbackStyles);

console.log('⚡ Time & Space Complexity Analysis Engine loaded successfully!');
