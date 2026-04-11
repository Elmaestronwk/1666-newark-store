import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [booting, setBooting] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const bootLogs = [
      "INITIALIZING CORE_SYTEMS...",
      "LOADING NWK_UPLINK_PROTOCOL...",
      "AUTHORSING NODE_ACCESS...",
      "SCANNING APPAREL_DATABASE...",
      "ESTABLIDHING SECURE_CONNECTION...",
      "DONE. SESSION_ACTIVE."
    ];
    
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 800);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const scrollToCollection = () => {
    document.getElementById('sys-database')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.page}>
      <div className="scanline-container" />
      
      <AnimatePresence>
        {booting && (
          <motion.div 
            key="boot"
            exit={{ opacity: 0, scale: 1.05 }}
            style={styles.bootOverlay}
          >
            <div style={styles.bootBox}>
              <div style={styles.bootHeader} className="micro-text">
                SYS.CORE_BOOT // VER: 1.6.6.6
              </div>
              <div style={styles.logList}>
                {logs.map((log, i) => (
                  <div key={i} className="micro-text" style={{color: 'var(--accent-neon)', marginBottom: '4px'}}>
                     {'>'} {log}
                  </div>
                ))}
              </div>
              <div className="micro-text" style={{marginTop: '20px', animate: 'flicker 1s infinite'}}>
                [ PROCESSING... ]
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section style={styles.heroSection}>
        <div style={styles.hudTopLeft} className="micro-text">LOC: NWK_CORE_STATION</div>
        <div style={styles.hudTopRight} className="micro-text">NODE_ID: 0x1666</div>
        
        <div style={styles.heroContent}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={styles.asciiContainer}
          >
            <pre style={styles.asciiText} className="neon-text">
{`   __   ____  ____  ____ 
  /  \\ (  _ \\(  _ \\(  _ \\
 (_  _) )   / ) _ ( )   /
   )(  (_)\\_)(____/(_)\\_)`}
            </pre>
            <h1 style={styles.mainTitle} className="glitch-text">NEWARK // SYS</h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.5 }}
            className="micro-text"
            style={styles.heroTagline}
          >
            CONNECTED_APPAREL_ECOSYSTEM // THE_CITY_IS_SIGNAL
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            style={styles.heroActions}
          >
            <button onClick={scrollToCollection} className="system-btn-solid">
              ACCESS_DATABASE
            </button>
            <button onClick={scrollToCollection} className="system-btn">
              VIEW_LOGS
            </button>
          </motion.div>
        </div>

        <div style={styles.hudBottom} className="micro-text">
          UPLINK_STATUS: STABLE // LATENCY: 14MS // ENCRYPTION: AES-256
        </div>
      </section>

      <section id="sys-database" style={styles.databaseSection}>
        <div style={styles.sectionHeader}>
            <div>
              <p className="micro-text" style={{color: 'var(--accent-neon)'}}>DATABASE // REGISTRY</p>
              <h2 style={styles.sectionTitle}>APPAREL_SYSTEMS</h2>
            </div>
            <div className="micro-text">ENTRIES_LOGGED: {productsData.length}</div>
        </div>

        <div style={styles.productGrid}>
          {productsData.map((item, idx) => (
            <ProductCard key={item.id} product={item} index={idx} />
          ))}
        </div>
      </section>

      <section style={styles.footerSection}>
         <div style={styles.footerInner} className="glass-panel">
            <h3 className="neon-text" style={styles.footerTitle}>SYSTEM_PORTAL</h3>
            <p className="micro-text" style={{marginBottom: '30px'}}>UPLINK_TO_METAVERSE_AND_ARCHIVES</p>
            <div style={styles.footerButtons}>
              <Link to="/newark-portal" className="system-btn">LAUNCH_PORTAL</Link>
              <a href="https://chatgpt.com/g/g-YDeV5cxu2-newark-historical" target="_blank" rel="noopener noreferrer" className="system-btn">AI_TERM</a>
            </div>
         </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: '100px'
  },
  bootOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: '#000',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-mono)'
  },
  bootBox: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
  },
  bootHeader: {
    marginBottom: '30px',
    color: '#333',
    borderBottom: '1px solid #111',
    paddingBottom: '10px'
  },
  logList: {
    height: '180px',
    overflow: 'hidden'
  },
  heroSection: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    textAlign: 'center',
    borderBottom: '1px solid var(--border-color)',
    padding: '0 20px'
  },
  hudTopLeft: { position: 'absolute', top: '40px', left: '40px', opacity: 0.5 },
  hudTopRight: { position: 'absolute', top: '40px', right: '40px', opacity: 0.5 },
  hudBottom: { position: 'absolute', bottom: '40px', width: '100%', left: 0, opacity: 0.5 },
  heroContent: { maxWidth: '1000px' },
  asciiContainer: { marginBottom: '40px' },
  asciiText: { fontSize: 'clamp(0.4rem, 2vw, 0.8rem)', lineHeight: '1.2', marginBottom: '20px' },
  mainTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
    fontWeight: '800',
    letterSpacing: '12px',
    margin: 0,
    fontFamily: 'var(--font-mono)'
  },
  heroTagline: { marginTop: '20px', letterSpacing: '2px', opacity: 0.5 },
  heroActions: {
    marginTop: '60px',
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  databaseSection: {
    padding: '100px 40px',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '60px',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--border-color)'
  },
  sectionTitle: {
     fontSize: '2.5rem',
     fontWeight: '700',
     letterSpacing: '2px',
     marginTop: '8px'
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '40px'
  },
  footerSection: {
    padding: '100px 40px',
    display: 'flex',
    justifyContent: 'center'
  },
  footerInner: {
    padding: '60px',
    textAlign: 'center',
    maxWidth: '700px',
    width: '100%',
    border: '1px solid var(--border-neon)'
  },
  footerTitle: {
    fontSize: '2rem',
    letterSpacing: '8px',
    marginBottom: '10px'
  },
  footerButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center'
  }
};

export default Home;