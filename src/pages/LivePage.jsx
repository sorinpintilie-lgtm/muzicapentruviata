import React from 'react';

export default function LivePage() {
  return (
    <div className="app-content">
      <section className="app-section live-section" aria-labelledby="live-title">
        <div className="app-section-header">
          <span className="app-section-overline" style={{ color: '#d81b60', fontWeight: '600' }}>
            LIVE: Muzică Pentru Viață
          </span>
          <h1 id="live-title" className="app-section-title">
            Emoție direct din căsuța de sticlă.
          </h1>
          <p className="app-section-lead">
            Totul începe într-o căsuță de sticlă, iar Reșița se alătură cauzei care schimbă o lume. Haideți la muzică, pentru viață!
          </p>
        </div>

        <div className="live-layout">
          <div className="live-video-section">
            <div className="live-badge">Live în curând</div>
            <div
              className="live-video-frame"
              aria-label="Transmisiune live Muzică pentru Viață"
            >
              <div className="live-video-placeholder">
                <p style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '600' }}>
                  Transmisiunea live va începe din 14 Decembrie!
                </p>
              </div>
              {/*
                Pentru a integra un stream YouTube Live, înlocuiește VIDEO_ID cu id-ul clipului:
                <iframe
                  src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
                  title="Muzică pentru Viață Live"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              */}
            </div>
            <p className="live-note">
              În timpul evenimentului, aici vei putea vedea artiștii, voluntarii și oamenii
              care aleg să fie parte din poveste. Fiecare minut de live este o invitație la
              încă o donație.
            </p>
          </div>

          <div className="live-description-section">
            <p className="app-section-lead live-description-text">
              Muzica nu este doar pentru suflet, ci și pentru viață. Aici, la căsuța de sticlă,
              fiecare melodie ne aduce mai aproape de misiunea noastră: construirea primului
              spital oncologic la Reșița!
            </p>
          </div>
        </div>

        {/* Radio Promotion Section */}
        <div className="radio-promotion-section" style={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '30px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '16px',
          border: '2px solid #dee2e6'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#d81b60',
            marginBottom: '16px'
          }}>
            RADIO REȘIȚA
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '24px',
            maxWidth: '600px',
            margin: '0 auto 24px'
          }}>
            Conectează-te la vocea Reșiței și rămâi la curent cu știri, muzică și evenimente locale.
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              className="radio-play-button"
              style={{
                background: '#d81b60',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(216, 27, 96, 0.3)'
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
              onClick={() => {
                // Trigger the same behavior as the floating global radio player
                window.dispatchEvent(new Event('global-radio-toggle'));
              }}
            >
              ASCULTĂ ACUM!
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}