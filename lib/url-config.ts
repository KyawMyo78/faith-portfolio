// Dynamic URL configuration for Vercel deployments
export function getBaseUrl() {
  // Check if we're on Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Check if NEXTAUTH_URL is set (for custom domains)
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL.replace(/\/$/, ''); // Remove trailing slash
  }
  
  // Fallback to localhost for development
  return 'http://localhost:3000';
}

export function getApiUrl(path: string = '') {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/api${path}`;
}
