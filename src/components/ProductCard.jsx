import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

const ProductCard = ({ product, index }) => {
  const { playClick, playAction } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.165, 0.84, 0.44, 1] }}
      style={styles.card}
      className="glass-hud technical-grid"
      onMouseEnter={() => playAction()}
    >
      <div style={styles.cardHeader}>
        <span className="hud-label">ASSET_ID: {product.id.toUpperCase()}</span>
        <span className="hud-label" style={{color: 'var(--gold-soft)'}}>STAT: COMING SOON</span>
      </div>

      <Link 
        to={`/product/${product.id}`} 
        style={styles.imageContainer} 
        onClick={() => playClick()}
      >
        <motion.img 
          src={product.image} 
          alt={product.name} 
          style={styles.image}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.165, 0.84, 0.44, 1] }}
        />
        <div style={styles.imageOverlay} />
        <div style={styles.comingSoonBadge}>
           <span className="hud-label" style={{color: '#000', fontWeight: '800'}}>SIGNAL_PENDING</span>
           <span style={styles.comingSoonText}>COMING SOON</span>
        </div>
        <div style={styles.cornerLabel}>[ PREVIEW_MODE ]</div>
      </Link>

      <div style={styles.info}>
        <div style={styles.infoTop}>
          <h3 style={styles.title}>{product.name}</h3>
          <span style={styles.category} className="hud-label">{product.category}</span>
        </div>
        
        <div style={styles.priceContainer}>
          <div style={styles.metric}>
             <span className="hud-label">VAL_CURR</span>
             <span style={styles.price}>{product.price}</span>
          </div>
          <Link 
            to={`/product/${product.id}`} 
            style={styles.viewBtn} 
            onClick={() => playClick()}
            className="micro-label"
          >
            UPLINK_DATA
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  card: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    transition: 'all 0.5s var(--transition-cinematic)',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--gold-border-subtle)',
  },
  imageContainer: {
    height: '400px',
    backgroundColor: '#000',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.85,
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
  },
  cornerLabel: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.5rem',
    color: 'var(--gold-soft)',
    opacity: 0.5,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--gold-primary)',
    padding: '12px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    zIndex: 10,
    boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
  },
  comingSoonText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    fontWeight: '800',
    color: '#000',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  infoTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    fontSize: '1.2rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: '600',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
  },
  category: {
    opacity: 0.4,
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '10px',
    paddingTop: '16px',
    borderTop: '1px solid var(--gold-border-subtle)',
  },
  metric: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: '400',
    fontFamily: 'var(--font-mono)',
    color: 'var(--gold-primary)',
  },
  viewBtn: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
    borderBottom: '1px solid transparent',
  }
};

export default ProductCard;