# Cloudinary Setup Guide

## 1. Sign up for free at: https://cloudinary.com
## 2. Get your cloud name from the dashboard
## 3. Upload your profile image
## 4. Copy the image URL
## 5. Update the environment variables

# Add to your .env.local file:
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_PROFILE_IMAGE_URL=https://res.cloudinary.com/your_cloud_name/image/upload/profile.jpg

# Then update Hero.tsx to use:
# src={process.env.NEXT_PUBLIC_PROFILE_IMAGE_URL || "/profile.jpg"}
