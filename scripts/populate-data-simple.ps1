# PowerShell script to populate Phillip's portfolio data
# Run this script from the project root directory

$baseUrl = "http://localhost:3000/api/portfolio"

# Function to make POST request with proper PowerShell syntax
function Add-SkillData {
    param($skillData)
    
    $body = $skillData | ConvertTo-Json
    $headers = @{ "Content-Type" = "application/json" }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/skills" -Method POST -Body $body -Headers $headers
        Write-Host "Added skill: $($skillData.name)" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Failed to add skill: $($skillData.name)" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

function Add-ExperienceData {
    param($expData)
    
    $body = $expData | ConvertTo-Json
    $headers = @{ "Content-Type" = "application/json" }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/experience" -Method POST -Body $body -Headers $headers
        Write-Host "Added experience: $($expData.title)" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Failed to add experience: $($expData.title)" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

function Add-ProjectData {
    param($projData)
    
    $body = $projData | ConvertTo-Json
    $headers = @{ "Content-Type" = "application/json" }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/projects" -Method POST -Body $body -Headers $headers
        Write-Host "Added project: $($projData.title)" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Failed to add project: $($projData.title)" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

Write-Host "Starting to populate Phillip's portfolio data..." -ForegroundColor Cyan

# Skills Data
Write-Host "Adding Skills..." -ForegroundColor Yellow

$skills = @(
    @{ name = "Python"; category = "programming"; level = "Advanced"; featured = $true; order = 0 },
    @{ name = "C++"; category = "programming"; level = "Advanced"; featured = $true; order = 1 },
    @{ name = "Java"; category = "programming"; level = "Intermediate"; featured = $true; order = 2 },
    @{ name = "JavaScript"; category = "programming"; level = "Advanced"; featured = $true; order = 3 },
    @{ name = "Flutter"; category = "framework"; level = "Intermediate"; featured = $true; order = 4 },
    @{ name = "React Native"; category = "framework"; level = "Intermediate"; featured = $true; order = 5 },
    @{ name = "MySQL"; category = "database"; level = "Intermediate"; featured = $true; order = 6 },
    @{ name = "Arduino"; category = "embedded"; level = "Advanced"; featured = $true; order = 7 },
    @{ name = "Raspberry Pi"; category = "embedded"; level = "Intermediate"; featured = $true; order = 8 },
    @{ name = "Git"; category = "tool"; level = "Intermediate"; featured = $true; order = 9 }
)

foreach ($skill in $skills) {
    Add-SkillData -skillData $skill
    Start-Sleep -Milliseconds 500
}

Write-Host "Data population completed!" -ForegroundColor Green
Write-Host "Visit http://localhost:3000 to see your updated portfolio" -ForegroundColor Cyan
