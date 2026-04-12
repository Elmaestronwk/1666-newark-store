import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught:', error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#050505',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          fontFamily: 'monospace',
          gap: '20px'
        }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#D4AF37', textTransform: 'uppercase' }}>
            1666 Newark // System Error
          </p>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', margin: 0 }}>
            RENDER_FAILED
          </h1>
          <div style={{
            background: 'rgba(255,50,50,0.08)',
            border: '1px solid rgba(255,50,50,0.3)',
            borderRadius: '12px',
            padding: '20px 28px',
            maxWidth: '700px',
            width: '100%'
          }}>
            <p style={{ color: 'rgba(255,100,100,0.9)', fontSize: '12px', marginBottom: '8px' }}>
              {this.state.error?.toString()}
            </p>
            {this.state.info && (
              <pre style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', overflow: 'auto', maxHeight: '200px' }}>
                {this.state.info.componentStack}
              </pre>
            )}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 28px',
              background: 'transparent',
              border: '1px solid rgba(212,175,55,0.4)',
              color: '#D4AF37',
              cursor: 'pointer',
              letterSpacing: '0.1em',
              fontSize: '11px',
              textTransform: 'uppercase',
              fontFamily: 'monospace'
            }}
          >
            RETRY_CONNECTION
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
