import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import brideImg from '../image/bride.webp';
import groomImg from '../image/groom.webp';

const InviteMessage = () => {
  const { t } = useLanguage();

  return (
    <section className="section animate-fade-in" style={{ backgroundColor: '#ffffff', padding: '4rem 1rem 1rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Invite Heading */}
        <h2 style={{ 
          fontFamily: "'Great Vibes', cursive, 'Playfair Display', serif", 
          fontSize: '3rem', 
          color: '#d4af37',
          marginBottom: '3rem',
          fontWeight: 'normal'
        }}>
          {t('invite_heading')}
        </h2>

        {/* Poetic Message */}
        <div style={{ 
          fontSize: '1.2rem', 
          lineHeight: '2.2', 
          color: '#333', 
          marginBottom: '5rem',
          fontFamily: 'var(--font-heading)'
        }}>
          <p>{t('invite_p1')}</p>
          <p>{t('invite_p2')}</p>
          <br/>
          <p>{t('invite_p3')}</p>
          <p>{t('invite_p4')}</p>
          <br/>
          <p>{t('invite_p5')}</p>
          <p>{t('invite_p6')}</p>
          <p>{t('invite_p7')}</p>
        </div>

        {/* Couple Info */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '4rem',
          alignItems: 'center'
        }}>
          
          {/* Groom */}
          <div style={{ textAlign: 'center', maxWidth: '300px', flex: '1 1 250px' }}>
            <div style={{
              width: '200px',
              height: '250px',
              borderRadius: '10px',
              overflow: 'hidden',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={groomImg} 
                alt="Groom" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <p style={{ fontSize: '1rem', color: '#888', marginBottom: '0.2rem', lineHeight: '1.4', whiteSpace: 'pre-line' }}>{t('groom_parents')}</p>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '0.5rem' }}>{t('groom_title')}</p>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>JIN YEONG</h3>
          </div>

          {/* Bride */}
          <div style={{ textAlign: 'center', maxWidth: '300px', flex: '1 1 250px' }}>
            <div style={{
              width: '200px',
              height: '250px',
              borderRadius: '10px',
              overflow: 'hidden',
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}>
              <img 
                src={brideImg} 
                alt="Bride" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <p style={{ fontSize: '1rem', color: '#888', marginBottom: '0.2rem', lineHeight: '1.4', whiteSpace: 'pre-line' }}>{t('bride_parents')}</p>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '0.5rem' }}>{t('bride_title')}</p>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>NGUYỄN HUỆ</h3>
          </div>

        </div>

      </div>
    </section>
  );
};

export default InviteMessage;
