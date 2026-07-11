import React, { useState, useEffect, useRef } from 'react';
import bgImage from '../image/20x30.jpg';
import { useLanguage } from '../context/LanguageContext';

const Envelope = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Swipe / drag state
  const [dragY, setDragY] = useState(0);         // how far user has dragged (negative = up)
  const [isDragging, setIsDragging] = useState(false);
  const [isPulling, setIsPulling] = useState(false); // show the pull hint animation
  const startYRef = useRef(null);
  const containerRef = useRef(null);

  const OPEN_THRESHOLD = -80; // drag 80px up to trigger open

  // Lock page scroll while envelope is covering everything
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const musicStarted = useRef(false);

  const startMusicEarly = () => {
    if (!musicStarted.current) {
      musicStarted.current = true;
      window.dispatchEvent(new Event('startMusic'));
    }
  };

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Music may already be playing from first touch, but dispatch anyway
    window.dispatchEvent(new Event('startMusic'));
    // Unlock scroll and instantly jump to top BEFORE envelope animates away
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    window.scrollTo(0, 0); // instant, not smooth — avoids race conditions
    setTimeout(() => {
      const el = document.getElementById('envelope-container');
      if (el) el.style.display = 'none';
    }, 1500);
  };

  // ─── Touch handlers ───
  const onTouchStart = (e) => {
    startMusicEarly(); // Start music on first touch — satisfies browser autoplay policy
    startYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    if (startYRef.current === null) return;
    const dy = e.touches[0].clientY - startYRef.current;
    // Only allow dragging up (negative direction)
    setDragY(Math.min(0, dy));
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    if (dragY <= OPEN_THRESHOLD) {
      handleOpen();
    } else {
      // Snap back
      setDragY(0);
    }
    startYRef.current = null;
  };

  // ─── Mouse handlers (desktop) ───
  const onMouseDown = (e) => {
    startMusicEarly(); // Start music on first mousedown
    startYRef.current = e.clientY;
    setIsDragging(true);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging || startYRef.current === null) return;
      const dy = e.clientY - startYRef.current;
      setDragY(Math.min(0, dy));
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      if (dragY <= OPEN_THRESHOLD) {
        handleOpen();
      } else {
        setDragY(0);
      }
      startYRef.current = null;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, dragY]);

  // Progress of pull: 0 → 1 as dragY goes from 0 → OPEN_THRESHOLD
  const pullProgress = Math.min(1, Math.abs(dragY) / Math.abs(OPEN_THRESHOLD));

  // Bounce hint animation for the arrow
  useEffect(() => {
    const t = setTimeout(() => setIsPulling(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const openTranslateY = isOpen ? '-100vh' : `${dragY}px`;
  const openOpacity = isOpen ? 0 : 1 - pullProgress * 0.2;

  return (
    <div
      id="envelope-container"
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateY(${openTranslateY})`,
        opacity: openOpacity,
        transition: isDragging
          ? 'none'
          : isOpen
          ? 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s ease'
          : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* Blurred Background Layer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(30px)', transform: 'scale(1.1)', zIndex: -3
      }} />

      {/* Sharp Contained Image Layer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center', zIndex: -2
      }} />

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%)',
        zIndex: -1
      }} />

      {/* ── Text content ── */}
      <div style={{
        position: 'absolute',
        bottom: '22%',
        textAlign: 'center',
        padding: '0 2rem',
      }}>
        <p style={{
          letterSpacing: '5px', fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)',
          color: '#d4af37', textTransform: 'uppercase', marginBottom: '0.8rem',
          fontWeight: '600', textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        }}>
          {t('wedding_invitation')}
        </p>
        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
          color: '#f5e6d0', fontWeight: 'normal', lineHeight: '1.2',
          textShadow: '2px 4px 12px rgba(0,0,0,0.9), 0 0 30px rgba(212,175,55,0.15)',
        }}>
          Nguyễn Huệ<br />&amp; Jin Yeong
        </h2>
      </div>

      {/* ── Swipe-up indicator ── */}
      <div style={{
        position: 'absolute',
        bottom: '6%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        // Fade out as user drags up
        opacity: 1 - pullProgress,
        transition: 'opacity 0.2s',
      }}>
        {/* Three animated chevrons stacked */}
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            width="28" height="16" viewBox="0 0 28 16" fill="none"
            style={{
              marginBottom: '-6px',
              animation: isPulling ? `swipeChevron 1.4s ease-in-out infinite ${i * 0.2}s` : 'none',
              opacity: isPulling ? 1 : 0,
            }}
          >
            <polyline
              points="2,14 14,2 26,14"
              stroke={i === 2 ? '#d4af37' : 'rgba(212,175,55,0.4)'}
              strokeWidth={i === 2 ? '2.5' : '1.5'}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        ))}

        <p style={{
          fontSize: '0.75rem',
          letterSpacing: '3px',
          color: 'rgba(212,175,55,0.85)',
          textTransform: 'uppercase',
          marginTop: '0.6rem',
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          animation: isPulling ? 'swipeLabelPulse 2s ease-in-out infinite' : 'none',
        }}>
          {t('swipe_to_open') || 'Kéo lên để mở thiệp'}
        </p>
      </div>

      {/* ── Pull progress ring (appears when dragging) ── */}
      {pullProgress > 0.05 && (
        <div style={{
          position: 'absolute',
          bottom: '8%',
          width: '60px', height: '60px',
        }}>
          <svg viewBox="0 0 60 60" width="60" height="60">
            <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="3" />
            <circle
              cx="30" cy="30" r="26"
              fill="none"
              stroke="#d4af37"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - pullProgress)}`}
              transform="rotate(-90 30 30)"
              style={{ transition: 'stroke-dashoffset 0.05s linear' }}
            />
            <text x="30" y="35" textAnchor="middle" fill="#d4af37" fontSize="12" fontFamily="'Montserrat', sans-serif">
              {Math.round(pullProgress * 100)}%
            </text>
          </svg>
        </div>
      )}

      <style>{`
        @keyframes swipeChevron {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes swipeLabelPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Envelope;
