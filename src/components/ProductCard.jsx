import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, index = 0 }) => {
  const nodeNumber = String(index + 1).padStart(3, '0');

  return (
    <Link to={`/product/${product.id}`} style={styles.cardLink}>
      <motion.div
        className="glass-panel"
        style={styles.card}
        whileHover={{
          y: -5,
          borderColor: 'var(--accent-neon)',
          boxShadow: '0 0 15px var(--accent-neon-dim)',
        }}
        transition={{ duration: 0.2 }}
      >
        <div style={styles.headerBar}>
          <span className="micro-text" style={{ color: 'var(--accent-neon)' }}>
            NODE_{nodeNumber} // {product.category.toUpperCase()}
          </span>
          <span className="micro-text" style={{ fontSize: '0.6rem' }}>SYS.ON</span>
        </div>

        <div style={styles.imageContainer}>
          <motion.img
            src={product.image}
            alt={product.name}
            style={styles.image}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div style={styles.overlay}></div>
          <div style={styles.statusBadge} className="micro-text">
            STATUS: ACTIVE
          </div>
        </div>

        <div style={styles.details}>
          <h3 style={styles.name}>{product.name.toUpperCase()}</h3>
          <div style={styles.dataRow}>
            <span className="micro-text">PRICE:</span>
            <span className="neon-text" style={styles.price}>{product.price}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const styles = {
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  card: {
    borderRadius: '0',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'border-color 0.3s ease',
  },
  headerBar: {
    padding: '8px 12px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.4)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    borderBottom: '1px solid var(--border-color)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    filter: 'grayscale(20%) contrast(1.1)',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(180deg, transparent 50%, rgba(0,255,65,0.08) 100%)',
    pointerEvents: 'none',
  },
  statusBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    padding: '4px 8px',
    background: 'rgba(0,0,0,0.8)',
    border: '1px solid var(--border-neon)',
    color: 'var(--accent-neon)',
    backdropFilter: 'blur(4px)',
  },
  details: {
    padding: '24px 16px',
    background: 'rgba(0,0,0,0.6)',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    margin: '0 0 16px 0',
    fontSize: '1rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '600',
    color: '#fff',
    letterSpacing: '1px',
    lineHeight: '1.4',
  },
  dataRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: '12px',
  },
  price: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    fontWeight: '600',
  },
};

export default ProductCard;