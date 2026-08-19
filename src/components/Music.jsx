import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const bars = [1, 1.6, 0.8, 1.4, 1.1, 0.7, 1.3];

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        {/* Replace /song.mp3 with your actual song file */}
        <source src="/song.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating music pill — fixed bottom right */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1rem',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          padding: '0.6rem 1rem 0.6rem 0.6rem',
          borderRadius: '9999px',
          boxShadow: '0 4px 20px rgba(236,72,153,0.25)',
          border: '1.5px solid rgba(249,168,212,0.5)',
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
      >
        <button
          onClick={togglePlay}
          style={{
            width: 44, height: 44,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f9a8d4, #c084fc)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(236,72,153,0.35)',
            flexShrink: 0,
          }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying
            ? <Pause size={18} color="white" fill="white" />
            : <Play size={18} color="white" fill="white" style={{ marginLeft: 2 }} />
          }
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.7rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Our Song 🎵
          </span>
          {/* Animated waveform */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14, marginTop: 2 }}>
            {bars.map((h, i) => (
              <motion.div
                key={i}
                style={{
                  width: 3,
                  borderRadius: 2,
                  background: 'linear-gradient(#f9a8d4, #c084fc)',
                }}
                animate={isPlaying
                  ? { height: [4, 4 + h * 8, 4] }
                  : { height: 4 }
                }
                transition={isPlaying
                  ? { repeat: Infinity, duration: 0.6 + i * 0.12, ease: 'easeInOut' }
                  : { duration: 0.3 }
                }
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
