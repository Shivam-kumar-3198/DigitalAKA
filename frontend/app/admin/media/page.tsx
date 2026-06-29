'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Plus, Upload, Trash2 } from 'lucide-react';

interface MediaFile {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  createdAt: string;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const data = await apiClient.get<MediaFile[]>('/media');
      setFiles(data);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    setUploading(true);
    for (const file of uploadedFiles) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const data = await apiClient.upload<MediaFile>('/media/upload', formData);
        setFiles([...files, data]);
      } catch (error) {
        console.error('Failed to upload file:', error);
      }
    }
    setUploading(false);
  };

  const handleDelete = async (file: MediaFile) => {
    if (confirm(`Delete ${file.filename}?`)) {
      try {
        await apiClient.delete(`/media/${file.id}`);
        setFiles(files.filter((f) => f.id !== file.id));
      } catch (error) {
        console.error('Failed to delete file:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Media Library</h1>
        <p className="text-slate-600 mt-1">Upload and manage your media files</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white p-8 rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors">
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <Upload className="text-slate-400 mb-2" size={32} />
          <span className="text-lg font-medium text-slate-700">
            {uploading ? 'Uploading...' : 'Click to upload or drag files'}
          </span>
          <span className="text-sm text-slate-500 mt-1">
            Supported formats: JPG, PNG, GIF, PDF, DOC
          </span>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
        </label>
      </div>

      {/* Media Grid */}
      {files.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-slate-100 flex items-center justify-center relative group">
                {file.type.startsWith('image/') ? (
                  <img
                    src={file.url}
                    alt={file.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Upload size={32} className="text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-600">{file.type}</p>
                  </div>
                )}
                <button
                  onClick={() => handleDelete(file)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {file.filename}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          No files uploaded yet. Start uploading!
        </div>
      )}
    </div>
  );
}
