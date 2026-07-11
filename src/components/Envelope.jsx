import React, { useState } from 'react';
import { MailOpen } from 'lucide-react';
import bgImage from '../image/20x30.jpg';

import { useLanguage } from '../context/LanguageContext';

const Envelope = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Dispatch event to start music
    window.dispatchEvent(new Event('startMusic'));
    
    // Fix: Force scroll to top when opening so user starts at the Hero section
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    
    // Remove envelope from DOM after animation
    setTimeout(() => {
      document.getElementById('envelope-container').style.display = 'none';
    }, 1500);
  };

  return (
    <div 
      id="envelope-container"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 1.5s ease',
        transform: isOpen ? 'translateY(-100vh)' : 'translateY(0)',
        opacity: isOpen ? 0 : 1,
        overflow: 'hidden',
        backgroundColor: '#1a1a1a'
      }}
    >
      {/* Blurred Background Layer */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(30px)',
        transform: 'scale(1.1)',
        zIndex: -3
      }} />

      {/* Sharp Contained Image Layer */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: -2
      }} />

      {/* Subtle Dark Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        zIndex: -1
      }} />

      {/* Transparent Open Invitation Card */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        width: '85%',
        maxWidth: '380px',
        textAlign: 'center',
        padding: 'clamp(1.2rem, 4vw, 2rem) clamp(1rem, 3vw, 1.5rem)',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(0.5rem, 2vw, 1rem)'
      }}>
        <div>
          <p style={{ letterSpacing: '5px', fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)', color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.8rem', fontWeight: '600', textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 15px rgba(212,175,55,0.3)' }}>
            {t('wedding_invitation')}
          </p>
          <h2 style={{ 
            fontFamily: "'Great Vibes', cursive", 
            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', 
            color: '#f5e6d0',
            fontWeight: 'normal',
            lineHeight: '1.2',
            textShadow: '2px 4px 12px rgba(0,0,0,0.9), 0 0 30px rgba(212,175,55,0.15)'
          }}>
            Nguyễn Huệ<br/>& Jin Yeong
          </h2>
        </div>
        
        <button 
          onClick={handleOpen}
          style={{
            padding: 'clamp(0.8rem, 3vw, 1rem) clamp(1.5rem, 5vw, 2.5rem)',
            background: 'linear-gradient(135deg, #d4af37, #f5e6c8, #d4af37)',
            color: '#2a1f0e',
            border: '1px solid rgba(212,175,55,0.4)',
            borderRadius: '30px',
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            transition: 'all 0.3s',
            marginTop: 'clamp(0.5rem, 2vw, 1rem)',
            boxShadow: '0 5px 25px rgba(212,175,55,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
            letterSpacing: '1px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 35px rgba(212,175,55,0.5), inset 0 1px 0 rgba(255,255,255,0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 5px 25px rgba(212,175,55,0.3), inset 0 1px 0 rgba(255,255,255,0.3)';
          }}
        >
          <MailOpen size={20} />
          {t('open_invitation')}
        </button>
      </div>
    </div>
  );
};

export default Envelope;
