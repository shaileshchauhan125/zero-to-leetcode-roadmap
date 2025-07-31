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

// Phase 2 Interactive Engine
class Phase2Engine {
    constructor() {
        this.currentExample = 'lists';
        this.infoData = this.getInfoData();
        this.exampleData = this.getExampleData();
        this.projectData = this.getProjectData();
        this.init();
    }

    init() {
        this.setupTableInteractions();
        this.setupExampleTabs();
        this.setupProjectModal();
    }

    getInfoData() {
        return {
            'list-analogy': {
                title: 'Lists: Like a Shopping List',
                content: `
                    <p><strong>Think of a list as a shopping list:</strong></p>
                    <ul>
                        <li>You can add items as you remember them</li>
                        <li>You can cross out (remove) items</li>
                        <li>The order matters - you might shop in sequence</li>
                        <li>You can have duplicate items (buy 2 apples)</li>
                    </ul>
                    <div class="code-example">
                        <pre><code>shopping = ["apples", "bread", "milk"]
shopping.append("eggs")      # Add to end
shopping.insert(0, "coffee") # Add to beginning
# Result: ["coffee", "apples", "bread", "milk", "eggs"]</code></pre>
                    </div>
                `
            },
            'tuple-analogy': {
                title: 'Tuples: Like GPS Coordinates',
                content: `
                    <p><strong>Think of a tuple as GPS coordinates:</strong></p>
                    <ul>
                        <li>Once set, they don't change (immutable)</li>
                        <li>The order is crucial (latitude, longitude)</li>
                        <li>Perfect for fixed data that belongs together</li>
                        <li>Can be used as dictionary keys</li>
                    </ul>
                    <div class="code-example">
                        <pre><code>location = (40.7128, -74.0060)  # NYC coordinates
# location[0] = 41.0  # This would cause an error!
# Tuples are immutable</code></pre>
                    </div>
                `
            },
            'set-analogy': {
                title: 'Sets: Like a Unique Attendee List',
                content: `
                    <p><strong>Think of a set as a unique attendee list:</strong></p>
                    <ul>
                        <li>Each person can only be listed once</li>
                        <li>Great for checking "Is this person attending?"</li>
                        <li>Order doesn't matter</li>
                        <li>Perfect for removing duplicates</li>
                    </ul>
                    <div class="code-example">
                        <pre><code>attendees = {"Alice", "Bob", "Charlie"}
attendees.add("Alice")  # Won't duplicate
print(attendees)  # Still {"Alice", "Bob", "Charlie"}</code></pre>
                    </div>
                `
            },
            'dict-analogy': {
                title: 'Dictionaries: Like a Phone Book',
                content: `
                    <p><strong>Think of a dictionary as a phone book:</strong></p>
                    <ul>
                        <li>Each name (key) maps to a number (value)</li>
                        <li>You look up by name, not by position</li>
                        <li>Names must be unique, but numbers can repeat</li>
                        <li>Super fast lookups</li>
                    </ul>
                    <div class="code-example">
                        <pre><code>phonebook = {
    "Alice": "555-1234",
    "Bob": "555-5678",
    "Charlie": "555-9012"
}
print(phonebook["Alice"])  # Fast lookup: "555-1234"</code></pre>
                    </div>
                `
            },
            'list-time': {
                title: 'List Access Time: O(1)',
                content: `
                    <p><strong>Lists have O(1) access time by index:</strong></p>
                    <ul>
                        <li>Direct access: <code>my_list[5]</code> is instant</li>
                        <li>Appending to end: <code>my_list.append(x)</code> is O(1)</li>
                        <li>Inserting at beginning: <code>my_list.insert(0, x)</code> is O(n)</li>
                        <li>Searching: <code>x in my_list</code> is O(n)</li>
                    </ul>
                    <div class="performance-tip">
                        <strong>💡 Tip:</strong> Use lists when you need ordered data and frequent access by index.
                    </div>
                `
            }
        };
    }

