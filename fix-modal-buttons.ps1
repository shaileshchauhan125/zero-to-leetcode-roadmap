# PowerShell script to fix modal button styling for dark mode across all lesson files
$rootPath = "c:\Users\shubham\Desktop\Revision101"
$contentPath = Join-Path $rootPath "content"

# Get all HTML files in content directory
$htmlFiles = Get-ChildItem -Path $contentPath -Recurse -Filter "*.html"

Write-Host "Found $($htmlFiles.Count) HTML files to fix modal button styling"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Fix hardcoded colors in button styles
    $content = $content -replace 'background:linear-gradient\(90deg,#6366f1,#8b5cf6\)', 'background:var(--accent-gradient)'
    $content = $content -replace 'background: linear-gradient\(90deg,#6366f1,#8b5cf6\)', 'background: var(--accent-gradient)'
    $content = $content -replace 'color:#fff', 'color:var(--text-inverse)'
    $content = $content -replace 'color: #fff', 'color: var(--text-inverse)'
    $content = $content -replace 'background:#e5e7eb', 'background:var(--bg-tertiary)'
    $content = $content -replace 'background: #e5e7eb', 'background: var(--bg-tertiary)'
    $content = $content -replace 'color:#333', 'color:var(--text-primary)'
    $content = $content -replace 'color: #333', 'color: var(--text-primary)'
    
    # Fix modal background overlay
    $content = $content -replace 'background:rgba\(30,41,59,0\.18\)', 'background:var(--bg-overlay)'
    $content = $content -replace 'background: rgba\(30,41,59,0\.18\)', 'background: var(--bg-overlay)'
    
    # Add border to secondary buttons
    $content = $content -replace '(background:var\(--bg-tertiary\);[^"]*)">', '$1;border:1px solid var(--border-medium)">'
    
    # Fix box shadows
    $content = $content -replace 'box-shadow:0 4px 32px rgba\(0,0,0,0\.18\)', 'box-shadow:var(--shadow-xl)'
    $content = $content -replace 'box-shadow: 0 4px 32px rgba\(0,0,0,0\.18\)', 'box-shadow: var(--shadow-xl)'
    
    # Write updated content back to file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Fixed modal styling: $($file.Name)"
}

Write-Host "Modal button styling fixed for dark mode across all lesson files!"
