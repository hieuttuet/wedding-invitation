import React, { useState } from 'react';
import Hero from './components/Hero';
import Details from './components/Details';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import Envelope from './components/Envelope';
import AudioPlayer from './components/AudioPlayer';
import FallingPetals from './components/FallingPetals';
import LoadingScreen from './components/LoadingScreen';
import { useLanguage } from './context/LanguageContext';

import InviteMessage from './components/InviteMessage';

function App() {
  const { lang, t } = useLanguage();
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <div className="app-container">
      {/* Loading Screen — shown first */}
      {!loadingDone && <LoadingScreen onComplete={() => setLoadingDone(true)} />}
      <Envelope />
      <FallingPetals />
      <AudioPlayer />
      <AudioPlayer />

      {/* Main Content */}
      <Hero />
      <InviteMessage />
      <Details />
      <Gallery />
      <Guestbook />
      
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'var(--moss-green)',
        color: 'white',
        marginTop: '2rem'
      }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>
          {t('footer_text')}
        </p>
      </footer>
    </div>
  );
}

export default App;