    getExampleData() {
        return {
            lists: `# Creating and modifying lists
shopping_list = ["apples", "bread", "milk"]
print("Original list:", shopping_list)

# Adding items
shopping_list.append("eggs")
shopping_list.insert(1, "bananas")
print("After adding:", shopping_list)

# Removing items
shopping_list.remove("bread")
print("After removing bread:", shopping_list)

# List comprehensions (powerful one-liners)
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print("Squares:", squares)

# Filtering with comprehensions
even_squares = [x**2 for x in numbers if x % 2 == 0]
print("Even squares:", even_squares)`,

            tuples: `# Creating tuples
coordinates = (10.5, 20.3)
rgb_color = (255, 128, 0)
print("Coordinates:", coordinates)
print("RGB Color:", rgb_color)

# Tuple unpacking
x, y = coordinates
red, green, blue = rgb_color
print(f"X: {x}, Y: {y}")
print(f"Red: {red}, Green: {green}, Blue: {blue}")

# Tuples as dictionary keys (because they're immutable)
locations = {
    (0, 0): "Origin",
    (10, 20): "Point A",
    (15, 25): "Point B"
}
print("Locations:", locations)

# Named tuples for better readability
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p1 = Point(10, 20)
print(f"Point: x={p1.x}, y={p1.y}")`,

            sets: `# Creating sets
numbers = {1, 2, 3, 4, 5}
duplicates = {1, 2, 2, 3, 3, 4}
print("Numbers:", numbers)
print("Duplicates removed:", duplicates)

# Set operations
set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}

print("Union (A | B):", set_a | set_b)
print("Intersection (A & B):", set_a & set_b)
print("Difference (A - B):", set_a - set_b)
print("Symmetric Difference (A ^ B):", set_a ^ set_b)

# Fast membership testing
large_set = set(range(1000000))
print("999999 in large_set:", 999999 in large_set)

# Remove duplicates from a list
list_with_dupes = [1, 2, 2, 3, 3, 4, 5, 5]
unique_list = list(set(list_with_dupes))
print("Unique elements:", unique_list)`,

            dicts: `# Creating dictionaries
student_grades = {
    "Alice": 95,
    "Bob": 87,
    "Charlie": 92,
    "Diana": 89
}
print("Student grades:", student_grades)

# Adding and updating
student_grades["Eve"] = 94
student_grades["Bob"] = 90
print("After updates:", student_grades)

# Dictionary methods
print("Students:", list(student_grades.keys()))
print("Grades:", list(student_grades.values()))
print("Items:", list(student_grades.items()))

# Dictionary comprehensions
grade_letters = {name: "A" if grade >= 90 else "B" 
                for name, grade in student_grades.items()}
print("Letter grades:", grade_letters)

# Nested dictionaries
course_data = {
    "Math": {"teacher": "Dr. Smith", "room": "101"},
    "Physics": {"teacher": "Prof. Jones", "room": "205"}
}
print("Math teacher:", course_data["Math"]["teacher"])`
        };
    }

