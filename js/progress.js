 // Progress tracking and data management
class ProgressManager {
    constructor() {
        this.phases = [
            {
                id: 1,
                title: "Foundations",
                description: "Variables, loops, conditionals",
                lessons: ["Variables & Data Types", "Loops & Conditionals", "Basic Problem Solving"],
                completed: false,
                progress: 0,
                unlocked: true
            },
            {
                id: 2,
                title: "Core Concepts", 
                description: "Data structures, algorithms",
                lessons: ["Lists & Dictionaries", "Functions & Scope", "File Handling"],
                completed: false,
                progress: 0,
                unlocked: false
            },
            {
                id: 3,
                title: "Application",
                description: "OOP, project building",
                lessons: ["Classes & Objects", "Project Building", "Error Handling"],
                completed: false,
                progress: 0,
                unlocked: false
            },
            {
                id: 4,
                title: "Advanced Topics",
                description: "Complex algorithms",
                lessons: ["Sorting Algorithms", "Time Complexity", "Advanced Patterns"],
                completed: false,
                progress: 0,
                unlocked: false
            },
            {
                id: 5,
                title: "Mastery & Review",
                description: "LeetCode preparation",
                lessons: ["Problem Patterns", "Interview Prep", "Final Projects"],
                completed: false,
                progress: 0,
                unlocked: false
            }
        ];
        
        this.userProgress = this.loadProgress();
        this.initializeProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem('codeMasterProgress');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            completedLessons: 0,
            studyStreak: 1,
            overallProgress: 0,
            achievements: [],
            currentPhase: 1,
            currentLesson: "Start your learning journey"
        };
    }

    saveProgress() {
        localStorage.setItem('codeMasterProgress', JSON.stringify(this.userProgress));
    }

    initializeProgress() {
        // Unlock first phase
        this.phases[0].unlocked = true;
        this.updateProgressDisplay();
    }

    completeLesson(phaseId, lessonIndex) {
        this.userProgress.completedLessons++;
        this.phases[phaseId - 1].progress = Math.min(100, this.phases[phaseId - 1].progress + 33.33);
        
        // Check if phase is completed
        if (this.phases[phaseId - 1].progress >= 100) {
            this.phases[phaseId - 1].completed = true;
            // Unlock next phase
            if (phaseId < this.phases.length) {
                this.phases[phaseId].unlocked = true;
                this.userProgress.currentPhase = phaseId + 1;
            }
        }
        
        // Update overall progress
        this.userProgress.overallProgress = this.calculateOverallProgress();
        this.saveProgress();
        this.updateProgressDisplay();
    }

    calculateOverallProgress() {
        const totalPhases = this.phases.length;
        const completedPhases = this.phases.filter(phase => phase.completed).length;
        const currentPhaseProgress = this.phases.find(phase => !phase.completed)?.progress || 0;
        
        return Math.round(((completedPhases + currentPhaseProgress / 100) / totalPhases) * 100);
    }

    updateProgressDisplay() {
        // Update progress circle
        const progressCircle = document.getElementById('progressCircle');
        const progressPercentage = document.getElementById('progressPercentage');
        const completedLessons = document.getElementById('completedLessons');
        const studyStreak = document.getElementById('studyStreak');

        if (progressCircle) {
            const circumference = 2 * Math.PI * 50;
            const offset = circumference - (this.userProgress.overallProgress / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }

        if (progressPercentage) {
            progressPercentage.textContent = `${this.userProgress.overallProgress}%`;
        }

        if (completedLessons) {
            completedLessons.textContent = this.userProgress.completedLessons;
        }

        if (studyStreak) {
            studyStreak.textContent = this.userProgress.studyStreak;
        }

        // Update phases timeline
        this.updatePhasesTimeline();
        
        // Update current lesson
        const currentLessonEl = document.getElementById('currentLesson');
        if (currentLessonEl) {
            currentLessonEl.textContent = this.userProgress.currentLesson;
        }
    }

    updatePhasesTimeline() {
        const timeline = document.getElementById('phasesTimeline');
        if (!timeline) return;

        timeline.innerHTML = this.phases.map(phase => {
            let statusClass = 'locked';
            let statusIcon = '🔒';

            if (phase.completed) {
                statusClass = 'completed';
                statusIcon = '✓';
            } else if (phase.unlocked) {
                statusClass = 'active';
                statusIcon = phase.id;
            }

            return `
                <div class="phase-item ${statusClass}" onclick="selectPhase(${phase.id})">
                    <div class="phase-number">${statusIcon}</div>
                    <div class="phase-content">
                        <div class="phase-title">${phase.title}</div>
                        <div class="phase-description">${phase.description}</div>
                        <div class="phase-progress">
                            <div class="progress-bar">
                                <div class="progress-bar-fill" style="width: ${phase.progress}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    getPhase(phaseId) {
        return this.phases.find(phase => phase.id === phaseId);
    }
}

// Initialize progress manager
let progressManager;

function initializeDashboard() {
    progressManager = new ProgressManager();
}

function selectPhase(phaseId) {
    const phase = progressManager.getPhase(phaseId);
    if (phase && phase.unlocked) {
        // Here you would navigate to the specific phase/lesson
        alert(`Starting ${phase.title}!\n\nLessons:\n${phase.lessons.map((lesson, i) => `${i + 1}. ${lesson}`).join('\n')}`);
        
        // Simulate lesson completion for demo
        if (!phase.completed) {
            progressManager.completeLesson(phaseId, 0);
        }
    } else {
        alert('This phase is locked! Complete previous phases to unlock.');
    }
}

function continueLesson() {
    // Find the current active phase
    const activePhase = progressManager.phases.find(phase => phase.unlocked && !phase.completed);
    if (activePhase) {
        selectPhase(activePhase.id);
    } else {
        alert('Congratulations! You have completed all phases!');
    }
}
// Event listener for DOMContentLoaded to initialize the dashboard
// Add to js/progress.js
function startPhase(phaseId) {
    const phaseUrls = {
        1: 'content/phase1/variables-datatypes.html',
        2: 'content/phase2/data-structures.html',
        3: 'content/phase3/oop-fundamentals.html'
    };
    
    if (phaseUrls[phaseId]) {
        window.location.href = phaseUrls[phaseId];
    }
}
// Add to js/progress.js
function selectPhase(phaseId) {
    const phase = progressManager.getPhase(phaseId);
    if (phase && phase.unlocked) {
        const phaseUrls = {
            1: 'content/phase1/variables-datatypes.html',
            2: 'content/phase2/loops-iteration.html',  // NEW LINK
            3: 'content/phase3/oop-fundamentals.html'
        };
        
        if (phaseUrls[phaseId]) {
            window.location.href = phaseUrls[phaseId];
        }
    }
}
