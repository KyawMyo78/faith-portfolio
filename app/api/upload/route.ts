import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: storageBucket,
  });
}

// Get storage instance
const storage = getStorage();

export async function POST(request: NextRequest) {
  try {
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const uploadType: string | null = data.get('uploadType') as string;
    const fileName: string | null = data.get('fileName') as string;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file received' }, { status: 400 });
    }

    // Validate file type based on upload type
    let allowedTypes: string[] = [];
    let maxSize: number = 5 * 1024 * 1024; // Default 5MB

    if (uploadType === 'general') {
      // For CV/documents
      allowedTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      maxSize = 10 * 1024 * 1024; // 10MB for documents
    } else {
      // For images
      allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      maxSize = 5 * 1024 * 1024; // 5MB for images
    }

    if (!allowedTypes.includes(file.type)) {
      const typeMessage = uploadType === 'general' 
        ? 'Invalid file type. Only PDF, DOC, and DOCX are allowed for documents.'
        : 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed for images.';
      return NextResponse.json({ 
        success: false, 
        message: typeMessage
      }, { status: 400 });
    }

    // Validate file size
    if (file.size > maxSize) {
      const sizeLimit = uploadType === 'general' ? '10MB' : '5MB';
      return NextResponse.json({ 
        success: false, 
        message: `File too large. Maximum size is ${sizeLimit}.` 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine file path and name for Firebase Storage
    let storagePath = '';
    let finalFileName = '';
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

    switch (uploadType) {
      case 'profile':
        storagePath = 'images';
        finalFileName = `profile.${fileExtension}`;
        break;
      case 'project':
        storagePath = 'images/projects';
        finalFileName = fileName || `project-${Date.now()}.${fileExtension}`;
        break;
      case 'general':
        storagePath = 'documents';
        finalFileName = fileName || `cv-${Date.now()}.${fileExtension}`;
        break;
      default:
        return NextResponse.json({ 
          success: false, 
          message: 'Invalid upload type' 
        }, { status: 400 });
    }

    // Upload to Firebase Storage
    if (!bucketName) {
      return NextResponse.json({ 
        success: false, 
        message: 'Firebase Storage bucket not configured' 
      }, { status: 500 });
    }

    // Try to get the default bucket first, then fallback to named bucket
    let bucket;
    try {
      bucket = storage.bucket(); // Use default bucket from initialization
    } catch (error) {
      bucket = storage.bucket(bucketName);
    }
    
    const fileRef = bucket.file(`${storagePath}/${finalFileName}`);
    
    // Upload the file
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          uploadType: uploadType,
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
        }
      }
    });

    // Make the file publicly accessible
    await fileRef.makePublic();

    // Get the public URL
    const actualBucketName = bucket.name;
    const publicUrl = `https://storage.googleapis.com/${actualBucketName}/${storagePath}/${finalFileName}`;

    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully',
      url: publicUrl,
      fileName: finalFileName,
      storagePath: `${storagePath}/${finalFileName}`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
