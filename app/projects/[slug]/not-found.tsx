import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <Search size={120} className="mx-auto text-primary-300 mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-primary-800 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-700 mb-4">
            Project Not Found
          </h2>
          <p className="text-lg text-primary-600 mb-8">
            The project you're looking for doesn't exist or may have been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/#projects"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
