import React from 'react';
import { NavLink } from 'react-router-dom';

export default function TermsAndConditionsPage() {
  return (
    <>
      {/* Mobile Header */}
      <header className="site-header">
        <img
          src="/Logo Muzica pentru viata.svg"
          alt="Muzică pentru Viață"
          className="logo-main-top"
        />
      </header>

      {/* Desktop Navigation */}
      <nav className="site-nav desktop-nav" aria-label="Navigație principală">
        <div className="site-nav-inner">
          <div className="site-nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Donează
            </NavLink>

            <NavLink
              to="/live"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Live & Video
            </NavLink>

            <NavLink
              to="/galerie"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Galerie
            </NavLink>

            <NavLink
              to="/despre-oncohelp"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Despre OncoHelp
            </NavLink>

            <NavLink
              to="/despre-resita"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Despre Reșița
            </NavLink>

            <NavLink
              to="/multumiri"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Peretele Eroilor
            </NavLink>

            <NavLink
              to="/sponsori"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Sponsori
            </NavLink>
          </div>

          <a
            className="btn-primary nav-donate"
            href="https://oncohelp.ro/donatii/"
            target="_blank"
            rel="noopener noreferrer"
          >
            DONEAZĂ ACUM
          </a>
        </div>
      </nav>

      <div className="page-wrapper">
        <main className="page">
          <section className="terms-section">
            <div className="terms-container">
              <h1>Termeni și condiții</h1>

              <p>
                Utilizarea acestui site de către dumneavoastră este condiționată de respectarea termenilor și condițiilor generale de mai jos. Dacă alegeți să vizitați site-ul și să accesați secțiunea ,,Donează'' pusă la dispoziție prin intermediul site-ului, vă asumați cunoașterea și acceptarea în totalitate a acestor termeni și condiții.
              </p>

              <h2>Despre Muzică pentru Viață</h2>

              <p>
                Website-ul <a href="https://muzicapentruviata.ro">www.muzicapentruviata.ro</a> este un proiect caritabil organizat de Radio România Reșița în parteneriat cu Asociația OncoHelp Timișoara, cu sediul în Timișoara, Str. Ciprian Porumbescu, Nr. 57-59, înființată prin Încheierea civilă nr. 306/27.05.2005, având CIF: 17802939.
              </p>

              <p>
                Muzică pentru Viață este o campanie anuală care are ca scop strângerea de fonduri pentru construcția primului spital oncologic din Reșița, Banat. Toate donațiile colectate prin intermediul acestui site sunt direcționate către Asociația OncoHelp Timișoara, care este înregistrată în Registrul entităților pentru care se acordă deduceri fiscale în baza Deciziei ANAF nr. 1/05.04.2019.
              </p>

              <h2>Definiții</h2>

              <p>În cuprinsul acestor termeni și condiții, următorii termeni se traduc astfel:</p>

              <ul>
                <li><strong>site</strong>: portalul aparținând campaniei Muzică pentru Viață, care se află la adresa <a href="https://muzicapentruviata.ro">www.muzicapentruviata.ro</a> prin intermediul căruia utilizatorul are acces la informații privind campania și poate face donații online.</li>
                <li><strong>conținutul site-ului</strong>: orice material, orice informație, publicate pe site sub orice formă – text, fotografii, etc.</li>
                <li><strong>utilizator</strong>: persoana care accesează site-ul și care a acceptat termenii și condițiile de utilizare ale prezentului site.</li>
                <li><strong>utilizare abuzivă</strong>: utilizarea site-ului într-un mod contrar practicii în domeniu, a reglementărilor și legislației în vigoare sau în orice alt mod care poate aduce prejudicii campaniei Muzică pentru Viață.</li>
              </ul>

              <h2>Drepturi și responsabilități</h2>

              <p>
                Organizatorii campaniei Muzică pentru Viață își rezervă dreptul de a remedia în orice modalitate permisă de lege orice violare a acestor termeni și condiții, precum și de a modifica în orice moment conținutul site-ului, inclusiv termenii și condițiile de utilizare ale acestuia. Folosirea în continuare a site-ului înseamnă acceptarea noilor termeni și condiții.
              </p>

              <p>
                Organizatorii campaniei Muzică pentru Viață nu răspund pentru consecințele, de orice natură, ce decurg din utilizarea site-ului, inclusiv folosirea necorespunzătoare, improprie sau frauduloasă a acestuia.
              </p>

              <p>
                Organizatorii campaniei Muzică pentru Viață nu garantează și nu își asumă responsabilitatea pentru orice contaminare cu viruși sau orice altă contaminare care are proprietăți distructive. Organizatorii nu garantează pentru vreo necontaminare în acest sens.
              </p>

              <h2>Donații</h2>

              <p>
                Prin intermediul site-ului campaniei Muzică pentru Viață se pot face donații online. Donatorul are posibilitatea să selecteze suma pe care dorește să o doneze. Suma donată se retrage de pe cardul bancar indicat de utilizator.
              </p>

              <p>
                Toate donațiile sunt procesate prin intermediul platformei securizate EuPlătesc.ro și sunt direcționate integral către Asociația OncoHelp Timișoara pentru construcția spitalului oncologic din Reșița.
              </p>

              <p>
                Donatorul este responsabil pentru asigurarea că are fondurile necesare și că cardul bancar folosit este valabil și autorizat pentru tranzacții online.
              </p>

              <h2>Reclamații</h2>

              <p>
                Orice nemulțumire legată de accesarea, utilizarea, înregistrarea pe site-ul nostru, sau donația efectuată ne va fi comunicată direct, prin email la adresa <a href="mailto:contact@radioromania.ro">contact@radioromania.ro</a>.
              </p>

              <p>
                Nemulțumirea dvs. va fi înregistrată și veți primi un răspuns în scris, pe adresa de email menționată cu ocazia aducerii la cunoștința noastră a nemulțumirii dvs., în termen de cel mult 72 ore, raportate la o zi lucrătoare.
              </p>

              <p>
                Utilizatorul declară că este de acord să nu facă publice aceste nemulțumiri (pe rețelele de socializare, media, sau în orice altă modalitate) sub rezerva suportării daunelor cauzate pentru prejudiciul de imagine adus campaniei Muzică pentru Viață prin aceste acțiuni.
              </p>

              <p>
                Orice reclamație se depune în termen de maxim o lună de la data sesizării situației reclamate.
              </p>

              <h2>Prelucrarea datelor cu caracter personal</h2>

              <p>
                Pentru detalii referitoare la prelucrarea datelor cu caracter personal, identitatea operatorului și alte asemenea, consultați secțiunea „Politica de confidențialitate și protecție a datelor” de pe site-ul nostru.
              </p>

              <h2>Modificări și întreruperi</h2>

              <p>
                Organizatorii campaniei Muzică pentru Viață își rezervă dreptul de a modifica structura și interfața oricărei pagini sau subpagini a site-ului în orice moment și la orice interval de timp liber ales, având dreptul de a întrerupe temporar, parțial sau în totalitate funcționalitatea acestui site fără vreo notificare prealabilă individuală sau generală.
              </p>

              <h2>Legislație aplicabilă</h2>

              <p>
                Prezenții Termeni și condiții se completează cu aspecte/prevederi speciale cuprinse la descrierea evenimentelor disponibile pe site și sunt guvernate de legea română. Orice litigii decurgând din utilizarea site-ului sau în legătură cu acesta vor fi supuse în primă fază unei proceduri prealabile de soluționare pe cale amiabilă, iar în caz de eșec vor fi investite instanțele judecătorești de pe raza municipiului Timișoara.
              </p>

              <h2>Contact</h2>

              <p>
                Pentru orice întrebări sau informații suplimentare, vă rugăm să ne contactați la:
              </p>

              <ul>
                <li>Email: <a href="mailto:contact@radioromania.ro">contact@radioromania.ro</a></li>
                <li>Telefon: 0255 210 100</li>
                <li>Adresă: Str. Ciprian Porumbescu, Nr. 57-59, Timișoara</li>
              </ul>

              <p>
                Vă mulțumim că susțineți campania Muzică pentru Viață și construcția primului spital oncologic din Reșița!
              </p>
            </div>
          </section>
        </main>
      </div>

      {/* Footer with legal links */}
      <footer className="app-footer" style={{marginTop: '40px'}}>
        <div className="app-footer-inner">
          <section className="footer-legal">
            <div className="footer-legal-links">
              <NavLink to="/termeni-si-conditii" className="footer-legal-link">
                Termeni și condiții
              </NavLink>
              <span className="footer-legal-separator">|</span>
              <NavLink to="/politica-de-confidentialitate" className="footer-legal-link">
                Politica de confidențialitate
              </NavLink>
            </div>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Muzică pentru Viață. Toate drepturile rezervate.
            </p>
          </section>
        </div>
      </footer>
    </>
  );
}