# Google Drive Image Hosting Guide

## Steps:
1. Upload your profile photo to Google Drive
2. Right-click → Share → Change to "Anyone with the link"
3. Copy the share link (looks like: https://drive.google.com/file/d/FILE_ID/view?usp=sharing)
4. Convert to direct link format: https://drive.google.com/uc?export=view&id=FILE_ID

## Example:
Original: https://drive.google.com/file/d/1ABC123XYZ/view?usp=sharing
Direct:   https://drive.google.com/uc?export=view&id=1ABC123XYZ

## Then update Hero.tsx:
src="https://drive.google.com/uc?export=view&id=YOUR_FILE_ID"

## Note: Google Drive links can sometimes be slow or change format
