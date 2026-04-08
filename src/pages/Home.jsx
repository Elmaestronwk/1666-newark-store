import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export const productsData = [
  {
    id: 'bomber',
    name: '1666 Core Bomber Jacket',
    price: '$250',
    category: 'Outerwear',
    image: '/assets/bomber_jacket.png'
  },
  {
    id: 'tee',
    name: 'Newark Logo Tee',
    price: '$85',
    category: 'Tops',
    image: '/assets/logo_tee.png'
  },
  {
    id: 'cap',
    name: 'Gold Emblem Cap',
    price: '$60',
    category: 'Accessories',
    image: '/assets/streetwear_cap.png'
  },
  {
    id: 'ring',
    name: 'Newark Signet Ring',
    price: '$120',
    category: 'Accessories',
    image: '/assets/newark_ring.jpg'
  },
  {
    id: 'gradient-tee',
    name: 'Newark NJ Gradient Tee',
    price: '$95',
    category: 'Tops',
    image: '/assets/newark_nj_tee.jpg'
  },
  {
    id: 'shield-print',
    name: '1666 Shield Art Print',
    price: '$45',
    category: 'Art',
    image: '/assets/1666_shield_logo.jpg'
  },
  {
    id: 'circular-sweatshirt',
    name: 'Circular Logo Sweatshirt',
    price: '$180',
    category: 'Tops',
    image: '/assets/circular_logo_sweatshirt.jpg'
  },
  {
    id: 'abstract-sweatshirt',
    name: 'Abstract N Sweatshirt',
    price: '$180',
    category: 'Tops',
    image: '/assets/abstract_n_sweatshirt.jpg'
  }
];

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '40px' }}
    >
      <div style={styles.hero}>
        <h1 style={styles.title}>THE NEWARK COLLECTION</h1>
        <p style={styles.subtitle}>FW26 Drops. Excellence in Every Thread.</p>
      </div>

      <div style={styles.gallery}>
        {productsData.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div style={styles.exploreSection}>
        <h2 style={styles.exploreTitle}>DISCOVER NEWARK</h2>
        <p style={styles.exploreSubtitle}>
          Experience the culture, history, and streets that inspire 1666 Newark Inc.
        </p>

        <div style={styles.exploreGrid}>
          <div style={styles.exploreCard}>
            <h3 style={styles.exploreCardTitle}>AI Guide</h3>
            <p style={styles.exploreCardText}>
              Delve into Newark&apos;s rich history, landmarks, and culture with our customized AI guide.
            </p>
            <a
              href="https://chatgpt.com/g/g-YDeV5cxu2-newark-historical"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-btn-outline"
              style={styles.exploreBtn}
            >
              Open AI Guide
            </a>
          </div>

          <div style={styles.exploreCard}>
            <h3 style={styles.exploreCardTitle}>Newark Portal</h3>
            <p style={styles.exploreCardText}>
              Enter the Newark portal to explore locations, visuals, and the city experience in one place.
            </p>
            <Link
              to="/newark-portal"
              className="luxury-btn-outline"
              style={styles.exploreBtn}
            >
              Open Newark Portal
            </Link>
          </div>

          <div style={styles.exploreCard}>
            <h3 style={styles.exploreCardTitle}>Earth 3D</h3>
            <p style={styles.exploreCardText}>
              Take an immersive 3D flyover journey through Newark to see the city from a new perspective.
            </p>
            <a
              href="https://earth.google.com/web/search/Newark,+New+Jersey"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-btn-outline"
              style={styles.exploreBtn}
            >
              Fly in Earth 3D
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  hero: {
    textAlign: 'center',
    marginBottom: '60px',
    marginTop: '40px'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    letterSpacing: '4px',
    marginBottom: '16px',
    color: 'var(--accent-gold)'
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
    letterSpacing: '1px'
  },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  exploreSection: {
    marginTop: '100px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '60px',
    textAlign: 'center'
  },
  exploreTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    letterSpacing: '4px',
    marginBottom: '16px',
    color: 'var(--accent-gold)'
  },
  exploreSubtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.2rem',
    letterSpacing: '1px',
    marginBottom: '50px'
  },
  exploreGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  exploreCard: {
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  exploreCardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '15px'
  },
  exploreCardText: {
    color: 'var(--text-muted)',
    marginBottom: '30px',
    lineHeight: '1.6'
  },
  exploreBtn: {
    display: 'inline-block',
    textDecoration: 'none',
    width: '100%',
    boxSizing: 'border-box'
  }
};

export default Home;