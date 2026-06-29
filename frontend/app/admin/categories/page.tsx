'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { DataTable } from '@/components/admin/data-table';
import { Plus } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  postsCount: number;
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await apiClient.get<Category[]>('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const data = await apiClient.post<Category>('/categories', {
        name: newCategory,
      });
      setCategories([...categories, data]);
      setNewCategory('');
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleDelete = async (category: Category) => {
    if (confirm(`Delete "${category.name}"?`)) {
      try {
        await apiClient.delete(`/categories/${category.id}`);
        setCategories(categories.filter((c) => c.id !== category.id));
      } catch (error) {
        console.error('Failed to delete category:', error);
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
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
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
      <h1 className="text-3xl font-bold text-slate-900">Categories</h1>

      {/* Add Category Form */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <form onSubmit={handleAddCategory} className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category name..."
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

      {/* Categories Table */}
      <DataTable<Category>
        columns={columns}
        data={categories}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
}
