'use client';

import React, { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Sparkles, Copy, Loader } from 'lucide-react';

interface AIResult {
  title: string;
  description: string;
  keywords: string[];
  content?: string;
}

export default function AIToolsPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [activeTab, setActiveTab] = useState<'blog' | 'meta'>('blog');

  const generateBlogContent = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const data = await apiClient.post<AIResult>('/ai/generate-blog', { topic });
      setResult(data);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMetaTags = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const data = await apiClient.post<AIResult>('/ai/generate-meta', {
        topic,
      });
      setResult(data);
    } catch (error) {
      console.error('Failed to generate meta tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="text-yellow-500" /> AI Tools
        </h1>
        <p className="text-slate-600 mt-1">
          Generate content using AI-powered tools
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'blog'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Blog Generator
          </button>
          <button
            onClick={() => setActiveTab('meta')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'meta'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            Meta Generator
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Topic or Title
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={
                activeTab === 'blog'
                  ? "Enter blog topic..."
                  : "Enter page title..."
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={
              activeTab === 'blog' ? generateBlogContent : generateMetaTags
            }
            disabled={loading || !topic.trim()}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 flex items-center justify-center gap-2"
          >
            {loading && <Loader size={20} className="animate-spin" />}
            {loading
              ? 'Generating...'
              : `Generate ${activeTab === 'blog' ? 'Blog' : 'Meta'}`}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Generated Content</h2>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Title</label>
              <button
                onClick={() => copyToClipboard(result.title)}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
              >
                <Copy size={16} /> Copy
              </button>
            </div>
            <p className="p-3 bg-slate-50 rounded text-slate-900">
              {result.title}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>
              <button
                onClick={() => copyToClipboard(result.description)}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
              >
                <Copy size={16} /> Copy
              </button>
            </div>
            <textarea
              value={result.description}
              readOnly
              className="w-full p-3 bg-slate-50 rounded text-slate-900 text-sm"
              rows={4}
            />
          </div>

          {result.content && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">
                  Content
                </label>
                <button
                  onClick={() => copyToClipboard(result.content || '')}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                >
                  <Copy size={16} /> Copy
                </button>
              </div>
              <textarea
                value={result.content}
                readOnly
                className="w-full p-3 bg-slate-50 rounded text-slate-900 text-sm"
                rows={6}
              />
            </div>
          )}

          {result.keywords && result.keywords.length > 0 && (
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Keywords
              </label>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
            Use This Content
          </button>
        </div>
      )}
    </div>
  );
}
