import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { nanoid } from 'nanoid';

export async function generateVerificationLink(formId: string) {
  try {
    const token = nanoid(32);
    const formRef = doc(db, 'forms', formId);
    
    await updateDoc(formRef, {
      status: 'awaiting_client',
      verification: {
        token,
        createdAt: new Date().toISOString(),
        status: 'pending',
        submitter: null
      },
      lastModified: new Date().toISOString()
    });

    const baseUrl = window.location.origin;
    return `${baseUrl}/verify/${formId}/${token}`;
  } catch (error) {
    console.error('Error generating verification link:', error);
    throw error;
  }
}

export async function verifyToken(formId: string, token: string) {
  try {
    const formRef = doc(db, 'forms', formId);
    const docSnap = await getDoc(formRef);
    
    if (!docSnap.exists()) {
      console.error('Form not found');
      return false;
    }
    
    const data = docSnap.data();
    
    // Check if verification exists
    if (!data.verification) {
      console.error('Verification not found');
      return false;
    }

    // Check if token matches
    if (data.verification.token !== token) {
      console.error('Invalid token');
      return false;
    }

    // Check if already verified
    if (data.verification.status === 'verified') {
      console.error('Form already verified');
      return false;
    }

    // Check if expired (7  Days)
    const createdAt = new Date(data.verification.createdAt).getTime();
    const now = new Date().getTime();
    const expirationTime = 7*24 * 60 * 60 * 1000; // 7 days in milliseconds
    
    if (now - createdAt > expirationTime) {
      console.error('Verification link expired');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}

export async function updateVerificationStatus(formId: string, submitter: string) {
  try {
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      'verification.status': 'verified',
      'verification.submitter': submitter,
      'verification.verifiedAt': new Date().toISOString(),
      status: 'client_reviewed',
      lastModified: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating verification status:', error);
    throw error;
  }
}