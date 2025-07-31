// Portfolio Projects System Engine - Ultimate Implementation for Phase 5 Completion
class PortfolioProjectsEngine {
    constructor() {
        // Core project tracking state
        this.projects = {
            visualizer: {
                id: 'visualizer',
                title: 'Interactive Algorithm Visualizer',
                icon: '🎨',
                status: 'not-started', // not-started, in-progress, completed
                progress: 0,
                steps: [
                    { id: 1, title: 'Set Up HTML Structure', completed: false },
                    { id: 2, title: 'Create CSS Styling', completed: false },
                    { id: 3, title: 'Implement Sorting Algorithms', completed: false },
                    { id: 4, title: 'Add Interactivity & Polish', completed: false }
                ],
                linesOfCode: 0,
                deployed: false,
                demoUrl: null
            },
            fullstack: {
                id: 'fullstack',
                title: 'Full-Stack Web Application',
                icon: '🌐',
                status: 'not-started',
                progress: 0,
                selectedType: null, // todo, expense, social, learning
                phases: [
                    { id: 1, title: 'Planning & Design', completed: false },
                    { id: 2, title: 'Backend Development', completed: false },
                    { id: 3, title: 'Frontend Development', completed: false },
                    { id: 4, title: 'Deployment & Polish', completed: false }
                ],
                linesOfCode: 0,
                deployed: false,
                demoUrl: null
            },
            game: {
                id: 'game',
                title: 'Interactive Coding Game',
                icon: '🎮',
                status: 'not-started',
                progress: 0,
                selectedConcept: null,
                features: [
                    { id: 'gameplay', title: 'Core Gameplay Mechanics', completed: false },
                    { id: 'graphics', title: 'Visual Design System', completed: false },
                    { id: 'audio', title: 'Audio Experience', completed: false },
                    { id: 'progression', title: 'Player Progression System', completed: false }
                ],
                linesOfCode: 0,
                deployed: false,
                demoUrl: null
            },
            library: {
                id: 'library',
                title: 'Data Structure Library',
                icon: '📚',
                status: 'not-started',
                progress: 0,
                structures: [
                    { id: 'linear', title: 'Linear Structures', completed: false },
                    { id: 'trees', title: 'Tree Structures', completed: false },
                    { id: 'graphs', title: 'Graph Structures', completed: false },
                    { id: 'hash', title: 'Hash Structures', completed: false },
                    { id: 'algorithms', title: 'Algorithms', completed: false }
                ],
                linesOfCode: 0,
                testsWritten: 0,
                documented: false,
                published: false
            }
        };
        
        // Portfolio statistics
        this.portfolioStats = {
            projectsCompleted: 0,
            totalLinesOfCode: 0,
            portfolioScore: 0
        };
        
        // Certification requirements
        this.certificationRequirements = {
            visualizer: {
                interactive: false,
                algorithms: false,
                responsive: false,
                deployed: false
            },
            fullstack: {
                backend: false,
                frontend: false,
                database: false,
                deployed: false
            },
            game: {
                mechanics: false,
                progression: false,
                polish: false,
                deployed: false
            },
            library: {
                structures: false,
                tests: false,
                docs: false,
                published: false
            }
        };
        
        // Active visualizer demo
        this.visualizerDemo = {
            canvas: null,
            ctx: null,
            array: [],
            isAnimating: false,
            comparisons: 0,
            swaps: 0,
            startTime: 0
        };
        
        // UI state
        this.activeTab = 'gameplay';
        this.selectedProject = null;
        
        // Visual effects system
        this.effectsEnabled = true;
        this.particleSystem = null;
        
        this.init();
    }

    init() {
        console.log('🏗️ Portfolio Projects Engine initializing...');
        this.setupGlobalFunctions();
        this.setupEventListeners();
        this.initializeProjects();
        this.updatePortfolioDisplay();
        this.setupVisualEffects();
        console.log('✅ Portfolio Projects Engine ready to build amazing projects!');
    }

