import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const hearts = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: `${10 + i * 15}%`,
  x: (i % 2 === 0 ? 1 : -1) * (i * 20 + 30),
  scale: 0.5 + (i % 3) * 0.3,
  duration: 6 + i * 1.2,
}));

export default function OpeningScreen({ onOpen }) {
  return (
    <motion.div
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%)',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating Hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          style={{ position: 'absolute', color: 'rgba(236,72,153,0.25)', left: h.left }}
          initial={{ y: '110vh', x: h.x, scale: h.scale }}
          animate={{ y: '-10vh', rotate: 360 }}
          transition={{ duration: h.duration, repeat: Infinity, ease: 'linear' }}
        >
          <Heart fill="currentColor" size={40} />
        </motion.div>
      ))}

      {/* Sparkle dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          style={{
            position: 'absolute',
            width: 6, height: 6,
            borderRadius: '50%',
            backgroundColor: '#fbbf24',
            top: `${15 + i * 10}%`,
            left: `${5 + i * 12}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
        />
      ))}

      <motion.div
        style={{ textAlign: 'center', zIndex: 10, padding: '1.5rem' }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <motion.h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 8vw, 3rem)',
            color: '#ec4899',
            marginBottom: '0.75rem',
            lineHeight: 1.2,
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Hey Bestie... 💕
        </motion.h1>

        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.1rem', color: '#6b7280', marginBottom: '2.5rem' }}>
          I made something special for you.
        </p>

        <motion.button
          onClick={onOpen}
          style={{
            padding: '1rem 2.5rem',
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(255,255,255,0.6)',
            color: '#ec4899',
            borderRadius: '9999px',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: '1.05rem',
            boxShadow: '0 0 25px rgba(236,72,153,0.35)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto',
          }}
          whileHover={{ scale: 1.07, boxShadow: '0 0 40px rgba(236,72,153,0.55)' }}
          whileTap={{ scale: 0.95 }}
        >
          Open Your Surprise ✨
        </motion.button>
      </motion.div>

      {/* Bottom Right Credit */}
      <div style={{
        position: 'absolute',
        bottom: '0.75rem',
        right: '0.85rem',
        zIndex: 20,
        opacity: 0.8,
        textAlign: 'right',
      }}>
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.5rem',
          color: '#6b7280',
          letterSpacing: '0.03em',
          lineHeight: 1.35,
          margin: 0,
        }}>
          Designed & Developed<br />
          <span style={{ color: '#6b7280' }}>by </span><span style={{ color: '#ec4899', fontWeight: 600 }}>Deepak</span> ✨
        </p>
      </div>
    </motion.div>
  );
}
