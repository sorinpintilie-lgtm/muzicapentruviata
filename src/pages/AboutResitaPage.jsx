import React from 'react';

export default function AboutResitaPage() {
  return (
    <div className="app-content">
      <section className="app-section about-section" aria-labelledby="resita-title">
        <div className="app-section-header">
          <span className="app-section-overline">Despre Reșița</span>
          <h1 id="resita-title" className="app-section-title">
            Orașul care și-a transformat forța în solidaritate
          </h1>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <span className="about-pill">
              Dăruiește. Donează. Pentru viață.
            </span>
            <p>
              Situat în sud-vestul României, <span className="about-highlight">Reșița</span> este un oraș cu aproape 80.000 de oameni, așezat pe malurile Bârzavei și crescut între dealuri care i-au modelat identitatea. Timp de peste un secol, Reșița a fost inima industrială a țării, locul unde s-au construit locomotive, s-au aprins furnale și s-a scris istorie tehnică pentru întreaga Europă.
            </p>
            <p>
              Astăzi, Reșița nu mai este doar orașul oțelului. Este orașul renașterii. Al oamenilor care se ridică împreună, care cred în comunitate, în cultură, în educație și în puterea gesturilor mici ce schimbă destine.
            </p>
            <p>
              Aici, în Reșița, s-a născut Muzică pentru Viață – o inițiativă care a adunat în jurul ei mii de oameni, familii, copii, artiști, voluntari și inimile tuturor celor care își doresc un viitor în care bolnavii de cancer să nu mai fie nevoiți să plece departe pentru tratament.
            </p>
            <p>
              Reșița este mai mult decât un oraș. Este o promisiune. Este o comunitate care nu stă deoparte, ci construiește – pas cu pas – speranță.
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
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
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