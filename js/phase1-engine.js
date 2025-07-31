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

// Phase 1 Interactive Engine
class Phase1Engine {
    constructor() {
        this.currentDataType = 'integers';
        this.challengeHints = [
            "Remember to enclose strings in quotes!",
            "Integers don't need decimal points",
            "Boolean values are True or False (capitalized)",
            "Use descriptive variable names like 'student_name' instead of 'n'"
        ];
        this.hintIndex = 0;
        this.init();
    }

    init() {
        this.setupDataTypeExplorer();
        this.setupVariableValidator();
        this.setupChallengeModal();
    }

    setupDataTypeExplorer() {
        const tabs = document.querySelectorAll('.type-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const dataType = tab.textContent.toLowerCase();
                this.showDataType(dataType);
            });
        });
    }

    setupVariableValidator() {
        const nameInput = document.getElementById('nameInput');
        if (nameInput) {
            nameInput.addEventListener('input', () => this.validateName());
        }
    }

    setupChallengeModal() {
        // Modal setup handled by global functions
    }

    showDataType(type) {
        // Hide all content
        document.querySelectorAll('.type-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.type-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected content
        const selectedContent = document.getElementById(`${type}-content`);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
        
        // Activate corresponding tab
        const selectedTab = Array.from(document.querySelectorAll('.type-tab'))
            .find(tab => tab.textContent.toLowerCase() === type);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        this.currentDataType = type;
    }

    validateName() {
        const input = document.getElementById('nameInput');
        const feedback = document.getElementById('nameValidation');
        
        if (!input || !feedback) return;
        
        const name = input.value.trim();
        const validation = this.checkVariableName(name);
        
        feedback.className = `validation-feedback ${validation.status}`;
        feedback.innerHTML = `
            <span>${validation.icon}</span>
            <span>${validation.message}</span>
        `;
    }

    checkVariableName(name) {
        if (!name) {
            return {
                status: 'neutral',
                icon: 'ℹ️',
                message: 'Enter a variable name to check if it\'s valid'
            };
        }

        // Python keywords
        const keywords = [
            'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del',
            'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if',
            'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass',
            'raise', 'return', 'try', 'while', 'with', 'yield', 'True', 'False', 'None'
        ];

        // Check if it's a keyword
        if (keywords.includes(name)) {
            return {
                status: 'invalid',
                icon: '❌',
                message: `"${name}" is a Python keyword and cannot be used as a variable name`
            };
        }

        // Check if starts with digit
        if (/^\d/.test(name)) {
            return {
                status: 'invalid',
                icon: '❌',
                message: 'Variable names cannot start with a number'
            };
        }

        // Check for invalid characters
        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
            return {
                status: 'invalid',
                icon: '❌',
                message: 'Variable names can only contain letters, numbers, and underscores'
            };
        }

        // Check naming convention
        const hasUpperCase = /[A-Z]/.test(name);
        const hasUnderscore = /_/.test(name);
        
        if (hasUpperCase && hasUnderscore) {
            return {
                status: 'valid',
                icon: '✅',
                message: `"${name}" is valid! Mix of cases and underscores is OK but consider consistency`
            };
        } else if (hasUpperCase) {
            return {
                status: 'valid',
                icon: '✅',
                message: `"${name}" is valid! CamelCase is acceptable, but snake_case is preferred in Python`
            };
        } else if (hasUnderscore) {
            return {
                status: 'valid',
                icon: '✅',
                message: `"${name}" is valid! Perfect snake_case - this is the recommended Python style`
            };
        } else {
            return {
                status: 'valid',
                icon: '✅',
                message: `"${name}" is valid! Consider using snake_case for multi-word names`
            };
        }
    }

    // Interactive demo functions
    testInteger() {
        const input = document.getElementById('intInput');
        const output = document.getElementById('intOutput');
        const value = input.value;
        
        if (!value) {
            output.textContent = 'Please enter a number';
            return;
        }

        const num = parseInt(value);
        output.innerHTML = `
<strong>Your integer: ${num}</strong>
Type: ${typeof num}
Is positive: ${num > 0}
Is even: ${num % 2 === 0}
Absolute value: ${Math.abs(num)}
        `;
    }

    testFloat() {
        const input = document.getElementById('floatInput');
        const output = document.getElementById('floatOutput');
        const value = input.value;
        
        if (!value) {
            output.textContent = 'Please enter a decimal number';
            return;
        }

        const num = parseFloat(value);
        output.innerHTML = `
<strong>Your float: ${num}</strong>
Type: ${typeof num}
Rounded: ${Math.round(num)}
Fixed to 2 decimals: ${num.toFixed(2)}
Scientific notation: ${num.toExponential(2)}
        `;
    }

    testString() {
        const input = document.getElementById('stringInput');
        const output = document.getElementById('stringOutput');
        const value = input.value;
        
        if (!value) {
            output.textContent = 'Please enter some text';
            return;
        }

        output.innerHTML = `
<strong>Your string: "${value}"</strong>
Length: ${value.length} characters
Uppercase: ${value.toUpperCase()}
Lowercase: ${value.toLowerCase()}
First character: ${value[0]}
Last character: ${value[value.length - 1]}
Contains "Python": ${value.includes('Python')}
        `;
    }

    testBoolean() {
        const input1 = document.getElementById('boolInput1');
        const operator = document.getElementById('boolOperator');
        const input2 = document.getElementById('boolInput2');
        const output = document.getElementById('boolOutput');
        
        const val1 = input1.value === 'true';
        const op = operator.value;
        const val2 = input2.value === 'true';
        
        let result;
        let expression;
        
        if (op === 'and') {
            result = val1 && val2;
            expression = `${val1} and ${val2}`;
        } else {
            result = val1 || val2;
            expression = `${val1} or ${val2}`;
        }
        
        output.innerHTML = `
<strong>Expression: ${expression}</strong>
Result: ${result}
Explanation: ${this.getBooleanExplanation(val1, op, val2, result)}
        `;
    }

    getBooleanExplanation(val1, op, val2, result) {
        if (op === 'and') {
            if (result) {
                return 'Both values are True, so the result is True';
            } else {
                return 'At least one value is False, so the result is False';
            }
        } else { // or
            if (result) {
                return 'At least one value is True, so the result is True';
            } else {
                return 'Both values are False, so the result is False';
            }
        }
    }

    runBasicExample() {
        const output = document.getElementById('basicExampleOutput');
        output.innerHTML = `
<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
Hello! My name is Alice
I am 25 years old and 5.8 feet tall
Am I a student? True
        `;
        output.style.color = '#10b981';
    }

    // Challenge functions
    runChallenge() {
        const editor = document.getElementById('challengeEditor');
        const output = document.getElementById('challengeOutput');
        const code = editor.value;
        
        output.textContent = 'Running code...';
        
        setTimeout(() => {
            try {
                const result = this.simulatePythonChallenge(code);
                output.textContent = result;
                output.style.color = '#10b981';
            } catch (error) {
                output.textContent = `Error: ${error.message}`;
                output.style.color = '#ef4444';
            }
        }, 500);
    }

    simulatePythonChallenge(code) {
        const lines = code.split('\n');
        let output = [];
        let variables = {};
        
        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith('#')) continue;
            
            // Handle variable assignments
            if (line.includes(' = ') && !line.startsWith('print')) {
                const [varName, value] = line.split(' = ', 2);
                const cleanVar = varName.trim();
                let cleanValue = value.trim();
                
                // Remove quotes for strings
                if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
                    (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
                    variables[cleanVar] = cleanValue.slice(1, -1);
                } else if (cleanValue === 'True') {
                    variables[cleanVar] = true;
                } else if (cleanValue === 'False') {
                    variables[cleanVar] = false;
                } else if (!isNaN(cleanValue)) {
                    variables[cleanVar] = parseFloat(cleanValue);
                } else {
                    // Handle expressions
                    try {
                        variables[cleanVar] = this.evaluateExpression(cleanValue, variables);
                    } catch (e) {
                        variables[cleanVar] = cleanValue;
                    }
                }
            }
            
            // Handle print statements
            if (line.startsWith('print(')) {
                const result = this.processPrintStatement(line, variables);
                output.push(result);
            }
        }
        
        return output.join('\n');
    }

    evaluateExpression(expr, variables) {
        // Replace variables in expression
        for (let [name, value] of Object.entries(variables)) {
            expr = expr.replace(new RegExp(`\\b${name}\\b`, 'g'), value);
        }
        
        // Handle basic math
        if (/^[\d\+\-\*\/\(\)\s\.]+$/.test(expr)) {
            return eval(expr);
        }
        
        return expr;
    }

    processPrintStatement(line, variables) {
        const match = line.match(/print\((.*)\)$/);
        if (!match) return '';
        
        let content = match[1].trim();
        
        // Handle f-strings
        if (content.startsWith('f"') || content.startsWith("f'")) {
            content = content.slice(2, -1);
            // Replace {variable} with actual values
            content = content.replace(/\{([^}]+)\}/g, (match, varName) => {
                return variables[varName.trim()] !== undefined ? variables[varName.trim()] : match;
            });
            return content;
        }
        
        // Handle string concatenation with *
        if (content.includes('"') && content.includes('*')) {
            const parts = content.split(' * ');
            if (parts.length === 2) {
                const str = parts[0].replace(/"/g, '');
                const num = parseInt(parts[1]);
                return str.repeat(num);
            }
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
        const editor = document.getElementById('challengeEditor');
        const output = document.getElementById('challengeOutput');
        const code = editor.value;
        
        // Check for required elements
        const checks = [
            { pattern: /student_name\s*=\s*["'][^"']+["']/, message: "✓ Student name variable defined correctly" },
            { pattern: /student_age\s*=\s*\d+/, message: "✓ Student age variable defined correctly" },
            { pattern: /student_gpa\s*=\s*\d+\.\d+/, message: "✓ Student GPA variable defined correctly" },
            { pattern: /is_enrolled\s*=\s*(True|False)/, message: "✓ Enrollment status variable defined correctly" }
        ];
        
        let feedback = [];
        let allPassed = true;
        
        checks.forEach(check => {
            if (check.pattern.test(code)) {
                feedback.push(`<div style="color: #10b981;">${check.message}</div>`);
            } else {
                feedback.push(`<div style="color: #ef4444;">❌ ${check.message.replace('✓', 'Missing:')}</div>`);
                allPassed = false;
            }
        });
        
        if (allPassed) {
            feedback.push(`<div style="color: #10b981; font-weight: bold; margin-top: 1rem;">🎉 Excellent! You've completed the challenge successfully!</div>`);
        } else {
            feedback.push(`<div style="color: #f59e0b; margin-top: 1rem;">💡 Review the requirements and try again!</div>`);
        }
        
        output.innerHTML = feedback.join('\n');
    }

    showHint() {
        const output = document.getElementById('challengeOutput');
        
        if (this.hintIndex < this.challengeHints.length) {
            const hint = this.challengeHints[this.hintIndex];
            output.innerHTML = `
                <div style="color: #f59e0b; font-weight: bold;">💡 Hint ${this.hintIndex + 1}:</div>
                <div style="color: #374151; margin-top: 0.5rem;">${hint}</div>
            `;
            this.hintIndex++;
        } else {
            output.innerHTML = `
                <div style="color: #6b7280;">
                    No more hints available! Review the lesson content or check your solution.
                </div>
            `;
        }
    }
}

