import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart } from 'lucide-react';

const OurStory = () => {
  const { t } = useLanguage();

  const events = [
    {
      date: '14.02.2023',
      title: 'Lần đầu gặp gỡ',
      desc: 'Một ngày tình cờ vào dịp Valentine, ánh mắt vô tình chạm nhau và bắt đầu một câu chuyện...',
    },
    {
      date: '20.10.2023',
      title: 'Lời yêu thương',
      desc: 'Cuối cùng anh ấy cũng lấy hết can đảm để nói ra lời yêu.',
    },
    {
      date: '01.01.2025',
      title: 'Lời cầu hôn',
      desc: 'Giữa pháo hoa rực rỡ chào năm mới, một lời hứa trọn đời được trao.',
    }
  ];

  return (
    <section className="section animate-fade-in" style={{ backgroundColor: 'var(--moss-light)' }}>
      <h2 style={{ 
        fontFamily: "'Great Vibes', cursive", 
        fontSize: '3.5rem', 
        color: '#e2b3a3',
        marginBottom: '3rem',
        fontWeight: 'normal',
        textAlign: 'center'
      }}>
        Our Story
      </h2>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '100%',
          backgroundColor: 'var(--moss-green)',
          opacity: 0.3
        }}></div>

        {events.map((event, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
            padding: '2rem 0',
            position: 'relative',
            width: '100%'
          }}>
            {/* Dot */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--moss-light)',
              border: '2px solid var(--moss-green)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}>
              <Heart size={20} color="var(--moss-green)" fill="var(--moss-green)" />
            </div>

            {/* Content Box */}
            <div style={{
              width: '45%',
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              textAlign: index % 2 === 0 ? 'right' : 'left'
            }}>
              <h3 style={{ color: 'var(--gold)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{event.date}</h3>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{event.title}</h4>
              <p style={{ color: '#666', lineHeight: 1.6 }}>{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurStory;
