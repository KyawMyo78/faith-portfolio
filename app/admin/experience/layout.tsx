import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience Management - Admin Dashboard',
  description: 'Manage work experience and career history for the portfolio',
};

export default function ExperienceLayout({
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