    getProjectData() {
        return {
            'contact-manager': {
                title: 'Contact Manager Project',
                instructions: `
                    <h4>🎯 Project Goal</h4>
                    <p>Build a comprehensive contact management system that demonstrates all four data structures working together.</p>
                    
                    <h4>📋 Requirements</h4>
                    <ol>
                        <li><strong>Contact Storage</strong>: Use a dictionary to store contacts with names as keys</li>
                        <li><strong>Multiple Phone Numbers</strong>: Each contact can have multiple phone numbers (use a list)</li>
                        <li><strong>Contact Groups</strong>: Use sets to manage contact groups (family, work, friends)</li>
                        <li><strong>Metadata</strong>: Store immutable contact info like (first_name, last_name) as tuples</li>
                        <li><strong>Search Function</strong>: Implement search and filter functionality</li>
                    </ol>
                    
                    <h4>🔧 Features to Implement</h4>
                    <ul>
                        <li>Add new contacts</li>
                        <li>Add phone numbers to existing contacts</li>
                        <li>Create and manage contact groups</li>
                        <li>Search contacts by name or group</li>
                        <li>Display all contacts in a formatted way</li>
                    </ul>
                    
                    <h4>💡 Hints</h4>
                    <ul>
                        <li>Start with a simple dictionary structure</li>
                        <li>Use input() for user interaction</li>
                        <li>Consider using while loops for the main menu</li>
                        <li>Test with sample data first</li>
                    </ul>
                `,
                starterCode: `# Contact Manager Project
# Complete the implementation below

class ContactManager:
    def __init__(self):
        # Dictionary to store contacts: {name: contact_info}
        self.contacts = {}
        
        # Sets to store different groups
        self.groups = {
            'family': set(),
            'work': set(),
            'friends': set()
        }
    
    def add_contact(self, name, phone_number, group='friends'):
        """Add a new contact with phone number and group"""
        # TODO: Implement this method
        # Hint: Use tuple for name parts, list for phone numbers
        pass
    
    def add_phone_number(self, name, phone_number):
        """Add additional phone number to existing contact"""
        # TODO: Implement this method
        pass
    
    def search_contacts(self, query):
        """Search contacts by name or group"""
        # TODO: Implement this method
        pass
    
    def display_all_contacts(self):
        """Display all contacts in formatted way"""
        # TODO: Implement this method
        pass
    
    def get_contacts_by_group(self, group):
        """Get all contacts in a specific group"""
        # TODO: Implement this method
        pass

# Test your implementation
if __name__ == "__main__":
    cm = ContactManager()
    
    # Add some sample contacts
    cm.add_contact("Alice Johnson", "555-1234", "family")
    cm.add_contact("Bob Smith", "555-5678", "work")
    cm.add_contact("Charlie Brown", "555-9012", "friends")
    
    # Test adding additional phone numbers
    cm.add_phone_number("Alice Johnson", "555-2468")
    
    # Display results
    print("=== All Contacts ===")
    cm.display_all_contacts()
    
    print("\\n=== Family Contacts ===")
    family_contacts = cm.get_contacts_by_group("family")
    print(family_contacts)
    
    print("\\n=== Search Results ===")
    results = cm.search_contacts("Alice")
    print(results)`,
                solution: `# Contact Manager Project - Solution

class ContactManager:
    def __init__(self):
        # Dictionary to store contacts: {name: contact_info}
        self.contacts = {}
        
        # Sets to store different groups
        self.groups = {
            'family': set(),
            'work': set(),
            'friends': set()
        }
    
    def add_contact(self, name, phone_number, group='friends'):
        """Add a new contact with phone number and group"""
        # Split name into parts (tuple for immutability)
        name_parts = tuple(name.split())
        
        # Create contact info dictionary
        contact_info = {
            'name_parts': name_parts,
            'phone_numbers': [phone_number],  # List for multiple numbers
            'group': group
        }
        
        # Add to contacts dictionary
        self.contacts[name] = contact_info
        
        # Add to appropriate group (set)
        if group in self.groups:
            self.groups[group].add(name)
        
        print(f"Added {name} to {group} group")
    
    def add_phone_number(self, name, phone_number):
        """Add additional phone number to existing contact"""
        if name in self.contacts:
            self.contacts[name]['phone_numbers'].append(phone_number)
            print(f"Added phone number {phone_number} to {name}")
        else:
            print(f"Contact {name} not found")
    
    def search_contacts(self, query):
        """Search contacts by name or group"""
        results = []
        query_lower = query.lower()
        
        for name, info in self.contacts.items():
            # Search by name
            if query_lower in name.lower():
                results.append((name, info))
            # Search by group
            elif query_lower == info['group'].lower():
                results.append((name, info))
        
        return results
    
    def display_all_contacts(self):
        """Display all contacts in formatted way"""
        if not self.contacts:
            print("No contacts found")
            return
        
        for name, info in self.contacts.items():
            print(f"📞 {name}")
            print(f"   Group: {info['group']}")
            print(f"   Phone numbers: {', '.join(info['phone_numbers'])}")
            print(f"   Name parts: {info['name_parts']}")
            print()
    
    def get_contacts_by_group(self, group):
        """Get all contacts in a specific group"""
        if group not in self.groups:
            return []
        
        return [(name, self.contacts[name]) for name in self.groups[group]]

# Test the implementation
if __name__ == "__main__":
    cm = ContactManager()
    
    # Add some sample contacts
    cm.add_contact("Alice Johnson", "555-1234", "family")
    cm.add_contact("Bob Smith", "555-5678", "work")
    cm.add_contact("Charlie Brown", "555-9012", "friends")
    
    # Test adding additional phone numbers
    cm.add_phone_number("Alice Johnson", "555-2468")
    
    # Display results
    print("=== All Contacts ===")
    cm.display_all_contacts()
    
    print("=== Family Contacts ===")
    family_contacts = cm.get_contacts_by_group("family")
    for name, info in family_contacts:
        print(f"{name}: {info['phone_numbers']}")
    
    print("\\n=== Search Results ===")
    results = cm.search_contacts("Alice")
    for name, info in results:
        print(f"Found: {name} in {info['group']} group")`
            }
        };
    }

