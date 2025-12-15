import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDonors, getDonorSizeClass, ALL_NAMES } from '../DonorContext.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

const animations = [
  'anim-float',
  'anim-zoom',
  'anim-wave',
  'anim-pulse',
  'anim-mexican-wave',
  'anim-rotate',
  'anim-breathing',
  'anim-shimmer',
  'anim-drift',
  'anim-sway'
];

function getRandomAnimation(index) {
  return animations[index % animations.length];
}

function getAnimationDelay(index) {
  // Stagger the animation delays for a wave effect
  return (index * 0.1) % 8; // Delay in seconds, cycles every 8 seconds
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomMargins(index) {
  // Generate random but consistent margins for each donor
  const leftSeed = index * 2654435761;
  const rightSeed = index * 1597463007;
  const topSeed = index * 3141592653;
  
  // Random margins: left 0-30px, right 0-30px, top -5px to 5px for vertical variation
  const marginLeft = Math.floor(seededRandom(leftSeed) * 30);
  const marginRight = Math.floor(seededRandom(rightSeed) * 30);
  const marginTop = Math.floor(seededRandom(topSeed) * 10) - 5;
  
  return { marginLeft, marginRight, marginTop };
}

function shouldAddRowSpacer(index) {
  // Add a spacer at the beginning of some rows for variety
  // Ensure at least 3 names per row (add spacer every 3-6 items)
  const seed = index * 123456789;
  const minNamesPerRow = 3;
  return index > 0 && index % minNamesPerRow === 0 && seededRandom(seed) > 0.4; // 60% chance after minimum
}

function getRowSpacerWidth(index) {
  // Random spacer width between 0-150px for variation
  const seed = index * 987654321;
  return Math.floor(seededRandom(seed) * 150);
}

export default function WallPage() {
  const { lang } = useI18n();
  const { donors, loading, error } = useDonors();
  const containerRef = useRef(null);
  const [namesPerLine, setNamesPerLine] = useState([]);

  const i18n = React.useMemo(
    () =>
      ({
        ro: {
          overline: 'Comunitatea Muzică pentru Viață',
          title: 'Comunitatea',
          pill: 'Mulțumim pentru fiecare donație!',
          lead:
            'Aici sunt oamenii care au ales să fie parte din schimbare. Mărimea numelui reflectă suma totală donată.',
          counts: (names, donations) => `${names} nume afișate • ${donations} donații înregistrate`,
          loading: 'Se încarcă datele din baza de date...',
          firestoreError: 'Nu pot citi datele din Firestore (verifică Firestore Rules / permisiuni).',
        },
        en: {
          overline: 'Muzică pentru Viață community',
          title: 'Community',
          pill: 'Thank you for every donation!',
          lead:
            'Here are the people who chose to be part of change. The size of the name reflects the total amount donated.',
          counts: (names, donations) => `${names} names displayed • ${donations} donations recorded`,
          loading: 'Loading data from the database...',
          firestoreError: 'Cannot read Firestore data (check Firestore Rules / permissions).',
        },
        de: {
          overline: 'Muzică pentru Viață – Gemeinschaft',
          title: 'Gemeinschaft',
          pill: 'Danke für jede Spende!',
          lead:
            'Hier sind die Menschen, die Teil der Veränderung sein wollen. Die Größe des Namens spiegelt die insgesamt gespendete Summe wider.',
          counts: (names, donations) => `${names} Namen angezeigt • ${donations} Spenden erfasst`,
          loading: 'Daten werden aus der Datenbank geladen...',
          firestoreError: 'Firestore-Daten können nicht gelesen werden (Firestore Rules / Berechtigungen prüfen).',
        },
        fr: {
          overline: 'Communauté Muzică pentru Viață',
          title: 'Communauté',
          pill: 'Merci pour chaque don !',
          lead:
            'Voici les personnes qui ont choisi de faire partie du changement. La taille du nom reflète le montant total donné.',
          counts: (names, donations) => `${names} noms affichés • ${donations} dons enregistrés`,
          loading: 'Chargement des données depuis la base...',
          firestoreError: "Impossible de lire les données Firestore (vérifiez les règles / permissions).",
        },
        it: {
          overline: 'Comunità Muzică pentru Viață',
          title: 'Comunità',
          pill: 'Grazie per ogni donazione!',
          lead:
            'Ecco le persone che hanno scelto di far parte del cambiamento. La dimensione del nome riflette l’importo totale donato.',
          counts: (names, donations) => `${names} nomi mostrati • ${donations} donazioni registrate`,
          loading: 'Caricamento dei dati dal database...',
          firestoreError: 'Impossibile leggere i dati da Firestore (controlla regole / permessi).',
        },
        es: {
          overline: 'Comunidad Muzică pentru Viață',
          title: 'Comunidad',
          pill: '¡Gracias por cada donación!',
          lead:
            'Aquí están las personas que eligieron formar parte del cambio. El tamaño del nombre refleja la cantidad total donada.',
          counts: (names, donations) => `${names} nombres mostrados • ${donations} donaciones registradas`,
          loading: 'Cargando datos de la base de datos...',
          firestoreError: 'No se pueden leer los datos de Firestore (revisa reglas/permisos).',
        },
        ar: {
          overline: 'مجتمع Muzică pentru Viață',
          title: 'المجتمع',
          pill: 'شكرًا لكل تبرع!',
          lead:
            'هنا الأشخاص الذين اختاروا أن يكونوا جزءًا من التغيير. حجم الاسم يعكس إجمالي المبلغ المتبرع به.',
          counts: (names, donations) => `${names} اسمًا معروضًا • ${donations} تبرعًا مسجلًا`,
          loading: 'جارٍ تحميل البيانات من قاعدة البيانات...',
          firestoreError: 'لا يمكن قراءة بيانات Firestore (تحقق من القواعد/الأذونات).',
        },
      }[lang] || {
        overline: 'Comunitatea Muzică pentru Viață',
        title: 'Comunitatea',
        pill: '',
        lead: '',
        counts: (names, donations) => `${names} • ${donations}`,
        loading: '',
        firestoreError: '',
      }),
    [lang]
  );

  // Aggregate donations by donor name (so size reflects total donated by that person).
  // Only include confirmed donations (exclude pending and failed)
  const communityMembers = useMemo(() => {
    const map = new Map();

    // Exchange rates for converting to RON
    const EXCHANGE_RATES = {
      RON: 1,
      EUR: 0.201, // 1 RON ≈ 0.201 EUR
      USD: 0.222, // 1 RON ≈ 0.222 USD
    };

    const anonymousNames = new Set(['anonim', 'anonymous', 'anonym', 'anonyme', 'anonimo', 'مجهول']);

    for (const donation of (donors || []).filter(d => d?.status === 'confirmed')) {
      const rawName = (donation?.name || '').trim();
      const normalized = rawName.replace(/\s+/g, ' ');
      if (!normalized) continue;

      // Do not show anonymous donors in the community wall, but keep them in totals.
      if (anonymousNames.has(normalized.toLowerCase())) continue;

      const key = normalized.toLowerCase();
      const amount = Number(donation?.amount) || 0;
      const currency = donation?.currency || 'RON'; // Default to RON if not specified
      const rate = EXCHANGE_RATES[currency] || 1; // Default to 1 if currency not found

      // Convert amount to RON for consistent display
      const amountInRON = currency === 'RON' ? amount : amount / rate;

      const prev = map.get(key);
      if (!prev) {
        map.set(key, {
          id: key,
          name: normalized,
          amount: amountInRON,
          donationsCount: 1,
        });
      } else {
        prev.amount += amountInRON;
        prev.donationsCount += 1;
      }
    }

    const arr = Array.from(map.values());
    // Sort by total amount donated (descending)
    arr.sort((a, b) => (b.amount || 0) - (a.amount || 0));

    // Add mockup donors at the bottom
    const existingNames = new Set(arr.map(d => d.name.toLowerCase()));
    const shuffledNames = shuffleArray(ALL_NAMES);
    const mockupDonors = shuffledNames
      .filter(name => !existingNames.has(name.toLowerCase()))
      .map((name, index) => ({
        id: `mock-${index}`,
        name,
        amount: Math.floor(Math.random() * 200) + 1, // Random amount 1-200 for varied sizes
        donationsCount: 1,
      }));
    arr.push(...mockupDonors);

    return arr;
  }, [donors]);

  useEffect(() => {
    if (!containerRef.current) return;

    const calculateNamesPerLine = () => {
      const container = containerRef.current;
      const children = Array.from(container.children);
      const lines = [];
      let currentLine = [];
      let currentTop = null;

      children.forEach((child) => {
        if (child.classList.contains('donor-name-container')) {
          const rect = child.getBoundingClientRect();
          const top = Math.round(rect.top);

          if (currentTop === null || top === currentTop) {
            currentLine.push(child);
            currentTop = top;
          } else {
            if (currentLine.length > 0) {
              lines.push(currentLine.length);
            }
            currentLine = [child];
            currentTop = top;
          }
        }
      });

      if (currentLine.length > 0) {
        lines.push(currentLine.length);
      }

      setNamesPerLine(lines);
      console.log('Names per line:', lines);
    };

    // Calculate on mount and when window resizes
    calculateNamesPerLine();
    window.addEventListener('resize', calculateNamesPerLine);

    return () => window.removeEventListener('resize', calculateNamesPerLine);
  }, [donors]);

  return (
    <div className="app-content">
      <section className="app-section wall-section" aria-labelledby="wall-title">
        <div className="app-section-header">
          <span className="app-section-overline">{i18n.overline}</span>
          <h1 id="wall-title" className="app-section-title">
            {i18n.title}
          </h1>
          <p className="about-pill">
            {i18n.pill}
          </p>
          <p className="app-section-lead">
            {i18n.lead}
          </p>

          {loading && (
            <p className="app-section-lead" style={{ marginTop: '10px' }}>
              {i18n.loading}
            </p>
          )}

          {error && (
            <p className="app-section-lead" style={{ marginTop: '10px', color: '#b71c1c' }}>
              {i18n.firestoreError}
            </p>
          )}
        </div>

        <div className="donor-wall-flow" ref={containerRef}>
          {communityMembers.map((member, index) => {
            const sizeClass = getDonorSizeClass(member.amount);
            const animClass = getRandomAnimation(index);
            const margins = getRandomMargins(index);
            const classes = ['donor-name-simple', sizeClass, animClass];
            // No highlighting on general wall
            return (
              <React.Fragment key={member.id}>
                {shouldAddRowSpacer(index) && (
                  <div
                    style={{
                      width: `${getRowSpacerWidth(index)}px`,
                      flexBasis: '100%',
                      height: 0
                    }}
                  />
                )}
                <div
                  className="donor-name-container"
                  style={{
                    marginLeft: `${margins.marginLeft}px`,
                    marginRight: `${margins.marginRight}px`,
                    marginTop: `${margins.marginTop}px`
                  }}
                >
                  <span
                    className={classes.join(' ')}
                    style={{ animationDelay: `${getAnimationDelay(index)}s` }}
                  >
                    {member.name}
                  </span>
                </div>
                {index < communityMembers.length - 1 && <div className="donor-separator" />}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </div>
  );
}
