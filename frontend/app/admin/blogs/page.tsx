'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { DataTable } from '@/components/admin/data-table';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  status: 'draft' | 'published';
  views: number;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await apiClient.get<Blog[]>('/blogs');
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (blog: Blog) => {
    if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      try {
        await apiClient.delete(`/blogs/${blog.id}`);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    }
  };

  const columns = [
    {
      key: 'title' as const,
      label: 'Title',
    },
    {
      key: 'author' as const,
      label: 'Author',
    },
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
      key: 'views' as const,
      label: 'Views',
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: 'createdAt' as const,
      label: 'Created',
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-600 mt-1">Manage all blog content</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} /> New Post
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <DataTable<Blog>
        columns={columns}
        data={filteredBlogs}
        loading={loading}
        onDelete={handleDelete}
        onEdit={(blog) => (window.location.href = `/admin/blogs/${blog.id}`)}
      />
    </div>
  );
}
