import { motion } from 'framer-motion';
import { Mail, Terminal, Activity } from 'lucide-react';

const ContactView = () => {
  const email = '21maxexpo@gmail.com';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={styles.container}
    >
      <div style={styles.hudTop} className="micro-text">
        <Activity size={12} style={{marginRight: '8px'}}/> 
        SYS.COMM_LINK: ESTABLISHED // ENCRYPTION: SECURE
      </div>

      <div style={styles.card} className="glass-panel">
        <div style={styles.header}>
          <div style={styles.iconBox}>
            <Terminal size={24} color="var(--accent-neon)" />
          </div>
          <h1 style={styles.title} className="neon-text">CONTACT_UPLINK</h1>
          <p style={styles.subtitle} className="micro-text">
            Questions, custom orders, collaborations, or support — reach out directly.
          </p>
        </div>

        <div style={styles.content}>
          <div style={styles.dataBlock}>
            <p className="micro-text" style={styles.label}>TARGET_ADDR</p>
            <p style={styles.emailDisplay}>{email}</p>
          </div>

          <a 
            href={`mailto:${email}`} 
            className="system-btn-solid"
            style={styles.actionBtn}
          >
            SEND_TRANSMISSION
          </a>
        </div>

        <div style={styles.footer}>
          <p className="micro-text">1666_NEWARK // INF_SYSTEMS</p>
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    padding: '80px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    position: 'relative'
  },
  hudTop: {
    marginBottom: '20px',
    color: 'var(--accent-neon)',
    opacity: 0.6,
    display: 'flex',
    alignItems: 'center'
  },
  card: {
    padding: '60px 40px',
    maxWidth: '550px',
    width: '100%',
    textAlign: 'center',
    border: '1px solid var(--border-neon)',
    position: 'relative',
    borderRadius: '0'
  },
  header: {
    marginBottom: '40px'
  },
  iconBox: {
    width: '50px',
    height: '50px',
    border: '1px solid var(--border-neon)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 24px',
    backgroundColor: 'var(--accent-neon-dim)'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    letterSpacing: '6px',
    marginBottom: '16px',
    fontFamily: 'var(--font-mono)'
  },
  subtitle: {
    maxWidth: '400px',
    margin: '0 auto',
    lineHeight: '1.6',
    opacity: 0.8
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px'
  },
  dataBlock: {
    backgroundColor: 'rgba(0, 255, 65, 0.03)',
    padding: '20px',
    width: '100%',
    borderLeft: '4px solid var(--accent-neon)',
    textAlign: 'left'
  },
  label: {
    marginBottom: '10px',
    opacity: 0.7
  },
  emailDisplay: {
    fontSize: '1.1rem',
    color: '#fff',
    fontFamily: 'var(--font-mono)',
    fontWeight: '400',
    letterSpacing: '1px'
  },
  actionBtn: {
    width: '100%',
    textAlign: 'center',
    display: 'block'
  },
  footer: {
    marginTop: '40px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '20px',
    opacity: 0.4
  }
};

export default ContactView;
