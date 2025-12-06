import React, { useState, useEffect } from 'react';

export default function DonatePage() {
  const [countdown, setCountdown] = useState({ days: '–', hours: '–', minutes: '–', seconds: '–' });

  useEffect(() => {
    function getNextEventDate() {
      const now = new Date();
      const year = now.getFullYear();
      // 14 decembrie, ora 19:00, fus orar local
      let eventDate = new Date(year, 11, 14, 19, 0, 0);
      if (now > eventDate) {
        eventDate = new Date(year + 1, 11, 14, 19, 0, 0);
      }
      return eventDate;
    }

    const target = getNextEventDate();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = target.getTime() - now;

      if (distance <= 0) {
        setCountdown({ days: '0', hours: '0', minutes: '0', seconds: '0' });
        return;
      }

      const secondsTotal = Math.floor(distance / 1000);
      const days = Math.floor(secondsTotal / (60 * 60 * 24));
      const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((secondsTotal % (60 * 60)) / 60);
      const seconds = secondsTotal % 60;

      setCountdown({
        days: String(days),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-wrapper">
      <main className="page">
        <section className="hero-main" aria-labelledby="hero-title">
          <p className="tagline">O donație mică poate schimba o lume.</p>

          <h1 id="hero-title">
            Împreună construim <span className="highlight">primul spital pentru bolnavii de cancer </span>
            din Reșița.
          </h1>

          <p className="lead">
            Fiecare donație înseamnă îngrijire mai bună și condiții mai demne pentru pacienții
            bolnavi de cancer din Banat. Ne dorim ca sprijinul dumneavoastră să se vadă într-un spital
            modern, dedicat lor, chiar aici, la Reșița.
          </p>

          <div className="pill-cta">
            <div className="pill">
              Contribuția dumneavoastră poate schimba o viață întreagă.
            </div>
            <a
              className="btn-primary"
              href="https://oncohelp.ro/donatii/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DONEAZĂ ACUM
            </a>
          </div>

          <div className="cta-row">
            <span className="cta-note">Orice sumă contează. Împreună construim, cărămidă cu cărămidă,
              un loc unde speranța prinde formă.</span>
          </div>

          <div className="sponsors" aria-label="Sponsori și parteneri">
            <div className="sponsors-row">
              <div className="sponsors-col">
                <span><strong>Beneficiar donații:</strong></span>
                <div className="sponsor-logos">
                  <img src="/onco-help-logo-d.png" alt="OncoHelp – beneficiarul donațiilor" />
                </div>
              </div>
              <div className="sponsors-divider" aria-hidden="true"></div>
              <div className="sponsors-col">
                <span><strong>Organizat de:</strong></span>
                <div className="sponsor-logos sponsor-logos-center">
                  <img
                    src="/Logo Radio Romania Resita.svg"
                    alt="Radio România Reșița"
                  />
                </div>
              </div>
              <div className="sponsors-divider" aria-hidden="true"></div>
              <div className="sponsors-col">
                <span><strong>Sponsori:</strong></span>
                <div className="sponsor-logos sponsor-logos-partners">
                  <img src="/dacus_logo_site.png" alt="Dacus" />
                  <img src="/skyro-LOGO-6A-final -without tagline-01.png" alt="Sky Radio" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="aside" aria-label="Numărătoare inversă până la eveniment">
          <div className="aside-placeholder">
            <img src="/WhatsApp Image 2025-12-02 at 16.19.50.jpeg" alt="Muzică pentru Viață – eveniment caritabil" />
          </div>
          <div className="badge">Următorul eveniment • 14 decembrie • în căsuța de sticlă</div>
          <div className="countdown">
            <div className="time-box">
              <div className="time-value">{countdown.days}</div>
              <div className="time-label">zile</div>
            </div>
            <div className="time-box">
              <div className="time-value">{countdown.hours}</div>
              <div className="time-label">ore</div>
            </div>
            <div className="time-box">
              <div className="time-value">{countdown.minutes}</div>
              <div className="time-label">minute</div>
            </div>
            <div className="time-box">
              <div className="time-value">{countdown.seconds}</div>
              <div className="time-label">secunde</div>
            </div>
          </div>
          <div className="event-meta">
            <span className="event-title">Campania Muzică pentru Viață</span>
            <span>Reșița • 14 decembrie • ora 19:00</span>
            <span>Căsuța de sticlă începe în 14 decembrie.</span>
          </div>
        </aside>
      </main>
    </div>
  );
}