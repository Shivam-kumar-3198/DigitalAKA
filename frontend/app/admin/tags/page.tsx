'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { DataTable } from '@/components/admin/data-table';
import { Plus } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
  slug: string;
  postsCount: number;
  createdAt: string;
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const data = await apiClient.get<Tag[]>('/tags');
      setTags(data);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    try {
      const data = await apiClient.post<Tag>('/tags', { name: newTag });
      setTags([...tags, data]);
      setNewTag('');
    } catch (error) {
      console.error('Failed to add tag:', error);
    }
  };

  const handleDelete = async (tag: Tag) => {
    if (confirm(`Delete "${tag.name}"?`)) {
      try {
        await apiClient.delete(`/tags/${tag.id}`);
        setTags(tags.filter((t) => t.id !== tag.id));
      } catch (error) {
        console.error('Failed to delete tag:', error);
      }
    }
  };

  const columns = [
    { key: 'name' as const, label: 'Name' },
    { key: 'slug' as const, label: 'Slug' },
    {
      key: 'postsCount' as const,
      label: 'Posts',
      render: (value: number) => (
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
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
      <h1 className="text-3xl font-bold text-slate-900">Tags</h1>

      {/* Add Tag Form */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <form onSubmit={handleAddTag} className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter new tag name..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} /> Add
          </button>
        </form>
      </div>

      {/* Tags Table */}
      <DataTable<Tag>
        columns={columns}
        data={tags}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
}
