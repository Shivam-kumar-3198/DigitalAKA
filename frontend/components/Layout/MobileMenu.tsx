import Link from 'next/link';
import Button from '@/components/ui/Button';

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
}

export default function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="border-t border-gray-100 bg-white md:hidden">
      <nav className="flex flex-col space-y-1 px-4 py-4">
        {navigation.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              onClick={onClose}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
            >
              {item.label}
            </Link>
            {item.dropdown && (
              <div className="ml-4 flex flex-col space-y-1">
                {item.dropdown.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={onClose}
                    className="block rounded-md px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-primary"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
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