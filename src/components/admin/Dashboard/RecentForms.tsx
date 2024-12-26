import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Form {
  id: string;
  companyName: string;
  submittedAt: string;
  lastModified: string;
  status: string;
}

interface RecentFormsProps {
  forms: Form[];
}

export function RecentForms({ forms }: RecentFormsProps) {
  const navigate = useNavigate();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'awaiting_client':
        return 'bg-purple-100 text-purple-800';
      case 'client_reviewed':
        return 'bg-emerald-100 text-emerald-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'awaiting_client':
        return 'Waiting Client';
      case 'client_reviewed':
        return 'Client Reviewed';
      case 'completed':
        return 'Completed';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[#002F49]">Recent Submissions</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {forms.map((form) => (
          <div
            key={form.id}
            className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => navigate(`/admin/forms/${form.id}`)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{form.companyName}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Last modified {new Date(form.lastModified).toLocaleDateString()} at{' '}
                  {new Date(form.lastModified).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(form.status)}`}>
                  {getStatusLabel(form.status)}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}