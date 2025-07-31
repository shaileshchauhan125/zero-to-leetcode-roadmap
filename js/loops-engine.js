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

// Loops & Iteration Interactive Engine
class LoopsEngine {
    constructor() {
        this.currentLoopType = 'for';
        this.isRunning = false;
        this.currentStep = 0;
        this.speed = 5;
        this.visualizationTimer = null;
        this.currentPattern = 'counting';
        this.projects = this.getProjectData();
        this.init();
    }

    init() {
        this.setupVisualizationControls();
        this.setupPatternTabs();
        this.setupProjectModals();
        this.initializeNestedGrid();
    }

    setupVisualizationControls() {
        // Grid cells for nested loops
        this.initializeNestedGrid();
        
        // Set initial visualization
        this.setLoopType('for');
    }

    setupPatternTabs() {
        const tabs = document.querySelectorAll('.pattern-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const pattern = tab.textContent.toLowerCase().replace(' patterns', '').replace(' ', '');
                this.showPattern(pattern);
            });
        });
    }

    setupProjectModals() {
        // Modal setup handled by global functions
    }

    initializeNestedGrid() {
        const grid = document.getElementById('nestedGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.textContent = `(${row},${col})`;
                grid.appendChild(cell);
            }
        }
    }

    setLoopType(type) {
        // Hide all visualizations
        document.querySelectorAll('.loop-visualization').forEach(viz => {
            viz.classList.remove('active');
        });
        
        // Remove active class from all buttons
        document.querySelectorAll('.loop-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected visualization
        const selectedViz = document.getElementById(`${type}-loop-viz`);
        if (selectedViz) {
            selectedViz.classList.add('active');
        }
        
        // Activate corresponding button
        const selectedBtn = Array.from(document.querySelectorAll('.loop-type-btn'))
            .find(btn => btn.textContent.toLowerCase().includes(type));
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }
        
        this.currentLoopType = type;
        this.resetVisualization();
    }

    startVisualization() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.currentStep = 0;
        
        switch (this.currentLoopType) {
            case 'for':
                this.runForLoopVisualization();
                break;
            case 'while':
                this.runWhileLoopVisualization();
                break;
            case 'nested':
                this.runNestedLoopVisualization();
                break;
        }
    }

    runForLoopVisualization() {
        const fruits = ["apple", "banana", "orange", "grape"];
        const output = document.getElementById('loop-output');
        const fruitValue = document.getElementById('fruit-value');
        const iterationValue = document.getElementById('iteration-value');
        
        let iteration = 0;
        
        const executeStep = () => {
            if (iteration >= fruits.length) {
                this.finishVisualization();
                return;
            }
            
            // Update flow diagram
            this.updateFlowDiagram(['step-init', 'step-condition', 'step-execute', 'step-update'][iteration % 4]);
            
            // Update variables
            fruitValue.textContent = fruits[iteration];
            iterationValue.textContent = iteration + 1;
            
            // Add to output
            const currentOutput = output.textContent;
            const newOutput = `Processing ${fruits[iteration]}\nLength: ${fruits[iteration].length}\n---\n`;
            output.textContent = currentOutput + newOutput;
            
            // Scroll to bottom
            output.scrollTop = output.scrollHeight;
            
            iteration++;
            
            if (this.isRunning) {
                this.visualizationTimer = setTimeout(executeStep, 2000 / this.speed);
            }
        };
        
        executeStep();
    }

    runWhileLoopVisualization() {
        const output = document.getElementById('while-output');
        const countValue = document.getElementById('count-value');
        const conditionValue = document.getElementById('condition-value');
        
        let count = 0;
        const target = 5;
        
        const executeStep = () => {
            if (count >= target) {
                output.textContent += 'Loop finished!\n';
                this.finishVisualization();
                return;
            }
            
            // Update variables
            countValue.textContent = count;
            conditionValue.textContent = `${count} < ${target} = ${count < target}`;
            
            // Add to output
            output.textContent += `Count is: ${count}\n`;
            
            count++;
            
            if (this.isRunning) {
                this.visualizationTimer = setTimeout(executeStep, 1500 / this.speed);
            }
        };
        
        executeStep();
    }

    runNestedLoopVisualization() {
        const grid = document.getElementById('nestedGrid');
        const currentPos = document.getElementById('current-pos');
        const outerCounter = document.getElementById('outer-counter');
        const innerCounter = document.getElementById('inner-counter');
        
        let row = 0, col = 0;
        
        const executeStep = () => {
            if (row >= 3) {
                this.finishVisualization();
                return;
            }
            
            // Clear previous active cell
            grid.querySelectorAll('.grid-cell').forEach(cell => {
                cell.classList.remove('active');
            });
            
            // Highlight current cell
            const currentCell = grid.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (currentCell) {
                currentCell.classList.add('active');
                setTimeout(() => {
                    currentCell.classList.remove('active');
                    currentCell.classList.add('visited');
                }, 500);
            }
            
            // Update counters
            currentPos.textContent = `(${row},${col})`;
            outerCounter.textContent = row;
            innerCounter.textContent = col;
            
            // Move to next position
            col++;
            if (col >= 4) {
                col = 0;
                row++;
            }
            
            if (this.isRunning) {
                this.visualizationTimer = setTimeout(executeStep, 1000 / this.speed);
            }
        };
        
        // Reset grid
        grid.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('active', 'visited');
        });
        
        executeStep();
    }

    updateFlowDiagram(activeStepId) {
        document.querySelectorAll('.flow-step').forEach(step => {
            step.classList.remove('active');
        });
        
        const activeStep = document.getElementById(activeStepId);
        if (activeStep) {
            activeStep.classList.add('active');
        }
    }

    stepVisualization() {
        // Implement single-step execution
        if (!this.isRunning) {
            this.startVisualization();
            setTimeout(() => this.pauseVisualization(), 100);
        }
    }

    pauseVisualization() {
        this.isRunning = false;
        if (this.visualizationTimer) {
            clearTimeout(this.visualizationTimer);
        }
    }

    resetVisualization() {
        this.pauseVisualization();
        this.currentStep = 0;
        
        // Clear outputs
        const outputs = ['loop-output', 'while-output'];
        outputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = '';
        });
        
        // Reset variables
        const variables = [
            { id: 'fruit-value', value: 'undefined' },
            { id: 'iteration-value', value: '0' },
            { id: 'count-value', value: '0' },
            { id: 'condition-value', value: 'count < target' }
        ];
        
        variables.forEach(variable => {
            const element = document.getElementById(variable.id);
            if (element) element.textContent = variable.value;
        });
        
        // Reset flow diagram
        document.querySelectorAll('.flow-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Reset nested grid
        if (this.currentLoopType === 'nested') {
            const grid = document.getElementById('nestedGrid');
            if (grid) {
                grid.querySelectorAll('.grid-cell').forEach(cell => {
                    cell.classList.remove('active', 'visited');
                });
            }
            
            document.getElementById('current-pos').textContent = '(0,0)';
            document.getElementById('outer-counter').textContent = '0';
            document.getElementById('inner-counter').textContent = '0';
        }
    }

    finishVisualization() {
        this.isRunning = false;
        if (this.visualizationTimer) {
            clearTimeout(this.visualizationTimer);
        }
        
        // Clear flow diagram
        setTimeout(() => {
            document.querySelectorAll('.flow-step').forEach(step => {
                step.classList.remove('active');
            });
        }, 1000);
    }

    setSpeed(value) {
        this.speed = parseInt(value);
        document.getElementById('speedValue').textContent = `${value}x`;
    }

    // Pattern Functions
    showPattern(pattern) {
        // Hide all patterns
        document.querySelectorAll('.pattern-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.pattern-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected pattern
        const selectedPattern = document.getElementById(`${pattern}-pattern`);
        if (selectedPattern) {
            selectedPattern.classList.add('active');
        }
        
        // Activate corresponding tab
        const selectedTab = Array.from(document.querySelectorAll('.pattern-tab'))
            .find(tab => tab.textContent.toLowerCase().includes(pattern));
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        this.currentPattern = pattern;
    }

    runPattern(patternType) {
        const output = document.getElementById('patternOutput');
        let result = '';
        
        switch (patternType) {
            case 'countdown':
                for (let i = 10; i > 0; i--) {
                    result += `T-minus ${i}\n`;
                }
                result += 'Blast off! 🚀';
                break;
                
            case 'stars':
                for (let i = 0; i < 5; i++) {
                    result += '★'.repeat(i + 1) + '\n';
                }
                break;
                
            case 'filter':
                const words = ["python", "code", "programming", "loop", "iteration"];
                const longWords = [];
                for (let word of words) {
                    if (word.length > 5) {
                        longWords.push(word);
                    }
                }
                result = `Long words: ${longWords.join(', ')}`;
                break;
                
            case 'vowels':
                const text = "Hello World";
                let vowelCount = 0;
                for (let letter of text.toLowerCase()) {
                    if ('aeiou'.includes(letter)) {
                        vowelCount++;
                    }
                }
                result = `Text: "${text}"\nVowels found: ${vowelCount}`;
                break;
        }
        
        output.textContent = result;
        output.scrollIntoView({ behavior: 'smooth' });
    }

    getProjectData() {
        return {
            'number-guessing': {
                title: 'Number Guessing Game',
                instructions: `
                    <h4>🎯 Project Goal</h4>
                    <p>Create a complete number guessing game that demonstrates while loops, user input validation, and game logic.</p>
                    
                    <h4>📋 Requirements</h4>
                    <ol>
                        <li>Generate a random number between 1 and 100</li>
                        <li>Use a while loop to keep asking for guesses</li>
                        <li>Validate user input (numbers only)</li>
                        <li>Provide "higher" or "lower" hints</li>
                        <li>Count the number of attempts</li>
                        <li>Offer to play again when game ends</li>
                    </ol>
                    
                    <h4>💡 Tips</h4>
                    <ul>
                        <li>Use <code>import random</code> for random number generation</li>
                        <li>Use <code>while True:</code> for the main game loop</li>
                        <li>Use <code>break</code> to exit loops when needed</li>
                        <li>Handle invalid input with try/except</li>
                    </ul>
                `,
                starterCode: `import random

def number_guessing_game():
    """Main game function"""
    print("🎲 Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100...")
    
    # Generate random number
    secret_number = random.randint(1, 100)
    attempts = 0
    
    # Main game loop
    while True:
        try:
            # TODO: Get user input
            guess = int(input("Enter your guess: "))
            attempts += 1
            
            # TODO: Check the guess
            if guess == secret_number:
                print(f"🎉 Congratulations! You got it in {attempts} attempts!")
                break
            elif guess < secret_number:
                print("📈 Too low! Try a higher number.")
            else:
                print("📉 Too high! Try a lower number.")
                
        except ValueError:
            print("❌ Please enter a valid number!")
    
    # TODO: Ask if player wants to play again
    play_again = input("Play again? (y/n): ").lower()
    if play_again == 'y':
        number_guessing_game()  # Recursive call
    else:
        print("Thanks for playing!")

# Start the game
if __name__ == "__main__":
    number_guessing_game()`,
                solution: `import random

def number_guessing_game():
    """Complete number guessing game with all features"""
    print("🎲 Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100...")
    
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10
    
    while attempts < max_attempts:
        try:
            guess = int(input(f"Attempt {attempts + 1}/{max_attempts} - Enter your guess: "))
            attempts += 1
            
            if guess == secret_number:
                print(f"🎉 Congratulations! You got it in {attempts} attempts!")
                break
            elif guess < secret_number:
                print("📈 Too low! Try a higher number.")
            else:
                print("📉 Too high! Try a lower number.")
                
            if attempts == max_attempts:
                print(f"💔 Game Over! The number was {secret_number}")
                
        except ValueError:
            print("❌ Please enter a valid number!")
            continue
    
    play_again = input("Play again? (y/n): ").lower()
    if play_again == 'y':
        number_guessing_game()
    else:
        print("Thanks for playing! 👋")

if __name__ == "__main__":
    number_guessing_game()`
            },
            'ascii-art': {
                title: 'ASCII Art Generator',
                instructions: `
                    <h4>🎨 Project Goal</h4>
                    <p>Create various ASCII art patterns using nested loops and demonstrate different looping techniques.</p>
                    
                    <h4>📋 Patterns to Create</h4>
                    <ol>
                        <li><strong>Right Triangle</strong>: Stars forming a right triangle</li>
                        <li><strong>Diamond Shape</strong>: Stars forming a diamond pattern</li>
                        <li><strong>Number Pyramid</strong>: Numbers in pyramid formation</li>
                        <li><strong>Hollow Rectangle</strong>: Rectangle with hollow center</li>
                    </ol>
                    
                    <h4>🛠️ Techniques You'll Use</h4>
                    <ul>
                        <li>Nested for loops</li>
                        <li>String repetition and formatting</li>
                        <li>Mathematical patterns in loops</li>
                        <li>Conditional logic within loops</li>
                    </ul>
                `,
                starterCode: `def create_triangle(height):
    """Create a right triangle pattern"""
    print("Right Triangle:")
    for i in range(height):
        # TODO: Print stars in increasing pattern
        print("*" * (i + 1))
    print()

def create_diamond(size):
    """Create a diamond pattern"""
    print("Diamond Pattern:")
    # TODO: Implement diamond pattern
    # Hint: Two parts - expanding and contracting
    
    # Upper half (including middle)
    for i in range(size):
        spaces = " " * (size - i - 1)
        stars = "*" * (2 * i + 1)
        print(spaces + stars)
    
    # Lower half
    for i in range(size - 2, -1, -1):
        spaces = " " * (size - i - 1)
        stars = "*" * (2 * i + 1)
        print(spaces + stars)
    print()

def create_number_pyramid(height):
    """Create a number pyramid"""
    print("Number Pyramid:")
    for i in range(1, height + 1):
        # TODO: Print numbers in pyramid pattern
        spaces = " " * (height - i)
        numbers = ""
        for j in range(1, i + 1):
            numbers += str(j) + " "
        print(spaces + numbers)
    print()

def create_hollow_rectangle(width, height):
    """Create a hollow rectangle"""
    print("Hollow Rectangle:")
    for i in range(height):
        if i == 0 or i == height - 1:
            # TODO: Print full row of stars for top and bottom
            print("*" * width)
        else:
            # TODO: Print hollow row (stars only at edges)
            print("*" + " " * (width - 2) + "*")
    print()

def main():
    """Main function to create all patterns"""
    print("🎨 ASCII Art Generator")
    print("=" * 30)
    
    create_triangle(5)
    create_diamond(4)
    create_number_pyramid(5)
    create_hollow_rectangle(8, 5)

if __name__ == "__main__":
    main()`,
                solution: `def create_triangle(height):
    """Create a right triangle pattern"""
    print("Right Triangle:")
    for i in range(height):
        print("*" * (i + 1))
    print()

def create_diamond(size):
    """Create a diamond pattern"""
    print("Diamond Pattern:")
    
    # Upper half (including middle)
    for i in range(size):
        spaces = " " * (size - i - 1)
        stars = "*" * (2 * i + 1)
        print(spaces + stars)
    
    # Lower half
    for i in range(size - 2, -1, -1):
        spaces = " " * (size - i - 1)
        stars = "*" * (2 * i + 1)
        print(spaces + stars)
    print()

def create_number_pyramid(height):
    """Create a number pyramid"""
    print("Number Pyramid:")
    for i in range(1, height + 1):
        spaces = " " * (height - i)
        numbers = ""
        for j in range(1, i + 1):
            numbers += str(j) + " "
        print(spaces + numbers.rstrip())
    print()

def create_hollow_rectangle(width, height):
    """Create a hollow rectangle"""
    print("Hollow Rectangle:")
    for i in range(height):
        if i == 0 or i == height - 1:
            print("*" * width)
        else:
            print("*" + " " * (width - 2) + "*")
    print()

def create_advanced_patterns():
    """Additional advanced patterns"""
    print("Advanced Patterns:")
    
    # Spiral pattern
    print("Number Spiral (3x3):")
    spiral = [[1, 2, 3], [8, 9, 4], [7, 6, 5]]
    for row in spiral:
        for num in row:
            print(f"{num:2}", end=" ")
        print()
    print()
    
    # Pascal's triangle
    print("Pascal's Triangle:")
    for i in range(5):
        spaces = " " * (5 - i - 1)
        row = [1]
        if i > 0:
            for j in range(1, i):
                row.append(prev_row[j-1] + prev_row[j])
            row.append(1)
        
        print(spaces + " ".join(map(str, row)))
        prev_row = row
    print()

def main():
    """Main function to create all patterns"""
    print("🎨 ASCII Art Generator")
    print("=" * 40)
    
    create_triangle(6)
    create_diamond(5)
    create_number_pyramid(6)
    create_hollow_rectangle(10, 6)
    create_advanced_patterns()
    
    print("🎉 All patterns created successfully!")

if __name__ == "__main__":
    main()`
            }
        };
    }
}

