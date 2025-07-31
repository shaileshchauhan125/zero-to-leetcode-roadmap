# PowerShell script to fix modal styles for dark mode
$rootPath = "c:\Users\shubham\Desktop\Revision101"
$contentPath = Join-Path $rootPath "content"

# Get all HTML files in content directory
$htmlFiles = Get-ChildItem -Path $contentPath -Recurse -Filter "*.html"

Write-Host "Found $($htmlFiles.Count) HTML files to update modal styles"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Fix modal background colors
    $content = $content -replace 'background: #fff;', 'background: var(--bg-elevated);'
    $content = $content -replace 'background:#fff', 'background:var(--bg-elevated)'
    $content = $content -replace 'background: #ffffff;', 'background: var(--bg-elevated);'
    $content = $content -replace 'background:#ffffff', 'background:var(--bg-elevated)'
    
    # Fix text colors
    $content = $content -replace 'color:#333;', 'color:var(--text-primary);'
    $content = $content -replace 'color: #333;', 'color: var(--text-primary);'
    $content = $content -replace 'color:#000;', 'color:var(--text-primary);'
    $content = $content -replace 'color: #000;', 'color: var(--text-primary);'
    $content = $content -replace 'color:#888;', 'color:var(--text-secondary);'
    $content = $content -replace 'color: #888;', 'color: var(--text-secondary);'
    
    # Fix borders
    $content = $content -replace 'border:2px solid #888;', 'border:2px solid var(--border-medium);'
    $content = $content -replace 'border: 2px solid #888;', 'border: 2px solid var(--border-medium);'
    
    # Fix box shadows
    $content = $content -replace 'box-shadow:0 2px 8px rgba\(0,0,0,0\.08\);', 'box-shadow:var(--shadow-md);'
    $content = $content -replace 'box-shadow: 0 2px 8px rgba\(0,0,0,0\.08\);', 'box-shadow: var(--shadow-md);'
    $content = $content -replace 'box-shadow: 0 4px 32px rgba\(0,0,0,0\.18\);', 'box-shadow: var(--shadow-xl);'
    
    # Add missing color and border properties to modal content
    $content = $content -replace '(style="[^"]*border-radius: 1\.25rem;[^"]*)">', '$1 color: var(--text-primary); border: 1px solid var(--border-medium);">'
    
    # Write updated content back to file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Updated modal styles: $($file.Name)"
}

Write-Host "Modal styles updated for dark mode across all lesson files!"
