// Control Flow Interactive Engine
class ControlFlowEngine {
    constructor() {
        this.currentPattern = 'simple';
        this.gameState = {
            currentScene: 'game-start',
            playerChoices: [],
            gameData: {}
        };
        this.decisionTreeState = {
            isRaining: null,
            hasUmbrella: null,
            isSunny: null
        };
        this.gradeCalculatorData = {
            scales: {
                'standard': { A: 90, B: 80, C: 70, D: 60 },
                'strict': { A: 93, B: 85, C: 77, D: 70 },
                'lenient': { A: 87, B: 77, C: 67, D: 57 }
            }
        };
        this.init();
    }

    init() {
        this.setupDecisionTree();
        this.setupPatternTabs();
        this.setupInteractiveExamples();
        this.setupAdventureGame();
        this.setupGradeCalculator();
        this.initializeDefaults();
    }

    // Decision Tree Functions
    setupDecisionTree() {
        this.updateDecisionCode();
    }

    makeDecision(condition, value) {
        this.decisionTreeState[condition] = value;
        
        // Clear all highlights first
        document.querySelectorAll('.decision-node, .result-node').forEach(node => {
            node.classList.remove('highlighted', 'active');
        });

        // Determine the path based on decisions
        if (condition === 'rain') {
            const leftNode = document.getElementById('rain-true');
            const rightNode = document.getElementById('rain-false');
            
            if (value) {
                leftNode.style.display = 'block';
                rightNode.style.display = 'none';
                leftNode.classList.add('highlighted');
            } else {
                leftNode.style.display = 'none';
                rightNode.style.display = 'block';
                rightNode.classList.add('highlighted');
            }
        }

        // Handle final decisions
        if (condition === 'umbrella') {
            const resultId = value ? 'result-umbrella-yes' : 'result-umbrella-no';
            this.activateResult(resultId);
        } else if (condition === 'sunny') {
            const resultId = value ? 'result-sunny-yes' : 'result-sunny-no';
            this.activateResult(resultId);
        }

        this.updateDecisionCode();
    }

    activateResult(resultId) {
        // Deactivate all results
        document.querySelectorAll('.result-node').forEach(node => {
            node.classList.remove('active');
        });

        // Activate the selected result
        const resultNode = document.getElementById(resultId);
        if (resultNode) {
            resultNode.classList.add('active');
        }
    }

    updateDecisionCode() {
        const codeElement = document.getElementById('decisionCode');
        if (!codeElement) return;

        const { isRaining, hasUmbrella, isSunny } = this.decisionTreeState;
        
        let codeText = `# Interactive Decision Tree
is_raining = ${isRaining !== null ? isRaining : 'True'}  # Change this based on your choices above
has_umbrella = ${hasUmbrella !== null ? hasUmbrella : 'False'}
is_sunny = ${isSunny !== null ? isSunny : 'False'}

if is_raining:
    if has_umbrella:
        print("🚶‍♂️ Go outside with umbrella!")
    else:
        print("🏠 Stay inside, it's raining!")
else:
    if is_sunny:
        print("🌞 Perfect day to go outside!")
    else:
        print("☁️ Cloudy day, but okay to go out!")
        
# Click the buttons above to see this code change!`;

        codeElement.textContent = codeText;
    }

    highlightPath(nodeId) {
        document.querySelectorAll('.decision-node').forEach(node => {
            node.classList.remove('highlighted');
        });

        const node = document.querySelector(`.decision-node.${nodeId}`);
        if (node) {
            node.classList.add('highlighted');
        }
    }

