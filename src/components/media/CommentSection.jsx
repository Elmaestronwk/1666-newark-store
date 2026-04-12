import React, { useState } from 'react';
import { Star, Send, User, MessageSquare, ShieldAlert } from 'lucide-react';
import { useMediaStore } from '../../store/mediaStore';
import { useSound } from '../../hooks/useSound';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  list: {
    maxHeight: '300px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingRight: '8px',
  },
  item: {
    background: 'rgba(255,255,255,0.02)',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  userName: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--gold-soft)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  rating: {
    display: 'flex',
    gap: '2px',
  },
  text: {
    fontSize: '13px',
    lineHeight: '1.5',
    color: 'var(--text-secondary)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    background: 'rgba(255,255,255,0.03)',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid var(--gold-border-subtle)',
  },
  input: {
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '10px 14px',
    color: 'var(--text-primary)',
    fontSize: '13px',
    outline: 'none',
    fontFamily: 'inherit',
  },
  textarea: {
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '10px 14px',
    color: 'var(--text-primary)',
    fontSize: '13px',
    outline: 'none',
    fontFamily: 'inherit',
    minHeight: '60px',
    resize: 'none',
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '8px',
    background: 'var(--gold-primary)',
    color: '#000',
    fontSize: '12px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
  },
  honeypot: {
    display: 'none',
  }
};

export default function CommentSection({ mediaId, comments = [], reviews = [] }) {
  const [formType, setFormType] = useState('comment'); // 'comment' or 'review'
  const [formData, setFormData] = useState({ name: '', text: '', rating: 5, hp: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { addComment, addReview } = useMediaStore();
  const { playClick, playSuccess } = useSound();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.hp) return; // Honeypot triggered

    try {
      if (formType === 'comment') {
        await addComment(mediaId, { user_name: formData.name, content: formData.text });
      } else {
        await addReview(mediaId, { user_name: formData.name, comment: formData.text, rating: formData.rating });
      }
      playSuccess();
      setIsSubmitted(true);
      setFormData({ name: '', text: '', rating: 5, hp: '' });
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const allInteractions = [
    ...comments.map(c => ({ ...c, type: 'comment' })),
    ...reviews.map(r => ({ ...r, type: 'review' }))
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div style={styles.container}>
      <div style={styles.list}>
        {allInteractions.length === 0 ? (
          <p style={{textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px'}}>No community feedback yet. Be the first.</p>
        ) : (
          allInteractions.map((item, idx) => (
            <div key={idx} style={styles.item}>
              <div style={styles.itemHeader}>
                <div style={styles.userName}>
                  <User size={12} /> {item.user_name}
                  {item.type === 'review' && (
                    <div style={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={10} 
                          fill={i < item.rating ? 'var(--gold-primary)' : 'transparent'} 
                          color="var(--gold-primary)" 
                        />
                      ))}
                    </div>
                  )}
                </div>
                <span style={{fontSize: '10px', color: 'var(--text-muted)'}}>
                  {item.type.toUpperCase()}
                </span>
              </div>
              <p style={styles.text}>{item.content || item.comment}</p>
            </div>
          ))
        )}
      </div>

      {!isSubmitted ? (
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={{display: 'flex', gap: '8px', marginBottom: '8px'}}>
            <button 
              type="button"
              onClick={() => setFormType('comment')}
              style={{
                flex: 1, padding: '6px', borderRadius: '6px', fontSize: '11px',
                background: formType === 'comment' ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
                border: `1px solid ${formType === 'comment' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)'}`,
                color: formType === 'comment' ? 'var(--gold-primary)' : 'var(--text-secondary)'
              }}
            >
              Add Comment
            </button>
            <button 
              type="button"
              onClick={() => setFormType('review')}
              style={{
                flex: 1, padding: '6px', borderRadius: '6px', fontSize: '11px',
                background: formType === 'review' ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
                border: `1px solid ${formType === 'review' ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)'}`,
                color: formType === 'review' ? 'var(--gold-primary)' : 'var(--text-secondary)'
              }}
            >
              Write Review
            </button>
          </div>

          <input 
            placeholder="Your Name" 
            style={styles.input} 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
          
          {/* Honeypot field */}
          <input 
            style={styles.honeypot} 
            value={formData.hp}
            onChange={e => setFormData({...formData, hp: e.target.value})}
            autoComplete="off"
          />

          {formType === 'review' && (
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <span style={{fontSize: '12px', color: 'var(--text-secondary)'}}>Rating:</span>
              <div style={styles.rating}>
                {[1, 2, 3, 4, 5].map(num => (
                  <Star 
                    key={num} 
                    size={16} 
                    style={{cursor: 'pointer'}}
                    fill={num <= formData.rating ? 'var(--gold-primary)' : 'transparent'}
                    color="var(--gold-primary)"
                    onClick={() => { setFormData({...formData, rating: num}); playClick(); }}
                  />
                ))}
              </div>
            </div>
          )}

          <textarea 
            placeholder={formType === 'comment' ? "Enter your thoughts..." : "Share your experience..."}
            style={styles.textarea}
            value={formData.text}
            onChange={e => setFormData({...formData, text: e.target.value})}
            required
          />

          <div style={styles.actionRow}>
            <p style={{fontSize: '10px', color: 'var(--text-muted)', maxWidth: '160px'}}>
              Feedback undergoes moderation before publishing.
            </p>
            <button type="submit" style={styles.submitBtn}>
              <Send size={14} /> Submit Feedback
            </button>
          </div>
        </form>
      ) : (
        <div style={{...styles.form, textAlign: 'center', padding: '30px'}}>
          <ShieldAlert size={32} color="var(--gold-primary)" style={{margin: '0 auto 12px'}} />
          <h4 style={{color: 'var(--gold-primary)', marginBottom: '4px'}}>Transmission Received</h4>
          <p style={{fontSize: '12px', color: 'var(--text-secondary)'}}>
            Your feedback has been sent for moderation.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            style={{marginTop: '16px', fontSize: '11px', color: 'var(--gold-soft)', textDecoration: 'underline'}}
          >
            Post another
          </button>
        </div>
      )}
    </div>
  );
}
