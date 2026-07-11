import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import bgImage from '../image/TAN01317.webp';

const Hero = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-08-02T11:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section animate-fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: '8vh',
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
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

      {/* Dark Overlay for Text Readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: -1
      }} />
      <h3 style={{ fontSize: '1.2rem', letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase', color: 'white' }}>
        {t('hero_title')}
      </h3>

      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <h1 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(3rem, 10vw, 4.5rem)',
          color: 'white',
          textShadow: '2px 4px 8px rgba(0,0,0,0.6)',
          fontWeight: 'normal',
          lineHeight: '1.2'
        }}>
          Nguyễn Huệ<br />& Jin Yeong
        </h1>
      </div>

      <p style={{
        fontSize: '1.5rem',
        fontFamily: 'var(--font-heading)',
        marginTop: '1rem',
        borderBottom: '2px solid var(--gold)',
        paddingBottom: '10px'
      }}>
        02 . 08 . 2026
      </p>

      {/* Countdown Timer */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '3rem',
        fontFamily: 'var(--font-heading)',
        width: '100%',
        padding: '0 10px'
      }}>
        <div style={{ textAlign: 'center', padding: '0.8rem', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', backdropFilter: 'blur(5px)', flex: '1 1 60px', maxWidth: '90px' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{timeLeft.days}</div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>{t('countdown_days')}</div>
        </div>
        <div style={{ textAlign: 'center', padding: '0.8rem', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', backdropFilter: 'blur(5px)', flex: '1 1 60px', maxWidth: '90px' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{timeLeft.hours}</div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>{t('countdown_hours')}</div>
        </div>
        <div style={{ textAlign: 'center', padding: '0.8rem', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', backdropFilter: 'blur(5px)', flex: '1 1 60px', maxWidth: '90px' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{timeLeft.minutes}</div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>{t('countdown_minutes')}</div>
        </div>
        <div style={{ textAlign: 'center', padding: '0.8rem', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', backdropFilter: 'blur(5px)', flex: '1 1 60px', maxWidth: '90px' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{timeLeft.seconds}</div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>{t('countdown_seconds')}</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