// Global functions for HTML event handlers
let phase1Engine;

document.addEventListener('DOMContentLoaded', () => {
    phase1Engine = new Phase1Engine();
});

function showDataType(type) {
    phase1Engine.showDataType(type);
}

function validateName() {
    phase1Engine.validateName();
}

function testInteger() {
    phase1Engine.testInteger();
}

function testFloat() {
    phase1Engine.testFloat();
}

function testString() {
    phase1Engine.testString();
}

function testBoolean() {
    phase1Engine.testBoolean();
}

function runBasicExample() {
    phase1Engine.runBasicExample();
}

function openChallengeModal() {
    const modal = document.getElementById('challengeModal');
    modal.classList.add('active');
    modal.style.display = 'flex';
}

function closeChallengeModal() {
    const modal = document.getElementById('challengeModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
    phase1Engine.hintIndex = 0;
}

function runChallenge() {
    phase1Engine.runChallenge();
}

function checkSolution() {
    phase1Engine.checkSolution();
}

function showHint() {
    phase1Engine.showHint();
}

function clearChallengeOutput() {
    document.getElementById('challengeOutput').textContent = '';
}

function nextLesson() {
    window.location.href = 'mathematical-operations.html';
}

console.log('📦 Phase 1 Engine loaded successfully!');
