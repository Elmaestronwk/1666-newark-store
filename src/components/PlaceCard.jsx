import React from 'react';
import { Navigation, ArrowUpRight } from 'lucide-react';
import { mapUrl, earthUrl } from '../store/places';

const styles = {
    card: {
        overflow: 'hidden',
        borderRadius: '0',
    },
    imageWrap: {
        position: 'relative',
        height: '240px',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-color)',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        filter: 'grayscale(20%) contrast(1.1)',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    },
    tag: {
        position: 'absolute',
        top: '18px',
        left: '18px',
        padding: '4px 8px',
        background: 'rgba(0,0,0,0.8)',
        border: '1px solid var(--border-neon)',
        color: 'var(--accent-neon)',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.1em',
        backdropFilter: 'blur(4px)',
    },
    cardTitle: {
        position: 'absolute',
        left: '18px',
        right: '18px',
        bottom: '18px',
        margin: 0,
        fontSize: '24px',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '2px',
        fontWeight: 700,
        color: '#fff',
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
};

export default function PlaceCard({ place }) {
    return (
        <article style={styles.card} className="glass-panel">
            <div style={styles.imageWrap}>
                <img src={place.image} alt={place.name} style={styles.cardImage} />
                <div style={styles.overlay} />
                <div style={styles.tag}>SYS.LOC</div>
                <h3 style={styles.cardTitle}>{place.name.toUpperCase()}</h3>
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
                        className="system-btn-solid"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'center' }}
                    >
                        MAPS
                        <ArrowUpRight size={16} />
                    </a>

                    <a
                        href={earthUrl(place.lat, place.lng)}
                        target="_blank"
                        rel="noreferrer"
                        className="system-btn"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'center' }}
                    >
                        EARTH
                        <Navigation size={16} />
                    </a>
                </div>
            </div>
        </article>
    );
}
