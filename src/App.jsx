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

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
