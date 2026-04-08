import { ShoppingCart, Camera, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Topbar = () => {
  const items = useCartStore(state => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>1666 NEWARK INC.</Link>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navItem}><HomeIcon size={20}/></Link>
        <Link to="/ar-try-on" style={styles.navItem}><Camera size={20}/></Link>
        <Link to="/cart" style={styles.cartContainer}>
          <ShoppingCart size={20} />
          {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-color)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    letterSpacing: '2px',
    color: 'var(--text-color)',
    textDecoration: 'none'
  },
  nav: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  navItem: {
    color: 'var(--text-color)',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center'
  },
  cartContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'var(--text-color)',
    textDecoration: 'none'
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-10px',
    backgroundColor: 'var(--accent-gold)',
    color: '#000',
    fontSize: '12px',
    fontWeight: 'bold',
    minWidth: '20px',
    height: '20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default Topbar;
