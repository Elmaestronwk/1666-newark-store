import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} style={styles.cardLink}>
      <motion.div
        style={styles.card}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div style={styles.imageContainer}>
          <motion.img
            src={product.image}
            alt={product.name}
            style={styles.image}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />

          <div style={styles.comingSoonBadge}>COMING SOON</div>
        </div>

        <div style={styles.details}>
          <span style={styles.category}>{product.category}</span>
          <h3 style={styles.name}>{product.name}</h3>

          <p style={styles.priceMuted}>{product.price}</p>
          <p style={styles.comingSoonText}>Preview only · product launch pending</p>
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
    background: '#111',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
    height: '100%',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1',
    background: 'linear-gradient(180deg, #1b1b1b 0%, #0f0f0f 100%)',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  comingSoonBadge: {
    position: 'absolute',
    top: '14px',
    right: '14px',
    padding: '8px 12px',
    borderRadius: '999px',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    background: 'rgba(255,255,255,0.92)',
    color: '#111',
    backdropFilter: 'blur(6px)',
  },
  details: {
    padding: '16px',
  },
  category: {
    fontSize: '0.78rem',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  name: {
    margin: '8px 0 10px',
    fontSize: '1.05rem',
    color: '#fff',
  },
  priceMuted: {
    margin: 0,
    color: '#d6d6d6',
    fontWeight: 600,
  },
  comingSoonText: {
    marginTop: '8px',
    fontSize: '0.84rem',
    color: '#8d8d8d',
  },
};

export default ProductCard;