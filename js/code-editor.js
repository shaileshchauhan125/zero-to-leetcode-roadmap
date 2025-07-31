// Universal Lesson Navigation System
class LessonNavigation {
    constructor(currentLesson, phase) {
        this.currentLesson = currentLesson;
        this.phase = phase;
        this.setupBreadcrumbs();
        this.setupBackButton();
    }

    setupBreadcrumbs() {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            breadcrumb.innerHTML = `
                <a href="../../dashboard.html">🏠 Dashboard</a>
                <span>→</span>
                <a href="../../dashboard.html#${this.phase}">${this.phase.toUpperCase()}</a>
                <span>→</span>
                <span>${this.currentLesson}</span>
            `;
        }
    }

    setupBackButton() {
        const backButtons = document.querySelectorAll('.back-button');
        backButtons.forEach(btn => {
            btn.onclick = () => {
                window.location.href = '../../dashboard.html';
            };
        });
    }
}

// Add this to each lesson file
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lesson navigation
    // Update these values for each lesson
    const currentLesson = 'Variables & Data Types'; // Update per lesson
    const phase = 'phase1'; // Update per phase
    
    window.lessonNav = new LessonNavigation(currentLesson, phase);
});

// Enhanced code editor functionality
class CodeEditor {
    constructor() {
        this.currentCode = '';
        this.solution = '';
        this.hints = [];
        this.hintIndex = 0;
    }

    formatCode() {
        const editor = document.getElementById('codeEditor');
        let code = editor.value;
        
        // Basic Python formatting
        code = code.replace(/\s+$/gm, ''); // Remove trailing whitespace
        code = code.replace(/^\s*\n/gm, ''); // Remove empty lines at start
        code = code.split('\n').map(line => {
            // Basic indentation (simplified)
            if (line.trim().endsWith(':')) {
                return line;
            }
            if (line.trim() && !line.startsWith(' ') && line.includes('print')) {
                return '    ' + line.trim();
            }
            return line;
        }).join('\n');
        
        editor.value = code;
    }

    resetCode() {
        const modal = document.getElementById('codeModal');
        const starterCode = modal.dataset.starterCode || '';
        document.getElementById('codeEditor').value = starterCode;
        this.clearOutput();
    }

    runCode() {
        const code = document.getElementById('codeEditor').value;
        const output = document.getElementById('codeOutput');
        
        try {
            // Simple Python simulation for common cases
            const result = this.simulatePythonExecution(code);
            output.innerHTML = `<div style="color: #10b981;">${result}</div>`;
        } catch (error) {
            output.innerHTML = `<div style="color: #ef4444;">Error: ${error.message}</div>`;
        }
    }

    simulatePythonExecution(code) {
        // Very basic Python execution simulation
        const lines = code.split('\n');
        let output = [];
        let variables = {};
        
        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith('#')) continue;
            
            // Handle variable assignments
            if (line.includes(' = ') && !line.startsWith('print')) {
                const [varName, value] = line.split(' = ');
                const cleanVar = varName.trim();
                const cleanValue = value.trim();
                
                // Parse different types
                if (cleanValue === 'True' || cleanValue === 'False') {
                    variables[cleanVar] = cleanValue === 'True';
                } else if (!isNaN(cleanValue)) {
                    variables[cleanVar] = parseFloat(cleanValue);
                } else if (cleanValue.startsWith('"') || cleanValue.startsWith("'")) {
                    variables[cleanVar] = cleanValue.slice(1, -1);
                } else {
                    // Expression evaluation (very basic)
                    variables[cleanVar] = this.evaluateExpression(cleanValue, variables);
                }
            }
            
