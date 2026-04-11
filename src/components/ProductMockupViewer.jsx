import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, RoundedBox, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function ProductMockup({ color = '#d4af37', metalness = 0.55, roughness = 0.28, angledView = true }) {
    const material = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color,
            metalness,
            roughness,
        });
    }, [color, metalness, roughness]);

    return (
        <group rotation={angledView ? [0.18, 0.6, 0] : [0, 0, 0]} position={[0, 0.15, 0]}>
            <RoundedBox args={[2.2, 3, 0.18]} radius={0.08} smoothness={6}>
                <primitive object={material} attach="material" />
            </RoundedBox>

            <mesh position={[0, 0, 0.11]}>
                <planeGeometry args={[1.7, 2.45]} />
                <meshStandardMaterial color="#111111" metalness={0.15} roughness={0.85} />
            </mesh>

            <mesh position={[0, 1.06, 0.115]}>
                <planeGeometry args={[1.15, 0.22]} />
                <meshStandardMaterial color="#f5f5f5" metalness={0.1} roughness={0.6} />
            </mesh>

            <mesh position={[0, -0.1, 0.12]}>
                <torusGeometry args={[0.58, 0.03, 18, 64]} />
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.25} />
            </mesh>

            <mesh position={[0, -1.8, 0]}>
                <cylinderGeometry args={[0.7, 0.82, 0.12, 48]} />
                <meshStandardMaterial color="#1d1d1d" metalness={0.45} roughness={0.5} />
            </mesh>
        </group>
    );
}

function ViewerScene({ selectedMaterial, viewMode }) {
    const materialConfig = {
        neon: { color: '#00ff41', metalness: 0.6, roughness: 0.2 },
        obsidian: { color: '#1b1b1b', metalness: 0.4, roughness: 0.5 },
        silver: { color: '#c9ced6', metalness: 0.72, roughness: 0.22 },
        ivory: { color: '#f0ece2', metalness: 0.18, roughness: 0.7 },
    };

    const current = materialConfig[selectedMaterial] || materialConfig.obsidian;

    return (
        <>
            <color attach="background" args={['#050505']} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[4, 5, 3]} intensity={1.5} />
            <directionalLight position={[-3, 2, -2]} intensity={0.5} />
            <spotLight position={[0, 6, 4]} angle={0.35} penumbra={1} intensity={1.2} />

            <ProductMockup
                color={current.color}
                metalness={current.metalness}
                roughness={current.roughness}
                angledView={viewMode === 'angled'}
            />

            <ContactShadows
                position={[0, -2, 0]}
                opacity={0.45}
                scale={8}
                blur={2.5}
                far={4}
            />

            <Environment preset="studio" />

            <OrbitControls
                enablePan={false}
                minDistance={4}
                maxDistance={7}
                minPolarAngle={Math.PI / 3.2}
                maxPolarAngle={Math.PI / 1.9}
            />
        </>
    );
}

export default function ProductMockupViewer() {
    const [selectedMaterial, setSelectedMaterial] = useState('obsidian');
    const [viewMode, setViewMode] = useState('angled');

    return (
        <section style={styles.section}>
            <div style={styles.inner}>
                <div style={styles.copyCol}>
                    <p style={styles.eyebrow} className="micro-text">Featured Preview</p>
                    <h2 style={styles.title} className="neon-text">SYS.MOCKUP_V3</h2>
                    <p style={styles.description} className="micro-text">
                        INTERACTIVE_3D_RENDER // MATERIAL_SIMULATION // APPAREL_SYSTEMS_PREVIEW
                    </p>

                    <div style={styles.controls}>
                        <div style={styles.controlGroup}>
                            <span style={styles.controlLabel} className="micro-text">VIEW_MODE</span>
                            <div style={styles.buttonRow}>
                                <button
                                    style={viewMode === 'front' ? styles.activeButton : styles.button}
                                    onClick={() => setViewMode('front')}
                                >
                                    FRONT
                                </button>
                                <button
                                    style={viewMode === 'angled' ? styles.activeButton : styles.button}
                                    onClick={() => setViewMode('angled')}
                                >
                                    ANGLED
                                </button>
                            </div>
                        </div>

                        <div style={styles.controlGroup}>
                            <span style={styles.controlLabel} className="micro-text">MATERIAL_UPLINK</span>
                            <div style={styles.swatchRow}>
                                {['neon', 'obsidian', 'silver', 'ivory'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setSelectedMaterial(item)}
                                        style={{
                                            ...styles.swatch,
                                            ...(selectedMaterial === item ? styles.swatchActive : {}),
                                        }}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p style={styles.note}>Drag to rotate · Scroll to zoom</p>
                </div>

                <div style={styles.viewerCol}>
                    <div style={styles.canvasShell}>
                        <Canvas
                            camera={{ position: [0, 1.1, 5.2], fov: 38 }}
                            dpr={[1, 1.6]}
                            gl={{ antialias: true, alpha: false }}
                        >
                            <ViewerScene selectedMaterial={selectedMaterial} viewMode={viewMode} />
                        </Canvas>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        width: '100%',
        padding: '72px 20px',
        background: 'linear-gradient(180deg, #090909 0%, #111114 100%)',
    },
    inner: {
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: '32px',
        alignItems: 'center',
    },
    copyCol: {
        color: '#fff',
    },
    eyebrow: {
        color: '#b5b5b5',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        fontSize: '0.75rem',
        marginBottom: '14px',
    },
    title: {
        margin: 0,
        fontSize: 'clamp(2rem, 4vw, 3.3rem)',
        lineHeight: 1.02,
    },
    description: {
        marginTop: '18px',
        color: '#cccccc',
        fontSize: '1rem',
        lineHeight: 1.7,
        maxWidth: '580px',
    },
    controls: {
        marginTop: '28px',
        display: 'grid',
        gap: '18px',
    },
    controlGroup: {
        display: 'grid',
        gap: '10px',
    },
    controlLabel: {
        color: '#d5d5d5',
        fontSize: '0.9rem',
        fontWeight: 600,
    },
    buttonRow: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
    },
    button: {
        padding: '10px 16px',
        border: '1px solid var(--border-color)',
        background: 'transparent',
        color: '#fff',
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '1px',
        transition: 'all 0.2s ease',
    },
    activeButton: {
        padding: '10px 16px',
        border: '1px solid var(--accent-neon)',
        background: 'var(--accent-neon-dim)',
        color: 'var(--accent-neon)',
        cursor: 'pointer',
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '1px',
    },
    swatchRow: {
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
    },
    swatch: {
        padding: '10px 14px',
        border: '1px solid var(--border-color)',
        background: 'transparent',
        color: '#fff',
        cursor: 'pointer',
        textTransform: 'capitalize',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        transition: 'all 0.2s ease',
    },
    swatchActive: {
        background: 'var(--accent-neon-dim)',
        border: '1px solid var(--accent-neon)',
        color: 'var(--accent-neon)',
        fontWeight: 700,
    },
    note: {
        marginTop: '18px',
        color: '#9c9c9c',
        fontSize: '0.88rem',
    },
    viewerCol: {
        minHeight: '520px',
    },
    canvasShell: {
        width: '100%',
        height: '520px',
        borderRadius: '28px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        background: '#0b0b0c',
    },
};