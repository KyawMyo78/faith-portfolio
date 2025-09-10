"use client";

import React, { useEffect, useState } from 'react';

export default function IconPreview({ name, className }: { name?: string; className?: string }) {
  const [Comp, setComp] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    if (!name) return;
    import('lucide-react').then(mod => {
      const candidate = (mod as any)[
        // map common dashes to PascalCase names used above
        name.split('-').map((part: string) => part.charAt(0).toUpperCase() + part.slice(1)).join('')
      ];
      if (mounted) setComp(candidate || null);
    }).catch(() => { if (mounted) setComp(null); });
    return () => { mounted = false; };
  }, [name]);

  if (!name) return <div className={className} />;
  if (!Comp) return <div className={className}></div>;
  return <Comp className={className} />;
}
