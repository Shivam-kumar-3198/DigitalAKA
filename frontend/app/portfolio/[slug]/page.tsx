import { PORTFOLIO } from '@/lib/constants';
import PortfolioDetailClient from './PortfolioDetailClient';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return PORTFOLIO.map((item) => ({ slug: item.slug }));
}

export default function PortfolioDetailPage({ params }: Props) {
  return <PortfolioDetailClient slug={params.slug} />;
}
