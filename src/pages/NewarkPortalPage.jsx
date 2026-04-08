import React from 'react';
import { MapPin, Navigation, ArrowUpRight } from 'lucide-react';

const heroImage = '/images/newark-graffiti.jpg';

const places = [
    {
        name: 'Prudential Center',
        image:
            'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80',
        lat: 40.7336,
        lng: -74.171,
    },
    {
        name: 'Branch Brook Park',
        image:
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
        lat: 40.7806,
        lng: -74.1729,
    },
    {
        name: 'Newark Museum of Art',
        image:
            'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1400&q=80',
        lat: 40.7409,
        lng: -74.1747,
    },
    {
        name: 'Newark Liberty Airport',
        image:
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80',
        lat: 40.6895,
        lng: -74.1745,
    },
];

const mapUrl = (lat, lng) => `https://www.google.com/maps?q=${lat},${lng}`;
const earthUrl = (lat, lng) =>
    `https://earth.google.com/web/@${lat},${lng},1200a,35y,0h,0t,0r`;

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
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '20px',
    },
    card: {
        overflow: 'hidden',
        borderRadius: '26px',
        border: '1px solid rgba(255,255,255,0.10)',
        background: 'rgba(255,255,255,0.04)',
        boxShadow: '0 20px 70px rgba(0,0,0,0.22)',
    },
    imageWrap: {
        position: 'relative',
        height: '240px',
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    tag: {
        position: 'absolute',
        top: '18px',
        left: '18px',
        padding: '8px 12px',
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.18)',
        background: 'rgba(0,0,0,0.30)',
        color: 'rgba(255,255,255,0.76)',
        fontSize: '11px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
    },
    cardTitle: {
        position: 'absolute',
        left: '18px',
        right: '18px',
        bottom: '18px',
        margin: 0,
        fontSize: '30px',
        lineHeight: '1.08',
        fontWeight: 700,
    },
    cardBody: {
        padding: '22px',
    },
    coords: {
        margin: '0 0 16px',
        fontSize: '14px',
        color: 'rgba(255,255,255,0.48)',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    },
    mapBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '16px',
        background: '#ffffff',
        color: '#000000',
        textDecoration: 'none',
        padding: '13px 16px',
        fontSize: '14px',
        fontWeight: 600,
    },
    earthBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.05)',
        color: '#ffffff',
        textDecoration: 'none',
        padding: '13px 16px',
        fontSize: '14px',
        fontWeight: 600,
        border: '1px solid rgba(255,255,255,0.12)',
    },
};

function PlaceCard({ place }) {
    return (
        <article style={styles.card}>
            <div style={styles.imageWrap}>
                <img src={place.image} alt={place.name} style={styles.cardImage} />
                <div style={styles.overlay} />
                <div style={styles.tag}>Newark</div>
                <h3 style={styles.cardTitle}>{place.name}</h3>
            </div>

            <div style={styles.cardBody}>
                <p style={styles.coords}>
                    Lat {place.lat} • Lng {place.lng}
                </p>

                <div style={styles.actions}>
                    <a
                        href={mapUrl(place.lat, place.lng)}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.mapBtn}
                    >
                        Google Maps
                        <ArrowUpRight size={16} />
                    </a>

                    <a
                        href={earthUrl(place.lat, place.lng)}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.earthBtn}
                    >
                        Google Earth
                        <Navigation size={16} />
                    </a>
                </div>
            </div>
        </article>
    );
}

export default function NewarkPortalPage() {
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
                                <a href="#places" style={styles.primaryBtn}>
                                    Explore Locations
                                </a>
                                <a href="#places" style={styles.secondaryBtn}>
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
                    <div style={styles.sectionHead}>
                        <p style={styles.sectionKicker}>Featured Places</p>
                        <h2 style={styles.sectionTitle}>Newark locations</h2>
                    </div>

                    <div style={styles.grid}>
                        {places.map((place) => (
                            <PlaceCard key={place.name} place={place} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}