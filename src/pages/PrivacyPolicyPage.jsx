import React from 'react';
import { NavLink } from 'react-router-dom';

export default function PrivacyPolicyPage() {
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
          <section className="privacy-section">
            <div className="privacy-container">
              <h1>Politica de confidențialitate și protecție a datelor</h1>

              <h2>NOTĂ DE INFORMARE privind prelucrarea datelor cu caracter personal</h2>

              <p>
                Campania Muzică pentru Viață, organizată de Radio România Reșița în parteneriat cu Asociația OncoHelp Timișoara, respectă confidențialitatea și protecția datelor cu caracter personal ale vizitatorilor și donatorilor.
              </p>

              <h3>Identitatea și datele de contact ale operatorului</h3>

              <p>
                Campania Muzică pentru Viață este organizată de Radio România Reșița în parteneriat cu Asociația OncoHelp Timișoara – Centrul de Oncologie Oncohelp, cu sediul în Timișoara, Str. Ciprian Porumbescu, Nr. 59, înființată prin Încheierea civilă nr. 306/27.05.2005, având CIF: 17802939, tel: 0356/460995, fax: 0356/460996, reprezentată legal de către domnul manager Borugă Valeriu Ioan.
              </p>

              <p>
                Datele de contact ale responsabilului cu protecția datelor: e-mail: dpo@oncohelp.ro, tel: 0744581764.
              </p>

              <h3>Scopul și baza legală a prelucrărilor</h3>

              <p>
                Scopul colectării și utilizării datelor personale în cadrul campaniei Muzică pentru Viață se circumscrie asigurării procesului de donații și comunicării cu donatorii. Datele cu caracter personal vor fi colectate și utilizate doar în scopul și în legătură cu procesarea donațiilor și comunicarea informațiilor despre campanie.
              </p>

              <p>
                Campania Muzică pentru Viață prelucrează datele cu caracter personal în vederea furnizării informațiilor despre campanie și procesarea donațiilor.
              </p>

              <h3>Tipuri de date cu caracter personal pe care le prelucrăm</h3>

              <p>
                În cadrul campaniei Muzică pentru Viață, colectăm numai datele personale necesare pentru procesarea donațiilor și comunicare. Acestea pot include:
              </p>

              <ul>
                <li>Numele și prenumele (opțional pentru donații)</li>
                <li>Adresa de email (opțională pentru donații)</li>
                <li>Datele de contact pentru comunicare</li>
                <li>Informații despre donație (sumă, dată, etc.)</li>
              </ul>

              <h3>Stocarea datelor cu caracter personal</h3>

              <p>
                Stocarea datelor cu caracter personal se efectuează în condiții de securitate. Datele sunt protejate împotriva accesului neautorizat, modificării, dezvăluirii sau distrugerii.
              </p>

              <h3>Destinația sau categoriile de destinatari ai datelor cu caracter personal</h3>

              <p>
                Datele cu caracter personal sunt colectate și prelucrate de către organizatorii campaniei Muzică pentru Viață. Aceste date nu sunt partajate cu terțe părți fără consimțământul explicit al persoanei vizate, cu excepția cazurilor prevăzute de lege.
              </p>

              <h3>Drepturile persoanelor vizate cu privire la prelucrarea datelor cu caracter personal</h3>

              <p>
                În calitate de persoană vizată, aveți următoarele drepturi:
              </p>

              <ol>
                <li>Dreptul la informare și acces la datele dumneavoastră cu caracter personal;</li>
                <li>Dreptul de a obține, la cerere și în mod gratuit, confirmarea faptului că datele dumneavoastră sunt prelucrate;</li>
                <li>Dreptul la rectificare – aveți dreptul de a corecta datele pe care le deținem în legătură cu dumneavoastră, care sunt inexacte sau incomplete;</li>
                <li>Dreptul de a fi uitat (ștergerea datelor);</li>
                <li>Dreptul la restricționarea prelucrării – în anumite condiții, aveți dreptul de a restrânge prelucrarea datelor dumneavoastră personale;</li>
                <li>Dreptul la portabilitatea datelor;</li>
                <li>Dreptul de a vă opune în orice moment;</li>
                <li>Dreptul de a formula obiecții;</li>
                <li>Dreptul de a adresa o plângere legată de procesarea datelor cu caracter personal;</li>
                <li>Dreptul de a înainta plângere către autoritatea de supraveghere în situația în care considerați că datele dumneavoastră nu au fost prelucrate conform legii;</li>
                <li>Dreptul de a vă adresa justiției în situația în care ați suferit un prejudiciu în urma prelucrării datelor cu caracter personal.</li>
              </ol>

              <h3>Responsabilitate</h3>

              <p>
                Furnizarea datelor cu caracter personal în cadrul campaniei Muzică pentru Viață este voluntară. Datele colectate sunt utilizate exclusiv în scopul procesării donațiilor și comunicării cu donatorii.
              </p>

              <h3>Securitate</h3>

              <p>
                Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele dumneavoastră cu caracter personal împotriva accesului neautorizat, modificării, dezvăluirii sau distrugerii. Toate tranzacțiile de donații sunt procesate prin intermediul platformei securizate EuPlătesc.ro.
              </p>

              <h3>Contact</h3>

              <p>
                Pentru orice întrebări sau informații suplimentare privind protecția datelor cu caracter personal, vă rugăm să ne contactați la:
              </p>

              <ul>
                <li>Email: <a href="mailto:contact@radioromania.ro">contact@radioromania.ro</a></li>
                <li>Telefon: 0255 210 100</li>
                <li>Adresă: Str. Ciprian Porumbescu, Nr. 59, Timișoara</li>
              </ul>

              <p>
                Pentru exercitarea drepturilor dumneavoastră privind protecția datelor, vă puteți adresa responsabilului cu protecția datelor la adresa de email: <a href="mailto:dpo@oncohelp.ro">dpo@oncohelp.ro</a> sau la următoarea adresă de corespondență: str. Ciprian Porumbescu nr. 59, Localitatea Timișoara, Județul Timiș.
              </p>

              <p>
                Alte informații se pot găsi la adresa: <a href="https://www.dataprotection.ro/" target="_blank" rel="noopener noreferrer">https://www.dataprotection.ro/</a>
              </p>

              <p>
                Vă mulțumim că susțineți campania Muzică pentru Viață și construcția primului spital oncologic din Reșița!
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}