// Global functions for HTML event handlers
let loopsEngine;

document.addEventListener('DOMContentLoaded', () => {
    loopsEngine = new LoopsEngine();
});

function setLoopType(type) {
    loopsEngine.setLoopType(type);
}

function startVisualization() {
    loopsEngine.startVisualization();
}

function stepVisualization() {
    loopsEngine.stepVisualization();
}

function pauseVisualization() {
    loopsEngine.pauseVisualization();
}

function resetVisualization() {
    loopsEngine.resetVisualization();
}

function setSpeed(value) {
    loopsEngine.setSpeed(value);
}

function showPattern(pattern) {
    loopsEngine.showPattern(pattern);
}

function runPattern(patternType) {
    loopsEngine.runPattern(patternType);
}

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = loopsEngine.projects[projectId];
    
    if (!project) return;
    
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectInstructions').innerHTML = project.instructions;
    document.getElementById('projectEditor').value = project.starterCode;
    
    modal.style.display = 'block';
    modal.dataset.projectId = projectId;
    modal.dataset.solution = project.solution;
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

function runProject() {
    const editor = document.getElementById('projectEditor');
    const output = document.getElementById('projectOutput');
    const code = editor.value;
    
    output.textContent = 'Running project...\n';
    
    setTimeout(() => {
        try {
            // Simulate Python execution for loops
            const result = loopsEngine.simulateLoopProject(code);
            output.textContent = result;
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
        }
    }, 1000);
}

