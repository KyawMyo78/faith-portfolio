'use client';

import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, MapPin, Code2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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
}

export default function Hero() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        const result = await response.json();
        if (result.success) {
          setProfile(result.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary-200 rounded-full"
              style={{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-width section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start space-x-2 mb-4"
            >
              <div className="w-12 h-0.5 bg-primary-600"></div>
              <span className="text-primary-600 font-medium">Hello, I'm</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="text-gradient">{profile?.name || 'Kyaw Myo Khant'}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-semibold text-primary-700 mb-6"
            >
              ({profile?.nickname || 'Phillip'})
            </motion.h2>

            {/* Title with typing effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-xl md:text-2xl text-primary-600 font-medium mb-2">
                {profile?.title || 'IT Student & Developer'}
              </h3>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-primary-500">
                <Code2 size={20} />
                <span>{profile?.specialization || 'Specializing in Embedded Systems & Mobile Development'}</span>
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
                Get In Touch
              </button>
              <button
                onClick={handleResumeDownload}
                disabled={!profile?.cvUrl}
                className={`btn-secondary group ${!profile?.cvUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={!profile?.cvUrl ? 'CV not available' : 'Download CV'}
              >
                <Download size={20} className="mr-2 group-hover:translate-y-1 transition-transform" />
                {profile?.cvUrl ? 'Download CV' : 'CV Not Available'}
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start space-x-4"
            >
              <a
                href={profile?.github || "https://github.com/KyawMyo78"}
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
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 p-1"
              >
                <div className="w-full h-full rounded-full bg-white"></div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative z-10 w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl"
              >
                <Image
                  src={profile?.profileImage || "/profile.jpg"}
                  alt={`${profile?.name || 'Kyaw Myo Khant'} (${profile?.nickname || 'Phillip'})`}
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                  onError={(e) => {
                    // Fallback to placeholder if profile image fails to load
                    e.currentTarget.src = "/profile-placeholder.svg";
                  }}
                />
              </motion.div>
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
              >
                <Code2 className="text-primary-600" size={24} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
