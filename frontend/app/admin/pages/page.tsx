'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { DataTable } from '@/components/admin/data-table';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export default function PagesManagementPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const data = await apiClient.get<Page[]>('/pages');
      setPages(data);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (page: Page) => {
    if (confirm(`Delete "${page.title}"?`)) {
      try {
        await apiClient.delete(`/pages/${page.id}`);
        setPages(pages.filter((p) => p.id !== page.id));
      } catch (error) {
        console.error('Failed to delete page:', error);
      }
    }
  };

  const columns = [
    { key: 'title' as const, label: 'Title' },
    { key: 'slug' as const, label: 'Slug' },
    {
      key: 'status' as const,
      label: 'Status',
      render: (value: string) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            value === 'published'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'createdAt' as const,
      label: 'Created',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pages</h1>
          <p className="text-slate-600 mt-1">Manage static pages</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} /> New Page
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search pages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <DataTable<Page>
        columns={columns}
        data={filteredPages}
        loading={loading}
        onDelete={handleDelete}
        onEdit={(page) => (window.location.href = `/admin/pages/${page.id}`)}
      />
    </div>
  );
}
