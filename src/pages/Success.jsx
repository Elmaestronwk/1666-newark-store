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
      style={{ padding: '100px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
    >
      <h1 style={{ fontSize: '3rem', color: 'var(--accent-gold)', marginBottom: '20px' }}>ORDER CONFIRMED</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px' }}>
        Thank you for your purchase. Your order is being processed and you will receive a confirmation email shortly.
      </p>
      <Link to="/">
        <button className="luxury-btn">RETURN TO SHOP</button>
      </Link>
    </motion.div>
  );
};

export default Success;
