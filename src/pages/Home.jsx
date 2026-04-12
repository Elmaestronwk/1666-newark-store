import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { useSound } from '../hooks/useSound';

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
    image: '/assets/newark_nj_tee.jpg'
  },
  {
    id: 'gradient-tee',
    name: 'Newark NJ Gradient Tee',
    price: '$95',
    category: 'Tops',
    image: '/assets/newark_ring.jpg'
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
  const [revealed, setRevealed] = useState(false);
  const { playClick, playNav, initAudio } = useSound();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const skylineY = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
  const skylineScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25], [1, 0.8, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
      try {
        initAudio();
      } catch (err) {
        console.warn('Audio initialization failed, but continuing reveal:', err);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [initAudio]);

  const scrollToCollection = () => {
    document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.parentElement.style.backgroundColor = '#080808';
  };

  const SplitText = ({ text }) => {
    return (
      <span className="char-reveal">
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ 
              duration: 1.2, 
              delay: 0.8 + (i * 0.05), 
              ease: [0.165, 0.84, 0.44, 1] 
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    );
  };

  return (
    <div style={styles.page} ref={containerRef}>
      <AnimatePresence>
        {!revealed && (
          <motion.div 
            key="reveal-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "circOut" }}
            style={styles.revealOverlay}
          >
            <div style={styles.revealTechnical}>
              <span className="hud-label">UPLINK_INITIALIZING...</span>
              <span className="hud-label">ESTABLISHING_SIGNAL</span>
            </div>
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.8em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 1.5 }}
              style={styles.revealLogo}
            >
              1666
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section style={styles.heroSection}>
        <motion.div style={{ ...styles.heroBg, y: skylineY, scale: skylineScale }}>
          <img 
            src="/assets/newark_luxury_skyline.png" 
            alt="Newark Skyline" 
            style={styles.skylineImg} 
            onError={handleImageError}
          />
          <div style={styles.heroOverlay}></div>
        </motion.div>
        
        <motion.div style={{ ...styles.heroContent, opacity: contentOpacity }}>
          <div style={styles.heroHUD}>
             <span className="hud-label">LAT: 40.7357° N</span>
             <div style={styles.hudLine} />
             <span className="hud-label">LONG: 74.1724° W</span>
          </div>

          <h1 style={styles.mainTitle}>
             <SplitText text="1666" />
             <br />
             <span className="gold-text"><SplitText text="NEWARK" /></span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 2, duration: 1.5 }}
            style={styles.heroTagline} 
            className="micro-label"
          >
            PREMIUM INFRASTRUCTURE // CORE GENESIS RELEASE
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 1 }}
            style={styles.heroActions}
          >
            <button onClick={() => { scrollToCollection(); playClick(); }} className="luxury-btn">
              ENTER COLLECTION
            </button>
            <button onClick={() => { playClick(); }} className="luxury-btn-outline">
              VIEW MANIFESTO
            </button>
          </motion.div>
        </motion.div>

        <div style={styles.scrollHUD}>
           <span className="hud-label">SCROLL_TO_DESCEND</span>
           <div style={styles.scrollBar} />
        </div>
      </section>

      <section id="featured-collection" style={styles.databaseSection} className="technical-grid">
        <div style={styles.sectionHeader}>
            <div style={styles.headerLeft}>
              <p className="micro-label">CURATED RELEASE // 001</p>
              <h2 className="section-title">THE <span className="gold-text-static">SIGNAL</span> ARCHIVE</h2>
            </div>
            <div style={styles.headerRight}>
               <span className="hud-label">PIECES: {productsData.length}</span>
               <span className="hud-label">DISTRICT: 1666</span>
            </div>
        </div>

        <div style={styles.productGrid}>
          {productsData.map((item, idx) => (
            <ProductCard key={item.id} product={item} index={idx} />
          ))}
        </div>
      </section>

      <section id="newark-identity" style={styles.identitySection}>
        <div style={styles.identityContainer}>
          <div style={styles.identityText}>
            <p className="micro-label">CITY GENESIS</p>
            <h2 className="section-title">BUILT FROM <br/><span className="gold-text-static">CITY CODE</span></h2>
            <div style={styles.identityHUD}>
               <div style={styles.hudMetric}>
                  <span className="hud-label">FOUNDED</span>
                  <span style={styles.identityMetricVal}>1666</span>
               </div>
               <div style={styles.hudLineVertical} />
               <div style={styles.hudMetric}>
                  <span className="hud-label">TYPE</span>
                  <span style={styles.identityMetricVal}>INFRA</span>
               </div>
            </div>
            <p style={styles.identityDescription}>
              1666 Newark is more than a label. It is a digital and physical manifestation of Newark’s architectural prestige. We translate the city’s pulse into a dark luxury brand system—where every coordinate is a signal.
            </p>
          </div>
          <div style={styles.identityGraphic} className="glass-hud">
             <motion.img 
               src="/assets/newark_grid_luxury.png" 
               alt="Newark Grid Map" 
               style={styles.gridImg} 
               onError={handleImageError}
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 1.5, ease: "circOut" }}
             />
             <div style={styles.gridOverlay}></div>
             <div style={styles.gridHUD}>
                <span className="hud-label">TOPOLOGY_MAP: v0.1</span>
                <span className="hud-label">GENERATE_COORD_LINES...</span>
             </div>
          </div>
        </div>
      </section>

      <section id="brand-vision" style={styles.visionSection}>
        <div style={styles.visionContent}>
          <p className="micro-label">THE VISION</p>
          <h2 className="section-title" style={{textAlign: 'center'}}>A NEWARK <br/><span className="gold-text-static">REFRAMED</span></h2>
          <div style={styles.visionGrid}>
            <div style={styles.visionItem} className="glass-hud technical-grid">
              <span className="hud-label">CORE_001</span>
              <h4 style={styles.visionLabel}>ELITE IDENTITY</h4>
              <p style={styles.visionPara}>Forging a new standard for urban luxury streetwear inspired by high-fashion house aesthetics.</p>
            </div>
            <div style={styles.visionItem} className="glass-hud technical-grid">
              <span className="hud-label">CORE_002</span>
              <h4 style={styles.visionLabel}>SYSTEM LOGIC</h4>
              <p style={styles.visionPara}>Every stitch and silhouette is informed by Newark’s architectural DNA and technical heritage.</p>
            </div>
            <div style={styles.visionItem} className="glass-hud technical-grid">
              <span className="hud-label">CORE_003</span>
              <h4 style={styles.visionLabel}>CULTURAL SIGNAL</h4>
              <p style={styles.visionPara}>A global beacon for the city, broadcasting a message of prestige, power, and futuristic city map logic.</p>
            </div>
          </div>
        </div>
      </section>

      <footer style={styles.footerSection}>
         <div style={styles.footerInner} className="glass-hud technical-grid">
            <h3 className="gold-text-static" style={styles.footerTitle}>JOIN THE SIGNAL</h3>
            <p className="micro-label" style={{marginBottom: '40px', opacity: 0.4}}>UPLINK TO THE 1666 ARCHIVES</p>
            <div style={styles.footerButtons}>
              <Link to="/newark-portal" className="luxury-btn" onClick={() => playNav()}>LAUNCH PORTAL</Link>
              <a href="https://chatgpt.com/g/g-YDeV5cxu2-newark-historical" target="_blank" rel="noopener noreferrer" className="luxury-btn-outline" onClick={() => playClick()}>CONSULT AI</a>
            </div>
            <div style={styles.footerStatus}>
               <span className="hud-label">SYS_STATUS: CRYPTO_STABLE</span>
               <span className="hud-label">© 1666_NWK</span>
            </div>
         </div>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    minHeight: '100vh',
    position: 'relative',
    overflowX: 'hidden'
  },
  revealOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: '#000',
    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  revealTechnical: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  revealLogo: {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'var(--font-sans)',
  },
  heroSection: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    textAlign: 'center',
    overflow: 'hidden',
    padding: '0 20px',
    borderBottom: '1px solid var(--gold-border-subtle)',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    zIndex: -1,
  },
  skylineImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.35,
    filter: 'brightness(0.7) contrast(1.1)',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, #050505 0%, transparent 50%, rgba(0,0,0,0.8) 100%)',
  },
  heroContent: { 
    maxWidth: '1200px',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroHUD: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '40px',
  },
  hudLine: {
    width: '1px',
    height: '12px',
    backgroundColor: 'var(--gold-border-subtle)',
  },
  mainTitle: {
    fontSize: 'clamp(4rem, 15vw, 12rem)',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    margin: 0,
    fontFamily: 'var(--font-sans)',
    textTransform: 'uppercase',
    color: '#fff',
    lineHeight: '0.8',
    marginBottom: '30px'
  },
  heroTagline: { 
    marginTop: '20px', 
    opacity: 0.5,
  },
  heroActions: {
    marginTop: '60px',
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  scrollHUD: {
    position: 'absolute',
    bottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  scrollBar: {
    width: '1px',
    height: '60px',
    background: 'linear-gradient(to bottom, var(--gold-primary), transparent)',
  },
  databaseSection: {
    padding: '160px 40px',
    maxWidth: '1800px',
    margin: '0 auto'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '100px',
    paddingBottom: '30px',
    borderBottom: '1px solid var(--gold-border-subtle)',
  },
  headerLeft: {},
  headerRight: {
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'flex-end',
     gap: '4px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '40px'
  },
  identitySection: {
    padding: '160px 0',
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--gold-border-subtle)',
    borderBottom: '1px solid var(--gold-border-subtle)',
  },
  identityContainer: {
    maxWidth: '1500px',
    margin: '0 auto',
    padding: '0 40px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '120px',
    alignItems: 'center',
  },
  identityHUD: {
     display: 'flex',
     alignItems: 'center',
     gap: '30px',
     marginTop: '40px',
     marginBottom: '40px',
  },
  hudMetric: {
     display: 'flex',
     flexDirection: 'column',
     gap: '4px',
  },
  hudLineVertical: {
     width: '1px',
     height: '40px',
     backgroundColor: 'var(--gold-border-subtle)',
  },
  identityMetricVal: {
    fontSize: '1.5rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: '400',
    color: 'var(--gold-primary)',
  },
  identityText: {},
  identityDescription: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: 'var(--text-secondary)',
  },
  identityGraphic: {
    position: 'relative',
    height: '600px',
    overflow: 'hidden',
    padding: '1px',
  },
  gridImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.6,
  },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
  },
  gridHUD: {
     position: 'absolute',
     bottom: '24px',
     left: '24px',
     display: 'flex',
     flexDirection: 'column',
     gap: '4px',
  },
  visionSection: {
    padding: '160px 40px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  visionContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  visionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    marginTop: '100px',
  },
  visionItem: {
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  visionLabel: {
    fontSize: '1.2rem',
    letterSpacing: '0.1em',
    color: '#fff',
    fontFamily: 'var(--font-sans)',
    fontWeight: '600',
  },
  visionPara: {
    fontSize: '0.9rem',
    lineHeight: '1.8',
    color: 'var(--text-secondary)',
  },
  footerSection: {
    padding: '160px 40px',
    display: 'flex',
    justifyContent: 'center'
  },
  footerInner: {
    padding: '100px 40px',
    textAlign: 'center',
    maxWidth: '1200px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    letterSpacing: '0.15em',
    marginBottom: '8px',
    fontWeight: '800',
  },
  footerButtons: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
  footerStatus: {
     marginTop: '80px',
     display: 'flex',
     justifyContent: 'space-between',
     width: '100%',
     paddingTop: '30px',
     borderTop: '1px solid var(--gold-border-subtle)',
  }
};

export default Home;