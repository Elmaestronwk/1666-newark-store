import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { productsData } from './Home';
import { useCartStore } from '../store/cartStore';

const ProductDetails = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === id);
  const addToCartStorage = useCartStore(state => state.addToCart);
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('MATTE BLACK');
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCartStorage(product, 1, { size: selectedSize, color: selectedColor, fit: 'Standard' });
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  if (!product) return <div style={styles.notFound} className="micro-text">NODE NOT FOUND. <Link to="/" className="neon-text">RETURN TO SYSTEM</Link></div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.container}
    >
      <div style={styles.grid}>
        <div style={styles.previewSection} className="glass-panel">
          <div style={styles.imageHeader} className="micro-text">
            <span>VISUAL_DATA // {product.id.toUpperCase()}</span>
            <span className="neon-text">UPLINK_STABLE</span>
          </div>
          <div style={styles.imageContainer}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={styles.image}
            />
            <div style={styles.scanlineOverlay}></div>
          </div>
        </div>

        <div style={styles.detailsSection} className="glass-panel">
          <div style={styles.dataHeader}>
            <div className="micro-text" style={{ color: 'var(--accent-neon)' }}>SYSTEM: 1666 NEWARK</div>
            <div className="micro-text">SYS.ID: {product.id.toUpperCase()}</div>
          </div>
          
          <h1 style={styles.title}>{product.name.toUpperCase()}</h1>
          
          <div style={styles.dataGrid}>
            <div style={styles.dataItem}>
              <span style={styles.dataLabel} className="micro-text">STATUS</span>
              <span style={styles.dataValue} className="neon-text">ACTIVE</span>
            </div>
            <div style={styles.dataItem}>
              <span style={styles.dataLabel} className="micro-text">SIGNAL ROUTE</span>
              <span style={styles.dataValue}>0_{product.category.toUpperCase()}</span>
            </div>
            <div style={styles.dataItem}>
              <span style={styles.dataLabel} className="micro-text">FABRIC</span>
              <span style={styles.dataValue}>HEAVYWEIGHT</span>
            </div>
            <div style={styles.dataItem}>
              <span style={styles.dataLabel} className="micro-text">DATA_VALUE</span>
              <span style={styles.dataValue} className="neon-text">{product.price}</span>
            </div>
          </div>

          <div style={styles.customizerGroup}>
            <h4 style={styles.sectionTitle} className="micro-text">PARAMETERS: COMPUTE SIZE</h4>
            <div style={styles.pillGroup}>
              {['S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size}
                  style={selectedSize === size ? styles.pillSelected : styles.pill}
                  onClick={() => setSelectedSize(size)}
                  className="micro-text"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.customizerGroup}>
            <h4 style={styles.sectionTitle} className="micro-text">PARAMETERS: CHROMA</h4>
            <div style={styles.pillGroup}>
              {['MATTE BLACK', 'OPTIC WHITE', 'NEON GREEN'].map(color => (
                <button 
                  key={color}
                  style={selectedColor === color ? styles.pillSelected : styles.pill}
                  onClick={() => setSelectedColor(color)}
                  className="micro-text"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.actionGroup}>
            <button className="system-btn-solid" style={{ width: '100%', marginBottom: '16px', padding: '16px' }} onClick={handleAddToCart}>
              {addedMessage ? 'SYSTEM UPDATED ✔' : 'ADD TO SYSTEM'}
            </button>
            <Link to="/cart" style={{display: 'block', textDecoration: 'none'}}>
              <button className="system-btn" style={{ width: '100%', padding: '16px' }}>
                INITIATE PURCHASE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '1300px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 100px)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'start'
  },
  previewSection: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  imageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '12px',
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: '3/4',
    overflow: 'hidden',
    backgroundColor: '#0a0a0a',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(20%) contrast(1.1)',
  },
  scanlineOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(180deg, transparent 50%, rgba(0,255,65,0.05) 100%)',
    pointerEvents: 'none',
  },
  detailsSection: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    position: 'sticky',
    top: '100px',
  },
  dataHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '12px',
  },
  title: {
    fontSize: '2.5rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '800',
    letterSpacing: '2px',
    margin: 0,
    lineHeight: '1.2',
  },
  dataGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    padding: '24px 0',
    borderTop: '1px solid var(--border-color)',
    borderBottom: '1px solid var(--border-color)',
  },
  dataItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  dataLabel: {
    opacity: 0.6,
  },
  dataValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: '1.1rem',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  customizerGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionTitle: {
    margin: 0,
    opacity: 0.8,
  },
  pillGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  pill: {
    padding: '12px 24px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'transparent',
    color: 'var(--text-color)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  pillSelected: {
    padding: '12px 24px',
    border: '1px solid var(--accent-neon)',
    backgroundColor: 'var(--accent-neon-dim)',
    color: 'var(--accent-neon)',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 0 10px var(--accent-neon-dim)',
  },
  actionGroup: {
    marginTop: 'auto',
    paddingTop: '32px',
  },
  notFound: {
    textAlign: 'center',
    padding: '100px',
  }
};

export default ProductDetails;
