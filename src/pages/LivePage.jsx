import React from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function LivePage() {
  const { lang } = useI18n();

  const copy = React.useMemo(
    () =>
      ({
        ro: {
          overline: 'LIVE: Muzică Pentru Viață',
          title: 'Emoție direct din căsuța de sticlă.',
          lead: 'Totul începe într-o căsuță de sticlă, iar Reșița se alătură cauzei care schimbă o lume. Haideți la muzică, pentru viață!',
          badge: 'Live în curând',
          placeholder: 'Transmisiunea live va începe din 14 Decembrie!',
          note:
            'În timpul evenimentului, aici vei putea vedea artiștii, voluntarii și oamenii care aleg să fie parte din poveste. Fiecare minut de live este o invitație la încă o donație.',
          description:
            'Muzica nu este doar pentru suflet, ci și pentru viață. Aici, la căsuța de sticlă, fiecare melodie ne aduce mai aproape de misiunea noastră: construirea primului spital oncologic la Reșița!',
          radioTitle: 'RADIO REȘIȚA',
          radioText:
            'Conectează-te la vocea Reșiței și rămâi la curent cu știri, muzică și evenimente locale.',
          radioButton: 'ASCULTĂ ACUM!',
          videoAria: 'Transmisiune live Muzică pentru Viață',
        },
        en: {
          overline: 'LIVE: Muzică Pentru Viață',
          title: 'Emotion, live from the glass booth.',
          lead:
            'Everything starts in a glass booth, and Reșița joins a cause that changes lives. Come for the music, stay for life!',
          badge: 'Live soon',
          placeholder: 'The live stream starts on December 14!',
          note:
            'During the event, you’ll be able to see the artists, volunteers and people who choose to be part of the story. Every minute live is an invitation for one more donation.',
          description:
            'Music is not only for the soul—it’s for life. Here, in the glass booth, every song brings us closer to our mission: building the first oncology hospital in Reșița!',
          radioTitle: 'RADIO REȘIȚA',
          radioText: 'Connect to Reșița’s voice and stay up to date with news, music and local events.',
          radioButton: 'LISTEN NOW!',
          videoAria: 'Muzică pentru Viață live stream',
        },
        de: {
          overline: 'LIVE: Muzică Pentru Viață',
          title: 'Emotionen live aus der Glasbox.',
          lead:
            'Alles beginnt in einer Glasbox, und Reșița unterstützt eine Sache, die Leben verändert. Kommt zur Musik – für das Leben!',
          badge: 'Live in Kürze',
          placeholder: 'Der Livestream startet am 14. Dezember!',
          note:
            'Während der Veranstaltung kannst du hier Künstler, Freiwillige und Menschen sehen, die Teil dieser Geschichte sein wollen. Jede Live-Minute ist eine Einladung zu einer weiteren Spende.',
          description:
            'Musik ist nicht nur für die Seele, sondern auch fürs Leben. Hier, in der Glasbox, bringt uns jedes Lied unserer Mission näher: dem Bau des ersten Onkologie-Krankenhauses in Reșița!',
          radioTitle: 'RADIO REȘIȚA',
          radioText: 'Verbinde dich mit der Stimme von Reșița und bleibe über Nachrichten, Musik und lokale Events informiert.',
          radioButton: 'JETZT HÖREN!',
          videoAria: 'Muzică pentru Viață Livestream',
        },
        fr: {
          overline: 'LIVE : Muzică Pentru Viață',
          title: 'L’émotion en direct depuis la cabine de verre.',
          lead:
            'Tout commence dans une cabine de verre, et Reșița rejoint une cause qui change des vies. Venez pour la musique, pour la vie !',
          badge: 'Live bientôt',
          placeholder: 'Le direct commence le 14 décembre !',
          note:
            'Pendant l’événement, vous pourrez voir ici les artistes, les bénévoles et toutes celles et ceux qui choisissent d’en faire partie. Chaque minute en direct est une invitation à un don supplémentaire.',
          description:
            'La musique n’est pas seulement pour l’âme, elle est aussi pour la vie. Ici, dans la cabine de verre, chaque chanson nous rapproche de notre mission : construire le premier hôpital d’oncologie à Reșița !',
          radioTitle: 'RADIO REȘIȚA',
          radioText: 'Connectez-vous à la voix de Reșița et restez informé des actualités, de la musique et des événements locaux.',
          radioButton: 'ÉCOUTER !',
          videoAria: 'Diffusion en direct Muzică pentru Viață',
        },
        it: {
          overline: 'LIVE: Muzică Pentru Viață',
          title: 'Emozioni in diretta dalla “casa di vetro”.',
          lead:
            'Tutto inizia in una casa di vetro, e Reșița si unisce a una causa che cambia vite. Vieni per la musica, per la vita!',
          badge: 'Live a breve',
          placeholder: 'La diretta inizierà il 14 dicembre!',
          note:
            'Durante l’evento, qui potrai vedere artisti, volontari e persone che scelgono di far parte della storia. Ogni minuto in diretta è un invito a un’altra donazione.',
          description:
            'La musica non è solo per l’anima, è anche per la vita. Qui, nella casa di vetro, ogni canzone ci avvicina alla nostra missione: costruire il primo ospedale oncologico a Reșița!',
          radioTitle: 'RADIO REȘIȚA',
          radioText: 'Collegati alla voce di Reșița e resta aggiornato su notizie, musica ed eventi locali.',
          radioButton: 'ASCOLTA ORA!',
          videoAria: 'Diretta Muzică pentru Viață',
        },
        es: {
          overline: 'EN VIVO: Muzică Pentru Viață',
          title: 'Emoción en directo desde la cabina de cristal.',
          lead:
            'Todo empieza en una cabina de cristal, y Reșița se une a una causa que cambia vidas. ¡Ven por la música, por la vida!',
          badge: 'En vivo pronto',
          placeholder: '¡La transmisión en vivo comienza el 14 de diciembre!',
          note:
            'Durante el evento, aquí podrás ver a los artistas, voluntarios y a las personas que eligen ser parte de la historia. Cada minuto en vivo es una invitación a una donación más.',
          description:
            'La música no es solo para el alma, también es para la vida. Aquí, en la cabina de cristal, cada canción nos acerca a nuestra misión: construir el primer hospital oncológico en Reșița.',
          radioTitle: 'RADIO REȘIȚA',
          radioText: 'Conéctate a la voz de Reșița y mantente al día con noticias, música y eventos locales.',
          radioButton: '¡ESCUCHA AHORA!',
          videoAria: 'Transmisión en vivo Muzică pentru Viață',
        },
        ar: {
          overline: 'مباشر: Muzică Pentru Viață',
          title: 'مشاعر مباشرة من “الكابينة الزجاجية”.',
          lead:
            'كل شيء يبدأ داخل كابينة زجاجية، وريشيتسا تنضم إلى قضية تُغيّر حياة الناس. تعالوا للموسيقى… من أجل الحياة!',
          badge: 'قريبًا بث مباشر',
          placeholder: 'سيبدأ البث المباشر في 14 ديسمبر!',
          note:
            'خلال الحدث ستتمكن هنا من رؤية الفنانين والمتطوعين وكل من اختار أن يكون جزءًا من القصة. كل دقيقة بث مباشر هي دعوة لتبرع جديد.',
          description:
            'الموسيقى ليست للروح فقط، بل للحياة أيضًا. هنا، في الكابينة الزجاجية، كل أغنية تقرّبنا من رسالتنا: بناء أول مستشفى للأورام في ريشيتسا!',
          radioTitle: 'راديو ريشيتسا',
          radioText: 'استمع إلى صوت ريشيتسا وابقَ على اطلاع بالأخبار والموسيقى والفعاليات المحلية.',
          radioButton: 'استمع الآن!',
          videoAria: 'بث مباشر Muzică pentru Viață',
        },
      }[lang] || {
        overline: 'LIVE: Muzică Pentru Viață',
        title: 'Emoție direct din căsuța de sticlă.',
        lead: '',
        badge: 'Live',
        placeholder: '',
        note: '',
        description: '',
        radioTitle: 'RADIO REȘIȚA',
        radioText: '',
        radioButton: '',
        videoAria: '',
      }),
    [lang]
  );

  return (
    <div className="app-content">
      <section className="app-section live-section" aria-labelledby="live-title">
        <div className="app-section-header">
          <span className="app-section-overline" style={{ color: '#d81b60', fontWeight: '600' }}>
            {copy.overline}
          </span>
          <h1 id="live-title" className="app-section-title">
            {copy.title}
          </h1>
          <p className="app-section-lead">
            {copy.lead}
          </p>
        </div>

        <div className="live-layout">
          <div className="live-video-section">
            <div className="live-badge">{copy.badge}</div>
            <div
              className="live-video-frame"
              aria-label={copy.videoAria}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/aA0lf1NlDz4?rel=0&modestbranding=1&playsinline=1&autoplay=0"
                title="Radio Romania Resita Live Stream"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '12px' }}
              ></iframe>
            </div>
            <p className="live-note">
              {copy.note}
            </p>
          </div>

          <div className="live-description-section">
            <p className="app-section-lead live-description-text">
              {copy.description}
            </p>
          </div>
        </div>

        {/* Radio Promotion Section */}
        <div className="radio-promotion-section" style={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '30px',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '16px',
          border: '2px solid #dee2e6'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#d81b60',
            marginBottom: '16px'
          }}>
            {copy.radioTitle}
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '24px',
            maxWidth: '600px',
            margin: '0 auto 24px'
          }}>
            {copy.radioText}
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              className="radio-play-button"
              style={{
                background: '#d81b60',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(216, 27, 96, 0.3)'
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
              onClick={() => {
                // Trigger the same behavior as the floating global radio player
                window.dispatchEvent(new Event('global-radio-toggle'));
              }}
            >
              {copy.radioButton}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
