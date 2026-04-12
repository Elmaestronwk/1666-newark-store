import React from 'react';
import { Navigation, ArrowUpRight, Plus } from 'lucide-react';
import { places } from '../store/places';
import PlaceCard from '../components/PlaceCard';
import { useMediaStore } from '../store/mediaStore';
import MediaPostCard from '../components/media/MediaPostCard';
import { useSound } from '../hooks/useSound';
import { Link } from 'react-router-dom';

const heroImage = '/assets/newark-graffiti.png';

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#07090c',
        color: '#ffffff',
        fontFamily: 'Inter, Arial, sans-serif',
    },
    container: {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
    },
    hero: {
        padding: '36px 0 28px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
    },
    heroGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '28px',
        alignItems: 'center',
    },
    heroText: {
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
    },
    badge: {
        display: 'inline-block',
        width: 'fit-content',
        padding: '8px 14px',
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.04)',
        color: 'rgba(255,255,255,0.72)',
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        fontSize: '12px',
    },
    title: {
        margin: 0,
        fontSize: '56px',
        lineHeight: '0.95',
        fontWeight: 700,
        letterSpacing: '-0.03em',
    },
    subtitle: {
        margin: 0,
        maxWidth: '620px',
        fontSize: '18px',
        lineHeight: '1.8',
        color: 'rgba(255,255,255,0.72)',
    },
    buttonRow: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    },
    primaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 20px',
        borderRadius: '16px',
        background: '#ffffff',
        color: '#000000',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '14px',
    },
    secondaryBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 20px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.05)',
        color: '#ffffff',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '14px',
        border: '1px solid rgba(255,255,255,0.12)',
    },
    heroCard: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '28px',
        border: '1px solid rgba(255,255,255,0.10)',
        minHeight: '420px',
        background: '#0b0e12',
        boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        background:
            'linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.18), rgba(0,0,0,0))',
    },
    heroCardText: {
        position: 'absolute',
        left: '24px',
        right: '24px',
        bottom: '24px',
    },
    heroKicker: {
        margin: 0,
        fontSize: '12px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.62)',
    },
    heroCardTitle: {
        margin: '10px 0 0',
        fontSize: '36px',
        lineHeight: '1.05',
        fontWeight: 700,
    },
    section: {
        padding: '32px 0 52px',
    },
    sectionHead: {
        marginBottom: '22px',
    },
    sectionKicker: {
        margin: 0,
        fontSize: '12px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)',
    },
    sectionTitle: {
        margin: '10px 0 0',
        fontSize: '34px',
        lineHeight: '1.1',
        fontWeight: 700,
    },
};

export default function NewarkPortalPage() {
    const { media, fetchMedia, isLoading } = useMediaStore();
    const { playClick, playNav } = useSound();

    React.useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    return (
        <div style={styles.page}>
            <section style={styles.hero}>
                <div style={styles.container}>
                    <div style={styles.heroGrid}>
                        <div style={styles.heroText}>
                            <div style={styles.badge}>Newark Portal</div>

                            <h1 style={styles.title}>Explore Newark.</h1>

                            <p style={styles.subtitle}>
                                Places, movement, culture, and city identity in one clean page.
                            </p>

                            <div style={styles.buttonRow}>
                                <a href="#places" style={styles.primaryBtn} onClick={() => playClick()}>
                                    Explore Locations
                                </a>
                                <a href="#places" style={styles.secondaryBtn} onClick={() => playClick()}>
                                    View Gallery
                                </a>
                            </div>
                        </div>

                        <div style={styles.heroCard}>
                            <img
                                src={heroImage}
                                alt="Newark hero graphic"
                                style={styles.heroImage}
                            />
                            <div style={styles.overlay} />
                            <div style={styles.heroCardText}>
                                <p style={styles.heroKicker}>1666 Newark • City Portal</p>
                                <h2 style={styles.heroCardTitle}>Bold image. Clean layout.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="places" style={styles.section}>
                <div style={styles.container}>
                    {/* Featured Section */}
                    {(media || []).some(m => m?.is_published && m?.is_featured) && (
                        <div style={{gridColumn: '1/-1', marginBottom: '40px'}}>
                            <div style={styles.sectionHead}>
                                <p style={styles.sectionKicker}>High Priority Signal</p>
                                <h2 style={styles.sectionTitle}>Featured Protocol</h2>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
                                gap: '32px',
                            }}>
                                {(media || []).filter(m => m?.is_published && m?.is_featured).map((item) => (
                                    <MediaPostCard key={item?.id || Math.random()} item={item} featured />
                                ))}
                            </div>
                            <div style={{marginTop: '60px', borderBottom: '1px solid rgba(255,255,255,0.08)'}} />
                        </div>
                    )}

                    <div style={styles.sectionHead}>
                        <p style={styles.sectionKicker}>Broadcast Feed</p>
                        <h2 style={styles.sectionTitle}>Full Archive</h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                        gap: '24px',
                        width: '100%'
                    }}>
                        {(media || []).filter(m => m?.is_published && !m?.is_featured).map((item) => (
                            <MediaPostCard key={item?.id || Math.random()} item={item} />
                        ))}
                        {(media || []).filter(m => m?.is_published).length === 0 && !isLoading && (
                            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '100px 0', opacity: 0.5}}>
                                <p className="hud-label">No live data streams detected</p>
                                <Link to="/admin" className="luxury-btn" style={{marginTop: '20px'}}>Initialize First Post</Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section id="legacy-places" style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHead}>
                        <p style={styles.sectionKicker}>Historical Points</p>
                        <h2 style={styles.sectionTitle}>Featured Locations</h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                        gap: '20px',
                    }}>
                        {places.map((place) => (
                            <PlaceCard key={place.name} place={place} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}