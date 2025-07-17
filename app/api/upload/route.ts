import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
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

    // Determine upload directory based on type
    let uploadDir = '';
    let finalFileName = '';
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

    switch (uploadType) {
      case 'profile':
        uploadDir = path.join(process.cwd(), 'public');
        finalFileName = `profile.${fileExtension}`;
        break;
      case 'project':
        uploadDir = path.join(process.cwd(), 'public', 'projects');
        finalFileName = fileName || `project-${Date.now()}.${fileExtension}`;
        break;
      case 'general':
        uploadDir = path.join(process.cwd(), 'public', 'uploads');
        finalFileName = fileName || `cv-${Date.now()}.${fileExtension}`;
        break;
      default:
        return NextResponse.json({ 
          success: false, 
          message: 'Invalid upload type' 
        }, { status: 400 });
    }

    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Write file
    const filePath = path.join(uploadDir, finalFileName);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = uploadType === 'profile' 
      ? `/${finalFileName}`
      : uploadType === 'project' 
        ? `/projects/${finalFileName}`
        : `/uploads/${finalFileName}`;

    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully',
      url: publicUrl,
      fileName: finalFileName
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Upload failed' 
    }, { status: 500 });
  }
}