    setupGlobalFunctions() {
        // Project builder functions
        window.toggleStep = (stepId) => this.toggleStep(stepId);
        window.completeStep = (stepId) => this.completeStep(stepId);
        window.startProject = (projectId) => this.startProject(projectId);
        window.startVisualizerDemo = () => this.startVisualizerDemo();
        
        // Full-stack project functions
        window.selectFullStackProject = (type) => this.selectFullStackProject(type);
        window.startFullStackProject = () => this.startFullStackProject();
        window.viewFullStackTemplates = () => this.viewFullStackTemplates();
        
        // Game development functions
        window.switchTab = (tabName) => this.switchTab(tabName);
        window.startCodingGame = () => this.startCodingGame();
        window.playGameExamples = () => this.playGameExamples();
        
        // Library functions
        window.startLibraryProject = () => this.startLibraryProject();
        window.viewLibraryExamples = () => this.viewLibraryExamples();
        
        // Showcase functions
        window.generatePortfolioSite = () => this.generatePortfolioSite();
        window.requestCertification = () => this.requestCertification();
        window.downloadCertificate = () => this.downloadCertificate();
        
        // Examples and demos
        window.viewVisualizerExamples = () => this.viewVisualizerExamples();
        window.viewDocumentation = () => this.viewDocumentation();
        
        // Navigation
        window.previousLesson = () => this.previousLesson();
        window.celebrateCompletion = () => this.celebrateCompletion();
        
        console.log('✅ Global functions registered for Portfolio Projects');
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.attachEventListeners();
            this.initializeCanvas();
        });
        
        // Project gallery click handlers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.project-preview')) {
                const projectType = e.target.closest('.project-preview').dataset.project;
                this.highlightProject(projectType);
            }
        });
        
        // Certification checkbox handlers
        document.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox' && e.target.id) {
                this.updateCertificationRequirement(e.target.id, e.target.checked);
            }
        });
    }

    attachEventListeners() {
        // Add hover effects to project previews
        document.querySelectorAll('.project-preview').forEach(preview => {
            preview.addEventListener('mouseenter', () => {
                this.addProjectHoverEffect(preview);
            });
            
            preview.addEventListener('mouseleave', () => {
                this.removeProjectHoverEffect(preview);
            });
        });
        
        // Initialize canvas if it exists
        const canvas = document.getElementById('visualizerCanvas');
        if (canvas) {
            this.setupVisualizerCanvas(canvas);
        }
    }

    setupVisualEffects() {
        // Create floating code snippets for atmosphere
        this.createFloatingCodeSnippets();
        
        // Initialize particle system for project showcase
        this.initializeProjectParticles();
        
        console.log('✨ Portfolio visual effects initialized');
    }

    createFloatingCodeSnippets() {
        const codeSnippets = [
            'def sort(arr):', 'class Node:', 'async function()', 'import React',
            '{ useState }', 'SELECT * FROM', 'git commit -m', 'npm install',
            'docker build', 'kubectl apply', '=> { return }', 'try { catch }'
        ];
        
        const container = document.createElement('div');
        container.className = 'floating-code-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        document.body.appendChild(container);
        
        codeSnippets.forEach((snippet, index) => {
            const element = document.createElement('div');
            element.className = 'floating-code';
            element.textContent = snippet;
            element.style.cssText = `
                position: absolute;
                font-family: 'Monaco', 'Consolas', monospace;
                font-size: 0.8rem;
                color: rgba(59, 130, 246, 0.1);
                animation: floatCode ${20 + Math.random() * 10}s infinite linear;
                animation-delay: ${Math.random() * 20}s;
                left: ${Math.random() * 100}%;
                top: 100%;
            `;
            
            container.appendChild(element);
        });
        
        // Add CSS animation
        if (!document.getElementById('floating-code-animation')) {
            const style = document.createElement('style');
            style.id = 'floating-code-animation';
            style.textContent = `
                @keyframes floatCode {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.1; }
                    90% { opacity: 0.1; }
                    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeProjectParticles() {
        // Create interactive particles that respond to project interactions
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createProjectParticle();
            }
        }, 2000);
    }

    createProjectParticle() {
        const particle = document.createElement('div');
        particle.className = 'project-particle';
        particle.innerHTML = ['⚡', '🚀', '💡', '🔥', '✨'][Math.floor(Math.random() * 5)];
        
        particle.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            animation: projectParticleFly 3s ease-out forwards;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
        `;
        
        document.body.appendChild(particle);
        
        // Add animation if not exists
        if (!document.getElementById('project-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'project-particle-animation';
            style.textContent = `
                @keyframes projectParticleFly {
                    0% { transform: translateY(0) scale(0); opacity: 0; }
                    20% { transform: translateY(-100px) scale(1); opacity: 1; }
                    80% { transform: translateY(-400px) scale(1); opacity: 0.8; }
                    100% { transform: translateY(-600px) scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }

    // ===== PROJECT MANAGEMENT SYSTEM =====
    
    initializeProjects() {
        this.updateProjectGrid();
        this.calculatePortfolioStats();
        console.log('📊 Projects initialized');
    }

    updateProjectGrid() {
        const grid = document.getElementById('projectGrid');
        if (!grid) return;
        
        grid.innerHTML = Object.values(this.projects).map(project => 
            this.createProjectCard(project)
        ).join('');
    }

    createProjectCard(project) {
        const progressPercent = Math.round(project.progress);
        const statusColor = this.getStatusColor(project.status);
        
        return `
            <div class="project-card" data-project="${project.id}">
                <div class="project-card-header">
                    <div class="project-icon">${project.icon}</div>
                    <div class="project-info">
                        <h4>${project.title}</h4>
                        <div class="project-status ${project.status}">${this.formatStatus(project.status)}</div>
                    </div>
                </div>
                
                <div class="project-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%; background: ${statusColor}"></div>
                    </div>
                    <span class="progress-text">${progressPercent}% Complete</span>
                </div>
                
                <div class="project-stats">
                    <div class="stat-item">
                        <span class="stat-value">${project.linesOfCode}</span>
                        <span class="stat-label">Lines of Code</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${project.deployed ? '✅' : '⏳'}</span>
                        <span class="stat-label">Deployed</span>
                    </div>
                </div>
                
                <div class="project-actions">
                    <button class="project-btn primary" onclick="startProject('${project.id}')">
                        ${project.status === 'not-started' ? '🚀 Start' : '📝 Continue'}
                    </button>
                    ${project.demoUrl ? 
                        `<button class="project-btn secondary" onclick="window.open('${project.demoUrl}')">👀 View Demo</button>` :
                        `<button class="project-btn secondary" disabled>👀 Demo Soon</button>`
                    }
                </div>
            </div>
        `;
    }

    getStatusColor(status) {
        const colors = {
            'not-started': '#6b7280',
            'in-progress': '#f59e0b',
            'completed': '#10b981'
        };
        return colors[status] || '#6b7280';
    }

    formatStatus(status) {
        const statusMap = {
            'not-started': 'Not Started',
            'in-progress': 'In Progress',
            'completed': 'Completed'
        };
        return statusMap[status] || status;
    }

    calculatePortfolioStats() {
        const completedProjects = Object.values(this.projects).filter(p => p.status === 'completed').length;
        const totalLines = Object.values(this.projects).reduce((sum, p) => sum + p.linesOfCode, 0);
        const portfolioScore = Math.round((completedProjects / Object.keys(this.projects).length) * 100);
        
        this.portfolioStats = {
            projectsCompleted: completedProjects,
            totalLinesOfCode: totalLines,
            portfolioScore: portfolioScore
        };
        
        this.updatePortfolioDisplay();
    }

    updatePortfolioDisplay() {
        const stats = this.portfolioStats;
        
        // Update header stats
        this.updateElement('projectsCompleted', stats.projectsCompleted);
        this.updateElement('linesOfCode', stats.totalLinesOfCode.toLocaleString());
        this.updateElement('portfolioScore', `${stats.portfolioScore}%`);
        
        console.log(`📊 Portfolio stats updated: ${stats.projectsCompleted} projects, ${stats.totalLinesOfCode} lines, ${stats.portfolioScore}% complete`);
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    highlightProject(projectType) {
        // Add visual highlight effect
        document.querySelectorAll('.project-preview').forEach(preview => {
            preview.classList.remove('highlighted');
        });
        
        const targetPreview = document.querySelector(`[data-project="${projectType}"]`);
        if (targetPreview) {
            targetPreview.classList.add('highlighted');
            this.createHighlightEffect(targetPreview);
        }
    }

    createHighlightEffect(element) {
        const rect = element.getBoundingClientRect();
        const highlight = document.createElement('div');
        
        highlight.style.cssText = `
            position: fixed;
            left: ${rect.left - 10}px;
            top: ${rect.top - 10}px;
            width: ${rect.width + 20}px;
            height: ${rect.height + 20}px;
            border: 3px solid var(--accent-primary);
            border-radius: 20px;
            pointer-events: none;
            z-index: 1000;
            animation: highlightPulse 2s ease-out;
        `;
        
        document.body.appendChild(highlight);
        
        setTimeout(() => {
            highlight.remove();
        }, 2000);
        
        // Add highlight animation
        if (!document.getElementById('highlight-pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'highlight-pulse-animation';
            style.textContent = `
                @keyframes highlightPulse {
                    0% { opacity: 0; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.05); }
                    100% { opacity: 0; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addProjectHoverEffect(element) {
        element.style.transform = 'translateY(-8px) scale(1.02)';
        element.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    removeProjectHoverEffect(element) {
        element.style.transform = '';
        element.style.boxShadow = '';
    }

    // ===== VISUALIZER PROJECT =====
    
    startProject(projectId) {
        console.log(`🚀 Starting project: ${projectId}`);
        
        const project = this.projects[projectId];
        if (!project) return;
        
        // Update project status
        if (project.status === 'not-started') {
            project.status = 'in-progress';
        }
        
        // Scroll to project section
        const section = document.querySelector(`h3:contains("${project.title}")`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Show success message
        this.showProjectStartMessage(project);
        
        // Update displays
        this.updateProjectGrid();
        this.calculatePortfolioStats();
    }

    showProjectStartMessage(project) {
        const message = document.createElement('div');
        message.className = 'project-start-message';
        message.innerHTML = `
            <div class="message-content">
                <div class="message-icon">${project.icon}</div>
                <div class="message-text">
                    <h4>🚀 Project Started!</h4>
                    <p>Ready to build your ${project.title}? Follow the step-by-step guide below.</p>
                </div>
                <button class="message-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, var(--success-color), #059669);
            color: white;
            border-radius: 12px;
            padding: 0;
            z-index: 10000;
            animation: messageSlideIn 0.5s ease-out;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 5000);
        
        // Add slide-in animation
        if (!document.getElementById('message-slide-animation')) {
            const style = document.createElement('style');
            style.id = 'message-slide-animation';
            style.textContent = `
                @keyframes messageSlideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                .message-content {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.5rem;
                }
                
                .message-icon {
                    font-size: 2rem;
                }
                
                .message-text h4 {
                    margin: 0 0 0.25rem 0;
                    font-size: 1rem;
                }
                
                .message-text p {
                    margin: 0;
                    font-size: 0.9rem;
                    opacity: 0.9;
                }
                
                .message-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                }
                
                .message-close:hover {
                    background: rgba(255,255,255,0.2);
                }
            `;
            document.head.appendChild(style);
        }
    }

    toggleStep(stepId) {
        const stepElement = document.querySelector(`[data-step="${stepId}"]`);
        const contentElement = stepElement?.querySelector('.step-content');
        
        if (!stepElement || !contentElement) return;
        
        const isExpanded = contentElement.style.display !== 'none';
        
        if (isExpanded) {
            contentElement.style.display = 'none';
        } else {
            contentElement.style.display = 'block';
            contentElement.style.animation = 'stepExpand 0.3s ease-out';
        }
        
        // Add expand animation
        if (!document.getElementById('step-expand-animation')) {
            const style = document.createElement('style');
            style.id = 'step-expand-animation';
            style.textContent = `
                @keyframes stepExpand {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    completeStep(stepId) {
        console.log(`✅ Completing step: ${stepId}`);
        
        // Find which project this step belongs to
        const visualizerProject = this.projects.visualizer;
        const step = visualizerProject.steps.find(s => s.id === stepId);
        
        if (step) {
            step.completed = true;
            
            // Update step UI
            const stepElement = document.querySelector(`[data-step="${stepId}"]`);
            const statusElement = stepElement?.querySelector('.step-status');
            if (statusElement) {
                statusElement.textContent = '✅ Complete';
                statusElement.style.color = 'var(--success-color)';
            }
            
            // Update project progress
            const completedSteps = visualizerProject.steps.filter(s => s.completed).length;
            visualizerProject.progress = (completedSteps / visualizerProject.steps.length) * 100;
            
            if (completedSteps === visualizerProject.steps.length) {
                visualizerProject.status = 'completed';
            }
            
            // Add lines of code (simulated)
            visualizerProject.linesOfCode += Math.floor(Math.random() * 50) + 25;
            
            // Show completion effect
            this.showStepCompletionEffect(stepElement);
            
            // Update displays
            this.updateProjectGrid();
            this.calculatePortfolioStats();
        }
    }

    showStepCompletionEffect(stepElement) {
        if (!stepElement) return;
        
        // Create celebration particles
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createCelebrationParticle(stepElement);
            }, i * 100);
        }
        
        // Add step glow effect
        stepElement.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.5)';
        setTimeout(() => {
            stepElement.style.boxShadow = '';
        }, 2000);
    }

    createCelebrationParticle(element) {
        const rect = element.getBoundingClientRect();
        const particle = document.createElement('div');
        
        particle.innerHTML = ['🎉', '✨', '🎊', '⭐'][Math.floor(Math.random() * 4)];
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 10000;
            animation: celebrationBurst 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
        
        // Add burst animation
        if (!document.getElementById('celebration-burst-animation')) {
            const style = document.createElement('style');
            style.id = 'celebration-burst-animation';
            style.textContent = `
                @keyframes celebrationBurst {
                    0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 1; }
                    50% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1) rotate(180deg); opacity: 1; }
                    100% { transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 300 - 150}px) scale(0) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== VISUALIZER DEMO SYSTEM =====
    
    initializeCanvas() {
        const canvas = document.getElementById('visualizerCanvas');
        if (!canvas) return;
        
        this.setupVisualizerCanvas(canvas);
    }

    setupVisualizerCanvas(canvas) {
        this.visualizerDemo.canvas = canvas;
        this.visualizerDemo.ctx = canvas.getContext('2d');
        
        // Generate initial array
        this.generateDemoArray();
        this.drawDemoArray();
        
        console.log('🎨 Visualizer canvas initialized');
    }

    generateDemoArray() {
        this.visualizerDemo.array = [];
        for (let i = 0; i < 20; i++) {
            this.visualizerDemo.array.push(Math.floor(Math.random() * 150) + 10);
        }
        this.visualizerDemo.comparisons = 0;
        this.visualizerDemo.swaps = 0;
    }

    drawDemoArray(highlightIndices = [], highlightColor = '#3b82f6') {
        const { canvas, ctx, array } = this.visualizerDemo;
        if (!canvas || !ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = canvas.width / array.length;
        const maxHeight = Math.max(...array);
        
        array.forEach((value, index) => {
            const barHeight = (value / maxHeight) * (canvas.height - 20);
            const x = index * barWidth;
            const y = canvas.height - barHeight;
            
            // Choose color
            if (highlightIndices.includes(index)) {
                ctx.fillStyle = highlightColor;
            } else {
                ctx.fillStyle = '#e5e7eb';
            }
            
            // Draw bar
            ctx.fillRect(x, y, barWidth - 2, barHeight);
            
            // Draw value text
            ctx.fillStyle = '#374151';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value, x + barWidth/2, y - 5);
        });
    }

    startVisualizerDemo() {
        if (this.visualizerDemo.isAnimating) return;
        
        console.log('🎬 Starting visualizer demo');
        
        this.generateDemoArray();
        this.visualizerDemo.isAnimating = true;
        this.visualizerDemo.startTime = Date.now();
        
        // Update button
        const button = document.querySelector('.preview-btn');
        if (button) {
            button.textContent = '⏸ Running...';
            button.disabled = true;
        }
        
        // Start bubble sort animation
        this.animateBubbleSort();
    }

    async animateBubbleSort() {
        const array = [...this.visualizerDemo.array];
        const n = array.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Highlight comparison
                this.visualizerDemo.comparisons++;
                this.updateDemoStats();
                
                this.visualizerDemo.array = [...array];
                this.drawDemoArray([j, j + 1], '#ff6b6b');
                
                await this.sleep(200);
                
                if (array[j] > array[j + 1]) {
                    // Swap
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    this.visualizerDemo.swaps++;
                    this.updateDemoStats();
                    
                    // Highlight swap
                    this.visualizerDemo.array = [...array];
                    this.drawDemoArray([j, j + 1], '#10b981');
                    
                    await this.sleep(200);
                }
            }
        }
        
        // Final highlight - sorted
        this.visualizerDemo.array = [...array];
        this.drawDemoArray(array.map((_, i) => i), '#10b981');
        
        // Reset demo
        this.visualizerDemo.isAnimating = false;
        const button = document.querySelector('.preview-btn');
        if (button) {
            button.textContent = '▶ Demo';
            button.disabled = false;
        }
        
        console.log('✅ Visualizer demo completed');
    }

    updateDemoStats() {
        const { comparisons, swaps, startTime } = this.visualizerDemo;
        const elapsed = Date.now() - startTime;
        
        this.updateElement('comparisons', comparisons);
        this.updateElement('swaps', swaps);
        this.updateElement('time', `${elapsed}ms`);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ===== FULL-STACK PROJECT SYSTEM =====
    
    selectFullStackProject(type) {
        console.log(`🌐 Selected full-stack project: ${type}`);
        
        // Update project selection
        this.projects.fullstack.selectedType = type;
        
        // Update UI
        document.querySelectorAll('.project-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        const selectedOption = document.querySelector('.project-option[onclick*="' + type + '"]');
        if (selectedOption) {
            selectedOption.classList.add('selected');
            this.triggerSelectionEffect(selectedOption);
        }
        
        // Show project details
        this.showFullStackProjectDetails(type);
    }

    showFullStackProjectDetails(type) {
        const projectDetails = {
            todo: {
                title: "Smart Todo App",
                description: "A task management application with AI-powered categorization, priority sorting, and comprehensive analytics dashboard.",
                features: [
                    "🤖 AI-powered task categorization",
                    "📊 Productivity analytics dashboard", 
                    "🔔 Smart notifications and reminders",
                    "👥 Team collaboration features",
                    "📱 Progressive Web App (PWA)"
                ],
                techStack: "React, Node.js, MongoDB, OpenAI API"
            },
            expense: {
                title: "Expense Tracker Pro",
                description: "Personal finance application with budget tracking, spending insights, and beautiful data visualizations.",
                features: [
                    "💳 Bank account integration",
                    "📈 Advanced spending analytics",
                    "🎯 Budget goals and alerts",
                    "📊 Interactive charts and reports",
                    "💾 Data export capabilities"
                ],
                techStack: "Vue.js, Express, PostgreSQL, Chart.js"
            },
            social: {
                title: "Developer Network",
                description: "Social platform for developers to share projects, get feedback, and collaborate on open-source initiatives.",
                features: [
                    "👥 Developer profiles and portfolios",
                    "🚀 Project showcase with live demos",
                    "💬 Code review and feedback system",
                    "🏆 Achievement and skill endorsements",
                    "🔍 Advanced developer search"
                ],
                techStack: "React, GraphQL, Firebase, GitHub API"
            },
            learning: {
                title: "Learning Platform",
                description: "Complete course management system with video streaming, progress tracking, and automated certificates.",
                features: [
                    "🎥 Video streaming with quality control",
                    "📚 Interactive course builder",
                    "📊 Student progress analytics",
                    "🎓 Automated certificate generation",
                    "💬 Discussion forums and Q&A"
                ],
                techStack: "Angular, Django, AWS, Redis"
            }
        };
        
        const details = projectDetails[type];
        if (!details) return;
        
        // Create details modal
        this.showProjectDetailsModal(details);
    }

    showProjectDetailsModal(details) {
        const modal = document.createElement('div');
        modal.className = 'project-details-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${details.title}</h3>
                    <button class="modal-close" onclick="this.closest('.project-details-modal').remove()">×</button>
                </div>
                
                <div class="modal-body">
                    <p class="project-description">${details.description}</p>
                    
                    <div class="project-features">
                        <h4>🎯 Key Features:</h4>
                        <ul>
                            ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="tech-stack-info">
                        <h4>⚡ Technology Stack:</h4>
                        <p>${details.techStack}</p>
                    </div>
                    
                    <div class="estimated-timeline">
                        <h4>⏱️ Estimated Timeline:</h4>
                        <p>6-8 weeks for full implementation and deployment</p>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="modal-btn primary" onclick="portfolioEngine.startFullStackProject(); this.closest('.project-details-modal').remove();">
                        🚀 Start Building
                    </button>
                    <button class="modal-btn secondary" onclick="this.closest('.project-details-modal').remove();">
                        📋 Choose Different Project
                    </button>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: modalFadeIn 0.3s ease-out;
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles if not exists
        if (!document.getElementById('project-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'project-modal-styles';
            style.textContent = `
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                }
                
                .modal-content {
                    background: var(--bg-primary);
                    border-radius: 16px;
                    max-width: 600px;
                    max-height: 80vh;
                    overflow-y: auto;
                    position: relative;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                    border: 1px solid var(--border-color);
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2rem;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .modal-header h3 {
                    color: var(--text-primary);
                    margin: 0;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .modal-close:hover {
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                }
                
                .modal-body {
                    padding: 2rem;
                }
                
                .project-description {
                    color: var(--text-primary);
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                
                .project-features, .tech-stack-info, .estimated-timeline {
                    margin-bottom: 1.5rem;
                }
                
                .project-features h4, .tech-stack-info h4, .estimated-timeline h4 {
                    color: var(--text-primary);
                    margin-bottom: 0.75rem;
                }
                
                .project-features ul {
                    color: var(--text-primary);
                    line-height: 1.8;
                }
                
                .tech-stack-info p, .estimated-timeline p {
                    color: var(--text-primary);
                    background: var(--bg-secondary);
                    padding: 1rem;
                    border-radius: 8px;
                    border-left: 3px solid var(--accent-primary);
                }
                
                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    padding: 2rem;
                    border-top: 1px solid var(--border-color);
                    justify-content: center;
                }
                
                .modal-btn {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                .modal-btn.primary {
                    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
                    color: white;
                }
                
                .modal-btn.secondary {
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                }
                
                .modal-btn:hover {
                    transform: translateY(-2px);
                }
            `;
            document.head.appendChild(style);
        }
    }

    triggerSelectionEffect(element) {
        element.style.transform = 'scale(1.03)';
        element.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
        element.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.boxShadow = '';
        }, 500);
    }

    startFullStackProject() {
        if (!this.projects.fullstack.selectedType) {
            alert('⚠️ Please select a project type first!');
            return;
        }
        
        console.log(`🏗️ Starting full-stack project: ${this.projects.fullstack.selectedType}`);
        
        const project = this.projects.fullstack;
        project.status = 'in-progress';
        
        // Show project roadmap
        this.showFullStackRoadmap();
        
        // Update displays
        this.updateProjectGrid();
        this.calculatePortfolioStats();
    }

    showFullStackRoadmap() {
        alert(`🗺️ Full-Stack Development Roadmap Activated!

Your ${this.projects.fullstack.selectedType} project roadmap:

📋 Phase 1: Planning & Design (Week 1)
• User research and requirements gathering
• Database schema design  
• API endpoint planning
• UI/UX wireframes and mockups

🔧 Phase 2: Backend Development (Week 2-3) 
• Set up server and database
• Implement authentication system
• Create RESTful API endpoints
• Write comprehensive tests

🎨 Phase 3: Frontend Development (Week 4-5)
• Build responsive user interface
• Implement state management
• Connect to backend APIs
• Add animations and polish

🚀 Phase 4: Deployment & Polish (Week 6)
• Set up CI/CD pipeline
• Deploy to cloud platform
• Performance optimization
• Documentation and demo

Ready to build something amazing? This would open a comprehensive project workspace with templates, tutorials, and progress tracking!`);
    }

    viewFullStackTemplates() {
        alert(`📋 Full-Stack Project Templates

Access professional project templates:

🚀 Quick Start Templates:
• Complete project scaffolding
• Pre-configured development environment
• Database migrations and seeders
• Authentication system setup

📚 Learning Resources:
• Step-by-step tutorials
• Best practices guides
• Code review checklist
• Deployment guides

🛠️ Development Tools:
• Project planning templates
• API documentation generator
• Testing framework setup
• CI/CD pipeline configuration

This would provide everything needed to build production-ready applications!`);
    }

    // ===== GAME DEVELOPMENT SYSTEM =====
    
    switchTab(tabName) {
        console.log(`🎮 Switching to tab: ${tabName}`);
        
        this.activeTab = tabName;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`.tab-btn[onclick*="${tabName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        const activeContent = document.getElementById(tabName);
        if (activeContent) {
            activeContent.style.display = 'block';
            activeContent.style.animation = 'tabFadeIn 0.3s ease-out';
        }
        
        // Add tab animation
        if (!document.getElementById('tab-fade-animation')) {
            const style = document.createElement('style');
            style.id = 'tab-fade-animation';
            style.textContent = `
                @keyframes tabFadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    startCodingGame() {
        console.log('🎮 Starting coding game development');
        
        const project = this.projects.game;
        project.status = 'in-progress';
        
        alert(`🎮 Coding Game Development Started!

Your game development journey begins:

🎯 Game Design Phase:
• Choose your core mechanic
• Design player progression system
• Create engaging challenges
• Plan educational content integration

🎨 Development Phase:
• HTML5 Canvas or WebGL setup
• Game loop and state management
• Interactive elements and animations
• Sound effects and music

🚀 Polish Phase:
• Performance optimization
• Mobile responsiveness
• Achievement system
• Social sharing features

This would open a complete game development environment with:
• Visual scripting tools
• Sprite editors
• Sound effect library
• Deployment pipeline

Ready to create the next great coding education game?`);
        
        // Update displays
        this.updateProjectGrid();
        this.calculatePortfolioStats();
    }

    playGameExamples() {
        alert(`🕹️ Interactive Game Examples

Play these example coding games:

🏰 Algorithm Castle:
• Tower defense with sorting algorithms
• Different algorithms = different tower types
• Waves of "bugs" to defeat with efficient code

🧩 Code Puzzle Quest:
• RPG-style adventure game
• Solve coding challenges to progress
• Unlock new areas and abilities

🏃 Data Structure Runner:
• Endless runner with obstacles
• Use different data structures to navigate
• Collect performance bonuses

🎯 Complexity Challenge:
• Competitive multiplayer coding
• Optimize algorithms for speed
• Real-time leaderboards

This would launch a gallery of playable educational games that demonstrate different approaches to teaching programming through gameplay!`);
    }

    // ===== LIBRARY PROJECT SYSTEM =====
    
    startLibraryProject() {
        console.log('📚 Starting data structure library project');
        
        const project = this.projects.library;
        project.status = 'in-progress';
        
        alert(`📚 Data Structure Library Development Started!

Build a professional-grade library:

🏗️ Implementation Phase:
• Generic/template implementations
• Memory-efficient algorithms
• Thread-safe operations
• Iterator support

🧪 Testing Phase:
• Comprehensive unit tests (95%+ coverage)
• Performance benchmarks
• Edge case validation
• Memory leak detection

📖 Documentation Phase:
• API documentation with examples
• Performance characteristics
• Usage guides and tutorials
• Contributing guidelines

📦 Distribution Phase:
• Package manager integration
• Multiple language bindings
• Interactive demo website
• Community support setup

This would provide:
• Professional development environment
• Automated testing framework
• Documentation generator
• Publishing pipeline

Ready to build a library that other developers will love to use?`);
        
        // Update displays
        this.updateProjectGrid();
        this.calculatePortfolioStats();
    }

    viewLibraryExamples() {
        alert(`📖 Data Structure Library Examples

Explore professional library implementations:

🌟 Featured Libraries:
• DataStructures.js - Complete JavaScript implementation
• PyStructures - Python library with C extensions
• SwiftCollections - Apple's Swift implementation
• Rust Collections - Memory-safe implementations

📚 Documentation Examples:
• API reference with interactive examples
• Performance comparison charts
• Architecture decision records
• Contributing guidelines

🔧 Development Tools:
• Automated testing frameworks
• Continuous integration setup
• Performance profiling tools
• Documentation generators

🎯 Best Practices:
• Memory management strategies
• Thread safety considerations
• API design principles
• Optimization techniques

This would showcase industry-standard examples and provide templates for building your own professional library!`);
    }

    viewVisualizerExamples() {
        alert(`👀 Algorithm Visualizer Gallery

Explore inspiring visualizer examples:

🎨 Sorting Visualizers:
• Bubble Sort with sound effects
• Quick Sort with partition highlighting
• Merge Sort with merge visualization
• Heap Sort with tree representation

🌊 Graph Algorithms:
• Dijkstra's shortest path
• Breadth-first search visualization
• Depth-first search with backtracking
• A* pathfinding with heuristics

🧮 Data Structures:
• Binary tree insertions/deletions
• Hash table collision resolution
• Stack and queue operations
• Priority queue management

✨ Advanced Features:
• Speed controls and step-through
• Algorithm comparison mode
• Custom input data
• Performance metrics

This would open a gallery of interactive examples that demonstrate different visualization approaches and inspire your own implementation!`);
    }

    viewDocumentation() {
        alert(`📖 Professional Documentation Examples

Learn from the best documentation:

📚 Library Documentation:
• React.js - Component API reference
• D3.js - Data visualization library
• Lodash - Utility function library
• Express.js - Web framework docs

🎯 Key Documentation Elements:
• Getting started guides
• API reference with examples
• Tutorials and cookbooks
• Architecture decisions
• Contributing guidelines

🔧 Documentation Tools:
• JSDoc for JavaScript
• Sphinx for Python
• GitBook for online docs
• Storybook for component docs

✨ Best Practices:
• Write for your users, not yourself
• Include runnable code examples
• Maintain consistency in style
• Keep docs updated with code
• Provide migration guides

This would showcase excellent documentation examples and provide templates for documenting your own projects professionally!`);
    }

    // ===== CERTIFICATION SYSTEM =====
    
    updateCertificationRequirement(requirementId, isChecked) {
        console.log(`📋 Updating certification requirement: ${requirementId} = ${isChecked}`);
        
        // Parse requirement ID to get project and requirement
        const parts = requirementId.split('-');
        const projectType = parts[0]; // vis, fs, game, lib
        const requirement = parts[1]; // interactive, algorithms, etc.
        
        // Map project abbreviations to full names
        const projectMap = {
            vis: 'visualizer',
            fs: 'fullstack', 
            game: 'game',
            lib: 'library'
        };
        
        const project = projectMap[projectType];
        if (project && this.certificationRequirements[project]) {
            this.certificationRequirements[project][requirement] = isChecked;
        }
        
        // Update requirement count display
        this.updateRequirementCount(project);
        
        // Check if certification is ready
        this.checkCertificationReadiness();
    }

    updateRequirementCount(project) {
        const requirements = this.certificationRequirements[project];
        if (!requirements) return;
        
        const completed = Object.values(requirements).filter(Boolean).length;
        const total = Object.keys(requirements).length;
        
        // Find and update the status display
        const statusElement = document.querySelector(`.requirement-card:has([id^="${project}"]) .req-status`);
        if (statusElement) {
            statusElement.textContent = `${completed}/${total} Complete`;
            
            if (completed === total) {
                statusElement.style.color = 'var(--success-color)';
                statusElement.style.fontWeight = 'bold';
            }
        }
    }

    checkCertificationReadiness() {
        const allProjects = Object.values(this.certificationRequirements);
        const isReady = allProjects.every(project => 
            Object.values(project).every(Boolean)
        );
        
        // Update certification buttons
        const certBtn = document.querySelector('[onclick="requestCertification()"]');
        const downloadBtn = document.querySelector('[onclick="downloadCertificate()"]');
        
        if (certBtn) {
            certBtn.disabled = !isReady;
            if (isReady) {
                certBtn.style.opacity = '1';
                certBtn.style.cursor = 'pointer';
            } else {
                certBtn.style.opacity = '0.5';
                certBtn.style.cursor = 'not-allowed';
            }
        }
        
        if (downloadBtn) {
            downloadBtn.disabled = !isReady;
        }
        
        console.log(`🎓 Certification ready: ${isReady}`);
    }

    generatePortfolioSite() {
        console.log('🎨 Generating portfolio website');
        
        alert(`🎨 Portfolio Website Generator

Creating your professional portfolio:

🌟 Generated Features:
• Responsive design optimized for all devices
• Project showcase with live demos
• Interactive resume and skills section
• Contact form with backend integration
• SEO optimization and analytics

📊 Project Integration:
• Algorithm visualizer embedded demo
• Full-stack application case study
• Game development process showcase
• Library documentation integration

🚀 Deployment Options:
• GitHub Pages (free)
• Netlify with custom domain
• Vercel with serverless functions
• AWS S3 with CloudFront

✨ Professional Features:
• Custom domain setup
• SSL certificate installation
• Performance optimization
• Search engine optimization
• Social media integration

Your portfolio would be automatically generated using your completed projects, with professional templates and deployment pipeline included!`);
        
        // Simulate portfolio generation
        this.simulatePortfolioGeneration();
    }

    simulatePortfolioGeneration() {
        const steps = [
            'Analyzing completed projects...',
            'Generating responsive layout...',
            'Creating project showcases...',
            'Optimizing images and assets...',
            'Building deployment package...',
            'Portfolio website ready!'
        ];
        
        let currentStep = 0;
        const progressInterval = setInterval(() => {
            console.log(`📊 ${steps[currentStep]}`);
            currentStep++;
            
            if (currentStep >= steps.length) {
                clearInterval(progressInterval);
                this.showPortfolioGenerationComplete();
            }
        }, 800);
    }

    showPortfolioGenerationComplete() {
        const notification = document.createElement('div');
        notification.className = 'portfolio-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🎉</div>
                <div class="notification-text">
                    <h4>Portfolio Website Generated!</h4>
                    <p>Your professional portfolio is ready to deploy</p>
                </div>
                <div class="notification-actions">
                    <button class="notif-btn primary">🚀 Deploy Now</button>
                    <button class="notif-btn secondary" onclick="this.closest('.portfolio-notification').remove()">📋 Customize</button>
                </div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border-radius: 16px;
            padding: 0;
            z-index: 10000;
            animation: notificationSlideUp 0.5s ease-out;
            box-shadow: 0 12px 35px rgba(16, 185, 129, 0.3);
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
        
        // Add notification styles
        if (!document.getElementById('portfolio-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'portfolio-notification-styles';
            style.textContent = `
                @keyframes notificationSlideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .notification-content {
                    padding: 1.5rem;
                }
                
                .notification-icon {
                    font-size: 2rem;
                    text-align: center;
                    margin-bottom: 0.5rem;
                }
                
                .notification-text {
                    text-align: center;
                    margin-bottom: 1rem;
                }
                
                .notification-text h4 {
                    margin: 0 0 0.25rem 0;
                    font-size: 1.1rem;
                }
                
                .notification-text p {
                    margin: 0;
                    font-size: 0.9rem;
                    opacity: 0.9;
                }
                
                .notification-actions {
                    display: flex;
                    gap: 0.75rem;
                    justify-content: center;
                }
                
                .notif-btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }
                
                .notif-btn.primary {
                    background: white;
                    color: #10b981;
                }
                
                .notif-btn.secondary {
                    background: rgba(255,255,255,0.2);
                    color: white;
                    border: 1px solid rgba(255,255,255,0.3);
                }
                
                .notif-btn:hover {
                    transform: translateY(-1px);
                }
            `;
            document.head.appendChild(style);
        }
    }

    requestCertification() {
        const isReady = Object.values(this.certificationRequirements).every(project => 
            Object.values(project).every(Boolean)
        );
        
        if (!isReady) {
            alert('⚠️ Please complete all certification requirements first!');
            return;
        }
        
        console.log('🎓 Requesting final certification');
        
        // Create certification ceremony
        this.showCertificationCeremony();
    }

    showCertificationCeremony() {
        const ceremony = document.createElement('div');
        ceremony.className = 'certification-ceremony';
        ceremony.innerHTML = `
            <div class="ceremony-overlay"></div>
            <div class="ceremony-content">
                <div class="ceremony-fireworks">🎆🎇✨🎊🎉</div>
                <div class="ceremony-certificate">
                    <div class="cert-header">
                        <h2>🏆 Congratulations!</h2>
                        <h3>Algorithm & Data Structures Mastery</h3>
                    </div>
                    
                    <div class="cert-body">
                        <p>This certifies that <strong>[Your Name]</strong> has successfully completed the comprehensive CodeMaster Academy program and demonstrated mastery in:</p>
                        
                        <div class="achievements-grid">
                            <div class="achievement">✅ Interactive Algorithm Visualization</div>
                            <div class="achievement">✅ Full-Stack Web Development</div>
                            <div class="achievement">✅ Educational Game Design</div>
                            <div class="achievement">✅ Professional Library Development</div>
                        </div>
                        
                        <div class="cert-signature">
                            <p>Issued by CodeMaster Academy</p>
                            <p class="cert-date">${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div class="ceremony-actions">
                        <button class="ceremony-btn primary" onclick="portfolioEngine.downloadCertificate()">
                            📜 Download Certificate
                        </button>
                        <button class="ceremony-btn secondary" onclick="portfolioEngine.shareCertificate()">
                            🌟 Share Achievement
                        </button>
                        <button class="ceremony-btn" onclick="this.closest('.certification-ceremony').remove()">
                            🎉 Celebrate!
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        ceremony.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: ceremonyFadeIn 1s ease-out;
        `;
        
        document.body.appendChild(ceremony);
        
        // Add ceremony styles
        if (!document.getElementById('ceremony-styles')) {
            const style = document.createElement('style');
            style.id = 'ceremony-styles';
            style.textContent = `
                @keyframes ceremonyFadeIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                .ceremony-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(139, 92, 246, 0.9));
                }
                
                .ceremony-content {
                    position: relative;
                    text-align: center;
                    max-width: 600px;
                    margin: 2rem;
                }
                
                .ceremony-fireworks {
                    font-size: 3rem;
                    margin-bottom: 2rem;
                    animation: fireworksFloat 2s ease-in-out infinite;
                }
                
                @keyframes fireworksFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                .ceremony-certificate {
                    background: white;
                    border-radius: 16px;
                    padding: 3rem;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                    border: 8px solid #f59e0b;
                }
                
                .cert-header h2 {
                    color: #92400e;
                    margin-bottom: 0.5rem;
                    font-size: 2rem;
                }
                
                .cert-header h3 {
                    color: #b45309;
                    margin-bottom: 2rem;
                    font-size: 1.3rem;
                }
                
                .cert-body p {
                    color: #374151;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                
                .achievements-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 2rem 0;
                }
                
                .achievement {
                    background: #f0fdf4;
                    color: #15803d;
                    padding: 0.75rem;
                    border-radius: 8px;
                    font-weight: 600;
                    border: 1px solid #bbf7d0;
                }
                
                .cert-signature {
                    border-top: 2px solid #f59e0b;
                    padding-top: 1rem;
                    margin-top: 2rem;
                    color: #6b7280;
                }
                
                .cert-date {
                    font-family: 'Monaco', 'Consolas', monospace;
                }
                
                .ceremony-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 2rem;
                    flex-wrap: wrap;
                }
                
                .ceremony-btn {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                .ceremony-btn.primary {
                    background: #f59e0b;
                    color: white;
                }
                
                .ceremony-btn.secondary {
                    background: #3b82f6;
                    color: white;
                }
                
                .ceremony-btn {
                    background: #10b981;
                    color: white;
                }
                
                .ceremony-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }
            `;
            document.head.appendChild(style);
        }
        
        // Start celebration effects
        this.startCelebrationEffects();
    }

    startCelebrationEffects() {
        // Create floating celebration particles
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createCelebrationEffect();
            }, i * 200);
        }
    }

    createCelebrationEffect() {
        const effects = ['🎉', '🎊', '⭐', '✨', '🏆', '🎈', '🎆', '🎇'];
        const effect = document.createElement('div');
        
        effect.innerHTML = effects[Math.floor(Math.random() * effects.length)];
        effect.style.cssText = `
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 10001;
            animation: celebrationFloat 4s ease-out forwards;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
        `;
        
        document.body.appendChild(effect);
        
        // Add celebration animation
        if (!document.getElementById('celebration-float-animation')) {
            const style = document.createElement('style');
            style.id = 'celebration-float-animation';
            style.textContent = `
                @keyframes celebrationFloat {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateY(-${window.innerHeight + 200}px) rotate(720deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            effect.remove();
        }, 4000);
    }

    downloadCertificate() {
        console.log('📜 Downloading certificate');
        
        alert(`📜 Certificate Download

Your official CodeMaster Academy certificate is being prepared:

🎓 Certificate Details:
• Algorithm & Data Structures Mastery
• Professional Developer Certification
• Verifiable digital credential
• LinkedIn-ready badge

📋 Included Documentation:
• Detailed skill assessment
• Project portfolio summary
• Performance analytics
• Recommendation letter template

🌟 Sharing Options:
• High-resolution PDF download
• LinkedIn credential integration
• Social media sharing graphics
• Professional reference format

This would generate a beautiful, professional certificate that you can add to your resume and share with potential employers!`);
    }

    shareCertificate() {
        console.log('🌟 Sharing certificate achievement');
        
        alert(`🌟 Share Your Achievement

Congratulations! Share your success:

📱 Social Media:
• LinkedIn professional update
• Twitter achievement post
• Facebook celebration
• Instagram story template

💼 Professional Networks:
• GitHub profile badge
• Stack Overflow developer story
• AngelList profile update
• Personal website integration

📧 Direct Sharing:
• Email signature badge
• Resume credential
• Portfolio showcase
• Reference letters

🎯 Career Benefits:
• Demonstrate continuous learning
• Showcase practical skills
• Stand out to employers
• Build professional credibility

Your achievement deserves recognition - share it with the world!`);
    }

    // ===== NAVIGATION & COMPLETION =====
    
    previousLesson() {
        window.location.href = 'mock-interview-simulator.html';
    }

    celebrateCompletion() {
        console.log('🎉 Celebrating Phase 5 completion!');
        
        // Create the ultimate celebration
        this.createUltimateCelebration();
    }

    createUltimateCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'ultimate-celebration';
        celebration.innerHTML = `
            <div class="celebration-screen">
                <div class="celebration-bg"></div>
                <div class="celebration-content">
                    <div class="celebration-title">
                        <h1>🎉 CONGRATULATIONS! 🎉</h1>
                        <h2>You've Completed CodeMaster Academy!</h2>
                    </div>
                    
                    <div class="journey-summary">
                        <h3>🏆 Your Epic Journey:</h3>
                        <div class="phase-completed">
                            <div class="phase">✅ Phase 1: Python Fundamentals</div>
                            <div class="phase">✅ Phase 2: Data Structures</div>
                            <div class="phase">✅ Phase 3: Algorithms Mastery</div>
                            <div class="phase">✅ Phase 4: Advanced Problem Solving</div>
                            <div class="phase">✅ Phase 5: LeetCode Mastery & Portfolio</div>
                        </div>
                    </div>
                    
                    <div class="achievements-showcase">
                        <h3>🌟 What You've Achieved:</h3>
                        <div class="achievement-grid">
                            <div class="major-achievement">🎨 Built Interactive Algorithm Visualizer</div>
                            <div class="major-achievement">🌐 Created Full-Stack Web Application</div>
                            <div class="major-achievement">🎮 Developed Educational Coding Game</div>
                            <div class="major-achievement">📚 Published Professional Library</div>
                            <div class="major-achievement">🎪 Mastered Mock Interviews</div>
                            <div class="major-achievement">📊 Built Comprehensive Portfolio</div>
                        </div>
                    </div>
                    
                    <div class="next-steps">
                        <h3>🚀 You're Now Ready For:</h3>
                        <div class="career-paths">
                            <div class="path">💼 Software Engineer Roles</div>
                            <div class="path">🏢 FAANG Company Interviews</div>
                            <div class="path">🚀 Tech Startup Opportunities</div>
                            <div class="path">👥 Leading Development Teams</div>
                        </div>
                    </div>
                    
                    <div class="celebration-actions">
                        <button class="celebration-btn massive" onclick="this.closest('.ultimate-celebration').remove()">
                            🎊 CLAIM YOUR SUCCESS! 🎊
                        </button>
                    </div>
                </div>
                
                <div class="floating-achievements">
                    <div class="floating-item">🏆</div>
                    <div class="floating-item">⭐</div>
                    <div class="floating-item">🎯</div>
                    <div class="floating-item">💎</div>
                    <div class="floating-item">🚀</div>
                    <div class="floating-item">🌟</div>
                </div>
            </div>
        `;
        
        celebration.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: ultimateFadeIn 2s ease-out;
        `;
        
        document.body.appendChild(celebration);
        
        // Add ultimate celebration styles
        if (!document.getElementById('ultimate-celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'ultimate-celebration-styles';
            style.textContent = `
                @keyframes ultimateFadeIn {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                .celebration-screen {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }
                
                .celebration-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff);
                    background-size: 400% 400%;
                    animation: celebrationGradient 4s ease infinite;
                }
                
                @keyframes celebrationGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .celebration-content {
                    position: relative;
                    z-index: 2;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    text-align: center;
                    overflow-y: auto;
                }
                
                .celebration-title h1 {
                    font-size: 4rem;
                    color: white;
                    text-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    margin-bottom: 0.5rem;
                    animation: titleBounce 2s ease-in-out infinite;
                }
                
                .celebration-title h2 {
                    font-size: 2rem;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    margin-bottom: 3rem;
                }
                
                @keyframes titleBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                .journey-summary, .achievements-showcase, .next-steps {
                    background: rgba(255,255,255,0.95);
                    border-radius: 20px;
                    padding: 2rem;
                    margin: 1rem 0;
                    backdrop-filter: blur(10px);
                    border: 2px solid rgba(255,255,255,0.5);
                    max-width: 800px;
                    width: 100%;
                }
                
                .journey-summary h3, .achievements-showcase h3, .next-steps h3 {
                    color: #374151;
                    margin-bottom: 1.5rem;
                    font-size: 1.5rem;
                }
                
                .phase-completed {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .phase {
                    background: #f0fdf4;
                    color: #15803d;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 600;
                    border: 2px solid #bbf7d0;
                    font-size: 1.1rem;
                }
                
                .achievement-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                }
                
                                .major-achievement {
                    background: linear-gradient(135deg, #fbbf24, #f59e0b);
                    color: white;
                    padding: 1.25rem;
                    border-radius: 12px;
                    font-weight: 600;
                    text-align: center;
                    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
                    animation: achievementGlow 3s ease-in-out infinite;
                }
                
                @keyframes achievementGlow {
                    0%, 100% { box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); }
                    50% { box-shadow: 0 8px 25px rgba(245, 158, 11, 0.6); }
                }
                
                .career-paths {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                }
                
                .path {
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    color: white;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 600;
                    text-align: center;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }
                
                .celebration-btn.massive {
                    background: linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
                    background-size: 300% 300%;
                    animation: massiveGradient 2s ease infinite;
                    color: white;
                    font-size: 1.5rem;
                    padding: 1.5rem 3rem;
                    border: none;
                    border-radius: 16px;
                    cursor: pointer;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-top: 2rem;
                    box-shadow: 0 12px 35px rgba(0,0,0,0.3);
                    transition: all 0.3s ease;
                }
                
                .celebration-btn.massive:hover {
                    transform: translateY(-5px) scale(1.05);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
                }
                
                @keyframes massiveGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .floating-achievements {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }
                
                .floating-item {
                    position: absolute;
                    font-size: 3rem;
                    animation: floatAround 10s ease-in-out infinite;
                    opacity: 0.3;
                }
                
                .floating-item:nth-child(1) {
                    top: 10%;
                    left: 10%;
                    animation-delay: 0s;
                }
                
                .floating-item:nth-child(2) {
                    top: 20%;
                    right: 15%;
                    animation-delay: 1s;
                }
                
                .floating-item:nth-child(3) {
                    bottom: 30%;
                    left: 20%;
                    animation-delay: 2s;
                }
                
                .floating-item:nth-child(4) {
                    bottom: 20%;
                    right: 25%;
                    animation-delay: 3s;
                }
                
                .floating-item:nth-child(5) {
                    top: 50%;
                    left: 5%;
                    animation-delay: 4s;
                }
                
                .floating-item:nth-child(6) {
                    top: 60%;
                    right: 10%;
                    animation-delay: 5s;
                }
                
                @keyframes floatAround {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg) scale(1); 
                        opacity: 0.3; 
                    }
                    25% { 
                        transform: translateY(-20px) rotate(90deg) scale(1.1); 
                        opacity: 0.6; 
                    }
                    50% { 
                        transform: translateY(-40px) rotate(180deg) scale(1.2); 
                        opacity: 0.8; 
                    }
                    75% { 
                        transform: translateY(-20px) rotate(270deg) scale(1.1); 
                        opacity: 0.6; 
                    }
                }
                
                /* Responsive Design for Ultimate Celebration */
                @media (max-width: 768px) {
                    .celebration-title h1 {
                        font-size: 2.5rem;
                    }
                    
                    .celebration-title h2 {
                        font-size: 1.3rem;
                    }
                    
                    .journey-summary, .achievements-showcase, .next-steps {
                        padding: 1.5rem;
                        margin: 0.5rem 0;
                    }
                    
                    .achievement-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .career-paths {
                        grid-template-columns: 1fr;
                    }
                    
                    .celebration-btn.massive {
                        font-size: 1.2rem;
                        padding: 1.25rem 2rem;
                    }
                    
                    .floating-item {
                        font-size: 2rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .celebration-content {
                        padding: 1rem;
                    }
                    
                    .celebration-title h1 {
                        font-size: 2rem;
                    }
                    
                    .celebration-title h2 {
                        font-size: 1.1rem;
                    }
                    
                    .celebration-btn.massive {
                        font-size: 1rem;
                        padding: 1rem 1.5rem;
                        letter-spacing: 1px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Start massive celebration effects
        this.startMassiveCelebrationEffects();
    }

    startMassiveCelebrationEffects() {
        // Create confetti explosion
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                this.createConfettiParticle();
            }, i * 50);
        }
        
        // Create floating success messages
        this.createFloatingSuccessMessages();
        
        // Create achievement fireworks
        setTimeout(() => {
            this.createAchievementFireworks();
        }, 2000);
    }

    createConfettiParticle() {
        const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
        const shapes = ['🎉', '🎊', '⭐', '✨', '🏆', '🎈'];
        
        const particle = document.createElement('div');
        particle.innerHTML = Math.random() < 0.7 ? shapes[Math.floor(Math.random() * shapes.length)] : '●';
        
        if (particle.innerHTML === '●') {
            particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        particle.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * window.innerWidth}px;
            top: -50px;
            pointer-events: none;
            z-index: 10002;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Add confetti animation
        if (!document.getElementById('confetti-fall-animation')) {
            const style = document.createElement('style');
            style.id = 'confetti-fall-animation';
            style.textContent = `
                @keyframes confettiFall {
                    0% { 
                        transform: translateY(0) rotate(0deg); 
                        opacity: 1; 
                    }
                    100% { 
                        transform: translateY(${window.innerHeight + 100}px) rotate(720deg); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    createFloatingSuccessMessages() {
        const messages = [
            '🏆 Algorithm Master!',
            '🚀 Full-Stack Pro!',
            '🎮 Game Developer!',
            '📚 Library Author!',
            '🎪 Interview Ready!',
            '💼 Career Ready!'
        ];
        
        messages.forEach((message, index) => {
            setTimeout(() => {
                const messageEl = document.createElement('div');
                messageEl.textContent = message;
                messageEl.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * (window.innerWidth - 200)}px;
                    top: ${window.innerHeight}px;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: white;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                    pointer-events: none;
                    z-index: 10003;
                    animation: messageRise 4s ease-out forwards;
                `;
                
                document.body.appendChild(messageEl);
                
                setTimeout(() => {
                    messageEl.remove();
                }, 4000);
            }, index * 500);
        });
        
        // Add message rise animation
        if (!document.getElementById('message-rise-animation')) {
            const style = document.createElement('style');
            style.id = 'message-rise-animation';
            style.textContent = `
                @keyframes messageRise {
                    0% { 
                        transform: translateY(0) scale(0); 
                        opacity: 0; 
                    }
                    20% { 
                        transform: translateY(-100px) scale(1); 
                        opacity: 1; 
                    }
                    80% { 
                        transform: translateY(-300px) scale(1); 
                        opacity: 1; 
                    }
                    100% { 
                        transform: translateY(-500px) scale(0); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createAchievementFireworks() {
        // Create multiple firework bursts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createFireworkBurst();
            }, i * 800);
        }
    }

    createFireworkBurst() {
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * (window.innerHeight * 0.7) + window.innerHeight * 0.15;
        
        // Create burst particles
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const velocity = 150 + Math.random() * 100;
            
            const particle = document.createElement('div');
            particle.innerHTML = '✨';
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 10004;
                animation: fireworkParticle 2s ease-out forwards;
                --end-x: ${Math.cos(angle) * velocity}px;
                --end-y: ${Math.sin(angle) * velocity}px;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
        
        // Add firework particle animation
        if (!document.getElementById('firework-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'firework-particle-animation';
            style.textContent = `
                @keyframes fireworkParticle {
                    0% { 
                        transform: translate(0, 0) scale(0); 
                        opacity: 1; 
                    }
                    20% { 
                        transform: translate(calc(var(--end-x) * 0.3), calc(var(--end-y) * 0.3)) scale(1); 
                        opacity: 1; 
                    }
                    100% { 
                        transform: translate(var(--end-x), var(--end-y)) scale(0); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== UTILITY FUNCTIONS =====
    
    saveProgress() {
        // Save portfolio progress to localStorage
        const progressData = {
            projects: this.projects,
            portfolioStats: this.portfolioStats,
            certificationRequirements: this.certificationRequirements,
            timestamp: Date.now()
        };
        
        localStorage.setItem('portfolio-progress', JSON.stringify(progressData));
        console.log('💾 Portfolio progress saved');
    }

    loadProgress() {
        // Load portfolio progress from localStorage
        try {
            const savedData = localStorage.getItem('portfolio-progress');
            if (savedData) {
                const progressData = JSON.parse(savedData);
                
                // Merge saved data with current state
                this.projects = { ...this.projects, ...progressData.projects };
                this.portfolioStats = { ...this.portfolioStats, ...progressData.portfolioStats };
                this.certificationRequirements = { ...this.certificationRequirements, ...progressData.certificationRequirements };
                
                console.log('📊 Portfolio progress loaded');
                this.updateProjectGrid();
                this.updatePortfolioDisplay();
            }
        } catch (error) {
            console.warn('⚠️ Could not load portfolio progress:', error);
        }
    }

    exportPortfolioData() {
        // Export portfolio data for backup or sharing
        const exportData = {
            projects: this.projects,
            portfolioStats: this.portfolioStats,
            certificationRequirements: this.certificationRequirements,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const dataBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('📤 Portfolio data exported');
    }

    // ===== CLEANUP & INITIALIZATION =====
    
    destroy() {
        // Clean up event listeners and effects
        document.removeEventListener('click', this.handleProjectClick);
        document.removeEventListener('change', this.handleCertificationChange);
        
        // Clear any running intervals or timeouts
        if (this.effectsInterval) {
            clearInterval(this.effectsInterval);
        }
        
        // Remove floating elements
        document.querySelectorAll('.floating-code, .project-particle, .portfolio-notification').forEach(el => {
            el.remove();
        });
        
        // Save progress before cleanup
        this.saveProgress();
        
        console.log('🧹 Portfolio Projects Engine cleaned up');
    }

    handleProjectClick(e) {
        // Handle project gallery clicks
        if (e.target.closest('.project-preview')) {
            const projectType = e.target.closest('.project-preview').dataset.project;
            this.highlightProject(projectType);
        }
    }

    handleCertificationChange(e) {
        // Handle certification checkbox changes
        if (e.target.type === 'checkbox' && e.target.id) {
            this.updateCertificationRequirement(e.target.id, e.target.checked);
        }
    }
}

// Initialize the Portfolio Projects Engine
let portfolioEngine;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🏗️ Initializing Portfolio Projects Engine...');
    portfolioEngine = new PortfolioProjectsEngine();
    
    // Load saved progress
    portfolioEngine.loadProgress();
});

// Auto-save progress periodically
setInterval(() => {
    if (portfolioEngine) {
        portfolioEngine.saveProgress();
    }
}, 30000); // Save every 30 seconds

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (portfolioEngine) {
        portfolioEngine.destroy();
    }
});

