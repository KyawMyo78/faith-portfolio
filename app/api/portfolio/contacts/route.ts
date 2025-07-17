import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const contactsRef = adminDb.collection('portfolio').doc('data');
    const doc = await contactsRef.get();
    
    if (!doc.exists) {
      return NextResponse.json({
        success: true,
        data: []
      });
    }

    const data = doc.data();
    const contacts = data?.contacts || [];

    // Sort by creation date (most recent first)
    const sortedContacts = contacts.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json({
      success: true,
      data: sortedContacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contactData = await request.json();

    // Validation
    if (!contactData.name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!contactData.email?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!contactData.subject?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Subject is required' },
        { status: 400 }
      );
    }

    if (!contactData.message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate ID for new contact message
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Prepare contact object
    const newContact = {
      id: contactId,
      name: contactData.name.trim(),
      email: contactData.email.trim().toLowerCase(),
      phone: contactData.phone?.trim() || null,
      subject: contactData.subject.trim(),
      message: contactData.message.trim(),
      isRead: false,
      isStarred: false,
      isArchived: false,
      replied: false,
      replyMessage: null,
      replyDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Get current portfolio data
    const portfolioRef = adminDb.collection('portfolio').doc('data');
    const doc = await portfolioRef.get();
    
    let currentData = {};
    if (doc.exists) {
      currentData = doc.data() || {};
    }

    // Add new contact to the array
    const currentContacts = (currentData as any).contacts || [];
    const updatedContacts = [...currentContacts, newContact];

    // Update the document
    await portfolioRef.set({
      ...currentData,
      contacts: updatedContacts,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return NextResponse.json({
      success: true,
      data: newContact,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
