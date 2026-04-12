import { ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useSound } from '../hooks/useSound';
import SoundToggle from './SoundToggle';

const Topbar = () => {
  const items = useCartStore(state => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const { playNav } = useSound();

  return (
    <header style={styles.header} className="glass-hud">
      <div style={styles.leftGroup}>
        <div style={styles.statusGroup}>
          <span className="hud-label">UPLINK_STATUS: ACTIVE</span>
          <span className="hud-label">LOC: 40.7357° N, 74.1724° W</span>
        </div>
        <nav style={styles.navSection}>
          <Link to="/" style={styles.navLink} onClick={() => playNav()}>
            <span style={location.pathname === '/' ? styles.activeLink : {}}>01 // INDEX</span>
          </Link>
          <a href="#featured-collection" style={styles.navLink} onClick={() => playNav()}>
            02 // COLLECTION
          </a>
          <a href="#brand-vision" style={styles.navLink} onClick={() => playNav()}>
            03 // VISION
          </a>
        </nav>
      </div>

      <Link to="/" style={styles.logo} onClick={() => playNav()}>
        1666 <span className="gold-text-static">NEWARK</span>
      </Link>

      <div style={styles.rightGroup}>
        <div style={styles.navSectionRight}>
          <Link to="/contact" style={styles.navLink} onClick={() => playNav()}>
            SUPPORT
          </Link>
          <SoundToggle />
          <Link to="/cart" style={styles.cartContainer} onClick={() => playNav()}>
            <ShoppingCart size={14} strokeWidth={2} />
            <span style={styles.cartLabel}>BAG</span>
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>
        </div>
        <div style={styles.statusGroupRight}>
          <span className="hud-label">V_2.5.0 // SYS_READY</span>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 40px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid var(--gold-border-subtle)',
  },
  leftGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },
  rightGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
    alignItems: 'flex-end',
  },
  statusGroup: {
    display: 'flex',
    gap: '16px',
    marginBottom: '8px',
  },
  statusGroupRight: {
    display: 'flex',
    marginTop: '8px',
  },
  logo: {
    fontSize: '20px',
    fontFamily: 'var(--font-sans)',
    fontWeight: '800',
    letterSpacing: '0.4em',
    textDecoration: 'none',
    color: 'var(--text-primary)',
    textAlign: 'center',
    padding: '0 40px',
  },
  navSection: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  navSectionRight: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  navLink: {
    fontSize: '0.65rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: '400',
    letterSpacing: '0.1em',
    color: 'var(--text-secondary)',
    transition: 'all 0.3s var(--transition-cinematic)',
    textDecoration: 'none',
    '&:hover': {
      color: 'var(--gold-primary)',
    }
  },
  activeLink: {
    color: 'var(--gold-primary)',
  },
  cartContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    textDecoration: 'none',
  },
  cartLabel: {
    fontSize: '0.65rem',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.1em',
  },
  badge: {
    backgroundColor: 'var(--gold-primary)',
    color: '#000',
    fontFamily: 'var(--font-mono)',
    fontSize: '9px',
    fontWeight: 'bold',
    minWidth: '16px',
    height: '16px',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default Topbar;
