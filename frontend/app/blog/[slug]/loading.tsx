import SectionWrapper from '@/components/ui/SectionWrapper';

function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-gray-200 ${className ?? ''}`} />
  );
}

export default function BlogPostLoading() {
  return (
    <SectionWrapper className="-mt-20 pt-28">
      <article className="mx-auto max-w-3xl">
        {/* Featured image */}
        <Shimmer className="mb-10 h-[400px] w-full rounded-2xl" />

        {/* Date · Author */}
        <Shimmer className="h-4 w-48" />

        {/* Title */}
        <div className="mt-2 space-y-3">
          <Shimmer className="h-9 w-full" />
          <Shimmer className="h-9 w-4/5" />
        </div>

        {/* Body paragraphs */}
        <div className="mt-8 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Shimmer key={i} className="h-4 w-full" />
          ))}
          <Shimmer className="h-4 w-3/4" />

          <div className="pt-4" />

          {Array.from({ length: 5 }).map((_, i) => (
            <Shimmer key={`b${i}`} className="h-4 w-full" />
          ))}
          <Shimmer className="h-4 w-2/3" />

          <div className="pt-4" />

          {Array.from({ length: 4 }).map((_, i) => (
            <Shimmer key={`c${i}`} className="h-4 w-full" />
          ))}
          <Shimmer className="h-4 w-1/2" />
        </div>
      </article>
    </SectionWrapper>
  );
}
