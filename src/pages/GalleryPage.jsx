import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const timelineEvents = [
  {
    year: '2015',
    title: 'Începuturi',
    description:
      'Radio România Reșița dă startul unei campanii care avea, prin gesturi mici, să schimbe o comunitate întreagă. Muzică Pentru Viață ia naștere între 2015 și 2016. În scurt timp, primul strop de speranță își face loc în inimile oamenilor din Banat.',
    image: '/2015.jpg',
    alt: 'Imagine din anul 2015 pentru campania Muzică Pentru Viață',
    position: 'left',
  },
  {
    year: '2016',
    title: 'Sprijin',
    description:
      'Campania prinde rădăcini puternice și sprijină centrul oncologic de la Slatina Nera. Muzică pentru viață devine un concept îndrăgit și așteptat cu nerăbdare în fiecare an.',
    image: '/2016.jpg',
    alt: 'Imagine din anul 2016 pentru campania Muzică Pentru Viață',
    position: 'right',
  },
  {
    year: '2017',
    title: 'Dăruință',
    description:
      'Muzică Pentru Viață oferă ajutor centrului Cristian Șerban. Un centru de evaluare și recuperare pentru copii și tineri cu diabet și hemofilie situat în Buziaș.',
    image: '/2017.jpg',
    alt: 'Imagine din anul 2017 pentru campania Muzică Pentru Viață',
    position: 'left',
  },
  {
    year: '2018',
    title: 'Speranță',
    description:
      'În acest an, Muzică Pentru Viață a adus speranţă pentru copii cu nevoi speciale de la Centrul Primăvara. Căsuța de sticlă a devenit locul unde visele chiar se împlinesc.',
    image: '/2018.jpg',
    alt: 'Imagine din anul 2018 pentru campania Muzică Pentru Viață',
    position: 'right',
  },
  {
    year: '2019',
    title: 'Lupta continuă',
    description:
      'Implicări active în sprijinerea pacienților bolnavi de cancer prin colaborări cu OncoHelp, clinici de tratament și diverse instituții. Povestea merge mai departe și prinde un nou sens. Alături de Asociația OncoHelp, ne unim forțele pentru un scop comun: să oferim o șansă reală pacienților care luptă cu cancerul.',
    image: '/2019.jpg',
    alt: 'Imagine din anul 2019 pentru campania Muzică Pentru Viață',
    position: 'left',
  },
  {
    year: '2020',
    title: 'Mobilizarea Comunității',
    description:
      'Muzică Pentru Viață a devenit o tradiție urbană. Glasul, dăruința și implicările comunității au evoluat și au răspândit ușor conceptul nostru în întreaga Românie.',
    image: '/2020.jpg',
    alt: 'Imagine din anul 2020 pentru campania Muzică Pentru Viață',
    position: 'right',
  },
  {
    year: '2021',
    title: 'Misiunea merge mai departe',
    description:
      'Muzică Pentru Viață sprijină Asociaţia Patricia Popa, care de mai bine de 20 de ani ajută Spitalul Louis Ţurcanu din Timişoara cu medicamente, aparatură şi materiale sanitare.',
    image: '/2021.jpg',
    alt: 'Imagine din anul 2021 pentru campania Muzică Pentru Viață',
    position: 'left',
  },
  {
    year: '2022',
    title: 'Alianțe',
    description:
      'Atât pe plan local, cât și național, campania începe să rezoneze tot mai mult cu inimile oamenilor, dar și ale instituțiilor. Apar parteneri dornici să se alăture nobilei cauze.',
    image: '/2022.jpg',
    alt: 'Imagine din anul 2022 pentru campania Muzică Pentru Viață',
    position: 'right',
  },
  {
    year: '2023',
    title: 'Împreună chiar se poate',
    description:
      'Căsuța de sticlă strânge 35.000 EUR – o contribuție semnificativă pentru începerea proiectului OncoHelp la Reșița.',
    image: '/2023.jpg',
    alt: 'Imagine din anul 2023 pentru campania Muzică Pentru Viață',
    position: 'left',
  },
  {
    year: '2024',
    title: 'Cine salvează o viață, salvează lumea',
    description:
      'Ca în fiecare an, mesajul continuă, iar căsuța de sticlă construiește pas cu pas drumul spre a le oferi pacienților bolnavi de cancer o șansă la tratament chiar la ei acasă.',
    image: '/2024.jpg',
    alt: 'Imagine din anul 2024 pentru campania Muzică Pentru Viață',
    position: 'right',
  },
  {
    year: '2025',
    title: 'Un vis devenit realitate!',
    description:
      'Întreaga lume se alătură campaniei Muzică Pentru Viață, iar visul unui spital oncologic la Reșița devine, pas cu pas, realitate.',
    image: '/2025.png',
    alt: 'Imagine din anul 2025 pentru campania Muzică Pentru Viață',
    position: 'left',
  },
];

function TimelineItem({ event, onImageClick }) {
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
            <img src={event.image} alt={event.alt} loading="lazy" onClick={() => onImageClick(event.image)} style={{ cursor: 'pointer' }} />
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
  const [selectedImage, setSelectedImage] = useState(null);
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
              <TimelineItem key={event.year} event={event} onImageClick={setSelectedImage} />
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full size" />
        </div>
      )}
    </div>
  );
}