import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Your Name Portfolio',
  description: 'Explore the portfolio projects by Your Name',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
