import React from 'react';

export default function AboutOncohelpPage() {
  return (
    <div className="app-content">
      <section className="app-section about-section" aria-labelledby="oncohelp-title">
        <div className="app-section-header">
          <span className="app-section-overline">Beneficiar</span>
          <h1 id="oncohelp-title" className="app-section-title">
            OncoHelp – singura unitate sanitară din România certificată pentru servicii integrate de oncologie
          </h1>
          <p className="app-section-lead">
            Un proiect dedicat tuturor.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <span className="about-pill">
              Sprijină construirea primului spital OncoHelp la Reșița!
            </span>
            <p>
              <span className="about-highlight">OncoHelp</span> este una dintre cele mai dedicate
              fundații din vestul țării în îngrijirea pacienților cu cancer. De ani întregi,
              medici, asistenți și voluntari luptă pentru ca tratamentele moderne să fie cât mai
              aproape de cei care au nevoie de ele.
            </p>
            <p>
              Un gest mic poate schimba o lume. Fii parte din schimbare, alătură-te campaniei{' '}
              <span className="about-highlight">Muzică pentru Viață</span>!
            </p>
          </div>
          <aside className="about-side-card">
            <strong>„Una din convingerile noastre…”</strong>
            <span>
              „Una din convingerile noastre a fost şi este că accesul la sănătate trebuie să fie
              asigurat tuturor, dincolo de situaţia materială sau socială a fiecăruia.”
            </span>
            <span>
              <span className="about-highlight">Șerban Negru</span>, Președintele Asociației
              OncoHelp
            </span>
            <span>
              Află mai multe detalii despre proiectele OncoHelp pe{' '}
              <a href="https://oncohelp.ro" target="_blank" rel="noopener noreferrer">
                oncohelp.ro
              </a>
              .
            </span>
          </aside>
        </div>
      </section>
    </div>
  );
}