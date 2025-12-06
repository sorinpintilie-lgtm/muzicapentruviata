import React from 'react';

export default function SponsorsPage() {
  return (
    <div className="app-content">
      <section
        className="app-section sponsors-section-extended"
        aria-labelledby="sponsori-title"
      >
        <div className="app-section-header">
          <span className="app-section-overline">Împreună pentru același vis</span>
          <h1 id="sponsori-title" className="app-section-title">
            Mulțumim partenerilor care au aprins lumina în Reșița.
          </h1>
        </div>

        <div className="sponsors-grid">
          <div className="sponsors-thanks">
            <p>
              Fiecare companie, instituție sau partener media care s-a alăturat campaniei{' '}
              <strong>Muzică pentru Viață</strong> a ales să pună mai presus de toate binele
              comunității. Fără ei, acest proiect ar fi rămas doar o idee frumoasă.
            </p>
            <p>
              Le mulțumim celor care investesc nu doar bani, ci și încredere, timp și energie
              pentru ca spitalul oncologic din Reșița să devină realitate.
            </p>
            <p>
              Dacă reprezinți o companie și vrei să devii partener al campaniei, ne poți
              contacta prin Radio România Reșița. Împreună putem construi mai mult decât un
              spital: putem construi un exemplu.
            </p>
          </div>
          <div className="sponsors-logos-extended">
            <div className="sponsor-section">
              <h3 className="sponsor-section-title">Organizator</h3>
              <div className="sponsor-section-logos">
                <img
                  src="/Logo Radio Romania Resita.svg"
                  alt="Radio România Reșița – organizator"
                />
              </div>
            </div>
            <div className="sponsor-section">
              <h3 className="sponsor-section-title">Parteneri</h3>
              <div className="sponsor-section-logos">
                <img src="/dacus_logo_site.png" alt="Dacus – partener" />
                <img
                  src="/skyro-LOGO-6A-final -without tagline-01.png"
                  alt="Sky Radio – partener"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}