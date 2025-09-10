"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer?: string | null;
  credentialUrl?: string | null;
}

export default function Achievements() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch('/api/portfolio/achievements');
        const json = await res.json();
        if (json.success) setItems(json.data || []);
      } catch (e) {
        console.error('Failed to load achievements', e);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="py-8">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="mt-12">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h3 className="text-2xl font-semibold mb-4">Achievements</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((a) => (
            <div key={a.id} className="p-4 border rounded-lg bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{a.title}</h4>
                  <div className="text-sm text-gray-600">{a.issuer || ''} • {new Date(a.date).getFullYear()}</div>
                </div>
                {a.credentialUrl && (
                  <a href={a.credentialUrl} target="_blank" rel="noreferrer" className="text-primary-600 text-sm">View</a>
                )}
              </div>
              {a.description && <p className="mt-2 text-gray-600 text-sm">{a.description}</p>}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
