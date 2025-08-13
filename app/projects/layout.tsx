import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Kyaw Myo Khant Portfolio',
  description: 'Explore the portfolio projects by Kyaw Myo Khant',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
