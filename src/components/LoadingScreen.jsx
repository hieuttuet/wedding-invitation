import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'fadeout'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar from 0 → 100 over ~1.8s
    let start = null;
    const duration = 1800;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(animate);
      } else {
        // Small pause at 100%, then fade out
        setTimeout(() => {
          setPhase('fadeout');
          setTimeout(() => onComplete(), 700);
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'linear-gradient(135deg, #1a1209 0%, #2d2010 50%, #1a1209 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      }}
    >
      {/* Animated rings */}
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        {/* Outer glow ring */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.2)',
          animation: 'loadRingPulse 2s ease-in-out infinite',
        }} />
        {/* Middle ring */}
        <div style={{
          position: 'absolute', inset: '10px', borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.4)',
          animation: 'loadRingPulse 2s ease-in-out infinite 0.3s',
        }} />
        {/* Inner ring */}
        <div style={{
          position: 'absolute', inset: '20px', borderRadius: '50%',
          border: '2px solid rgba(212,175,55,0.7)',
          animation: 'loadRingPulse 2s ease-in-out infinite 0.6s',
        }} />
        {/* Center monogram */}
        <div style={{
          position: 'absolute', inset: '30px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15), transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '2rem',
            color: '#d4af37',
            textShadow: '0 0 20px rgba(212,175,55,0.6)',
          }}>H&J</span>
        </div>
      </div>

      {/* Couple names */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
          color: '#f5e6d0',
          textShadow: '0 0 20px rgba(212,175,55,0.3)',
          lineHeight: '1.3',
          animation: 'loadFadeIn 1s ease forwards',
        }}>
          Nguyễn Huệ &amp; Jin Yeong
        </p>
        <p style={{
          letterSpacing: '4px',
          fontSize: '0.7rem',
          color: '#d4af37',
          textTransform: 'uppercase',
          marginTop: '0.5rem',
          opacity: 0.8,
          animation: 'loadFadeIn 1s ease 0.3s forwards',
        }}>
          02 · 08 · 2026
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 'min(280px, 70vw)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.7rem',
      }}>
        <div style={{
          width: '100%', height: '2px',
          background: 'rgba(212,175,55,0.15)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #8b6914, #d4af37, #f5e6c8)',
            borderRadius: '2px',
            transition: 'width 0.05s linear',
            boxShadow: '0 0 8px rgba(212,175,55,0.5)',
          }} />
        </div>
        <p style={{
          fontSize: '0.7rem',
          letterSpacing: '3px',
          color: 'rgba(212,175,55,0.6)',
          textTransform: 'uppercase',
        }}>
          {Math.round(progress)}%
        </p>
      </div>

      <style>{`
        @keyframes loadRingPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes loadFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
