import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { productsData } from './Home';
import { useCartStore } from '../store/cartStore';
import { useSound } from '../hooks/useSound';

const ProductDetails = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === id);
  const addToCartStorage = useCartStore(state => state.addToCart);
  const { playClick, playSuccess, playNav } = useSound();
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('MATTE BLACK');
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCartStorage(product, 1, { size: selectedSize, color: selectedColor, fit: 'Standard' });
    playSuccess();
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  if (!product) return <div style={styles.notFound} className="micro-label">PRODUCT NOT FOUND. <Link to="/" className="gold-text">RETURN HOME</Link></div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.container}
      className="reveal-anim"
    >
      <div style={styles.grid}>
        <div style={styles.previewSection}>
          <div style={styles.imageContainer}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={styles.image}
            />
          </div>
          <div style={styles.previewFooter} className="micro-label">
            1666 NEWARK // {product.category}
          </div>
        </div>

        <div style={styles.detailsSection}>
          <div style={styles.brandHeader} className="micro-label">
            COLLECTION RELEASE 001
          </div>
          
          <h1 style={styles.title}>{product.name}</h1>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel} className="micro-label">AVAILABILITY</span>
              <span style={styles.infoValue} className="gold-text-static">COMING SOON</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel} className="micro-label">PRICE</span>
              <span style={styles.infoValue}>{product.price}</span>
            </div>
          </div>

          <p style={styles.description}>
            A premium architectural piece crafted for the modern city signal. Part of our core collection, this {product.category.toLowerCase()} embodies the futuristic identity of Newark.
          </p>

          <div style={styles.optionGroup}>
            <h4 style={styles.sectionLabel} className="micro-label">SIZE</h4>
            <div style={styles.pillGroup}>
              {['S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size}
                  style={selectedSize === size ? styles.pillSelected : styles.pill}
                  onClick={() => { setSelectedSize(size); playClick(); }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.optionGroup}>
            <h4 style={styles.sectionLabel} className="micro-label">FINISH</h4>
            <div style={styles.pillGroup}>
              {['MATTE BLACK', 'OPTIC WHITE', 'METALLIC GOLD'].map(color => (
                <button 
                  key={color}
                  style={selectedColor === color ? styles.pillSelected : styles.pill}
                  onClick={() => { setSelectedColor(color); playClick(); }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.actionGroup}>
            <button className="luxury-btn" style={styles.disabledBtn} disabled>
              SIGNAL_PENDING // COMING SOON
            </button>
            <Link to="/" style={{display: 'block', textDecoration: 'none'}}>
              <button className="luxury-btn-outline" style={{ width: '100%' }} onClick={() => playNav()}>
                RETURN TO INDEX
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
    padding: '80px 60px',
    maxWidth: '1400px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 100px)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '100px',
    alignItems: 'start'
  },
  previewSection: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: '1 / 1.25',
    overflow: 'hidden',
    backgroundColor: '#000',
    border: '1px solid var(--gold-border-subtle)',
    boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  previewFooter: {
    marginTop: '20px',
    textAlign: 'center',
    opacity: 0.5,
  },
  detailsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    position: 'sticky',
    top: '120px',
  },
  brandHeader: {
    color: 'var(--gold-soft)',
  },
  title: {
    fontSize: '3.5rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    margin: 0,
    lineHeight: '1',
    textTransform: 'uppercase'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    padding: '30px 0',
    borderTop: '1px solid var(--gold-border-subtle)',
    borderBottom: '1px solid var(--gold-border-subtle)',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  infoLabel: {
    opacity: 0.5,
  },
  infoValue: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  optionGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sectionLabel: {},
  pillGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  pill: {
    padding: '14px 28px',
    border: '1px solid var(--gold-border-subtle)',
    backgroundColor: 'transparent',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  pillSelected: {
    padding: '14px 28px',
    border: '1px solid var(--gold-primary)',
    backgroundColor: 'var(--gold-primary)',
    color: '#000',
    cursor: 'pointer',
    fontWeight: '600',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.8rem',
  },
  actionGroup: {
    marginTop: '20px',
  },
  disabledBtn: {
    width: '100%',
    marginBottom: '20px',
    opacity: 0.5,
    cursor: 'not-allowed',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },
  notFound: {
    textAlign: 'center',
    padding: '160px 60px',
    fontSize: '1.5rem',
  }
};

export default ProductDetails;
