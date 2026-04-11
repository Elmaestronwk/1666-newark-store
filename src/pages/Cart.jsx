import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const [isProcessingStripe, setIsProcessingStripe] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  
  const paypalButtonRef = useRef(null);
  /* 
  DEPRECATED: PayPal Checkout Flow 
  This SDK flow has been disabled in favor of natively handling Stripe directly.
  
  useEffect(() => {
     // ... legacy PayPal init bindings ...
  }, []);
  */

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
      <div style={styles.container}>
        <h1 style={styles.title}>YOUR CART</h1>
        <p style={{marginBottom: '20px'}}>Your cart is currently empty.</p>
        <Link to="/"><button className="system-btn">RET_TO_DATABASE</button></Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>YOUR CART</h1>
      
      <div style={styles.cartGrid}>
        <div style={styles.itemsList}>
          {items.map(item => (
            <motion.div key={item.cartItemId} style={styles.itemRow} layout>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              
              <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemMeta}>Size: {item.size} | Color: {item.color}</p>
                <p style={styles.itemMeta}>Fit: {item.fit}</p>
                <div style={styles.qtyControls}>
                  <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} style={styles.qtyBtn}>-</button>
                  <span style={styles.qtyLabel}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} style={styles.qtyBtn}>+</button>
                </div>
              </div>

              <div style={styles.itemPriceCol}>
                 <p style={styles.price}>{item.price}</p>
                 <button onClick={() => removeFromCart(item.cartItemId)} style={styles.removeBtn}>REMOVE</button>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={styles.summary}>
          <h2>ORDER SUMMARY</h2>
          <div style={styles.summaryRow}>
             <span>Subtotal</span>
             <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
             <span>Shipping</span>
             <span>Calculated at checkout</span>
          </div>
          
          <div style={styles.totalRow}>
             <span>Total</span>
             <span>${subtotal.toFixed(2)}</span>
          </div>

          <button 
             className="system-btn-solid" 
             style={{width: '100%', marginBottom: '20px'}}
             onClick={handleStripeCheckout}
             disabled={isProcessingStripe}
          >
            {isProcessingStripe ? 'PROC_SESSION...' : 'EXECUTE_PAYMENT'}
          </button>
          
          <div style={{minHeight: '80px', zIndex: 1, position: 'relative', marginTop: '10px'}}>
             {checkoutError && (
                <div style={{color: '#ff4444', marginBottom: '15px', fontSize: '14px', textAlign: 'center', backgroundColor: 'rgba(255, 0, 0, 0.1)', padding: '10px', borderRadius: '4px'}}>
                  {checkoutError}
                </div>
             )}

             {/* DEPRECATED PAYPAL UI BLOCK 
             <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', textAlign: 'center' }}>
                {isPayPalLoading && !payPalError && <span style={{ color: 'var(--text-muted)' }}>Loading Secure Checkout...</span>}
                <paypal-button ref={paypalButtonRef} hidden></paypal-button>
             </div>
             */}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px', maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '2.5rem', fontWeight: '800', marginBottom: '30px', color: 'var(--accent-neon)', letterSpacing: '4px', fontFamily: 'var(--font-mono)' },
  cartGrid: { display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) 400px', gap: '40px', alignItems: 'start' },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '20px' },
  itemRow: { display: 'flex', gap: '20px', padding: '20px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' },
  itemImage: { width: '150px', height: '150px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '4px' },
  itemInfo: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  itemName: { fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '8px' },
  itemMeta: { color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' },
  qtyControls: { display: 'flex', alignItems: 'center', gap: '15px', marginTop: '15px' },
  qtyBtn: { width: '35px', height: '35px', border: '1px solid var(--border-color)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1.2rem' },
  qtyLabel: { fontWeight: 'bold', fontSize: '1.2rem' },
  itemPriceCol: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', minWidth: '80px' },
  price: { fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-neon)', fontFamily: 'var(--font-mono)' },
  removeBtn: { fontSize: '0.8rem', color: '#ff4444', borderBottom: '1px solid #ff4444', paddingBottom: '2px', textTransform: 'uppercase' },
  summary: { backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '8px', border: '1px solid var(--border-color)' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', color: 'var(--text-muted)' },
  totalRow: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px', fontSize: '1.5rem', fontWeight: 'bold', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }
};

export default Cart;
