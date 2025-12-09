import React, { useState, useEffect } from 'react';

const EVENT_DATE = new Date(2025, 11, 14, 19, 0, 0);

export default function DonatePage() {
  const [countdown, setCountdown] = useState({ days: '–', hours: '–', minutes: '–', seconds: '–' });
  const [isAfterEvent, setIsAfterEvent] = useState(false);

  useEffect(() => {
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = EVENT_DATE.getTime() - now;

      if (distance <= 0) {
        setIsAfterEvent(true);
        setCountdown({ days: '0', hours: '0', minutes: '0', seconds: '0' });
        return true;
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
      return false;
    }

    const finishedImmediately = updateCountdown();
    if (finishedImmediately) return;

    const interval = setInterval(() => {
      const finished = updateCountdown();
      if (finished) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isPostEventPreview =
    typeof window !== 'undefined' && window.location.search.includes('postEventPreview=1');

  // Post-event homepage (detailed donation view)
  if (isAfterEvent || isPostEventPreview) {
    return (
      <>
        <header className="site-header homepage-header">
          <img
            src="/Logo Muzica pentru viata.svg"
            alt="Muzică pentru Viață"
            className="logo-main-top"
          />
        </header>

        <div className="homepage-wrapper post-event-wrapper">
          <main className="post-event-grid">
            <section
              className="hero-main donation-panel page-enter-bottom"
              aria-labelledby="post-hero-title"
            >
              <p className="tagline">După concert, puterea ta de a schimba vieți rămâne.</p>

              <h1 id="post-hero-title">
                Continuăm să construim{' '}
                <span className="highlight">primul spital pentru pacienții cu cancer</span> din
                Reșița.
              </h1>

              <p className="lead">
                Muzică pentru Viață nu se oprește în seara concertului. Fiecare donație făcută
                acum înseamnă tratamente mai aproape de casă, drumuri mai puține pentru pacienți și
                familii care pot rămâne aproape unii de alții.
              </p>

              <div className="donation-summary">
                Alege o sumă de mai jos sau introdu o valoare personalizată. Donația ta ajunge
                direct la Fundația OncoHelp pentru construcția spitalului oncologic din Reșița.
              </div>

              {/* Preset amounts – visual only in this version */}
              <div className="donation-amounts-grid">
                <button
                  type="button"
                  className="donation-amount-button donation-amount-button--active"
                >
                  <span className="donation-amount-main">10 €</span>
                  <span className="donation-amount-ron">≈ 50 RON</span>
                </button>
                <button type="button" className="donation-amount-button">
                  <span className="donation-amount-main">25 €</span>
                  <span className="donation-amount-ron">≈ 125 RON</span>
                </button>
                <button type="button" className="donation-amount-button">
                  <span className="donation-amount-main">50 €</span>
                  <span className="donation-amount-ron">≈ 250 RON</span>
                </button>
                <button type="button" className="donation-amount-button">
                  <span className="donation-amount-main">100 €</span>
                  <span className="donation-amount-ron">≈ 500 RON</span>
                </button>
              </div>

              <div className="donation-custom">
                <label className="donation-custom-label" htmlFor="custom-amount">
                  Sau introdu altă sumă (în euro sau lei, direct pe pagina OncoHelp):
                </label>
                <div className="donation-custom-input-row">
                  <input
                    id="custom-amount"
                    type="number"
                    min="1"
                    step="1"
                    className="donation-custom-input"
                    placeholder="Ex: 30"
                  />
                </div>
              </div>

              <a
                className="btn-primary donation-cta-big"
                href="https://oncohelp.ro/donatii/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DONEAZĂ ACUM
              </a>

              <p className="donation-cta-note">
                Vei fi redirecționat către pagina oficială de donații a Fundației OncoHelp, unde
                poți alege suma și metoda de plată preferată. Orice contribuție contează.
              </p>
            </section>

            <aside
              className="aside post-event-story page-enter-right"
              aria-label="Povestea campaniei Muzică pentru Viață"
            >
              <div className="post-event-section">
                <h2 className="post-event-section-title">Ce este Muzică pentru Viață</h2>
                <p className="post-event-text">
                  Muzică pentru Viață a pornit din Reșița, din dorința de a transforma emoția unui
                  concert într-un proiect care schimbă vieți. În fiecare an, oameni din tot Banatul
                  de Munte se adună pentru a susține pacienții cu cancer.
                </p>
                <div className="post-event-image-block post-event-image-block--history">
                  <img
                    src="/16.jpg"
                    alt="Public la evenimentul Muzică pentru Viață în Reșița"
                  />
                </div>
              </div>

              <div className="post-event-section">
                <h2 className="post-event-section-title">
                  De ce construim un spital oncologic la Reșița
                </h2>
                <p className="post-event-text">
                  Astăzi, mulți pacienți din Banatul de Munte sunt nevoiți să străbată sute de
                  kilometri pentru tratament. Un spital oncologic aici, în Reșița, înseamnă
                  drumuri mai scurte, mai puțină suferință pe drumuri și mai mult timp petrecut
                  alături de familie.
                </p>
                <div className="post-event-image-block post-event-image-block--clinic">
                  <img
                    src="/onco-help-logo-d.png"
                    alt="Fundația OncoHelp – partenerul medical al proiectului"
                  />
                </div>
              </div>

              <div className="post-event-section">
                <h2 className="post-event-section-title">Cum poți ajuta chiar acum</h2>
                <p className="post-event-text">
                  Fie că donezi o sumă mică sau mare, vorbești cu prietenii tăi despre proiect sau
                  distribui campania în mediul online, devii parte din comunitatea care construiește
                  speranță, aici, în Banatul de Munte.
                </p>
                <div className="post-event-image-block post-event-image-block--live">
                  <img
                    src="/WhatsApp Image 2025-12-02 at 16.19.50.jpeg"
                    alt="Voluntari și public la Muzică pentru Viață"
                  />
                </div>
              </div>
            </aside>
          </main>
        </div>
      </>
    );
  }

  // Pre-event homepage – original countdown version
  return (
    <>
      {/* Mobile logo - only visible on homepage */}
      <header className="site-header homepage-header">
        <img
          src="/Logo Muzica pentru viata.svg"
          alt="Muzică pentru Viață"
          className="logo-main-top"
        />
      </header>

      <div className="homepage-wrapper">
        <main className="page">
          <section className="hero-main" aria-labelledby="hero-title">
            <p className="tagline">O donație mică poate schimba o lume.</p>

            <h1 id="hero-title">
              Împreună construim{' '}
              <span className="highlight">primul spital pentru bolnavii de cancer </span>
              din Reșița.
            </h1>

            <p className="lead">
              Fiecare donație înseamnă îngrijire mai bună și condiții mai demne pentru pacienții
              bolnavi de cancer din Banat. Ne dorim ca sprijinul dumneavoastră să se vadă într-un
              spital modern, dedicat lor, chiar aici, la Reșița.
            </p>

            <div className="pill-cta">
              <div className="pill">Contribuția dumneavoastră poate schimba o viață întreagă.</div>
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
              <span className="cta-note">
                Orice sumă contează. Împreună construim, cărămidă cu cărămidă, un loc unde speranța
                prinde formă.
              </span>
            </div>

            <div className="sponsors" aria-label="Sponsori și parteneri">
              <div className="sponsors-row">
                <div className="sponsors-col">
                  <span>
                    <strong>Beneficiar donații:</strong>
                  </span>
                  <div className="sponsor-logos">
                    <img src="/onco-help-logo-d.png" alt="OncoHelp – beneficiarul donațiilor" />
                  </div>
                </div>
                <div className="sponsors-divider" aria-hidden="true"></div>
                <div className="sponsors-col">
                  <span>
                    <strong>Organizat de:</strong>
                  </span>
                  <div className="sponsor-logos sponsor-logos-center">
                    <img src="/Logo Radio Romania Resita.svg" alt="Radio România Reșița" />
                  </div>
                </div>
                <div className="sponsors-divider" aria-hidden="true"></div>
                <div className="sponsors-col">
                  <span>
                    <strong>Sponsori:</strong>
                  </span>
                  <div className="sponsor-logos sponsor-logos-partners">
                    <img src="/dacus_logo_site.png" alt="Dacus" />
                    <img
                      src="/skyro-LOGO-6A-final -without tagline-01.png"
                      alt="Sky Radio"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="aside" aria-label="Numărătoare inversă până la eveniment">
            <div className="aside-placeholder">
              <img
                src="/WhatsApp Image 2025-12-02 at 16.19.50.jpeg"
                alt="Muzică pentru Viață – eveniment caritabil"
              />
            </div>
            <div className="badge">
              Următorul eveniment • 14 decembrie • în căsuța de sticlă
            </div>
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
    </>
  );
}