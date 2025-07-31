# PowerShell script to add dark mode functionality to all lesson files
$rootPath = "c:\Users\shubham\Desktop\Revision101"
$contentPath = Join-Path $rootPath "content"

# Get all HTML files in content directory
$htmlFiles = Get-ChildItem -Path $contentPath -Recurse -Filter "*.html"

Write-Host "Found $($htmlFiles.Count) HTML files to update"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if theme toggle button is already present
    if ($content -notmatch 'id="themeToggle"') {
        # Add theme toggle button to sidebar header
        $content = $content -replace '(<div class="sidebar-header">[\s]*<button class="sidebar-toggle"[^>]*>⮜</button>)', '$1`n                <button class="theme-toggle" id="themeToggle">🌙</button>'
    }
    
    # Check if main.js is already included
    if ($content -notmatch 'main\.js') {
        # Add main.js script before closing body tag
        $content = $content -replace '(</script>\s*</body>)', '$1`n    <script src="../../js/main.js"></script>'
        $content = $content -replace '(</body>(?!\s*<script))', '<script src="../../js/main.js"></script>`n$1'
    }
    
    # Write updated content back to file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "Dark mode functionality added to all lesson files!"
