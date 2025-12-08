import React, { useState, useRef } from 'react';

export default function LivePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
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
          <div className="live-video-section">
            <div className="live-badge">Live în curând</div>
            <div
              className="live-video-frame"
              aria-label="Transmisiune live Muzică pentru Viață"
            >
              <div className="live-video-placeholder">
                <p>
                  Transmisiunea live video va apărea aici în 14 decembrie. Până atunci, poți
                  asculta Radio Reșița live și poți dona pentru spitalul oncologic.
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

        {/* Radio Player Section */}
        <div className="radio-player-section">
          <div className="radio-player-container">
            <div className="radio-player-header">
              <h2>📻 Radio Reșița - Live</h2>
              <p>Ascultă Radio Reșița în timp real</p>
            </div>
            <div className="radio-player-controls">
              <button
                onClick={togglePlay}
                className="radio-play-button"
                aria-label={isPlaying ? "Oprește Radio Reșița" : "Porneste Radio Reșița"}
              >
                {isPlaying ? 'Stop' : 'Play'}
              </button>
              <audio
                ref={audioRef}
                preload="none"
                className="radio-audio-player hidden"
                aria-label="Player Radio Reșița"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/api/radio-proxy" type="audio/mpeg" />
                Browserul dumneavoastră nu suportă redarea audio.
              </audio>
            </div>
            <div className="radio-player-info">
              <p>
                Conectează-te la vocea Reșiței și rămâi la curent cu știri, muzică și evenimente locale.
                Radio Reșița - mereu aproape de comunitatea noastră.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}