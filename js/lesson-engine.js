class LessonEngine {
    constructor() {
        this.currentPhase = 1;
        this.currentModule = '1-1';
        this.currentSection = 0;
        this.lessonData = null;
        this.userProgress = this.loadProgress();
        this.notes = this.loadNotes();
        
        this.init();
    }

    async init() {
        await this.loadLessonData();
        this.renderLesson();
        this.setupEventListeners();
    }

    async loadLessonData() {
        try {
            // In a real app, this would be an API call
            // For now, we'll use the embedded data
            this.lessonData = this.getEmbeddedLessonData();
        } catch (error) {
            console.error('Failed to load lesson data:', error);
        }
    }

    getEmbeddedLessonData() {
        return {
            "id": "1-1",
            "title": "Variables & Data Types",
            "description": "Learn how computers store and manipulate information",
            "duration": "45 min read",
            "difficulty": "Beginner",
            "sections": [
                {
                    "id": "intro",
                    "title": "Introduction",
                    "type": "content",
                    "content": {
                        "text": "Think of variables as labeled storage boxes in your computer's memory. Each box can hold different types of information, and you can access that information anytime by referring to the box's label (the variable name).",
                        "objectives": [
                            "Understand how computers store information in memory",
                            "Master Python's four primary data types",
                            "Write your first Python programs using variables",
                            "Debug common variable-related errors"
                        ]
                    }
                },
                {
                    "id": "concepts", 
                    "title": "Key Concepts",
                    "type": "content",
                    "content": {
                        "concepts": [
                            {
                                "title": "The Storage Box Analogy",
                                "explanation": "Variables are like labeled storage boxes in your computer's memory. Each box has a name and can store different types of data.",
                                "code": {
                                    "python": "# Numbers\nage = 25                    # Integer (whole number)\nheight = 5.8               # Float (decimal number)\n\n# Text\nname = \"Alice\"             # String (text)\nis_student = True          # Boolean (True/False)\n\n# You can check the type of any variable\nprint(type(age))           # <class 'int'>\nprint(type(height))        # <class 'float'>\nprint(type(name))          # <class 'str'>\nprint(type(is_student))    # <class 'bool'>"
                                }
                            },
                            {
                                "title": "Data Type Characteristics",
                                "explanation": "Each data type serves specific purposes and has unique characteristics:",
                                "table": {
                                    "headers": ["Data Type", "Purpose", "Example", "Common Operations"],
                                    "rows": [
                                        ["Integer (int)", "Whole numbers", "42, -17, 0", "Math operations, counting"],
                                        ["Float (float)", "Decimal numbers", "3.14, -2.5, 0.0", "Precise calculations, measurements"],
                                        ["String (str)", "Text data", "\"Hello\", 'Python'", "Text processing, messages"],
                                        ["Boolean (bool)", "True/False values", "True, False", "Logic, decision making"]
                                    ]
                                }
                            },
                            {
                                "title": "Variable Naming Rules",
                                "explanation": "Python has specific rules for naming variables:",
                                "list": [
                                    "Must start with a letter (a-z, A-Z) or underscore (_)",
                                    "Can contain letters, numbers, and underscores",
                                    "Cannot contain spaces or special characters",
                                    "Case-sensitive (age and Age are different variables)",
                                    "Cannot use Python keywords (like if, for, while)"
                                ],
                                "code": {
                                    "python": "# Good variable names\nuser_name = \"Alice\"\nfirst_number = 10\nis_valid = True\n_private_var = \"hidden\"\n\n# Bad variable names (will cause errors)\n# 2nd_number = 20      # Can't start with number\n# user-name = \"Bob\"    # Can't use hyphens\n# for = 5              # Can't use keywords"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": "exercise",
                    "title": "Interactive Exercise",
                    "type": "exercise",
                    "content": {
                        "title": "Complete the Student Profile",
                        "description": "Create variables to store information about a student. Fill in the blanks to complete the code:",
                        "starter_code": "# Student Profile Creator\n# Fill in the blanks with appropriate values\n\nstudent_name = \"___\"          # Your name (string)\nstudent_age = ___             # Your age (integer)\nstudent_gpa = ___             # Your GPA (float)\nis_enrolled = ___             # Are you enrolled? (boolean)\n\n# Display the profile\nprint(f\"Student Profile:\")\nprint(f\"Name: {student_name}\")\nprint(f\"Age: {student_age}\")\nprint(f\"GPA: {student_gpa}\")\nprint(f\"Enrolled: {is_enrolled}\")\n\n# Bonus: Calculate graduation year (assuming current year is 2024)\n# and typical degree takes 4 years\ngraduation_year = 2024 + (4 - (student_age - 18))\nprint(f\"Expected graduation: {graduation_year}\")",
                        "solution": "# Student Profile Creator\nstudent_name = \"Alice Johnson\"    # Your name (string)\nstudent_age = 20                  # Your age (integer) \nstudent_gpa = 3.8                 # Your GPA (float)\nis_enrolled = True                # Are you enrolled? (boolean)\n\n# Display the profile\nprint(f\"Student Profile:\")\nprint(f\"Name: {student_name}\")\nprint(f\"Age: {student_age}\")\nprint(f\"GPA: {student_gpa}\")\nprint(f\"Enrolled: {is_enrolled}\")\n\n# Bonus: Calculate graduation year\ngraduation_year = 2024 + (4 - (student_age - 18))\nprint(f\"Expected graduation: {graduation_year}\")",
                        "hints": [
                            "Strings must be enclosed in quotes (\" or ')",
                            "Integers are whole numbers without quotes",
                            "Floats are decimal numbers like 3.8 or 2.75",
                            "Booleans are either True or False (capitalized)"
                        ],
                        "tests": [
                            {
                                "description": "Variables are defined",
                                "check": "student_name is defined and student_age is defined"
                            },
                            {
                                "description": "Correct data types used",
                                "check": "isinstance(student_name, str) and isinstance(student_age, int)"
                            }
                        ]
                    }
                },
                {
                    "id": "quiz",
                    "title": "Knowledge Check",
                    "type": "quiz",
                    "content": {
                        "questions": [
                            {
                                "question": "What data type would you use to store a person's GPA?",
                                "options": ["Integer (int)", "Float (float)", "String (str)", "Boolean (bool)"],
                                "correct": 1,
                                "explanation": "GPA contains decimal values like 3.75, so Float is the correct choice. Integers can only store whole numbers."
                            },
                            {
                                "question": "Which of these is a valid Python variable name?",
                                "options": ["2nd_grade", "user-name", "_private_data", "for"],
                                "correct": 2,
                                "explanation": "_private_data is valid. Variable names can start with underscore, but not with numbers, can't contain hyphens, and can't be Python keywords."
                            },
                            {
                                "question": "What will this code output: print(type(True))",
                                "options": ["<class 'boolean'>", "<class 'bool'>", "<class 'true'>", "True"],
                                "correct": 1,
                                "explanation": "The type() function returns <class 'bool'> for boolean values in Python."
                            }
                        ]
                    }
                }
            ]
        };
    }

    renderLesson() {
        this.updateHeader();
        this.updateSidebar();
        this.renderCurrentSection();
    }

    updateHeader() {
        document.getElementById('lessonTitle').textContent = this.lessonData.title;
        document.getElementById('lessonDuration').textContent = this.lessonData.duration;
        document.getElementById('lessonDifficulty').textContent = `🟡 ${this.lessonData.difficulty}`;
    }

    updateSidebar() {
        const navSection = document.querySelector('.lesson-nav .nav-section');
        const lessonList = navSection.querySelector('.lesson-list');
        
        lessonList.innerHTML = this.lessonData.sections.map((section, index) => {
            const status = this.getSectionStatus(section.id);
            const statusIcon = this.getStatusIcon(status);
            
            return `
                <li class="lesson-item ${status}" data-section="${index}">
                    <span class="status-icon">${statusIcon}</span>
                    <a href="#${section.id}" onclick="lessonEngine.goToSection(${index})">${section.title}</a>
                </li>
            `;
        }).join('');
    }

    renderCurrentSection() {
        const section = this.lessonData.sections[this.currentSection];
        const contentArea = document.getElementById('lessonContentArea');
        
        switch (section.type) {
            case 'content':
                contentArea.innerHTML = this.renderContentSection(section);
                break;
            case 'exercise':
                contentArea.innerHTML = this.renderExerciseSection(section);
                break;
            case 'quiz':
                contentArea.innerHTML = this.renderQuizSection(section);
                break;
        }

        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Highlight code blocks
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }

    renderContentSection(section) {
        let html = `<section class="content-section">`;
        
        if (section.content.text) {
            html += `<div class="concept-card">
                <p>${section.content.text}</p>
            </div>`;
        }

        if (section.content.objectives) {
            html += `<div class="learning-objectives">
                <h3>🎯 Learning Objectives</h3>
                <ul>
                    ${section.content.objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            </div>`;
        }

        if (section.content.concepts) {
            section.content.concepts.forEach(concept => {
                html += `<div class="concept-card">
                    <h4 class="concept-title">${concept.title}</h4>
                    <p>${concept.explanation}</p>`;
                
                if (concept.code && concept.code.python) {
                    html += `<div class="code-example">
                        <div class="code-header">
                            <span class="code-label">Python Example</span>
                            <div class="code-actions">
                                <button class="code-action-btn" onclick="copyCode(this)" title="Copy code">📋</button>
                                <button class="code-action-btn" onclick="runCodeInModal('${concept.code.python.replace(/'/g, "\\'")}', '${concept.title}')" title="Try it">▶️</button>
                            </div>
                        </div>
                        <pre class="code-block"><code class="language-python">${concept.code.python}</code></pre>
                    </div>`;
                }

                if (concept.table) {
                    html += this.renderTable(concept.table);
                }

                if (concept.list) {
                    html += `<ul>
                        ${concept.list.map(item => `<li>${item}</li>`).join('')}
                    </ul>`;
                }

                html += `</div>`;
            });
        }

        html += `</section>`;
        return html;
    }

    renderExerciseSection(section) {
        return `
            <section class="content-section">
                <div class="interactive-exercise">
                    <h3 class="exercise-prompt">🛠️ ${section.content.title}</h3>
                    <p>${section.content.description}</p>
                    <div class="exercise-actions">
                        <button class="try-it-btn" onclick="openExerciseModal('${section.id}')">
                            Try It Yourself
                        </button>
                    </div>
                </div>
                
                <div class="concept-card">
                    <h4>💡 Hints</h4>
                    <ul>
                        ${section.content.hints.map(hint => `<li>${hint}</li>`).join('')}
                    </ul>
                </div>
            </section>
        `;
    }

    renderQuizSection(section) {
        let html = `<section class="content-section">`;
        
        section.content.questions.forEach((question, qIndex) => {
            html += `
                <div class="quiz-container" data-question="${qIndex}">
                    <div class="quiz-question">${question.question}</div>
                    <div class="quiz-options">
                        ${question.options.map((option, oIndex) => `
                            <label class="quiz-option">
                                <input type="radio" name="q${qIndex}" value="${oIndex}">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                    <button class="check-answer-btn" onclick="checkQuizAnswer(${qIndex}, ${question.correct})" disabled>
                        Check Answer
                    </button>
                    <div class="quiz-feedback" style="display: none;"></div>
                </div>
            `;
        });
        
        html += `</section>`;
        return html;
    }

    renderTable(tableData) {
        return `
            <table class="comparison-table">
                <thead>
                    <tr>
                        ${tableData.headers.map(header => `<th>${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${tableData.rows.map(row => `
                        <tr>
                            ${row.map(cell => `<td>${cell}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    getSectionStatus(sectionId) {
        const completed = this.userProgress.completedSections || [];
        const current = this.lessonData.sections[this.currentSection].id;
        
        if (completed.includes(sectionId)) return 'completed';
        if (sectionId === current) return 'active';
        return 'locked';
    }

    getStatusIcon(status) {
        switch (status) {
            case 'completed': return '✓';
            case 'active': return '▶';
            case 'locked': return '🔒';
            default: return '○';
        }
    }

    goToSection(sectionIndex) {
        if (sectionIndex >= 0 && sectionIndex < this.lessonData.sections.length) {
            this.currentSection = sectionIndex;
            this.renderCurrentSection();
            this.updateSidebar();
        }
    }

    nextSection() {
        if (this.currentSection < this.lessonData.sections.length - 1) {
            // Mark current section as completed
            this.markSectionCompleted(this.lessonData.sections[this.currentSection].id);
            this.currentSection++;
            this.renderCurrentSection();
            this.updateSidebar();
        }
    }

    previousSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
            this.renderCurrentSection();
            this.updateSidebar();
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.querySelector('.nav-btn.prev');
        const nextBtn = document.querySelector('.nav-btn.next');
        
        prevBtn.disabled = this.currentSection === 0;
        nextBtn.disabled = this.currentSection === this.lessonData.sections.length - 1;
    }

    markSectionCompleted(sectionId) {
        if (!this.userProgress.completedSections) {
            this.userProgress.completedSections = [];
        }
        
        if (!this.userProgress.completedSections.includes(sectionId)) {
            this.userProgress.completedSections.push(sectionId);
            this.saveProgress();
        }
    }

    setupEventListeners() {
        // Quiz option selection
        document.addEventListener('change', (e) => {
            if (e.target.type === 'radio' && e.target.name.startsWith('q')) {
                const questionIndex = e.target.name.substring(1);
                const checkBtn = document.querySelector(`[data-question="${questionIndex}"] .check-answer-btn`);
                checkBtn.disabled = false;
            }
        });

        // Code copy functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('code-action-btn') && e.target.title === 'Copy code') {
                this.copyCodeToClipboard(e.target);
            }
        });
    }

    copyCodeToClipboard(button) {
        const codeBlock = button.closest('.code-example').querySelector('pre code');
        const code = codeBlock.textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            button.textContent = '✓';
            setTimeout(() => button.textContent = '📋', 2000);
        });
    }

    loadProgress() {
        const saved = localStorage.getItem('lessonProgress');
        return saved ? JSON.parse(saved) : {};
    }

    saveProgress() {
        localStorage.setItem('lessonProgress', JSON.stringify(this.userProgress));
    }

    loadNotes() {
        const saved = localStorage.getItem('lessonNotes');
        return saved ? JSON.parse(saved) : [];
    }

    saveNotes() {
        localStorage.setItem('lessonNotes', JSON.stringify(this.notes));
    }
}

// Global functions for HTML event handlers
let lessonEngine;

document.addEventListener('DOMContentLoaded', () => {
    lessonEngine = new LessonEngine();
});

function nextSection() {
    lessonEngine.nextSection();
}

function previousSection() {
    lessonEngine.previousSection();
}

function goToDashboard() {
    window.location.href = 'dashboard.html';
}

function checkQuizAnswer(questionIndex, correctAnswer) {
    const container = document.querySelector(`[data-question="${questionIndex}"]`);
    const selectedOption = container.querySelector('input[type="radio"]:checked');
    const feedback = container.querySelector('.quiz-feedback');
    const checkBtn = container.querySelector('.check-answer-btn');
    
    if (!selectedOption) return;
    
    const userAnswer = parseInt(selectedOption.value);
    const isCorrect = userAnswer === correctAnswer;
    
    feedback.style.display = 'block';
    feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    const question = lessonEngine.lessonData.sections
        .find(s => s.type === 'quiz')
        .content.questions[questionIndex];
    
    if (isCorrect) {
        feedback.innerHTML = `
            <div style="color: #10b981; font-weight: bold;">✓ Correct!</div>
            <div style="color: #374151; margin-top: 0.5rem;">${question.explanation}</div>
        `;
        lessonEngine.markSectionCompleted(`quiz-${questionIndex}`);
    } else {
        feedback.innerHTML = `
            <div style="color: #ef4444; font-weight: bold;">❌ Not quite right</div>
            <div style="color: #374151; margin-top: 0.5rem;">${question.explanation}</div>
        `;
    }
    
    checkBtn.disabled = true;
    
    // Disable all options for this question
    container.querySelectorAll('input[type="radio"]').forEach(input => {
        input.disabled = true;
    });
}

function openExerciseModal(sectionId) {
    const section = lessonEngine.lessonData.sections.find(s => s.id === sectionId);
    if (section && section.type === 'exercise') {
        const modal = document.getElementById('codeModal');
        document.getElementById('exerciseTitle').textContent = section.content.title;
        document.getElementById('exerciseDescription').innerHTML = `
            <h4>${section.content.title}</h4>
            <p>${section.content.description}</p>
        `;
        document.getElementById('codeEditor').value = section.content.starter_code;
        
        // Store the solution for checking
        modal.dataset.solution = section.content.solution;
        modal.dataset.hints = JSON.stringify(section.content.hints);
        modal.style.display = 'block';
    }
}
