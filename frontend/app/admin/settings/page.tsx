'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions'>('roles');
  const [roles, setRoles] = useState([
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access',
      users: 2,
    },
    {
      id: '2',
      name: 'Editor',
      description: 'Can create and edit content',
      users: 5,
    },
    {
      id: '3',
      name: 'Viewer',
      description: 'Read-only access',
      users: 10,
    },
  ]);

  const [permissions, setPermissions] = useState([
    {
      id: '1',
      name: 'Create Posts',
      resource: 'blogs',
      action: 'create',
    },
    {
      id: '2',
      name: 'Edit Posts',
      resource: 'blogs',
      action: 'edit',
    },
    {
      id: '3',
      name: 'Delete Posts',
      resource: 'blogs',
      action: 'delete',
    },
    {
      id: '4',
      name: 'Manage Users',
      resource: 'users',
      action: 'manage',
    },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'roles'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Roles & Permissions
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'permissions'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          All Permissions
        </button>
      </div>

      {/* Content */}
      {activeTab === 'roles' ? (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Role Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr
                    key={role.id}
                    className="border-b border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-3 text-sm font-medium text-slate-900">
                      {role.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-700">
                      {role.description}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-700">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {role.users}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <button className="text-blue-600 hover:text-blue-700">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Permission
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm) => (
                  <tr
                    key={perm.id}
                    className="border-b border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-3 text-sm font-medium text-slate-900">
                      {perm.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-700">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                        {perm.resource}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-700">
                      {perm.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-sm text-blue-800">
        <p className="font-medium mb-1">Role-Based Access Control (RBAC)</p>
        <p>
          Manage user roles and permissions from this panel. Changes take effect
          immediately.
        </p>
      </div>
    </div>
  );
}
