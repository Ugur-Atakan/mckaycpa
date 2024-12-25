import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#002F49]/10 rounded-lg">
          <Icon className="w-6 h-6 text-[#002F49]" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-[#002F49] mt-1">{value}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}