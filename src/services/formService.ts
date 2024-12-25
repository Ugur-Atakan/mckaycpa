import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Officer } from '../components/OfficersStep/types';
import { Director } from '../components/DirectorsStep/types';

interface FormData {
  companyName: string;
  shares: {
    authorizedCommon: string;
    authorizedPreferred: string;
    issuedCommon: string;
    issuedPreferred: string;
  };
  totalAssets: {
    value: string;
    preference: string;
  };
  address: {
    street1: string;
    street2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  officers: Officer[];
  directors: Director[];
  submitter: string;
  submittedAt: string;
  status: 'pending' | 'completed';
}

export async function submitForm(data: FormData) {
  try {
    // Clean up the data before submission
    const cleanData = {
      ...data,
      // Ensure all string fields are trimmed
      companyName: data.companyName.trim(),
      shares: {
        authorizedCommon: data.shares.authorizedCommon.trim(),
        authorizedPreferred: data.shares.authorizedPreferred.trim(),
        issuedCommon: data.shares.issuedCommon.trim(),
        issuedPreferred: data.shares.issuedPreferred.trim(),
      },
      totalAssets: {
        value: data.totalAssets.value.trim(),
        preference: data.totalAssets.preference.trim(),
      },
      address: {
        street1: data.address.street1.trim(),
        street2: data.address.street2.trim(),
        city: data.address.city.trim(),
        state: data.address.state.trim(),
        zipCode: data.address.zipCode.trim(),
        country: data.address.country.trim(),
      },
      // Clean up officers and directors data
      officers: data.officers.map(officer => ({
        ...officer,
        name: officer.name.trim(),
        title: officer.title.trim(),
        address: {
          street1: officer.address.street1.trim(),
          street2: officer.address.street2.trim(),
          city: officer.address.city.trim(),
          state: officer.address.state.trim(),
          zipCode: officer.address.zipCode.trim(),
          country: officer.address.country.trim(),
        },
      })),
      directors: data.directors.map(director => ({
        ...director,
        name: director.name.trim(),
        address: {
          street1: director.address.street1.trim(),
          street2: director.address.street2.trim(),
          city: director.address.city.trim(),
          state: director.address.state.trim(),
          zipCode: director.address.zipCode.trim(),
          country: director.address.country.trim(),
        },
      })),
      submitter: data.submitter.trim(),
      submittedAt: new Date().toISOString(),
      status: 'pending' as const,
    };

    const docRef = await addDoc(collection(db, 'forms'), cleanData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}