import React from 'react';
import { MapPin, Clock, Heart, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Calendar from './Calendar';

const Details = () => {
  const { t } = useLanguage();

  return (
    <section className="section animate-fade-in" style={{ backgroundColor: '#ffffff' }}>

      <Calendar />

      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}>
        
        <h2 style={{ 
          fontFamily: "'Great Vibes', cursive", 
          fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', 
          color: '#d4af37',
          marginBottom: '3rem',
          fontWeight: 'normal',
          textAlign: 'center'
        }}>
          {t('event_title')}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          
          {/* ── Lễ Vu Quy (Nhà Gái) ── */}
          <div style={{ 
            border: '1px solid rgba(212,175,55,0.25)', 
            borderRadius: '20px',
            backgroundColor: '#fefefe',
            boxShadow: '0 15px 40px rgba(0,0,0,0.07)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Gold top accent bar */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #d4af37, #f5e6c8, #d4af37)' }} />

            {/* Heart badge */}
            <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.3)' }}>
              <Heart color="#d4af37" size={18} fill="#d4af37" />
            </div>

            <div style={{ padding: '2.5rem 1.5rem 0' }}>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--moss-green)', textAlign: 'center', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                {t('event_vu_quy')}
              </h3>
              <p style={{ textAlign: 'center', color: '#d4af37', marginBottom: '2rem', fontWeight: '600', letterSpacing: '2px', fontSize: '0.85rem' }}>{t('event_nha_gai')}</p>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                <Clock color="var(--moss-green)" size={22} style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>17:00</p>
                  <p style={{ fontSize: '0.95rem', color: '#666' }}>{t('event_vu_quy_time')}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                <MapPin color="var(--moss-green)" size={22} style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#333', marginBottom: '0.2rem' }}>{t('event_vu_quy_location')}</p>
                  <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: t('event_vu_quy_address') }}></p>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div style={{ margin: '0 1.5rem 0', borderRadius: '12px', overflow: 'hidden', height: '200px' }}>
              <iframe
                title="Địa điểm Lễ Vu Quy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14914.432!2d106.063!3d20.811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135e78b56a3f567%3A0x0!2zVGjhuqduIEtow6osIEjGsG5nIFnDqm4!5e0!3m2!1svi!2svn!4v1689000000000!5m2!1svi!2svn"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Direction Button */}
            <div style={{ padding: '1.2rem 1.5rem 2rem', textAlign: 'center' }}>
              <a
                href="https://maps.google.com/?q=Thôn+Đồng+Phú,+xã+Thần+Khê,+tỉnh+Hưng+Yên"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 2rem',
                  background: 'linear-gradient(135deg, #d4af37, #f5e6c8, #d4af37)',
                  color: '#2a1f0e',
                  textDecoration: 'none',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
                  letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,175,55,0.5)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(212,175,55,0.3)'; }}
              >
                <Navigation size={16} />
                {t('directions')}
              </a>
            </div>
          </div>

          {/* ── Lễ Thành Hôn (Nhà Trai) ── */}
          <div style={{ 
            border: '1px solid rgba(212,175,55,0.25)', 
            borderRadius: '20px',
            backgroundColor: '#fefefe',
            boxShadow: '0 15px 40px rgba(0,0,0,0.07)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Gold top accent bar */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #d4af37, #f5e6c8, #d4af37)' }} />

            {/* Heart badge */}
            <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.3)' }}>
              <Heart color="#d4af37" size={18} fill="#d4af37" />
            </div>

            <div style={{ padding: '2.5rem 1.5rem 0' }}>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--moss-green)', textAlign: 'center', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                {t('event_thanh_hon')}
              </h3>
              <p style={{ textAlign: 'center', color: '#d4af37', marginBottom: '2rem', fontWeight: '600', letterSpacing: '2px', fontSize: '0.85rem' }}>{t('event_nha_trai')}</p>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                <Clock color="var(--moss-green)" size={22} style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>12:30</p>
                  <p style={{ fontSize: '0.95rem', color: '#666' }}>{t('event_thanh_hon_time')}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                <MapPin color="var(--moss-green)" size={22} style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#333', marginBottom: '0.2rem' }}>{t('event_thanh_hon_location')}</p>
                  <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: t('event_thanh_hon_address') }}></p>
                </div>
              </div>
            </div>

            {/* Embedded Map — Sheraton West Hotel Hanoi */}
            <div style={{ margin: '0 1.5rem 0', borderRadius: '12px', overflow: 'hidden', height: '200px' }}>
              <iframe
                title="Địa điểm Lễ Thành Hôn"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0!2d105.763!3d21.042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7cde9e5e93%3A0x96e498f52c2c0!2sSheraton%20Hanoi%20West%20Hotel!5e0!3m2!1svi!2svn!4v1689000000000!5m2!1svi!2svn"
                width="100%"
                height="200"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Direction Button */}
            <div style={{ padding: '1.2rem 1.5rem 2rem', textAlign: 'center' }}>
              <a
                href="https://maps.app.goo.gl/qHF1YoYYC4Z5RGFAA"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 2rem',
                  background: 'linear-gradient(135deg, #d4af37, #f5e6c8, #d4af37)',
                  color: '#2a1f0e',
                  textDecoration: 'none',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
                  letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,175,55,0.5)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(212,175,55,0.3)'; }}
              >
                <Navigation size={16} />
                {t('directions')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Details;
