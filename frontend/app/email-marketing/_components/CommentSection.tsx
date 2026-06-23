'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

type Fields = { comment: string; name: string; email: string; website: string; captcha: string };

export default function CommentSection() {
  const [form, setForm] = useState<Fields>({ comment: '', name: '', email: '', website: '', captcha: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update =
    (field: keyof Fields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.captcha.trim() !== '1') {
      setError('Incorrect answer. Hint: 1 × 1 = 1');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="mt-14 border-t border-gray-100 pt-10">
      <h2 className="mb-1 text-2xl font-bold text-gray-900">Leave a Reply</h2>
      <p className="mb-6 text-sm text-gray-500">
        Your email address will not be published.{' '}
        <span className="font-semibold text-red-500">*</span> Required fields are marked
      </p>

      {submitted ? (
        <div className="rounded-2xl border border-green-100 bg-green-50 p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-semibold text-green-800">Thank you! Your comment is awaiting moderation.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Comment *"
            rows={6}
            required
            value={form.comment}
            onChange={update('comment')}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <input
              type="text"
              placeholder="Name *"
              required
              value={form.name}
              onChange={update('name')}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
            <input
              type="email"
              placeholder="Email *"
              required
              value={form.email}
              onChange={update('email')}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
            <input
              type="url"
              placeholder="Website"
              value={form.website}
              onChange={update('website')}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5">
              <span className="text-sm font-medium text-gray-700">one × 1 =</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="?"
                required
                value={form.captcha}
                onChange={update('captcha')}
                className="w-14 border-0 bg-transparent text-center text-sm font-semibold outline-none focus:ring-0"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
          >
            Post Comment
          </button>
        </form>
      )}
    </section>
  );
}
