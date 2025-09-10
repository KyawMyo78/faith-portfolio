# 🚀 Modern Portfolio Template

A stunning, feature-rich portfolio website built with cutting-edge technologies. Perfect for developers, designers, and creative professionals who want to showcase their work with style.

![Portfolio Preview](https://via.placeholder.com/800x400/6366f1/ffffff?text=Your+Portfolio+Preview)

## ✨ Features

### 🎨 **Beautiful Design**
- Modern, clean interface with smooth animations
- Responsive design that looks great on all devices
- Dark/Light mode toggle with system preference detection
- Customizable color schemes and themes

### 🔧 **Powerful Admin Panel**
- Secure authentication with password reset functionality
- Real-time content management for all sections
- Image upload with Firebase Storage integration
- Drag-and-drop file uploads
- Live preview of changes

### 🚀 **Performance & SEO**
- Built with Next.js 14 App Router for optimal performance
- Server-side rendering and static generation
- SEO optimized with meta tags and Open Graph
- Core Web Vitals optimized
- Automatic image optimization

### 📧 **Contact & Communication**
- Contact form with email notifications
- Anti-spam protection
- Real-time form validation
- Email templates for professional communication

### 📊 **Analytics & Insights**
- Google Analytics integration
- Performance monitoring
- User interaction tracking
- Admin dashboard with insights

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 with App Router |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | Firebase Firestore |
| **Storage** | Firebase Storage |
| **Authentication** | NextAuth.js |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Email** | Nodemailer |
| **Analytics** | Google Analytics |
| **Deployment** | Vercel |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Firebase project set up
- Git installed

### Installation

1. **Clone and setup**
   ```bash
   git clone https://github.com/KyawMyo78/portfolio-template.git
   cd portfolio-template
   npm install
   ```

2. **Environment configuration**
   ```bash
   cp .env.example .env.local
   ```
   
3. **Configure your environment variables** (see [Environment Setup](#environment-setup))

4. **Generate admin credentials**
   ```bash
   node generate-admin-hash.js
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Visit your site**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Environment Setup

Create a `.env.local` file with these configurations:

### Firebase Configuration
```env
# Client-side Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Server-side Firebase config
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your_project.iam.gserviceaccount.com
FIREBASE_PROJECT_ID=your_project_id
```

### Authentication & Security
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password
ADMIN_SECRET=your_admin_secret_key
NEXT_PUBLIC_ADMIN_SECRET=your_admin_secret_key
```

### Email Configuration
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM="Your Name <your_email@gmail.com>"
SEND_EMAILS_IN_DEV=true
DEV_EMAIL=your_dev_email@gmail.com
```

### Site Configuration
```env
SITE_URL=http://localhost:3000
SITE_NAME="Your Portfolio"
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🎯 Admin Panel

Access your admin dashboard at `/admin/login`

### Admin Features
- **📊 Dashboard**: Overview and analytics
- **👤 Profile**: Personal information management
- **💼 Experience**: Work history and career timeline
- **🚀 Projects**: Portfolio projects with rich media
- **🛠️ Skills**: Technical and soft skills
- **🏆 Achievements**: Awards and accomplishments
- **📬 Contacts**: Contact form submissions
- **🔒 Security**: Password management and security settings

### Content Management
- ✅ Real-time updates
- ✅ Image upload and management
- ✅ Rich text editing
- ✅ Drag-and-drop interfaces
- ✅ Preview before publishing
- ✅ Bulk operations

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Automated Setup** (Windows)
   ```bash
   ./setup-vercel-env.bat
   ```

2. **Manual Setup**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

3. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Use the `VERCEL_SETUP.md` guide for detailed instructions

### Deploy to Other Platforms

The portfolio works on any platform that supports Next.js:
- **Netlify**: Use `npm run build && npm run start`
- **AWS Amplify**: Connect your GitHub repository
- **Railway**: Deploy with zero configuration
- **DigitalOcean App Platform**: Use the App Spec

## 🎨 Customization

### Theme Customization

Edit `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // Add your brand colors
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

### Component Customization

```typescript
// components/Hero.tsx
export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      {/* Customize your hero section */}
    </section>
  )
}
```

### Content Management

Update content through:
1. **Admin Panel** (recommended)
2. **Direct JSON editing** in `data/` directory
3. **API calls** for programmatic updates

## 📁 Project Structure

```
portfolio-template/
├── 📁 app/                     # Next.js App Router
│   ├── 📁 admin/              # Admin panel pages
│   │   ├── 📁 dashboard/      # Dashboard page
│   │   ├── 📁 profile/        # Profile management
│   │   ├── 📁 projects/       # Project management
│   │   └── 📁 ...             # Other admin pages
│   ├── 📁 api/                # API routes
│   │   ├── 📁 auth/           # Authentication
│   │   ├── 📁 portfolio/      # Portfolio data
│   │   └── 📁 contact/        # Contact form
│   └── 📄 layout.tsx          # Root layout
├── 📁 components/             # Reusable components
│   ├── 📄 Hero.tsx            # Hero section
│   ├── 📄 About.tsx           # About section
│   ├── 📄 Projects.tsx        # Projects showcase
│   └── 📄 ...                 # Other components
├── 📁 lib/                    # Utilities and configs
│   ├── 📄 firebase.ts         # Firebase configuration
│   ├── 📄 analytics.ts        # Analytics setup
│   └── 📄 ...                 # Other utilities
├── 📁 data/                   # Static data files
├── 📁 public/                 # Static assets
├── 📁 types/                  # TypeScript definitions
└── 📄 package.json            # Dependencies
```

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm run generate-hash` | Generate admin password hash |

## 🚀 Advanced Features

### Performance Optimization
- ⚡ Image optimization with Next.js Image component
- 🗜️ Automatic code splitting and lazy loading
- 📦 Bundle analysis and optimization
- 🔄 Service worker for offline functionality

### SEO & Analytics
- 🎯 Dynamic meta tags and Open Graph
- 📊 Google Analytics with custom events
- 🗺️ Automatic sitemap generation
- 🔍 Structured data for search engines

### Security
- 🔒 CSRF protection
- 🛡️ Input validation and sanitization
- 🔐 Secure authentication with NextAuth.js
- 🚨 Rate limiting on API routes

## 📋 Best Practices

### Development
- Use TypeScript for type safety
- Follow the component-driven development approach
- Implement proper error handling
- Write meaningful commit messages

### Performance
- Optimize images and assets
- Use proper loading states
- Implement progressive enhancement
- Monitor Core Web Vitals

### Security
- Never commit sensitive data
- Use environment variables for secrets
- Implement proper authentication
- Validate all inputs

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Write tests** (if applicable)
5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write clear, descriptive commit messages
- Update documentation for new features
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support & Community

- 🐛 **Bug Reports**: [Open an issue](https://github.com/KyawMyo78/portfolio-template/issues)
- 💡 **Feature Requests**: [Request a feature](https://github.com/KyawMyo78/portfolio-template/issues)
- 💬 **Discussions**: [Join the discussion](https://github.com/KyawMyo78/portfolio-template/discussions)
- 📧 **Email**: [kyawmk787@gmail.com](mailto:kyawmk787@gmail.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Firebase](https://firebase.google.com/) - Backend as a Service
- [Vercel](https://vercel.com/) - Deployment platform
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## ⭐ Show Your Support

If this template helped you create an amazing portfolio, please give it a star on GitHub! It helps others discover this project.

[![GitHub stars](https://img.shields.io/github/stars/KyawMyo78/portfolio-template?style=social)](https://github.com/KyawMyo78/portfolio-template)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/KyawMyo78">Kyaw Myo</a></p>
  <p>© 2024 Portfolio Template. All rights reserved.</p>
</div>
