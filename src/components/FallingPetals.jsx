import React, { useEffect, useState } from 'react';

const FallingPetals = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const createPetal = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 5 + 5; // 5-10s
      const delay = Math.random() * 5;
      const size = Math.random() * 10 + 10; // 10-20px
      const isSnow = Math.random() > 0.5; // mix of snow and petals

      return { id, left, animationDuration, delay, size, isSnow };
    };

    // Initial batch
    const initialPetals = Array.from({ length: 30 }).map(createPetal);
    setPetals(initialPetals);

  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none',
      zIndex: 9998,
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg) translateX(0); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg) translateX(20px); opacity: 0; }
        }
        .petal {
          position: absolute;
          background: rgba(255, 183, 197, 0.6); /* soft pink petal */
          border-radius: 15px 0 15px 0;
        }
        .snow {
          position: absolute;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 5px white;
        }
      `}</style>

      {petals.map(p => (
        <div 
          key={p.id}
          className={p.isSnow ? 'snow' : 'petal'}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `fall ${p.animationDuration}s linear ${p.delay}s infinite`
          }}
        />
      ))}
    </div>
  );
};

export default FallingPetals;
