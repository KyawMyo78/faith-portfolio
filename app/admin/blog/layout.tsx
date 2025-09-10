import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Management - Admin',
  description: 'Manage blog posts and articles',
}

export default function AdminBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
