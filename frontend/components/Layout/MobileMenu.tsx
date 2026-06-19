import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';
import Button from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="border-t border-gray-100 bg-white md:hidden">
      <nav className="flex flex-col space-y-2 px-4 py-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
        <div className="pt-2">
          <Button href="/contact" className="w-full" onClick={onClose}>
            Get a Quote
          </Button>
        </div>
      </nav>
    </div>
  );
}