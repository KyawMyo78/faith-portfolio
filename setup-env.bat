@echo off
echo Setting up Vercel environment variables...

vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
vercel env add FIREBASE_PRIVATE_KEY
vercel env add FIREBASE_CLIENT_EMAIL
vercel env add FIREBASE_PROJECT_ID
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add ADMIN_EMAIL
vercel env add ADMIN_PASSWORD_HASH

echo All environment variables added!
