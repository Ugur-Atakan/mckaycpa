import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AdminLayout } from './Layout';
import { useNavigate } from 'react-router-dom';
import { SinglePageForm } from './FormNew/SinglePageForm';

export function FormNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'forms'), {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      });
      navigate(`/admin/forms/${docRef.id}`);
    } catch (error) {
      console.error('Error creating form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 flex items-center justify-center">
          <div className="text-gray-600">Creating form...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#002F49]">New Form Submission</h1>
          <p className="text-gray-600 mt-1">
            Create a new Delaware Franchise Tax Report submission
          </p>
        </div>

        <SinglePageForm onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
}