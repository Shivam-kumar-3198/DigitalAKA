import type { Metadata } from 'next';
import SectionWrapper from '@/components/ui/SectionWrapper';
import ContactForm from '@/components/sections/ContactForm';
import { CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Digital AKA. We’d love to hear from you.',
};

export default function ContactPage() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {CONTACT.heading}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{CONTACT.subheading}</p>
      </div>
      <div className="mx-auto mt-12 max-w-xl">
        <ContactForm />
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Email: {CONTACT.email}</p>
          <p>Phone: {CONTACT.phone}</p>
          <p>{CONTACT.address}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}