# Setup Instructions for Phillip's Portfolio

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Copy the `.env.local` file and update with your actual Firebase credentials:
   
   ```bash
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin (Server-side)
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
   FIREBASE_PROJECT_ID=your_project_id

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_random_secret_key_here

   # Admin Credentials (see below for generating password hash)
   ADMIN_EMAIL=phillip@example.com
   ADMIN_PASSWORD_HASH=$2a$12$your_bcrypt_hashed_password_here

   # Site Configuration
   SITE_URL=http://localhost:3000
   SITE_NAME="Phillip - Portfolio"
   ```

3. **Generate Admin Password Hash**
   
   To generate a secure password hash for admin login:
   
   ```bash
   node -e "
   const bcrypt = require('bcryptjs');
   const password = 'your_secure_password_here';
   bcrypt.hash(password, 12).then(hash => {
     console.log('ADMIN_PASSWORD_HASH=' + hash);
   });
   "
   ```

4. **Set up Firebase**
   
   - Create a new Firebase project at https://console.firebase.google.com
   - Enable Firestore Database
   - Enable Storage
   - Create a service account:
     - Go to Project Settings > Service Accounts
     - Click "Generate new private key"
     - Save the JSON file and extract the values for your .env.local

5. **Add Images**
   
   Add your images to the following directories:
   - `/public/profile-placeholder.jpg` - Your profile photo
   - `/public/projects/` - Project screenshots
   - `/public/resume.pdf` - Your resume file

6. **Run Development Server**
   ```bash
   npm run dev
   ```

7. **Access the Application**
   - **Main Portfolio**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin
   - **Admin Login**: Use the email and password you configured
   
   **Demo Admin Credentials** (for testing):
   - Email: `phillip@example.com`
   - Password: `admin123`
   - ⚠️ **Important**: Change these credentials in production!

## Firebase Setup Details

### Firestore Collections

The application uses these Firestore collections:

- `personalInfo` - Personal information and bio
- `skills` - Technical skills with categories and levels
- `experience` - Work experience and achievements
- `projects` - Project portfolio with images and details
- `contacts` - Contact form submissions
- `achievements` - Awards and certifications

### Storage Setup

Enable Firebase Storage for:
- Project images
- Profile photos
- Resume files
- Achievement certificates

### Security Rules

Add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow reads for all portfolio data
    match /personalInfo/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /skills/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /experience/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Contacts are write-only for public, read for admin
    match /contacts/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Admin Panel

### Default Login
- Email: (set in ADMIN_EMAIL)
- Password: (set when generating ADMIN_PASSWORD_HASH)

### Features
- Dashboard with portfolio statistics
- Content management for all sections
- Contact form submissions
- Image upload and management

## Customization

### Colors and Branding
Edit `tailwind.config.js` to customize:
- Primary color scheme
- Typography
- Spacing and sizing

### Content
Update the default data in components:
- Personal information in Hero and About components
- Skills data in Skills component
- Experience data in Experience component
- Project data in Projects component

### SEO
Update metadata in `app/layout.tsx`:
- Page titles and descriptions
- Open Graph tags
- Site verification codes

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production
Make sure to set all environment variables in your hosting platform with production values.

## Troubleshooting

### Common Issues

1. **Firebase Connection Errors**
   - Verify all Firebase config values
   - Check service account permissions
   - Ensure Firestore is enabled

2. **Build Errors**
   - Run `npm run build` locally to check for issues
   - Verify all environment variables are set
   - Check TypeScript errors with `npm run type-check`

3. **Authentication Issues**
   - Verify NEXTAUTH_SECRET is set
   - Check admin email and password hash
   - Ensure cookies are working (check browser settings)

## Support

For questions or issues:
1. Check the README.md for detailed documentation
2. Review the code comments for implementation details
3. Verify Firebase setup and permissions

## License

This portfolio is created for personal use. Feel free to use it as inspiration for your own portfolio projects.
