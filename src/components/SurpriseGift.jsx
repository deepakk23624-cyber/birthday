import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { Gift } from 'lucide-react';

const confettiColors = ['#f472b6', '#fbbf24', '#a78bfa', '#34d399', '#fb7185'];
const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  color: confettiColors[i % confettiColors.length],
  toTop: `${Math.round(10 + (i * 4.2) % 85)}%`,
  toLeft: `${Math.round(5 + (i * 4.7) % 90)}%`,
  scale: 1.2 + (i % 3) * 0.4,
}));

export default function SurpriseGift() {
  const [isOpen, setIsOpen] = useState(false);
  const { title, message } = content.gift;

  return (
    <section style={{
      padding: '3rem 1.25rem',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      background: '#fdf2f8',
    }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.75rem',
        color: '#db2777',
        textAlign: 'center',
        marginBottom: '2.5rem',
        lineHeight: 1.3,
      }}>
        {title}
      </h2>

      <div style={{ position: 'relative', width: '100%', maxWidth: 340, minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="gift"
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Gift
                  size={110}
                  color="#db2777"
                  strokeWidth={1.4}
                  style={{ filter: 'drop-shadow(0 0 18px rgba(236,72,153,0.5))' }}
                />
              </motion.div>
              <motion.p
                style={{ fontFamily: "'Poppins', sans-serif", color: '#9ca3af', marginTop: '0.75rem', fontSize: '0.9rem' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Tap to open 🎁
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255,255,255,0.6)',
                borderRadius: '1.25rem',
                padding: '2rem 1.5rem',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(236,72,153,0.2)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.45, duration: 0.8 }}
            >
              {/* Confetti burst */}
              {confettiPieces.map((c) => (
                <motion.div
                  key={c.id}
                  style={{
                    position: 'absolute',
                    width: 8, height: 8,
                    borderRadius: '50%',
                    backgroundColor: c.color,
                    top: '50%', left: '50%',
                    pointerEvents: 'none',
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ top: c.toTop, left: c.toLeft, opacity: 0, scale: c.scale }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              ))}
              <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#db2777', marginBottom: '1rem' }}>
                Surprise!
              </p>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#374151', lineHeight: 1.6 }}>
                {message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
