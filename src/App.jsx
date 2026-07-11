import React from 'react';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Details from './components/Details';
import Gallery from './components/Gallery';
import Gift from './components/Gift';
import Guestbook from './components/Guestbook';
import Envelope from './components/Envelope';
import AudioPlayer from './components/AudioPlayer';
import FallingPetals from './components/FallingPetals';
import { useLanguage } from './context/LanguageContext';

import InviteMessage from './components/InviteMessage';

function App() {
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <div className="app-container">
      {/* Global Effects */}
      <Envelope />
      <FallingPetals />
      <AudioPlayer />

      {/* Language Toggle */}
      <button 
        onClick={toggleLanguage}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 999,
          padding: '8px 15px',
          backgroundColor: 'var(--moss-green)',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
      >
        {lang === 'vi' ? '🇰🇷 KR' : '🇻🇳 VN'}
      </button>

      {/* Main Content */}
      <Hero />
      <InviteMessage />
      <OurStory />
      <Details />
      <Gallery />
      <Gift />
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