function resetProject() {
    const modal = document.getElementById('projectModal');
    const projectId = modal.dataset.projectId;
    const project = loopsEngine.projects[projectId];
    
    if (project) {
        document.getElementById('projectEditor').value = project.starterCode;
        document.getElementById('projectOutput').textContent = '';
    }
}

function clearProjectOutput() {
    document.getElementById('projectOutput').textContent = '';
}

function previousLesson() {
    window.location.href = 'data-structures.html';
}

function nextLesson() {
    window.location.href = '../phase3/oop-fundamentals.html';
}

// Add simulation method to LoopsEngine
LoopsEngine.prototype.simulateLoopProject = function(code) {
    // Basic simulation for loop projects
    if (code.includes('number_guessing_game')) {
        return `🎲 Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100...
Attempt 1/10 - Enter your guess: [User would input here]
📈 Too low! Try a higher number.
[Game continues...]

This is a simulation. In a real environment, the game would be interactive.`;
    }
    
    if (code.includes('create_triangle')) {
        return `🎨 ASCII Art Generator
==============================
Right Triangle:
*
**
***
****
*****

Diamond Pattern:
   *
  ***
 *****
*******
 *****
  ***
   *

Number Pyramid:
    1 
   1 2 
  1 2 3 
 1 2 3 4 
1 2 3 4 5 

Hollow Rectangle:
**********
*        *
*        *
*        *
**********

🎉 All patterns created successfully!`;
    }
    
    return 'Project executed successfully!\n\nNote: This is a simplified simulation. In a real Python environment, your code would run with full interactivity.';
};

console.log('🔄 Loops Engine loaded successfully!');