    // Pattern Functions
    setupPatternTabs() {
        const tabs = document.querySelectorAll('.pattern-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const pattern = tab.textContent.toLowerCase().replace(/[^a-z]/g, '');
                this.showPattern(pattern);
            });
        });
    }

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
            .find(tab => tab.textContent.toLowerCase().includes(pattern.replace(/[^a-z]/g, '')));
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        this.currentPattern = pattern;
    }

    // Interactive Example Functions
    setupInteractiveExamples() {
        // Initialize with default values
        setTimeout(() => {
            this.testSimpleIf();
            this.testIfElse();
            this.testElif();
            this.testNested();
            this.testLogical();
        }, 100);
    }

    testSimpleIf() {
        const ageInput = document.getElementById('ageSimple');
        const output = document.getElementById('simpleOutput');
        
        if (!ageInput || !output) return;
        
        const age = parseInt(ageInput.value) || 0;
        
        if (age >= 18) {
            output.textContent = "You are eligible to vote! 🗳️";
            output.style.color = '#10b981';
        } else {
            output.textContent = `You need to wait ${18 - age} more years to vote.`;
            output.style.color = '#f59e0b';
        }
        
        this.animateResult(output);
    }

    testIfElse() {
        const numberInput = document.getElementById('numberEven');
        const output = document.getElementById('ifElseOutput');
        
        if (!numberInput || !output) return;
        
        const number = parseInt(numberInput.value) || 0;
        
        if (number % 2 === 0) {
            output.textContent = `${number} is even! ✅`;
            output.style.color = '#10b981';
        } else {
            output.textContent = `${number} is odd! 🔸`;
            output.style.color = '#f59e0b';
        }
        
        this.animateResult(output);
    }

    testElif() {
        const scoreInput = document.getElementById('scoreInput');
        const output = document.getElementById('elifOutput');
        
        if (!scoreInput || !output) return;
        
        const score = parseInt(scoreInput.value) || 0;
        let grade, emoji;
        
        if (score >= 90) {
            grade = "A";
            emoji = "🏆";
        } else if (score >= 80) {
            grade = "B";
            emoji = "📚";
        } else if (score >= 70) {
            grade = "C";
            emoji = "📖";
        } else if (score >= 60) {
            grade = "D";
            emoji = "📝";
        } else {
            grade = "F";
            emoji = "😰";
        }
        
        output.textContent = `Score: ${score} → Grade: ${grade} ${emoji}`;
        
        // Color based on grade
        const colors = {
            'A': '#10b981', 'B': '#3b82f6', 'C': '#f59e0b', 
            'D': '#f97316', 'F': '#ef4444'
        };
        output.style.color = colors[grade];
        
        this.animateResult(output);
    }

    testNested() {
        const tempInput = document.getElementById('tempInput');
        const weatherSelect = document.getElementById('weatherSelect');
        const output = document.getElementById('nestedOutput');
        
        if (!tempInput || !weatherSelect || !output) return;
        
        const temperature = parseInt(tempInput.value) || 0;
        const weather = weatherSelect.value;
        let activity;
        
        if (temperature > 60) {
            if (weather === "sunny") {
                activity = "Perfect weather for outdoor activities! 🌞";
                output.style.color = '#10b981';
            } else if (weather === "cloudy") {
                activity = "Good weather, maybe bring a light jacket 🧥";
                output.style.color = '#3b82f6';
            } else if (weather === "rainy") {
                activity = "Warm but rainy, perfect for indoor activities ☔";
                output.style.color = '#6b7280';
            } else {
                activity = "Warm but snowy, unusual weather! ❄️";
                output.style.color = '#8b5cf6';
            }
        } else {
            if (weather === "snowy") {
                activity = "Great day for hot cocoa and staying warm! ❄️";
                output.style.color = '#3b82f6';
            } else {
                activity = "Too cold for outdoor activities 🥶";
                output.style.color = '#ef4444';
            }
        }
        
        output.textContent = activity;
        this.animateResult(output);
    }

    testLogical() {
        const ageInput = document.getElementById('logicalAge');
        const hasLicenseInput = document.getElementById('hasLicense');
        const hasCarInput = document.getElementById('hasCar');
        const results = document.getElementById('logicalResults');
        
        if (!ageInput || !hasLicenseInput || !hasCarInput || !results) return;
        
        const age = parseInt(ageInput.value) || 0;
        const hasLicense = hasLicenseInput.checked;
        const hasCar = hasCarInput.checked;
        
        let output = `Testing with: Age=${age}, License=${hasLicense}, Car=${hasCar}\n\n`;
        
        // AND condition
        if (age >= 18 && hasLicense) {
            output += "✅ Can drive legally (age >= 18 AND has license)\n";
        } else {
            output += "❌ Cannot drive legally (need age >= 18 AND license)\n";
        }
        
        // OR condition
        if (hasLicense || age >= 21) {
            output += "✅ Can rent from some companies (has license OR age >= 21)\n";
        } else {
            output += "❌ Cannot rent from most companies\n";
        }
        
        // NOT condition
        if (!hasCar) {
            output += "🚌 Might need public transportation (NOT has car)\n";
        } else {
            output += "🚗 Has personal transportation\n";
        }
        
        // Complex combination
        if (age >= 18 && hasLicense && hasCar) {
            output += "\n🎉 READY FOR ROAD TRIP! (all conditions met)";
        } else if (age >= 18 && hasLicense) {
            output += "\n🚕 Can drive but needs to borrow/rent a car";
        } else {
            output += "\n🚌 Not ready to drive independently yet";
        }
        
        results.textContent = output;
    }

    animateResult(element) {
        element.style.transform = 'scale(1.05)';
        element.style.fontWeight = 'bold';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }

    // Grade Calculator Functions
    setupGradeCalculator() {
        this.calculateGrade(); // Initialize with default values
    }

    calculateGrade() {
        const studentName = document.getElementById('studentName')?.value || 'Student';
        const gradingScale = document.getElementById('gradingScale')?.value || 'standard';
        const exam1 = parseFloat(document.getElementById('exam1')?.value) || 0;
        const exam2 = parseFloat(document.getElementById('exam2')?.value) || 0;
        const homework = parseFloat(document.getElementById('homework')?.value) || 0;
        const participation = parseFloat(document.getElementById('participation')?.value) || 0;
        
        // Calculate weighted average
        const examAvg = (exam1 + exam2) / 2;
        const finalScore = (examAvg * 0.5) + (homework * 0.3) + (participation * 0.2);
        
        // Determine letter grade
        const letterGrade = this.getLetterGrade(finalScore, gradingScale);
        
        // Generate feedback
        const feedback = this.generateFeedback(letterGrade, finalScore);
        
        // Update display
        const resultsElement = document.getElementById('gradeResults');
        if (resultsElement) {
            resultsElement.innerHTML = `
                <div class="result-card">
                    <h5>📊 Results for ${studentName}</h5>
                    <div class="grade-display">
                        <div class="final-grade" style="color: ${this.getGradeColor(letterGrade)}">${letterGrade}</div>
                        <div class="final-score">${finalScore.toFixed(1)}%</div>
                    </div>
                    <div class="grade-breakdown">
                        <div class="breakdown-item">
                            <span>Exams (50%): </span>
                            <span>${examAvg.toFixed(1)}</span>
                        </div>
                        <div class="breakdown-item">
                            <span>Homework (30%): </span>
                            <span>${homework.toFixed(1)}</span>
                        </div>
                        <div class="breakdown-item">
                            <span>Participation (20%): </span>
                            <span>${participation.toFixed(1)}</span>
                        </div>
                    </div>
                    <div class="feedback">
                        <strong>Feedback:</strong> ${feedback}
                    </div>
                </div>
            `;
        }
    }

    getLetterGrade(score, scale) {
        const thresholds = this.gradeCalculatorData.scales[scale];
        
        if (score >= thresholds.A) return 'A';
        if (score >= thresholds.B) return 'B';
        if (score >= thresholds.C) return 'C';
        if (score >= thresholds.D) return 'D';
        return 'F';
    }

    getGradeColor(grade) {
        const colors = {
            'A': '#10b981',
            'B': '#3b82f6', 
            'C': '#f59e0b',
            'D': '#f97316',
            'F': '#ef4444'
        };
        return colors[grade] || '#6b7280';
    }

    generateFeedback(grade, score) {
        if (grade === 'A') {
            return "🏆 Excellent work! You're performing at the highest level across all areas.";
        } else if (grade === 'B') {
            return "📚 Great job! You're doing well with some room for improvement.";
        } else if (grade === 'C') {
            return "📖 Good effort! Focus on strengthening weaker areas for better performance.";
        } else if (grade === 'D') {
            return "📝 You're passing, but consider extra study time and seeking help where needed.";
        } else {
            return "😰 This indicates significant challenges. Let's work together on a improvement plan.";
        }
    }

    // Adventure Game Functions
    setupAdventureGame() {
        this.resetGameToStart();
    }

    makeChoice(choice) {
        this.gameState.playerChoices.push(choice);
        
        // Hide current screen
        document.querySelectorAll('.game-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Determine next screen based on choice
        let nextScreen;
        const currentScreen = this.gameState.currentScene;
        
        if (currentScreen === 'game-start') {
            if (choice === 'investigate') {
                nextScreen = 'game-investigate';
            } else if (choice === 'report') {
                nextScreen = 'game-report';
            } else if (choice === 'ignore') {
                nextScreen = this.createEndingScene('focused-student');
            }
        } else if (currentScreen === 'game-investigate') {
            if (choice === 'hide') {
                nextScreen = this.createEndingScene('mystery-student');
            } else if (choice === 'run') {
                nextScreen = this.createEndingScene('code-thief');
            } else if (choice === 'stay') {
                nextScreen = this.createEndingScene('brave-confronter');
            }
        } else if (currentScreen === 'game-report') {
            if (choice === 'accept') {
                nextScreen = this.createEndingScene('honor-student');
            } else if (choice === 'decline') {
                nextScreen = this.createEndingScene('cautious-learner');
            } else if (choice === 'ask') {
                nextScreen = this.createEndingScene('collaborative-coder');
            }
        }
        
        // Show next screen
        if (nextScreen) {
            const screenElement = document.getElementById(nextScreen);
            if (screenElement) {
                screenElement.classList.add('active');
                this.gameState.currentScene = nextScreen;
            }
        }
        
        // Update code display
        this.updateAdventureCode();
    }

    createEndingScene(endingType) {
        const endings = {
            'focused-student': {
                icon: '📚',
                title: 'The Focused Student',
                text: 'You decide to ignore the USB drive and focus entirely on your regular coursework. While you miss the mystery, you excel in all your classes and graduate with honors.',
                lesson: 'Sometimes the best choice is to stay focused on your current goals.'
            },
            'mystery-student': {
                icon: '🕵️',
                title: 'The Mystery Student',
                text: 'You quickly hide the USB drive and act innocent. The approaching footsteps belonged to another curious student. You keep the secret and become part of an underground coding society.',
                lesson: 'Quick thinking and discretion can lead to unexpected opportunities.'
            },
            'code-thief': {
                icon: '💾',
                title: 'The Code Adventurer',
                text: 'You manage to copy the files before escaping! Later, you discover they contain advanced algorithms that help you become the top student in advanced programming courses.',
                lesson: 'Bold action, when calculated, can lead to great rewards.'
            },
            'brave-confronter': {
                icon: '⚔️',
                title: 'The Brave Confronter',
                text: 'You stay and meet the mysterious figure - it\'s the academy\'s legendary alumni! They\'re impressed by your courage and offer you a mentorship.',
                lesson: 'Courage in the face of uncertainty often leads to the greatest opportunities.'
            },
            'honor-student': {
                icon: '🏆',
                title: 'The Honor Student',
                text: 'You accept Professor Python\'s challenges and excel beyond expectations. Your honest approach and hard work earn you a recommendation for the academy\'s elite program.',
                lesson: 'Honesty and hard work are always rewarded in the long run.'
            },
            'cautious-learner': {
                icon: '🤔',
                title: 'The Cautious Learner',
                text: 'You politely decline, knowing your limits. Professor Python respects your self-awareness and offers you a structured path to reach the advanced level when you\'re ready.',
                lesson: 'Self-awareness and knowing your limits is a form of wisdom.'
            },
            'collaborative-coder': {
                icon: '👥',
                title: 'The Collaborative Coder',
                text: 'You ask to work with a partner and are paired with the academy\'s best student. Together, you solve challenges neither could handle alone and form a lifelong coding partnership.',
                lesson: 'Collaboration often leads to solutions greater than the sum of their parts.'
            }
        };
        
        const ending = endings[endingType];
        const endingId = `ending-${endingType}`;
        
        // Create ending screen if it doesn't exist
        let endingScreen = document.getElementById(endingId);
        if (!endingScreen) {
            endingScreen = document.createElement('div');
            endingScreen.className = 'game-screen';
            endingScreen.id = endingId;
            endingScreen.innerHTML = `
                <div class="scene-image">${ending.icon}</div>
                <div class="scene-text">
                    <h4>${ending.title}</h4>
                    <p>${ending.text}</p>
                    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px; margin-top: 1rem;">
                        <strong>Programming Lesson:</strong> ${ending.lesson}
                    </div>
                </div>
                <div class="choice-buttons">
                    <button class="choice-btn" onclick="controlFlowEngine.resetGameToStart()">
                        🔄 Play Again
                    </button>
                    <button class="choice-btn" onclick="controlFlowEngine.showAllPaths()">
                        🗺️ See All Possible Paths
                    </button>
                </div>
            `;
            
            document.getElementById('adventureGame').appendChild(endingScreen);
        }
        
        return endingId;
    }

    resetGameToStart() {
        this.gameState.currentScene = 'game-start';
        this.gameState.playerChoices = [];
        
        document.querySelectorAll('.game-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        document.getElementById('game-start').classList.add('active');
        this.updateAdventureCode();
    }

    showAllPaths() {
        alert(`🗺️ All Possible Adventure Paths:

📚 The Focused Student - Choose to ignore the USB
🕵️ The Mystery Student - Investigate → Hide the USB
💾 The Code Adventurer - Investigate → Copy files and run
⚔️ The Brave Confronter - Investigate → Stay and confront
🏆 The Honor Student - Report → Accept the challenge
🤔 The Cautious Learner - Report → Politely decline
👥 The Collaborative Coder - Report → Ask for a partner

Each path demonstrates different conditional logic patterns!`);
    }

    updateAdventureCode() {
        const codeElement = document.getElementById('adventureCode');
        if (!codeElement) return;
        
        const choices = this.gameState.playerChoices;
        let codeText = `# Choose Your Own Adventure - Current Path
def adventure_game():
    print("Welcome to CodeMaster Academy!")
    print("You discover a mysterious USB drive...")
    
    choice = input("What do you do? (investigate/report/ignore): ").lower()
    
    if choice == "investigate":
        print("You plug in the USB drive...")
        next_choice = input("Footsteps approach! (hide/run/stay): ").lower()
        
        if next_choice == "hide":
            print("🕵️ Ending: The Mystery Student")
        elif next_choice == "run":
            print("💾 Ending: The Code Adventurer")
        else:
            print("⚔️ Ending: The Brave Confronter")
            
    elif choice == "report":
        print("You report to Professor Python...")
        teacher_response = input("Accept challenge? (accept/decline/ask): ").lower()
        
        if teacher_response == "accept":
            print("🏆 Ending: The Honor Student")
        elif teacher_response == "decline":
            print("🤔 Ending: The Cautious Learner")
        else:
            print("👥 Ending: The Collaborative Coder")
    
    else:  # ignore
        print("📚 Ending: The Focused Student")

# Your current path: ${choices.join(' → ') || 'Just started!'}`;

        codeElement.textContent = codeText;
    }

    // Project Modal Functions
    openGradeProject() {
        const modal = document.getElementById('gradeProjectModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeGradeProject() {
        const modal = document.getElementById('gradeProjectModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    runGradeProject() {
        const editor = document.getElementById('gradeProjectEditor');
        const output = document.getElementById('gradeProjectOutput');
        const code = editor.value;
        
        output.innerHTML = 'Running grade calculator...\n';
        
        setTimeout(() => {
            try {
                const result = this.simulateGradeProject(code);
                output.innerHTML = result;
            } catch (error) {
                output.innerHTML = `Error: ${error.message}`;
                output.style.color = '#ef4444';
            }
        }, 1000);
    }

    simulateGradeProject(code) {
        if (code.includes('GradeCalculator') && code.includes('calculate_weighted_average')) {
            return `📊 Grade Calculator Project Results
========================================

✅ GradeCalculator class initialized successfully
✅ Grading scales loaded: standard, strict, lenient
✅ Weighted average calculation ready

📊 Sample Calculation Results:
========================================
Student: Alice Johnson
Grading Scale: Standard

Assignment Scores:
  📝 Exam 1: 87 (Weight: 25%)
  📝 Exam 2: 92 (Weight: 25%)  
  📖 Homework: 95 (Weight: 30%)
  💬 Participation: 88 (Weight: 20%)

📊 Final Calculations:
  Exam Average: 89.5
  Weighted Final Score: 90.1%
  Letter Grade: A-
  
🎯 Feedback: Excellent work! You're performing at the highest level.

✨ Grade Calculator is ready for multiple students!
Add more students and create class statistics to complete the project.`;
        }
        
        return 'Grade calculator structure detected. Complete the TODOs to see full functionality!';
    }

    resetGradeProject() {
        const editor = document.getElementById('gradeProjectEditor');
        if (editor) {
            // The starter code is already in the HTML
            location.reload();
        }
    }

    clearGradeOutput() {
        const output = document.getElementById('gradeProjectOutput');
        if (output) {
            output.innerHTML = '';
        }
    }

    // Adventure Project Modal Functions
    openAdventureProject() {
        const modal = document.getElementById('adventureProjectModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeAdventureProject() {
        const modal = document.getElementById('adventureProjectModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    runAdventureProject() {
        const editor = document.getElementById('adventureProjectEditor');
        const output = document.getElementById('adventureProjectOutput');
        const code = editor.value;
        
        output.innerHTML = 'Starting adventure game...\n';
        
        setTimeout(() => {
            try {
                const result = this.simulateAdventureProject(code);
                output.innerHTML = result;
            } catch (error) {
                output.innerHTML = `Error: ${error.message}`;
            }
        }, 1000);
    }

    simulateAdventureProject(code) {
        if (code.includes('AdventureGame') && code.includes('start_game')) {
            return `🌟 Welcome to the Coding Quest Adventure! 🌟
==================================================

Greetings, Brave Coder! Your journey begins now...

🏰 You stand before the mysterious Tower of Algorithms.
Legend says that whoever solves all the puzzles inside will become
the greatest programmer in the land!

💚 Health: 100
🎒 Inventory: Empty

What do you choose to do?
1. 🚪 Enter the tower boldly
2. 🔍 Examine the tower carefully first  
3. 🏃‍♂️ Run away (this quest is too scary!)

Enter your choice (1-3): [Interactive input would go here]

🎮 Game Features Detected:
✅ Player attributes (health, inventory, score)
✅ Branching storyline with if/elif/else logic
✅ Input validation and error handling
✅ Multiple possible endings
✅ Random events and consequences

🎯 This demonstrates advanced control flow patterns!
In a real environment, this would be fully interactive.

Continue coding to add more scenes, items, and complex decision trees!`;
        }
        
        return 'Adventure game structure detected. Add more scenes and choices to create your complete adventure!';
    }

    resetAdventureProject() {
        const editor = document.getElementById('adventureProjectEditor');
        if (editor) {
            location.reload();
        }
    }

    clearAdventureOutput() {
        const output = document.getElementById('adventureProjectOutput');
        if (output) {
            output.innerHTML = '';
        }
    }

    // Final Challenge Functions
    openFinalChallenge() {
        alert(`🏠 Smart Home Automation Challenge

Combine all Phase 1 concepts to create an intelligent home system!

Your system should:
📊 Use VARIABLES to store sensor readings and preferences
🧮 Apply MATHEMATICAL OPERATIONS for calculations and thresholds  
🎛️ Implement CONTROL FLOW for smart decision making

Example scenarios:
• Adjust thermostat based on temperature and occupancy
• Control lights based on time of day and motion sensors
• Manage security system with multiple conditions
• Calculate energy savings and costs

Ready to start your final challenge?`);
    }

    completePhase1() {
        const celebration = `
🎉 CONGRATULATIONS! 🎉
=============================

You've successfully completed Phase 1: Foundations!

✅ Variables & Data Types
✅ Mathematical Operations & Logic  
✅ Control Flow & Decision Making

You've mastered:
🔹 Python's core data types and variables
🔹 Arithmetic and boolean operations
🔹 Conditional logic with if/elif/else
🔹 Interactive programming concepts
🔹 Real-world problem solving

🚀 Ready for Phase 2: Core Concepts?
   • Data Structure Mastery
   • Loops & Iteration
   • Advanced Programming Patterns

Phase 2 awaits your arrival!`;

        alert(celebration);
        
        // Redirect to Phase 2 or Dashboard
        setTimeout(() => {
            const goToPhase2 = confirm("🚀 Ready to start Phase 2: Core Concepts?");
            if (goToPhase2) {
                window.location.href = '../phase2/data-structures.html';
            } else {
                window.location.href = '../../dashboard.html';
            }
        }, 2000);
    }

    // Utility Functions
    initializeDefaults() {
        setTimeout(() => {
            this.testSimpleIf();
            this.testIfElse();
            this.testElif();
            this.testNested();
            this.testLogical();
        }, 500);
    }
}

// Global functions for HTML event handlers
let controlFlowEngine;

document.addEventListener('DOMContentLoaded', () => {
    controlFlowEngine = new ControlFlowEngine();
});

// Decision Tree Functions
function makeDecision(condition, value) {
    controlFlowEngine.makeDecision(condition, value);
}

function highlightPath(nodeId) {
    controlFlowEngine.highlightPath(nodeId);
}

// Pattern Functions
function showPattern(pattern) {
    controlFlowEngine.showPattern(pattern);
}

// Interactive Example Functions
function testSimpleIf() {
    controlFlowEngine.testSimpleIf();
}

function testIfElse() {
    controlFlowEngine.testIfElse();
}

function testElif() {
    controlFlowEngine.testElif();
}

function testNested() {
    controlFlowEngine.testNested();
}

function testLogical() {
    controlFlowEngine.testLogical();
}

// Grade Calculator Functions
function calculateGrade() {
    controlFlowEngine.calculateGrade();
}

function openGradeProject() {
    controlFlowEngine.openGradeProject();
}

function closeGradeProject() {
    controlFlowEngine.closeGradeProject();
}

function runGradeProject() {
    controlFlowEngine.runGradeProject();
}

function resetGradeProject() {
    controlFlowEngine.resetGradeProject();
}

function clearGradeOutput() {
    controlFlowEngine.clearGradeOutput();
}

// Adventure Game Functions
function makeChoice(choice) {
    controlFlowEngine.makeChoice(choice);
}

function openAdventureProject() {
    controlFlowEngine.openAdventureProject();
}

function closeAdventureProject() {
    controlFlowEngine.closeAdventureProject();
}

function runAdventureProject() {
    controlFlowEngine.runAdventureProject();
}

function resetAdventureProject() {
    controlFlowEngine.resetAdventureProject();
}

function clearAdventureOutput() {
    controlFlowEngine.clearAdventureOutput();
}

// Challenge Functions
function openFinalChallenge() {
    controlFlowEngine.openFinalChallenge();
}

function completePhase1() {
    controlFlowEngine.completePhase1();
}

// Navigation Functions
function previousLesson() {
    window.location.href = 'mathematical-operations.html';
}

console.log('🎛️ Control Flow Engine loaded successfully!');
