import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ARView = () => {
  const videoRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    let stream = null;
    const enableCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Camera access denied or unavailabe", err);
        setHasPermission(false);
      }
    };

    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.container}
    >
      <div style={styles.header}>
        <h1 style={styles.title}>VIRTUAL TRY-ON</h1>
        <p style={styles.subtitle}>See how it looks on you</p>
      </div>

      <div style={styles.cameraFrame}>
        {hasPermission === null && <p style={styles.status}>Requesting camera access...</p>}
        {hasPermission === false && (
          <div style={styles.errorBox}>
            <p>Camera access denied or unavailable.</p>
            <p style={{fontSize: '14px', color: 'var(--text-muted)', marginTop: '10px'}}>
              Please allow camera access in your browser settings to use the immersive try-on feature. Note: HTTPS or localhost is required.
            </p>
          </div>
        )}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          style={{
            ...styles.video, 
            display: hasPermission ? 'block' : 'none'
          }}
        />
        {hasPermission && (
          <div style={styles.overlay}>
             <div style={styles.overlayBox}>
                 <p style={styles.overlayText}>[ AR Tracking Layer ]</p>
                 <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.5)'}}>Future integration: Face/Body tracking meshes.</p>
             </div>
          </div>
        )}
      </div>

      <div style={styles.controls}>
        <button className="luxury-btn">Take Snapshot</button>
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  },
  header: {
    marginBottom: '30px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--accent-gold)',
    letterSpacing: '2px'
  },
  subtitle: {
    color: 'var(--text-muted)'
  },
  cameraFrame: {
    position: 'relative',
    width: '100%',
    aspectRatio: '4/3',
    backgroundColor: '#0a0a0a',
    borderRadius: '12px',
    border: '1px solid var(--accent-gold)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
    boxShadow: '0 0 40px rgba(197, 160, 89, 0.1)'
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: 'scaleX(-1)'
  },
  status: {
    color: 'var(--text-muted)'
  },
  errorBox: {
    padding: '20px',
    textAlign: 'center',
    color: '#ff4444'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: '2px dashed rgba(197, 160, 89, 0.3)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlayBox: {
    border: '1px solid rgba(197,160,89,0.8)',
    padding: '40px 100px',
    borderRadius: '50px'
  },
  overlayText: {
    color: 'var(--accent-gold)',
    fontWeight: 'bold',
    letterSpacing: '2px'
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  }
};

export default ARView;
