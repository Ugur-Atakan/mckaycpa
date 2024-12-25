import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFDFC] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[400px] space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="https://mckaycpa.com/wp-content/uploads/2024/04/mckay-logo-1.png"
            alt="McKay CPA Logo"
            className="w-48 h-auto"
          />
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-semibold text-[#002F49]">Admin Login</h2>
              <p className="text-sm text-gray-500">
                Sign in to access the admin dashboard
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 
                               focus:ring-2 focus:ring-[#002F49] focus:border-transparent
                               transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 
                               focus:ring-2 focus:ring-[#002F49] focus:border-transparent
                               transition-all"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#002F49] text-white px-6 py-3 rounded-lg font-semibold 
                         hover:bg-[#003a5d] transition-colors shadow-md hover:shadow-lg
                         transform hover:-translate-y-0.5 duration-200"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}