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
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedFit, setSelectedFit] = useState('Standard Fit - Classic Logo');
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCartStorage(product, 1, { size: selectedSize, color: selectedColor, fit: selectedFit });
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  if (!product) return <div style={styles.notFound}>Product not found. <Link to="/">Return to Shop</Link></div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.container}
    >
      <div style={styles.grid}>
        <div style={styles.previewSection}>
          <div style={styles.imageContainer}>
            <motion.img 
              src={product.image} 
              alt={product.name} 
              style={{
                ...styles.image,
                transform: `scale(${zoom}) rotate(${rotation}deg)`
              }}
            />
          </div>
          
          <div style={styles.controls}>
            <div style={styles.controlGroup}>
              <label style={styles.label}>3D Rotation Preview: {rotation}°</label>
              <input 
                type="range" 
                min="-180" max="180" 
                value={rotation} 
                onChange={(e) => setRotation(e.target.value)} 
                style={styles.slider}
              />
            </div>
            <div style={styles.controlGroup}>
              <label style={styles.label}>Model Zoom: {zoom}x</label>
              <input 
                type="range" 
                min="0.5" max="2" step="0.1" 
                value={zoom} 
                onChange={(e) => setZoom(e.target.value)} 
                style={styles.slider}
              />
            </div>
          </div>
        </div>

        <div style={styles.detailsSection}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.price}>{product.price}</p>
          
          <div style={styles.customizerGroup}>
            <h4 style={styles.sectionTitle}>Select Size</h4>
            <div style={styles.pillGroup}>
              {['S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size}
                  style={selectedSize === size ? styles.pillSelected : styles.pill}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.customizerGroup}>
            <h4 style={styles.sectionTitle}>Select Color</h4>
            <div style={styles.pillGroup}>
              {['Black', 'White', 'Gold', 'Charcoal'].map(color => (
                <button 
                  key={color}
                  style={selectedColor === color ? styles.pillSelected : styles.pill}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.customizerGroup}>
            <h4 style={styles.sectionTitle}>Fit / Logo Style</h4>
            <select style={styles.select} value={selectedFit} onChange={e => setSelectedFit(e.target.value)}>
              <option>Standard Fit - Classic Logo</option>
              <option>Oversized Fit - Minimal Logo</option>
              <option>Slim Fit - Monochrome Logo</option>
            </select>
          </div>

          <button style={{...styles.addToCartBtn, width: '100%', marginTop: '20px'}} className="luxury-btn" onClick={handleAddToCart}>
            {addedMessage ? 'ADDED TO CART ✔' : 'ADD TO CART'}
          </button>
          
          <div style={{marginTop: '20px'}}>
             <Link to="/ar-try-on">
               <button style={{...styles.addToCartBtn, width: '100%'}} className="luxury-btn-outline">
                 TRY IT ON IN AR
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
    maxWidth: '1200px',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr',
    gap: '60px',
    alignItems: 'start'
  },
  previewSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border-color)',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'transform 0.1s ease-out'
  },
  controls: {
    backgroundColor: 'var(--card-bg)',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  label: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)'
  },
  slider: {
    width: '100%',
    accentColor: 'var(--accent-gold)'
  },
  detailsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  category: {
    color: 'var(--accent-gold)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '0.9rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800'
  },
  price: {
    fontSize: '1.5rem',
    color: 'var(--text-muted)'
  },
  customizerGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-color)'
  },
  pillGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  pill: {
    padding: '10px 20px',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--text-color)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  pillSelected: {
    padding: '10px 20px',
    border: '1px solid var(--accent-gold)',
    borderRadius: '4px',
    backgroundColor: 'rgba(197, 160, 89, 0.1)',
    color: 'var(--accent-gold)',
    cursor: 'pointer',
    fontWeight: '600'
  },
  select: {
    padding: '12px 20px',
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    fontSize: '1rem',
    outline: 'none',
    cursor: 'pointer'
  },
  notFound: {
    textAlign: 'center',
    padding: '100px',
    fontSize: '1.5rem'
  }
};

export default ProductDetails;
