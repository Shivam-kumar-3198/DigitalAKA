'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search as SearchIcon, X, FileText, Loader2 } from 'lucide-react';
import { getAllPosts } from '@/lib/wordpress';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
}
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Search({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all posts once when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const { posts: allPostsData } = await getAllPosts({ fetchAll: true, embed: false, fields: 'slug,title,excerpt' });
      const simplifiedPosts = allPostsData.map(p => ({ slug: p.slug, title: p.title.rendered, excerpt: p.excerpt.rendered.replace(/<[^>]*>/g, '') }));
      setAllPosts(simplifiedPosts);
      setResults(simplifiedPosts.slice(0, 10)); // Show recent posts initially
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
      // Reset query when opening
      setQuery('');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const searchResults = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setResults(searchResults.slice(0, 50)); // Limit displayed results for performance
    } else {
      // Show recent posts if query is short
      setResults(allPosts.slice(0, 10));
    }
  }, [query, allPosts]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Blog Search"
        className="fixed inset-x-0 top-0 z-[100] mx-auto mt-[10vh] w-full max-w-xl animate-in fade-in slide-in-from-top-5"
      >
        <div className="mx-4 flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center gap-2 border-b border-slate-100 p-4">
            <SearchIcon className="h-5 w-5 shrink-0 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blog posts..."
              className="w-full bg-transparent text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              onClick={onClose}
              aria-label="Close search"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-12 text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading posts...</span>
              </div>
            ) : results.length > 0 ? (
              <ul>
                <li className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {query.trim().length > 1 ? 'Search Results' : 'Recent Posts'}
                </li>
                {results.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      onClick={onClose}
                      className="flex items-start gap-4 rounded-lg p-3 text-left transition-colors hover:bg-blue-50"
                    >
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-slate-500 shadow-[0_0_0_1px_#E2E8F0_inset]">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p
                          className="font-semibold text-slate-800"
                          dangerouslySetInnerHTML={{ __html: post.title }} />
                        <p className="text-xs text-slate-500 line-clamp-1">{post.excerpt}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center">
                <p className="font-semibold text-slate-700">No results found</p>
                <p className="mt-1 text-sm text-slate-500">Try a different search term.</p>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2 text-right text-xs text-slate-400">
            {!isLoading && query.trim().length > 1 && `Found ${results.length} ${results.length === 1 ? 'result' : 'results'}`}
          </div>
        </div>
      </div>
    </>
  );
}