import React, { useState } from 'react';
import { AdminLayout } from '../Layout';
import { PasswordChange } from './PasswordChange';
import { Settings as SettingsIcon } from 'lucide-react';

export function SettingsPage() {
  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#002F49]">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-3 text-[#002F49]">
              <SettingsIcon className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Account Security</h2>
            </div>
            
            <PasswordChange />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}