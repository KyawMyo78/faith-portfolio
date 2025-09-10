# Open Graph Image Requirements

To fix social media link previews, you need to create an `og-image.jpg` file in this `/public` directory.

## Requirements:
- **Dimensions:** 1200x630 pixels (Facebook recommended)
- **Format:** JPG or PNG
- **File size:** Under 1MB
- **Content:** Should include your name, title, and maybe a photo

## Quick Options:

### Option 1: Use your existing profile photo
- Resize your `profile.jpg` to 1200x630
- Add text overlay with your name and "Portfolio"
- Save as `og-image.jpg`

### Option 2: Create a simple design
- Background color matching your website theme
- Your name: "Your Name (Your Nickname)"
- Subtitle: "Full Stack Developer & IT Student"
- Optional: Add some tech icons or patterns

### Option 3: Online tools
- Use Canva, Figma, or similar tools
- Search for "Open Graph" templates
- Customize with your information

## After creating the image:
1. Save it as `public/og-image.jpg`
2. Test the link preview at: https://developers.facebook.com/tools/debug/
3. Clear cache if needed

The current code is already configured to use this image for social media previews.
