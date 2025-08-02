# Portfolio Template Setup Guide

## 🚀 Quick Setup Guide

### 1. Initial Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 2. Firebase Configuration

1. **Create Firebase Project**:
   - Visit [Firebase Console](https://console.firebase.google.com)
   - Click "Create a project"
   - Follow the setup wizard

2. **Enable Firestore**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode"

3. **Get Web App Config**:
   - Project Settings → General
   - Add a web app
   - Copy the config values to `.env.local`

4. **Generate Service Account**:
   - Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Extract the required values for `.env.local`

### 3. Email Configuration

1. **Gmail Setup**:
   - Enable 2-Factor Authentication
   - Generate App Password:
     - Google Account → Security → 2-Step Verification → App passwords
     - Generate password for "Mail"
   - Add credentials to `.env.local`

### 4. Admin Authentication

1. **Generate Password Hash**:
   ```bash
   node scripts/generate-hash.js your_desired_password
   ```

2. **Generate JWT Secret**:
   ```bash
   # Use any random string generator or:
   openssl rand -base64 32
   ```

3. **Update .env.local**:
   - Add the hash to `ADMIN_PASSWORD_HASH`
   - Add JWT secret to `JWT_SECRET`

### 5. Development

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
# Admin dashboard: http://localhost:3000/admin
```

### 6. Deployment (Vercel)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect GitHub repo to Vercel
   - Add all environment variables in Vercel dashboard
   - Deploy

3. **Environment Variables for Vercel**:
   - Copy all values from `.env.local`
   - Add them in Vercel Project Settings → Environment Variables
   - Update `NEXT_PUBLIC_BASE_URL` to your domain

## 🎯 Customization

### Update Content

1. **Profile Image**: Replace `public/profile.jpg`
2. **Hero Section**: Edit `components/Hero.tsx`
3. **About Section**: Edit `components/About.tsx`
4. **Static Data**: Update files in `data/` directory

### Styling

1. **Colors**: Update `tailwind.config.js`
2. **Fonts**: Modify in `app/layout.tsx`
3. **Components**: Customize in `components/` directory

### Data Management

- Access admin dashboard at `/admin`
- Update all content through the admin interface
- Contact form submissions appear in admin

## 🔧 Environment Variables Reference

```env
# Firebase Web Config
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_CLIENT_EMAIL=

# Authentication
ADMIN_PASSWORD_HASH=
JWT_SECRET=

# Email
EMAIL_USER=
EMAIL_PASS=

# URL
NEXT_PUBLIC_BASE_URL=
```

## 📱 Features Included

- ✅ Responsive design
- ✅ Admin dashboard
- ✅ Contact form with email
- ✅ Password reset functionality  
- ✅ Firebase integration
- ✅ SEO optimization
- ✅ Performance optimization
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Framer Motion animations

## 🆘 Troubleshooting

### Build Errors
- Check all environment variables are set
- Verify Firebase configuration
- Ensure all dependencies are installed

### Admin Login Issues
- Verify password hash generation
- Check JWT secret is set
- Ensure middleware is configured

### Email Not Working
- Verify Gmail app password
- Check email credentials
- Ensure Gmail account has 2FA enabled

Need help? Check the full README.md for detailed troubleshooting steps.
