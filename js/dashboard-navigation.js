// Enhanced Dashboard Navigation System
class DashboardNavigation {
    constructor() {
        this.currentPhase = this.getCurrentPhase();
        this.userProgress = this.getUserProgress();
        this.lessonMap = this.createLessonMap();
        this.init();
    }

    init() {
        this.updateProgressDisplay();
        this.setupNavigationHandlers();
        this.updateCurrentLessonDisplay();
        this.checkPhaseUnlocks();
    }

    createLessonMap() {
        return {
            'phase1': {
                'variables-datatypes': {
                    title: 'Variables & Data Types',
                    url: 'content/phase1/variables-datatypes.html',
                    completed: true,
                    next: 'mathematical-operations'
                },
                'mathematical-operations': {
                    title: 'Mathematical Operations',
                    url: 'content/phase1/mathematical-operations.html',
                    completed: true,
                    next: 'control-flow',
                    prev: 'variables-datatypes'
                },
                'control-flow': {
                    title: 'Control Flow & Decision Making',
                    url: 'content/phase1/control-flow.html',
                    completed: true,
                    prev: 'mathematical-operations'
                }
            },
            'phase2': {
                'data-structures': {
                    title: 'Data Structure Mastery',
                    url: 'content/phase2/data-structures.html',
                    completed: true,
                    next: 'loops-iteration'
                },
                'loops-iteration': {
                    title: 'Loops & Iteration',
                    url: 'content/phase2/loops-iteration.html',
                    completed: true,
                    prev: 'data-structures'
                }
            },
            'phase3': {
                'oop-fundamentals': {
                    title: 'OOP Fundamentals',
                    url: 'content/phase3/oop-fundamentals.html',
                    completed: true,
                    next: 'advanced-data-structures'
                },
                'advanced-data-structures': {
                    title: 'Advanced Data Structures',
                    url: 'content/phase3/advanced-data-structures.html',
                    completed: true,
                    prev: 'oop-fundamentals'
                }
            },
            'phase4': {
                'sorting-algorithms': {
                    title: 'Sorting Algorithms',
                    url: 'content/phase4/sorting-algorithms.html',
                    completed: false
                }
            }
        };
    }

    getCurrentPhase() {
        return localStorage.getItem('currentPhase') || 'phase1';
    }

    getUserProgress() {
        return JSON.parse(localStorage.getItem('userProgress') || '{}');
    }

    updateCurrentLessonDisplay() {
        const currentLessonEl = document.getElementById('currentLessonText');
        
        // Determine the next lesson to continue
        let nextLesson = this.findNextLesson();
        
        if (currentLessonEl && nextLesson) {
            currentLessonEl.textContent = `${nextLesson.phase}: ${nextLesson.title}`;
        }
    }

    findNextLesson() {
        // Find the first incomplete lesson
        for (let phase in this.lessonMap) {
            for (let lesson in this.lessonMap[phase]) {
                if (!this.lessonMap[phase][lesson].completed) {
                    return {
                        phase: phase.toUpperCase(),
                        title: this.lessonMap[phase][lesson].title,
                        url: this.lessonMap[phase][lesson].url
                    };
                }
            }
        }
        
        // If all lessons are complete, return the last one
        return {
            phase: 'PHASE 3',
            title: 'OOP Fundamentals',
            url: 'content/phase3/oop-fundamentals.html'
        };
    }

    continueCurrentLesson() {
        const nextLesson = this.findNextLesson();
        if (nextLesson) {
            window.location.href = nextLesson.url;
        }
    }

    // Phase Selector Modal
    openPhaseSelector() {
        const modal = this.createPhaseSelectorModal();
        document.body.appendChild(modal);
        modal.style.display = 'block';
    }

    createPhaseSelectorModal() {
        const modal = document.createElement('div');
        modal.className = 'modal phase-selector-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🎯 Select Learning Phase</h3>
                    <button onclick="this.closest('.modal').remove()" class="close-btn">×</button>
                </div>
                <div class="phase-selector-content">
                    <div class="phase-option available" onclick="navigateToPhase('phase1')">
                        <div class="phase-icon">📚</div>
                        <div class="phase-info">
                            <h4>Phase 1: Foundations</h4>
                            <p>Variables, Data Types, Mathematical Operations</p>
                            <div class="phase-status completed">✅ 67% Complete</div>
                        </div>
                    </div>
                    
                    <div class="phase-option available" onclick="navigateToPhase('phase2')">
                        <div class="phase-icon">🏗️</div>
                        <div class="phase-info">
                            <h4>Phase 2: Core Concepts</h4>
                            <p>Data Structures, Loops & Iteration</p>
                            <div class="phase-status completed">✅ 100% Complete</div>
                        </div>
                    </div>
                    
                    <div class="phase-option available" onclick="navigateToPhase('phase3')">
                        <div class="phase-icon">🚀</div>
                        <div class="phase-info">
                            <h4>Phase 3: Application</h4>
                            <p>Object-Oriented Programming</p>
                            <div class="phase-status current">▶️ Current</div>
                        </div>
                    </div>
                    
                    <div class="phase-option locked">
                        <div class="phase-icon">⚡</div>
                        <div class="phase-info">
                            <h4>Phase 4: Advanced Topics</h4>
                            <p>Algorithms and Optimization</p>
                            <div class="phase-status locked">🔒 Locked</div>
                        </div>
                    </div>
                    
                    <div class="phase-option locked">
                        <div class="phase-icon">🏆</div>
                        <div class="phase-info">
                            <h4>Phase 5: Mastery & Review</h4>
                            <p>LeetCode Preparation</p>
                            <div class="phase-status locked">🔒 Locked</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return modal;
    }

