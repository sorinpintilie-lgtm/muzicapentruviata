import React from 'react';

export default function LivePage() {
  return (
    <div className="app-content">
      <section className="app-section live-section" aria-labelledby="live-title">
        <div className="app-section-header">
          <span className="app-section-overline">Muzică pentru Viață în direct</span>
          <h1 id="live-title" className="app-section-title">
            Vezi și ascultă emoția din căsuța de sticlă.
          </h1>
          <p className="app-section-lead">
            Atunci când muzica începe, Reșița devine un singur suflet. De aici, din căsuța
            de sticlă, fiecare refren adună donații pentru spital.
          </p>
        </div>

        <div className="live-layout">
          <div>
            <div className="live-badge">Live în curând</div>
            <div
              className="live-video-frame"
              aria-label="Transmisiune live Muzică pentru Viață"
            >
              <div className="live-video-placeholder">
                <p>
                  Transmisiunea live video va apărea aici în 14 decembrie. Până atunci, poți
                  asculta melodia campaniei și poți dona pentru spitalul oncologic.
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

          <div>
            <p className="app-section-lead">
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