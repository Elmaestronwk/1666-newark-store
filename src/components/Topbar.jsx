import { ShoppingCart, Mail, Home as HomeIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Topbar = () => {
  const items = useCartStore(state => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  return (
    <header style={styles.header} className="glass-panel">
      <div style={styles.navSection}>
        <Link to="/" style={styles.navItem} className={location.pathname === '/' ? 'neon-text' : ''}>
          <HomeIcon size={18} />
          <span style={styles.navText} className="micro-text">SYS.HOME</span>
        </Link>
        <Link to="/contact" style={styles.navItem} className={location.pathname === '/contact' ? 'neon-text' : ''}>
          <Mail size={18} />
          <span style={styles.navText} className="micro-text">SYS.CONTACT</span>
        </Link>
      </div>

      <Link to="/" style={styles.logo} className="neon-text">1666 NEWARK // SYS</Link>

      <div style={styles.navSectionRight}>
        <div style={styles.statusBox} className="micro-text">
          STATUS: <span style={styles.statusActive}>ACTIVE</span>
        </div>
        <Link to="/cart" style={styles.cartContainer}>
          <ShoppingCart size={18} />
          <span style={styles.navText} className="micro-text">SYS.CART</span>
          {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 40px',
    borderBottom: '1px solid var(--border-neon)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderRadius: '0',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
  },
  logo: {
    fontSize: '18px',
    fontFamily: 'var(--font-mono)',
    fontWeight: '800',
    letterSpacing: '4px',
    textDecoration: 'none'
  },
  navSection: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    flex: 1,
  },
  navSectionRight: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  navItem: {
    color: 'var(--accent-neon)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    opacity: 0.8
  },
  navText: {
    display: 'inline-block',
  },
  statusBox: {
    border: '1px solid var(--border-neon)',
    padding: '4px 10px',
    backgroundColor: 'var(--accent-neon-dim)',
  },
  statusActive: {
    color: 'var(--accent-neon)',
    fontWeight: '600'
  },
  cartContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: 'var(--accent-neon)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    opacity: 0.8
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-16px',
    backgroundColor: 'var(--accent-neon)',
    color: '#000',
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    fontWeight: 'bold',
    minWidth: '18px',
    height: '18px',
    borderRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default Topbar;
