'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem', fontFamily: 'sans-serif' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: 0 }}>Something went wrong</h2>
          <p style={{ marginTop: 8, color: '#6b7280', maxWidth: 360 }}>An unexpected error occurred. Please try again.</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
            <button
              onClick={reset}
              style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{ background: '#fff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 12, padding: '10px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
            >
              Go home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
