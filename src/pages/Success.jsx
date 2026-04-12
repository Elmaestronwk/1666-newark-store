import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useEffect } from 'react';

const Success = () => {
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    // Clear the cart on successful redirect from Stripe
    clearCart();
  }, [clearCart]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '160px 40px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
      className="reveal-anim"
    >
      <div className="micro-label" style={{ marginBottom: '20px', color: 'var(--gold-primary)' }}>TRANSACTION COMPLETE</div>
      <h1 className="section-title">ORDER <span className="gold-text">LOGGED</span></h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '60px', lineHeight: '1.8' }}>
        Thank you for your acquisition. Your order has been registered into the 1666 Newark archives. A confirmation has been sent to your signal.
      </p>
      <Link to="/">
        <button className="luxury-btn">RETURN HOME</button>
      </Link>
    </motion.div>
  );
};

export default Success;
