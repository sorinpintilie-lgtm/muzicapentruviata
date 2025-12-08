import React from 'react';

export default function AboutResitaPage() {
  return (
    <div className="app-content">
      <section className="app-section about-section" aria-labelledby="resita-title">
        <div className="app-section-header">
          <span className="app-section-overline">Despre oraș</span>
          <h1 id="resita-title" className="app-section-title">
            Reșița - Orașul de pe Bârzava
          </h1>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <span className="about-pill">
              Un oraș cu istorie industrială și spirit comunitar puternic.
            </span>
            <p>
              <span className="about-highlight">Reșița</span> este un oraș din vestul României,
              situat în județul Caraș-Severin, la poalele Munților Semenic. Fondat în secolul
              al XVIII-lea, orașul a devenit un important centru industrial, cunoscut pentru
              producția de locomotive și utilaje grele.
            </p>
            <p>
              Astăzi, Reșița este un oraș modern cu aproximativ 70.000 de locuitori, care
              combină tradiția industrială cu dezvoltarea contemporană. Orașul găzduiește
              Universitatea Eftimie Murgu și are o comunitate activă în domeniul cultural
              și sportiv.
            </p>
          </div>
          <div className="about-image-card">
            <img
              src="/resita.jpg"
              alt="Peisaj urban din Reșița cu clădiri istorice"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>
        </div>

        <div className="resita-features-grid">
          <div className="feature-card feature-card-compact">
            <div className="feature-image">
              <img
                src="/tmk-resita-4-1200x675.jpg"
                alt="Arhitectură industrială din Reșița"
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            <h3>Patrimoniu Industrial</h3>
            <p>
              Reșița păstrează urme ale epocii de glorie industriale, cu fabrici istorice
              și clădiri care amintesc de perioada când orașul era un centru feroviar important.
            </p>
          </div>

          <div className="feature-card feature-card-compact">
            <div className="feature-image">
              <img
                src="/ubb-resita.jpg"
                alt="Instituții culturale din Reșița"
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            <h3>Instituții de Învățământ</h3>
            <p>
              Orașul este gazda Universității Eftimie Murgu, una dintre cele mai importante
              instituții de învățământ superior din regiunea Banatului.
            </p>
          </div>

          <div className="feature-card feature-card-wide">
            <div className="feature-image">
              <img
                src="/resita populatie.jpg"
                alt="Comunitate activă din Reșița"
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            <h3>Spirit Comunitar</h3>
            <p>
              Reșița are o comunitate puternică și implicată în proiecte sociale,
              culturale și caritabile, inclusiv inițiative pentru sănătatea publică.
            </p>
          </div>
        </div>

        <div className="about-grid">
          <aside className="about-side-card">
            <strong>De ce Reșița?</strong>
            <span>
              Reșița reprezintă spiritul Banatului: oameni harnici, comunități unite și
              dorința de a construi un viitor mai bun. Aici, fiecare proiect are impact
              real asupra vieților oamenilor.
            </span>
            <span>
              Construirea primului spital oncologic din Reșița înseamnă nu doar
              infrastructură medicală modernă, ci și speranță pentru mii de oameni
              din regiune.
            </span>
          </aside>
          <div className="about-text">
            <p>
              Reșița este un oraș care demonstrează că tradiția industrială poate coexista
              cu inovația modernă. De la fabricile care au pus orașul pe harta industrială
              europeană până la proiectele contemporane de dezvoltare, Reșița continuă
              să fie un exemplu de reziliență și progres.
            </p>
            <p>
              Prin proiectul Muzică pentru Viață, Reșița își consolidează rolul de centru
              medical regional, oferind locuitorilor săi acces la îngrijiri oncologice
              de ultimă generație, chiar în orașul natal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}