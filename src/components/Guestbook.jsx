import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Guestbook = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, message });
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setMessage('');
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="section animate-fade-in" style={{ backgroundColor: 'var(--moss-light)' }}>
      <h2 style={{ 
        fontFamily: "'Great Vibes', cursive", 
        fontSize: '3.5rem', 
        color: '#e2b3a3',
        marginBottom: '1rem',
        fontWeight: 'normal',
        textAlign: 'center'
      }}>
        Guestbook
      </h2>
      <p style={{ marginBottom: '2rem', color: '#555', textAlign: 'center' }}>{t('guestbook_desc')}</p>

      <form 
        onSubmit={handleSubmit}
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          textAlign: 'left'
        }}
      >
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('name_label')}</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="..."
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontFamily: 'var(--font-body)'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t('message_label')}</label>
          <textarea 
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="..."
            rows={5}
            style={{
              width: '100%',
              padding: '0.8rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontFamily: 'var(--font-body)',
              resize: 'vertical'
            }}
          ></textarea>
        </div>

        <button 
          type="submit"
          style={{
            padding: '1rem',
            backgroundColor: 'var(--moss-green)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '0.5rem',
            transition: 'background-color 0.3s'
          }}
        >
          {submitted ? t('sent_message') : <>{t('send_button')} <Send size={20} /></>}
        </button>
      </form>
    </section>
  );
};

export default Guestbook;
