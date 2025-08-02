# Portfolio Template

A modern, professional portfolio website built with Next.js 14, TypeScript, and Firebase. Features a beautiful frontend with admin dashboard for easy content management.

## ✨ Features

- **Modern Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Responsive Design**: Beautiful UI that works on all devices  
- **Admin Dashboard**: Full CRUD operations for portfolio content
- **Dynamic Contact Form**: Working contact form with email notifications
- **Authentication**: Secure admin login with JWT and bcrypt
- **Password Reset**: Email-based password reset functionality
- **Firebase Integration**: Real-time database and hosting ready
- **SEO Optimized**: Meta tags and structured data
- **Performance**: Optimized images and animations with Framer Motion

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account
- Gmail account (for email functionality)

### 2. Setup

1. **Clone/Download this template**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase and email configuration

4. **Firebase Setup**:
   - Create a new Firebase project
   - Enable Firestore database
   - Generate service account key
   - Add your config to `.env.local`

5. **Admin Setup**:
   - Generate password hash: `node scripts/generate-hash.js your_password`
   - Add the hash to `ADMIN_PASSWORD_HASH` in `.env.local`

6. **Run Development Server**:
   ```bash
   npm run dev
   ```

### 3. Deployment

**Vercel (Recommended)**:
1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy automatically on push

**Other Platforms**:
- Netlify, Railway, or any Node.js hosting platform
- Ensure environment variables are properly set

## 📁 Project Structure

```
├── app/                 # Next.js 14 app directory
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API routes
│   └── page.tsx        # Main portfolio page
├── components/         # React components
├── data/              # Static data files
├── lib/               # Utilities and configurations
├── public/            # Static assets
├── scripts/           # Helper scripts
└── types/             # TypeScript type definitions
```

## 🔧 Configuration

### Firebase Setup

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create new project
   - Enable Firestore Database

2. **Get Configuration**:
   - Project Settings → General → Your apps
   - Copy the config object values

3. **Service Account**:
   - Project Settings → Service Accounts
   - Generate new private key
   - Download JSON file and extract needed values

### Email Configuration

1. **Gmail Setup**:
   - Enable 2-factor authentication
   - Generate App Password
   - Use app password in `EMAIL_PASS`

### Admin Authentication

1. **Generate Password Hash**:
   ```bash
   node scripts/generate-hash.js yourpassword
   ```

2. **JWT Secret**:
   - Generate random string for `JWT_SECRET`
   - Keep this secure and unique

## 📝 Content Management

### Admin Dashboard Features

- **Profile Management**: Update contact info, CV link
- **Projects**: Add/edit/delete portfolio projects
- **Experience**: Manage work experience entries  
- **Skills**: Update technical skills
- **Achievements**: Add certifications and achievements
- **Contact Messages**: View messages from contact form

### Data Structure

The portfolio uses Firestore collections:
- `admin`: Admin profile and contact info
- `projects`: Portfolio projects
- `experience`: Work experience
- `skills`: Technical skills  
- `achievements`: Certifications/awards
- `contacts`: Contact form submissions

## 🎨 Customization

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Colors**: Update in `tailwind.config.js`
- **Components**: Modify in `components/` directory

### Content
- **Hero Section**: Update in `components/Hero.tsx`
- **About Section**: Modify `components/About.tsx`
- **Static Data**: Edit files in `data/` directory

### Images
- **Profile Image**: Replace `public/profile.jpg`
- **Project Images**: Add to `public/` and reference in admin

## 🔒 Security

- **Environment Variables**: Never commit `.env.local`
- **Admin Routes**: Protected by middleware
- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure session management
- **Input Validation**: Server-side validation on all inputs

## 📱 Mobile Responsiveness

- **Responsive Design**: Works on all screen sizes
- **Touch Friendly**: Optimized for mobile interactions
- **Performance**: Optimized images and lazy loading

## 🚀 Performance

- **Next.js 14**: Latest features and optimizations
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic bundle splitting
- **Caching**: Optimal caching strategies

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Error**:
   - Check environment variables
   - Verify Firebase project settings
   - Ensure Firestore is enabled

2. **Admin Login Issues**:
   - Verify password hash is correct
   - Check JWT secret is set
   - Ensure middleware is working

3. **Email Not Sending**:
   - Verify Gmail app password
   - Check email credentials
   - Ensure less secure apps is enabled

4. **Build Errors**:
   - Check TypeScript errors
   - Verify all dependencies are installed
   - Ensure environment variables are set

### Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📄 License

This template is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and pull requests to improve this template.

## 📞 Support

If you need help with this template:
1. Check the troubleshooting section
2. Review Firebase and Next.js documentation
3. Create an issue in the repository

---

**Happy coding! 🚀**

*Built with ❤️ using Next.js, TypeScript, and Firebase*
