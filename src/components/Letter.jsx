import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { Mail } from 'lucide-react';

const sparklePositions = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${5 + i * 9}%`,
  delay: i * 0.12,
  duration: 1.2 + i * 0.15,
}));

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);
  const { title, text } = content.letter;

  return (
    <section style={{
      padding: '3rem 1.25rem',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #fce7f3 0%, #f3e8ff 100%)',
    }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.9rem',
        color: '#db2777',
        textAlign: 'center',
        marginBottom: '2.5rem',
      }}>
        {title}
      </h2>

      <div style={{ width: '100%', maxWidth: 380, display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              style={{
                width: 260, height: 180,
                background: 'linear-gradient(135deg, #fbcfe8, #f3e8ff)',
                borderRadius: 14,
                boxShadow: '0 12px 40px rgba(236,72,153,0.3)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                border: '1.5px solid rgba(255,255,255,0.6)',
              }}
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              exit={{ opacity: 0, scale: 0.8, rotateX: 80 }}
              transition={{ duration: 0.4 }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3), transparent)',
                borderRadius: 14,
              }} />
              <Mail size={52} color="#db2777" strokeWidth={1.5} />
              <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.8rem', color: '#db2777', marginTop: '0.6rem' }}>
                Tap to open 💌
              </p>
              <motion.span
                style={{ position: 'absolute', top: -14, right: -10, fontSize: '1.8rem' }}
                animate={{ scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              style={{
                background: '#fffdf8',
                padding: '2rem 1.75rem',
                width: '100%',
                borderRadius: 4,
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
            >
              {/* Sparkle particles rising up */}
              {sparklePositions.map((s) => (
                <motion.div
                  key={s.id}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: s.left,
                    width: 7, height: 7,
                    borderRadius: '50%',
                    background: '#fbbf24',
                    pointerEvents: 'none',
                  }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -280, opacity: 0 }}
                  transition={{ duration: s.duration, delay: s.delay }}
                />
              ))}

              {/* Letter lines decoration */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.04 }}>
                {[...Array(16)].map((_, i) => (
                  <div key={i} style={{ height: 1, background: '#6b7280', marginTop: i === 0 ? '3.5rem' : '1.6rem' }} />
                ))}
              </div>

              <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem', color: '#374151', lineHeight: 1.75, position: 'relative', zIndex: 1 }}>
                {text.split('\n').map((paragraph, i) => (
                  paragraph ? <p key={i} style={{ marginBottom: '0.6rem' }}>{paragraph}</p> : <br key={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
