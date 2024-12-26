import { collection, addDoc, doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function submitForm(data: any) {
  try {
    const formData = {
      ...data,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      verification: null
    };

    const docRef = await addDoc(collection(db, 'forms'), formData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}

export function subscribeToFormUpdates(formId: string, callback: (data: any) => void) {
  const unsubscribe = onSnapshot(doc(db, 'forms', formId), (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    }
  });

  return unsubscribe;
}

export async function updateFormData(formId: string, data: any) {
  console.log('Updating form data:', data); // Debugging purposes
  try {
    const formRef = doc(db, 'forms', formId);
    const docSnap = await getDoc(formRef);
    
    if (!docSnap.exists()) {
      throw new Error('Form not found');
    }

    // Update the document with new data and timestamp
    const updateData = {
      ...data,
      lastModified: new Date().toISOString()
    };

    await updateDoc(formRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating form:', error);
    throw error;
  }
}

export async function getFormById(formId: string):Promise<any> {
  try {
    const docRef = doc(db, 'forms', formId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting form:', error);
    throw error;
  }
}

export async function updateFormStatus(formId: string, status: string) {
  try {
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      status,
      lastModified: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating form status:', error);
    throw error;
  }
}

export async function updateVerificationStatus(formId: string, submitter: string) {
  try {
    const formRef = doc(db, 'forms', formId);
    await updateDoc(formRef, {
      'verification.status': 'verified',
      'verification.submitter': submitter,
      status: 'client_reviewed',
      clientVerifiedAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating verification status:', error);
    throw error;
  }
}