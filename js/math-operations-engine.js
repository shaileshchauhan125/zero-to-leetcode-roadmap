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

// Mathematical Operations Interactive Engine
class MathOperationsEngine {
    constructor() {
        this.currentOperation = 'basic';
        this.calculatorHistory = [];
        this.calculatorMemory = 0;
        this.truthTableData = this.getTruthTableData();
        this.currentA = 10;
        this.currentB = 5;
        this.currentOperator = '>';
        this.init();
    }

    init() {
        this.setupCalculatorDemo();
        this.setupOperationTabs();
        this.setupComparisonDemo();
        this.setupBooleanLogic();
        this.setupScenarioTesters();
        this.initializeDefaults();
    }

    // Calculator Demo Functions
    setupCalculatorDemo() {
        // Initialize calculator display
        this.updateCalcDisplay('10 + 5 = 15');
    }

    demoOperation(operator) {
        let a = 10;
        let b = 5;
        let result;
        let expression;

        switch (operator) {
            case '+':
                result = a + b;
                expression = `${a} + ${b} = ${result}`;
                break;
            case '-':
                result = a - b;
                expression = `${a} - ${b} = ${result}`;
                break;
            case '*':
                result = a * b;
                expression = `${a} × ${b} = ${result}`;
                break;
            case '/':
                result = a / b;
                expression = `${a} ÷ ${b} = ${result}`;
                break;
            case '//':
                result = Math.floor(a / b);
                expression = `${a} // ${b} = ${result}`;
                break;
            case '%':
                result = a % b;
                expression = `${a} % ${b} = ${result}`;
                break;
            case '**':
                result = Math.pow(a, b);
                expression = `${a} ** ${b} = ${result}`;
                break;
        }

        this.updateCalcDisplay(expression);
        this.animateCalculator();
    }

    updateCalcDisplay(text) {
        const display = document.getElementById('calcDisplay');
        if (display) {
            display.textContent = text;
        }
    }

    clearCalc() {
        this.updateCalcDisplay('0');
    }

