# PowerShell script to add achievements data
$baseUrl = "http://localhost:3000/api/portfolio"

function Add-AchievementData {
    param($achievementData)
    
    $body = $achievementData | ConvertTo-Json
    $headers = @{ "Content-Type" = "application/json" }
    
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/achievements" -Method POST -Body $body -Headers $headers
        Write-Host "Added achievement: $($achievementData.title)" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Failed to add achievement: $($achievementData.title)" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

Write-Host "Adding Achievements..." -ForegroundColor Yellow

$achievements = @(
    @{
        title = "4-Year Academic Scholarship Recipient"
        description = "Awarded a full 4-year academic scholarship for outstanding academic performance and potential in Information Technology field."
        category = "award"
        date = "2020-09-01"
        issuer = "University"
        featured = $true
        order = 0
    },
    @{
        title = "Business Plan Competition - First Runner-up"
        description = "Achieved first runner-up position in a prestigious business plan competition, demonstrating entrepreneurial skills and innovative thinking."
        category = "achievement"
        date = "2023-05-15"
        issuer = "Business Competition Committee"
        featured = $true
        order = 1
    },
    @{
        title = "IELTS Score 6.5"
        description = "Achieved IELTS score of 6.5, demonstrating strong English language proficiency for international academic and professional purposes."
        category = "certification"
        date = "2023-08-20"
        issuer = "British Council"
        credentialId = "IELTS-2023-001"
        featured = $false
        order = 2
    },
    @{
        title = "Bachelor's Degree - GPA 3.8"
        description = "Graduated with a Bachelor's degree in Information Technology with an impressive GPA of 3.8, demonstrating consistent academic excellence."
        category = "achievement"
        date = "2024-05-30"
        issuer = "University"
        featured = $true
        order = 3
    }
)

foreach ($achievement in $achievements) {
    Add-AchievementData -achievementData $achievement
    Start-Sleep -Milliseconds 500
}

Write-Host "Achievements data added!" -ForegroundColor Green