// Enhanced portfolio utilities
const PortfolioUtils = {
    // Generate project scaffolding
    generateProjectScaffolding: (projectType) => {
        const scaffolds = {
            visualizer: {
                files: ['index.html', 'style.css', 'script.js', 'README.md'],
                structure: 'Algorithm Visualizer Project Structure',
                description: 'Interactive sorting algorithm visualization'
            },
            fullstack: {
                files: ['client/', 'server/', 'database/', 'README.md', 'docker-compose.yml'],
                structure: 'Full-Stack Application Structure',
                description: 'Complete web application with frontend and backend'
            },
            game: {
                files: ['index.html', 'game.js', 'assets/', 'levels/', 'README.md'],
                structure: 'Interactive Game Structure',
                description: 'Educational coding game with progression system'
            },
            library: {
                files: ['src/', 'tests/', 'docs/', 'package.json', 'README.md'],
                structure: 'Professional Library Structure',
                description: 'Data structures and algorithms library'
            }
        };
        
        return scaffolds[projectType] || null;
    },
    
    // Calculate project completion percentage
    calculateCompletionPercentage: (project) => {
        if (!project) return 0;
        
        let totalTasks = 0;
        let completedTasks = 0;
        
        if (project.steps) {
            totalTasks += project.steps.length;
            completedTasks += project.steps.filter(step => step.completed).length;
        }
        
        if (project.phases) {
            totalTasks += project.phases.length;
            completedTasks += project.phases.filter(phase => phase.completed).length;
        }
        
        if (project.features) {
            totalTasks += project.features.length;
            completedTasks += project.features.filter(feature => feature.completed).length;
        }
        
        if (project.structures) {
            totalTasks += project.structures.length;
            completedTasks += project.structures.filter(structure => structure.completed).length;
        }
        
        return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    },
    
    // Generate deployment configuration
    generateDeploymentConfig: (projectType) => {
        const configs = {
            visualizer: {
                platform: 'GitHub Pages',
                files: ['gh-pages.yml', 'CNAME'],
                steps: ['Build static files', 'Deploy to GitHub Pages', 'Configure custom domain']
            },
            fullstack: {
                platform: 'Heroku/Vercel',
                files: ['Procfile', 'vercel.json', 'Dockerfile'],
                steps: ['Configure environment variables', 'Set up database', 'Deploy backend', 'Deploy frontend']
            },
            game: {
                platform: 'Netlify',
                files: ['_redirects', 'netlify.toml'],
                steps: ['Build game assets', 'Optimize for web', 'Deploy to CDN']
            },
            library: {
                platform: 'npm/PyPI',
                files: ['package.json', 'setup.py', '.npmignore'],
                steps: ['Run tests', 'Build package', 'Publish to registry']
            }
        };
        
        return configs[projectType] || null;
    }
};

