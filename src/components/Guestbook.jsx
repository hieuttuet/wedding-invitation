import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Guestbook = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messagesList, setMessagesList] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxU2D97mMXllvdq0Eo6KrR992EMcYk9AsH1kt0OfhUl1cHJSak90yiiP7V7hqrLxx-8/exec';

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(SCRIPT_URL);
      const json = await response.json();
      if (json.result === 'success') {
        setMessagesList(json.data || []);
      }
    } catch (error) {
      console.error('Error fetching messages', error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Message', message);

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Google Apps Script requires this for cross-origin POST from frontend
      });
      
      // Update locally immediately
      setMessagesList(prev => [{ Name: name, Message: message, Date: new Date().toISOString() }, ...prev]);
      
      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setMessage('');
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section animate-fade-in" style={{ backgroundColor: 'var(--moss-light)' }}>
      <h2 style={{ 
        fontFamily: "'Great Vibes', cursive", 
        fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', 
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
          disabled={isSubmitting || submitted}
          style={{
            padding: '1rem',
            backgroundColor: (isSubmitting || submitted) ? '#a0b080' : 'var(--moss-green)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            cursor: (isSubmitting || submitted) ? 'not-allowed' : 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '0.5rem',
            transition: 'background-color 0.3s'
          }}
        >
          {isSubmitting ? 'Đang gửi...' : (submitted ? t('sent_message') : <>{t('send_button')} <Send size={20} /></>)}
        </button>
      </form>

      {/* Messages List Container */}
      <div style={{
        maxWidth: '500px',
        margin: '3rem auto 0',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1.5rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        textAlign: 'left'
      }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', color: '#333', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
          {t('guestbook_list_title')} ({messagesList.length})
        </h3>
        
        {isLoadingMessages ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>{t('guestbook_loading')}</div>
        ) : messagesList.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>{t('guestbook_empty')}</div>
        ) : (
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto',
            paddingRight: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messagesList.map((msg, idx) => (
              <div key={idx} style={{
                backgroundColor: '#fafafa',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: '4px solid #e2b3a3'
              }}>
                <div style={{ fontWeight: '600', color: '#4a5d23', marginBottom: '0.3rem' }}>{msg.Name}</div>
                <div style={{ color: '#555', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{msg.Message}</div>
              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};

export default Guestbook;