    // Study Plan Modal
    openStudyPlan() {
        const modal = this.createStudyPlanModal();
        document.body.appendChild(modal);
        modal.style.display = 'block';
    }

    createStudyPlanModal() {
        const modal = document.createElement('div');
        modal.className = 'modal study-plan-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>📅 Your Personalized Study Plan</h3>
                    <button onclick="this.closest('.modal').remove()" class="close-btn">×</button>
                </div>
                <div class="study-plan-content">
                    <div class="plan-summary">
                        <h4>📊 Progress Summary</h4>
                        <div class="summary-stats">
                            <div class="stat-item">
                                <span class="stat-number">67%</span>
                                <span class="stat-label">Overall Progress</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">4</span>
                                <span class="stat-label">Lessons Completed</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">7</span>
                                <span class="stat-label">Day Streak</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="upcoming-lessons">
                        <h4>📚 Recommended Next Steps</h4>
                        <div class="lesson-recommendations">
                            <div class="rec-item priority-high" onclick="window.location.href='content/phase1/control-flow.html'">
                                <span class="priority-badge">High Priority</span>
                                <h5>Complete Control Flow</h5>
                                <p>Finish Phase 1 foundations</p>
                                <span class="estimated-time">⏱️ 45 min</span>
                            </div>
                            <div class="rec-item priority-medium">
                                <span class="priority-badge">Medium Priority</span>
                                <h5>Practice Phase 2 Exercises</h5>
                                <p>Reinforce data structures knowledge</p>
                                <span class="estimated-time">⏱️ 30 min</span>
                            </div>
                            <div class="rec-item priority-low">
                                <span class="priority-badge">Low Priority</span>
                                <h5>Review Phase 1 Notes</h5>
                                <p>Strengthen fundamentals</p>
                                <span class="estimated-time">⏱️ 15 min</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return modal;
    }

    // Interactive Tools
    openCodePlayground() {
        window.open('code-playground.html', '_blank');
    }

    openProgressTracker() {
        const modal = this.createProgressTrackerModal();
        document.body.appendChild(modal);
        modal.style.display = 'block';
    }

    openNotesPad() {
        window.open('notes-pad.html', '_blank');
    }

    // Utility Functions
    checkPhaseUnlocks() {
        // Logic to unlock phases based on completion
        // This would integrate with your progress tracking system
    }

    updateProgressDisplay() {
        // Update the circular progress display
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            // Calculate overall progress
            const overallProgress = this.calculateOverallProgress();
            progressFill.style.strokeDashoffset = 314 - (314 * overallProgress / 100);
            
            const percentageEl = document.querySelector('.percentage');
            if (percentageEl) {
                percentageEl.textContent = `${overallProgress}%`;
            }
        }
    }

    calculateOverallProgress() {
        let totalLessons = 0;
        let completedLessons = 0;
        
        for (let phase in this.lessonMap) {
            for (let lesson in this.lessonMap[phase]) {
                totalLessons++;
                if (this.lessonMap[phase][lesson].completed) {
                    completedLessons++;
                }
            }
        }
        
        return Math.round((completedLessons / totalLessons) * 100);
    }

    setupNavigationHandlers() {
        // Add event listeners for navigation
        window.continueCurrentLesson = () => this.continueCurrentLesson();
        window.openPhaseSelector = () => this.openPhaseSelector();
        window.openStudyPlan = () => this.openStudyPlan();
        window.openCodePlayground = () => this.openCodePlayground();
        window.openProgressTracker = () => this.openProgressTracker();
        window.openNotesPad = () => this.openNotesPad();
    }
}

// Global navigation functions
function navigateToPhase(phase) {
    const urls = {
        'phase1': 'content/phase1/variables-datatypes.html',
        'phase2': 'content/phase2/data-structures.html', 
        'phase3': 'content/phase3/oop-fundamentals.html'
    };
    
    if (urls[phase]) {
        window.location.href = urls[phase];
    }
    
    // Close modal
    const modal = document.querySelector('.phase-selector-modal');
    if (modal) modal.remove();
}

function showComingSoon(feature) {
    alert(`🚧 ${feature} is coming soon!\n\nWe're working hard to bring you this content. Check back soon for updates!`);
}

