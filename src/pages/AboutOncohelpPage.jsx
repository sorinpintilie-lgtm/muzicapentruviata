import React from 'react';

export default function AboutOncohelpPage() {
  return (
    <div className="app-content">
      <section className="app-section about-section" aria-labelledby="oncohelp-title">
        <div className="app-section-header">
          <span className="app-section-overline">Despre beneficiar</span>
          <h1 id="oncohelp-title" className="app-section-title">
            Cine este OncoHelp și de ce construim aici, la Reșița.
          </h1>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <span className="about-pill">
              Pentru ca niciun drum spre tratament să nu mai pară imposibil.
            </span>
            <p>
              <span className="about-highlight">OncoHelp</span> este una dintre cele mai
              implicate fundații din vestul țării în îngrijirea pacienților bolnavi de cancer. De
              ani de zile, medici, asistenți și voluntari luptă pentru ca tratamentele
              moderne să fie cât mai aproape de casă.
            </p>
            <p>
              Spitalul oncologic din Reșița înseamnă mai mult decât ziduri și aparatură.
              Înseamnă &quot;nu mai trebuie să mergeți la sute de kilometri distanță&quot;,
              înseamnă nopți mai puțin grele pentru familii și ore mai puțin dureroase
              petrecute pe drumuri.
            </p>
            <p>
              Cu fiecare donație, sprijinim{' '}
              <span className="about-highlight">
                un loc în care pacienții primesc tratament, consiliere și, mai ales, speranță
              </span>
              . Fundația se ocupă transparent de fiecare etapă a proiectului, astfel încât să
              știi că donația ta ajunge acolo unde este cea mai mare nevoie.
            </p>
          </div>
          <aside className="about-side-card">
            <strong>De ce acum?</strong>
            <span>
              Numărul pacienților bolnavi de cancer este în creștere, iar distanța până la centrele
              de tratament mari înseamnă timp pierdut, bani cheltuiți și oboseală pentru cei
              deja slăbiți de boală.
            </span>
            <span>
              Reșița are nevoie de un spital dedicat lor. Cu ajutorul tău, această nevoie se
              poate transforma într-o clădire, într-o echipă și într-un loc în care veștile
              bune apar tot mai des.
            </span>
          </aside>
        </div>
      </section>
    </div>
  );
}