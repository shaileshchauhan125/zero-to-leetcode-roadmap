// Enhanced JavaScript functionality with working dark mode
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeModals();
    initializeAnimations();
    console.log('CodeMaster Academy loaded successfully!');
});

// Theme Management - FIXED
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    let currentTheme = localStorage.getItem('codemaster_theme') || 'light';
    
    // Apply theme immediately
    applyTheme(currentTheme);
    
    if (themeToggle) {
        // Update toggle button icon
        updateThemeIcon(currentTheme);
        
        // Add click event listener
        themeToggle.addEventListener('click', function() {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
            localStorage.setItem('codemaster_theme', currentTheme);
            updateThemeIcon(currentTheme);
            
            // Show theme change notification
            showNotification(`Switched to ${currentTheme} mode`, 'info');
        });
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
        metaThemeColor.setAttribute("content", theme === 'dark' ? '#0f172a' : '#ffffff');
    } else {
        // Create meta tag if it doesn't exist
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = theme === 'dark' ? '#0f172a' : '#ffffff';
        document.head.appendChild(meta);
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
    }
}

// Modal Management
function initializeModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="block"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

// Animations and Interactions
function initializeAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatableElements = document.querySelectorAll('.phase-card, .feature-card, .action-card');
    animatableElements.forEach(el => observer.observe(el));
}

// Practice Modal Functions
function showPractice() {
    const modal = document.getElementById('practiceModal');
    if (modal) {
        modal.style.display = 'block';
        // Focus on code input
        setTimeout(() => {
            const codeInput = document.getElementById('codeInput');
            if (codeInput) codeInput.focus();
        }, 100);
    }
}

function closePracticeModal() {
    const modal = document.getElementById('practiceModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Enhanced Code Execution
function runCode() {
    const codeInput = document.getElementById('codeInput');
    const outputArea = document.getElementById('codeOutput');
    
    if (!codeInput || !outputArea) return;
    
    const code = codeInput.value.trim();
    
    if (!code) {
        outputArea.innerHTML = '<div style="color: #f59e0b;">Please write some code first!</div>';
        return;
    }

    // Show loading state
    outputArea.innerHTML = '<div style="color: #64748b;">Running code...</div>';
    
    // Simulate code execution with delay for realism
    setTimeout(() => {
        try {
            const result = simulatePythonExecution(code);
            outputArea.innerHTML = `<div style="color: #10b981;">${result}</div>`;
        } catch (error) {
            outputArea.innerHTML = `<div style="color: #ef4444;">Error: ${error.message}</div>`;
        }
    }, 500);
}

function simulatePythonExecution(code) {
    // Enhanced Python execution simulation
    const lines = code.split('\n');
    let output = [];
    let variables = {};
    
    for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith('#')) continue;
        
        try {
            // Handle variable assignments
            if (line.includes(' = ') && !line.startsWith('print')) {
                const [varName, value] = line.split(' = ', 2);
                const cleanVar = varName.trim();
                const cleanValue = value.trim();
                
                // Parse different value types
                if (cleanValue === 'True') {
                    variables[cleanVar] = true;
                } else if (cleanValue === 'False') {
                    variables[cleanVar] = false;
                } else if (!isNaN(cleanValue) && !cleanValue.includes('"') && !cleanValue.includes("'")) {
                    variables[cleanVar] = parseFloat(cleanValue);
                } else if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) || 
                          (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
                    variables[cleanVar] = cleanValue.slice(1, -1);
                } else {
                    // Try to evaluate expression
                    variables[cleanVar] = evaluateExpression(cleanValue, variables);
                }
            }
            
            // Handle print statements
            if (line.startsWith('print(')) {
                const match = line.match(/print\((.*)\)$/);
                if (match) {
                    const content = match[1].trim();
                    const result = evaluatePrintContent(content, variables);
                    output.push(result);
                }
            }
        } catch (error) {
            throw new Error(`Line "${line}": ${error.message}`);
        }
    }
    
    return output.length > 0 ? output.join('\n') : 'Code executed successfully (no output)';
}

function evaluateExpression(expr, variables) {
    // Replace variables in expression
    let evaluatedExpr = expr;
    for (let [name, value] of Object.entries(variables)) {
        const regex = new RegExp(`\\b${name}\\b`, 'g');
        evaluatedExpr = evaluatedExpr.replace(regex, typeof value === 'string' ? `"${value}"` : value);
    }
    
    // Handle basic math expressions
    if (/^[\d\+\-\*\/\(\)\s\.]+$/.test(evaluatedExpr)) {
        try {
            return eval(evaluatedExpr);
        } catch (e) {
            return evaluatedExpr;
        }
    }
    
    return evaluatedExpr;
}

