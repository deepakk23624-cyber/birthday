import { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';

function JokeCard({ joke, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      style={{ position: 'relative', width: '100%', height: 110, cursor: 'pointer', perspective: '1000px' }}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid rgba(255,255,255,0.6)',
          borderRadius: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
          boxShadow: '0 4px 15px rgba(236,72,153,0.1)',
        }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: '#374151', textAlign: 'center', margin: 0 }}>
            {joke.question}
          </p>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'rgba(253,242,248,0.85)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid #f9a8d4',
          borderRadius: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
          boxShadow: '0 4px 15px rgba(236,72,153,0.15)',
        }}>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#db2777', textAlign: 'center', margin: 0 }}>
            {joke.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InsideJokes() {
  return (
    <section style={{ padding: '3rem 1.25rem', background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)' }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.9rem',
        color: '#db2777',
        textAlign: 'center',
        marginBottom: '1.5rem',
      }}>
        Only We Understand 😂💗
      </h2>
      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: '#9ca3af', textAlign: 'center', marginBottom: '2rem' }}>
        Tap each card to reveal 👀
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {content.jokes.map((joke, index) => (
          <JokeCard key={index} joke={joke} index={index} />
        ))}
      </div>
    </section>
  );
}
