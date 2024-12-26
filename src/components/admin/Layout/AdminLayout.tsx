import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import { auth } from '../../../config/firebase';
import { BugReportButton } from '../BugReport/BugReportButton';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/admin');
  };

  const navItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard'
    },
    {
      label: 'Forms',
      icon: FileText,
      path: '/admin/forms'
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed width sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        {/* Fixed position container */}
        <div className="fixed w-64 h-screen flex flex-col">
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Logo */}
            <div className="mb-8">
              <img
                src="https://mckaycpa.com/wp-content/uploads/2024/04/mckay-logo-1.png"
                alt="McKay CPA Logo"
                className="w-32"
              />
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${location.pathname === item.path 
                      ? 'bg-[#002F49] text-white' 
                      : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Fixed bottom buttons */}
          <div className="p-6 border-t border-gray-200 bg-white">
            <div className="space-y-2">
              <BugReportButton />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg
                         text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}