// Performance monitoring for portfolio system
const PortfolioPerformance = {
    // Track user interactions
    trackInteraction: (action, projectType = null) => {
        const event = {
            action: action,
            projectType: projectType,
            timestamp: Date.now(),
            url: window.location.href
        };
        
        // In production, this would send to analytics
        console.log('📊 Portfolio interaction:', event);
    },
    
    // Monitor page performance
    measurePerformance: () => {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            const metrics = {
                loadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                firstPaint: Math.round(perfData.responseEnd - perfData.requestStart)
            };
            
            console.log('⚡ Portfolio performance:', metrics);
            return metrics;
        }
        
        return null;
    }
};

// Export utilities for global access
window.PortfolioUtils = PortfolioUtils;
window.PortfolioPerformance = PortfolioPerformance;

// Final initialization and celebration
console.log('🎊 Portfolio Projects Engine fully loaded and spectacular!');
console.log('✨ Ready to create amazing projects:');
console.log('   🎨 Interactive Algorithm Visualizers');
console.log('   🌐 Full-Stack Web Applications');
console.log('   🎮 Educational Coding Games');
console.log('   📚 Professional Libraries');
console.log('   🏆 Complete Developer Portfolios');

// Portfolio engine is ready for action!
console.log('🚀 Your CodeMaster Academy Portfolio Projects System is complete!');
