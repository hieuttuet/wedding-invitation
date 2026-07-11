import React, { useState } from 'react';
import { MailOpen } from 'lucide-react';
import bgImage from '../image/20x30.jpg';

const Envelope = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Dispatch event to start music
    window.dispatchEvent(new Event('startMusic'));
    
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

      {/* Elegant Glassmorphism Open Invitation Card */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        width: '90%',
        maxWidth: '380px',
        textAlign: 'center',
        padding: '2rem 1.5rem',
        background: 'rgba(20, 20, 20, 0.65)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div>
          <p style={{ letterSpacing: '4px', fontSize: '0.85rem', color: '#e2b3a3', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: '500' }}>
            Wedding Invitation
          </p>
          <h2 style={{ 
            fontFamily: "'Great Vibes', cursive", 
            fontSize: '3rem', 
            color: 'white',
            fontWeight: 'normal',
            lineHeight: '1.2'
          }}>
            Nguyễn Huệ<br/>& Jin Yeong
          </h2>
        </div>
        
        <button 
          onClick={handleOpen}
          style={{
            padding: '1rem 2.5rem',
            backgroundColor: '#e2b3a3',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            transition: 'all 0.3s',
            marginTop: '1rem',
            boxShadow: '0 5px 20px rgba(226, 179, 163, 0.4)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.backgroundColor = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#e2b3a3';
          }}
        >
          <MailOpen size={20} />
          Open Invitation
        </button>
      </div>
    </div>
  );
};

export default Envelope;
