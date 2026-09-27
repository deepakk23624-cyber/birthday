import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const rotations = [-4, 3, -3, 5, -2, 4, -5, 2, -3, 4];

export default function Memories() {
  const { title, photos } = content.memories;
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedImage = selectedIndex !== null ? photos[selectedIndex] : null;

  const goPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <section style={{ padding: '3rem 1.25rem', background: '#fdf2f8' }}>
      <motion.h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.9rem',
          color: '#db2777',
          textAlign: 'center',
          marginBottom: '0.5rem',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {title} 📸
      </motion.h2>

      <motion.p
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: '1.2rem',
          color: '#9333ea',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Every picture tells our story 💕
      </motion.p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            style={{
              background: 'white',
              padding: '0.5rem 0.5rem 2.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
              borderRadius: '4px',
              cursor: 'pointer',
              rotate: rotations[index % rotations.length],
              position: 'relative',
            }}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22, delay: index * 0.05 }}
            onClick={() => setSelectedIndex(index)}
          >
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', marginBottom: '0.5rem' }}>
              <img
                src={photo.src}
                alt={photo.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <p style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1rem',
              color: '#6b7280',
              textAlign: 'center',
              margin: 0,
              lineHeight: 1.3,
            }}>
              {photo.caption}
            </p>

            {/* Photo number badge */}
            <span style={{
              position: 'absolute',
              top: '0.4rem',
              left: '0.4rem',
              background: 'rgba(236,72,153,0.85)',
              color: 'white',
              borderRadius: '50%',
              width: '1.4rem',
              height: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 'bold',
            }}>
              {index + 1}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Lightbox with navigation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(255,255,255,0.2)', border: 'none',
                borderRadius: '50%', padding: '0.5rem', cursor: 'pointer',
                color: 'white', display: 'flex',
              }}
            >
              <X size={24} />
            </button>

            {/* Prev button */}
            <button
              onClick={goPrev}
              style={{
                position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.2)', border: 'none',
                borderRadius: '50%', padding: '0.6rem', cursor: 'pointer',
                color: 'white', display: 'flex',
              }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next button */}
            <button
              onClick={goNext}
              style={{
                position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.2)', border: 'none',
                borderRadius: '50%', padding: '0.6rem', cursor: 'pointer',
                color: 'white', display: 'flex',
              }}
            >
              <ChevronRight size={28} />
            </button>

            <motion.div
              key={selectedIndex}
              style={{
                background: 'white',
                padding: '0.75rem 0.75rem 2.5rem',
                borderRadius: '4px',
                maxWidth: '90vw',
              }}
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt="Selected"
                style={{ maxHeight: '65vh', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
              />
              <p style={{
                fontFamily: "'Caveat', cursive",
                fontSize: '1.5rem',
                color: '#374151',
                textAlign: 'center',
                marginTop: '0.75rem',
                marginBottom: 0,
              }}>
                {selectedImage.caption}
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                color: '#9ca3af',
                textAlign: 'center',
                marginTop: '0.25rem',
                marginBottom: 0,
              }}>
                {selectedIndex + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
