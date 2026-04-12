import React, { useState } from 'react';
import { MapPin, Calendar, Tag, MessageSquare, Star, Share2 } from 'lucide-react';
import CommentSection from './CommentSection';
import { useSound } from '../../hooks/useSound';

const styles = {
  card: {
    background: 'var(--surface-panel)',
    borderRadius: '24px',
    border: '1px solid var(--gold-border-subtle)',
    overflow: 'hidden',
    transition: 'transform 0.4s var(--transition-cinematic)',
    display: 'flex',
    flexDirection: 'column',
  },
  mediaWrapper: {
    width: '100%',
    aspectRatio: '16/10',
    overflow: 'hidden',
    position: 'relative',
    background: '#000',
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s var(--transition-cinematic)',
  },
  content: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    color: 'var(--gold-primary)',
  },
  description: {
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'var(--text-primary)',
    opacity: 0.8,
  },
  tag: {
    display: 'inline-block',
    padding: '4px 10px',
    background: 'rgba(212, 175, 55, 0.1)',
    border: '1px solid var(--gold-border-subtle)',
    borderRadius: '6px',
    fontSize: '10px',
    color: 'var(--gold-soft)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  interactionRow: {
    marginTop: 'auto',
    padding: '16px 24px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  }
};

export default function MediaPostCard({ item }) {
  const [showComments, setShowComments] = useState(false);
  const { playClick } = useSound();

  const handleInteraction = (type) => {
    playClick();
    if (type === 'comments') setShowComments(!showComments);
  };

  const approvedComments = item?.comments?.filter(c => c?.status === 'approved') || [];
  const approvedReviews = item?.reviews?.filter(r => r?.status === 'approved') || [];
  
  const avgRating = approvedReviews.length > 0 
    ? (approvedReviews.reduce((acc, curr) => acc + curr.rating, 0) / approvedReviews.length).toFixed(1)
    : null;

  return (
    <div style={styles.card}>
      <div style={styles.mediaWrapper}>
        {item?.media_type === 'video' ? (
          <video 
            src={item?.media_url || ''} 
            style={styles.media} 
            controls 
            muted 
            onMouseOver={e => e.target.play()}
            onMouseOut={e => e.target.pause()}
          />
        ) : (
          <img src={item?.media_url || ''} alt={item?.title || 'Media'} style={styles.media} />
        )}
      </div>

      <div style={styles.content}>
        <div style={styles.meta}>
          {item.location && (
            <div style={styles.metaItem}>
              <MapPin size={12} /> {item.location}
            </div>
          )}
          <div style={styles.metaItem}>
            <Calendar size={12} /> {item.post_date}
          </div>
          {item.tag && <div style={styles.tag}>{item.tag}</div>}
        </div>

        <h3 style={styles.title}>{item?.title || 'Untitled'}</h3>
        {item?.description && <p style={styles.description}>{item.description}</p>}
      </div>

      <div style={styles.interactionRow}>
        <div 
          style={styles.iconBtn} 
          onClick={() => handleInteraction('comments')}
        >
          <MessageSquare size={16} color={showComments ? 'var(--gold-primary)' : 'inherit'} />
          <span>{approvedComments.length} Comments</span>
        </div>
        
        {avgRating && (
          <div style={styles.iconBtn}>
            <Star size={16} fill="var(--gold-primary)" color="var(--gold-primary)" />
            <span>{avgRating} ({approvedReviews.length} Reviews)</span>
          </div>
        )}

        <div style={{...styles.iconBtn, marginLeft: 'auto'}}>
          <Share2 size={16} />
        </div>
      </div>

      {showComments && (
        <div style={{padding: '0 24px 24px'}}>
          <CommentSection mediaId={item.id} comments={approvedComments} reviews={approvedReviews} />
        </div>
      )}
    </div>
  );
}
