import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, MapPin, Tag, Calendar, Type, AlignLeft, Eye, EyeOff, Star } from 'lucide-react';
import { useMediaStore } from '../../store/mediaStore';
import { useSound } from '../../hooks/useSound';

const styles = {
  portal: {
    padding: '40px',
    background: 'var(--surface-panel)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid var(--gold-border-subtle)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  },
  dropzone: {
    border: '2px dashed var(--gold-border-subtle)',
    borderRadius: '16px',
    padding: '60px 40px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'rgba(212, 175, 55, 0.02)',
  },
  dropzoneActive: {
    borderColor: 'var(--gold-primary)',
    background: 'rgba(212, 175, 55, 0.05)',
  },
  previewContainer: {
    marginTop: '30px',
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '30px',
  },
  previewMedia: {
    width: '100%',
    aspectRatio: '1/1',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid var(--gold-border-subtle)',
    position: 'relative',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255,255,255,0.03)',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  input: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    width: '100%',
    fontFamily: 'inherit',
    fontSize: '14px',
    outline: 'none',
  },
  textarea: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    width: '100%',
    fontFamily: 'inherit',
    fontSize: '14px',
    outline: 'none',
    minHeight: '80px',
    resize: 'none',
  },
  label: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: 'var(--gold-soft)',
    marginBottom: '8px',
  },
  submitBtn: {
    marginTop: '20px',
    width: '100%',
  }
};

export default function MediaUploadPortal({ onComplete, initialData = null }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initialData?.media_url || null);
  const [metadata, setMetadata] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    tag: initialData?.tag || '',
    date: initialData?.post_date || new Date().toISOString().split('T')[0],
    is_published: initialData?.is_published ?? true,
    is_featured: initialData?.is_featured ?? false
  });
  
  const { uploadMedia, updateMedia, isLoading } = useMediaStore();
  const { playClick, playSuccess } = useSound();

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      playClick();
    }
  }, [playClick]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov', '.webm']
    },
    multiple: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !initialData) return;

    try {
      if (initialData) {
        await updateMedia(initialData.id, metadata);
      } else {
        await uploadMedia(file, metadata);
      }
      playSuccess();
      if (onComplete) onComplete();
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error('Operation failed:', err);
    }
  };

  return (
    <div style={styles.portal}>
      {!file ? (
        <div 
          {...getRootProps()} 
          style={{...styles.dropzone, ...(isDragActive ? styles.dropzoneActive : {})}}
        >
          <input {...getInputProps()} />
          <Upload size={48} color="var(--gold-primary)" style={{marginBottom: '16px'}} />
          <p className="hud-label">Init Media Stream</p>
          <h3 style={{fontFamily: 'var(--font-sans)', marginTop: '8px'}}>Drag and drop media files here</h3>
          <p style={{color: 'var(--text-secondary)', fontSize: '14px', marginTop: '12px'}}>
            Supports JPG, PNG, WEBP, MP4, MOV, WEBM
          </p>
        </div>
      ) : (
        <div style={styles.previewContainer}>
          <div style={styles.previewMedia}>
            {initialData ? (
               initialData.media_type === 'image' ? (
                <img src={preview} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              ) : (
                <video src={preview} style={{width: '100%', height: '100%', objectFit: 'cover'}} controls />
              )
            ) : file.type.startsWith('image/') ? (
              <img src={preview} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            ) : (
              <video src={preview} style={{width: '100%', height: '100%', objectFit: 'cover'}} controls />
            )}
            {!initialData && (
              <button 
                onClick={() => { setFile(null); setPreview(null); }}
                style={{position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.5)', padding: '6px', borderRadius: '50%'}}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div>
              <p style={styles.label}>Content Manifest</p>
              <div style={styles.inputGroup}>
                <Type size={16} color="var(--gold-soft)" />
                <input 
                  placeholder="Post Title" 
                  style={styles.input} 
                  value={metadata.title}
                  onChange={e => setMetadata({...metadata, title: e.target.value})}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <AlignLeft size={16} color="var(--gold-soft)" />
              <textarea 
                placeholder="Description / Field Notes" 
                style={styles.textarea}
                value={metadata.description}
                onChange={e => setMetadata({...metadata, description: e.target.value})}
              />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
              <div style={styles.inputGroup}>
                <MapPin size={16} color="var(--gold-soft)" />
                <input 
                  placeholder="Location" 
                  style={styles.input}
                  value={metadata.location}
                  onChange={e => setMetadata({...metadata, location: e.target.value})}
                />
              </div>
              <div style={styles.inputGroup}>
                <Tag size={16} color="var(--gold-soft)" />
                <input 
                  placeholder="Category/Tag" 
                  style={styles.input}
                  value={metadata.tag}
                  onChange={e => setMetadata({...metadata, tag: e.target.value})}
                />
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
              <div style={styles.inputGroup}>
                <Calendar size={16} color="var(--gold-soft)" />
                <input 
                  type="date" 
                  style={styles.input}
                  value={metadata.date}
                  onChange={e => setMetadata({...metadata, date: e.target.value})}
                />
              </div>
              <div style={{display: 'flex', gap: '8px'}}>
                <button
                  type="button"
                  onClick={() => setMetadata({...metadata, is_published: !metadata.is_published})}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: metadata.is_published ? 'rgba(68, 255, 68, 0.1)' : 'rgba(255, 68, 68, 0.1)',
                    color: metadata.is_published ? '#44ff44' : '#ff4444',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  {metadata.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                  {metadata.is_published ? 'Live' : 'Draft'}
                </button>
                <button
                  type="button"
                  onClick={() => setMetadata({...metadata, is_featured: !metadata.is_featured})}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: metadata.is_featured ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255,255,255,0.03)',
                    color: metadata.is_featured ? 'var(--gold-primary)' : 'var(--text-secondary)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  <Star size={14} fill={metadata.is_featured ? 'var(--gold-primary)' : 'transparent'} />
                  Featured
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="luxury-btn" 
              style={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : initialData ? 'Update Post' : 'Commit to Database'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
