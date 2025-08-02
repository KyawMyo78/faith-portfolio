import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export const useScrollTracking = () => {
  useEffect(() => {
    let maxScrollDepth = 0;
    let timeOnSite = 0;
    const startTime = Date.now();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);

      // Track scroll depth milestones
      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;
        
        // Track at 25%, 50%, 75%, and 100% milestones
        if ([25, 50, 75, 100].includes(scrollPercentage)) {
          analytics.scrollDepth(scrollPercentage);
        }
      }
    };

    const handleTimeTracking = () => {
      timeOnSite = Math.floor((Date.now() - startTime) / 1000);
      analytics.timeOnSite(timeOnSite);
    };

    // Track time on site every 30 seconds
    const timeInterval = setInterval(handleTimeTracking, 30000);

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, []);
};

// Hook for tracking section views using Intersection Observer
export const useSectionTracking = (sectionName: string, ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            analytics.sectionView(sectionName);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
        rootMargin: '0px'
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [sectionName, ref]);
};
