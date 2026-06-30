import {
  CodeXml,
  LineChart,
  Megaphone,
  Palette,
  Sparkles,
  Wrench,
  Mail,
  MessageSquare,
  Globe,
  ShieldCheck,
  Zap,
  Star,
  TrendingUp,
  BarChart2,
  Users,
  Briefcase,
  Settings,
  Cloud,
  type LucideProps,
} from 'lucide-react';

export const iconMap = {
  CodeXml,
  LineChart,
  Megaphone,
  Palette,
  Sparkles,
  Wrench,
  Mail,
  MessageSquare,
  Globe,
  ShieldCheck,
  Zap,
  Star,
  TrendingUp,
  BarChart2,
  Users,
  Briefcase,
  Settings,
  Cloud,
};

export type IconName = keyof typeof iconMap;

interface IconProps extends LucideProps {
  name: IconName;
}

export default function Icon({ name, ...props }: IconProps) {
  const LucideIcon = iconMap[name] ?? Zap;
  return <LucideIcon {...props} />;
}
