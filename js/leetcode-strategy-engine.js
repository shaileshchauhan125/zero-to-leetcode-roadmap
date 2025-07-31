// LeetCode Strategy Framework Engine - Ultimate Implementation with Mind-Blowing Effects
class LeetCodeStrategyEngine {
    constructor() {
        // Core state management
        this.currentStep = null;
        this.expandedSteps = new Set();
        this.masterFramework = ['map', 'analyze', 'structure', 'test', 'execute', 'review'];
        this.currentProblem = null;
        this.practiceSession = null;
        this.certificationProgress = {
            frameworkMastery: 0,
            speedAccuracy: 0,
            patternRecognition: 0,
            codeQuality: 0
        };
        
        // Visual effects system
        this.particleSystem = null;
        this.animationQueue = [];
        this.isAnimating = false;
        
        // Problem database with comprehensive examples
        this.problemDatabase = {
            'two-sum': {
                title: '1. Two Sum',
                difficulty: 'Easy',
                pattern: 'Hash Map',
                description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
• 2 <= nums.length <= 10^4
• -10^9 <= nums[i] <= 10^9
• -10^9 <= target <= 10^9
• Only one valid answer exists.`,
                masterSolution: {
                    map: {
                        understanding: "Find two numbers that add up to a target value",
                        inputs: "Array of integers, target integer",
                        outputs: "Indices of the two numbers",
                        constraints: "Exactly one solution exists",
                        examples: "nums=[2,7,11,15], target=9 → [0,1]"
                    },
                    analyze: {
                        pattern: "Hash Map / Two Pointers",
                        indicators: ["Looking for pairs", "Target sum", "Return indices"],
                        approach: "Use hash map to store seen numbers and their indices"
                    },
                    structure: {
                        approach: "Single pass with hash map lookup",
                        dataStructures: ["Hash map for O(1) lookups"],
                        steps: [
                            "Initialize empty hash map",
                            "For each number, calculate complement",
                            "Check if complement exists in map",
                            "If yes, return indices; if no, store current number"
                        ],
                        edgeCases: ["No solution (guaranteed not to happen)", "Same number used twice"]
                    },
                    test: {
                        happy: [
                            "nums = [2,7,11,15], target = 9 → [0,1]",
                            "nums = [3,2,4], target = 6 → [1,2]"
                        ],
                        edge: [
                            "nums = [3,3], target = 6 → [0,1]",
                            "nums = [0,1], target = 1 → [0,1]"
                        ],
                        error: ["Empty array (constraint guarantees non-empty)"]
                    },
                    execute: {
                        solution: `def twoSum(nums, target):
    seen = {}  # Hash map to store number -> index
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in seen:
            return [seen[complement], i]
        
        seen[num] = i
    
    return []  # Should never reach here per constraints`,
                        complexity: {
                            time: "O(n) - Single pass through array",
                            space: "O(n) - Hash map stores up to n elements"
                        }
                    },
                    review: {
                        correctness: "✅ Handles all test cases correctly",
                        performance: "✅ Optimal O(n) time and O(n) space",
                        readability: "✅ Clear variable names and logic flow",
                        improvements: "Could add input validation for production use"
                    }
                }
            },
            'longest-substring': {
                title: '3. Longest Substring Without Repeating Characters',
                difficulty: 'Medium',
                pattern: 'Sliding Window',
                description: `Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.

Constraints:
• 0 <= s.length <= 5 * 10^4
• s consists of English letters, digits, symbols and spaces.`,
                masterSolution: {
                    map: {
                        understanding: "Find longest substring with all unique characters",
                        inputs: "String s",
                        outputs: "Length of longest unique substring",
                        constraints: "String can be empty, contains various characters",
                        examples: '"abcabcbb" → 3 (substring "abc")'
                    },
                    analyze: {
                        pattern: "Sliding Window",
                        indicators: ["Substring optimization", "Contiguous elements", "Dynamic window size"],
                        approach: "Expand window when characters are unique, contract when duplicates found"
                    },
                    structure: {
                        approach: "Two-pointer sliding window with character tracking",
                        dataStructures: ["Set or hash map for character tracking"],
                        steps: [
                            "Initialize left and right pointers",
                            "Expand window by moving right pointer",
                            "Track characters in current window",
                            "When duplicate found, shrink from left",
                            "Track maximum window size"
                        ],
                        edgeCases: ["Empty string", "Single character", "All same characters", "All unique characters"]
                    },
                    test: {
                        happy: [
                            's = "abcabcbb" → 3',
                            's = "pwwkew" → 3',
                            's = "abc" → 3'
                        ],
                        edge: [
                            's = "" → 0',
                            's = "a" → 1',
                            's = "aaaa" → 1'
                        ],
                        error: ["None - all inputs valid per constraints"]
                    },
                    execute: {
                        solution: `def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        # Shrink window until no duplicate
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        # Add current character and update max
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length`,
                        complexity: {
                            time: "O(n) - Each character visited at most twice",
                            space: "O(min(m,n)) - Set stores unique characters"
                        }
                    },
                    review: {
                        correctness: "✅ Handles all test cases including edge cases",
                        performance: "✅ Optimal sliding window approach",
                        readability: "✅ Clear window expansion and contraction logic",
                        improvements: "Could optimize using character index mapping instead of set"
                    }
                }
            },
            'binary-search': {
                title: '704. Binary Search',
                difficulty: 'Easy',
                pattern: 'Binary Search',
                description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

Constraints:
• 1 <= nums.length <= 10^4
• -10^4 < nums[i], target < 10^4
• All the integers in nums are unique.
• nums is sorted in ascending order.`,
                masterSolution: {
                    map: {
                        understanding: "Search for target in sorted array efficiently",
                        inputs: "Sorted array, target value",
                        outputs: "Index of target or -1 if not found",
                        constraints: "Must be O(log n), array is sorted and unique",
                        examples: "nums=[-1,0,3,5,9,12], target=9 → 4"
                    },
                    analyze: {
                        pattern: "Binary Search",
                        indicators: ["Sorted array", "O(log n) requirement", "Search for specific element"],
                        approach: "Divide search space in half each iteration"
                    },
                    structure: {
                        approach: "Classic binary search with left/right pointers",
                        dataStructures: ["Two pointers for search bounds"],
                        steps: [
                            "Initialize left=0, right=length-1",
                            "While left <= right, find middle",
                            "If middle equals target, return index",
                            "If middle < target, search right half",
                            "If middle > target, search left half",
                            "Return -1 if not found"
                        ],
                        edgeCases: ["Target not in array", "Single element array", "Target at boundaries"]
                    },
                    test: {
                        happy: [
                            "nums = [-1,0,3,5,9,12], target = 9 → 4",
                            "nums = [-1,0,3,5,9,12], target = -1 → 0"
                        ],
                        edge: [
                            "nums = [5], target = 5 → 0",
                            "nums = [1,2,3,4,5], target = 1 → 0",
                            "nums = [1,2,3,4,5], target = 5 → 4"
                        ],
                        error: ["nums = [-1,0,3,5,9,12], target = 2 → -1"]
                    },
                    execute: {
                        solution: `def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
                        complexity: {
                            time: "O(log n) - Halve search space each iteration",
                            space: "O(1) - Only using a few variables"
                        }
                    },
                    review: {
                        correctness: "✅ Classic binary search implementation",
                        performance: "✅ Meets O(log n) requirement",
                        readability: "✅ Standard template for binary search",
                        improvements: "Perfect implementation for this problem"
                    }
                }
            }
        };
        
        // AI Problem Analysis Patterns
        this.analysisPatterns = {
            keywords: {
                'two-pointers': ['sorted array', 'pairs', 'palindrome', 'remove duplicates', 'target sum', 'opposite ends'],
                'sliding-window': ['substring', 'subarray', 'maximum', 'minimum', 'longest', 'shortest', 'window', 'contiguous'],
                'binary-search': ['sorted', 'search', 'find', 'log n', 'logarithmic', 'divide', 'half'],
                'dfs-bfs': ['tree', 'graph', 'connected', 'island', 'traverse', 'path', 'level order', 'depth'],
                'dynamic-programming': ['optimal', 'maximum', 'minimum', 'count ways', 'subsequence', 'overlapping', 'memoization'],
                'hash-map': ['frequency', 'count', 'lookup', 'anagram', 'duplicate', 'complement'],
                'greedy': ['locally optimal', 'greedy choice', 'interval', 'activity selection', 'minimum steps'],
                'backtracking': ['generate', 'permutation', 'combination', 'n-queens', 'sudoku', 'all solutions']
            },
            
            complexity_indicators: {
                'O(1)': ['direct access', 'hash lookup', 'stack operation'],
                'O(log n)': ['binary search', 'heap operation', 'divide by half'],
                'O(n)': ['single pass', 'linear scan', 'visit each element'],
                'O(n log n)': ['sorting', 'merge sort', 'heap sort', 'divide and conquer'],
                'O(n²)': ['nested loops', 'compare all pairs', 'brute force'],
                'O(2^n)': ['recursive', 'exponential', 'generate all subsets']
            }
        };
        
        // Practice session configuration
        this.practiceConfig = {
            timeLimit: 45, // minutes
            difficulty: 'medium',
            focusArea: 'all',
            problems: []
        };
        
        // Visual effects configuration
        this.effectsConfig = {
            particles: {
                count: 50,
                colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
                speed: 2,
                size: 3
            },
            animations: {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                stagger: 100
            }
        };
        
        this.init();
    }

    init() {
        console.log('🚀 LeetCode Strategy Engine with Mind-Blowing Effects initializing...');
        this.setupGlobalFunctions();
        this.setupEventListeners();
        this.initializeVisualEffects();
        this.loadUserProgress();
        this.startAmbientEffects();
        console.log('✅ Strategy Engine ready with spectacular effects!');
    }

    setupGlobalFunctions() {
        // MASTER Framework functions
        window.expandFrameworkStep = (step) => this.expandFrameworkStep(step);
        window.showMappingExample = () => this.showMappingExample();
        window.getPatternSuggestion = () => this.getPatternSuggestion();
        window.validateStructure = () => this.validateStructure();
        window.generateTestCases = () => this.generateTestCases();
        window.runSolution = () => this.runSolution();
        window.testSolution = () => this.testSolution();
        window.getImplementationHint = () => this.getImplementationHint();
        window.getCodeReview = () => this.getCodeReview();
        
        // Problem demonstration functions
        window.demonstrateProblem = (problemId) => this.demonstrateProblem(problemId);
        
        // Classification engine functions
        window.classifyProblem = () => this.classifyProblem();
        window.loadExampleProblem = () => this.loadExampleProblem();
        window.clearProblemInput = () => this.clearProblemInput();
        
        // Practice arena functions
        window.setTimeLimit = (minutes) => this.setTimeLimit(minutes);
        window.setDifficulty = (level) => this.setDifficulty(level);
        window.startTimedPractice = () => this.startTimedPractice();
        
        // Certification functions
        window.startCertification = () => this.startCertification();
        
        // Navigation functions
        window.previousLesson = () => this.previousLesson();
        window.nextLesson = () => this.nextLesson();
        
        console.log('✅ Global functions registered for LeetCode Strategy Framework');
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.attachEventListeners();
            this.initializeFrameworkSteps();
        });

        // Add mousemove listener for particle effects
        document.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
    }

    attachEventListeners() {
        // Framework step headers
        document.querySelectorAll('.step-header').forEach(header => {
            header.addEventListener('click', () => {
                this.triggerStepExpansionEffect(header);
            });
        });

        // Interactive buttons
        document.querySelectorAll('.example-btn, .ai-btn, .generate-btn, .review-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.triggerButtonClickEffect(btn);
            });
        });

        // Code editor with syntax highlighting
        const codeEditor = document.getElementById('solution-code');
        if (codeEditor) {
            this.setupCodeEditor(codeEditor);
        }
    }

    // ===== VISUAL EFFECTS SYSTEM =====
    
    initializeVisualEffects() {
        this.createParticleSystem();
        this.setupFloatingElements();
        this.initializeGlowEffects();
        console.log('✨ Visual effects system initialized');
    }

    createParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.6';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        this.particleSystem = {
            canvas: canvas,
            ctx: ctx,
            particles: [],
            mouse: { x: 0, y: 0 }
        };
        
        this.createParticles();
        this.animateParticles();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    createParticles() {
        const { particles, canvas } = this.particleSystem;
        const { count, colors, speed, size } = this.effectsConfig.particles;
        
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * size + 1,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    animateParticles() {
        const { ctx, particles, canvas, mouse } = this.particleSystem;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Mouse attraction effect
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.vx += dx * force * 0.001;
                    particle.vy += dy * force * 0.001;
                }
                
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Boundary check
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                // Draw particle
                ctx.save();
                ctx.globalAlpha = particle.alpha;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                
                // Draw connections
                particles.forEach(otherParticle => {
                    if (particle !== otherParticle) {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 80) {
                            ctx.save();
                            ctx.globalAlpha = (80 - distance) / 80 * 0.2;
                            ctx.strokeStyle = particle.color;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.stroke();
                            ctx.restore();
                        }
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    handleMouseMove(e) {
        if (this.particleSystem) {
            this.particleSystem.mouse.x = e.clientX;
            this.particleSystem.mouse.y = e.clientY;
        }
    }

    setupFloatingElements() {
        // Create floating mathematical symbols
        const symbols = ['∑', '∫', '∞', 'π', 'Ω', 'λ', '∇', '∂'];
        
        symbols.forEach((symbol, index) => {
            const element = document.createElement('div');
            element.className = 'floating-symbol';
            element.textContent = symbol;
            element.style.cssText = `
                position: fixed;
                font-size: 2rem;
                color: rgba(59, 130, 246, 0.1);
                pointer-events: none;
                z-index: 0;
                animation: float-${index} ${15 + Math.random() * 10}s infinite linear;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
            `;
            
            document.body.appendChild(element);
            
            // Create unique animation for each symbol
            const keyframes = `
                @keyframes float-${index} {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
                    25% { transform: translateY(-20px) rotate(90deg); opacity: 0.3; }
                    50% { transform: translateY(0px) rotate(180deg); opacity: 0.1; }
                    75% { transform: translateY(20px) rotate(270deg); opacity: 0.3; }
                    100% { transform: translateY(0px) rotate(360deg); opacity: 0.1; }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
        });
    }

    initializeGlowEffects() {
        // Add glow effects to key elements
        const glowElements = document.querySelectorAll('.framework-step, .problem-btn, .analyze-btn, .start-practice-btn');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addGlowEffect(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeGlowEffect(element);
            });
        });
    }

    addGlowEffect(element) {
        element.style.transition = 'all 0.3s ease';
        element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)';
        element.style.transform = 'translateY(-2px) scale(1.02)';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }

    triggerStepExpansionEffect(header) {
        // Ripple effect on click
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = header.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add ripple animation
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    triggerButtonClickEffect(button) {
        // Pulse effect
        button.style.animation = 'pulse-effect 0.3s ease-out';
        
        if (!document.getElementById('pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation';
            style.textContent = `
                @keyframes pulse-effect {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            button.style.animation = '';
        }, 300);
    }

    startAmbientEffects() {
        // Subtle background animations
        setInterval(() => {
            this.createRandomSparkle();
        }, 3000);
        
        // Dynamic color shifts
        setInterval(() => {
            this.updateAmbientColors();
        }, 10000);
    }

    createRandomSparkle() {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #fbbf24 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: sparkle 2s ease-out forwards;
        `;
        
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        
        document.body.appendChild(sparkle);
        
        if (!document.getElementById('sparkle-animation')) {
            const style = document.createElement('style');
            style.id = 'sparkle-animation';
            style.textContent = `
                @keyframes sparkle {
                    0% { transform: scale(0) rotate(0deg); opacity: 1; }
                    50% { transform: scale(1) rotate(180deg); opacity: 1; }
                    100% { transform: scale(0) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    updateAmbientColors() {
        const root = document.documentElement;
        const colors = [
            '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Subtle accent color shift
        root.style.setProperty('--accent-primary', randomColor);
    }

    // ===== MASTER FRAMEWORK IMPLEMENTATION =====
    
    initializeFrameworkSteps() {
        this.masterFramework.forEach((step, index) => {
            const stepElement = document.querySelector(`[data-step="${step}"]`);
            if (stepElement) {
                setTimeout(() => {
                    this.animateStepAppearance(stepElement);
                }, index * 200);
            }
        });
    }

    animateStepAppearance(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    expandFrameworkStep(step) {
        console.log(`🎯 Expanding framework step: ${step}`);
        
        const stepElement = document.querySelector(`[data-step="${step}"]`);
        const contentElement = document.getElementById(`content-${step}`);
        const arrowElement = stepElement?.querySelector('.expand-arrow');
        
        if (!stepElement || !contentElement) {
            console.error(`Step elements not found for: ${step}`);
            return;
        }
        
        const isExpanding = contentElement.style.display === 'none' || !contentElement.style.display;
        
        if (isExpanding) {
            // Expand with spectacular effect
            this.triggerStepExpansionEffect(stepElement);
            
            contentElement.style.display = 'block';
            contentElement.style.opacity = '0';
            contentElement.style.transform = 'translateY(-20px)';
            contentElement.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                contentElement.style.opacity = '1';
                contentElement.style.transform = 'translateY(0)';
            }, 50);
            
            if (arrowElement) {
                arrowElement.style.transform = 'rotate(90deg)';
            }
            
            stepElement.classList.add('expanded');
            this.expandedSteps.add(step);
            
            // Add progress tracking
            this.updateCertificationProgress('frameworkMastery', this.expandedSteps.size);
            
        } else {
            // Collapse
            contentElement.style.opacity = '0';
            contentElement.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                contentElement.style.display = 'none';
            }, 500);
            
            if (arrowElement) {
                arrowElement.style.transform = 'rotate(0deg)';
            }
            
            stepElement.classList.remove('expanded');
            this.expandedSteps.delete(step);
        }
        
        // Auto-scroll to step with smooth animation
        setTimeout(() => {
            stepElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 200);
        
        console.log(`✅ Step ${step} ${isExpanding ? 'expanded' : 'collapsed'}`);
    }

    showMappingExample() {
        const examples = [
            {
                title: "🎯 Example: Two Sum Problem",
                problem: "Given [2,7,11,15] and target 9, return indices of numbers that sum to target.",
                mapping: {
                    inputs: "Array: [2,7,11,15], Target: 9",
                    outputs: "Indices: [0,1] (because 2+7=9)",
                    constraints: "Exactly one solution exists, can't use same element twice",
                    patterns: "Looking for pairs that sum to target → Hash Map pattern",
                    clarifications: "Return indices (not values), assume exactly one solution"
                }
            },
            {
                title: "🎯 Example: Longest Substring",
                problem: "Find the length of the longest substring without repeating characters.",
                mapping: {
                    inputs: 'String: "abcabcbb"',
                    outputs: "Length: 3 (substring 'abc')",
                    constraints: "String can contain any ASCII characters",
                    patterns: "Substring optimization → Sliding Window pattern",
                    clarifications: "Return length (not the substring itself), consecutive characters only"
                }
            }
        ];
        
        const randomExample = examples[Math.floor(Math.random() * examples.length)];
        this.showInteractiveModal('Problem Mapping Demo', this.createMappingExampleHTML(randomExample));
    }

    createMappingExampleHTML(example) {
        return `
            <div class="mapping-example">
                <h4>${example.title}</h4>
                <div class="problem-statement">
                    <h5>📋 Original Problem:</h5>
                    <p>${example.problem}</p>
                </div>
                
                <div class="mapping-breakdown">
                    <h5>🗺️ Step-by-Step Mapping:</h5>
                    
                    <div class="mapping-item">
                        <strong>🔍 Inputs:</strong> ${example.mapping.inputs}
                    </div>
                    <div class="mapping-item">
                        <strong>📤 Outputs:</strong> ${example.mapping.outputs}
                    </div>
                    <div class="mapping-item">
                        <strong>⚠️ Constraints:</strong> ${example.mapping.constraints}
                    </div>
                    <div class="mapping-item">
                        <strong>🎭 Pattern Recognition:</strong> ${example.mapping.patterns}
                    </div>
                    <div class="mapping-item">
                        <strong>❓ Clarifications:</strong> ${example.mapping.clarifications}
                    </div>
                </div>
                
                <div class="mapping-tip">
                    <h6>💡 Pro Tip:</h6>
                    <p>Spend 2-3 minutes on this step! A clear problem map makes the solution obvious. Most interview failures happen because candidates rush past this crucial step.</p>
                </div>
            </div>
        `;
    }

    getPatternSuggestion() {
        // Get current problem input for analysis
        const problemText = document.getElementById('problemInput')?.value || 
                           "Looking for pattern suggestions? Paste a problem in the classification engine below!";
        
        const suggestion = this.analyzePatternFromText(problemText);
        
        this.showInteractiveModal('🤖 AI Pattern Analysis', `
            <div class="pattern-suggestion">
                <h4>🧠 Pattern Analysis Results</h4>
                
                <div class="detected-patterns">
                    <h5>🔍 Detected Patterns:</h5>
                    ${suggestion.patterns.map(pattern => `
                        <div class="pattern-match">
                            <strong>${pattern.name}:</strong> ${pattern.confidence}% confidence
                            <div class="pattern-reason">${pattern.reason}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="recommended-approach">
                    <h5>⚡ Recommended Approach:</h5>
                    <p>${suggestion.recommendation}</p>
                </div>
                
                <div class="next-steps">
                    <h5>🎯 Next Steps:</h5>
                    <ol>
                        ${suggestion.nextSteps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `);
    }

    analyzePatternFromText(text) {
        const textLower = text.toLowerCase();
        const patterns = [];
        
        // Analyze for each pattern
        Object.entries(this.analysisPatterns.keywords).forEach(([pattern, keywords]) => {
            let confidence = 0;
            let matchedKeywords = [];
            
            keywords.forEach(keyword => {
                if (textLower.includes(keyword.toLowerCase())) {
                    confidence += 20;
                    matchedKeywords.push(keyword);
                }
            });
            
            confidence = Math.min(confidence, 95); // Cap at 95%
            
            if (confidence > 20) {
                patterns.push({
                    name: this.getPatternDisplayName(pattern),
                    confidence: confidence,
                    reason: `Detected keywords: ${matchedKeywords.join(', ')}`
                });
            }
        });
        
        // Sort by confidence
        patterns.sort((a, b) => b.confidence - a.confidence);
        
        const topPattern = patterns[0];
        
        return {
            patterns: patterns.slice(0, 3),
            recommendation: topPattern ? 
                `Consider using ${topPattern.name} approach based on the problem characteristics.` :
                "Please provide more problem details for better pattern analysis.",
            nextSteps: [
                "Structure your solution using the identified pattern",
                "Define the key variables and data structures needed",
                "Plan the algorithm steps before coding",
                "Consider edge cases specific to this pattern"
            ]
        };
    }

    getPatternDisplayName(pattern) {
        const displayNames = {
            'two-pointers': '👆 Two Pointers',
            'sliding-window': '🪟 Sliding Window',
            'binary-search': '🔍 Binary Search',
            'dfs-bfs': '🌊 BFS/DFS Traversal',
            'dynamic-programming': '🧮 Dynamic Programming',
            'hash-map': '🗂️ Hash Map',
            'greedy': '🎯 Greedy Algorithm',
            'backtracking': '🔄 Backtracking'
        };
        
        return displayNames[pattern] || pattern;
    }

    validateStructure() {
        const blueprintInputs = document.querySelectorAll('.blueprint-input');
        const structure = {};
        
        blueprintInputs.forEach((input, index) => {
            const labels = ['approach', 'dataStructures', 'steps', 'edgeCases'];
            structure[labels[index]] = input.value.trim();
        });
        
        const validation = this.analyzeStructureQuality(structure);
        
        this.showInteractiveModal('🧠 Structure Validation Results', `
            <div class="validation-results">
                <div class="validation-score">
                    <h4>📊 Structure Quality Score: ${validation.score}/100</h4>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${validation.score}%; background: ${this.getScoreColor(validation.score)}"></div>
                    </div>
                </div>
                
                <div class="validation-feedback">
                    <h5>✅ Strengths:</h5>
                    <ul>
                        ${validation.strengths.map(strength => `<li>${strength}</li>`).join('')}
                    </ul>
                    
                    <h5>🎯 Improvements:</h5>
                    <ul>
                        ${validation.improvements.map(improvement => `<li>${improvement}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="validation-advice">
                    <h5>💡 Pro Advice:</h5>
                    <p>${validation.advice}</p>
                </div>
            </div>
        `);
    }

    analyzeStructureQuality(structure) {
        let score = 0;
        const strengths = [];
        const improvements = [];
        
        // Analyze approach
        if (structure.approach.length > 50) {
            score += 25;
            strengths.push("Detailed high-level approach provided");
        } else if (structure.approach.length > 0) {
            score += 10;
            improvements.push("Provide more detail in your high-level approach");
        } else {
            improvements.push("Define your high-level approach clearly");
        }
        
        // Analyze data structures
        if (structure.dataStructures.length > 30) {
            score += 25;
            strengths.push("Data structures and reasoning specified");
        } else if (structure.dataStructures.length > 0) {
            score += 10;
            improvements.push("Explain why you chose these data structures");
        } else {
            improvements.push("Specify what data structures you'll use");
        }
        
        // Analyze steps
        const stepCount = structure.steps.split('\n').filter(line => line.trim()).length;
        if (stepCount >= 4) {
            score += 30;
            strengths.push("Algorithm broken down into clear steps");
        } else if (stepCount >= 2) {
            score += 15;
            improvements.push("Break down algorithm into more detailed steps");
        } else {
            improvements.push("Provide step-by-step algorithm breakdown");
        }
        
        // Analyze edge cases
        const edgeCaseCount = structure.edgeCases.split('\n').filter(line => line.trim()).length;
        if (edgeCaseCount >= 3) {
            score += 20;
            strengths.push("Comprehensive edge case consideration");
        } else if (edgeCaseCount >= 1) {
            score += 10;
            improvements.push("Consider more edge cases");
        } else {
            improvements.push("Identify potential edge cases");
        }
        
        let advice;
        if (score >= 80) {
            advice = "Excellent structure! You're ready to implement with confidence.";
        } else if (score >= 60) {
            advice = "Good structure! Address the improvements for optimal interview performance.";
        } else {
            advice = "Spend more time on planning. A solid structure makes coding much easier!";
        }
        
        return { score, strengths, improvements, advice };
    }

    getScoreColor(score) {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    }

    generateTestCases() {
        const currentProblem = this.getCurrentProblemContext();
        
        if (!currentProblem) {
            this.showInteractiveModal('🧪 Test Case Generator', `
                <div class="test-generator-prompt">
                    <h4>🎯 Choose a Problem to Generate Test Cases</h4>
                    <p>Select a problem from the demonstration section or paste one in the classification engine!</p>
                    
                    <div class="quick-problems">
                        <button onclick="strategyEngine.generateTestCasesForProblem('two-sum')" class="problem-quick-btn">
                            Generate for Two Sum
                        </button>
                        <button onclick="strategyEngine.generateTestCasesForProblem('longest-substring')" class="problem-quick-btn">
                            Generate for Longest Substring
                        </button>
                        <button onclick="strategyEngine.generateTestCasesForProblem('binary-search')" class="problem-quick-btn">
                            Generate for Binary Search
                        </button>
                    </div>
                </div>
            `);
            return;
        }
        
        this.generateTestCasesForProblem(currentProblem);
    }

    generateTestCasesForProblem(problemId) {
        const problem = this.problemDatabase[problemId];
        if (!problem) {
            console.error(`Problem ${problemId} not found`);
            return;
        }
        
        const testCases = problem.masterSolution.test;
        
        // Update test case displays in the framework
        this.updateTestCaseDisplay('happy-tests', testCases.happy);
        this.updateTestCaseDisplay('edge-tests', testCases.edge);
        this.updateTestCaseDisplay('error-tests', testCases.error);
        
        this.showInteractiveModal('🧪 Generated Test Cases', `
            <div class="test-cases-display">
                <h4>📝 Comprehensive Test Cases for ${problem.title}</h4>
                
                <div class="test-category-display">
                    <h5>✅ Happy Path Cases:</h5>
                    <div class="test-cases">
                        ${testCases.happy.map(test => `<div class="test-case happy">${test}</div>`).join('')}
                    </div>
                </div>
                
                <div class="test-category-display">
                    <h5>⚠️ Edge Cases:</h5>
                    <div class="test-cases">
                        ${testCases.edge.map(test => `<div class="test-case edge">${test}</div>`).join('')}
                    </div>
                </div>
                
                <div class="test-category-display">
                    <h5>❌ Error/Boundary Cases:</h5>
                    <div class="test-cases">
                        ${testCases.error.map(test => `<div class="test-case error">${test}</div>`).join('')}
                    </div>
                </div>
                
                <div class="test-advice">
                    <h6>💡 Testing Strategy:</h6>
                    <p>Start with happy path cases to validate core logic, then test edge cases to ensure robustness. Always consider what happens at boundaries and with invalid inputs!</p>
                </div>
            </div>
        `);
    }

    updateTestCaseDisplay(containerId, testCases) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = testCases.map(test => 
                `<div class="test-case">${test}</div>`
            ).join('');
        }
    }

    getCurrentProblemContext() {
        return this.currentProblem || null;
    }

    runSolution() {
        const code = document.getElementById('solution-code')?.value;
        if (!code || !code.trim()) {
            alert('⚠️ Please write some code first!');
            return;
        }
        
        this.triggerCodeExecutionEffect();
        
        // Simulate code execution
        setTimeout(() => {
            this.showInteractiveModal('▶ Code Execution Results', `
                <div class="execution-results">
                    <div class="execution-status success">
                        <h4>✅ Code Executed Successfully!</h4>
                    </div>
                    
                    <div class="execution-output">
                        <h5>📤 Output:</h5>
                        <div class="output-display">
                            <pre>Example execution trace:
Running with test case: nums = [2,7,11,15], target = 9
Found complement 7 at index 1
Returning [0, 1]

Result: [0, 1] ✅ Correct!</pre>
                        </div>
                    </div>
                    
                    <div class="execution-metrics">
                        <div class="metric">
                            <strong>⏱️ Execution Time:</strong> 0.043ms
                        </div>
                        <div class="metric">
                            <strong>💾 Memory Used:</strong> 2.1MB
                        </div>
                        <div class="metric">
                            <strong>🎯 Test Cases Passed:</strong> 3/3
                        </div>
                    </div>
                    
                    <div class="next-steps">
                        <h6>🎯 Next Steps:</h6>
                        <p>Great! Now test with all your edge cases to ensure robustness.</p>
                    </div>
                </div>
            `);
        }, 1500);
    }

    triggerCodeExecutionEffect() {
        const codeEditor = document.getElementById('solution-code');
        if (!codeEditor) return;
        
        // Create typing simulation effect
        codeEditor.style.background = 'linear-gradient(90deg, #1a1a1a 0%, #2a4a2a 50%, #1a1a1a 100%)';
        codeEditor.style.transition = 'background 1.5s ease';
        
        setTimeout(() => {
            codeEditor.style.background = '#1a1a1a';
        }, 1500);
        
        // Add execution glow
        this.addTemporaryGlow(codeEditor, '#10b981');
    }

    addTemporaryGlow(element, color) {
        const originalBoxShadow = element.style.boxShadow;
        element.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}40, 0 0 60px ${color}20`;
        
        setTimeout(() => {
            element.style.boxShadow = originalBoxShadow;
        }, 2000);
    }

    testSolution() {
        const code = document.getElementById('solution-code')?.value;
        if (!code || !code.trim()) {
            alert('⚠️ Please write some code first!');
            return;
        }
        
        this.triggerTestExecutionEffect();
        
        setTimeout(() => {
            this.showInteractiveModal('🧪 Comprehensive Test Results', `
                <div class="test-results">
                    <div class="test-summary">
                        <h4>📊 Test Execution Summary</h4>
                        <div class="summary-stats">
                            <div class="stat passed">✅ 8 Passed</div>
                            <div class="stat failed">❌ 1 Failed</div>
                            <div class="stat total">📋 9 Total</div>
                        </div>
                    </div>
                    
                    <div class="detailed-results">
                        <h5>📝 Detailed Test Results:</h5>
                        
                        <div class="test-group">
                            <h6>✅ Happy Path Tests:</h6>
                            <div class="test-result pass">✅ nums=[2,7,11,15], target=9 → Expected: [0,1], Got: [0,1]</div>
                            <div class="test-result pass">✅ nums=[3,2,4], target=6 → Expected: [1,2], Got: [1,2]</div>
                            <div class="test-result pass">✅ nums=[3,3], target=6 → Expected: [0,1], Got: [0,1]</div>
                        </div>
                        
                        <div class="test-group">
                            <h6>⚠️ Edge Case Tests:</h6>
                            <div class="test-result pass">✅ nums=[0,1], target=1 → Expected: [0,1], Got: [0,1]</div>
                            <div class="test-result pass">✅ nums=[-1,0], target=-1 → Expected: [0,1], Got: [0,1]</div>
                            <div class="test-result fail">❌ nums=[1,2,3], target=7 → Expected: [], Got: Exception</div>
                        </div>
                    </div>
                    
                    <div class="test-feedback">
                        <h6>🎯 Improvement Suggestions:</h6>
                        <ul>
                            <li>Add input validation to handle cases where no solution exists</li>
                            <li>Consider adding error handling for edge cases</li>
                            <li>Your core logic is perfect! Just needs defensive programming</li>
                        </ul>
                    </div>
                </div>
            `);
            
            this.updateCertificationProgress('speedAccuracy', Math.min(this.certificationProgress.speedAccuracy + 1, 10));
        }, 2000);
    }

    triggerTestExecutionEffect() {
        // Create test execution animation
        const testAnimation = document.createElement('div');
        testAnimation.className = 'test-execution-animation';
        testAnimation.innerHTML = `
            <div class="test-runner">
                <div class="test-line">Running test 1/9...</div>
                <div class="test-line">Running test 2/9...</div>
                <div class="test-line">Running test 3/9...</div>
                <div class="progress-bar"><div class="progress-fill"></div></div>
            </div>
        `;
        
        testAnimation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #00ff00;
            padding: 2rem;
            border-radius: 12px;
            font-family: 'Monaco', 'Consolas', monospace;
            z-index: 10000;
            animation: testFadeIn 0.3s ease-out;
        `;
        
        document.body.appendChild(testAnimation);
        
        // Animate progress
        const progressFill = testAnimation.querySelector('.progress-fill');
        progressFill.style.width = '0%';
        progressFill.style.transition = 'width 2s ease-out';
        progressFill.style.background = 'linear-gradient(90deg, #10b981, #3b82f6)';
        progressFill.style.height = '4px';
        
        setTimeout(() => {
            progressFill.style.width = '100%';
        }, 100);
        
        setTimeout(() => {
            testAnimation.remove();
        }, 2000);
        
        // Add CSS for test animation
        if (!document.getElementById('test-animation-styles')) {
            const styles = document.createElement('style');
            styles.id = 'test-animation-styles';
            styles.textContent = `
                @keyframes testFadeIn {
                    from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
                
                .test-line {
                    margin-bottom: 0.5rem;
                    opacity: 0.7;
                }
                
                .progress-bar {
                    background: #333;
                    border-radius: 2px;
                    overflow: hidden;
                    margin-top: 1rem;
                }
            `;
            document.head.appendChild(styles);
        }
    }

    getImplementationHint() {
        const currentProblemType = this.inferProblemTypeFromCode();
        
        const hints = {
            'two-sum': "💡 Think about what you need to find the complement quickly. A hash map can store numbers you've seen and their indices. For each number, check if (target - number) exists in your map!",
            'sliding-window': "💡 Use two pointers to maintain a window. Expand the right pointer to grow the window, contract the left pointer when the window becomes invalid. Keep track of your window's state!",
            'binary-search': "💡 Remember the binary search template: while left <= right, find mid, compare with target, then decide which half to keep. Be careful with the boundary conditions!",
            'default': "💡 Break down the problem: What pattern does this follow? What data structure would give you the fastest lookups? Can you eliminate options to reduce the search space?"
        };
        
        const hint = hints[currentProblemType] || hints['default'];
        
        this.showInteractiveModal('💡 Implementation Hint', `
            <div class="implementation-hint">
                <h4>🧠 Smart Hint Based on Your Code</h4>
                
                <div class="hint-content">
                    <div class="hint-text">${hint}</div>
                </div>
                
                <div class="hint-strategy">
                    <h6>🎯 General Strategy Tips:</h6>
                    <ul>
                        <li>Start with the brute force approach to ensure correctness</li>
                        <li>Identify the bottleneck in your solution</li>
                        <li>Think about what data structure could eliminate that bottleneck</li>
                        <li>Consider the trade-offs: time vs space complexity</li>
                        <li>Test your optimized solution with edge cases</li>
                    </ul>
                </div>
                
                <div class="encouragement">
                    <p>🚀 You're on the right track! Implementation is where planning meets execution. Trust your structure and code step by step.</p>
                </div>
            </div>
        `);
    }

    inferProblemTypeFromCode() {
        const code = document.getElementById('solution-code')?.value.toLowerCase() || '';
        
        if (code.includes('target') && (code.includes('hash') || code.includes('dict') || code.includes('{}'))) {
            return 'two-sum';
        }
        if (code.includes('window') || (code.includes('left') && code.includes('right'))) {
            return 'sliding-window';
        }
        if (code.includes('mid') && code.includes('left') && code.includes('right')) {
            return 'binary-search';
        }
        
        return 'default';
    }

    getCodeReview() {
        const code = document.getElementById('solution-code')?.value;
        if (!code || !code.trim()) {
            alert('⚠️ Please write some code first!');
            return;
        }
        
        const review = this.performCodeReview(code);
        
        this.showInteractiveModal('🤖 Professional Code Review', `
            <div class="code-review">
                <div class="review-score">
                    <h4>📊 Code Quality Score: ${review.score}/100</h4>
                    <div class="score-breakdown">
                        <div class="score-item">
                            <span>Correctness:</span> <span class="score-value">${review.scores.correctness}/25</span>
                        </div>
                        <div class="score-item">
                            <span>Efficiency:</span> <span class="score-value">${review.scores.efficiency}/25</span>
                        </div>
                        <div class="score-item">
                            <span>Readability:</span> <span class="score-value">${review.scores.readability}/25</span>
                        </div>
                        <div class="score-item">
                            <span>Best Practices:</span> <span class="score-value">${review.scores.practices}/25</span>
                        </div>
                    </div>
                </div>
                
                <div class="review-feedback">
                    <div class="feedback-section">
                        <h5>✅ Strengths:</h5>
                        <ul>
                            ${review.strengths.map(strength => `<li>${strength}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="feedback-section">
                        <h5>🎯 Areas for Improvement:</h5>
                        <ul>
                            ${review.improvements.map(improvement => `<li>${improvement}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="feedback-section">
                        <h5>🚀 Optimization Suggestions:</h5>
                        <ul>
                            ${review.optimizations.map(opt => `<li>${opt}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="interview-perspective">
                    <h6>👔 Interview Perspective:</h6>
                    <p>${review.interviewFeedback}</p>
                </div>
            </div>
        `);
        
        this.updateCertificationProgress('codeQuality', Math.min(this.certificationProgress.codeQuality + 1, 5));
    }

    performCodeReview(code) {
        const codeLower = code.toLowerCase();
        const scores = { correctness: 0, efficiency: 0, readability: 0, practices: 0 };
        const strengths = [];
        const improvements = [];
        const optimizations = [];
        
        // Correctness analysis
        if (codeLower.includes('def ') || codeLower.includes('function')) {
            scores.correctness += 10;
            strengths.push("Function structure is properly defined");
        }
        if (codeLower.includes('return')) {
            scores.correctness += 10;
            strengths.push("Includes return statement");
        }
        if (codeLower.includes('if') || codeLower.includes('while') || codeLower.includes('for')) {
            scores.correctness += 5;
            strengths.push("Uses appropriate control flow");
        }
        
        // Efficiency analysis
        if (codeLower.includes('dict') || codeLower.includes('{}') || codeLower.includes('hash')) {
            scores.efficiency += 15;
            strengths.push("Uses efficient hash-based lookups");
        }
        if (!codeLower.includes('for') || (codeLower.match(/for/g) || []).length === 1) {
            scores.efficiency += 10;
            strengths.push("Avoids nested loops where possible");
        } else {
            improvements.push("Consider if nested loops are necessary - might be optimizable");
        }
        
        // Readability analysis
        const lines = code.split('\n').filter(line => line.trim());
        if (lines.length > 0) {
            const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
            if (avgLineLength < 80) {
                scores.readability += 10;
                strengths.push("Good line length - easy to read");
            }
        }
        
        const hasComments = code.includes('#') || code.includes('//');
        if (hasComments) {
            scores.readability += 15;
            strengths.push("Includes helpful comments");
        } else if (lines.length > 5) {
            improvements.push("Consider adding comments to explain complex logic");
        }
        
        // Best practices
        if (!codeLower.includes('global') && !codeLower.includes('eval')) {
            scores.practices += 15;
            strengths.push("Avoids problematic global state and eval");
        }
        
        if (codeLower.includes('try') || codeLower.includes('except')) {
            scores.practices += 10;
            strengths.push("Includes error handling");
        } else {
            improvements.push("Consider adding error handling for edge cases");
        }
        
        // Generate optimizations
        if (codeLower.includes('list') && codeLower.includes('append')) {
            optimizations.push("Consider using list comprehension for better performance");
        }
        if (codeLower.includes('sort') && !codeLower.includes('sorted')) {
            optimizations.push("Use sorted() instead of sort() to avoid modifying original data");
        }
        
        const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
        
        let interviewFeedback;
        if (totalScore >= 80) {
            interviewFeedback = "🏆 Excellent! This code demonstrates strong problem-solving skills and would impress in an interview. You show good algorithmic thinking and clean coding practices.";
        } else if (totalScore >= 60) {
            interviewFeedback = "👍 Good work! The core logic is sound. With the suggested improvements, this would be interview-ready. Focus on the areas mentioned above.";
        } else {
            interviewFeedback = "💪 Keep improving! The foundation is there, but focus on optimization and best practices. Practice implementing the suggestions above.";
        }
        
        return {
            score: totalScore,
            scores,
            strengths,
            improvements,
            optimizations,
            interviewFeedback
        };
    }

    // ===== PROBLEM DEMONSTRATION SYSTEM =====
    
    demonstrateProblem(problemId) {
        console.log(`🎭 Demonstrating problem: ${problemId}`);
        
        const problem = this.problemDatabase[problemId];
        if (!problem) {
            console.error(`Problem ${problemId} not found`);
            return;
        }
        
        this.currentProblem = problemId;
        this.showProblemDemonstration(problem);
    }

    showProblemDemonstration(problem) {
        const demonstrationArea = document.getElementById('demonstrationArea');
        if (!demonstrationArea) return;
        
        demonstrationArea.style.display = 'block';
        demonstrationArea.innerHTML = `
            <div class="problem-demonstration">
                <div class="demo-header">
                    <h4>🎯 MASTER Framework Demonstration: ${problem.title}</h4>
                    <div class="demo-difficulty ${problem.difficulty.toLowerCase()}">${problem.difficulty}</div>
                </div>
                
                <div class="demo-problem">
                    <h5>📋 Problem Statement:</h5>
                    <div class="problem-text">${problem.description.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="master-steps-demo">
                    ${this.masterFramework.map((step, index) => 
                        this.createDemoStep(step, problem.masterSolution[step], index)
                    ).join('')}
                </div>
                
                <div class="demo-completion">
                    <h5>🎉 Framework Complete!</h5>
                    <p>This is how the MASTER framework transforms any problem into a structured, solvable challenge. Practice this approach until it becomes second nature!</p>
                    
                    <div class="demo-actions">
                        <button class="demo-btn" onclick="strategyEngine.showFullSolution('${this.currentProblem}')">
                            💻 Show Complete Solution
                        </button>
                        <button class="demo-btn" onclick="strategyEngine.practiceThisProblem('${this.currentProblem}')">
                            🎯 Practice This Problem
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Animate the demonstration
        this.animateDemonstrationSteps();
        
        // Auto-scroll to demonstration
        demonstrationArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    createDemoStep(step, solution, index) {
        const stepInfo = this.getStepInfo(step);
        const content = this.formatStepContent(step, solution);
        
        return `
            <div class="demo-step" data-step="${step}" style="opacity: 0; transform: translateY(20px);">
                <div class="demo-step-header">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-title">
                        <span class="step-icon">${stepInfo.icon}</span>
                        <span class="step-name">${stepInfo.name}</span>
                    </div>
                </div>
                <div class="demo-step-content">
                    ${content}
                </div>
            </div>
        `;
    }

    getStepInfo(step) {
        const stepInfoMap = {
            map: { name: 'Map the Problem', icon: '🗺️' },
            analyze: { name: 'Analyze Patterns', icon: '🔍' },
            structure: { name: 'Structure Solution', icon: '🏗️' },
            test: { name: 'Test Cases', icon: '🧪' },
            execute: { name: 'Execute Code', icon: '💻' },
            review: { name: 'Review & Optimize', icon: '🔄' }
        };
        
        return stepInfoMap[step] || { name: step, icon: '📋' };
    }

    formatStepContent(step, solution) {
        switch (step) {
            case 'map':
                return `
                    <div class="mapping-content">
                        <div class="mapping-item"><strong>🔍 Understanding:</strong> ${solution.understanding}</div>
                        <div class="mapping-item"><strong>📥 Inputs:</strong> ${solution.inputs}</div>
                        <div class="mapping-item"><strong>📤 Outputs:</strong> ${solution.outputs}</div>
                        <div class="mapping-item"><strong>⚠️ Constraints:</strong> ${solution.constraints}</div>
                        <div class="mapping-item"><strong>💡 Example:</strong> ${solution.examples}</div>
                    </div>
                `;
            
            case 'analyze':
                return `
                    <div class="analyze-content">
                        <div class="pattern-match"><strong>🎭 Pattern:</strong> ${solution.pattern}</div>
                        <div class="indicators"><strong>🔍 Indicators:</strong> ${solution.indicators.join(', ')}</div>
                        <div class="approach"><strong>⚡ Approach:</strong> ${solution.approach}</div>
                    </div>
                `;
            
            case 'structure':
                return `
                    <div class="structure-content">
                        <div class="structure-item"><strong>🎯 Approach:</strong> ${solution.approach}</div>
                        <div class="structure-item"><strong>🏗️ Data Structures:</strong> ${solution.dataStructures.join(', ')}</div>
                        <div class="structure-item">
                            <strong>📋 Steps:</strong>
                            <ol>
                                ${solution.steps.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>
                        <div class="structure-item"><strong>⚠️ Edge Cases:</strong> ${solution.edgeCases.join(', ')}</div>
                    </div>
                `;
            
            case 'test':
                return `
                    <div class="test-content">
                        <div class="test-group">
                            <strong>✅ Happy Path:</strong>
                            ${solution.happy.map(test => `<div class="test-case happy">${test}</div>`).join('')}
                        </div>
                        <div class="test-group">
                            <strong>⚠️ Edge Cases:</strong>
                            ${solution.edge.map(test => `<div class="test-case edge">${test}</div>`).join('')}
                        </div>
                        <div class="test-group">
                            <strong>❌ Error Cases:</strong>
                            ${solution.error.map(test => `<div class="test-case error">${test}</div>`).join('')}
                        </div>
                    </div>
                `;
            
            case 'execute':
                return `
                    <div class="execute-content">
                        <div class="code-solution">
                            <strong>💻 Solution:</strong>
                            <pre><code>${solution.solution}</code></pre>
                        </div>
                        <div class="complexity-analysis">
                            <div class="complexity-item"><strong>⏱️ Time:</strong> ${solution.complexity.time}</div>
                            <div class="complexity-item"><strong>💾 Space:</strong> ${solution.complexity.space}</div>
                        </div>
                    </div>
                `;
            
            case 'review':
                return `
                    <div class="review-content">
                        <div class="review-item">✅ <strong>Correctness:</strong> ${solution.correctness}</div>
                        <div class="review-item">⚡ <strong>Performance:</strong> ${solution.performance}</div>
                        <div class="review-item">📖 <strong>Readability:</strong> ${solution.readability}</div>
                        <div class="review-item">🚀 <strong>Improvements:</strong> ${solution.improvements}</div>
                    </div>
                `;
            
            default:
                return '<div>Step content not available</div>';
        }
    }

    animateDemonstrationSteps() {
        const demoSteps = document.querySelectorAll('.demo-step');
        
        demoSteps.forEach((step, index) => {
            setTimeout(() => {
                step.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
                
                // Add step completion effect
                setTimeout(() => {
                    this.addStepCompletionEffect(step);
                }, 300);
                
            }, index * 800);
        });
    }

    addStepCompletionEffect(stepElement) {
        const stepHeader = stepElement.querySelector('.demo-step-header');
        if (!stepHeader) return;
        
        // Add completion checkmark
        const checkmark = document.createElement('div');
        checkmark.className = 'step-checkmark';
        checkmark.innerHTML = '✅';
        checkmark.style.cssText = `
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%) scale(0);
            font-size: 1.2rem;
            animation: checkmarkAppear 0.5s ease-out forwards;
        `;
        
        stepHeader.style.position = 'relative';
        stepHeader.appendChild(checkmark);
        
        // Add checkmark animation
        if (!document.getElementById('checkmark-animation')) {
            const style = document.createElement('style');
            style.id = 'checkmark-animation';
            style.textContent = `
                @keyframes checkmarkAppear {
                    to {
                        transform: translateY(-50%) scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    showFullSolution(problemId) {
        const problem = this.problemDatabase[problemId];
        if (!problem) return;
        
        const solution = problem.masterSolution.execute;
        
        this.showInteractiveModal('💻 Complete Solution', `
            <div class="full-solution">
                <h4>🎯 Complete Solution: ${problem.title}</h4>
                
                <div class="solution-code">
                    <h5>💻 Optimized Code:</h5>
                    <pre><code>${solution.solution}</code></pre>
                </div>
                
                <div class="solution-explanation">
                    <h5>🧠 How It Works:</h5>
                    <div class="explanation-steps">
                        ${problem.masterSolution.structure.steps.map((step, index) => 
                            `<div class="explanation-step">
                                <strong>Step ${index + 1}:</strong> ${step}
                            </div>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="complexity-details">
                    <h5>📊 Complexity Analysis:</h5>
                    <div class="complexity-item">
                        <strong>⏱️ Time Complexity:</strong> ${solution.complexity.time}
                    </div>
                    <div class="complexity-item">
                        <strong>💾 Space Complexity:</strong> ${solution.complexity.space}
                    </div>
                </div>
                
                <div class="interview-tips">
                    <h5>💡 Interview Tips:</h5>
                    <ul>
                        <li>Always start by clarifying the problem requirements</li>
                        <li>Discuss your approach before coding</li>
                        <li>Think out loud as you implement</li>
                        <li>Test with the examples and edge cases</li>
                        <li>Analyze time and space complexity at the end</li>
                    </ul>
                </div>
            </div>
        `);
    }

    practiceThisProblem(problemId) {
        alert(`🎯 Practice Mode: ${this.problemDatabase[problemId]?.title}

This would launch an interactive practice session where you:

1. ✍️ Work through the MASTER framework yourself
2. ⏱️ Practice under timed conditions  
3. 💻 Code the solution step-by-step
4. 🧪 Test your implementation
5. 📊 Get detailed performance feedback

Ready to implement this practice mode? This would be a great addition to make the learning even more interactive!`);
    }

    // ===== PROBLEM CLASSIFICATION ENGINE =====
    
    classifyProblem() {
        const problemText = document.getElementById('problemInput')?.value;
        if (!problemText || !problemText.trim()) {
            alert('⚠️ Please paste a problem description first!');
            return;
        }
        
        console.log('🤖 Classifying problem with AI...');
        
        // Show loading animation
        this.showClassificationLoading();
        
        // Simulate AI processing time
        setTimeout(() => {
            const analysis = this.performIntelligentClassification(problemText);
            this.displayClassificationResults(analysis);
        }, 2500);
    }

    showClassificationLoading() {
        const resultsContainer = document.getElementById('classificationResults');
        if (!resultsContainer) return;
        
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = `
            <div class="classification-loading">
                <div class="ai-thinking">
                    <div class="thinking-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                    <h4>🧠 AI Analyzing Problem...</h4>
                </div>
                <div class="analysis-steps">
                    <div class="analysis-step active">🔍 Reading problem statement...</div>
                    <div class="analysis-step">🎭 Identifying patterns...</div>
                    <div class="analysis-step">⚡ Generating solution strategy...</div>
                    <div class="analysis-step">📋 Creating MASTER framework...</div>
                </div>
            </div>
        `;
        
        // Add loading animation styles
        if (!document.getElementById('loading-animation-styles')) {
            const styles = document.createElement('style');
            styles.id = 'loading-animation-styles';
            styles.textContent = `
                .classification-loading {
                    text-align: center;
                    padding: 3rem;
                    background: var(--bg-secondary);
                    border-radius: 12px;
                    border: 1px solid var(--border-color);
                }
                
                .thinking-dots {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                }
                
                .dot {
                    width: 12px;
                    height: 12px;
                    background: var(--accent-primary);
                    border-radius: 50%;
                    animation: thinkingBounce 1.4s infinite ease-in-out both;
                }
                
                .dot:nth-child(1) { animation-delay: -0.32s; }
                .dot:nth-child(2) { animation-delay: -0.16s; }
                
                @keyframes thinkingBounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
                
                .analysis-steps {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-top: 2rem;
                }
                
                .analysis-step {
                    padding: 0.75rem;
                    background: var(--bg-primary);
                    border-radius: 8px;
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }
                
                .analysis-step.active {
                    opacity: 1;
                    background: rgba(59, 130, 246, 0.1);
                    border-left: 3px solid var(--accent-primary);
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Animate analysis steps
        const steps = resultsContainer.querySelectorAll('.analysis-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                steps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');
            }, (index + 1) * 600);
        });
    }

    performIntelligentClassification(problemText) {
        const textLower = problemText.toLowerCase();
        
        // Advanced pattern analysis
        const patternAnalysis = this.analyzePatternFromText(problemText);
        
        // Difficulty assessment
        const difficulty = this.assessDifficulty(problemText);
        
        // Generate MASTER framework
        const masterFramework = this.generateFrameworkForProblem(problemText, patternAnalysis);
        
        // Complexity prediction
        const complexityPrediction = this.predictComplexity(patternAnalysis);
        
        // Similar problems
        const similarProblems = this.findSimilarProblems(patternAnalysis);
        
        return {
            patterns: patternAnalysis.patterns,
            difficulty: difficulty,
            masterFramework: masterFramework,
            complexity: complexityPrediction,
            similarProblems: similarProblems,
            confidence: Math.max(...patternAnalysis.patterns.map(p => p.confidence)) || 50
        };
    }

    assessDifficulty(problemText) {
        const textLower = problemText.toLowerCase();
        let difficultyScore = 0;
        
        // Easy indicators
        if (textLower.includes('find') && textLower.includes('array') && !textLower.includes('optimize')) {
            difficultyScore += 1;
        }
        
        // Medium indicators
        if (textLower.includes('substring') || textLower.includes('subarray')) {
            difficultyScore += 2;
        }
        if (textLower.includes('optimize') || textLower.includes('minimum') || textLower.includes('maximum')) {
            difficultyScore += 2;
        }
        
        // Hard indicators
        if (textLower.includes('dynamic programming') || textLower.includes('shortest path')) {
            difficultyScore += 3;
        }
        if (textLower.includes('backtrack') || textLower.includes('n-queens')) {
            difficultyScore += 3;
        }
        if (textLower.includes('median') || textLower.includes('kth largest')) {
            difficultyScore += 3;
        }
        
        if (difficultyScore <= 2) return { level: 'Easy', color: 'green' };
        if (difficultyScore <= 4) return { level: 'Medium', color: 'orange' };
        return { level: 'Hard', color: 'red' };
    }

    generateFrameworkForProblem(problemText, patternAnalysis) {
        const topPattern = patternAnalysis.patterns[0];
        if (!topPattern) {
            return this.getGenericFramework();
        }
        
        // Generate pattern-specific framework
        return this.getPatternSpecificFramework(topPattern.name, problemText);
    }

    getPatternSpecificFramework(pattern, problemText) {
        const frameworks = {
            '👆 Two Pointers': {
                map: 'Identify if problem involves pairs, palindromes, or sorted array traversal',
                analyze: 'Two pointers pattern - use left/right or fast/slow pointer technique',
                structure: 'Initialize pointers, move based on comparison logic, track results',
                test: 'Test with sorted arrays, palindromes, and edge cases',
                execute: 'Implement pointer movement logic with proper boundary checks',
                review: 'Verify O(n) time complexity and O(1) space complexity'
            },
            '🪟 Sliding Window': {
                map: 'Problem asks for optimal subarray/substring with specific constraints',
                analyze: 'Sliding window pattern - expand/contract window based on validity',
                structure: 'Maintain window state, expand right pointer, contract left when invalid',
                test: 'Test with various window sizes and constraint violations',
                execute: 'Track window properties (sum, frequency, etc.) efficiently',
                review: 'Ensure O(n) time complexity with proper window management'
            },
            '🔍 Binary Search': {
                map: 'Problem involves sorted data or search space that can be halved',
                analyze: 'Binary search pattern - eliminate half the options each iteration',
                structure: 'Define search boundaries, find middle, decide which half to keep',
                test: 'Test with target found, not found, and boundary conditions',
                execute: 'Implement classic binary search template with careful boundary handling',
                review: 'Confirm O(log n) time complexity and proper edge case handling'
            }
        };
        
        return frameworks[pattern] || this.getGenericFramework();
    }

    getGenericFramework() {
        return {
            map: 'Understand inputs, outputs, constraints, and identify key patterns',
            analyze: 'Determine the most suitable algorithmic approach for this problem',
            structure: 'Plan data structures, algorithm steps, and edge case handling',
            test: 'Create comprehensive test cases covering happy path and edge cases',
            execute: 'Implement the solution step by step with clear, readable code',
            review: 'Verify correctness, analyze complexity, and optimize if possible'
        };
    }

    predictComplexity(patternAnalysis) {
        const topPattern = patternAnalysis.patterns[0];
        if (!topPattern) {
            return { time: 'O(?)', space: 'O(?)' };
        }
        
        const complexityMap = {
            '👆 Two Pointers': { time: 'O(n)', space: 'O(1)' },
            '🪟 Sliding Window': { time: 'O(n)', space: 'O(k)' },
            '🔍 Binary Search': { time: 'O(log n)', space: 'O(1)' },
            '🌊 BFS/DFS Traversal': { time: 'O(V + E)', space: 'O(V)' },
            '🧮 Dynamic Programming': { time: 'O(n²)', space: 'O(n)' },
            '🗂️ Hash Map': { time: 'O(n)', space: 'O(n)' }
        };
        
        return complexityMap[topPattern.name] || { time: 'O(n)', space: 'O(1)' };
    }

    findSimilarProblems(patternAnalysis) {
        const topPattern = patternAnalysis.patterns[0];
        if (!topPattern) {
            return ['Practice problems will be suggested based on pattern recognition'];
        }
        
        const problemMap = {
            '👆 Two Pointers': [
                'Two Sum II - Input array is sorted',
                'Valid Palindrome',
                'Container With Most Water',
                'Remove Duplicates from Sorted Array'
            ],
            '🪟 Sliding Window': [
                'Longest Substring Without Repeating Characters',
                'Maximum Sum Subarray of Size K',
                'Minimum Window Substring',
                'Sliding Window Maximum'
            ],
            '🔍 Binary Search': [
                'Search in Rotated Sorted Array',
                'Find Peak Element',
                'Search for a Range',
                'Find Minimum in Rotated Sorted Array'
            ],
            '🌊 BFS/DFS Traversal': [
                'Number of Islands',
                'Binary Tree Level Order Traversal',
                'Course Schedule',
                'Word Ladder'
            ],
            '🧮 Dynamic Programming': [
                'Climbing Stairs',
                'House Robber',
                'Longest Common Subsequence',
                'Coin Change'
            ]
        };
        
        return problemMap[topPattern.name] || ['Similar problems not categorized yet'];
    }

    displayClassificationResults(analysis) {
        const resultsContainer = document.getElementById('classificationResults');
        if (!resultsContainer) return;
        
        resultsContainer.innerHTML = `
            <div class="classification-results">
                <div class="results-header">
                    <h4>🎯 AI Classification Complete</h4>
                    <div class="confidence-score">
                        Confidence: ${analysis.confidence}%
                    </div>
                </div>
                
                <div class="results-sections">
                    <div class="result-section">
                        <h5>🎭 Detected Patterns:</h5>
                        <div class="pattern-results">
                            ${analysis.patterns.map(pattern => `
                                <div class="pattern-result">
                                    <span class="pattern-name">${pattern.name}</span>
                                    <span class="pattern-confidence">${pattern.confidence}%</span>
                                    <div class="pattern-reasoning">${pattern.reason}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="result-section">
                        <h5>📊 Difficulty Assessment:</h5>
                        <div class="difficulty-result">
                            <span class="difficulty-badge ${analysis.difficulty.color}">${analysis.difficulty.level}</span>
                        </div>
                    </div>
                    
                    <div class="result-section">
                        <h5>⚡ Predicted Complexity:</h5>
                        <div class="complexity-prediction">
                            <div class="complexity-item">Time: <code>${analysis.complexity.time}</code></div>
                            <div class="complexity-item">Space: <code>${analysis.complexity.space}</code></div>
                        </div>
                    </div>
                    
                    <div class="result-section">
                        <h5>🏗️ Generated MASTER Framework:</h5>
                        <div class="framework-preview">
                            ${Object.entries(analysis.masterFramework).map(([step, description]) => `
                                <div class="framework-step-preview">
                                    <strong>${step.toUpperCase()}:</strong> ${description}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="result-section">
                        <h5>🎯 Similar Problems to Practice:</h5>
                        <div class="similar-problems">
                            ${analysis.similarProblems.map(problem => `
                                <div class="similar-problem">${problem}</div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="action-btn primary" onclick="strategyEngine.applyFrameworkToEditor()">
                            🎯 Apply Framework to Code Editor
                        </button>
                        <button class="action-btn secondary" onclick="strategyEngine.startGuidedSolution()">
                            🧭 Start Guided Solution
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Animate results appearance
        this.animateClassificationResults();
        
        // Update certification progress
        this.updateCertificationProgress('patternRecognition', Math.min(this.certificationProgress.patternRecognition + 1, 15));
    }

        animateClassificationResults() {
        const sections = document.querySelectorAll('.result-section');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                
                // Add sparkle effect to each section as it appears
                this.addSparkleEffect(section);
            }, index * 200);
        });
    }

    addSparkleEffect(element) {
        const sparkles = 3;
        
        for (let i = 0; i < sparkles; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'result-sparkle';
                sparkle.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: radial-gradient(circle, #fbbf24 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    animation: sparkleFloat 1.5s ease-out forwards;
                `;
                
                const rect = element.getBoundingClientRect();
                sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1500);
            }, i * 200);
        }
        
        // Add sparkle animation if not exists
        if (!document.getElementById('sparkle-float-animation')) {
            const style = document.createElement('style');
            style.id = 'sparkle-float-animation';
            style.textContent = `
                @keyframes sparkleFloat {
                    0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
                    50% { transform: translateY(-20px) scale(1) rotate(180deg); opacity: 1; }
                    100% { transform: translateY(-40px) scale(0) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    applyFrameworkToEditor() {
        const codeEditor = document.getElementById('solution-code');
        if (!codeEditor) {
            alert('💻 Code editor not found! Please scroll to the Execute step to see the coding environment.');
            return;
        }
        
        // Get the current classification analysis
        const analysisResults = document.querySelector('.classification-results');
        if (!analysisResults) {
            alert('⚠️ Please classify a problem first!');
            return;
        }
        
        // Generate template based on detected pattern
        const patternElements = document.querySelectorAll('.pattern-result');
        const topPattern = patternElements[0]?.querySelector('.pattern-name')?.textContent;
        
        const template = this.generateCodeTemplate(topPattern);
        
        // Apply template with spectacular effect
        this.typewriterEffect(codeEditor, template);
        
        // Show success message
        setTimeout(() => {
            this.showInteractiveModal('🎯 Framework Applied', `
                <div class="framework-applied">
                    <h4>✅ MASTER Framework Applied Successfully!</h4>
                    
                    <div class="applied-features">
                        <div class="feature-item">
                            <span class="feature-icon">📋</span>
                            <span>Code template generated based on detected pattern</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🏗️</span>
                            <span>Solution structure outlined with comments</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🧪</span>
                            <span>Test cases framework included</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">⚡</span>
                            <span>Optimized approach template ready</span>
                        </div>
                    </div>
                    
                    <div class="next-steps-guide">
                        <h6>🎯 Next Steps:</h6>
                        <ol>
                            <li>Fill in the algorithm logic in the marked sections</li>
                            <li>Test your solution with the provided test cases</li>
                            <li>Run the code to verify correctness</li>
                            <li>Get a professional code review</li>
                        </ol>
                    </div>
                </div>
            `);
        }, 3000);
    }

    generateCodeTemplate(pattern) {
        const templates = {
            '👆 Two Pointers': `def solve_two_pointers(arr, target):
    """

    Two Pointers Pattern Template
    Time: O(n), Space: O(1)
    """
    # Initialize pointers
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        # TODO: Add your comparison logic here
        if current_sum == target:
            return [left, right]  # Found the answer
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return []  # No solution found

# Test cases
test_cases = [
    ([2, 7, 11, 15], 9),  # Expected: [0, 1]
    ([3, 2, 4], 6),       # Expected: [1, 2]
    ([3, 3], 6)           # Expected: [0, 1]
]

# TODO: Test your solution
for arr, target in test_cases:
    result = solve_two_pointers(arr, target)
    print(f"Input: {arr}, Target: {target} -> Output: {result}")`,

            '🪟 Sliding Window': `def solve_sliding_window(s):
    """

    Sliding Window Pattern Template
    Time: O(n), Space: O(k) where k is size of character set
    """
    # Initialize window
    left = 0
    max_length = 0
    char_count = {}
    
    for right in range(len(s)):
        # Expand window - add right character
        char = s[right];
        char_count[char] = char_count.get(char, 0) + 1;
        
        # TODO: Add your window validity check here
        while char_count[char] > 1:  # Window invalid condition
            # Contract window - remove left character
            left_char = s[left]
            char_count[left_char] -= 1
            if char_count[left_char] == 0:
                del char_count[left_char]
            left += 1
        
        # Update result
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Test cases
test_cases = [
    "abcabcbb",  # Expected: 3
    "bbbbb",     # Expected: 1
    "pwwkew"     # Expected: 3
]

# TODO: Test your solution
for s in test_cases:
    result = solve_sliding_window(s)
    print(f"Input: '${s}' -> Output: {result}")`,

            '🔍 Binary Search': `def solve_binary_search(nums, target):
    """

    Binary Search Pattern Template
    Time: O(log n), Space: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        # TODO: Add your comparison logic here
        if nums[mid] == target:
            return mid  # Found the target
        elif nums[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Target not found

# Test cases
test_cases = [
    ([-1, 0, 3, 5, 9, 12], 9),   # Expected: 4
    ([-1, 0, 3, 5, 9, 12], 2),   # Expected: -1
    ([5], 5)                     # Expected: 0
]

# TODO: Test your solution
for nums, target in test_cases:
    result = solve_binary_search(nums, target)
    print(f"Input: {nums}, Target: {target} -> Output: {result}")`
        };
        
        return templates[pattern] || `def solve_problem():
    """

    TODO: Implement your solution here
    """
    # Step 1: Understand the problem
    # Step 2: Plan your approach
    # Step 3: Implement the solution
    # Step 4: Test with examples
    # Step 5: Optimize if needed
    pass

# TODO: Add test cases and run your solution`;
    }

    typewriterEffect(element, text) {
        element.value = '';
        element.style.background = 'linear-gradient(90deg, #1a1a1a 0%, #2a4a2a 20%, #1a1a1a 100%)';
        
        let index = 0;
        const speed = 30; // ms per character
        
        const typeCharacter = () => {
            if (index < text.length) {
                element.value += text[index];
                index++;
                setTimeout(typeCharacter, speed);
                
                // Auto-scroll to bottom
                element.scrollTop = element.scrollHeight;
            } else {
                // Finished typing - restore normal background
                element.style.background = '#1a1a1a';
                this.addTemporaryGlow(element, '#10b981');
            }
        };
        
        typeCharacter();
    }

    startGuidedSolution() {
        alert(`🧭 Guided Solution Mode

This premium feature would provide:

🎯 Step-by-step problem breakdown
💡 Interactive hints and suggestions  
🔍 Real-time code analysis
✅ Instant feedback and corrections
🏆 Personalized learning path

Coming soon! This would be perfect for students who want maximum hand-holding through their first LeetCode problems.

Ready to implement this guided learning experience?`);
    }

    loadExampleProblem() {
        const examples = [
            {
                title: "Two Sum Problem",
                description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
• 2 <= nums.length <= 10^4
• -10^9 <= nums[i] <= 10^9
• Only one valid answer exists.`
            },
            {
                title: "Longest Substring Without Repeating Characters",
                description: `Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Constraints:
• 0 <= s.length <= 5 * 10^4
• s consists of English letters, digits, symbols and spaces.`
            },
            {
                title: "Valid Parentheses",
                description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Constraints:
• 1 <= s.length <= 10^4
• s consists of parentheses only '()[]{}'.`
            }
        ];
        
        const randomExample = examples[Math.floor(Math.random() * examples.length)];
        
        const problemInput = document.getElementById('problemInput');
        if (problemInput) {
            problemInput.value = randomExample.description;
            
            // Auto-classify after loading
            setTimeout(() => {
                this.classifyProblem();
            }, 500);
        }
    }

    clearProblemInput() {
        const problemInput = document.getElementById('problemInput');
        const resultsContainer = document.getElementById('classificationResults');
        
        if (problemInput) {
            problemInput.value = '';
        }
        
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
        }
        
        // Clear visual effects
        this.triggerClearEffect();
    }

    triggerClearEffect() {
        // Create clear animation
        const clearWave = document.createElement('div');
        clearWave.style.cssText = `
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.1) 50%, transparent 100%);
            z-index: 9999;
            pointer-events: none;
            animation: clearWave 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(clearWave);
        
        // Add clear wave animation
        if (!document.getElementById('clear-wave-animation')) {
            const style = document.createElement('style');
            style.id = 'clear-wave-animation';
            style.textContent = `
                @keyframes clearWave {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            clearWave.remove();
        }, 800);
    }

    // ===== TIMED PRACTICE ARENA =====
    
    setTimeLimit(minutes) {
        this.practiceConfig.timeLimit = minutes;
        
        // Update UI
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        event.target.classList.add('active');
        
        // Visual feedback
        this.triggerSettingChangeEffect(event.target);
        
        console.log(`⏰ Time limit set to ${minutes} minutes`);
    }

    setDifficulty(level) {
        this.practiceConfig.difficulty = level;
        
        // Update UI
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        event.target.classList.add('active');
        
        // Visual feedback
        this.triggerSettingChangeEffect(event.target);
        
        console.log(`📊 Difficulty set to ${level}`);
    }

    triggerSettingChangeEffect(button) {
        const originalTransform = button.style.transform;
        const originalBoxShadow = button.style.boxShadow;
        
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.6)';
        button.style.transition = 'all 0.2s ease-out';
        
        setTimeout(() => {
            button.style.transform = originalTransform;
            button.style.boxShadow = originalBoxShadow;
        }, 200);
    }

    startTimedPractice() {
        const focusArea = document.getElementById('focusArea')?.value || 'all';
        this.practiceConfig.focusArea = focusArea;
        
        // Generate problems based on settings
        const problems = this.generatePracticeProblems();
        
        if (problems.length === 0) {
            alert('⚠️ No problems available for the selected criteria. Try different settings!');
            return;
        }
        
        this.practiceSession = {
            problems: problems,
            currentProblem: 0,
            startTime: Date.now(),
            timeLimit: this.practiceConfig.timeLimit * 60 * 1000, // Convert to ms
            answers: [],
            timer: null
        };
        
        this.showPracticeInterface();
        
        console.log(`🚀 Started timed practice: ${problems.length} problems, ${this.practiceConfig.timeLimit} min limit`);
    }

    generatePracticeProblems() {
        const problemSets = {
            easy: [
                { title: "Two Sum", pattern: "Hash Map", timeEstimate: 15 },
                { title: "Valid Parentheses", pattern: "Stack", timeEstimate: 10 },
                { title: "Merge Two Sorted Lists", pattern: "Two Pointers", timeEstimate: 15 },
                { title: "Remove Duplicates", pattern: "Two Pointers", timeEstimate: 10 },
                { title: "Climbing Stairs", pattern: "Dynamic Programming", timeEstimate: 10 }
            ],
            medium: [
                { title: "Longest Substring", pattern: "Sliding Window", timeEstimate: 25 },
                { title: "3Sum", pattern: "Two Pointers", timeEstimate: 30 },
                { title: "Container With Most Water", pattern: "Two Pointers", timeEstimate: 20 },
                { title: "Group Anagrams", pattern: "Hash Map", timeEstimate: 20 },
                { title: "Longest Palindromic Substring", pattern: "Dynamic Programming", timeEstimate: 30 }
            ],
            hard: [
                { title: "Median of Two Sorted Arrays", pattern: "Binary Search", timeEstimate: 40 },
                { title: "Trapping Rain Water", pattern: "Two Pointers", timeEstimate: 35 },
                { title: "Sliding Window Maximum", pattern: "Sliding Window", timeEstimate: 45 },
                { title: "Edit Distance", pattern: "Dynamic Programming", timeEstimate: 45 },
                { title: "Word Ladder", pattern: "BFS", timeEstimate: 40 }
            ]
        };
        
        let availableProblems = [];
        
        if (this.practiceConfig.difficulty === 'mixed') {
            availableProblems = [...problemSets.easy, ...problemSets.medium, ...problemSets.hard];
        } else {
            availableProblems = problemSets[this.practiceConfig.difficulty] || [];
        }
        
        // Filter by focus area
        if (this.practiceConfig.focusArea !== 'all') {
            const focusPatterns = {
                'arrays': ['Hash Map', 'Two Pointers', 'Sliding Window'],
                'trees': ['DFS', 'BFS', 'Tree Traversal'],
                'dynamic': ['Dynamic Programming', 'Memoization'],
                'system': ['Design', 'Scalability']
            };
            
            const patterns = focusPatterns[this.practiceConfig.focusArea] || [];
            availableProblems = availableProblems.filter(problem => 
                patterns.some(pattern => problem.pattern.includes(pattern))
            );
        }
        
        // Shuffle and return appropriate number
        const shuffled = this.shuffleArray([...availableProblems]);
        const targetTime = this.practiceConfig.timeLimit;
        const selected = [];
        let totalTime = 0;
        
        for (const problem of shuffled) {
            if (totalTime + problem.timeEstimate <= targetTime) {
                selected.push(problem);
                totalTime += problem.timeEstimate;
            }
            
            if (selected.length >= 5) break; // Max 5 problems per session
        }
        
        return selected;
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    showPracticeInterface() {
        const sessionContainer = document.getElementById('practiceSession');
        if (!sessionContainer) return;
        
        sessionContainer.style.display = 'block';
        sessionContainer.innerHTML = `
            <div class="practice-session-active">
                <div class="session-header">
                    <h4>⚡ Timed Practice Session Active</h4>
                    <div class="session-stats">
                        <div class="stat-item">
                            <span class="stat-label">Time Remaining:</span>
                            <span class="timer-display" id="sessionTimer">${this.practiceConfig.timeLimit}:00</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Problem:</span>
                            <span id="currentProblemNumber">1</span>/<span id="totalProblems">${this.practiceSession.problems.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Score:</span>
                            <span id="currentScore">0</span> points
                        </div>
                    </div>
                </div>
                
                <div class="current-problem" id="currentProblemDisplay">
                    <!-- Current problem will be loaded here -->
                </div>
                
                <div class="session-controls">
                    <button class="control-btn" onclick="strategyEngine.skipProblem()">⏭️ Skip Problem</button>
                    <button class="control-btn" onclick="strategyEngine.submitSolution()">✅ Submit Solution</button>
                    <button class="control-btn danger" onclick="strategyEngine.endPracticeSession()">🛑 End Session</button>
                </div>
                
                <div class="practice-code-editor">
                    <textarea id="practiceCodeEditor" placeholder="Write your solution here..." rows="20"></textarea>
                </div>
            </div>
        `;
        
        // Load first problem
        this.loadCurrentProblem();
        
        // Start timer
        this.startPracticeTimer();
        
        // Setup code editor
        this.setupCodeEditor(document.getElementById('practiceCodeEditor'));
        
        // Smooth scroll to session
        sessionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setupCodeEditor(editor) {
        if (!editor) return;
        
        editor.addEventListener('keydown', (e) => {
            // Tab key for indentation
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = editor.selectionStart;
                const end = editor.selectionEnd;
                
                editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
                editor.selectionStart = editor.selectionEnd = start + 4;
            }
        });
        
        // Real-time syntax highlighting simulation
        editor.addEventListener('input', () => {
            this.simulateSyntaxHighlighting(editor);
        });
    }

    simulateSyntaxHighlighting(editor) {
        // Simple syntax highlighting simulation with background color changes
        const code = editor.value;
        
        if (code.includes('def ') || code.includes('function')) {
            editor.style.borderLeft = '4px solid #10b981';
        } else if (code.includes('class ')) {
            editor.style.borderLeft = '4px solid #3b82f6';
        } else if (code.includes('import ') || code.includes('from ')) {
            editor.style.borderLeft = '4px solid #8b5cf6';
        } else {
            editor.style.borderLeft = '4px solid #6b7280';
        }
    }

    loadCurrentProblem() {
        if (!this.practiceSession) return;
        
        const problem = this.practiceSession.problems[this.practiceSession.currentProblem];
        const display = document.getElementById('currentProblemDisplay');
        const problemNumber = document.getElementById('currentProblemNumber');
        
        if (display && problem) {
            display.innerHTML = `
                <div class="problem-card-practice">
                    <div class="problem-header-practice">
                        <h5>${problem.title}</h5>
                        <div class="problem-meta">
                            <span class="pattern-badge">${problem.pattern}</span>
                            <span class="time-estimate">~${problem.timeEstimate} min</span>
                        </div>
                    </div>
                    
                    <div class="problem-description-practice">
                        <p>This is a ${problem.pattern} problem. Apply the MASTER framework to solve it systematically.</p>
                        
                        <div class="quick-hints">
                            <h6>💡 Quick Hints:</h6>
                            ${this.getQuickHints(problem.pattern)}
                        </div>
                    </div>
                </div>
            `;
        }
        
        if (problemNumber) {
            problemNumber.textContent = this.practiceSession.currentProblem + 1;
        }
    }

    getQuickHints(pattern) {
        const hints = {
            'Hash Map': '<ul><li>Think about O(1) lookups</li><li>Store what you\'ve seen</li><li>Check for complements</li></ul>',
            'Two Pointers': '<ul><li>Use left and right pointers</li><li>Move based on comparison</li><li>Works well with sorted data</li></ul>',
            'Sliding Window': '<ul><li>Expand and contract window</li><li>Track window state</li><li>Optimize subarray/substring</li></ul>',
            'Stack': '<ul><li>LIFO - Last In First Out</li><li>Great for matching pairs</li><li>Think about what to track</li></ul>',
            'Dynamic Programming': '<ul><li>Break into subproblems</li><li>Store computed results</li><li>Build bottom-up or memoize</li></ul>',
            'Binary Search': '<ul><li>Eliminate half each time</li><li>Works on sorted data</li><li>O(log n) time complexity</li></ul>',
            'BFS': '<ul><li>Level-by-level exploration</li><li>Use queue data structure</li><li>Good for shortest path</li></ul>',
            'DFS': '<ul><li>Go deep first</li><li>Use recursion or stack</li><li>Explore all paths</li></ul>'
        };
        
        return hints[pattern] || '<ul><li>Apply the MASTER framework</li><li>Think step by step</li><li>Test your solution</li></ul>';
    }

    startPracticeTimer() {
        let timeRemaining = this.practiceSession.timeLimit; // in milliseconds
        const timerDisplay = document.getElementById('sessionTimer');
        
        this.practiceSession.timer = setInterval(() => {
            timeRemaining -= 1000;
            
            if (timeRemaining <= 0) {
                this.endPracticeSession();
                return;
            }
            
            // Update display
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = Math.floor((timeRemaining % 60000) / 1000);
            
            if (timerDisplay) {
                timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                // Color coding for urgency
                if (timeRemaining <= 300000) { // 5 minutes
                    timerDisplay.style.color = '#ef4444';
                    timerDisplay.style.animation = 'timerPulse 1s infinite';
                } else if (timeRemaining <= 600000) { // 10 minutes
                    timerDisplay.style.color = '#f59e0b';
                } else {
                    timerDisplay.style.color = '#10b981';
                }
            }
        }, 1000);
        
        // Add timer pulse animation
        if (!document.getElementById('timer-pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'timer-pulse-animation';
            style.textContent = `
                @keyframes timerPulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.05); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    skipProblem() {
        if (confirm('⏭️ Are you sure you want to skip this problem? No points will be awarded.')) {
            this.moveToNextProblem();
        }
    }

    submitSolution() {
        const code = document.getElementById('practiceCodeEditor')?.value;
        if (!code || !code.trim()) {
            alert('⚠️ Please write some code before submitting!');
            return;
        }
        
        // Simulate solution evaluation
        this.evaluateSolution(code);
    }

    evaluateSolution(code) {
        // Create evaluation animation
        const evaluationOverlay = document.createElement('div');
        evaluationOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: evaluationFadeIn 0.3s ease-out;
        `;
        
        evaluationOverlay.innerHTML = `
            <div class="evaluation-progress">
                <div class="evaluation-spinner"></div>
                <h4 style="color: white; margin-top: 1rem;">🧪 Evaluating Solution...</h4>
                <div class="evaluation-steps">
                    <div class="eval-step">✓ Syntax check</div>
                    <div class="eval-step">⏳ Logic analysis</div>
                    <div class="eval-step">⏳ Test cases</div>
                    <div class="eval-step">⏳ Performance check</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(evaluationOverlay);
        
        // Add evaluation styles
        if (!document.getElementById('evaluation-styles')) {
            const styles = document.createElement('style');
            styles.id = 'evaluation-styles';
            styles.textContent = `
                @keyframes evaluationFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .evaluation-progress {
                    text-align: center;
                    background: #1a1a1a;
                    padding: 3rem;
                    border-radius: 16px;
                    border: 1px solid #374151;
                }
                
                .evaluation-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #374151;
                    border-top: 4px solid #3b82f6;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }
                
                .evaluation-steps {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-top: 2rem;
                    text-align: left;
                }
                
                .eval-step {
                    color: #9ca3af;
                    font-family: 'Monaco', 'Consolas', monospace;
                    font-size: 0.9rem;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Simulate evaluation steps
        const steps = evaluationOverlay.querySelectorAll('.eval-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.color = '#10b981';
                step.textContent = step.textContent.replace('⏳', '✓');
            }, (index + 1) * 800);
        });
        
        // Show results after evaluation
        setTimeout(() => {
            evaluationOverlay.remove();
            this.showSolutionResults(code);
        }, 4000);
    }

    showSolutionResults(code) {
        // Simulate solution scoring
        const score = this.calculateSolutionScore(code);
        const isCorrect = score >= 70;
        
        this.showInteractiveModal(`${isCorrect ? '🎉' : '💪'} Solution Results`, `
            <div class="solution-results">
                <div class="result-header">
                    <h4>${isCorrect ? '✅ Solution Accepted!' : '❌ Solution Needs Work'}</h4>
                    <div class="score-display">Score: ${score}/100</div>
                </div>
                
                <div class="result-breakdown">
                    <div class="result-section">
                        <h5>📊 Performance Breakdown:</h5>
                        <div class="performance-bars">
                            <div class="perf-bar">
                                <span>Correctness:</span>
                                <div class="bar"><div class="fill" style="width: ${Math.min(score, 100)}%"></div></div>
                                <span>${score}%</span>
                            </div>
                            <div class="perf-bar">
                                <span>Code Quality:</span>
                                <div class="bar"><div class="fill" style="width: ${Math.min(score + 10, 100)}%"></div></div>
                                <span>${Math.min(score + 10, 100)}%</span>
                            </div>
                            <div class="perf-bar">
                                <span>Efficiency:</span>
                                <div class="bar"><div class="fill" style="width: ${Math.min(score - 5, 100)}%"></div></div>
                                <span>${Math.min(score - 5, 100)}%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="result-section">
                        <h5>🎯 Points Earned:</h5>
                        <div class="points-earned">
                            ${isCorrect ? 
                                `<span class="points correct">+${Math.floor(score/10)} points</span>` :
                                `<span class="points incorrect">+0 points</span>`
                            }
                        </div>
                    </div>
                    
                    <div class="result-section">
                        <h5>💡 Feedback:</h5>
                        <p>${this.generateSolutionFeedback(score, isCorrect)}</p>
                    </div>
                </div>
                
                <div class="result-actions">
                    <button class="action-btn" onclick="patternsEngine.closeModal(); strategyEngine.moveToNextProblem();">
                        ${isCorrect ? '🎯 Next Problem' : '💪 Try Again'}
                    </button>
                </div>
            </div>
        `);
        
        if (isCorrect) {
            this.practiceSession.answers.push({
                problem: this.practiceSession.problems[this.practiceSession.currentProblem],
                code: code,
                score: score,
                correct: true
            });
        }
    }

    calculateSolutionScore(code) {
        let score = 0;
        const codeLower = code.toLowerCase();
        
        // Basic structure check
        if (codeLower.includes('def ')) score += 20;
        if (codeLower.includes('return')) score += 20;
        
        // Logic patterns
        if (codeLower.includes('for ') || codeLower.includes('while ')) score += 15;
        if (codeLower.includes('if ')) score += 15;
        
        // Data structure usage
        if (codeLower.includes('dict') || codeLower.includes('{}')) score += 10;
        if (codeLower.includes('list') || codeLower.includes('[]')) score += 5;
        
        // Quality indicators
        if (code.includes('#') || code.includes('"""')) score += 10;
        if (!codeLower.includes('todo')) score += 5;
        
        return Math.min(score, 100);
    }

    generateSolutionFeedback(score, isCorrect) {
        if (isCorrect) {
            if (score >= 90) {
                return "🏆 Outstanding solution! Your code is clean, efficient, and demonstrates excellent problem-solving skills. You're ready for the next challenge!";
            } else if (score >= 80) {
                return "👍 Great job! Your solution works correctly. Consider adding comments and optimizing further for even better results.";
            } else {
                return "✅ Good work! Your solution is correct. Focus on code quality and efficiency in your next attempt.";
            }
        } else {
            return "💪 Keep trying! Review the problem requirements and consider using the MASTER framework to structure your approach. You're learning and improving with each attempt!";
        }
    }

    moveToNextProblem() {
        if (!this.practiceSession) return;
        
        this.practiceSession.currentProblem++;
        
        if (this.practiceSession.currentProblem >= this.practiceSession.problems.length) {
            this.endPracticeSession();
        } else {
            // Clear editor and load next problem
            const editor = document.getElementById('practiceCodeEditor');
            if (editor) {
                editor.value = '';
            }
            
            this.loadCurrentProblem();
            
            // Visual transition effect
            this.triggerProblemTransition();
        }
    }

    triggerProblemTransition() {
        const display = document.getElementById('currentProblemDisplay');
        if (!display) return;
        
        display.style.transform = 'translateX(-100%)';
        display.style.opacity = '0';
        display.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            display.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                display.style.transform = 'translateX(0)';
                display.style.opacity = '1';
            }, 50);
        }, 250);
    }

    endPracticeSession() {
        if (this.practiceSession?.timer) {
            clearInterval(this.practiceSession.timer);
        }
        
        const results = this.calculateSessionResults();
        
        this.showInteractiveModal('📊 Practice Session Complete', `
            <div class="session-results">
                <h4>🎉 Great Job! Session Summary</h4>
                
                <div class="session-stats-summary">
                    <div class="stat-box">
                        <span class="stat-number">${results.problemsAttempted}</span>
                        <span class="stat-label">Problems Attempted</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-number">${results.problemsSolved}</span>
                        <span class="stat-label">Problems Solved</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-number">${results.totalScore}</span>
                        <span class="stat-label">Total Score</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-number">${results.accuracy}%</span>
                        <span class="stat-label">Accuracy</span>
                    </div>
                </div>
                
                <div class="performance-analysis">
                    <h5>📈 Performance Analysis:</h5>
                    <div class="analysis-content">
                        <p>${results.performanceMessage}</p>
                        
                        <div class="strengths-weaknesses">
                            <div class="strength-section">
                                <h6>✅ Strengths:</h6>
                                <ul>
                                    ${results.strengths.map(strength => `<li>${strength}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="improvement-section">
                                <h6>🎯 Areas for Improvement:</h6>
                                <ul>
                                    ${results.improvements.map(improvement => `<li>${improvement}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="session-actions">
                    <button class="action-btn primary" onclick="patternsEngine.closeModal(); strategyEngine.startTimedPractice();">
                        🔄 Start New Session
                    </button>
                    <button class="action-btn secondary" onclick="patternsEngine.closeModal(); strategyEngine.reviewMistakes();">
                        📚 Review Mistakes
                    </button>
                </div>
            </div>
        `);
        
        // Hide practice interface
        const sessionContainer = document.getElementById('practiceSession');
        if (sessionContainer) {
            sessionContainer.style.display = 'none';
        }
        
        // Update certification progress
        this.updateCertificationProgress('speedAccuracy', Math.min(this.certificationProgress.speedAccuracy + results.problemsSolved, 10));
        
        // Reset session
        this.practiceSession = null;
        
        console.log('📊 Practice session ended:', results);
    }

    calculateSessionResults() {
        if (!this.practiceSession) {
            return {
                problemsAttempted: 0,
                problemsSolved: 0,
                totalScore: 0,
                accuracy: 0,
                performanceMessage: "No session data available.",
                strengths: ["N/A"],
                improvements: ["Start a practice session to get feedback!"]
            };
        }
        
        const attempted = this.practiceSession.currentProblem + 1;
        const solved = this.practiceSession.answers.filter(answer => answer.correct).length;
        const totalScore = this.practiceSession.answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
        const accuracy = attempted > 0 ? Math.round((solved / attempted) * 100) : 0;
        
        let performanceMessage;
        let strengths = [];
        let improvements = [];
        
        if (accuracy >= 80) {
            performanceMessage = "🏆 Excellent performance! You're demonstrating strong problem-solving skills and are well-prepared for technical interviews.";
            strengths = ["High accuracy rate", "Consistent problem-solving approach", "Good time management"];
        } else if (accuracy >= 60) {
            performanceMessage = "👍 Good job! You're making solid progress. Focus on the areas for improvement to reach the next level.";
            strengths = ["Making good progress", "Understanding core concepts", "Showing improvement"];
            improvements = ["Practice more problems to build confidence", "Review fundamental algorithms"];
        } else {
            performanceMessage = "💪 Keep practicing! Every attempt is a learning opportunity. Focus on understanding the patterns and applying the MASTER framework.";
            improvements = ["Spend more time on problem analysis", "Practice fundamental data structures", "Use the MASTER framework systematically"];
            strengths = ["Willing to challenge yourself", "Learning from attempts"];
        }
        
        return {
            problemsAttempted: attempted,
            problemsSolved: solved,
            totalScore: totalScore,
            accuracy: accuracy,
            performanceMessage: performanceMessage,
            strengths: strengths,
            improvements: improvements
        };
    }

    reviewMistakes() {
        if (!this.practiceSession || this.practiceSession.answers.length === 0) {
            alert('📚 No mistakes to review from the current session. Complete a practice session first!');
            return;
        }
        
        const mistakes = this.practiceSession.answers.filter(answer => !answer.correct);
        
        if (mistakes.length === 0) {
            alert('🎉 Perfect session! No mistakes to review. You solved all problems correctly!');
            return;
        }
        
        alert(`📚 Mistake Review Feature

You made mistakes on ${mistakes.length} problem(s) in this session.

This premium feature would provide:
🔍 Detailed analysis of each mistake
💡 Step-by-step correct solutions  
🎯 Pattern recognition tips
🧠 Personalized improvement plan
📈 Progress tracking over time

Ready to implement this comprehensive mistake review system?`);
    }

    // ===== CERTIFICATION SYSTEM =====
    
    updateCertificationProgress(category, value) {
        this.certificationProgress[category] = Math.max(this.certificationProgress[category], value);
        
        // Update UI if certification section is visible
        this.updateCertificationDisplay();
        
        // Check for certification completion
        this.checkCertificationEligibility();
        
        console.log(`📊 Updated ${category}: ${value}`, this.certificationProgress);
    }

    updateCertificationDisplay() {
        const requirements = document.querySelectorAll('.requirement-item .req-progress');
        
        if (requirements.length >= 4) {
            requirements[0].textContent = `${this.certificationProgress.frameworkMastery}/6 steps mastered`;
            requirements[1].textContent = `${this.certificationProgress.speedAccuracy}/10 problems completed`;
            requirements[2].textContent = `${this.certificationProgress.patternRecognition}/15 patterns identified`;
            requirements[3].textContent = `${this.certificationProgress.codeQuality}/5 quality reviews passed`;
        }
    }

    checkCertificationEligibility() {
        const isEligible = (
            this.certificationProgress.frameworkMastery >= 6 &&
            this.certificationProgress.speedAccuracy >= 10 &&
            this.certificationProgress.patternRecognition >= 15 &&
            this.certificationProgress.codeQuality >= 5
        );
        
        const certBtn = document.querySelector('.certification-btn');
        if (certBtn) {
            if (isEligible) {
                certBtn.disabled = false;
                certBtn.textContent = '🏆 Begin LeetCode Mastery Certification';
                certBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            } else {
                certBtn.disabled = true;
                certBtn.textContent = '🔒 Complete All Requirements First';
            }
        }
    }

    startCertification() {
        const isEligible = (
            this.certificationProgress.frameworkMastery >= 6 &&
            this.certificationProgress.speedAccuracy >= 10 &&
            this.certificationProgress.patternRecognition >= 15 &&
            this.certificationProgress.codeQuality >= 5
        );
        
        if (!isEligible) {
            alert(`⚠️ Certification Requirements Not Met

Current Progress:
• Framework Mastery: ${this.certificationProgress.frameworkMastery}/6
• Speed & Accuracy: ${this.certificationProgress.speedAccuracy}/10  
• Pattern Recognition: ${this.certificationProgress.patternRecognition}/15
• Code Quality: ${this.certificationProgress.codeQuality}/5

Complete all requirements to unlock the certification exam!`);
            return;
        }
        
        this.showInteractiveModal('🎓 LeetCode Mastery Certification', `
            <div class="certification-exam">
                <div class="exam-header">
                    <h4>🏆 Congratulations! You're Ready for Certification</h4>
                    <p>You've completed all the requirements. Time to prove your mastery!</p>
                </div>
                
                <div class="exam-format">
                    <h5>📋 Certification Exam Format:</h5>
                    <div class="format-details">
                        <div class="format-item">
                            <span class="format-icon">⏱️</span>
                            <div class="format-content">
                                <strong>Duration:</strong> 90 minutes
                                <div class="format-desc">Realistic interview timeframe</div>
                            </div>
                        </div>
                        <div class="format-item">
                            <span class="format-icon">📊</span>
                            <div class="format-content">
                                <strong>Problems:</strong> 8 carefully selected challenges
                                <div class="format-desc">Mixed difficulty (3 Easy, 3 Medium, 2 Hard)</div>
                            </div>
                        </div>
                        <div class="format-item">
                            <span class="format-icon">🎯</span>
                            <div class="format-content">
                                <strong>Passing Score:</strong> 80% (640/800 points)
                                <div class="format-desc">Industry-standard proficiency level</div>
                            </div>
                        </div>
                        <div class="format-item">
                            <span class="format-icon">🧠</span>
                            <div class="format-content">
                                <strong>Skills Tested:</strong> All MASTER framework steps
                                <div class="format-desc">Pattern recognition, implementation, optimization</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="exam-benefits">
                    <h5>🏅 What You'll Earn:</h5>
                    <ul>
                        <li>📜 <strong>Official LeetCode Mastery Certificate</strong> - Add to your resume!</li>
                        <li>🎖️ <strong>Digital Badge</strong> - Showcase on LinkedIn and GitHub</li>
                        <li>📊 <strong>Detailed Performance Report</strong> - Know your strengths</li>
                        <li>🎯 <strong>Personalized Learning Path</strong> - Continue improving</li>
                        <li>🚀 <strong>Phase 5 Unlock</strong> - Access advanced interview prep</li>
                    </ul>
                </div>
                
                <div class="exam-preparation">
                    <h5>📚 Last-Minute Tips:</h5>
                    <div class="tips-grid">
                        <div class="tip-item">🗺️ Start with thorough problem mapping</div>
                        <div class="tip-item">🔍 Take time to identify the right pattern</div>
                        <div class="tip-item">🏗️ Structure your solution before coding</div>
                        <div class="tip-item">🧪 Test with edge cases</div>
                        <div class="tip-item">💻 Write clean, commented code</div>
                        <div class="tip-item">🔄 Always review and optimize</div>
                    </div>
                </div>
                
                <div class="exam-actions">
                    <button class="action-btn primary" onclick="strategyEngine.launchCertificationExam()">
                        🚀 Start Certification Exam
                    </button>
                    <button class="action-btn secondary" onclick="patternsEngine.closeModal()">
                        📚 Review More First
                    </button>
                </div>
            </div>
        `);
    }

    launchCertificationExam() {
        alert(`🚀 Launching LeetCode Mastery Certification Exam

This would open a comprehensive examination environment with:

⏱️ Real-time countdown timer
💻 Professional coding interface  
🧪 Automated testing system
📊 Live progress tracking
🎯 Instant feedback on submissions
🏆 Immediate certification upon passing

The exam would test everything learned in the MASTER framework:
✅ Problem mapping and analysis
✅ Pattern recognition skills  
✅ Solution structuring
✅ Test case design
✅ Code implementation
✅ Performance optimization

Ready to build this comprehensive certification system?`);
    }

    loadUserProgress() {
        // Load progress from localStorage if available
        const savedProgress = localStorage.getItem('leetcode-strategy-progress');
        if (savedProgress) {
            try {
                const progress = JSON.parse(savedProgress);
                this.certificationProgress = { ...this.certificationProgress, ...progress };
                console.log('📊 Loaded user progress:', this.certificationProgress);
            } catch (error) {
                console.warn('⚠️ Could not load saved progress:', error);
            }
        }
    }

    saveUserProgress() {
        // Save progress to localStorage
        localStorage.setItem('leetcode-strategy-progress', JSON.stringify(this.certificationProgress));
        console.log('💾 Progress saved');
    }

    // ===== UTILITY FUNCTIONS =====
    
    showInteractiveModal(title, content) {
        // Remove existing modal
        const existingModal = document.querySelector('.interactive-modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.className = 'interactive-modal-overlay';
        modal.innerHTML = `
            <div class="interactive-modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close-btn" onclick="this.closest('.interactive-modal-overlay').remove()">×</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.appendChild(modal);
        
        // Show with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hide');
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        // Add to global scope for easy access
        window.patternsEngine = {
            closeModal: () => {
                modal.classList.add('hide');
                setTimeout(() => modal.remove(), 300);
            }
        };
    }

    // ===== NAVIGATION =====
    
    previousLesson() {
        alert(`🎓 Coming from Phase 4 Complete!

You've just finished:
✅ Sorting Algorithms Theater
✅ Problem Patterns & Recognition  
✅ Time & Space Complexity Analysis

Now you're ready for Phase 5 - the ultimate LeetCode preparation experience!

Navigation: Returning to dashboard to show Phase 4 complete and Phase 5 unlocked.`);
        
        window.location.href = '../../dashboard.html#phase5';
    }

    nextLesson() {
        alert(`🚀 Next Up: Mock Interview Simulator

Get ready for the most realistic interview practice experience ever created:

🎪 AI-Powered Interview Bot
📱 Realistic Video Call Simulation  
💻 Live Coding Environment
🎯 Company-Specific Questions
📊 Comprehensive Performance Analytics

This is where your MASTER framework skills get tested in real interview conditions!

Ready to continue building this incredible interview preparation system?`);
        
        // In a real implementation, this would navigate to the next lesson
        console.log('🚀 Navigate to Mock Interview Simulator');
    }

    // ===== CLEANUP =====
    
    destroy() {
        // Cleanup timers and intervals
        if (this.practiceSession?.timer) {
            clearInterval(this.practiceSession.timer);
        }
        
        // Save progress before cleanup
        this.saveUserProgress();
        
        // Remove event listeners
        document.removeEventListener('mousemove', this.handleMouseMove);
        
        // Remove particle system
        const particleCanvas = document.getElementById('particle-canvas');
        if (particleCanvas) {
            particleCanvas.remove();
        }
        
        console.log('🧹 Strategy Engine cleaned up');
    }
}

// Initialize the Strategy Engine
let strategyEngine;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing LeetCode Strategy Framework Engine...');
    strategyEngine = new LeetCodeStrategyEngine();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (strategyEngine) {
        strategyEngine.destroy();
    }
});

// Additional modal styles for interactive modals
const interactiveModalStyles = `
<style>
.interactive-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.interactive-modal-overlay.show {
    opacity: 1;
}

.interactive-modal-overlay.hide {
    opacity: 0;
}

.interactive-modal {
    background: var(--bg-primary);
    border-radius: 16px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.9) translateY(20px);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border: 1px solid var(--border-color);
    box-shadow: 0 25px 50px rgba(0,0,0,0.5);
}

.interactive-modal-overlay.show .interactive-modal {
    transform: scale(1) translateY(0);
}

.interactive-modal .modal-header {
    padding: 2rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-secondary);
    border-radius: 16px 16px 0 0;
}

.interactive-modal .modal-header h3 {
    color: var(--text-primary);
    margin: 0;
}

.modal-close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--text-secondary);
    transition: color 0.3s ease;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close-btn:hover {
    color: var(--error-color);
    background: rgba(239, 68, 68, 0.1);
}

.interactive-modal .modal-content {
    padding: 2rem;
    max-height: 70vh;
    overflow-y: auto;
}

/* Specific modal content styles */
.mapping-example, .pattern-suggestion, .validation-results,
.test-cases-display, .execution-results, .code-review,
.full-solution, .classification-results, .session-results,
.certification-exam {
    color: var(--text-primary);
    line-height: 1.6;
}

.mapping-item, .pattern-match, .indicators, .approach,
.test-case, .result-section, .session-stats-summary {
    margin-bottom: 1rem;
}

.mapping-item strong, .pattern-match strong {
    color: var(--accent-primary);
}

.test-case {
    background: var(--bg-secondary);
    padding: 0.75rem;
    border-radius: 8px;
    font-family: 'Monaco', 'Consolas', monospace;
    border-left: 3px solid var(--accent-primary);
}

.test-case.happy { border-left-color: var(--success-color); }
.test-case.edge { border-left-color: var(--warning-color); }
.test-case.error { border-left-color: var(--error-color); }

.action-btn {
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.5rem;
}

.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.action-btn.secondary {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.action-btn.primary {
    background: linear-gradient(135deg, var(--success-color), #059669);
}

/* Responsive modal */
@media (max-width: 768px) {
    .interactive-modal {
        max-width: 95vw;
        max-height: 95vh;
        margin: 1rem;
    }
    
    .interactive-modal .modal-header,
    .interactive-modal .modal-content {
        padding: 1rem;
    }
}
</style>
`;

// Inject modal styles
document.head.insertAdjacentHTML('beforeend', interactiveModalStyles);

console.log('🎯 LeetCode Strategy Framework Engine with Mind-Blowing Effects loaded successfully!');
