import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { Sparkles } from 'lucide-react';

const starPositions = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  topTarget: `${10 + (i * 7.3) % 80}%`,
  leftTarget: `${5 + (i * 8.1) % 90}%`,
  scale: 0.6 + (i % 3) * 0.4,
  delay: (i * 0.3) % 2,
  rotate: (i * 27) % 360,
}));

export default function FinalSurprise() {
  const [isRevealed, setIsRevealed] = useState(false);
  const { title, message, footer, photo } = content.final;

  return (
    <section style={{
      padding: '3rem 1.25rem',
      minHeight: '80vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #fdf2f8 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="button"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
            exit={{ opacity: 0, y: -40 }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem',
              color: '#db2777',
              textAlign: 'center',
            }}>
              One Last Thing… 👀
            </h2>
            <motion.button
              onClick={() => setIsRevealed(true)}
              style={{
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(236,72,153,0.5)',
              }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 20px rgba(236,72,153,0.4)', '0 0 45px rgba(168,85,247,0.7)', '0 0 20px rgba(236,72,153,0.4)'] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Tap Here 💗
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, type: 'spring' }}
          >
            {/* Stars */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
              {starPositions.map((s) => (
                <motion.div
                  key={s.id}
                  style={{ position: 'absolute', color: '#fbbf24', top: '50%', left: '50%' }}
                  animate={{ top: s.topTarget, left: s.leftTarget, opacity: [0, 1, 0], scale: s.scale, rotate: s.rotate }}
                  transition={{ duration: 3, repeat: Infinity, delay: s.delay }}
                >
                  <Sparkles size={18} />
                </motion.div>
              ))}
            </div>

            {/* Photo */}
            <motion.div
              style={{
                width: 180, height: 180,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid white',
                boxShadow: '0 0 40px rgba(236,72,153,0.4)',
                marginBottom: '2rem',
                position: 'relative',
                zIndex: 2,
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <img
                src={photo}
                alt="Final Memory"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>

            {/* Message card */}
            <motion.div
              style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(14px)',
                border: '1.5px solid rgba(255,255,255,0.6)',
                borderRadius: '1.5rem',
                padding: '2rem 1.5rem',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(236,72,153,0.2)',
                position: 'relative',
                zIndex: 2,
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.7rem', color: '#db2777', marginBottom: '1.25rem' }}>
                {title}
              </h2>
              <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.35rem', color: '#374151', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                {message.split('\n').map((paragraph, i) => (
                  paragraph ? <p key={i} style={{ margin: '0 0 0.4rem' }}>{paragraph}</p> : <br key={i} />
                ))}
              </div>
              <motion.p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontSize: '1.2rem',
                  color: '#ec4899',
                  letterSpacing: '0.05em',
                }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {footer}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
