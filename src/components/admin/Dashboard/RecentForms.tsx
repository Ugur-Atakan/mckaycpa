import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Form {
  id: string;
  companyName: string;
  submittedAt: string;
  status: string;
}

interface RecentFormsProps {
  forms: Form[];
}

export function RecentForms({ forms }: RecentFormsProps) {
  const navigate = useNavigate();

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
                  Submitted {new Date(form.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium
                  ${form.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                  }`}
                >
                  {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
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