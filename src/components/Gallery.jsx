import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react';

const Gallery = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const thumbnailRefs = useRef([]);

  // Swipe state
  const swipeStartX = useRef(null);
  const [swipeDelta, setSwipeDelta] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const SWIPE_THRESHOLD = 50; // px to trigger image change

  useEffect(() => {
    if (!hasInteracted) return;
    if (thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentIndex, hasInteracted]);

  // Dynamically import all images in the image folder (supporting multiple formats)
  const imageModules = import.meta.glob('../image/*.{jpg,jpeg,png,webp}', { eager: true });
  const images = Object.values(imageModules)
    .map((mod) => mod.default)
    .filter(src => !src.includes('qr_') && !src.includes('50x75 1')); // Exclude QR codes and Hero image

  if (images.length === 0) return null;

  const handlePrev = () => {
    setHasInteracted(true);
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setHasInteracted(true);
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // ─── Swipe handlers ───
  const onSwipeStart = (clientX) => {
    swipeStartX.current = clientX;
    setIsSwiping(true);
    setSwipeDelta(0);
  };

  const onSwipeMove = (clientX) => {
    if (swipeStartX.current === null) return;
    setSwipeDelta(clientX - swipeStartX.current);
  };

  const onSwipeEnd = () => {
    if (swipeStartX.current === null) return;
    if (swipeDelta < -SWIPE_THRESHOLD) handleNext();
    else if (swipeDelta > SWIPE_THRESHOLD) handlePrev();
    swipeStartX.current = null;
    setIsSwiping(false);
    setSwipeDelta(0);
  };

  const openLightbox = () => {
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="section animate-fade-in" style={{ backgroundColor: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem' }}>
      
      {/* Cursive Title */}
      <h2 style={{ 
        fontFamily: "'Great Vibes', cursive", 
        fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', 
        color: '#d4af37',
        marginBottom: '2rem',
        fontWeight: 'normal',
        textAlign: 'center'
      }}>
        Gallery
      </h2>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
        
        {/* Top Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ 
            backgroundColor: '#dcdcdc', 
            padding: '0.5rem 1rem', 
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'var(--font-heading)'
          }}>
            {currentIndex + 1} / {images.length}
          </div>
          
          <button 
            onClick={openLightbox}
            style={{ 
              backgroundColor: '#b0b0b0', 
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem', 
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem'
            }}
          >
            {t('gallery_more')}
          </button>
        </div>

        {/* Main Slider — swipe enabled */}
        <div
          style={{ position: 'relative', width: '100%', height: '60vh', minHeight: '400px', backgroundColor: '#f5f5f5', borderRadius: '5px', overflow: 'hidden', cursor: isSwiping ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
          onTouchStart={(e) => onSwipeStart(e.touches[0].clientX)}
          onTouchMove={(e) => onSwipeMove(e.touches[0].clientX)}
          onTouchEnd={onSwipeEnd}
          onMouseDown={(e) => onSwipeStart(e.clientX)}
          onMouseMove={(e) => { if (swipeStartX.current !== null) onSwipeMove(e.clientX); }}
          onMouseUp={onSwipeEnd}
          onMouseLeave={onSwipeEnd}
        >
          <img
            src={images[currentIndex]}
            alt={`Gallery ${currentIndex + 1}`}
            draggable={false}
            style={{
              width: '100%', height: '100%', objectFit: 'contain',
              transform: `translateX(${isSwiping ? swipeDelta * 0.3 : 0}px)`,
              transition: isSwiping ? 'none' : 'transform 0.3s ease',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          />

          <button 
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.3)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={30} />
          </button>
          
          <button 
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.3)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={30} />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: '1.5rem', 
          overflowX: 'auto', 
          paddingBottom: '10px',
          WebkitOverflowScrolling: 'touch'
        }}>
          {images.map((src, idx) => (
            <img 
              ref={(el) => (thumbnailRefs.current[idx] = el)}
              key={idx}
              src={src}
              alt={`Thumb ${idx + 1}`}
              onClick={() => {
                setHasInteracted(true);
                setCurrentIndex(idx);
              }}
              style={{
                height: '80px',
                width: 'auto',
                cursor: 'pointer',
                opacity: currentIndex === idx ? 1 : 0.5,
                border: currentIndex === idx ? '2px solid #333' : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Pagination Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {images.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setHasInteracted(true);
                setCurrentIndex(idx);
              }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: currentIndex === idx ? '#d4af37' : '#ddd',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isSwiping ? 'grabbing' : 'grab',
            touchAction: 'none',
          }}
          onTouchStart={(e) => onSwipeStart(e.touches[0].clientX)}
          onTouchMove={(e) => onSwipeMove(e.touches[0].clientX)}
          onTouchEnd={onSwipeEnd}
          onMouseDown={(e) => onSwipeStart(e.clientX)}
          onMouseMove={(e) => { if (swipeStartX.current !== null) onSwipeMove(e.clientX); }}
          onMouseUp={onSwipeEnd}
          onMouseLeave={onSwipeEnd}
        >
          <button 
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px', // Moved to left to avoid language switcher on the right
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              zIndex: 100000
            }}
          >
            <X size={40} />
          </button>
          
          <a 
            href={images[currentIndex]}
            download
            style={{
              position: 'absolute',
              top: '20px',
              left: '80px', // Moved to left alongside X button
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              zIndex: 100000,
              textDecoration: 'none'
            }}
            title="Download"
          >
            <Download size={35} />
          </a>

          <button 
            onClick={handlePrev}
            style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 100000 }}
          >
            <ChevronLeft size={60} />
          </button>

          <img 
            src={images[currentIndex]} 
            alt="Fullscreen" 
            draggable={false}
            style={{
              maxWidth: '90%', maxHeight: '90%', objectFit: 'contain',
              transform: `translateX(${isSwiping ? swipeDelta * 0.2 : 0}px)`,
              transition: isSwiping ? 'none' : 'transform 0.3s ease',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          />

          <button 
            onClick={handleNext}
            style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 100000 }}
          >
            <ChevronRight size={60} />
          </button>
        </div>
      )}

    </section>
  );
};

export default Gallery;
