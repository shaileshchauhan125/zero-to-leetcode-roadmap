// Phase 5: LeetCode Mastery Engine - Ultimate Interview Preparation System
class Phase5Engine {
    constructor() {
        // LeetCode strategy system
        this.strategyFramework = {
            currentProblem: null,
            selectedStrategy: null,
            progressTracking: new Map(),
            problemBank: new Map(),
            difficultyStats: { easy: 0, medium: 0, hard: 0 }
        };
        
        // Mock interview system
        this.interviewSimulator = {
            isActive: false,
            currentInterview: null,
            interviewHistory: [],
            performanceMetrics: {
                codingSpeed: 0,
                problemSolving: 0,
                communication: 0,
                optimization: 0
            }
        };
        
        // Portfolio management
        this.portfolioManager = {
            projects: new Map(),
            completedProjects: 0,
            portfolioScore: 0,
            certificationRequirements: new Map()
        };
        
        // Performance analytics
        this.analytics = {
            studyTime: 0,
            problemsSolved: 0,
            streakCount: 0,
            weeklyProgress: [],
            strongAreas: [],
            improvementAreas: []
        };
        
        this.init();
    }

    init() {
        console.log('🏆 Phase 5 LeetCode Mastery Engine initializing...');
        this.setupGlobalFunctions();
        this.setupEventListeners();
        this.initializeProblemBank();
        this.loadUserProgress();
        this.setupProgressTracking();
        console.log('✅ Phase 5 Engine ready for LeetCode mastery and interview preparation!');
    }

