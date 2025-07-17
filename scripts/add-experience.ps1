# PowerShell script to add experience data
$baseUrl = "http://localhost:3000/api/portfolio"

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

Write-Host "Adding Experience..." -ForegroundColor Yellow

$experiences = @(
    @{
        title = "Programming Tutor"
        company = "University"
        location = "Thailand"
        startDate = "2020-01-01"
        endDate = "2023-12-31"
        current = $false
        description = "Tutored university students in programming and electronics, focusing on C++ and Arduino development. Helped students understand fundamental programming concepts and embedded systems development."
        technologies = @("C++", "Arduino", "Electronics", "Programming Fundamentals")
        achievements = @(
            "Successfully tutored over 50 students",
            "Improved student programming proficiency by 40%",
            "Developed custom learning materials for embedded systems"
        )
    },
    @{
        title = "Project Leader"
        company = "University Tech Projects"
        location = "Thailand"
        startDate = "2021-01-01"
        endDate = "2023-12-31"
        current = $false
        description = "Led several student technology projects and participated in various competitions. Managed project timelines, coordinated team activities, and ensured project deliverables met requirements."
        technologies = @("Project Management", "Team Leadership", "Software Development")
        achievements = @(
            "Led 5+ successful tech projects",
            "Participated in multiple competitions",
            "Developed strong project management skills"
        )
    }
)

foreach ($exp in $experiences) {
    Add-ExperienceData -expData $exp
    Start-Sleep -Milliseconds 500
}

Write-Host "Experience data added!" -ForegroundColor Green
