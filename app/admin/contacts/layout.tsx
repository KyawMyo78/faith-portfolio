import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Messages - Admin Dashboard',
  description: 'Manage contact form submissions and messages',
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  );
}
