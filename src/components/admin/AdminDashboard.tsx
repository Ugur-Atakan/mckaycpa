import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AdminLayout } from './Layout';
import { StatCard } from './Dashboard/StatCard';
import { RecentForms } from './Dashboard/RecentForms';
import { FileText, Clock, CheckCircle } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0
  });
  const [recentForms, setRecentForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const formsRef = collection(db, 'forms');
        
        // Get recent forms
        const recentQuery = query(formsRef, orderBy('submittedAt', 'desc'), limit(5));
        const recentSnapshot = await getDocs(recentQuery);
        const recentData = recentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentForms(recentData);

        // Calculate stats
        const total = recentSnapshot.size;
        const pending = recentData.filter(form => form.status === 'pending').length;
        const completed = recentData.filter(form => form.status === 'completed').length;
        
        setStats({ total, pending, completed });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#002F49]">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of Delaware Franchise Tax Report submissions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            title="Total Submissions"
            value={stats.total}
            icon={FileText}
          />
          <StatCard
            title="Pending Review"
            value={stats.pending}
            icon={Clock}
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle}
          />
        </div>

        <RecentForms forms={recentForms} />
      </div>
    </AdminLayout>
  );
}