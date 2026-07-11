import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import qrBride from '../image/qr_bride.jpg';
import qrGroom from '../image/qr_groom.jpg';

const Gift = () => {
  const { t } = useLanguage();

  return (
    <section className="section animate-fade-in" style={{ backgroundColor: '#ffffff' }}>
      <h2 style={{ 
        fontFamily: "'Great Vibes', cursive", 
        fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', 
        color: '#e2b3a3',
        marginBottom: '1rem',
        fontWeight: 'normal',
        textAlign: 'center'
      }}>
        Gift
      </h2>
      <p style={{ marginBottom: '3rem', color: '#666', maxWidth: '600px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
        {t('gift_desc')}
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '3rem',
        padding: '0 1rem'
      }}>
        {/* Groom's Bank */}
        <div style={{
          padding: '2rem',
          border: '1px solid rgba(74, 93, 35, 0.2)',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          maxWidth: '300px',
          width: '100%'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--moss-green)' }}>
            {t('groom_bank')}
          </h3>
          <img 
            src={qrGroom} 
            alt="QR Code Groom" 
            style={{ width: '100%', height: 'auto', borderRadius: '10px', marginBottom: '1rem' }} 
          />
          <div style={{ textAlign: 'left', marginTop: '1rem' }}>
            <p><strong>{t('bank_name')}</strong> Vietcombank</p>
            <p><strong>{t('bank_account')}</strong> 1234567890</p>
            <p><strong>{t('bank_owner')}</strong> JIN YEONG</p>
          </div>
        </div>

        {/* Bride's Bank */}
        <div style={{
          padding: '2rem',
          border: '1px solid rgba(74, 93, 35, 0.2)',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          maxWidth: '300px',
          width: '100%'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--moss-green)' }}>
            {t('bride_bank')}
          </h3>
          <img 
            src={qrBride} 
            alt="QR Code Bride" 
            style={{ width: '100%', height: 'auto', borderRadius: '10px', marginBottom: '1rem' }} 
          />
          <div style={{ textAlign: 'left', marginTop: '1rem' }}>
            <p><strong>{t('bank_name')}</strong> MB Bank</p>
            <p><strong>{t('bank_account')}</strong> 0987654321</p>
            <p><strong>{t('bank_owner')}</strong> NGUYEN THI HUE</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gift;
