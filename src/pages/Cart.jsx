import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useSound } from '../hooks/useSound';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const [isProcessingStripe, setIsProcessingStripe] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const { playClick, playAction, playNav, playSuccess } = useSound();

  const handleStripeCheckout = async () => {
    try {
      setCheckoutError(null);
      setIsProcessingStripe(true);
      const res = await fetch('/api/stripe-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, origin: window.location.origin })
      });
      const data = await res.json();
      
      if (!res.ok) {
         throw new Error(data.error || "Failed to initialize Stripe checkout.");
      }

      if (data.url) {
        window.location.href = data.url;
      } 
    } catch (err) {
      console.error(err);
      setCheckoutError(err.message);
      setIsProcessingStripe(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={styles.container} className="reveal-anim">
        <h1 className="section-title">YOUR <span className="gold-text">BAG</span></h1>
        <p style={{marginBottom: '40px', opacity: 0.6}}>Your digital manifest is currently empty.</p>
        <Link to="/"><button className="luxury-btn">RETURN HOME</button></Link>
      </div>
    );
  }

  return (
    <div style={styles.container} className="reveal-anim">
      <h1 className="section-title">YOUR <span className="gold-text">BAG</span></h1>
      
      <div style={styles.cartGrid}>
        <div style={styles.itemsList}>
          {items.map(item => (
            <motion.div key={item.cartItemId} style={styles.itemRow} layout>
              <div style={styles.itemImageWrapper}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
              </div>
              
              <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p className="micro-label" style={{opacity: 0.5, marginBottom: '10px'}}>
                  {item.size} // {item.color} // {item.fit}
                </p>
                <div style={styles.qtyControls}>
                  <button onClick={() => { updateQuantity(item.cartItemId, item.quantity - 1); playClick(); }} style={styles.qtyBtn}>-</button>
                  <span style={styles.qtyLabel}>{item.quantity}</span>
                  <button onClick={() => { updateQuantity(item.cartItemId, item.quantity + 1); playClick(); }} style={styles.qtyBtn}>+</button>
                </div>
              </div>

              <div style={styles.itemPriceCol}>
                 <p style={styles.price} className="gold-text-static">{item.price}</p>
                 <button onClick={() => { removeFromCart(item.cartItemId); playAction(); }} style={styles.removeBtn}>REMOVE</button>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={styles.summary} className="luxury-panel">
          <h2 style={styles.summaryTitle}>ORDER SUMMARY</h2>
          <div style={styles.summaryRow}>
             <span className="micro-label">SUBTOTAL</span>
             <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
             <span className="micro-label">SHIPPING</span>
             <span style={{fontSize: '0.8rem', opacity: 0.5}}>CALCULATED AT CHECKOUT</span>
          </div>
          
          <div style={styles.totalRow}>
             <span className="micro-label" style={{fontSize: '0.9rem'}}>TOTAL</span>
             <span className="gold-text-static">${subtotal.toFixed(2)}</span>
          </div>

          <button 
             className="luxury-btn" 
             style={{...styles.disabledBtn, width: '100%', marginBottom: '20px'}}
             disabled
          >
            TRANSACTIONS_OFFLINE // PREVIEW_ONLY
          </button>
          
          {checkoutError && (
             <div style={styles.errorBox}>
               {checkoutError}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '80px 60px', maxWidth: '1400px', margin: '0 auto', minHeight: '80vh' },
  cartGrid: { display: 'grid', gridTemplateColumns: '1fr 450px', gap: '80px', alignItems: 'start' },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '30px' },
  itemRow: { 
    display: 'flex', 
    gap: '30px', 
    padding: '30px', 
    backgroundColor: 'transparent',
    borderBottom: '1px solid var(--gold-border-subtle)',
    transition: 'all 0.3s ease'
  },
  itemImageWrapper: {
    width: '180px',
    height: '220px',
    backgroundColor: '#000',
    border: '1px solid var(--gold-border-subtle)',
    overflow: 'hidden',
  },
  itemImage: { width: '100%', height: '100%', objectFit: 'cover' },
  itemInfo: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  itemName: { fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' },
  qtyControls: { display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' },
  qtyBtn: { 
    width: '40px', 
    height: '40px', 
    border: '1px solid var(--gold-border-subtle)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    cursor: 'pointer', 
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
    backgroundColor: 'transparent',
    color: 'var(--text-primary)'
  },
  qtyLabel: { fontWeight: 'bold', fontSize: '1.2rem', minWidth: '30px', textAlign: 'center' },
  itemPriceCol: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', minWidth: '120px' },
  price: { fontSize: '1.3rem', fontWeight: '600', marginBottom: '10px' },
  removeBtn: { fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', fontWeight: '600', textTransform: 'uppercase', transition: 'color 0.3s ease', background: 'none', borderBottom: '1px solid transparent' },
  summary: { padding: '50px 40px', border: '1px solid var(--gold-border-subtle)' },
  summaryTitle: { fontSize: '1.4rem', fontWeight: '800', marginBottom: '40px', letterSpacing: '0.1em', fontFamily: 'var(--font-sans)' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' },
  totalRow: { display: 'flex', justifyContent: 'space-between', marginTop: '40px', marginBottom: '50px', fontSize: '1.8rem', fontWeight: '800', borderTop: '1px solid var(--gold-border-subtle)', paddingTop: '30px', fontFamily: 'var(--font-sans)' },
  errorBox: { color: '#ff4444', fontSize: '13px', textAlign: 'center', backgroundColor: 'rgba(255, 0, 0, 0.05)', padding: '15px', border: '1px solid rgba(255, 0, 0, 0.2)' }
};

export default Cart;
