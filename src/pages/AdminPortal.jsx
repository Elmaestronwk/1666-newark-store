import React, { useEffect, useState } from 'react';
import { Settings, Check, X, Edit2, Trash2, Eye, ShieldCheck, Clock, ArrowUp, ArrowDown, Video, Image as ImageIcon, Star, Search, Filter } from 'lucide-react';
import { useMediaStore } from '../store/mediaStore';
import { supabase } from '../lib/supabase';
import { useSound } from '../hooks/useSound';
import MediaUploadPortal from '../components/media/MediaUploadPortal';

const styles = {
  container: {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    paddingBottom: '24px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    background: 'var(--surface-panel)',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid var(--gold-border-subtle)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'var(--surface-panel)',
    borderRadius: '24px',
    overflow: 'hidden',
    border: '1px solid var(--gold-border-subtle)',
  },
  th: {
    textAlign: 'left',
    padding: '16px 24px',
    background: 'rgba(255,255,255,0.03)',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--gold-soft)',
  },
  td: {
    padding: '16px 24px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    fontSize: '14px',
  },
  badge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  actionBtn: {
    padding: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    marginRight: '8px',
  }
};

export default function AdminPortal() {
  const { media, fetchMedia, deleteMedia, updateMediaOrder, isLoading } = useMediaStore();
  const [showUpload, setShowUpload] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState('media'); // 'media', 'comments', 'reviews'
  const [searchQuery, setSearchQuery] = useState('');
  const { playClick, playNav, playSuccess } = useSound();

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleModeration = async (type, id, status) => {
    playClick();
    const table = type === 'comment' ? 'comments' : 'reviews';
    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq('id', id);
    
    if (!error) {
      playSuccess();
      fetchMedia();
    }
  };

  const handleReorder = async (id, direction) => {
    playClick();
    const index = media.findIndex(m => m.id === id);
    if (index === -1) return;

    const newMedia = [...media];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= media.length) return;

    // Swap
    [newMedia[index], newMedia[targetIndex]] = [newMedia[targetIndex], newMedia[index]];

    // Map to sort_order updates
    const updates = newMedia.map((m, i) => ({
      id: m.id,
      sort_order: i
    }));

    await updateMediaOrder(updates);
    playSuccess();
  };

  const pendingComments = (media || []).reduce((acc, curr) => 
    acc + (curr.comments?.filter(c => c.status === 'pending').length || 0), 0);
  
  const pendingReviews = (media || []).reduce((acc, curr) => 
    acc + (curr.reviews?.filter(r => r.status === 'pending').length || 0), 0);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 className="section-title" style={{fontSize: '40px', marginBottom: '8px'}}>Command Center</h1>
          <p className="hud-label">Administrative Access // System Node 1666</p>
        </div>
        <button 
          className="luxury-btn" 
          onClick={() => { setShowUpload(!showUpload); playNav(); }}
        >
          {showUpload ? 'Close Portal' : 'New Content Protocol'}
        </button>
      </header>

      {(showUpload || editingItem) && (
        <div style={{marginBottom: '40px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
             <h3 className="hud-label">{editingItem ? 'Edit Protocol' : 'New Content Protocol'}</h3>
             <button onClick={() => { setShowUpload(false); setEditingItem(null); }} style={{background: 'none', border: 'none', color: 'var(--text-secondary)'}}><X size={20}/></button>
          </div>
          <MediaUploadPortal 
            initialData={editingItem}
            onComplete={() => { 
                setShowUpload(false); 
                setEditingItem(null);
                fetchMedia(); 
            }} 
          />
        </div>
      )}

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p className="hud-label">Total Assets</p>
          <h2 style={{fontSize: '32px', marginTop: '8px'}}>{(media || []).length}</h2>
        </div>
        <div style={styles.statCard}>
          <p className="hud-label" style={{color: pendingComments > 0 ? 'var(--gold-primary)' : 'inherit'}}>
            Pending Comments
          </p>
          <h2 style={{fontSize: '32px', marginTop: '8px'}}>{pendingComments}</h2>
        </div>
        <div style={styles.statCard}>
          <p className="hud-label" style={{color: pendingReviews > 0 ? 'var(--gold-primary)' : 'inherit'}}>
            Pending Reviews
          </p>
          <h2 style={{fontSize: '32px', marginTop: '8px'}}>{pendingReviews}</h2>
        </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '20px'}}>
        <div style={{display: 'flex', gap: '12px'}}>
          {['media', 'comments', 'reviews'].map(tab => {
            const counts = {
                media: (media || []).length,
                comments: (media || []).flatMap(m => m.comments || []).filter(c => c.status === 'pending').length,
                reviews: (media || []).flatMap(m => m.reviews || []).filter(r => r.status === 'pending').length
            };
            return (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); playClick(); }}
                style={{
                  padding: '12px 24px', borderRadius: '12px', fontSize: '11px', textTransform: 'uppercase',
                  letterSpacing: '0.1em', fontWeight: 600,
                  background: activeTab === tab ? 'var(--gold-primary)' : 'rgba(255,255,255,0.03)',
                  color: activeTab === tab ? '#000' : 'var(--text-secondary)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative'
                }}
              >
                {tab} Management
                {tab !== 'media' && counts[tab] > 0 && (
                    <span style={{
                        position: 'absolute', top: '-8px', right: '-8px', background: '#ff4444', 
                        color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px',
                        border: '2px solid var(--bg-primary)'
                    }}>
                        {counts[tab]}
                    </span>
                )}
              </button>
            );
          })}
        </div>
        
        {activeTab === 'media' && (
            <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface-panel)',
                padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--gold-border-subtle)',
                width: '100%', maxWidth: '300px'
            }}>
                <Search size={16} color="var(--gold-soft)" />
                <input 
                    placeholder="Search Archives..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        background: 'none', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', width: '100%'
                    }}
                />
            </div>
        )}
      </div>

      <div style={{overflowX: 'auto'}}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Asset</th>
              <th style={styles.th}>Details</th>
              {activeTab === 'media' ? (
                <>
                  <th style={styles.th}>Interaction</th>
                  <th style={styles.th}>Actions</th>
                </>
              ) : (
                <>
                  <th style={styles.th}>Content</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {activeTab === 'media' && (media || [])
              .filter(item => 
                 item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 item.tag?.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item, index) => (
                <tr key={item.id}>
                  <td style={styles.td}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: '#000', position: 'relative'}}>
                        {item.media_type === 'image' ? (
                          <img src={item.media_url} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                        ) : (
                          <video src={item.media_url} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                        )}
                        <div style={{position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', padding: '2px', borderRadius: '4px'}}>
                          {item.media_type === 'image' ? <ImageIcon size={10} color="var(--gold-primary)"/> : <Video size={10} color="var(--gold-primary)"/>}
                        </div>
                      </div>
                      <div>
                        <p style={{fontWeight: 600, fontSize: '13px'}}>{item.title}</p>
                        <div style={{display: 'flex', gap: '6px', marginTop: '4px'}}>
                          <span style={{
                              ...styles.badge, 
                              background: item.is_published ? 'rgba(68, 255, 68, 0.1)' : 'rgba(255, 68, 68, 0.1)',
                              color: item.is_published ? '#44ff44' : '#ff4444'
                          }}>
                              {item.is_published ? 'Published' : 'Draft'}
                          </span>
                          {item.is_featured && (
                               <span style={{
                                  ...styles.badge, 
                                  background: 'rgba(212, 175, 55, 0.1)',
                                  color: 'var(--gold-primary)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '2px'
                              }}>
                                  <Star size={8} fill="var(--gold-primary)"/> Featured
                              </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <p style={{fontSize: '12px'}}>{item.location || 'No Location'}</p>
                    <p style={{fontSize: '10px', color: 'var(--text-muted)'}}>{item.post_date}</p>
                  </td>
                  <td style={styles.td}>
                    <div style={{display: 'flex', gap: '12px', fontSize: '11px'}}>
                      <span>💬 {item.comments?.length || 0}</span>
                      <span>⭐ {item.reviews?.length || 0}</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={{display: 'flex', gap: '4px'}}>
                      <button style={styles.actionBtn} onClick={() => setEditingItem(item)}>
                          <Edit2 size={16} color="var(--gold-soft)" />
                      </button>
                      <button style={styles.actionBtn} onClick={() => deleteMedia(item.id)}>
                          <Trash2 size={16} color="#ff4444" />
                      </button>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                          <button 
                              style={{...styles.actionBtn, padding: '2px', marginRight: 0}} 
                              disabled={index === 0}
                              onClick={() => handleReorder(item.id, 'up')}
                          >
                              <ArrowUp size={14} />
                          </button>
                          <button 
                              style={{...styles.actionBtn, padding: '2px', marginRight: 0}} 
                              disabled={index === media.length - 1}
                              onClick={() => handleReorder(item.id, 'down')}
                          >
                              <ArrowDown size={14} />
                          </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            }

            {activeTab === 'comments' && (media || []).flatMap(m => m.comments || []).map(comment => (
              <tr key={comment.id}>
                <td style={styles.td}>{comment.user_name}</td>
                <td style={styles.td}>
                  <p style={{fontSize: '11px', color: 'var(--text-muted)'}}>On Media ID: {comment.media_id.slice(0, 8)}</p>
                </td>
                <td style={styles.td}>{comment.content}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    background: comment.status === 'approved' ? 'rgba(0,255,0,0.1)' : comment.status === 'pending' ? 'rgba(255,255,0,0.1)' : 'rgba(255,0,0,0.1)',
                    color: comment.status === 'approved' ? '#44ff44' : comment.status === 'pending' ? '#ffff44' : '#ff4444'
                  }}>
                    {comment.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={styles.actionBtn} onClick={() => handleModeration('comment', comment.id, 'approved')}>
                    <Check size={16} color="#44ff44" />
                  </button>
                  <button style={styles.actionBtn} onClick={() => handleModeration('comment', comment.id, 'rejected')}>
                    <X size={16} color="#ff4444" />
                  </button>
                </td>
              </tr>
            ))}

            {activeTab === 'reviews' && (media || []).flatMap(m => m.reviews || []).map(review => (
              <tr key={review.id}>
                <td style={styles.td}>{review.user_name}</td>
                <td style={styles.td}>
                  <div style={{display: 'flex', gap: '2px'}}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill={i < review.rating ? 'var(--gold-primary)' : 'transparent'} color="var(--gold-primary)" />
                    ))}
                  </div>
                </td>
                <td style={styles.td}>{review.comment}</td>
                <td style={styles.td}>
                   <span style={{
                    ...styles.badge,
                    background: review.status === 'approved' ? 'rgba(0,255,0,0.1)' : review.status === 'pending' ? 'rgba(255,255,0,0.1)' : 'rgba(255,0,0,0.1)',
                    color: review.status === 'approved' ? '#44ff44' : review.status === 'pending' ? '#ffff44' : '#ff4444'
                  }}>
                    {review.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={styles.actionBtn} onClick={() => handleModeration('review', review.id, 'approved')}>
                    <Check size={16} color="#44ff44" />
                  </button>
                  <button style={styles.actionBtn} onClick={() => handleModeration('review', review.id, 'rejected')}>
                    <X size={16} color="#ff4444" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
