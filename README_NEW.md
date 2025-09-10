# Portfolio Template

A modern, minimalist portfolio website template built with Next.js 14, TypeScript, Tailwind CSS, and Firebase.

## Features

### Public Portfolio Website
- **Modern Design**: Clean, minimalist interface with bold typography and smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Sections**:
  - Hero/Home - Introduction with profile image and key information
  - About - Personal background, education, and achievements
  - Skills - Technical skills organized by categories
  - Experience - Work experience and background
  - Projects - Showcase of personal and academic projects
  - Contact - Contact form and social links

### Admin Panel (Protected)
- **Secure Authentication**: JWT-based authentication system
- **Content Management**:
  - Add, edit, and delete projects
  - Manage skills and experience entries
  - Upload and manage achievements
  - Handle contact form submissions
  - Site settings configuration
- **Image Upload**: Firebase Storage integration for media management
- **Dashboard**: Overview of portfolio statistics and recent activities

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/KyawMyo78/portfolio-template.git
   cd portfolio-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration (Client-side)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin (Server-side)
   FIREBASE_PRIVATE_KEY="your_private_key"
   FIREBASE_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
   FIREBASE_PROJECT_ID=your_project_id

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key_here

   # Admin Credentials
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD_HASH=$2a$12$hashed_password_here

   # Email Configuration (for password reset)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM="Portfolio Admin <your-email@gmail.com>"

   # Site Configuration
   SITE_URL=http://localhost:3000
   SITE_NAME="Your Portfolio"

   # Google Analytics (Optional)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Set up Firebase**
   - Create a new Firebase project
   - Enable Firestore Database
   - Enable Storage
   - Create a service account and download the credentials
   - Update the environment variables with your Firebase config

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio-template/
├── app/                        # Next.js App Router pages and routes
│   ├── admin/                  # Admin dashboard and sub-pages (protected)
│   │   ├── achievements/       # Admin CRUD for achievements
│   │   ├── contacts/           # Admin contacts UI
│   │   ├── dashboard/          # Admin dashboard overview
│   │   ├── experience/         # Admin experience entries
│   │   ├── forgot-password/    # Admin forgot-password UI
│   │   ├── login/              # Admin login page
│   │   ├── profile/            # Admin profile editor
│   │   ├── projects/           # Admin projects editor
│   │   ├── reset-password/     # Admin reset-password UI
│   │   ├── site-settings/      # Site-wide settings editor
│   │   └── skills/             # Admin skills editor
│   ├── api/                    # API routes (server-side)
│   │   ├── auth/               # Authentication endpoints
│   │   ├── contact/            # Public contact form endpoint
│   │   ├── portfolio/          # Public portfolio data endpoints
│   │   ├── profile/            # Public profile endpoint
│   │   └── upload/             # File upload endpoint
│   ├── about/                  # About page
│   ├── contact/                # Contact page
│   ├── experience/             # Experience page
│   ├── projects/               # Projects page
│   ├── skills/                 # Skills page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Public home page
├── components/                 # Reusable React components
│   ├── About.tsx
│   ├── Achievements.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── lib/                        # Helpers for external services
│   ├── firebase.ts             # Firebase client initialization
│   └── firebase-admin.ts       # Firebase Admin (server-side)
├── types/                      # Shared TypeScript types
├── utils/                      # Small utility helpers
└── public/                     # Static assets
```

## Admin Panel Access

To access the admin panel:
1. Navigate to `/admin/login`
2. Use the credentials configured in your environment variables
3. Manage portfolio content through the dashboard

## Key Features

### 🎨 Design System
- Custom Tailwind CSS configuration
- Consistent color palette and typography
- Reusable component classes
- Responsive breakpoints

### 🔐 Security
- Secure admin authentication
- Protected API routes
- Input validation and sanitization

### 📱 Performance
- Next.js 14 App Router
- Optimized images with next/image
- Code splitting and lazy loading
- SEO optimization

### 🎭 Animations
- Framer Motion integration
- Smooth page transitions
- Interactive hover effects
- Loading states

### 📊 Analytics
- Google Analytics 4 integration
- Custom event tracking
- Contact form conversion tracking

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Set `SITE_URL` and `NEXTAUTH_URL` to your production URL
5. Deploy

### Other Platforms
The template works with any platform that supports Next.js:
- Netlify
- Azure Static Web Apps
- AWS Amplify
- Railway
- Render

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | Yes |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin Private Key | Yes |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin Client Email | Yes |
| `FIREBASE_PROJECT_ID` | Firebase Project ID (Admin) | Yes |
| `NEXTAUTH_URL` | NextAuth URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth Secret | Yes |
| `ADMIN_EMAIL` | Admin Login Email | Yes |
| `ADMIN_PASSWORD_HASH` | Hashed Admin Password | Yes |
| `EMAIL_HOST` | SMTP Host | Yes |
| `EMAIL_PORT` | SMTP Port | Yes |
| `EMAIL_USER` | SMTP Username | Yes |
| `EMAIL_PASS` | SMTP Password | Yes |
| `EMAIL_FROM` | From Email Address | Yes |
| `SITE_URL` | Your website's production URL | Yes |
| `SITE_NAME` | Your website's name | No |
| `NEXT_PUBLIC_GA_ID` | Google Analytics Tracking ID | No |

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
- Create an issue on GitHub
- Check the documentation
- Review the example configuration

---

**Built with ❤️ using Next.js, TypeScript, and Firebase**
