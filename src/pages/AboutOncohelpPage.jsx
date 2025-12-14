import React from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function AboutOncohelpPage() {
  const { lang } = useI18n();

  const copy = React.useMemo(
    () =>
      ({
        ro: {
          overline: 'Beneficiar',
          title:
            'OncoHelp – singura unitate sanitară din România certificată pentru servicii integrate de oncologie',
          lead: 'Un proiect dedicat tuturor.',
          pill: 'Sprijină construirea primului spital OncoHelp la Reșița!',
          p1:
            'OncoHelp este una dintre cele mai dedicate fundații din vestul țării în îngrijirea pacienților cu cancer. De ani întregi, medici, asistenți și voluntari luptă pentru ca tratamentele moderne să fie cât mai aproape de cei care au nevoie de ele.',
          p2:
            'Un gest mic poate schimba o lume. Fii parte din schimbare, alătură-te campaniei Muzică pentru Viață!',
          quoteTitle: '„Una din convingerile noastre…”',
          quoteBody:
            '„Una din convingerile noastre a fost şi este că accesul la sănătate trebuie să fie asigurat tuturor, dincolo de situaţia materială sau socială a fiecăruia.”',
          quoteAuthor: 'Șerban Negru, Președintele Asociației OncoHelp',
          more: 'Află mai multe detalii despre proiectele OncoHelp pe oncohelp.ro.',
          imgAlt: 'Conf. Univ. Dr. Șerban Negru',
        },
        en: {
          overline: 'Beneficiary',
          title:
            'OncoHelp – the only healthcare unit in Romania certified for integrated oncology services',
          lead: 'A project dedicated to everyone.',
          pill: 'Support building the first OncoHelp hospital in Reșița!',
          p1:
            'OncoHelp is one of the most dedicated foundations in western Romania for caring for cancer patients. For years, doctors, nurses and volunteers have been fighting to bring modern treatments closer to those who need them.',
          p2:
            'A small gesture can change a world. Be part of the change—join the Muzică pentru Viață campaign!',
          quoteTitle: '“One of our convictions…”',
          quoteBody:
            '“One of our convictions has been—and still is—that access to healthcare must be ensured for everyone, beyond each person’s financial or social situation.”',
          quoteAuthor: 'Șerban Negru, President of the OncoHelp Association',
          more: 'Learn more about OncoHelp projects at oncohelp.ro.',
          imgAlt: 'Assoc. Prof. Dr. Șerban Negru',
        },
        de: {
          overline: 'Begünstigter',
          title:
            'OncoHelp – die einzige medizinische Einrichtung in Rumänien mit Zertifizierung für integrierte Onkologie-Leistungen',
          lead: 'Ein Projekt für alle.',
          pill: 'Unterstütze den Bau des ersten OncoHelp-Krankenhauses in Reșița!',
          p1:
            'OncoHelp ist eine der engagiertesten Stiftungen im Westen Rumäniens in der Betreuung von Krebspatienten. Seit Jahren setzen sich Ärzte, Pflegekräfte und Freiwillige dafür ein, moderne Behandlungen näher zu den Menschen zu bringen, die sie brauchen.',
          p2:
            'Eine kleine Geste kann eine Welt verändern. Werde Teil der Veränderung und schließe dich der Kampagne Muzică pentru Viață an!',
          quoteTitle: '„Eine unserer Überzeugungen…“',
          quoteBody:
            '„Eine unserer Überzeugungen war und ist, dass der Zugang zur Gesundheit für alle gewährleistet sein muss – unabhängig von der materiellen oder sozialen Situation jedes Einzelnen.“',
          quoteAuthor: 'Șerban Negru, Präsident der OncoHelp-Vereinigung',
          more: 'Mehr über OncoHelp-Projekte auf oncohelp.ro.',
          imgAlt: 'Assoc. Prof. Dr. Șerban Negru',
        },
        fr: {
          overline: 'Bénéficiaire',
          title:
            "OncoHelp – la seule unité sanitaire en Roumanie certifiée pour des services intégrés d’oncologie",
          lead: 'Un projet dédié à toutes et à tous.',
          pill: "Soutenez la construction du premier hôpital OncoHelp à Reșița !",
          p1:
            "OncoHelp est l’une des fondations les plus engagées de l’ouest de la Roumanie dans la prise en charge des patients atteints de cancer. Depuis des années, médecins, infirmiers et bénévoles se battent pour rapprocher les traitements modernes de celles et ceux qui en ont besoin.",
          p2:
            "Un petit geste peut changer un monde. Faites partie du changement : rejoignez la campagne Muzică pentru Viață !",
          quoteTitle: '« L’une de nos convictions… »',
          quoteBody:
            '« L’une de nos convictions a été et reste que l’accès à la santé doit être assuré pour tous, au-delà de la situation matérielle ou sociale de chacun. »',
          quoteAuthor: 'Șerban Negru, Président de l’Association OncoHelp',
          more: 'En savoir plus sur les projets OncoHelp sur oncohelp.ro.',
          imgAlt: 'Maître de conférences Dr. Șerban Negru',
        },
        it: {
          overline: 'Beneficiario',
          title:
            'OncoHelp – l’unica struttura sanitaria in Romania certificata per servizi integrati di oncologia',
          lead: 'Un progetto dedicato a tutti.',
          pill: 'Sostieni la costruzione del primo ospedale OncoHelp a Reșița!',
          p1:
            'OncoHelp è una delle fondazioni più dedicate dell’ovest della Romania nella cura dei pazienti oncologici. Da anni, medici, infermieri e volontari lottano per portare i trattamenti moderni il più vicino possibile a chi ne ha bisogno.',
          p2:
            'Un piccolo gesto può cambiare un mondo. Fai parte del cambiamento: unisciti alla campagna Muzică pentru Viață!',
          quoteTitle: '“Una delle nostre convinzioni…”',
          quoteBody:
            '“Una delle nostre convinzioni è stata ed è che l’accesso alla salute debba essere garantito a tutti, al di là della situazione materiale o sociale di ciascuno.”',
          quoteAuthor: 'Șerban Negru, Presidente dell’Associazione OncoHelp',
          more: 'Scopri di più sui progetti OncoHelp su oncohelp.ro.',
          imgAlt: 'Prof. assoc. Dr. Șerban Negru',
        },
        es: {
          overline: 'Beneficiario',
          title:
            'OncoHelp – la única unidad sanitaria en Rumanía certificada para servicios integrados de oncología',
          lead: 'Un proyecto dedicado a todos.',
          pill: '¡Apoya la construcción del primer hospital OncoHelp en Reșița!',
          p1:
            'OncoHelp es una de las fundaciones más comprometidas del oeste de Rumanía en el cuidado de pacientes con cáncer. Desde hace años, médicos, personal sanitario y voluntarios luchan para que los tratamientos modernos estén lo más cerca posible de quienes los necesitan.',
          p2:
            'Un pequeño gesto puede cambiar un mundo. ¡Sé parte del cambio y únete a la campaña Muzică pentru Viață!',
          quoteTitle: '“Una de nuestras convicciones…”',
          quoteBody:
            '“Una de nuestras convicciones ha sido y sigue siendo que el acceso a la salud debe estar garantizado para todos, más allá de la situación material o social de cada persona.”',
          quoteAuthor: 'Șerban Negru, Presidente de la Asociación OncoHelp',
          more: 'Descubre más sobre los proyectos de OncoHelp en oncohelp.ro.',
          imgAlt: 'Prof. Dr. Șerban Negru',
        },
        ar: {
          overline: 'الجهة المستفيدة',
          title:
            'OncoHelp – المؤسسة الصحية الوحيدة في رومانيا المعتمدة لتقديم خدمات أورام متكاملة',
          lead: 'مشروع مكرّس للجميع.',
          pill: 'ادعم بناء أول مستشفى OncoHelp في ريشيتسا!',
          p1:
            'OncoHelp هي واحدة من أكثر المؤسسات التزامًا في غرب رومانيا برعاية مرضى السرطان. منذ سنوات يعمل الأطباء والممرضون والمتطوعون على جعل العلاجات الحديثة أقرب إلى من يحتاجونها.',
          p2:
            'قد تغيّر لفتة صغيرة عالمًا كاملًا. كن جزءًا من التغيير وانضم إلى حملة Muzică pentru Viață!',
          quoteTitle: '« إحدى قناعاتنا… »',
          quoteBody:
            '« إحدى قناعاتنا كانت وما زالت أن الوصول إلى الرعاية الصحية يجب أن يكون متاحًا للجميع، بغضّ النظر عن الوضع المادي أو الاجتماعي لكل فرد. »',
          quoteAuthor: 'شيربان نيغرو، رئيس جمعية OncoHelp',
          more: 'اعرف المزيد عن مشاريع OncoHelp على oncohelp.ro.',
          imgAlt: 'الأستاذ الدكتور شيربان نيغرو',
        },
      }[lang] || {}),
    [lang]
  );

  return (
    <div className="app-content">
      <section className="app-section about-section" aria-labelledby="oncohelp-title">
        <div className="app-section-header">
          <span className="app-section-overline">{copy.overline}</span>
          <h1 id="oncohelp-title" className="app-section-title">
            {copy.title}
          </h1>
          <p className="app-section-lead">
            {copy.lead}
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <span className="about-pill">
              {copy.pill}
            </span>
            <p>
              {copy.p1}
            </p>
            <p>
              {copy.p2}
            </p>
          </div>
          <aside className="about-side-card">
            <strong>{copy.quoteTitle}</strong>
            <span>
              {copy.quoteBody}
            </span>
            <span>
              {copy.quoteAuthor}
            </span>
            <span>
              {copy.more}{' '}
              <a href="https://oncohelp.ro" target="_blank" rel="noopener noreferrer">
                oncohelp.ro
              </a>
              .
            </span>
          </aside>
        </div>

        <div className="about-full-width-image">
          <img src="/conf univ dr serban negru.png" alt={copy.imgAlt} />
        </div>
      </section>
    </div>
  );
}
