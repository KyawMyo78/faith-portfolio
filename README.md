# Phillip Portfolio

A modern, minimalist portfolio website for Kyaw Myo Khant (Phillip), built with Ne6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**14, TypeScript, Tailwind CSS, and Firebase.

## Features

### Public Portfolio Website
- **Modern Design**: Clean, minimalist interface with bold typography and smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Sections**:
  - Hero/Home - Introduction with profile image and key information
  - About - Personal background, education, and achievements
  - Skills - Technical skills organized by categories
  - Experience - Work experience and tutoring background
  - Projects - Showcase of personal and academic projects
  - Contact - Contact form and social links

### Admin Panel (Protected)
- **Secure Authentication**: JWT-based authentication system
- **Content Management**: 
  - Add, edit, and delete projects
  - Manage skills and experience entries
  - Upload and manage achievements
  - Handle contact form submissions
- **Image Upload**: Firebase Storage integration for media management
- **Dashboard**: Overview of portfolio statistics and recent activities

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Backend**: Next.js API routes
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: NextAuth.js with custom providers
- **Analytics**: Google Analytics 4 with custom event tracking
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel/Azure deployment

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my_portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
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
   ADMIN_EMAIL=phillip@example.com
   ADMIN_PASSWORD_HASH=$2a$12$hashed_password_here

   # Google Analytics (Optional)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

   # Site Configuration
   SITE_URL=http://localhost:3000
   SITE_NAME="Phillip - Portfolio"
   ```

4. **Set up Firebase**
   - Create a new Firebase project
   - Enable Firestore Database
   - Enable Storage
   - Create a service account and download the credentials
   - Update the environment variables with your Firebase config

5. **Set up Google Analytics (Optional)**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property for your website
   - Get your Measurement ID (format: G-XXXXXXXXXX)
   - Add it to your `.env.local` as `NEXT_PUBLIC_GA_ID`

6. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my_portfolio/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── login/
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── skills/
│   │   └── contact/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── admin/
├── lib/
│   ├── firebase.ts
│   ├── firebase-admin.ts
│   └── auth.ts
├── types/
│   └── index.ts
└── utils/
    └── helpers.ts
```

## Key Features Implemented

### 🎨 Design System
- Custom Tailwind CSS configuration
- Consistent color palette and typography
- Reusable component classes
- Responsive breakpoints

### 🔐 Security
- Secure admin authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration

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

### 📊 Analytics & Tracking
- Google Analytics 4 integration
- Custom event tracking for user interactions
- Contact form conversion tracking
- Project engagement metrics
- Scroll depth and time on site tracking
- Admin dashboard usage analytics

## Admin Panel Access

To access the admin panel:

1. Navigate to `/admin/login`
2. Use the credentials configured in your environment variables
3. Manage portfolio content through the dashboard

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Azure Static Web Apps
1. Configure GitHub Actions for deployment
2. Set up environment variables
3. Deploy to Azure

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
| `NEXT_PUBLIC_GA_ID` | Google Analytics Tracking ID | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for personal portfolio use. Feel free to use it as inspiration for your own portfolio.

## Support

For any questions or issues, please contact:
- Email: [Admin Email from Environment]
- GitHub: [Your GitHub Profile]

---

**Built with ❤️ by Kyaw Myo Khant (Phillip)**
