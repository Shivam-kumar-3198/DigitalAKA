import { Star, Quote } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';

// Fully updated mock data with all real client images
const TESTIMONIALS = [
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
          {TESTIMONIALS.map((t, index) => (
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
      </div>
    </SectionWrapper>
  );
}