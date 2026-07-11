import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart } from 'lucide-react';

import storyImg1 from '../image/15x21 1.jpg';
import storyImg2 from '../image/15x21 2.jpg';
import storyImg3 from '../image/15x21 3.jpg';

const OurStory = () => {
  const { t } = useLanguage();

  const events = [
    {
      date: t('story_1_date'),
      title: t('story_1_title'),
      desc: t('story_1_desc'),
      img: storyImg1
    },
    {
      date: t('story_2_date'),
      title: t('story_2_title'),
      desc: t('story_2_desc'),
      img: storyImg2
    },
    {
      date: t('story_3_date'),
      title: t('story_3_title'),
      desc: t('story_3_desc'),
      img: storyImg3
    }
  ];

  return (
    <section className="section animate-fade-in" style={{ backgroundColor: 'var(--moss-light)' }}>
      <h2 style={{ 
        fontFamily: "'Great Vibes', cursive", 
        fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', 
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
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 0',
            position: 'relative',
            width: '100%'
          }}>
            {/* Side 1: Image */}
            <div style={{
              width: '45%',
              display: 'flex',
              justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start'
            }}>
              <img 
                src={event.img} 
                alt={event.title} 
                style={{ 
                  width: '100%', 
                  maxWidth: '350px',
                  height: 'auto', 
                  borderRadius: '15px', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                }} 
              />
            </div>

            {/* Center Dot */}
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

            {/* Side 2: Text Box (Speech Bubble) */}
            <div style={{
              width: '45%',
              backgroundColor: 'white',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              borderRadius: '15px',
              filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.08))',
              textAlign: index % 2 === 0 ? 'left' : 'right',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Speech Bubble Tail */}
              <div style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '12px solid transparent',
                borderBottom: '12px solid transparent',
                ...(index % 2 === 0 
                  ? { 
                      left: '-12px', 
                      borderRight: '12px solid white' 
                    } 
                  : { 
                      right: '-12px', 
                      borderLeft: '12px solid white' 
                    }
                )
              }} />

              <h3 style={{ color: 'var(--gold)', fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', marginBottom: '0.5rem' }}>{event.date}</h3>
              <h4 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginBottom: '0.5rem' }}>{event.title}</h4>
              <p style={{ color: '#666', lineHeight: 1.5, fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurStory;
