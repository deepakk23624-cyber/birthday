import { motion } from 'framer-motion';
import { content } from '../data/content';

const cardStyle = {
  background: 'rgba(255,255,255,0.45)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1.5px solid rgba(255,255,255,0.55)',
  boxShadow: '0 20px 40px rgba(236,72,153,0.12)',
  borderRadius: '1.25rem',
  padding: '1.75rem',
  position: 'relative',
  overflow: 'hidden',
};

export default function BestieMessage() {
  const { title, photo, text } = content.message;

  return (
    <section style={{ padding: '3rem 1.25rem', background: 'linear-gradient(180deg, #f3e8ff 0%, #fdf2f8 100%)' }}>
      <motion.div
        style={cardStyle}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Subtle bg photo */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.06,
            borderRadius: '1.25rem',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            color: '#db2777',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}>
            {title}
          </h2>

          <motion.div
            style={{
              width: '100%', height: 200,
              borderRadius: '1rem',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '3px solid rgba(255,255,255,0.7)',
            }}
            initial={{ scale: 0.92, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={photo}
              alt="Bestie"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>

          <div style={{ fontFamily: "'Caveat', cursive", fontSize: '1.35rem', color: '#374151', lineHeight: 1.7 }}>
            {text.split('\n').map((paragraph, i) => (
              paragraph ? <p key={i} style={{ marginBottom: '0.75rem' }}>{paragraph}</p> : <br key={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
