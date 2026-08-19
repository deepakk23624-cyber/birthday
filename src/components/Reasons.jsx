import { motion } from 'framer-motion';
import { content } from '../data/content';
import { Heart } from 'lucide-react';

export default function Reasons() {
  return (
    <section style={{
      padding: '3rem 1.25rem',
      background: 'linear-gradient(180deg, #fdf2f8 0%, #f3e8ff 100%)',
    }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.9rem',
        color: '#db2777',
        textAlign: 'center',
        marginBottom: '2.5rem',
      }}>
        Reasons Why You're My Bestie 💗
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {content.reasons.map((reason, index) => (
          <motion.div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(10px)',
              border: '1.5px solid rgba(255,255,255,0.55)',
              borderRadius: '1rem',
              padding: '1rem 1.25rem',
              boxShadow: '0 4px 18px rgba(236,72,153,0.1)',
            }}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f9a8d4, #c084fc)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(236,72,153,0.3)',
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2 + index * 0.3, repeat: Infinity }}
            >
              <Heart size={18} color="white" fill="white" />
            </motion.div>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem', color: '#374151', margin: 0 }}>
              {reason}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
