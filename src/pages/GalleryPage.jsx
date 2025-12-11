import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const timelineEvents = [
  {
    year: '2015-2016',
    title: 'Primele ore de emisie dedicate comunității',
    description:
      'În anii 2015–2016, la Radio România Reșița apar primele ore de emisie dedicate strângerii de fonduri și proiectelor sociale. Încă nu se numește „Muzică pentru Viață”, dar se pune prima cărămidă a spiritului de solidaritate.',
    image: '/Logo Radio Romania Resita.svg',
    alt: 'Sigla Radio România Reșița, începutul poveștii pentru comunitate',
    position: 'left',
  },
  {
    year: '2017',
    title: 'Se naște ideea unei campanii anuale',
    description:
      'Echipa de la radio și partenerii locali încep să contureze o campanie recurentă, care să lege muzica de fapte bune. Se caută cauza potrivită și modul în care orașul poate ajuta, an de an.',
    image: '/Logo Muzica pentru viata.svg',
    alt: 'Sigla campaniei Muzică pentru Viață, simbolul unei promisiuni făcute orașului',
    position: 'right',
  },
  {
    year: '2018',
    title: 'Întâlnirea cu Fundația OncoHelp',
    description:
      'Povestea se leagă de pacienții oncologici. Împreună cu Fundația OncoHelp, se desenează un drum pe termen lung: muzica de la Reșița va aduce speranță pentru cei care se luptă cu cancerul.',
    image: '/onco-help-logo-d.png',
    alt: 'Logo-ul Fundației OncoHelp, partenerul medical al campaniei',
    position: 'left',
  },
  {
    year: '2019',
    image: '/dacus_logo_site.png',
    alt: 'Logo de sponsor local, semn că mediul de afaceri se implică în Muzică pentru Viață',
    position: 'right',
    hideContent: true,
  },
  {
    year: '2020',
    title: 'Un an greu, dar fără pauză pentru bine',
    description:
      'Chiar și într-un context dificil, dorința de a ajuta rămâne. Campania se adaptează, mesajele ajung mai mult online, iar oamenii continuă să doneze pentru pacienții vulnerabili.',
    image: '/16.jpg',
    alt: 'Lumini calde și atmosferă de seară la un eveniment caritabil în Reșița',
    position: 'left',
  },
  {
    year: '2021',
    title: 'Prima ediție „Muzică pentru Viață”',
    description:
      'Începe oficial povestea căsuței de sticlă la Reșița. O mână de oameni, un microfon și un vis: ca muzica să poată construi, la propriu, speranță pentru pacienții cu cancer.',
    image: '/tmk-resita-4-1200x675.jpg',
    alt: 'Reșița văzută de sus, oraș pregătit pentru un nou început caritabil',
    position: 'right',
  },
  {
    year: '2022',
    title: 'Comunitatea prinde curaj',
    description:
      'Tot mai mulți oameni se opresc în fața căsuței de sticlă. Donațiile cresc, iar campania începe să devină un reper anual pentru Reșița.',
    image: '/resita.jpg',
    alt: 'Panoramă cu Reșița, luminile orașului și oamenii în mișcare',
    position: 'left',
  },
  {
    year: '2023',
    title: 'Muzica se aude tot mai departe',
    description:
      'Voluntari, artiști, ascultători – toți în aceeași frecvență. Mesajul „Muzică pentru Viață” trece de granițele orașului și adună susținători din tot Banatul de Munte.',
    image: '/resita populatie.jpg',
    alt: 'Oamenii din Reșița surprinși într-o zi obișnuită, fiecare cu propria poveste',
    position: 'right',
  },
  {
    year: '2024',
    title: 'Planuri clare pentru spitalul oncologic',
    description:
      'Nu mai vorbim doar despre un vis. Se conturează planuri, proiecte, parteneriate. Fiecare donație înseamnă mai mult decât o sumă – e o cărămidă în viitorul pacienților.',
    image: '/ubb-resita.jpg',
    alt: 'Clădire reprezentativă din Reșița, simbol al unei comunități unite',
    position: 'left',
  },
  {
    year: '2025',
    title: 'Muzică pentru Viață – ediția în care totul se leagă',
    description:
      'Anul în care Reșița își asumă pe deplin rolul de oraș care dăruiește. Muzica se aude mai puternic ca niciodată, iar fiecare gest de generozitate apropie spitalul oncologic de realitate.',
    image: '/WhatsApp Image 2025-12-02 at 16.19.50.jpeg',
    alt: 'Oameni adunați în jurul căsuței de sticlă, lumină caldă și emoție în aer',
    position: 'right',
  },
];

function TimelineItem({ event }) {
  const [ref, isVisible] = useScrollAnimation(0.2, '0px 0px -60px 0px');
  const isLeft = event.position === 'left';
  const hideDetails = event.hideContent;

  const wrapperClasses = [
    'timeline-item-inner',
    'animate-on-scroll',
    isLeft ? 'animate-slide-left' : 'animate-slide-right',
    isVisible ? 'animate-fade-in' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={`timeline-item timeline-item--${isLeft ? 'left' : 'right'}`}>
      <div className="timeline-item-marker" aria-hidden="true" />
      <div ref={ref} className={wrapperClasses}>
        {event.image && (
          <figure className="timeline-item-media">
            <img src={event.image} alt={event.alt} loading="lazy" />
          </figure>
        )}
        <div className="timeline-item-content">
          <p className="timeline-item-year">{event.year}</p>
          {!hideDetails && (
            <>
              <h2 className="timeline-item-title">{event.title}</h2>
              <p className="timeline-item-text">{event.description}</p>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default function TimelinePage() {
  const [lineRef, lineVisible] = useScrollAnimation(0.1, '-10% 0px -40% 0px');

  const lineClasses = [
    'timeline-line',
    lineVisible ? 'timeline-line--visible' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="app-content">
      <section className="app-section timeline-section" aria-labelledby="timeline-title">
        <div className="app-section-header">
          <span className="app-section-overline">Cronolgia Campaniei</span>
          <h1 id="timeline-title" className="app-section-title">
            Muzică pentru viață, pentru oameni, pentru un spital oncologic la Reșița.
          </h1>
          <p className="app-section-lead">
            O comunitate, o țară, iar acum… o lume întreagă.
          </p>
          <p className="app-section-lead">
            Efortul colectiv este dovada că se poate, mai ales atunci când se dorește. Muzică Pentru
            Viață împlinește zece ani. Zece ani de unitate si luptă, zece ani în care oamenii se
            alătură, dăruiesc și susțin cu stoicism o cauză nobilă: construirea primului spital
            oncologic la Reșița.
          </p>
          <p className="app-section-lead">
            Acum suntem tot mai aproape, iar spitalul are deja o clădire.
          </p>
        </div>

        <div className="timeline-container">
          <div ref={lineRef} className={lineClasses} aria-hidden="true" />

          <div className="timeline-items">
            {timelineEvents.map((event) => (
              <TimelineItem key={event.year} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}