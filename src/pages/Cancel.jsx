import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cancel = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '100px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
    >
      <h1 style={{ fontSize: '3rem', color: '#ff4444', marginBottom: '20px' }}>ORDER CANCELLED</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px' }}>
        Your checkout session was cancelled. If this was a mistake, you can return to your cart and try again.
      </p>
      <Link to="/cart">
        <button className="luxury-btn-outline">RETURN TO CART</button>
      </Link>
    </motion.div>
  );
};

export default Cancel;
