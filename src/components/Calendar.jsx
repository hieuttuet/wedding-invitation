import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart } from 'lucide-react';

const Calendar = () => {
  const { t, lang } = useLanguage();

  // August 2026: Starts on Saturday (index 6), 31 days.
  const startDay = 6;
  const daysInMonth = 31;
  const weddingDay = 2; // August 2nd

  // Generate an array of days to render (empty cells + valid days)
  const calendarCells = [];
  for (let i = 0; i < startDay; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '2rem' }}>
      <style>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
      <h3 style={{ 
        fontFamily: "'Great Vibes', cursive", 
        fontSize: '3.5rem', 
        color: '#d4af37',
        marginBottom: '3rem',
        fontWeight: 'normal'
      }}>
        {t('calendar_title')}
      </h3>

      <div style={{ 
        maxWidth: '400px', 
        margin: '0 auto',
        fontFamily: 'var(--font-heading)'
      }}>
        {/* Days of week header */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '10px',
          marginBottom: '1.5rem',
          fontWeight: 'bold',
          color: '#333'
        }}>
          {t('days').map((day, idx) => (
            <div key={idx} style={{ color: idx === 0 ? '#d4af37' : '#333' }}>{day}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '10px 0',
          rowGap: '2rem'
        }}>
          {calendarCells.map((day, idx) => {
            const isSunday = idx % 7 === 0;
            const isWeddingDay = day === weddingDay;
            
            return (
              <div 
                key={idx} 
                style={{ 
                  position: 'relative',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isWeddingDay ? 'white' : (isSunday ? '#d4af37' : '#333'),
                  fontWeight: isWeddingDay ? 'bold' : 'normal',
                  fontSize: '1.1rem'
                }}
              >
                {isWeddingDay && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}>
                    <Heart fill="#d4af37" color="#d4af37" size={45} style={{ opacity: 0.8 }} />
                  </div>
                )}
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