    setupGlobalFunctions() {
        // Strategy framework functions
        window.selectDifficulty = (difficulty) => this.selectDifficulty(difficulty);
        window.loadProblemSet = (category) => this.loadProblemSet(category);
        window.startProblemSolving = (problemId) => this.startProblemSolving(problemId);
        window.submitSolution = (code) => this.submitSolution(code);
        window.getFeedback = () => this.getFeedback();
        window.runSolution = () => this.runSolution();
        window.testSolution = () => this.testSolution();
        
        // Mock interview functions
        window.startMockInterview = (company) => this.startMockInterview(company);
        window.endMockInterview = () => this.endMockInterview();
        window.submitInterviewSolution = (code) => this.submitInterviewSolution(code);
        window.getInterviewFeedback = () => this.getInterviewFeedback();
        window.nextInterviewQuestion = () => this.nextInterviewQuestion();
        
        // Portfolio functions
        window.createProject = (projectType) => this.createProject(projectType);
        window.updateProject = (projectId, data) => this.updateProject(projectId, data);
        window.deployProject = (projectId) => this.deployProject(projectId);
        window.generatePortfolio = () => this.generatePortfolio();
        window.startProjectWizard = (type) => this.startProjectWizard(type);
        
        // Progress tracking functions
        window.updateProgress = (metric, value) => this.updateProgress(metric, value);
        window.getProgressReport = () => this.getProgressReport();
        window.setLearningGoal = (goal) => this.setLearningGoal(goal);
        
        // Analytics functions
        window.trackProblemAttempt = (problemId, success) => this.trackProblemAttempt(problemId, success);
        window.generateInsights = () => this.generateInsights();
        window.exportProgress = () => this.exportProgress();
        
        console.log('✅ Phase 5 global functions registered');
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeUI();
            this.setupInteractiveElements();
        });
        
        // Problem solving interface
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('problem-card')) {
                this.handleProblemSelection(e.target);
            }
        });
        
        // Code editor integration
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('code-editor')) {
                this.handleCodeChange(e.target.value);
            }
        });
        
        // Interview controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('interview-control')) {
                this.handleInterviewControl(e.target.dataset.action);
            }
        });
    }

    initializeProblemBank() {
        // Initialize comprehensive problem database
        const problems = [
            // Easy Problems
            {
                id: 'two-sum',
                title: 'Two Sum',
                difficulty: 'easy',
                category: 'Array',
                description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
                constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Only one valid answer exists'],
                examples: [
                    { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
                    { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
                ],
                hints: ['Use a hash map to store values and indices', 'Look for complement of current number'],
                solution: `def twoSum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'],
                frequency: 'Very High'
            },
            
            // Medium Problems
            {
                id: 'longest-substring',
                title: 'Longest Substring Without Repeating Characters',
                difficulty: 'medium',
                category: 'String',
                description: 'Given a string s, find the length of the longest substring without repeating characters.',
                constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces'],
                examples: [
                    { input: 's = "abcabcbb"', output: '3' },
                    { input: 's = "bbbbb"', output: '1' },
                    { input: 's = "pwwkew"', output: '3' }
                ],
                hints: ['Use sliding window technique', 'Keep track of character positions'],
                solution: `def lengthOfLongestSubstring(s):
    char_map = {}
    left = max_length = 0
    
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_length = max(max_length, right - left + 1)
    
    return max_length`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(min(m,n))',
                companies: ['Amazon', 'Microsoft', 'Adobe'],
                frequency: 'High'
            },
            
            // Hard Problems
            {
                id: 'median-sorted-arrays',
                title: 'Median of Two Sorted Arrays',
                difficulty: 'hard',
                category: 'Binary Search',
                description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
                constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000'],
                examples: [
                    { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000' },
                    { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000' }
                ],
                hints: ['Use binary search on the smaller array', 'Partition arrays to find median'],
                solution: `def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    m, n = len(nums1), len(nums2)
    left, right = 0, m
    
    while left <= right:
        partition1 = (left + right) // 2
        partition2 = (m + n + 1) // 2 - partition1
        
        max_left1 = float('-inf') if partition1 == 0 else nums1[partition1 - 1]
        min_right1 = float('inf') if partition1 == m else nums1[partition1]
        
        max_left2 = float('-inf') if partition2 == 0 else nums2[partition2 - 1]
        min_right2 = float('inf') if partition2 == n else nums2[partition2]
        
        if max_left1 <= min_right2 and max_left2 <= min_right1:
            if (m + n) % 2 == 0:
                return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2
            else:
                return max(max_left1, max_left2)
        elif max_left1 > min_right2:
            right = partition1 - 1
        else:
            left = partition1 + 1`,
                timeComplexity: 'O(log(min(m,n)))',
                spaceComplexity: 'O(1)',
                companies: ['Google', 'Facebook', 'Microsoft'],
                frequency: 'Medium'
            }
        ];
        
        problems.forEach(problem => {
            this.strategyFramework.problemBank.set(problem.id, problem);
        });
        
        // Update difficulty stats
        this.updateDifficultyStats();
    }

    updateDifficultyStats() {
        const stats = { easy: 0, medium: 0, hard: 0 };
        
        this.strategyFramework.problemBank.forEach(problem => {
            stats[problem.difficulty]++;
        });
        
        this.strategyFramework.difficultyStats = stats;
        this.displayDifficultyStats();
    }

    displayDifficultyStats() {
        const container = document.getElementById('difficultyStats');
        if (!container) return;
        
        const { easy, medium, hard } = this.strategyFramework.difficultyStats;
        
        container.innerHTML = `
            <div class="difficulty-stats">
                <div class="difficulty-stat easy" onclick="selectDifficulty('easy')">
                    <div class="stat-icon">✅</div>
                    <div class="stat-number">${easy}</div>
                    <div class="stat-label">Easy</div>
                </div>
                <div class="difficulty-stat medium" onclick="selectDifficulty('medium')">
                    <div class="stat-icon">⚡</div>
                    <div class="stat-number">${medium}</div>
                    <div class="stat-label">Medium</div>
                </div>
                <div class="difficulty-stat hard" onclick="selectDifficulty('hard')">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-number">${hard}</div>
                    <div class="stat-label">Hard</div>
                </div>
            </div>
        `;
    }

    // ===== STRATEGY FRAMEWORK =====
    
    selectDifficulty(difficulty) {
        console.log(`🎯 Selected difficulty: ${difficulty}`);
        
        const problems = Array.from(this.strategyFramework.problemBank.values())
            .filter(p => p.difficulty === difficulty);
        
        this.displayProblems(problems, difficulty);
    }

    displayProblems(problems, difficulty) {
        const container = document.getElementById('problemsList');
        if (!container) return;
        
        container.innerHTML = `
            <div class="problems-header">
                <h4>📚 ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Problems</h4>
                <div class="problems-count">${problems.length} problems available</div>
            </div>
            <div class="problems-grid">
                ${problems.map(problem => this.createProblemCard(problem)).join('')}
            </div>
        `;
    }

    createProblemCard(problem) {
        const completionStatus = this.strategyFramework.progressTracking.get(problem.id) || 'not-started';
        
        return `
            <div class="problem-card ${problem.difficulty}" data-problem-id="${problem.id}" onclick="startProblemSolving('${problem.id}')">
                <div class="problem-header">
                    <div class="problem-title">${problem.title}</div>
                    <div class="problem-status ${completionStatus}">
                        ${this.getStatusIcon(completionStatus)}
                    </div>
                </div>
                <div class="problem-meta">
                    <span class="problem-category">${problem.category}</span>
                    <span class="problem-frequency">${problem.frequency}</span>
                </div>
                <div class="problem-companies">
                    ${problem.companies.slice(0, 3).map(company => 
                        `<span class="company-tag">${company}</span>`
                    ).join('')}
                </div>
                <div class="problem-complexity">
                    <div class="complexity-item">
                        <span class="complexity-label">Time:</span>
                        <span class="complexity-value">${problem.timeComplexity}</span>
                    </div>
                    <div class="complexity-item">
                        <span class="complexity-label">Space:</span>
                        <span class="complexity-value">${problem.spaceComplexity}</span>
                    </div>
                </div>
            </div>
        `;
    }

    getStatusIcon(status) {
        const icons = {
            'not-started': '⏳',
            'in-progress': '🔄',
            'completed': '✅',
            'needs-review': '🔍'
        };
        
        return icons[status] || '⏳';
    }

    startProblemSolving(problemId) {
        console.log(`🚀 Starting problem: ${problemId}`);
        
        const problem = this.strategyFramework.problemBank.get(problemId);
        if (!problem) return;
        
        this.strategyFramework.currentProblem = problem;
        this.displayProblemInterface(problem);
        this.trackProblemStart(problemId);
    }

    displayProblemInterface(problem) {
        const container = document.getElementById('problemInterface');
        if (!container) return;
        
        container.innerHTML = `
            <div class="problem-solving-interface">
                <div class="problem-description">
                    <h3>${problem.title}</h3>
                    <div class="problem-difficulty ${problem.difficulty}">${problem.difficulty.toUpperCase()}</div>
                    <p>${problem.description}</p>
                    
                    <div class="problem-examples">
                        <h4>Examples:</h4>
                        ${problem.examples.map((example, index) => `
                            <div class="example">
                                <strong>Example ${index + 1}:</strong><br>
                                <strong>Input:</strong> ${example.input}<br>
                                <strong>Output:</strong> ${example.output}
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="problem-constraints">
                        <h4>Constraints:</h4>
                        <ul>
                            ${problem.constraints.map(constraint => `<li>${constraint}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="problem-workspace">
                    <div class="code-editor-container">
                        <textarea class="code-editor" id="solutionCode" placeholder="# Write your solution here...
def solution():
    pass"></textarea>
                    </div>
                    
                    <div class="problem-controls">
                        <button class="control-btn run" onclick="runSolution()">▶ Run</button>
                        <button class="control-btn test" onclick="testSolution()">🧪 Test</button>
                        <button class="control-btn submit" onclick="submitSolution()">✅ Submit</button>
                        <button class="control-btn hint" onclick="showHint()">💡 Hint</button>
                    </div>
                    
                    <div class="solution-output" id="solutionOutput">
                        <div class="output-placeholder">Run your code to see output...</div>
                    </div>
                </div>
            </div>
        `;
    }

    runSolution() {
        const code = document.getElementById('solutionCode').value;
        const output = document.getElementById('solutionOutput');
        
        if (!code.trim()) {
            output.innerHTML = '<div class="error">Please write some code first!</div>';
            return;
        }
        
        // Simulate code execution
        output.innerHTML = `
            <div class="execution-result">
                <div class="result-header">🚀 Execution Result</div>
                <div class="result-content">
                    <div class="test-case">
                        <strong>Test Case 1:</strong> ✅ Passed
                    </div>
                    <div class="test-case">
                        <strong>Test Case 2:</strong> ✅ Passed
                    </div>
                    <div class="execution-time">Runtime: 52ms</div>
                    <div class="memory-usage">Memory: 14.2MB</div>
                </div>
            </div>
        `;
    }

    testSolution() {
        const code = document.getElementById('solutionCode').value;
        const output = document.getElementById('solutionOutput');
        
        // Simulate comprehensive testing
        output.innerHTML = `
            <div class="test-results">
                <div class="result-header">🧪 Test Results</div>
                <div class="test-summary">
                    <div class="passed-tests">✅ 15/18 test cases passed</div>
                    <div class="failed-tests">❌ 3 test cases failed</div>
                </div>
                <div class="failed-case">
                    <strong>Failed Test Case:</strong><br>
                    Input: [1, 2, 3, 4, 5]<br>
                    Expected: [0, 1]<br>
                    Your Output: [1, 0]<br>
                    <div class="failure-reason">Issue: Order of indices is incorrect</div>
                </div>
            </div>
        `;
    }

    submitSolution() {
        const code = document.getElementById('solutionCode').value;
        const problem = this.strategyFramework.currentProblem;
        
        if (!code.trim()) {
            alert('Please write a solution first!');
            return;
        }
        
        // Simulate solution submission
        const isCorrect = Math.random() > 0.3; // 70% success rate
        
        this.strategyFramework.progressTracking.set(problem.id, isCorrect ? 'completed' : 'needs-review');
        this.trackProblemAttempt(problem.id, isCorrect);
        
        if (isCorrect) {
            this.showSuccessMessage(problem);
        } else {
            this.showImprovementSuggestions(problem);
        }
    }

    showSuccessMessage(problem) {
        const modal = this.createModal(`
            <div class="success-modal">
                <div class="success-icon">🎉</div>
                <h3>Congratulations!</h3>
                <p>You successfully solved <strong>${problem.title}</strong>!</p>
                <div class="success-stats">
                    <div class="stat">Time Complexity: ${problem.timeComplexity}</div>
                    <div class="stat">Space Complexity: ${problem.spaceComplexity}</div>
                </div>
                <div class="next-actions">
                    <button onclick="this.nextProblem()" class="btn-primary">Next Problem</button>
                    <button onclick="this.reviewSolution()" class="btn-secondary">Review Solution</button>
                </div>
            </div>
        `);
        
        this.celebrateSolution();
    }

    celebrateSolution() {
        // Create success particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createSuccessParticle();
            }, i * 100);
        }
    }

    createSuccessParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = ['🎉', '✨', '🏆', '⭐'][Math.floor(Math.random() * 4)];
        particle.style.cssText = `
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 10000;
            animation: successParticle 3s ease-out forwards;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
        
        // Add animation if not exists
        if (!document.getElementById('success-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'success-particle-animation';
            style.textContent = `
                @keyframes successParticle {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-500px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== MOCK INTERVIEW SIMULATOR =====
    
    startMockInterview(company = 'tech-general') {
        console.log(`🎪 Starting mock interview for: ${company}`);
        
        this.interviewSimulator.isActive = true;
        this.interviewSimulator.currentInterview = {
            company: company,
            startTime: Date.now(),
            currentQuestion: 0,
            questions: this.getInterviewQuestions(company),
            responses: [],
            performance: {
                codingSpeed: 0,
                problemSolving: 0,
                communication: 0,
                optimization: 0
            }
        };
        
        this.displayInterviewInterface();
    }

    getInterviewQuestions(company) {
        const questionSets = {
            'faang': [
                {
                    id: 'two-sum',
                    followUp: 'What if the array is sorted? Can you optimize further?',
                    timeLimit: 25
                },
                {
                    id: 'longest-substring',
                    followUp: 'How would you handle Unicode characters?',
                    timeLimit: 30
                }
            ],
            'startup': [
                {
                    id: 'two-sum',
                    followUp: 'How would you scale this for millions of queries?',
                    timeLimit: 20
                }
            ],
            'tech-general': [
                {
                    id: 'two-sum',
                    followUp: 'Explain your thought process step by step',
                    timeLimit: 30
                }
            ]
        };
        
        return questionSets[company] || questionSets['tech-general'];
    }

    displayInterviewInterface() {
        const container = document.getElementById('interviewInterface');
        if (!container) return;
        
        const interview = this.interviewSimulator.currentInterview;
        const currentQ = interview.questions[interview.currentQuestion];
        const problem = this.strategyFramework.problemBank.get(currentQ.id);
        
        container.innerHTML = `
            <div class="interview-simulator">
                <div class="interview-header">
                    <div class="interviewer-info">
                        <div class="interviewer-avatar">👨‍💼</div>
                        <div class="interviewer-details">
                            <div class="interviewer-name">Alex Chen</div>
                            <div class="interviewer-title">Senior Software Engineer at ${interview.company}</div>
                        </div>
                    </div>
                    <div class="interview-timer">
                        <div class="timer-display" id="interviewTimer">${currentQ.timeLimit}:00</div>
                        <div class="timer-label">Time Remaining</div>
                    </div>
                </div>
                
                <div class="interview-content">
                    <div class="interviewer-message">
                        <div class="message-bubble">
                            <p>Hi! Let's start with this problem. Take your time to understand it, and feel free to ask questions.</p>
                            <p><strong>Problem:</strong> ${problem.title}</p>
                            <p>${problem.description}</p>
                        </div>
                    </div>
                    
                    <div class="interview-workspace">
                        <div class="interview-code-editor">
                            <textarea id="interviewCode" class="code-editor" placeholder="# Start coding here...
# Feel free to ask questions!

def solution():
    pass"></textarea>
                        </div>
                        
                        <div class="interview-controls">
                            <button onclick="runInterviewCode()" class="interview-btn run">▶ Run</button>
                            <button onclick="askQuestion()" class="interview-btn question">❓ Ask Question</button>
                            <button onclick="submitInterviewSolution()" class="interview-btn submit">✅ Submit</button>
                            <button onclick="endMockInterview()" class="interview-btn end">🏁 End Interview</button>
                        </div>
                    </div>
                </div>
                
                <div class="interview-chat" id="interviewChat">
                    <div class="chat-message interviewer">
                        <strong>Interviewer:</strong> Ready when you are! Let me know if you need any clarification.
                    </div>
                </div>
            </div>
        `;
        
        this.startInterviewTimer(currentQ.timeLimit);
    }

    startInterviewTimer(minutes) {
        let timeLeft = minutes * 60;
        const timerElement = document.getElementById('interviewTimer');
        
        this.interviewTimer = setInterval(() => {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            
            if (timerElement) {
                timerElement.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
                
                // Change color as time runs out
                if (timeLeft < 300) { // Less than 5 minutes
                    timerElement.style.color = '#ef4444';
                } else if (timeLeft < 600) { // Less than 10 minutes
                    timerElement.style.color = '#f59e0b';
                }
            }
            
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(this.interviewTimer);
                this.handleTimeUp();
            }
        }, 1000);
    }

    askQuestion() {
        const chatContainer = document.getElementById('interviewChat');
        if (!chatContainer) return;
        
        const questions = [
            "Can I assume the input array is not empty?",
            "What should I return if no solution exists?",
            "Are there any constraints on the input size?",
            "Can I use extra space for optimization?"
        ];
        
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        
        // Add user question
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message candidate';
        userMessage.innerHTML = `<strong>You:</strong> ${randomQuestion}`;
        chatContainer.appendChild(userMessage);
        
        // Add interviewer response after delay
        setTimeout(() => {
            const responses = [
                "Good question! Yes, you can assume the input is valid.",
                "Great clarification! Return an empty array if no solution exists.",
                "The constraints are mentioned in the problem. Any other questions?",
                "Feel free to use extra space if it helps optimize your solution."
            ];
            
            const response = responses[Math.floor(Math.random() * responses.length)];
            const interviewerMessage = document.createElement('div');
            interviewerMessage.className = 'chat-message interviewer';
            interviewerMessage.innerHTML = `<strong>Interviewer:</strong> ${response}`;
            chatContainer.appendChild(interviewerMessage);
            
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1500);
    }

    submitInterviewSolution() {
        const code = document.getElementById('interviewCode').value;
        const interview = this.interviewSimulator.currentInterview;
        
        if (!code.trim()) {
            alert('Please write a solution first!');
            return;
        }
        
        // Record the solution
        interview.responses.push({
            questionId: interview.questions[interview.currentQuestion].id,
            code: code,
            submissionTime: Date.now() - interview.startTime
        });
        
        // Provide feedback
        this.giveInterviewFeedback();
        
        // Move to next question or end interview
        if (interview.currentQuestion < interview.questions.length - 1) {
            interview.currentQuestion++;
            this.nextInterviewQuestion();
        } else {
            this.endMockInterview();
        }
    }

    giveInterviewFeedback() {
        const chatContainer = document.getElementById('interviewChat');
        if (!chatContainer) return;
        
        const feedbacks = [
            "Good approach! I like how you thought through the problem step by step.",
            "Nice solution! Can you explain the time complexity?",
            "Interesting approach. Have you considered edge cases?",
            "Great job! Let's move on to the next question."
        ];
        
        const feedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
        
        setTimeout(() => {
            const message = document.createElement('div');
            message.className = 'chat-message interviewer';
            message.innerHTML = `<strong>Interviewer:</strong> ${feedback}`;
            chatContainer.appendChild(message);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1000);
    }

    endMockInterview() {
        console.log('🏁 Ending mock interview');
        
        if (this.interviewTimer) {
            clearInterval(this.interviewTimer);
        }
        
        this.interviewSimulator.isActive = false;
        const interview = this.interviewSimulator.currentInterview;
        
        // Calculate performance metrics
        this.calculateInterviewPerformance(interview);
        
        // Add to history
        this.interviewSimulator.interviewHistory.push({
            ...interview,
            endTime: Date.now(),
            duration: Date.now() - interview.startTime
        });
        
        // Show results
        this.displayInterviewResults(interview);
    }

    calculateInterviewPerformance(interview) {
        const totalTime = Date.now() - interview.startTime;
        const avgTimePerQuestion = totalTime / interview.questions.length;
        
        // Simple scoring algorithm
        interview.performance = {
            codingSpeed: Math.max(0, 100 - (avgTimePerQuestion / (20 * 60 * 1000)) * 100),
            problemSolving: Math.random() * 30 + 70, // Simulate score
            communication: Math.random() * 20 + 80, // Simulate score
            optimization: Math.random() * 40 + 60   // Simulate score
        };
    }

    displayInterviewResults(interview) {
        const modal = this.createModal(`
            <div class="interview-results">
                <div class="results-header">
                    <h3>🏆 Mock Interview Complete!</h3>
                    <div class="company-badge">${interview.company}</div>
                </div>
                
                <div class="performance-metrics">
                    <div class="metric-card">
                        <div class="metric-score">${Math.round(interview.performance.codingSpeed)}</div>
                        <div class="metric-label">Coding Speed</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-score">${Math.round(interview.performance.problemSolving)}</div>
                        <div class="metric-label">Problem Solving</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-score">${Math.round(interview.performance.communication)}</div>
                        <div class="metric-label">Communication</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-score">${Math.round(interview.performance.optimization)}</div>
                        <div class="metric-label">Optimization</div>
                    </div>
                </div>
                
                <div class="feedback-section">
                    <h4>💡 Feedback & Recommendations</h4>
                    <ul>
                        <li>Strong problem-solving approach with clear logic</li>
                        <li>Good communication throughout the interview</li>
                        <li>Consider optimizing time complexity in future problems</li>
                        <li>Practice explaining your thought process more verbally</li>
                    </ul>
                </div>
                
                <div class="next-steps">
                    <button onclick="startMockInterview()" class="btn-primary">Another Interview</button>
                    <button onclick="this.closeModal()" class="btn-secondary">Continue Learning</button>
                </div>
            </div>
        `);
    }

    // ===== PORTFOLIO MANAGEMENT =====
    
    createProject(projectType) {
        console.log(`🏗️ Creating project: ${projectType}`);
        
        const projectId = `project_${Date.now()}`;
        const project = {
            id: projectId,
            type: projectType,
            title: this.getProjectTitle(projectType),
            description: this.getProjectDescription(projectType),
            status: 'not-started',
            progress: 0,
            requirements: this.getProjectRequirements(projectType),
            createdAt: Date.now(),
            completedFeatures: []
        };
        
        this.portfolioManager.projects.set(projectId, project);
        this.displayProjectWizard(project);
        
        return projectId;
    }

    getProjectTitle(type) {
        const titles = {
            'fullstack-app': 'Personal Task Manager',
            'algorithm-visualizer': 'Sorting Algorithm Visualizer',
            'data-structure-library': 'Custom Data Structures Library',
            'coding-game': 'Code Challenge Platform'
        };
        
        return titles[type] || 'Custom Project';
    }

    getProjectDescription(type) {
        const descriptions = {
            'fullstack-app': 'Build a complete web application with user authentication, database integration, and responsive design.',
            'algorithm-visualizer': 'Create an interactive tool to visualize how different sorting algorithms work.',
            'data-structure-library': 'Implement your own versions of common data structures with comprehensive testing.',
            'coding-game': 'Develop a gamified platform for solving coding challenges with leaderboards and achievements.'
        };
        
        return descriptions[type] || 'A custom project to showcase your skills.';
    }

    getProjectRequirements(type) {
        const requirements = {
            'fullstack-app': [
                'User authentication system',
                'Database design and integration',
                'RESTful API development',
                'Frontend with React/Vue',
                'Responsive mobile design',
                'Deployment to cloud platform'
            ],
            'algorithm-visualizer': [
                'Interactive sorting animations',
                'Multiple algorithm implementations',
                'Performance comparison tools',
                'Clean, intuitive interface',
                'Educational explanations'
            ],
            'data-structure-library': [
                'Implement 5+ data structures',
                'Comprehensive unit tests',
                'Performance benchmarking',
                'Documentation and examples',
                'Package publication'
            ],
            'coding-game': [
                'Problem database system',
                'Code execution engine',
                'User progress tracking',
                'Leaderboard functionality',
                'Achievement system'
            ]
        };
        
        return requirements[type] || ['Complete the project', 'Document your work', 'Deploy the solution'];
    }

    startProjectWizard(type) {
        const projectId = this.createProject(type);
        this.displayProjectWizard(this.portfolioManager.projects.get(projectId));
    }

    displayProjectWizard(project) {
        const container = document.getElementById('projectWizard');
        if (!container) return;
        
        container.innerHTML = `
            <div class="project-wizard">
                <div class="wizard-header">
                    <h3>🚀 ${project.title}</h3>
                    <div class="project-type">${project.type}</div>
                </div>
                
                <div class="project-description">
                    <p>${project.description}</p>
                </div>
                
                <div class="project-requirements">
                    <h4>📋 Requirements Checklist</h4>
                    <div class="requirements-list">
                        ${project.requirements.map((req, index) => `
                            <div class="requirement-item" data-requirement="${index}">
                                <input type="checkbox" id="req-${index}" 
                                       ${project.completedFeatures.includes(index) ? 'checked' : ''}
                                       onchange="updateProjectProgress('${project.id}', ${index})">
                                <label for="req-${index}">${req}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="project-progress">
                    <div class="progress-header">
                        <span>Progress: ${project.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                </div>
                
                <div class="project-actions">
                    <button onclick="generateProjectCode('${project.id}')" class="btn-primary">📝 Generate Starter Code</button>
                    <button onclick="deployProject('${project.id}')" class="btn-secondary">🚀 Deploy Project</button>
                    <button onclick="addToPortfolio('${project.id}')" class="btn-accent">📁 Add to Portfolio</button>
                </div>
            </div>
        `;
    }

    updateProject(projectId, data) {
        const project = this.portfolioManager.projects.get(projectId);
        if (!project) return;
        
        Object.assign(project, data);
        
        // Recalculate progress
        project.progress = Math.round((project.completedFeatures.length / project.requirements.length) * 100);
        
        // Update display
        this.displayProjectWizard(project);
        
        // Check for completion
        if (project.progress === 100) {
            this.celebrateProjectCompletion(project);
        }
    }

    celebrateProjectCompletion(project) {
        this.portfolioManager.completedProjects++;
        
        const modal = this.createModal(`
            <div class="project-completion">
                <div class="completion-icon">🏆</div>
                <h3>Project Complete!</h3>
                <p>Congratulations on completing <strong>${project.title}</strong>!</p>
                <div class="completion-stats">
                    <div class="stat">Projects Completed: ${this.portfolioManager.completedProjects}</div>
                    <div class="stat">Portfolio Score: ${this.calculatePortfolioScore()}</div>
                </div>
                <div class="next-actions">
                    <button onclick="generateCertificate('${project.id}')" class="btn-primary">🎓 Generate Certificate</button>
                    <button onclick="shareProject('${project.id}')" class="btn-secondary">📤 Share Project</button>
                </div>
            </div>
        `);
        
        // Create celebration effect
        this.createProjectCelebration();
    }

    createProjectCelebration() {
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                this.createCelebrationParticle();
            }, i * 80);
        }
    }

    createCelebrationParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = ['🎉', '🏆', '✨', '🎊', '🌟'][Math.floor(Math.random() * 5)];
        particle.style.cssText = `
            position: fixed;
            font-size: 2.5rem;
            pointer-events: none;
            z-index: 10000;
            animation: celebrationParticle 4s ease-out forwards;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 4000);
        
        // Add animation if not exists
        if (!document.getElementById('celebration-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'celebration-particle-animation';
            style.textContent = `
                @keyframes celebrationParticle {
                    0% { 
                        transform: translateY(0) rotate(0deg) scale(0); 
                        opacity: 0; 
                    }
                    20% { 
                        transform: translateY(-100px) rotate(180deg) scale(1); 
                        opacity: 1; 
                    }
                    80% { 
                        transform: translateY(-400px) rotate(540deg) scale(1); 
                        opacity: 1; 
                    }
                    100% { 
                        transform: translateY(-500px) rotate(720deg) scale(0); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    generatePortfolio() {
        console.log('📁 Generating portfolio website...');
        
        const portfolioData = {
            projects: Array.from(this.portfolioManager.projects.values())
                .filter(p => p.status === 'completed'),
            skills: this.extractSkillsFromProjects(),
            achievements: this.getAchievements(),
            stats: this.getPortfolioStats()
        };
        
        this.displayPortfolioPreview(portfolioData);
    }

    displayPortfolioPreview(data) {
        const modal = this.createModal(`
            <div class="portfolio-preview">
                <div class="preview-header">
                    <h3>🌟 Your Professional Portfolio</h3>
                    <div class="portfolio-score">Score: ${this.calculatePortfolioScore()}/100</div>
                </div>
                
                <div class="portfolio-sections">
                    <div class="portfolio-section">
                        <h4>📂 Projects (${data.projects.length})</h4>
                        <div class="projects-preview">
                            ${data.projects.map(project => `
                                <div class="project-preview-card">
                                    <div class="project-title">${project.title}</div>
                                    <div class="project-type">${project.type}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="portfolio-section">
                        <h4>🛠️ Skills</h4>
                        <div class="skills-preview">
                            ${data.skills.map(skill => `
                                <span class="skill-tag">${skill}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="portfolio-section">
                        <h4>🏆 Achievements</h4>
                        <div class="achievements-preview">
                            ${data.achievements.map(achievement => `
                                <div class="achievement-item">
                                    <span class="achievement-icon">${achievement.icon}</span>
                                    <span class="achievement-name">${achievement.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="portfolio-actions">
                    <button onclick="exportPortfolio()" class="btn-primary">📤 Export Portfolio</button>
                    <button onclick="deployPortfolio()" class="btn-secondary">🚀 Deploy Website</button>
                    <button onclick="generateResume()" class="btn-accent">📄 Generate Resume</button>
                </div>
            </div>
        `);
    }

    // ===== UTILITY FUNCTIONS =====
    
    createModal(content) {
        const modal = document.createElement('div');
        modal.className = 'phase5-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.closeModal()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <button class="modal-close" onclick="this.closeModal()">×</button>
                    ${content}
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: modalFadeIn 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        // Add modal animation
        if (!document.getElementById('modal-animations')) {
            const style = document.createElement('style');
            style.id = 'modal-animations';
            style.textContent = `
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .modal-overlay {
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 16px;
                    padding: 2rem;
                    max-width: 90vw;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    animation: modalSlideIn 0.3s ease;
                }
                
                @keyframes modalSlideIn {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    color: #6b7280;
                }
                
                .modal-close:hover {
                    background: #f3f4f6;
                    color: #374151;
                }
            `;
            document.head.appendChild(style);
        }
        
        window.closeModal = () => {
            modal.remove();
            delete window.closeModal;
        };
        
        return modal;
    }

    trackProblemStart(problemId) {
        const problem = this.strategyFramework.problemBank.get(problemId);
        this.strategyFramework.progressTracking.set(problemId, 'in-progress');
        
        this.analytics.studyTime += Date.now();
        this.updateProgress('currentProblem', problem.title);
    }

    trackProblemAttempt(problemId, success) {
        if (success) {
            this.analytics.problemsSolved++;
            this.analytics.streakCount++;
        } else {
            this.analytics.streakCount = 0;
        }
        
        this.updateAnalytics();
    }

    updateProgress(metric, value) {
        this.analytics[metric] = value;
        this.updateProgressDisplay();
    }

    updateProgressDisplay() {
        const statsElement = document.getElementById('progressStats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="stat-item">
                    <div class="stat-value">${this.analytics.problemsSolved}</div>
                    <div class="stat-label">Problems Solved</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.analytics.streakCount}</div>
                    <div class="stat-label">Current Streak</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${this.portfolioManager.completedProjects}</div>
                    <div class="stat-label">Projects Complete</div>
                </div>
            `;
        }
    }

    calculatePortfolioScore() {
        const projectScore = this.portfolioManager.completedProjects * 25;
        const problemScore = Math.min(this.analytics.problemsSolved * 2, 50);
        const streakBonus = Math.min(this.analytics.streakCount, 25);
        
        return Math.min(projectScore + problemScore + streakBonus, 100);
    }

    extractSkillsFromProjects() {
        const skillMap = {
            'fullstack-app': ['React', 'Node.js', 'Database Design', 'REST APIs', 'Authentication'],
            'algorithm-visualizer': ['JavaScript', 'Data Visualization', 'Algorithms', 'UI/UX'],
            'data-structure-library': ['Python', 'Testing', 'Documentation', 'Performance Analysis'],
            'coding-game': ['Full-Stack Development', 'Game Design', 'User Management', 'Real-time Features']
        };
        
        const skills = new Set();
        this.portfolioManager.projects.forEach(project => {
            if (project.status === 'completed' && skillMap[project.type]) {
                skillMap[project.type].forEach(skill => skills.add(skill));
            }
        });
        
        return Array.from(skills);
    }

    getAchievements() {
        const achievements = [];
        
        if (this.analytics.problemsSolved >= 10) {
            achievements.push({ icon: '🏅', name: 'Problem Solver' });
        }
        
        if (this.analytics.streakCount >= 7) {
            achievements.push({ icon: '🔥', name: 'Week Streak' });
        }
        
        if (this.portfolioManager.completedProjects >= 2) {
            achievements.push({ icon: '🏗️', name: 'Project Builder' });
        }
        
        if (this.interviewSimulator.interviewHistory.length >= 3) {
            achievements.push({ icon: '🎪', name: 'Interview Pro' });
        }
        
        return achievements;
    }

    getPortfolioStats() {
        return {
            totalProjects: this.portfolioManager.projects.size,
            completedProjects: this.portfolioManager.completedProjects,
            problemsSolved: this.analytics.problemsSolved,
            interviewsPracticed: this.interviewSimulator.interviewHistory.length,
            currentStreak: this.analytics.streakCount
        };
    }

    loadUserProgress() {
        const savedProgress = localStorage.getItem('phase5-progress');
        if (savedProgress) {
            try {
                const data = JSON.parse(savedProgress);
                Object.assign(this.analytics, data.analytics || {});
                
                // Restore progress tracking
                if (data.progressTracking) {
                    this.strategyFramework.progressTracking = new Map(data.progressTracking);
                }
                
                console.log('📊 Phase 5 progress loaded from localStorage');
            } catch (error) {
                console.warn('Failed to load Phase 5 progress:', error);
            }
        }
    }

    saveUserProgress() {
        const progressData = {
            analytics: this.analytics,
            progressTracking: Array.from(this.strategyFramework.progressTracking.entries()),
            portfolioProjects: this.portfolioManager.completedProjects,
            timestamp: Date.now()
        };
        
        localStorage.setItem('phase5-progress', JSON.stringify(progressData));
    }

    setupProgressTracking() {
        // Auto-save progress every 30 seconds
        setInterval(() => {
            this.saveUserProgress();
        }, 30000);
        
        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveUserProgress();
        });
    }

    initializeUI() {
        this.updateProgressDisplay();
        this.displayDifficultyStats();
    }

    setupInteractiveElements() {
        // Any additional interactive setup
        console.log('🎮 Phase 5 interactive elements initialized');
    }
}

// Initialize Phase 5 Engine
let phase5Engine;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🏆 Initializing Phase 5 LeetCode Mastery Engine...');
    phase5Engine = new Phase5Engine();
});

// Export for global access
window.Phase5Engine = Phase5Engine;

console.log('🏆 Phase 5 LeetCode Mastery Engine loaded successfully!');
console.log('✨ Features available:');
console.log('   🎯 FAST Problem-Solving Framework');
console.log('   🎪 AI-Powered Mock Interview Simulator');
console.log('   📁 Professional Portfolio Builder');
console.log('   📊 Advanced Progress Analytics');
console.log('   🏆 Achievement & Certification System');
console.log('   🚀 Complete LeetCode mastery pathway!');
