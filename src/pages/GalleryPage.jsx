import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const timelineEvents = [
  {
    year: '2015',
    title: 'Începuturi',
    description:
      'Radio România Reșița dă startul unei campanii care avea, prin gesturi mici, să schimbe o comunitate întreagă. Muzică Pentru Viață ia naștere între 2015 și 2016. În scurt timp, primul strop de speranță își face loc în inimile oamenilor din Banat.',
    image: '/Logo Radio Romania Resita.svg',
    alt: 'Sigla Radio România Reșița, începutul poveștii pentru comunitate',
    position: 'left',
  },
  {
    year: '2016',
    title: 'Sprijin',
    description:
      'Campania prinde rădăcini puternice și sprijină centrul oncologic de la Slatina Nera. Muzică pentru viață devine un concept îndrăgit și așteptat cu nerăbdare în fiecare an.',
    image: '/Logo Muzica pentru viata.svg',
    alt: 'Sigla campaniei Muzică pentru Viață în anii de început',
    position: 'right',
  },
  {
    year: '2017',
    title: 'Dăruință',
    description:
      'Muzică Pentru Viață oferă ajutor centrului Cristian Șerban. Un centru de evaluare și recuperare pentru copii și tineri cu diabet și hemofilie situat în Buziaș.',
    image: '/Logo Muzica pentru viata.svg',
    alt: 'Sigla campaniei Muzică pentru Viață, simbol al dăruinței pentru copii și tineri',
    position: 'left',
  },
  {
    year: '2018',
    title: 'Speranță',
    description:
      'În acest an, Muzică Pentru Viață a adus speranţă pentru copii cu nevoi speciale de la Centrul Primăvara. Căsuța de sticlă a devenit locul unde visele chiar se împlinesc.',
    image: '/16.jpg',
    alt: 'Imagine caldă de la un eveniment Muzică pentru Viață, simbol al speranței pentru copii',
    position: 'right',
  },
  {
    year: '2019',
    title: 'Lupta continuă',
    description:
      'Implicări active în sprijinirea pacienților bolnavi de cancer prin colaborări cu OncoHelp, clinici de tratament și diverse instituții. Povestea merge mai departe și prinde un nou sens. Alături de Asociația OncoHelp, ne unim forțele pentru un scop comun: să oferim o șansă reală pacienților care luptă cu cancerul.',
    image: '/onco-help-logo-d.png',
    alt: 'Logo-ul Fundației OncoHelp, simbol al luptei continue împotriva cancerului',
    position: 'left',
  },
  {
    year: '2020',
    title: 'Un an greu, dar fără pauză pentru bine',
    description:
      'Chiar și într-un context dificil, dorința de a ajuta rămâne. Campania se adaptează, mesajele ajung mai mult online, iar oamenii continuă să doneze pentru pacienții vulnerabili.',
    image: '/16.jpg',
    alt: 'Lumini calde și atmosferă de seară la un eveniment caritabil în Reșița',
    position: 'right',
  },
  {
    year: '2021',
    title: 'Prima ediție „Muzică pentru Viață”',
    description:
      'Începe oficial povestea căsuței de sticlă la Reșița. O mână de oameni, un microfon și un vis: ca muzica să poată construi, la propriu, speranță pentru pacienții cu cancer.',
    image: '/tmk-resita-4-1200x675.jpg',
    alt: 'Reșița văzută de sus, oraș pregătit pentru un nou început caritabil',
    position: 'left',
  },
  {
    year: '2022',
    title: 'Comunitatea prinde curaj',
    description:
      'Tot mai mulți oameni se opresc în fața căsuței de sticlă. Donațiile cresc, iar campania începe să devină un reper anual pentru Reșița.',
    image: '/resita.jpg',
    alt: 'Panoramă cu Reșița, luminile orașului și oamenii în mișcare',
    position: 'right',
  },
  {
    year: '2023',
    title: 'Muzica se aude tot mai departe',
    description:
      'Voluntari, artiști, ascultători – toți în aceeași frecvență. Mesajul „Muzică pentru Viață” trece de granițele orașului și adună susținători din tot Banatul de Munte.',
    image: '/resita populatie.jpg',
    alt: 'Oamenii din Reșița surprinși într-o zi obișnuită, fiecare cu propria poveste',
    position: 'left',
  },
  {
    year: '2024',
    title: 'Planuri clare pentru spitalul oncologic',
    description:
      'Nu mai vorbim doar despre un vis. Se conturează planuri, proiecte, parteneriate. Fiecare donație înseamnă mai mult decât o sumă – e o cărămidă în viitorul pacienților.',
    image: '/ubb-resita.jpg',
    alt: 'Clădire reprezentativă din Reșița, simbol al unei comunități unite',
    position: 'right',
  },
  {
    year: '2025',
    title: 'Muzică pentru Viață – ediția în care totul se leagă',
    description:
      'Anul în care Reșița își asumă pe deplin rolul de oraș care dăruiește. Muzica se aude mai puternic ca niciodată, iar fiecare gest de generozitate apropie spitalul oncologic de realitate.',
    image: '/WhatsApp Image 2025-12-02 at 16.19.50.jpeg',
    alt: 'Oameni adunați în jurul căsuței de sticlă, lumină caldă și emoție în aer',
    position: 'left',
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