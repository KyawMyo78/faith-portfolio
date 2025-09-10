// Admin configuration utility
// This helps centralize admin secret management

export function getAdminSecret(): string {
  // In production, this should come from environment variables
  // For development, fallback to the development secret
  return process.env.NEXT_PUBLIC_ADMIN_SECRET || 
         process.env.ADMIN_SECRET || 
         'd034499e3770d376dcb5ae81ee6e1f2ad70e49db6f798149378ea82f1a434b77'; // Development fallback
}

// For server-side usage
export function getServerAdminSecret(): string {
  return process.env.ADMIN_SECRET || 'd034499e3770d376dcb5ae81ee6e1f2ad70e49db6f798149378ea82f1a434b77';
}
