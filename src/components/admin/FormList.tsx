import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AdminLayout } from './Layout';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { useNavigate } from 'react-router-dom';
import { Eye, Search, ArrowUpDown, Trash2, Plus } from 'lucide-react';

interface Form {
  id: string;
  companyName: string;
  submittedAt: string;
  status: string;
}

export function FormList() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; formId: string; companyName: string }>({
    isOpen: false,
    formId: '',
    companyName: ''
  });

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const formsRef = collection(db, 'forms');
        const q = query(formsRef, orderBy('submittedAt', sortOrder));
        const snapshot = await getDocs(q);
        const formsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Form[];
        setForms(formsData);
      } catch (error) {
        console.error('Error fetching forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [sortOrder]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'forms', deleteModal.formId));
      setForms(forms.filter(form => form.id !== deleteModal.formId));
      setDeleteModal({ isOpen: false, formId: '', companyName: '' });
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const filteredForms = forms.filter(form => 
    form.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-[#002F49]">Form Submissions</h1>
            <p className="text-gray-600 mt-1">
              View and manage Delaware Franchise Tax Report submissions
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/forms/new')}
            className="flex items-center gap-2 px-4 py-2 bg-[#002F49] text-white rounded-lg
                     hover:bg-[#003a5d] transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Form
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002F49] focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <ArrowUpDown className="w-5 h-5" />
            Sort by Date
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {form.companyName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(form.submittedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${form.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/forms/${form.id}`)}
                        className="text-[#002F49] hover:text-[#003a5d] transition-colors p-1"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeleteModal({ 
                          isOpen: true, 
                          formId: form.id, 
                          companyName: form.companyName 
                        })}
                        className="text-red-600 hover:text-red-700 transition-colors p-1"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DeleteConfirmModal
          isOpen={deleteModal.isOpen}
          companyName={deleteModal.companyName}
          onConfirm={handleDelete}
          onCancel={() => setDeleteModal({ isOpen: false, formId: '', companyName: '' })}
        />
      </div>
    </AdminLayout>
  );
}