            // Handle print statements
            if (line.startsWith('print(')) {
                const content = line.match(/print\((.*)\)/)[1];
                const result = this.evaluatePrintContent(content, variables);
                output.push(result);
            }
        }
        
        return output.join('\n');
    }

    evaluateExpression(expr, variables) {
        // Replace variables in expression
        for (let [name, value] of Object.entries(variables)) {
            expr = expr.replace(new RegExp(name, 'g'), value);
        }
        
        try {
            // Very basic math evaluation
            if (/^[\d\+\-\*\/\(\)\s\.]+$/.test(expr)) {
                return eval(expr);
            }
        } catch (e) {
            return expr;
        }
        
        return expr;
    }

    evaluatePrintContent(content, variables) {
        // Handle f-strings (simplified)
        if (content.startsWith('f"') || content.startsWith("f'")) {
            let result = content.slice(2, -1);
            
            // Replace {variable} with actual values
            for (let [name, value] of Object.entries(variables)) {
                result = result.replace(new RegExp(`\\{${name}\\}`, 'g'), value);
            }
            
            return result;
        }
        
        // Handle regular strings
        if (content.startsWith('"') || content.startsWith("'")) {
            return content.slice(1, -1);
        }
        
        // Handle variables
        if (variables[content]) {
            return variables[content];
        }
        
        return content;
    }

    checkSolution() {
        const userCode = document.getElementById('codeEditor').value.trim();
        const modal = document.getElementById('codeModal');
        const solution = modal.dataset.solution;
        const output = document.getElementById('codeOutput');
        
        // Simple solution checking
        const userOutput = this.simulatePythonExecution(userCode);
        const solutionOutput = this.simulatePythonExecution(solution);
        
        if (userOutput === solutionOutput) {
            output.innerHTML = `
                <div style="color: #10b981; font-weight: bold; margin-bottom: 1rem;">
                    ✅ Excellent! Your solution is correct!
                </div>
                <div style="color: #374151;">
                    Output: ${userOutput}
                </div>
                <div style="color: #6b7280; margin-top: 1rem; font-size: 0.875rem;">
                    🎉 You've successfully completed this exercise. Great job!
                </div>
            `;
            
            // Update progress
            if (typeof lessonEngine !== 'undefined') {
                lessonEngine.markSectionCompleted('exercise-completed');
            }
            
            // Auto-close after success
            setTimeout(() => {
                this.closeCodeModal();
            }, 3000);
        } else {
            output.innerHTML = `
                <div style="color: #f59e0b; font-weight: bold; margin-bottom: 1rem;">
                    🤔 Not quite right. Keep trying!
                </div>
                <div style="color: #374151; margin-bottom: 1rem;">
                    Your output: ${userOutput}
                </div>
                <div style="color: #6b7280; font-size: 0.875rem;">
                    💡 Click "Need a Hint?" if you're stuck.
                </div>
            `;
        }
    }

    showHint() {
        const modal = document.getElementById('codeModal');
        const hints = JSON.parse(modal.dataset.hints || '[]');
        const output = document.getElementById('codeOutput');
        
        if (this.hintIndex < hints.length) {
            const hint = hints[this.hintIndex];
            output.innerHTML = `
                <div style="color: #f59e0b; font-weight: bold; margin-bottom: 1rem;">
                    💡 Hint ${this.hintIndex + 1}:
                </div>
                <div style="color: #374151; margin-bottom: 1rem;">
                    ${hint}
                </div>
                <div style="color: #6b7280; font-size: 0.875rem;">
                    ${this.hintIndex < hints.length - 1 ? 'Click again for another hint!' : 'That\'s all the hints available.'}
                </div>
            `;
            this.hintIndex++;
        } else {
            output.innerHTML = `
                <div style="color: #6b7280;">
                    No more hints available. Try reviewing the lesson content or click "Show Solution" if you're really stuck.
                </div>
            `;
        }
    }

    showSolution() {
        const modal = document.getElementById('codeModal');
        const solution = modal.dataset.solution;
        const output = document.getElementById('codeOutput');
        
        output.innerHTML = `
            <div style="color: #6366f1; font-weight: bold; margin-bottom: 1rem;">
                📝 Solution:
            </div>
            <div style="background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 6px; font-family: monospace; margin-bottom: 1rem;">
                ${solution.replace(/\n/g, '<br>')}
            </div>
            <div style="color: #6b7280; font-size: 0.875rem;">
                Study this solution and try to understand each part. Then try coding it yourself!
            </div>
        `;
        
        // Optionally fill the editor with the solution
        document.getElementById('codeEditor').value = solution;
    }

    clearOutput() {
        document.getElementById('codeOutput').innerHTML = '';
    }

    closeCodeModal() {
        document.getElementById('codeModal').style.display = 'none';
        this.hintIndex = 0;
        this.clearOutput();
    }
}

// Global functions
let codeEditor;

document.addEventListener('DOMContentLoaded', () => {
    codeEditor = new CodeEditor();
});

function formatCode() {
    codeEditor.formatCode();
}

function resetCode() {
    codeEditor.resetCode();
}

function runCode() {
    codeEditor.runCode();
}

function checkSolution() {
    codeEditor.checkSolution();
}

function showHint() {
    codeEditor.showHint();
}

function showSolution() {
    codeEditor.showSolution();
}

function closeCodeModal() {
    codeEditor.closeCodeModal();
}

function clearOutput() {
    codeEditor.clearOutput();
}
