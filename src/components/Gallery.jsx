import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react';

// ── Slide component: crossfade + physical slide hybrid ──
const Slide = ({ src, offset, dragOffset, isDragging, alt }) => {
  // offset: -1 = prev, 0 = current, 1 = next
  const isActive = offset === 0;

  let transform, opacity;

  if (isDragging) {
    // During drag: physical slide for all 3 + progressive opacity for adjacent
    transform = `translateX(calc(${offset * 100}% + ${dragOffset}px))`;
    if (isActive) {
      opacity = 1;
    } else if (offset === -1) {
      // Prev: reveal as user drags right
      opacity = Math.min(1, Math.max(0, dragOffset / 120));
    } else {
      // Next: reveal as user drags left
      opacity = Math.min(1, Math.max(0, -dragOffset / 120));
    }
  } else {
    // Idle: crossfade only — prev/next stay at position but invisible
    transform = `translateX(${offset * 100}%)`;
    opacity = isActive ? 1 : 0;
  }

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform,
      opacity,
      transition: isDragging
        ? 'none'
        : 'opacity 0.4s ease, transform 0.38s cubic-bezier(0.4, 0.0, 0.2, 1)',
      willChange: 'transform, opacity',
    }}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  );
};

const Gallery = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const thumbnailRefs = useRef([]);
  const thumbnailStripRef = useRef(null);

  // Swipe state
  const swipeStartX = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const SWIPE_THRESHOLD = 50;

  // Load images
  const imageModules = import.meta.glob('../image/*.{jpg,jpeg,png,webp}', { eager: true });
  const images = Object.values(imageModules)
    .map((mod) => mod.default)
    .filter(src => !src.includes('qr_') && !src.includes('50x75 1'));

  if (images.length === 0) return null;

  const n = images.length;
  const prevIdx = (currentIndex - 1 + n) % n;
  const nextIdx = (currentIndex + 1) % n;

  // ── Navigation ──
  const goTo = (idx) => {
    setHasInteracted(true);
    setCurrentIndex((idx + n) % n);
  };
  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  // ── Thumbnail scroll within strip ──
  useEffect(() => {
    if (!hasInteracted) return;
    const thumb = thumbnailRefs.current[currentIndex];
    const strip = thumbnailStripRef.current;
    if (!thumb || !strip) return;
    const targetScrollLeft = thumb.offsetLeft - strip.offsetWidth / 2 + thumb.offsetWidth / 2;
    strip.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
  }, [currentIndex, hasInteracted]);

  // ── Swipe / drag ──
  const onDragStart = (clientX) => {
    swipeStartX.current = clientX;
    setIsDragging(true);
    setDragOffset(0);
  };
  const onDragMove = (clientX) => {
    if (swipeStartX.current === null) return;
    setDragOffset(clientX - swipeStartX.current);
  };
  const onDragEnd = () => {
    if (swipeStartX.current === null) return;
    if (dragOffset < -SWIPE_THRESHOLD) handleNext();
    else if (dragOffset > SWIPE_THRESHOLD) handlePrev();
    swipeStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const openLightbox = () => { setLightboxOpen(true); document.body.style.overflow = 'hidden'; };
  const closeLightbox = () => { setLightboxOpen(false); document.body.style.overflow = 'auto'; };

  const swipeHandlers = {
    onTouchStart: (e) => onDragStart(e.touches[0].clientX),
    onTouchMove: (e) => onDragMove(e.touches[0].clientX),
    onTouchEnd: onDragEnd,
    onMouseDown: (e) => onDragStart(e.clientX),
    onMouseMove: (e) => { if (swipeStartX.current !== null) onDragMove(e.clientX); },
    onMouseUp: onDragEnd,
    onMouseLeave: onDragEnd,
  };

  return (
    <section className="section animate-fade-in" style={{ backgroundColor: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem' }}>

      {/* Title */}
      <h2 style={{
        fontFamily: "'Great Vibes', cursive",
        fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
        color: '#d4af37', marginBottom: '2rem', fontWeight: 'normal', textAlign: 'center'
      }}>
        Gallery
      </h2>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ backgroundColor: '#dcdcdc', padding: '0.5rem 1rem', borderRadius: '5px', color: 'white', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            {currentIndex + 1} / {images.length}
          </div>
          <button
            onClick={openLightbox}
            style={{ backgroundColor: '#b0b0b0', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontSize: '0.95rem' }}
          >
            {t('gallery_more')}
          </button>
        </div>

        {/* ── 3-slide windowed carousel ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '60vh',
            minHeight: '400px',
            backgroundColor: '#f5f5f5',
            borderRadius: '12px',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'pan-y',
            userSelect: 'none',
          }}
          {...swipeHandlers}
        >
          {/* Prev slide */}
          <Slide
            key={`prev-${prevIdx}`}
            src={images[prevIdx]}
            alt={`Gallery ${prevIdx + 1}`}
            offset={-1}
            dragOffset={dragOffset}
            isDragging={isDragging}
          />
          {/* Current slide */}
          <Slide
            key={`curr-${currentIndex}`}
            src={images[currentIndex]}
            alt={`Gallery ${currentIndex + 1}`}
            offset={0}
            dragOffset={dragOffset}
            isDragging={isDragging}
          />
          {/* Next slide */}
          <Slide
            key={`next-${nextIdx}`}
            src={images[nextIdx]}
            alt={`Gallery ${nextIdx + 1}`}
            offset={1}
            dragOffset={dragOffset}
            isDragging={isDragging}
          />

          {/* Nav buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.35)', color: 'white', border: 'none', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.65)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.35)', color: 'white', border: 'none', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.65)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div
          ref={thumbnailStripRef}
          style={{ display: 'flex', gap: '8px', marginTop: '1.2rem', overflowX: 'auto', paddingBottom: '8px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {images.map((src, idx) => (
            <img
              ref={(el) => (thumbnailRefs.current[idx] = el)}
              key={idx}
              src={src}
              alt={`Thumb ${idx + 1}`}
              onClick={() => goTo(idx)}
              draggable={false}
              style={{
                height: '72px', width: 'auto', flexShrink: 0,
                cursor: 'pointer',
                opacity: currentIndex === idx ? 1 : 0.45,
                border: currentIndex === idx ? '2px solid #d4af37' : '2px solid transparent',
                borderRadius: '6px',
                transition: 'all 0.25s ease',
                transform: currentIndex === idx ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Pagination Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '7px', marginTop: '1.2rem', flexWrap: 'wrap' }}>
          {images.map((_, idx) => (
            <div
              key={idx}
              onClick={() => goTo(idx)}
              style={{
                width: currentIndex === idx ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentIndex === idx ? '#d4af37' : '#ddd',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Fullscreen Lightbox ── */}
      {lightboxOpen && (
        <div
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.97)',
            zIndex: 99999, overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'none',
          }}
          {...swipeHandlers}
        >
          {/* 3-slide windowed lightbox */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {[
              { idx: prevIdx, offset: -1 },
              { idx: currentIndex, offset: 0 },
              { idx: nextIdx, offset: 1 },
            ].map(({ idx, offset }) => {
              const isActive = offset === 0;
              let lbTransform, lbOpacity;
              if (isDragging) {
                lbTransform = `translateX(calc(${offset * 100}% + ${dragOffset}px))`;
                lbOpacity = isActive ? 1 : offset === -1 ? Math.min(1, Math.max(0, dragOffset / 120)) : Math.min(1, Math.max(0, -dragOffset / 120));
              } else {
                lbTransform = `translateX(${offset * 100}%)`;
                lbOpacity = isActive ? 1 : 0;
              }
              return (
                <div
                  key={`lb-${offset}-${idx}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: lbTransform,
                    opacity: lbOpacity,
                    transition: isDragging ? 'none' : 'opacity 0.4s ease, transform 0.38s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={images[idx]}
                    alt={`Fullscreen ${idx + 1}`}
                    draggable={false}
                    style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', pointerEvents: 'none', userSelect: 'none' }}
                  />
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <button onClick={closeLightbox} style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', cursor: 'pointer', zIndex: 100000, borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <X size={22} />
          </button>
          <a href={images[currentIndex]} download style={{ position: 'absolute', top: '16px', left: '70px', background: 'rgba(255,255,255,0.12)', color: 'white', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000, textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
            <Download size={20} />
          </a>
          <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', cursor: 'pointer', zIndex: 100000, borderRadius: '50%', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <ChevronLeft size={30} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleNext(); }} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', cursor: 'pointer', zIndex: 100000, borderRadius: '50%', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <ChevronRight size={30} />
          </button>
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', letterSpacing: '2px', fontFamily: 'var(--font-heading)', pointerEvents: 'none' }}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}

    </section>
  );
};

export default Gallery;