// Enhanced Navigation System
function openLearningPath() {
    alert(`🗺️ Your Learning Path - CodeMaster Academy

COMPLETED PHASES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Phase 1: Foundations (170 min)
   • Variables & Data Types
   • Mathematical Operations  
   • Control Flow & Decision Making

✅ Phase 2: Core Concepts (150 min)
   • Data Structure Mastery
   • Loops & Iteration

✅ Phase 3: Application (210 min)
   • OOP Fundamentals
   • Advanced Data Structures

CURRENT PHASE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎭 Phase 4: Advanced Topics (90/270 min)
   ✅ Sorting Algorithms Theater
   🔓 Problem Patterns & Recognition
   🔒 Time & Space Complexity

UPCOMING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 Phase 5: Mastery & Review
   • LeetCode Strategy Framework
   • Mock Interview Simulator  
   • Final Portfolio Projects

Total Progress: 530/1000+ min (53% Complete)
You're doing amazing! Keep up the momentum!`);
}

function showProgress() {
    alert(`📊 Learning Analytics - Your Progress

OVERALL COMPLETION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Phases Completed: 3/5 (60%)
⏱️ Total Study Time: 530 minutes (8.8 hours)
🏆 Concepts Mastered: 8/13 (62%)
💪 Practice Problems: 45+ solved
🎓 Projects Built: 6 interactive projects

SKILL BREAKDOWN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟢 Python Fundamentals: 100%
🟢 Data Structures: 100% 
🟢 Object-Oriented Programming: 100%
🟡 Algorithms & Sorting: 85%
🔴 Problem Patterns: 15%
🔴 LeetCode Strategy: 0%

LEARNING STREAK:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Streak: 🔥 7 days
Longest Streak: 🏆 12 days
Average Session: ⏰ 45 minutes

Keep going! You're 80% of the way to LeetCode mastery!`);
}

function showAchievements() {
    alert(`🏆 Your Achievements - CodeMaster Academy

FOUNDATION BADGES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 First Steps - Completed first lesson
📦 Data Master - Mastered all Python data types  
🧮 Math Wizard - Solved 20+ mathematical problems
🎛️ Decision Maker - Built complex conditional logic

CORE CONCEPT BADGES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏗️ Structure Builder - Mastered lists, dicts, sets
🔄 Loop Ninja - Created efficient iteration patterns
🏛️ OOP Architect - Built object-oriented systems
🌳 Tree Walker - Traversed advanced data structures

ADVANCED BADGES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎭 Algorithm Artist - Visualized sorting algorithms
⚡ Speed Demon - Optimized algorithm performance
🧪 Lab Scientist - Experimented with data patterns
💻 Code Challenger - Implemented custom algorithms

STREAK BADGES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔥 Week Warrior - 7-day learning streak
🏆 Consistency King - 45+ practice problems

Total Badges Earned: 12/20
Keep learning to unlock more achievements!`);
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardNav = new DashboardNavigation();
});

// Export for use in other files
window.DashboardNavigation = DashboardNavigation;

// New function for Phase 1 completion celebration
function celebratePhase1Completion() {
    const celebration = `
🎉 AMAZING ACHIEVEMENT! 🎉
===============================

You've mastered the FOUNDATIONS of programming!

✅ Variables & Data Types - Storage mastery
✅ Mathematical Operations - Logic & calculations  
✅ Control Flow - Decision making power

🧠 Skills Unlocked:
• Python fundamentals
• Problem-solving logic
• Interactive programming
• Real-world applications

🚀 You're now ready for Phase 2: Core Concepts!
   • Data Structures (lists, dicts, sets)
   • Loops & Iteration patterns
   • Advanced programming techniques

Ready to level up?`;

    alert(celebration);
    
    setTimeout(() => {
        const proceed = confirm("🚀 Ready to start Phase 2: Core Concepts?");
        if (proceed) {
            window.location.href = 'content/phase2/data-structures.html';
        }
    }, 1500);
}

function continueToPhase2() {
    window.location.href = 'content/phase2/data-structures.html';
}

// Add to js/dashboard-navigation.js
function celebratePhase3Completion() {
    const celebration = `
🎉 PHASE 3 MASTERY ACHIEVED! 🎉
=====================================

You've conquered advanced programming concepts!

✅ Object-Oriented Programming - Code organization mastery
✅ Advanced Data Structures - Trees, heaps, graphs, hash tables
✅ Algorithm Implementation - Search, traversal, optimization
✅ Real-world Applications - Complex problem solving

🧠 Professional Skills Unlocked:
• Advanced data structure selection
• Algorithm complexity analysis  
• Object-oriented design patterns
• Performance optimization techniques

🚀 Ready for Phase 4: Advanced Topics!
   • Sorting Algorithm Visualizations
   • Problem Pattern Recognition
   • Time Complexity Deep Dive
   • LeetCode Preparation Strategy

Your programming skills are now at industry level!`;

    alert(celebration);

    setTimeout(() => {
        const proceed = confirm("🚀 Ready to master Phase 4: Advanced Topics?");
        if (proceed) {
            window.location.href = 'content/phase4/sorting-algorithms.html';
        }
    }, 2000);
}
