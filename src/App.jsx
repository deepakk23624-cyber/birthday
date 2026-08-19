import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import OpeningScreen from './components/OpeningScreen';
import BirthdayHero from './components/BirthdayHero';
import BestieMessage from './components/BestieMessage';
import Memories from './components/Memories';
import InsideJokes from './components/InsideJokes';
import Letter from './components/Letter';
import SurpriseGift from './components/SurpriseGift';
import Music from './components/Music';
import Reasons from './components/Reasons';
import FinalSurprise from './components/FinalSurprise';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#fdf2f8', minHeight: '100vh' }} className="relative max-w-md mx-auto overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <OpeningScreen key="opening" onOpen={() => setIsOpen(true)} />
        ) : (
          <div key="main" className="flex flex-col pb-24">
            <BirthdayHero />
            <BestieMessage />
            <Memories />
            <InsideJokes />
            <Letter />
            <SurpriseGift />
            <Reasons />
            <FinalSurprise />
            <Music autoPlay={true} />

            {/* Bottom Right Footer Credit */}
            <footer style={{ textAlign: 'right', padding: '1rem 1rem 0.5rem', opacity: 0.8 }}>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.5rem',
                color: '#6b7280',
                letterSpacing: '0.03em',
                lineHeight: 1.35,
                margin: 0,
              }}>
                Designed & Developed<br />
                <span style={{ color: '#6b7280' }}>by </span><span style={{ color: '#db2777', fontWeight: 600 }}>Deepak</span> ✨
              </p>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
