import { Star, Quote } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';

interface Testimonial {
  id?: string;
  name: string;
  date: string;
  rating: number;
  image: string;
  quote: string;
}

const FALLBACK: Testimonial[] = [
  {
    name: 'Swapna Katuku',
    date: '12 April 2023',
    rating: 5,
    image: 'https://digitalaka.com/wp-content/uploads/2024/05/whatsapp-image-2024-05-09-at-125751-pm-663ca6646b5a5-150x150.webp',
    quote: "DigitalAKA offers great email marketing solutions! Their dedication to detail and strategic planning increased my company's ROI and increased engagement rates. I'm satisfied with the result and would highly recommend...",
  },
  {
    name: 'Ashish Chakraborty',
    date: '04 March 2022',
    rating: 4.5,
    image: 'https://digitalaka.com/wp-content/uploads/2024/05/Ashish-Chakraborty-150x150.webp',
    quote: 'DigitalAKA completely changed the way I used email marketing! Their knowledge simplified marketing, increasing conversions, and open rates. I was impressed by their strong analytics and focused strategy.',
  },
  {
    name: 'Archish Vishwanathan',
    date: '14 Jan 2021',
    rating: 4.5,
    image: 'https://digitalaka.com/wp-content/uploads/2024/05/img1-1-150x150.webp',
    quote: 'Thanks to DigitalAKA, my email marketing has never been more effective! Their customized marketing and automated features produced excellent results while saving me time. I highly recommended it!',
  },
  {
    name: 'Omaligba',
    date: '08 November 2023',
    rating: 4.5,
    image: 'https://digitalaka.com/wp-content/uploads/2024/05/img3-663ca69883351-150x150.webp',
    quote: 'DigitalAKA offers the best email marketing services available! For the best effect, their team developed engaging content and campaign optimization. I noticed an increase in leads and consumer engagement.',
  },
];

// Helper to render stars beautifully
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : i < rating
              ? 'fill-amber-400/50 text-amber-400'
              : 'fill-slate-100 text-slate-200'
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const list = FALLBACK;

  return (
    <SectionWrapper className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
      {/* Background visual flair */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Read What Our Clients Say About Us
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Here are the reviews, of what our customers say about our services.
          </p>
        </div>

        {/* 4-column layout for large screens, 2 for tablet, 1 for mobile */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((t: Testimonial, index: number) => (
            <div
              key={index}
              className="group relative flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-blue-500/20"
            >
              {/* Background Quote Watermark */}
              <Quote className="absolute top-6 right-6 h-12 w-12 text-slate-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Profile Image - Preserving the slightly rounded square from your reference */}
              <div className="relative mb-5 h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-900/10 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Header Info */}
              <div className="text-center z-10">
                <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date: {t.date}
                </p>
              </div>

              {/* Subtle visual separator instead of full-width harsh line */}
              <div className="my-5 h-px w-12 rounded-full bg-slate-200 transition-colors duration-300 group-hover:bg-blue-200" />

              {/* Stars */}
              <div className="mb-5 z-10">
                <StarRating rating={t.rating} />
              </div>

              {/* Review Text */}
              <p className="text-sm leading-relaxed text-slate-600 text-center flex-grow z-10">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA after reviews — peak trust moment */}
        <div className="mt-16 text-center">
          <p className="text-base font-medium text-slate-500 mb-6">
            Join <span className="font-bold text-slate-900">1,400+ businesses</span> already sending with DigitalAka
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#1d5cf5] px-8 text-sm font-bold text-white shadow-[0_8px_20px_rgba(29,92,245,0.25)] transition-all hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Get Started Free
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-green-300 hover:text-green-700"
            >
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}