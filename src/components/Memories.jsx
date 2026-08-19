import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { X } from 'lucide-react';

const rotations = [-4, 3, -3, 5];

export default function Memories() {
  const { title, photos } = content.memories;
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section style={{ padding: '3rem 1.25rem', background: '#fdf2f8' }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.9rem',
        color: '#db2777',
        textAlign: 'center',
        marginBottom: '2rem',
      }}>
        {title} 📸
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            style={{
              background: 'white',
              padding: '0.5rem 0.5rem 2.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
              borderRadius: '4px',
              cursor: 'pointer',
              rotate: rotations[index] || 0,
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            onClick={() => setSelectedImage(photo)}
          >
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', marginBottom: '0.5rem' }}>
              <img
                src={photo.src}
                alt="Memory"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <p style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '1.1rem',
              color: '#6b7280',
              textAlign: 'center',
              margin: 0,
            }}>
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
              background: 'rgba(0,0,0,0.82)',
              backdropFilter: 'blur(6px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(255,255,255,0.2)', border: 'none',
                borderRadius: '50%', padding: '0.5rem', cursor: 'pointer',
                color: 'white', display: 'flex',
              }}
            >
              <X size={24} />
            </button>
            <motion.div
              style={{
                background: 'white',
                padding: '0.75rem 0.75rem 2.5rem',
                borderRadius: '4px',
                maxWidth: '90vw',
              }}
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
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
              }}>
                {selectedImage.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
