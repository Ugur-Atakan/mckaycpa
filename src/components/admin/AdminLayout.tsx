import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';
import { auth } from '../../config/firebase';

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
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#002F49] text-white p-6">
        <div className="mb-8">
          <img
            src="https://mckaycpa.com/wp-content/uploads/2024/04/mckay-logo-1.png"
            alt="McKay CPA Logo"
            className="w-32"
          />
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${location.pathname === item.path 
                  ? 'bg-white/10' 
                  : 'hover:bg-white/5'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 
                   text-red-300 hover:text-red-200 transition-colors mt-auto absolute bottom-6"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}