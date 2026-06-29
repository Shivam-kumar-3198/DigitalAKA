'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import {
  Users,
  FileText,
  Image,
  TrendingUp,
  Calendar,
  Eye,
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalPages: number;
  totalMedia: number;
  totalViews: number;
}

interface StatCard {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiClient.get<DashboardStats>('/admin/dashboard');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards: StatCard[] = [
    {
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: <Users size={24} />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Blogs',
      value: stats?.totalBlogs || 0,
      icon: <FileText size={24} />,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Pages',
      value: stats?.totalPages || 0,
      icon: <FileText size={24} />,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Media Files',
      value: stats?.totalMedia || 0,
      icon: <Image size={24} />,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      label: 'Total Views',
      value: stats?.totalViews || 0,
      icon: <Eye size={24} />,
      color: 'bg-pink-100 text-pink-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back! Here&apos;s your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{card.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {typeof card.value === 'number'
                    ? card.value.toLocaleString()
                    : card.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.color}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <a
              href="/admin/blogs/new"
              className="block p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700 font-medium"
            >
              + Create New Blog Post
            </a>
            <a
              href="/admin/pages/new"
              className="block p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-green-700 font-medium"
            >
              + Create New Page
            </a>
            <a
              href="/admin/users"
              className="block p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors text-purple-700 font-medium"
            >
              + Manage Users
            </a>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            System Information
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Environment</span>
              <span className="font-medium text-slate-900">Production</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">API Version</span>
              <span className="font-medium text-slate-900">v1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Last Updated</span>
              <span className="font-medium text-slate-900">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Status</span>
              <span className="font-medium text-green-600">✓ Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
