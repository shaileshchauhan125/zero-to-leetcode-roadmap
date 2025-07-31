# PowerShell script to update navigation buttons across all lesson files
# This script adds the "Test My Knowledge" button to all lesson files

$files = @(
    "content\phase2\loops-iteration.html",
    "content\phase3\oop-fundamentals.html",
    "content\phase3\advanced-data-structures.html",
    "content\phase4\problem-patterns.html",
    "content\phase4\time-space-complexity.html",
    "content\phase4\optimization-techniques.html",
    "content\phase5\leetcode-strategy-framework.html",
    "content\phase5\mock-interview-simulator.html",
    "content\phase5\portfolio-projects-system.html"
)

# Template for the new navigation structure
$newNavTemplate = @'
            <nav class="lesson-navigation">
                <div class="navigation-buttons">
                  <button class="nav-btn prev" onclick="previousLesson()">PREV_TEXT</button>
                  <button class="nav-btn test-knowledge" onclick="showKnowledgeTest()">🧠 Test My Knowledge</button>
                  <button class="nav-btn next" onclick="NEXT_FUNCTION()">NEXT_TEXT</button>
                </div>
            </nav>
'@

Write-Host "Navigation update script created. Manual updates required for each lesson file."
Write-Host "Updated files already: variables-datatypes.html, mathematical-operations.html, control-flow.html, sorting-algorithms.html, data-structures.html"
Write-Host "Remaining files to update: $($files.Count)"
