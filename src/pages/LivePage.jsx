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
              Timp de câteva ore, muzica devine pretextul pentru un lucru simplu: să nu îi
              lăsăm singuri pe cei care trec prin tratament oncologic. Fiecare piesă cântată
              înseamnă încă un pas spre un spital complet dedicat lor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}