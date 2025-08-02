# 🚀 Portfolio Template

> A modern, professional portfolio website template built with Next.js 14, TypeScript, and Firebase.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange)

## ✨ Features

- 🎨 **Modern Design** - Clean, responsive UI with Tailwind CSS
- 🔐 **Admin Dashboard** - Full CRUD operations for content management  
- 📧 **Contact Form** - Working contact form with email notifications
- 🔒 **Authentication** - Secure admin login with JWT and bcrypt
- 🔄 **Password Reset** - Email-based password reset functionality
- 📱 **Mobile First** - Responsive design that works on all devices
- ⚡ **Performance** - Optimized with Next.js 14 and Framer Motion
- 🔍 **SEO Ready** - Meta tags and structured data included

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: JWT + bcrypt
- **Email**: Nodemailer
- **Animations**: Framer Motion
- **Deployment**: Vercel Ready

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the template
git clone <your-repo-url>
cd portfolio-template

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your configuration
```

### 3. Firebase Configuration

1. Create a [Firebase project](https://console.firebase.google.com)
2. Enable Firestore Database
3. Generate service account key
4. Add configuration to `.env.local`

### 4. Admin Setup

```bash
# Generate password hash
node scripts/generate-hash.js your_password

# Add the hash to .env.local
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

## 📁 Project Structure

```
├── app/                 # Next.js 14 app directory
│   ├── admin/          # Admin dashboard
│   ├── api/            # API routes  
│   └── page.tsx        # Main portfolio
├── components/         # React components
├── data/              # Static data
├── lib/               # Utilities
├── public/            # Static assets
└── scripts/           # Helper scripts
```

## 🎯 Usage

### Admin Dashboard

Access the admin dashboard at `/admin` to:

- ✏️ Update profile information
- 📝 Manage projects and experience
- 🏆 Add achievements and skills
- 📬 View contact form submissions

### Customization

1. **Profile Image**: Replace `public/profile.jpg`
2. **Colors**: Update `tailwind.config.js`  
3. **Content**: Use admin dashboard or edit `data/` files
4. **Styling**: Modify components in `components/`

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

- **Netlify**: Supports Node.js functions
- **Railway**: Easy deployment with GitHub
- **Digital Ocean**: App Platform support

## 📧 Email Configuration

Setup Gmail for contact form:

1. Enable 2-Factor Authentication
2. Generate App Password
3. Add credentials to `.env.local`

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_*` | Firebase web config | ✅ |
| `FIREBASE_ADMIN_*` | Firebase admin SDK | ✅ |
| `ADMIN_PASSWORD_HASH` | Bcrypt hashed password | ✅ |
| `JWT_SECRET` | JWT signing secret | ✅ |
| `EMAIL_USER` | Gmail address | ✅ |
| `EMAIL_PASS` | Gmail app password | ✅ |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Support

If this template helped you, please consider giving it a star!

---

**Happy coding! 🎉**

*Built with ❤️ by developers, for developers*
