import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

import bgImage from '../image/TAN01317.webp';

const Hero = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  // Countdown timer
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

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Only apply parallax while section is visible
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offset: background moves at 40% of scroll speed (slower = more depth)
  const parallaxOffset = scrollY * 0.4;

  return (
    <section
      ref={sectionRef}
      className="section animate-fade-in"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '6vh',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}
    >
      {/* Blurred Background Layer — moves with parallax */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '120%',
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(30px)',
        transform: `scale(1.1) translateY(${parallaxOffset * 0.3}px)`,
        zIndex: -3,
        willChange: 'transform'
      }} />

      {/* Sharp Contained Image Layer — moves with parallax */}
      <div style={{
        position: 'absolute',
        top: `-${parallaxOffset * 0.2}px`,
        left: 0, width: '100%', height: '120%',
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        zIndex: -2,
        willChange: 'top',
        transform: `translateY(${parallaxOffset * 0.35}px)`,
        transition: 'transform 0.05s linear'
      }} />

      {/* Dark Overlay — stays fixed */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)',
        zIndex: -1
      }} />

      {/* Content — slight counter-parallax to stay readable */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        transform: `translateY(${-parallaxOffset * 0.08}px)`,
        transition: 'transform 0.05s linear',
        willChange: 'transform'
      }}>
        <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase', color: '#d4af37', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
          {t('hero_title')}
        </h3>

        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <h1 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(3.5rem, 10vw, 5rem)',
            color: '#f5e6d0',
            textShadow: '2px 4px 12px rgba(0,0,0,0.8), 0 0 25px rgba(212,175,55,0.15)',
            fontWeight: 'normal',
            lineHeight: '1.1'
          }}>
            Nguyễn Huệ<br />& Jin Yeong
          </h1>
        </div>

        <p style={{
          fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
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
          gap: '1rem',
          marginTop: '2rem',
          fontFamily: 'var(--font-heading)',
          width: '100%',
          padding: '0 10px'
        }}>
          {[
            { value: timeLeft.days, label: t('countdown_days') },
            { value: timeLeft.hours, label: t('countdown_hours') },
            { value: timeLeft.minutes, label: t('countdown_minutes') },
            { value: timeLeft.seconds, label: t('countdown_seconds') },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', backdropFilter: 'blur(8px)', border: '1px solid rgba(212,175,55,0.25)', flex: '1 1 70px', maxWidth: '100px' }}>
              <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 'bold', color: '#f5e6d0' }}>{item.value}</div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#d4af37', letterSpacing: '1px' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
