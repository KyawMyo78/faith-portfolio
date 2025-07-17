# PowerShell script to add projects data
$baseUrl = "http://localhost:3000/api/portfolio"

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

Write-Host "Adding Projects..." -ForegroundColor Yellow

$projects = @(
    @{
        title = "Robotics Path Planning System"
        description = "Developed an advanced robotics navigation system using Particle Swarm Optimization (PSO) and Ant Colony Optimization (ACO) algorithms for efficient path planning."
        technologies = @("Python", "PSO Algorithm", "ACO Algorithm", "Robotics", "Path Planning")
        category = "robotics"
        featured = $true
        githubUrl = ""
        liveUrl = ""
        imageUrl = ""
        startDate = "2023-01-01"
        endDate = "2023-06-30"
        status = "completed"
    },
    @{
        title = "Cross-Platform Mobile Application"
        description = "Built a cross-platform mobile application using Flutter and React Native, demonstrating proficiency in modern mobile development frameworks."
        technologies = @("Flutter", "React Native", "Dart", "JavaScript", "Mobile Development")
        category = "mobile"
        featured = $true
        githubUrl = ""
        liveUrl = ""
        imageUrl = ""
        startDate = "2022-09-01"
        endDate = "2023-03-31"
        status = "completed"
    },
    @{
        title = "Arduino-based IoT System"
        description = "Created an IoT system using Arduino and Raspberry Pi for environmental monitoring and data collection, with web-based dashboard for real-time monitoring."
        technologies = @("Arduino", "Raspberry Pi", "C++", "Python", "IoT", "Web Development")
        category = "embedded"
        featured = $true
        githubUrl = ""
        liveUrl = ""
        imageUrl = ""
        startDate = "2022-01-01"
        endDate = "2022-08-31"
        status = "completed"
    },
    @{
        title = "Web Application with Database"
        description = "Developed a full-stack web application with CRUD operations, user authentication, and database integration using modern web technologies."
        technologies = @("PHP", "JavaScript", "HTML", "CSS", "MySQL", "Web Development")
        category = "web"
        featured = $false
        githubUrl = ""
        liveUrl = ""
        imageUrl = ""
        startDate = "2021-06-01"
        endDate = "2021-12-31"
        status = "completed"
    }
)

foreach ($proj in $projects) {
    Add-ProjectData -projData $proj
    Start-Sleep -Milliseconds 500
}

Write-Host "Projects data added!" -ForegroundColor Green
