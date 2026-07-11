import React, { useState, useEffect, useRef } from 'react';
import { Music, Music3 } from 'lucide-react';
import song from '../audio/song.mp3';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio object once
  useEffect(() => {
    audioRef.current = new Audio(song);
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  // We can also expose a global event or something if Envelope wants to trigger play,
  // but for simplicity, we let the user click the button to play, or Envelope can trigger it.
  useEffect(() => {
    const handleEnvelopeOpen = () => {
      if (!isPlaying) togglePlay();
    };
    window.addEventListener('startMusic', handleEnvelopeOpen);
    return () => window.removeEventListener('startMusic', handleEnvelopeOpen);
  }, [isPlaying]);

  return (
    <button 
      onClick={togglePlay}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--moss-green)',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 999,
        animation: isPlaying ? 'spin 4s linear infinite' : 'none'
      }}
    >
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
      {isPlaying ? <Music3 size={24} /> : <Music size={24} />}
    </button>
  );
};

export default AudioPlayer;
