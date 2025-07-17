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
        Write-Host "✓ Added skill: $($skillData.name)" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "✗ Failed to add skill: $($skillData.name)" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

function Add-ExperienceData {
    param($expData)
    
    $body = $expData | ConvertTo-Json
    $headers = @{ "Content-Type" = "application/json" }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/experience" -Method POST -Body $body -Headers $headers
        Write-Host "✓ Added experience: $($expData.title)" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "✗ Failed to add experience: $($expData.title)" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

function Add-ProjectData {
    param($projData)
    
    $body = $projData | ConvertTo-Json
    $headers = @{ "Content-Type" = "application/json" }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/projects" -Method POST -Body $body -Headers $headers
        Write-Host "✓ Added project: $($projData.title)" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "✗ Failed to add project: $($projData.title)" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}
}

Write-Host "🚀 Starting to populate Phillip's portfolio data..." -ForegroundColor Cyan

# Skills Data
Write-Host "📚 Adding Skills..." -ForegroundColor Yellow

$skills = @(
    @{ name = "Python"; category = "programming"; level = "Advanced"; featured = $true; order = 0 },
    @{ name = "C++"; category = "programming"; level = "Advanced"; featured = $true; order = 1 },
    @{ name = "Java"; category = "programming"; level = "Intermediate"; featured = $true; order = 2 },
    @{ name = "C#"; category = "programming"; level = "Intermediate"; featured = $false; order = 3 },
    @{ name = "PHP"; category = "programming"; level = "Intermediate"; featured = $false; order = 4 },
    @{ name = "JavaScript"; category = "programming"; level = "Advanced"; featured = $true; order = 5 },
    @{ name = "HTML"; category = "web"; level = "Advanced"; featured = $true; order = 6 },
    @{ name = "CSS"; category = "web"; level = "Advanced"; featured = $true; order = 7 },
    @{ name = "Dart"; category = "programming"; level = "Intermediate"; featured = $false; order = 8 },
    @{ name = "Flutter"; category = "framework"; level = "Intermediate"; featured = $true; order = 9 },
    @{ name = "React Native"; category = "framework"; level = "Intermediate"; featured = $true; order = 10 },
    @{ name = "MySQL"; category = "database"; level = "Intermediate"; featured = $true; order = 11 },
    @{ name = "Arduino"; category = "embedded"; level = "Advanced"; featured = $true; order = 12 },
    @{ name = "Raspberry Pi"; category = "embedded"; level = "Intermediate"; featured = $true; order = 13 },
    @{ name = "Linux"; category = "system"; level = "Intermediate"; featured = $false; order = 14 },
    @{ name = "Windows"; category = "system"; level = "Advanced"; featured = $false; order = 15 },
    @{ name = "Git"; category = "tool"; level = "Intermediate"; featured = $true; order = 16 },
    @{ name = "OOP"; category = "concept"; level = "Advanced"; featured = $true; order = 17 },
    @{ name = "Data Structures & Algorithms"; category = "concept"; level = "Advanced"; featured = $true; order = 18 },
    @{ name = "APIs"; category = "concept"; level = "Intermediate"; featured = $true; order = 19 }
)

foreach ($skill in $skills) {
    Add-SkillData -skillData $skill
    Start-Sleep -Milliseconds 200  # Small delay to avoid overwhelming the server
}

# Experience Data
Write-Host "💼 Adding Experience..." -ForegroundColor Yellow

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
    Start-Sleep -Milliseconds 200
}

# Projects Data
Write-Host "🚀 Adding Projects..." -ForegroundColor Yellow

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
    Start-Sleep -Milliseconds 200
}

Write-Host "✅ Data population completed!" -ForegroundColor Green
Write-Host "🌐 Visit http://localhost:3000 to see your updated portfolio" -ForegroundColor Cyan
Write-Host "⚙️ Visit http://localhost:3000/admin/dashboard to manage your data" -ForegroundColor Cyan
