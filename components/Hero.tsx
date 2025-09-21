'use client';

import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, MapPin, Code2, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { getSocialIcon, SocialLink } from '../lib/socialIcons';

interface ProfileData {
  name: string;
  nickname: string;
  title: string;
  specialization: string;
  description: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  profileImage: string;
  cvUrl: string;
  socialLinks?: SocialLink[];
  // New fields for complete home page control
  greetingText?: string;
  contactButtonText?: string;
  cvButtonText?: string;
  cvNotAvailableText?: string;
}

export default function Hero({ profile: serverProfile, siteSettings: serverSettings }: { profile?: any; siteSettings?: any }) {
  const [profile, setProfile] = useState<ProfileData | null>(serverProfile || null);
  const [siteSettings, setSiteSettings] = useState<any>(serverSettings || null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // If server props provided, skip client fetching
    if (serverProfile && serverSettings) return;

    const fetchData = async () => {
      try {
        const timestamp = new Date().getTime();

        const profileResponse = await fetch(`/api/profile?t=${timestamp}`);
        const profileResult = await profileResponse.json();
        if (profileResult.success) setProfile(profileResult.data);

        const settingsResponse = await fetch(`/api/site-settings?t=${timestamp}`);
        const settingsResult = await settingsResponse.json();
        if (settingsResult.success) setSiteSettings(settingsResult.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [serverProfile, serverSettings]);

  // derive a safe image src from profile when profile changes
  useEffect(() => {
    const raw = profile?.profileImage;
    if (!raw) {
      setImageSrc('/profile-placeholder.svg');
      return;
    }
    try {
      const cleaned = String(raw).replace(/[\t\n\r]/g, '').trim();
      if (!cleaned) {
          setImageSrc('/profile-placeholder.svg');
        return;
      }
      // allow absolute URLs (http/https) or root-relative paths
      if (/^https?:\/\//i.test(cleaned) || /^\//.test(cleaned)) {
        setImageSrc(cleaned);
      } else {
        // if it's an odd value (contains spaces or control chars), fallback
          setImageSrc('/profile-placeholder.svg');
      }
    } catch (e) {
        setImageSrc('/profile-placeholder.svg');
    }
  }, [profile]);

  // Cursor-reactive motion: track normalized pointer and apply gentle offsets to firefly wrappers
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 }); // x,y = current, tx,ty = target
  const rafRef = useRef<number | null>(null);
  const paramsRef = useRef<Array<{ amp: number; speed: number }>>([]);

  useEffect(() => {
    // initialize per-firefly params
    paramsRef.current = Array.from({ length: 30 }).map(() => ({ amp: 8 + Math.random() * 22, speed: 0.05 + Math.random() * 0.06 }));

    const onPointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width; // 0..1
      const ny = (e.clientY - rect.top) / rect.height; // 0..1
      // center to -0.5..0.5
      cursorRef.current.tx = (nx - 0.5) * 2;
      cursorRef.current.ty = (ny - 0.5) * 2;
    };

    const tick = () => {
      // lerp current towards target
      cursorRef.current.x += (cursorRef.current.tx - cursorRef.current.x) * 0.12;
      cursorRef.current.y += (cursorRef.current.ty - cursorRef.current.y) * 0.12;

      const wrappers = containerRef.current?.querySelectorAll<HTMLElement>('[data-firefly-index]');
      if (wrappers && wrappers.length) {
        const cx = cursorRef.current.x;
        const cy = cursorRef.current.y;
        const t = Date.now() / 1000;
        wrappers.forEach((w) => {
          const i = Number(w.dataset.fireflyIndex || 0);
          const p = paramsRef.current[i] || { amp: 12, speed: 0.06 };
          // per-firefly modulation
          const wobbleX = Math.sin(t * (0.5 + p.speed * 5) + i) * 2;
          const wobbleY = Math.cos(t * (0.5 + p.speed * 4) + i) * 2;
          const tx = cx * p.amp * (0.6 + ((i % 5) / 5)) + wobbleX;
          const ty = cy * p.amp * (0.6 + ((i % 7) / 7)) + wobbleY;
          // apply transform on wrapper so framer-motion inside can still animate x/y
          w.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleContactClick = () => {
    // Navigate to contact page since we're now using multi-page layout
    window.location.href = '/contact';
  };

  const handleWorksClick = () => {
    // Navigate to projects page
    window.location.href = '/projects';
  };

  const handleResumeDownload = () => {
    if (profile?.cvUrl) {
      window.open(profile.cvUrl, '_blank');
    } else {
      // Show a friendly message
      alert('Resume not available yet. Please contact me directly for my CV!');
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 to-white">
      {/* Background Animation - firefly style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-95 pointer-events-none" ref={containerRef}>
          {/* Cursor-reactive fireflies */}
          {[...Array(60)].map((_, i) => {
            // slow snowfall visual properties
            const size = Math.floor(Math.random() * 14) + 6; // 6-20px snow flakes
            const left = Math.random() * 100; // start x position (percent)
            // start slightly above visible area so flakes drift in
            const top = -10 - Math.random() * 30; // -10% to -40%
            const fallDistance = 600 + Math.random() * 900; // px distance to travel
            // much slower, snow-like fall
            const baseDuration = 16 + Math.random() * 14; // very slow: 16 - 30s
            const opacity = 0.45 + Math.random() * 0.35;
            const delay = Math.random() * 10; // staggered start

            return (
              <div key={`snow-${i}`} data-firefly-index={i} className="absolute" style={{ left: `${left}%`, top: `${top}%`, width: `${size}px`, height: `${size}px`, pointerEvents: 'none' }}>
                <motion.div
                  key={i}
                  className="rounded-full bg-primary-400/80 absolute inset-0"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    boxShadow: `0 0 ${8 + size}px rgba(99,102,241,0.12)`,
                    transformOrigin: 'center',
                    opacity,
                    
                  }}
                  animate={{
                    // very gentle fall and subtle horizontal sway
                    y: [-160, fallDistance],
                    x: [-(Math.random() * 14), Math.random() * 14],
                    rotate: [-(Math.random() * 8), Math.random() * 8],
                    scale: [0.95 + Math.random() * 0.15, 0.95 + Math.random() * 0.15],
                  }}
                  transition={{
                    y: { duration: baseDuration, repeat: Infinity, ease: 'linear', repeatDelay: 8 + Math.random() * 12, delay },
                    x: { duration: baseDuration * (1.2 + Math.random() * 1.4), repeat: Infinity, ease: 'linear', repeatDelay: 8 + Math.random() * 12, delay },
                    rotate: { duration: baseDuration * (1 + Math.random() * 1.0), repeat: Infinity, ease: 'linear', repeatDelay: 8 + Math.random() * 12, delay },
                    scale: { duration: baseDuration * (1 + Math.random() * 0.4), repeat: Infinity, ease: 'linear', repeatDelay: 8 + Math.random() * 12, delay },
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-width section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image first in DOM for stacking on small screens; moves to right on lg */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end mb-6 lg:mb-0"
          >
            <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <Image
                  src={imageSrc || '/profile-placeholder.svg'}
                alt={`${profile?.name || 'Your Name'} (${profile?.nickname || 'Your Nickname'})`}
                width={320}
                height={320}
                className="w-full h-full object-cover rounded-full"
                priority
                onError={() => setImageSrc('/profile-placeholder.svg')}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start space-x-2 mb-4"
            >
              <div className="w-12 h-0.5 bg-primary-600"></div>
              <span className="text-primary-600 font-medium">
                {siteSettings?.hero?.greetingText || profile?.greetingText || 'Hello, I\'m'}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="text-gradient">{profile?.name || 'Your Name'}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-semibold text-primary-700 mb-6"
            >
              ({profile?.nickname || 'Your Nickname'})
            </motion.h2>

            {/* Title with typing effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-xl md:text-2xl text-primary-600 font-medium mb-2">
                {profile?.title || 'Yor Position/Title'}
              </h3>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-primary-500">
                
                <span>{profile?.specialization || 'Your Specialization'}</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-primary-600 mb-8 max-w-2xl text-justify"
            >
              {profile?.description || 'A passionate 23-year-old Myanmar student studying IT in Thailand. I love creating innovative solutions through programming, embedded systems, and mobile development while mentoring others in their coding journey.'}
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start space-x-2 mb-8 text-primary-500"
            >
              <MapPin size={18} />
              <span>{profile?.location || 'Thailand • Myanmar Native'}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <button
                onClick={handleContactClick}
                className="btn-primary group"
              >
                <Mail size={20} className="mr-2 group-hover:rotate-12 transition-transform" />
                {siteSettings?.hero?.contactButtonText || profile?.contactButtonText || 'Get In Touch'}
              </button>
              <button
                onClick={handleWorksClick}
                className="btn-secondary group"
              >
                <Briefcase size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                View My Projects
              </button>
              <button
                onClick={handleResumeDownload}
                disabled={!profile?.cvUrl}
                className={`btn-secondary group ${!profile?.cvUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={!profile?.cvUrl ? 'CV not available' : 'Download CV'}
              >
                <Download size={20} className="mr-2 group-hover:translate-y-1 transition-transform" />
                {profile?.cvUrl ? 
                  (siteSettings?.hero?.cvButtonText || profile?.cvButtonText || 'Download CV') : 
                  (siteSettings?.hero?.cvNotAvailableText || profile?.cvNotAvailableText || 'CV Not Available')
                }
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start space-x-4"
            >
              {/* Legacy GitHub and LinkedIn links (if no custom social links) */}
              {(!profile?.socialLinks || profile.socialLinks.length === 0) && (
                <>
                  <a
                    href={profile?.github || "https://github.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 hover:text-primary-900 transition-all duration-200 hover:scale-110"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={profile?.linkedin || "https://linkedin.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 hover:text-primary-900 transition-all duration-200 hover:scale-110"
                  >
                    <Linkedin size={20} />
                  </a>
                </>
              )}
              
              {/* Custom social links */}
              {profile?.socialLinks && profile.socialLinks.length > 0 && (
                <>
                  {profile.socialLinks.map((link, index) => {
                    const iconConfig = getSocialIcon(link.icon);
                    const IconComponent = iconConfig?.icon || Github;
                    
                    return (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 hover:text-primary-900 transition-all duration-200 hover:scale-110 ${iconConfig?.color || ''}`}
                        title={link.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + (index * 0.1), type: "spring" }}
                      >
                        <IconComponent size={20} />
                      </motion.a>
                    );
                  })}
                  
                  {/* Add legacy links if not already included */}
                  {profile.github && !profile.socialLinks.some(link => link.url.includes('github.com')) && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 hover:text-primary-900 transition-all duration-200 hover:scale-110"
                      title="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {profile.linkedin && !profile.socialLinks.some(link => link.url.includes('linkedin.com')) && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 hover:text-primary-900 transition-all duration-200 hover:scale-110"
                      title="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Right column: profile image on desktop, centered above on mobile */}
          
        </div>
      </div>

    </section>
  );
}
