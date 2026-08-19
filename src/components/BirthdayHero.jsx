import { motion } from 'framer-motion';
import { content } from '../data/content';
import { ChevronDown } from 'lucide-react';

export default function BirthdayHero() {
  const { title, subtitle, description, photo } = content.hero;

  return (
    <motion.section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 60%, #f3e8ff 100%)',
        position: 'relative',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating hearts decoration */}
      {[...Array(4)].map((_, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            fontSize: '1.5rem',
            top: `${20 + i * 18}%`,
            left: i % 2 === 0 ? '8%' : '88%',
            userSelect: 'none',
          }}
          animate={{ y: [-8, 8, -8], rotate: [-10, 10, -10] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {['💕', '✨', '🌸', '💗'][i]}
        </motion.span>
      ))}

      {/* Photo */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
        style={{ position: 'relative', marginBottom: '2rem' }}
      >
        {/* Glow ring */}
        <div style={{
          position: 'absolute', inset: '-12px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)',
          animation: 'pulse 2.5s infinite',
        }} />
        {/* Outer ring */}
        <div style={{
          width: 260, height: 260,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f9a8d4, #c084fc)',
          padding: 4,
          boxShadow: '0 0 40px rgba(236,72,153,0.4)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img
            src="/pic1.jpeg"
            alt="Birthday Girl"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              borderRadius: '50%',
              border: '4px solid white',
              display: 'block',
            }}
          />
        </div>
        <motion.span
          style={{ position: 'absolute', top: -10, right: -10, fontSize: '2rem' }}
          animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ✨
        </motion.span>
      </motion.div>

      <motion.h1
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 7vw, 2.4rem)',
          color: '#db2777',
          marginBottom: '0.75rem',
          lineHeight: 1.25,
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {title}
      </motion.h1>

      <motion.p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.25rem',
          color: '#9333ea',
          fontStyle: 'italic',
          marginBottom: '1rem',
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {subtitle}
      </motion.p>

      <motion.p
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: '1.4rem',
          color: '#6b7280',
          maxWidth: 300,
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {description}
      </motion.p>

      <motion.div
        style={{ position: 'absolute', bottom: '2rem', color: '#f9a8d4' }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </motion.section>
  );
}
