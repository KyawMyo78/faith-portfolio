'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Globe, BookOpen, Target, Heart } from 'lucide-react';

const stats = [
  { label: 'Years of Programming', value: '4+', icon: BookOpen },
  { label: 'GPA', value: '3.8/4.0', icon: GraduationCap },
  { label: 'Languages Spoken', value: '4', icon: Globe },
  { label: 'IELTS Score', value: '6.5', icon: Award },
];

const highlights = [
  {
    icon: GraduationCap,
    title: 'Academic Excellence',
    description: 'Bachelor\'s in Information Technology with a 3.8 GPA and a 4-year academic scholarship.',
  },
  {
    icon: Target,
    title: 'Programming Expertise',
    description: 'Proficient in multiple programming languages including Python, C++, Java, JavaScript, and mobile development frameworks.',
  },
  {
    icon: Heart,
    title: 'Passion for Teaching',
    description: 'Experienced programming tutor specializing in C++ and Arduino, helping students succeed in tech competitions.',
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Discover my journey as a passionate IT student and developer from Myanmar, 
            currently studying in Thailand and building innovative solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-primary-900 mb-6">
              Hello! I'm Kyaw Myo Khant (Phillip)
            </h3>
            <div className="space-y-4 text-primary-600 leading-relaxed">
              <p>
                I'm a 23-year-old Myanmar student passionate about technology and innovation. 
                Currently pursuing my Bachelor's in Information Technology in Thailand, 
                I've maintained a strong academic record with a 3.8 GPA while being 
                supported by a prestigious 4-year academic scholarship.
              </p>
              <p>
                My journey in programming began over four years ago, and since then, 
                I've developed expertise in multiple languages and frameworks. From 
                embedded systems with Arduino and Raspberry Pi to mobile applications 
                with Flutter and React Native, I love exploring different facets of technology.
              </p>
              <p>
                As a programming tutor from 2020 to 2023, I've had the privilege of 
                mentoring students in C++ and Arduino, leading project teams, and 
                helping participants succeed in tech competitions. Teaching has not only 
                reinforced my own knowledge but also ignited my passion for sharing 
                knowledge with others.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, 
                working on embedded systems projects, or researching optimization 
                algorithms like PSO and ACO for robotics applications.
              </p>
            </div>

            {/* Languages */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-primary-900 mb-4">Languages I Speak</h4>
              <div className="flex flex-wrap gap-3">
                {['English', 'Burmese (Native)', 'Thai (Basic)', 'Chinese (Basic)'].map((language) => (
                  <span
                    key={language}
                    className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl text-center border border-primary-200 hover:shadow-lg transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary-900 mb-2">{stat.value}</div>
                <div className="text-sm text-primary-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl border border-primary-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <highlight.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-primary-900 mb-3">{highlight.title}</h4>
              <p className="text-primary-600 leading-relaxed">{highlight.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
