import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cancel = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '160px 40px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
      className="reveal-anim"
    >
      <div className="micro-label" style={{ marginBottom: '20px', color: '#ff4444' }}>SESSION INTERRUPTED</div>
      <h1 className="section-title">ORDER <span className="gold-text">CANCELLED</span></h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '60px', lineHeight: '1.8' }}>
        Your checkout session has been terminated. If this was unintended, you may restore your acquisition by returning to the bag.
      </p>
      <Link to="/cart">
        <button className="luxury-btn-outline">RETURN TO BAG</button>
      </Link>
    </motion.div>
  );
};

export default Cancel;