    setupTableInteractions() {
        const cells = document.querySelectorAll('.clickable-cell');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const infoKey = cell.dataset.info;
                if (infoKey && this.infoData[infoKey]) {
                    this.showInfoModal(this.infoData[infoKey]);
                }
            });
        });
    }

    setupExampleTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const exampleType = button.textContent.toLowerCase();
                this.showExample(exampleType);
            });
        });
    }

    setupProjectModal() {
        // Project modal setup will be handled by global functions
    }

    showExample(exampleType) {
        // Hide all examples
        document.querySelectorAll('.example-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected example
        const selectedExample = document.getElementById(`${exampleType}-example`);
        if (selectedExample) {
            selectedExample.classList.add('active');
        }
        
        // Activate corresponding tab
        const selectedTab = Array.from(document.querySelectorAll('.tab-btn'))
            .find(btn => btn.textContent.toLowerCase() === exampleType);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        this.currentExample = exampleType;
    }

    showInfoModal(info) {
        const modal = document.getElementById('infoModal');
        const title = document.getElementById('infoTitle');
        const content = document.getElementById('infoContent');
        
        title.textContent = info.title;
        content.innerHTML = info.content;
        modal.style.display = 'block';
    }

    runExample(exampleType) {
        const code = this.exampleData[exampleType];
        const outputElement = document.getElementById(`${exampleType}-output`);
        
        if (!code || !outputElement) return;
        
        // Show loading
        outputElement.textContent = 'Running code...';
        outputElement.style.color = '#6b7280';
        
        // Simulate execution
        setTimeout(() => {
            try {
                const result = this.simulatePythonExecution(code);
                outputElement.textContent = result;
                outputElement.style.color = '#10b981';
            } catch (error) {
                outputElement.textContent = `Error: ${error.message}`;
                outputElement.style.color = '#ef4444';
            }
        }, 800);
    }

    simulatePythonExecution(code) {
        // Enhanced Python simulation for Phase 2 examples
        const lines = code.split('\n');
        let output = [];
        let variables = {};
        
        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith('#')) continue;
            
            try {
                // Handle imports
                if (line.startsWith('from ') || line.startsWith('import ')) {
                    continue; // Skip imports for simulation
                }
                
                // Handle variable assignments
                if (line.includes(' = ') && !line.startsWith('print')) {
                    this.processAssignment(line, variables);
                }
                
                // Handle print statements
                if (line.startsWith('print(')) {
                    const result = this.processPrintStatement(line, variables);
                    output.push(result);
                }
                
                // Handle method calls
                if (line.includes('.append(') || line.includes('.insert(') || 
                    line.includes('.remove(') || line.includes('.add(')) {
                    this.processMethodCall(line, variables);
                }
                
            } catch (error) {
                output.push(`Error on line "${line}": ${error.message}`);
            }
        }
        
        return output.join('\n');
    }

    processAssignment(line, variables) {
        const [varName, value] = line.split(' = ', 2);
        const cleanVar = varName.trim();
        const cleanValue = value.trim();
        
        // Handle different assignment types
        if (cleanValue.startsWith('[')) {
            // List assignment
            const listMatch = cleanValue.match(/\[(.*)\]/);
            if (listMatch) {
                const items = listMatch[1].split(',').map(item => item.trim().replace(/['"]/g, ''));
                variables[cleanVar] = items.filter(item => item !== '');
            }
        } else if (cleanValue.startsWith('{') && cleanValue.includes(':')) {
            // Dictionary assignment
            variables[cleanVar] = cleanValue; // Store as string for now
        } else if (cleanValue.startsWith('{')) {
            // Set assignment
            const setMatch = cleanValue.match(/\{(.*)\}/);
            if (setMatch) {
                const items = setMatch[1].split(',').map(item => item.trim());
                variables[cleanVar] = [...new Set(items)]; // Remove duplicates
            }
        } else if (cleanValue.startsWith('(')) {
            // Tuple assignment
            const tupleMatch = cleanValue.match(/\((.*)\)/);
            if (tupleMatch) {
                const items = tupleMatch[1].split(',').map(item => item.trim());
                variables[cleanVar] = `(${items.join(', ')})`;
            }
        } else {
            // Regular assignment
            variables[cleanVar] = cleanValue;
        }
    }

    processPrintStatement(line, variables) {
        const match = line.match(/print\((.*)\)$/);
        if (!match) return '';
        
        let content = match[1].trim();
        
        // Handle f-strings
        if (content.startsWith('f"') || content.startsWith("f'")) {
            content = content.slice(2, -1);
            for (let [name, value] of Object.entries(variables)) {
                content = content.replace(new RegExp(`\\{${name}\\}`, 'g'), value);
            }
            return content;
        }
        
        // Handle regular strings
        if (content.startsWith('"') || content.startsWith("'")) {
            return content.slice(1, -1);
        }
        
        // Handle variable references
        if (variables.hasOwnProperty(content)) {
            const value = variables[content];
            if (Array.isArray(value)) {
                return `[${value.map(v => `'${v}'`).join(', ')}]`;
            }
            return value;
        }
        
        return content;
    }

    processMethodCall(line, variables) {
        // Handle list methods
        if (line.includes('.append(')) {
            const match = line.match(/(\w+)\.append\((.*)\)/);
            if (match && variables[match[1]]) {
                const item = match[2].trim().replace(/['"]/g, '');
                if (Array.isArray(variables[match[1]])) {
                    variables[match[1]].push(item);
                }
            }
        }
        
        if (line.includes('.remove(')) {
            const match = line.match(/(\w+)\.remove\((.*)\)/);
            if (match && variables[match[1]]) {
                const item = match[2].trim().replace(/['"]/g, '');
                if (Array.isArray(variables[match[1]])) {
                    const index = variables[match[1]].indexOf(item);
                    if (index > -1) {
                        variables[match[1]].splice(index, 1);
                    }
                }
            }
        }
        
        if (line.includes('.insert(')) {
            const match = line.match(/(\w+)\.insert\((\d+),\s*(.*)\)/);
            if (match && variables[match[1]]) {
                const index = parseInt(match[2]);
                const item = match[3].trim().replace(/['"]/g, '');
                if (Array.isArray(variables[match[1]])) {
                    variables[match[1]].splice(index, 0, item);
                }
            }
        }
    }
}

// Global functions for HTML event handlers
let phase2Engine;

document.addEventListener('DOMContentLoaded', () => {
    phase2Engine = new Phase2Engine();
});

function showExample(exampleType) {
    phase2Engine.showExample(exampleType);
}

function runExample(exampleType) {
    phase2Engine.runExample(exampleType);
}

function closeInfoModal() {
    document.getElementById('infoModal').style.display = 'none';
}

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = phase2Engine.projectData[projectId];
    
    if (!project) return;
    
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectInstructions').innerHTML = project.instructions;
    document.getElementById('projectEditor').value = project.starterCode;
    
    modal.style.display = 'block';
    
    // Store project data for later use
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
    
    output.textContent = 'Running project...';
    
    setTimeout(() => {
        try {
            const result = phase2Engine.simulatePythonExecution(code);
            output.textContent = result;
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
        }
    }, 1000);
}

function resetProject() {
    const modal = document.getElementById('projectModal');
    const projectId = modal.dataset.projectId;
    const project = phase2Engine.projectData[projectId];
    
    if (project) {
        document.getElementById('projectEditor').value = project.starterCode;
        document.getElementById('projectOutput').textContent = '';
    }
}

function clearProjectOutput() {
    document.getElementById('projectOutput').textContent = '';
}

function nextSection() {
    // Navigate to next section
    window.location.href = 'loops-iteration.html';
}

console.log('🏗️ Phase 2 Engine loaded successfully!');
            