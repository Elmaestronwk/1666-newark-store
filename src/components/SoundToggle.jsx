import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundStore } from '../store/soundStore';
import { useSound } from '../hooks/useSound';

const SoundToggle = () => {
  const { isMuted, toggleMuted } = useSoundStore();
  const { playClick, initAudio } = useSound();

  const handleToggle = (e) => {
    e.stopPropagation();
    initAudio(); // Ensure context is initialized/resumed
    toggleMuted();
  };

  return (
    <button 
      onClick={handleToggle}
      style={styles.container}
      className="luxury-panel"
      title={isMuted ? "Enable Ambient Audio" : "Mute Ambient Audio"}
    >
      {isMuted ? (
        <VolumeX size={16} color="rgba(245, 241, 232, 0.4)" />
      ) : (
        <div style={styles.activeContainer}>
          <Volume2 size={16} color="var(--gold-primary)" />
          <div className="audio-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      )}
      <span className="micro-label" style={{ ...styles.label, color: isMuted ? 'var(--text-muted)' : 'var(--gold-primary)' }}>
        {isMuted ? 'AMBIENT OFF' : 'AMBIENT ON'}
      </span>
      
      <style>{`
        .audio-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 10px;
          margin-left: 6px;
        }
        .bar {
          width: 2px;
          background-color: var(--gold-primary);
          animation: audio-pulse 1s ease-in-out infinite;
        }
        .bar:nth-child(2) { animation-delay: 0.2s; height: 6px; }
        .bar:nth-child(1) { height: 4px; }
        .bar:nth-child(3) { animation-delay: 0.4s; height: 8px; }

        @keyframes audio-pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
      `}</style>
    </button>
  );
};

const styles = {
  container: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--gold-border-subtle)',
    padding: '8px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    outline: 'none',
    borderRadius: '4px',
  },
  activeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    letterSpacing: '0.15em',
    fontSize: '10px',
    fontWeight: '700',
  }
};

export default SoundToggle;