    animateCalculator() {
        const calc = document.querySelector('.calculator');
        if (calc) {
            calc.style.transform = 'scale(1.05)';
            setTimeout(() => {
                calc.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Operation Tabs Functions
    setupOperationTabs() {
        const tabs = document.querySelectorAll('.op-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const operation = tab.textContent.toLowerCase().replace(' ', '');
                this.showOperation(operation.includes('basic') ? 'basic' : operation);
            });
        });
    }

    showOperation(operation) {
        // Hide all operation contents
        document.querySelectorAll('.operation-content').forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all tabs
        document.querySelectorAll('.op-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected operation
        const selectedContent = document.getElementById(`${operation}-operations`);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }

        // Activate corresponding tab
        const selectedTab = Array.from(document.querySelectorAll('.op-tab'))
            .find(tab => tab.textContent.toLowerCase().includes(operation));
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        this.currentOperation = operation;
    }

    // Interactive Demo Calculations
    calculateDemo(operation) {
        let a, b, result, resultElement;

        switch (operation) {
            case 'add':
                a = parseFloat(document.getElementById('add-a').value) || 0;
                b = parseFloat(document.getElementById('add-b').value) || 0;
                result = a + b;
                resultElement = document.getElementById('add-result');
                break;
            case 'sub':
                a = parseFloat(document.getElementById('sub-a').value) || 0;
                b = parseFloat(document.getElementById('sub-b').value) || 0;
                result = a - b;
                resultElement = document.getElementById('sub-result');
                break;
            case 'mul':
                a = parseFloat(document.getElementById('mul-a').value) || 0;
                b = parseFloat(document.getElementById('mul-b').value) || 0;
                result = a * b;
                resultElement = document.getElementById('mul-result');
                break;
            case 'div':
                a = parseFloat(document.getElementById('div-a').value) || 0;
                b = parseFloat(document.getElementById('div-b').value) || 0;
                result = b !== 0 ? a / b : 'Cannot divide by zero';
                resultElement = document.getElementById('div-result');
                break;
            case 'floor':
                a = parseFloat(document.getElementById('floor-a').value) || 0;
                b = parseFloat(document.getElementById('floor-b').value) || 0;
                result = b !== 0 ? Math.floor(a / b) : 'Cannot divide by zero';
                resultElement = document.getElementById('floor-result');
                break;
            case 'mod':
                a = parseFloat(document.getElementById('mod-a').value) || 0;
                b = parseFloat(document.getElementById('mod-b').value) || 0;
                result = b !== 0 ? a % b : 'Cannot divide by zero';
                resultElement = document.getElementById('mod-result');
                break;
            case 'pow':
                a = parseFloat(document.getElementById('pow-a').value) || 0;
                b = parseFloat(document.getElementById('pow-b').value) || 0;
                result = Math.pow(a, b);
                resultElement = document.getElementById('pow-result');
                break;
        }

        if (resultElement) {
            resultElement.textContent = `Result: ${result}`;
            resultElement.style.color = '#10b981';
            this.animateResult(resultElement);
        }
    }

    animateResult(element) {
        element.style.transform = 'scale(1.1)';
        element.style.fontWeight = 'bold';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }

    // Modulo Magic Functions
    checkEvenOdd() {
        const input = document.getElementById('evenOddInput');
        const result = document.getElementById('evenOddResult');
        const number = parseInt(input.value) || 0;
        
        const remainder = number % 2;
        const isEven = remainder === 0;
        
        result.innerHTML = `${number} is ${isEven ? 'EVEN' : 'ODD'} (${number} % 2 = ${remainder})`;
        result.style.color = isEven ? '#10b981' : '#f59e0b';
    }

    findDay() {
        const input = document.getElementById('dayInput');
        const result = document.getElementById('dayResult');
        const dayNumber = parseInt(input.value) || 0;
        
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dayIndex = dayNumber % 7;
        const dayName = days[dayIndex];
        
        result.innerHTML = `Day ${dayNumber} is ${dayName}`;
        result.style.color = '#3b82f6';
    }

    convertTime() {
        const input = document.getElementById('minutesInput');
        const result = document.getElementById('timeResult');
        const totalMinutes = parseInt(input.value) || 0;
        
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        result.innerHTML = `${totalMinutes} minutes = ${hours} hours, ${minutes} minutes`;
        result.style.color = '#8b5cf6';
    }

    // Power Functions
    setPowerExample(base, exponent) {
        document.getElementById('pow-a').value = base;
        document.getElementById('pow-b').value = exponent;
        this.calculateDemo('pow');
    }

    calculateSquareRoot() {
        const input = document.getElementById('sqrt-input');
        const result = document.getElementById('sqrt-result');
        const number = parseFloat(input.value) || 0;
        
        if (number < 0) {
            result.innerHTML = 'Cannot calculate square root of negative number';
            result.style.color = '#ef4444';
        } else {
            const sqrt = Math.sqrt(number);
            result.innerHTML = `√${number} = ${sqrt.toFixed(2)}`;
            result.style.color = '#10b981';
        }
    }

    // Comparison Functions
    setupComparisonDemo() {
        this.updateBalanceScale(this.currentA, this.currentOperator, this.currentB);
        this.performComparison();
    }

    performComparison() {
        const a = parseFloat(document.getElementById('compareA').value) || 0;
        const operator = document.getElementById('compareOp').value;
        const b = parseFloat(document.getElementById('compareB').value) || 0;
        
        this.currentA = a;
        this.currentB = b;
        this.currentOperator = operator;
        
        let result;
        switch (operator) {
            case '==': result = a == b; break;
            case '!=': result = a != b; break;
            case '>': result = a > b; break;
            case '<': result = a < b; break;
            case '>=': result = a >= b; break;
            case '<=': result = a <= b; break;
        }
        
        const resultElement = document.getElementById('comparisonResult');
        resultElement.innerHTML = `${a} ${operator} ${b} = ${result}`;
        resultElement.style.color = result ? '#10b981' : '#ef4444';
        
        this.updateBalanceScale(a, operator, b);
    }

    updateBalanceScale(a, operator, b) {
        const leftScale = document.getElementById('scaleLeft');
        const rightScale = document.getElementById('scaleRight');
        const scaleOperator = document.getElementById('scaleOperator');
        const scaleResult = document.getElementById('scaleResult');
        
        if (leftScale) leftScale.querySelector('.scale-value').textContent = a;
        if (rightScale) rightScale.querySelector('.scale-value').textContent = b;
        if (scaleOperator) scaleOperator.textContent = operator;
        
        let result;
        switch (operator) {
            case '==': result = a == b; break;
            case '!=': result = a != b; break;
            case '>': result = a > b; break;
            case '<': result = a < b; break;
            case '>=': result = a >= b; break;
            case '<=': result = a <= b; break;
        }
        
        if (scaleResult) {
            scaleResult.textContent = result;
            scaleResult.style.backgroundColor = result ? '#10b981' : '#ef4444';
        }

        // Animate scales
        if (leftScale && rightScale) {
            if (operator === '>' && result) {
                leftScale.style.transform = 'rotate(-5deg)';
                rightScale.style.transform = 'rotate(5deg)';
            } else if (operator === '<' && result) {
                leftScale.style.transform = 'rotate(5deg)';
                rightScale.style.transform = 'rotate(-5deg)';
            } else {
                leftScale.style.transform = 'rotate(0deg)';
                rightScale.style.transform = 'rotate(0deg)';
            }
        }
    }

    setComparison(a, operator, b) {
        document.getElementById('compareA').value = a;
        document.getElementById('compareOp').value = operator;
        document.getElementById('compareB').value = b;
        this.performComparison();
    }

    // Boolean Logic Functions
    setupBooleanLogic() {
        this.calculateTruth();
    }

    calculateTruth() {
        const a = document.getElementById('truthA').value === 'true';
        const operator = document.getElementById('truthOp').value;
        const b = document.getElementById('truthB').value === 'true';
        
        let result;
        let expression;
        
        if (operator === 'not') {
            result = !a;
            expression = `not ${a} = ${result}`;
        } else if (operator === 'and') {
            result = a && b;
            expression = `${a} and ${b} = ${result}`;
        } else if (operator === 'or') {
            result = a || b;
            expression = `${a} or ${b} = ${result}`;
        }
        
        const resultElement = document.getElementById('truthResult');
        if (resultElement) {
            resultElement.innerHTML = expression;
            resultElement.style.color = result ? '#10b981' : '#ef4444';
        }
    }

    highlightTruthRow(row, a, b) {
        // Remove highlight from all rows
        document.querySelectorAll('.truth-row').forEach(r => {
            r.classList.remove('highlighted');
        });
        
        // Highlight selected row
        row.classList.add('highlighted');
        
        // Update interactive controls to match
        document.getElementById('truthA').value = a;
        document.getElementById('truthB').value = b;
        this.calculateTruth();
    }

    // Scenario Testers
    setupScenarioTesters() {
        this.checkAdmission();
        this.checkWeather();
    }

    checkAdmission() {
        const age = parseInt(document.getElementById('ageInput').value) || 0;
        const hasPermission = document.getElementById('permissionInput').checked;
        const result = document.getElementById('admissionResult');
        
        // Rule: Can enter if (age >= 18) OR (age >= 16 AND has_permission)
        const canEnter = (age >= 18) || (age >= 16 && hasPermission);
        
        const status = canEnter ? 'ADMITTED ✅' : 'NOT ADMITTED ❌';
        const explanation = age >= 18 ? 'Age 18+ requirement met' : 
                          (age >= 16 && hasPermission) ? 'Age 16+ with permission' : 
                          'Does not meet requirements';
        
        result.innerHTML = `Age ${age} ${hasPermission ? 'with' : 'without'} permission: ${status}<br><small>${explanation}</small>`;
        result.style.color = canEnter ? '#10b981' : '#ef4444';
    }

    checkWeather() {
        const weather = document.getElementById('weatherInput').value;
        const isRaining = document.getElementById('rainingInput').checked;
        const temperature = parseInt(document.getElementById('tempInput').value) || 0;
        const result = document.getElementById('weatherResult');
        
        // Rule: Go outside if (sunny OR cloudy) AND (NOT raining) AND (temperature > 60)
        const goodWeather = (weather === 'sunny' || weather === 'cloudy');
        const notRaining = !isRaining;
        const warmEnough = temperature > 60;
        
        const shouldGoOutside = goodWeather && notRaining && warmEnough;
        
        const decision = shouldGoOutside ? 'GO OUTSIDE! 🌞' : 'STAY INSIDE 🏠';
        const reasons = [];
        if (!goodWeather) reasons.push('weather not suitable');
        if (isRaining) reasons.push('raining');
        if (!warmEnough) reasons.push('too cold');
        
        const explanation = shouldGoOutside ? 
            `${weather}, not raining, ${temperature}°F` : 
            `Issues: ${reasons.join(', ')}`;
        
        result.innerHTML = `${decision}<br><small>${explanation}</small>`;
        result.style.color = shouldGoOutside ? '#10b981' : '#ef4444';
    }

    // Calculator Project Functions
    openCalculatorProject() {
        const modal = document.getElementById('calculatorModal');
        if (modal) {
            modal.style.display = 'block';
            
            // Set up the calculator project with starter code
            const editor = document.getElementById('calculatorEditor');
            if (editor && !editor.value.trim()) {
                // Starter code is already in HTML
            }
        }
    }

    closeCalculatorModal() {
        const modal = document.getElementById('calculatorModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    runCalculator() {
        const editor = document.getElementById('calculatorEditor');
        const output = document.getElementById('calculatorOutput');
        const code = editor.value;
        
        output.innerHTML = 'Running calculator...\n';
        
        setTimeout(() => {
            try {
                const result = this.simulateCalculatorProject(code);
                output.innerHTML = result;
            } catch (error) {
                output.innerHTML = `Error: ${error.message}`;
                output.style.color = '#ef4444';
            }
        }, 1000);
    }

    simulateCalculatorProject(code) {
        // Simulate the calculator project execution
        if (code.includes('Calculator') && code.includes('def add')) {
            return `🧮 Advanced Calculator
==============================
Welcome! Calculator initialized successfully.

Operations Available:
1. Add (+) ✓
2. Subtract (-) ✓ 
3. Multiply (*) ✓
4. Divide (/) ✓
5. Power (**) ✓
6. Floor Division (//) ✓
7. Modulo (%) ✓
8. Square Root (√) ✓
9. Memory Functions ✓
10. History ✓

Example calculations:
>>> 15 + 7 = 22
>>> 20 / 4 = 5.0
>>> 2 ** 8 = 256
>>> √64 = 8.0

Memory: 0
History: Ready to record calculations

✨ Calculator is ready for use!

Note: This is a simulation. In a real environment, 
you would have full interactive calculator functionality.`;
        }
        
        if (code.includes('import math')) {
            return 'Calculator modules loaded successfully!\nMath library imported ✓\nCalculator ready for advanced operations.';
        }
        
        return 'Basic calculator structure detected.\nComplete the TODOs to unlock full functionality!';
    }

    resetCalculator() {
        const editor = document.getElementById('calculatorEditor');
        if (editor) {
            // Reset to starter code - the HTML already contains it
            location.reload(); // Simple reset
        }
    }

    clearCalculatorOutput() {
        const output = document.getElementById('calculatorOutput');
        if (output) {
            output.innerHTML = '';
        }
    }

    // Utility Functions
    initializeDefaults() {
        // Set up default values for interactive elements
        setTimeout(() => {
            // Initialize calculator demos
            this.calculateDemo('add');
            this.calculateDemo('sub');
            this.calculateDemo('mul');
            this.calculateDemo('div');
        }, 100);
    }

    getTruthTableData() {
        return [
            { a: true, b: true, and: true, or: true, notA: false },
            { a: true, b: false, and: false, or: true, notA: false },
            { a: false, b: true, and: false, or: true, notA: true },
            { a: false, b: false, and: false, or: false, notA: true }
        ];
    }
}

// Global functions for HTML event handlers
let mathEngine;

document.addEventListener('DOMContentLoaded', () => {
    mathEngine = new MathOperationsEngine();
});

// Calculator demo functions
function demoOperation(operator) {
    mathEngine.demoOperation(operator);
}

function clearCalc() {
    mathEngine.clearCalc();
}

// Operation tab functions
function showOperation(operation) {
    mathEngine.showOperation(operation);
}

// Interactive demo functions
function calculateDemo(operation) {
    mathEngine.calculateDemo(operation);
}

// Modulo magic functions
function checkEvenOdd() {
    mathEngine.checkEvenOdd();
}

function findDay() {
    mathEngine.findDay();
}

function convertTime() {
    mathEngine.convertTime();
}

// Power functions
function setPowerExample(base, exponent) {
    mathEngine.setPowerExample(base, exponent);
}

function calculateSquareRoot() {
    mathEngine.calculateSquareRoot();
}

// Comparison functions
function performComparison() {
    mathEngine.performComparison();
}

function setComparison(a, operator, b) {
    mathEngine.setComparison(a, operator, b);
}

// Boolean logic functions
function calculateTruth() {
    mathEngine.calculateTruth();
}

function highlightTruthRow(row, a, b) {
    mathEngine.highlightTruthRow(row, a, b);
}

// Scenario functions
function checkAdmission() {
    mathEngine.checkAdmission();
}

function checkWeather() {
    mathEngine.checkWeather();
}

// Calculator project functions
function openCalculatorProject() {
    mathEngine.openCalculatorProject();
}

function closeCalculatorModal() {
    mathEngine.closeCalculatorModal();
}

function runCalculator() {
    mathEngine.runCalculator();
}

function resetCalculator() {
    mathEngine.resetCalculator();
}

function clearCalculatorOutput() {
    mathEngine.clearCalculatorOutput();
}

// Navigation functions
function previousLesson() {
    window.location.href = 'variables-datatypes.html';
}

function nextLesson() {
    window.location.href = 'control-flow.html';
}

console.log('🧮 Math Operations Engine loaded successfully!');
