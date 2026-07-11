import React from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Heart } from 'lucide-react';
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
          fontSize: '3.5rem', 
          color: '#e2b3a3',
          marginBottom: '3rem',
          fontWeight: 'normal',
          textAlign: 'center'
        }}>
          Sự Kiện Cưới
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Lễ Vu Quy (Nhà Gái) */}
          <div style={{ 
            padding: '2.5rem 2rem', 
            border: '2px solid rgba(74, 93, 35, 0.2)', 
            borderRadius: '15px',
            backgroundColor: '#fafafa',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', padding: '0 10px' }}>
              <Heart color="var(--moss-green)" size={24} fill="var(--moss-green)" opacity={0.5} />
            </div>
            
            <h3 style={{ fontSize: '1.8rem', color: 'var(--moss-green)', textAlign: 'center', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              LỄ VU QUY
            </h3>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '2.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>NHÀ GÁI</p>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left', marginBottom: '2rem' }}>
              <Clock color="var(--moss-green)" size={24} style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#444' }}>17:00</p>
                <p style={{ fontSize: '1rem', color: '#666' }}>Thứ Bảy - 01.08.2026</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left' }}>
              <MapPin color="var(--moss-green)" size={24} style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#444', marginBottom: '0.3rem' }}>TƯ GIA NHÀ GÁI</p>
                <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.4' }}>Thôn Đồng Phú, xã Thần Khê,<br/>tỉnh Hưng Yên</p>
                
                <a
                  href="https://maps.google.com/?q=Thôn+Đồng+Phú,+xã+Thần+Khê,+tỉnh+Hưng+Yên"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '1.5rem',
                    padding: '0.7rem 1.2rem',
                    backgroundColor: 'var(--moss-green)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '30px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <MapPin size={16} />
                  {t('directions')}
                </a>
              </div>
            </div>
          </div>

          {/* Lễ Thành Hôn (Nhà Trai) */}
          <div style={{ 
            padding: '2.5rem 2rem', 
            border: '2px solid rgba(74, 93, 35, 0.2)', 
            borderRadius: '15px',
            backgroundColor: '#fafafa',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', padding: '0 10px' }}>
              <Heart color="var(--moss-green)" size={24} fill="var(--moss-green)" opacity={0.5} />
            </div>

            <h3 style={{ fontSize: '1.8rem', color: 'var(--moss-green)', textAlign: 'center', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              LỄ THÀNH HÔN
            </h3>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '2.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>NHÀ TRAI</p>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left', marginBottom: '2rem' }}>
              <Clock color="var(--moss-green)" size={24} style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#444' }}>12:30</p>
                <p style={{ fontSize: '1rem', color: '#666' }}>Chủ Nhật - 02.08.2026</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left' }}>
              <MapPin color="var(--moss-green)" size={24} style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#444', marginBottom: '0.3rem' }}>SHERATON WEST HOTEL</p>
                <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.4' }}>36 Lê Đức Thọ, Từ Liêm,<br/>Hà Nội</p>
                
                <a
                  href="https://maps.app.goo.gl/qHF1YoYYC4Z5RGFAA"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '1.5rem',
                    padding: '0.7rem 1.2rem',
                    backgroundColor: 'var(--moss-green)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '30px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'transform 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <MapPin size={16} />
                  {t('directions')}
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Details;