function evaluatePrintContent(content, variables) {
    // Handle f-strings
    if (content.startsWith('f"') || content.startsWith("f'")) {
        let result = content.slice(2, -1);
        
        // Replace {variable} with actual values
        result = result.replace(/\{([^}]+)\}/g, (match, varName) => {
            const cleanVarName = varName.trim();
            return variables.hasOwnProperty(cleanVarName) ? variables[cleanVarName] : match;
        });
        
        return result;
    }
    
    // Handle regular strings
    if ((content.startsWith('"') && content.endsWith('"')) || 
        (content.startsWith("'") && content.endsWith("'"))) {
        return content.slice(1, -1);
    }
    
    // Handle variables
    if (variables.hasOwnProperty(content)) {
        return variables[content];
    }
    
    // Handle expressions
    try {
        return evaluateExpression(content, variables);
    } catch (error) {
        return content;
    }
}

function checkSolution() {
    const codeInput = document.getElementById('codeInput');
    const outputArea = document.getElementById('codeOutput');
    
    if (!codeInput || !outputArea) return;
    
    const code = codeInput.value.trim();
    
    // Define expected solutions for different exercises
    const expectedSolutions = {
        'hello_world': (code) => {
            return code.toLowerCase().includes('print') && 
                   code.toLowerCase().includes('hello, world!');
        },
        'variables': (code) => {
            return code.includes('=') && 
                   (code.includes('print') || code.includes('f"') || code.includes("f'"));
        }
    };
    
    // Default solution check for Hello World
    const isCorrect = expectedSolutions.hello_world(code);
    
    if (isCorrect) {
        outputArea.innerHTML = `
            <div style="color: #10b981; font-weight: bold; margin-bottom: 1rem;">
                ✅ Perfect! Your solution is correct!
            </div>
            <div style="color: #64748b; margin-bottom: 1rem;">
                🎉 You've successfully completed this challenge!
            </div>
            <div style="color: #3b82f6; font-size: 0.9rem;">
                Keep up the great work! Try the next exercise.
            </div>
        `;
        
        // Update progress
        updateProgress('exercise_completed');
        
        // Show success notification
        showNotification('Exercise completed!', 'success');
        
    } else {
        outputArea.innerHTML = `
            <div style="color: #f59e0b; font-weight: bold; margin-bottom: 1rem;">
                🤔 Not quite right yet. Keep trying!
            </div>
            <div style="color: #64748b; margin-bottom: 1rem;">
                💡 Hint: Make sure you're using print() and including "Hello, World!" exactly as shown.
            </div>
            <div style="color: #6b7280; font-size: 0.9rem;">
                Remember: Python is case-sensitive!
            </div>
        `;
    }
}

function showAchievements() {
    const achievements = [
        { name: "First Steps", description: "Completed your first lesson", earned: true, icon: "🎯" },
        { name: "Hello World", description: "Wrote your first program", earned: true, icon: "👋" },
        { name: "Problem Solver", description: "Solved 10 coding challenges", earned: false, icon: "🧠" },
        { name: "Consistency King", description: "7-day learning streak", earned: false, icon: "🔥" },
        { name: "Code Warrior", description: "Completed 50 exercises", earned: false, icon: "⚔️" },
        { name: "Dark Mode Explorer", description: "Switched themes", earned: true, icon: "🌙" }
    ];
    
    const earnedCount = achievements.filter(a => a.earned).length;
    const badgeCountEl = document.getElementById('badgeCount');
    if (badgeCountEl) {
        badgeCountEl.textContent = earnedCount;
    }
    
    const achievementList = achievements
        .map(achievement => {
            const status = achievement.earned ? '🏆' : '⭕';
            return `${status} ${achievement.icon} ${achievement.name}: ${achievement.description}`;
        })
        .join('\n');
    
    showNotification(`Achievements (${earnedCount}/${achievements.length})`);
    
    // Create a better modal display
    setTimeout(() => {
        alert(`🏆 Your Achievements (${earnedCount}/${achievements.length}):\n\n${achievementList}\n\nKeep learning to unlock more badges!`);
    }, 100);
}

// Utility Functions
function updateProgress(action) {
    let progress = JSON.parse(localStorage.getItem('codemaster_progress') || '{}');
    
    switch(action) {
        case 'exercise_completed':
            progress.exercisesCompleted = (progress.exercisesCompleted || 0) + 1;
            progress.overallProgress = Math.min(100, (progress.overallProgress || 0) + 2);
            break;
        case 'lesson_completed':
            progress.lessonsCompleted = (progress.lessonsCompleted || 0) + 1;
            progress.overallProgress = Math.min(100, (progress.overallProgress || 0) + 5);
            break;
    }
    
    progress.lastActivity = new Date().toISOString();
    localStorage.setItem('codemaster_progress', JSON.stringify(progress));
    
    // Update UI if elements exist
    updateProgressDisplay(progress);
}

function updateProgressDisplay(progress) {
    // Update progress ring if on dashboard
    if (typeof progressManager !== 'undefined') {
        progressManager.userProgress = progress;
        progressManager.updateProgressDisplay();
    }
}

function showNotification(message, type = 'info') {
    // Create and show notification toast
    const toast = document.createElement('div');
    toast.className = `notification toast-${type}`;
    
    const icons = {
        success: '✅',
        error: '❌', 
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        ">
            <span>${icons[type] || icons.info}</span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Global error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

console.log('🎯 CodeMaster Academy: All systems ready!');
