import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDonors } from '../DonorContext.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function DonatePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addDonor } = useDonors();
  const { lang, withBase } = useI18n();

  const [donationMode, setDonationMode] = useState('onetime');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [currentShortIndex, setCurrentShortIndex] = useState(0);

  const [currency, setCurrency] = useState('RON');

  const shortsVideos = React.useMemo(
    () => [
      { id: 0, youtubeUrl: 'https://www.youtube.com/shorts/y0lKg3Zij8E' },
      { id: 1, youtubeUrl: 'https://www.youtube.com/shorts/vZxxebBuy8I' },
      { id: 2, youtubeUrl: 'https://www.youtube.com/shorts/deRIAADFxO8' },
      { id: 3, youtubeUrl: 'https://www.youtube.com/shorts/yjYPkDaI07c' },
      { id: 4, youtubeUrl: 'https://www.youtube.com/shorts/Skf5B-3wKhE' },
      { id: 5, youtubeUrl: 'https://www.youtube.com/shorts/llnYKVVwvO8' },
      { id: 6, youtubeUrl: 'https://www.youtube.com/shorts/FcWQEMN6fh0' },
      { id: 7, youtubeUrl: 'https://www.youtube.com/shorts/l-GOMoAAr9Q' },
      { id: 8, youtubeUrl: 'https://www.youtube.com/shorts/UZip5FJJdDE' },
      { id: 9, youtubeUrl: 'https://www.youtube.com/shorts/xhJXvFyE10Y' },
    ],
    []
  );

  // Extract video ID from YouTube Shorts URL
  const getVideoId = (url) => {
    const match = url.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const goToShort = (index) => {
    if (!shortsVideos.length) return;
    const total = shortsVideos.length;
    const nextIndex = ((index % total) + total) % total;
    setCurrentShortIndex(nextIndex);
  };

  const handlePrevShort = () => goToShort(currentShortIndex - 1);
  const handleNextShort = () => goToShort(currentShortIndex + 1);

  // Share functionality
  const shareText = `Și eu susțin Muzică pentru Viață.
Un gest mic poate schimba o lume.
 Împreună construim primul spital oncologic din Reșița.
#MuzicaPentruViata #ImpreunaPentruViata

Donează și tu acum aici: `;

  const shareUrl = window.location.origin;
  const shareImage = `${window.location.origin}/2025.png`;

  const handleShare = async (platform) => {
    const fullShareText = shareText + shareUrl;

    try {
      switch (platform) {
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText.trim())}`,
            '_blank',
            'width=600,height=400'
          );
          break;

        case 'whatsapp':
          window.open(
            `https://wa.me/?text=${encodeURIComponent(fullShareText)}`,
            '_blank'
          );
          break;

        case 'instagram':
          // Instagram doesn't support direct sharing, copy text and URL to clipboard
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(fullShareText);
            alert('Text copiat în clipboard! Poți împărtăși pe Instagram.');
          } else {
            alert('Te rugăm să copiezi manual textul pentru a împărtăși pe Instagram.');
          }
          break;

        default:
          // Fallback: copy to clipboard
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(fullShareText);
            alert('Text copiat în clipboard!');
          }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: copy to clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullShareText);
        alert('Text copiat în clipboard!');
      }
    }
  };

  const mapLangToFallbackCurrency = (language) => {
    if (language === 'ro') return 'RON';
    if (['de', 'fr', 'it', 'es'].includes(language)) return 'EUR';
    return 'USD';
  };

  useEffect(() => {
    // Derive currency from IP-based cookie (set by Netlify edge) or fall back to lang.
    try {
      if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';').map(c => c.trim());
        const currencyCookie = cookies.find(c => c.startsWith('mpv_currency='));
        if (currencyCookie) {
          const value = currencyCookie.split('=')[1];
          if (value === 'RON' || value === 'EUR' || value === 'USD') {
            setCurrency(value);
            return;
          }
        }
      }
    } catch (e) {
      console.error('Error reading currency cookie', e);
    }
    setCurrency(mapLangToFallbackCurrency(lang));
  }, [lang]);

  const i18n = React.useMemo(
    () =>
      ({
        ro: {
          minAmountError: 'Suma minimă pentru donație este 1 RON.',
          invalidEmailError: 'Te rugăm să introduci o adresă de email validă.',
          paymentInitError: 'A apărut o eroare la inițierea plății. Te rugăm să încerci din nou.',
          tagline: 'Muzică pentru Viață 2025',
          titlePrefix: 'Împreună construim',
          titleHighlight: 'primul spital pentru bolnavii de cancer',
          titleSuffix: 'din Reșița',
          summary:
            'Fiecare donație contează. Alege suma cu care vrei să contribui la construirea spitalului oncologic din Reșița.',
          modeSoonOne: 'O singură dată',
          modeSoonMonthly: 'Lunar',
          modeSoonTitleOne: 'Donațiile vor fi disponibile în curând',
          modeSoonTitleMonthly: 'Donațiile lunare vor fi disponibile în curând',
          customPlaceholder: 'Alta',
          nameLabel: 'Numele tău (opțional):',
          namePlaceholder: "Numele tău sau 'Anonim'",
          emailLabel: 'Email (necesar pentru confirmare):',
          emailPlaceholder: 'email@exemplu.ro',
          processing: 'Se procesează...',
          donateNow: 'DONEAZĂ ACUM',
          donateWithAmount: (amount) => `DONEAZĂ ${amount}`,
          payNote:
            'Plata este securizată prin EuPlatesc. Vei fi redirecționat către pagina de plată. După finalizarea donației, vei fi adăugat pe peretele comunității noastre.',
          whyTitle: 'De ce este important?',
          whyP1:
            'În fiecare an, în România, aproximativ 100.000 de oameni află că au cancer. Pentru mulți dintre ei, lupta nu înseamnă doar boala, ci și drumuri lungi, epuizare, costuri mari și timp prețios pierdut departe de cei dragi.',
          whyP2:
            'Reșița nu are un spital oncologic. Pacienții sunt nevoiți să călătorească sute de kilometri pentru tratament, în condiții dificile. Fundația OncoHelp lucrează pentru a construi primul spital oncologic din Reșița, un loc unde oamenii pot primi tratament de calitate, mai aproape de casă, cu demnitate, speranță și sprijin real.',
          whyImgAlt: 'Spitalul din Reșița',
          hospitalTitle: 'Spitalul din Reșița',
          hospitalP1:
            'De peste 10 ani, Radio România Reșița dă glas speranței prin campania „Muzică pentru Viață" – un maraton caritabil care a transformat muzica în sprijin real și a adunat sute de mii de euro pentru oameni aflați în nevoie.',
          hospitalP2:
            'În 2025, fiecare notă, fiecare voce și fiecare donație se unesc pentru un scop vital: construirea spitalului oncologic la Reșița. Împreună, demonstrăm că solidaritatea poate salva vieți și că, atunci când o comunitate se unește, speranța devine realitate.',
          hospitalImgAlt: 'Muzică pentru Viață 2016',
          rightImgAlt: 'Universitatea din Reșița',
          orderDescOne: 'O singură dată',
          orderDescMonthly: 'Lunar',
        },
        en: {
          minAmountError: 'The minimum donation amount is 1 RON.',
          invalidEmailError: 'Please enter a valid email address.',
          paymentInitError: 'An error occurred while initiating the payment. Please try again.',
          // Homepage hero copy (EN)
          tagline: 'Music for Life 2025',
          titlePrefix: 'Together, we are building',
          titleHighlight: 'Reșița’s',
          titleSuffix: 'first cancer hospital',
          summary:
            'Every donation matters. Choose the amount you wish to contribute to the construction of Reșița’s oncological hospital.',
          modeSoonOne: 'One-time',
          modeSoonMonthly: 'Monthly',
          modeSoonTitleOne: 'Donations will be available soon',
          modeSoonTitleMonthly: 'Monthly donations will be available soon',
          customPlaceholder: 'Other',
          nameLabel: 'Your name (optional):',
          namePlaceholder: "Your name or 'Anonymous'",
          emailLabel: 'Email (required for confirmation):',
          emailPlaceholder: 'email@example.com',
          processing: 'Processing...',
          donateNow: 'DONATE NOW',
          donateWithAmount: (amount) => `DONATE ${amount}`,
          payNote:
            'Payments are securely processed via EuPlatesc. You will be redirected to the payment page. After completing your donation, you will be added to our community wall.',
          whyTitle: 'Why is this important?',
          whyP1:
            'Every year in Romania, around 100,000 people are diagnosed with cancer. For many of them, the fight is not only against the disease, but also against long journeys, exhaustion, high costs, and precious time lost far from loved ones.',
          whyP2:
            'Reșița does not have an oncological hospital. Patients are forced to travel hundreds of kilometers for treatment, under difficult conditions. The OncoHelp Foundation is working to build Reșița’s first oncological hospital — a place where people can receive quality treatment closer to home, with dignity, hope, and real support.',
          whyImgAlt: 'Hospital in Reșița',
          hospitalTitle: 'The Hospital in Reșița',
          hospitalP1:
            'For over 10 years, Radio România Reșița has given a voice to hope through the “Music for Life” campaign — a charity marathon that has turned music into real support and raised hundreds of thousands of euros for people in need.',
          hospitalP2:
            'In 2025, every note, every voice, and every donation come together for a vital purpose: building the oncological hospital in Reșița. Together, we prove that solidarity can save lives and that when a community unites, hope becomes reality.',
          hospitalImgAlt: 'Muzică pentru Viață 2016',
          rightImgAlt: 'University in Reșița',
          orderDescOne: 'One-time',
          orderDescMonthly: 'Monthly',
        },
        de: {
          minAmountError: 'Der Mindestbetrag für eine Spende beträgt 1 RON.',
          invalidEmailError: 'Bitte gib eine gültige E-Mail-Adresse ein.',
          paymentInitError: 'Beim Start der Zahlung ist ein Fehler aufgetreten. Bitte versuche es erneut.',
          tagline: 'Muzică pentru Viață 2025',
          titlePrefix: 'Gemeinsam bauen wir',
          titleHighlight: 'das erste Krankenhaus für Krebspatienten',
          titleSuffix: 'in Reșița',
          summary:
            'Jede Spende zählt. Wähle den Betrag, mit dem du den Bau des Onkologie-Krankenhauses in Reșița unterstützen möchtest.',
          modeSoonOne: 'Einmalig',
          modeSoonMonthly: 'Monatlich',
          modeSoonTitleOne: 'Spenden sind bald verfügbar',
          modeSoonTitleMonthly: 'Monatliche Spenden sind bald verfügbar',
          customPlaceholder: 'Andere',
          nameLabel: 'Dein Name (optional):',
          namePlaceholder: "Dein Name oder 'Anonym'",
          emailLabel: 'E-Mail (für Bestätigung erforderlich):',
          emailPlaceholder: 'email@beispiel.de',
          processing: 'Wird verarbeitet...',
          donateNow: 'JETZT SPENDEN',
          donateWithAmount: (amount) => `SPENDE ${amount}`,
          payNote:
            'Die Zahlung ist über EuPlatesc gesichert. Du wirst zur Zahlungsseite weitergeleitet. Nach Abschluss der Spende wirst du unserer Community-Wall hinzugefügt.',
          whyTitle: 'Warum ist es wichtig?',
          whyP1:
            'Jedes Jahr erfahren in Rumänien etwa 100.000 Menschen, dass sie Krebs haben. Für viele bedeutet der Kampf nicht nur die Krankheit, sondern auch lange Wege, Erschöpfung, hohe Kosten und wertvolle Zeit fern von Angehörigen.',
          whyP2:
            'Reșița hat kein Onkologie-Krankenhaus. Patienten müssen unter schwierigen Bedingungen Hunderte Kilometer zur Behandlung reisen. OncoHelp arbeitet daran, das erste Onkologie-Krankenhaus in Reșița zu bauen – ein Ort, an dem Menschen hochwertige Behandlung näher an Zuhause erhalten können, mit Würde, Hoffnung und echter Unterstützung.',
          whyImgAlt: 'Krankenhaus in Reșița',
          hospitalTitle: 'Das Krankenhaus in Reșița',
          hospitalP1:
            'Seit über 10 Jahren gibt Radio România Reșița der Hoffnung eine Stimme durch die Kampagne „Muzică pentru Viață“ – einen Charity-Marathon, der Musik in echte Hilfe verwandelt und Hunderttausende Euro für Menschen in Not gesammelt hat.',
          hospitalP2:
            'Im Jahr 2025 vereinen sich jede Note, jede Stimme und jede Spende für ein lebenswichtiges Ziel: den Bau des Onkologie-Krankenhauses in Reșița. Gemeinsam zeigen wir, dass Solidarität Leben retten kann – und wenn eine Gemeinschaft zusammensteht, wird Hoffnung Realität.',
          hospitalImgAlt: 'Muzică pentru Viață 2016',
          rightImgAlt: 'Universität in Reșița',
          orderDescOne: 'Einmalig',
          orderDescMonthly: 'Monatlich',
        },
        fr: {
          minAmountError: 'Le montant minimum de don est de 1 RON.',
          invalidEmailError: 'Veuillez saisir une adresse e-mail valide.',
          paymentInitError: "Une erreur s’est produite lors de l’initiation du paiement. Veuillez réessayer.",
          tagline: 'Muzică pentru Viață 2025',
          titlePrefix: 'Ensemble, nous construisons',
          titleHighlight: 'le premier hôpital pour les patients atteints de cancer',
          titleSuffix: 'à Reșița',
          summary:
            'Chaque don compte. Choisissez le montant avec lequel vous souhaitez contribuer à la construction de l’hôpital d’oncologie à Reșița.',
          modeSoonOne: 'Unique',
          modeSoonMonthly: 'Mensuel',
          modeSoonTitleOne: 'Les dons seront bientôt disponibles',
          modeSoonTitleMonthly: 'Les dons mensuels seront bientôt disponibles',
          customPlaceholder: 'Autre',
          nameLabel: 'Votre nom (facultatif) :',
          namePlaceholder: "Votre nom ou 'Anonyme'",
          emailLabel: 'E-mail (obligatoire pour la confirmation) :',
          emailPlaceholder: 'email@exemple.fr',
          processing: 'Traitement en cours...',
          donateNow: 'FAIRE UN DON',
          donateWithAmount: (amount) => `DONNER ${amount}`,
          payNote:
            'Le paiement est sécurisé via EuPlatesc. Vous serez redirigé vers la page de paiement. Après le don, vous serez ajouté à notre mur de la communauté.',
          whyTitle: 'Pourquoi est-ce important ?',
          whyP1:
            "Chaque année en Roumanie, environ 100 000 personnes apprennent qu’elles ont un cancer. Pour beaucoup, la lutte ne concerne pas seulement la maladie, mais aussi de longs trajets, l’épuisement, des coûts élevés et un temps précieux perdu loin des proches.",
          whyP2:
            "Reșița n’a pas d’hôpital d’oncologie. Les patients doivent parcourir des centaines de kilomètres pour se soigner, dans des conditions difficiles. OncoHelp travaille à construire le premier hôpital d’oncologie à Reșița : un lieu où les gens peuvent recevoir des soins de qualité, plus près de chez eux, avec dignité, espoir et un soutien réel.",
          whyImgAlt: 'Hôpital à Reșița',
          hospitalTitle: "L’hôpital à Reșița",
          hospitalP1:
            "Depuis plus de 10 ans, Radio România Reșița donne une voix à l’espoir avec la campagne « Muzică pentru Viață » – un marathon caritatif qui transforme la musique en soutien concret et a récolté des centaines de milliers d’euros pour les personnes dans le besoin.",
          hospitalP2:
            "En 2025, chaque note, chaque voix et chaque don s’unissent pour un objectif vital : construire l’hôpital d’oncologie à Reșița. Ensemble, nous prouvons que la solidarité peut sauver des vies et que, lorsqu’une communauté s’unit, l’espoir devient réalité.",
          hospitalImgAlt: 'Muzică pentru Viață 2016',
          rightImgAlt: 'Université à Reșița',
          orderDescOne: 'Unique',
          orderDescMonthly: 'Mensuel',
        },
        it: {
          minAmountError: 'L’importo minimo per la donazione è 1 RON.',
          invalidEmailError: 'Inserisci un indirizzo email valido.',
          paymentInitError: 'Si è verificato un errore durante l’avvio del pagamento. Riprova.',
          tagline: 'Muzică pentru Viață 2025',
          titlePrefix: 'Insieme costruiamo',
          titleHighlight: 'il primo ospedale per i pazienti oncologici',
          titleSuffix: 'a Reșița',
          summary:
            'Ogni donazione conta. Scegli l’importo con cui vuoi contribuire alla costruzione dell’ospedale oncologico a Reșița.',
          modeSoonOne: 'Una tantum',
          modeSoonMonthly: 'Mensile',
          modeSoonTitleOne: 'Le donazioni saranno disponibili a breve',
          modeSoonTitleMonthly: 'Le donazioni mensili saranno disponibili a breve',
          customPlaceholder: 'Altro',
          nameLabel: 'Il tuo nome (opzionale):',
          namePlaceholder: "Il tuo nome o 'Anonimo'",
          emailLabel: 'Email (necessaria per la conferma):',
          emailPlaceholder: 'email@esempio.it',
          processing: 'Elaborazione...',
          donateNow: 'DONA ORA',
          donateWithAmount: (amount) => `DONA ${amount}`,
          payNote:
            'Il pagamento è protetto tramite EuPlatesc. Verrai reindirizzato alla pagina di pagamento. Dopo la donazione, sarai aggiunto al nostro muro della comunità.',
          whyTitle: 'Perché è importante?',
          whyP1:
            'Ogni anno in Romania circa 100.000 persone scoprono di avere un tumore. Per molti la lotta non è solo la malattia, ma anche lunghi viaggi, stanchezza, costi elevati e tempo prezioso lontano dai propri cari.',
          whyP2:
            'Reșița non ha un ospedale oncologico. I pazienti sono costretti a viaggiare per centinaia di chilometri per curarsi, in condizioni difficili. OncoHelp lavora per costruire il primo ospedale oncologico a Reșița: un luogo dove le persone possano ricevere cure di qualità più vicino a casa, con dignità, speranza e supporto reale.',
          whyImgAlt: 'Ospedale a Reșița',
          hospitalTitle: "L’ospedale a Reșița",
          hospitalP1:
            'Da oltre 10 anni Radio România Reșița dà voce alla speranza con la campagna “Muzică pentru Viață” – una maratona di beneficenza che ha trasformato la musica in aiuto concreto e ha raccolto centinaia di migliaia di euro per chi è in difficoltà.',
          hospitalP2:
            'Nel 2025 ogni nota, ogni voce e ogni donazione si uniscono per un obiettivo vitale: costruire l’ospedale oncologico a Reșița. Insieme dimostriamo che la solidarietà può salvare vite e che, quando una comunità si unisce, la speranza diventa realtà.',
          hospitalImgAlt: 'Muzică pentru Viață 2016',
          rightImgAlt: 'Università a Reșița',
          orderDescOne: 'Una tantum',
          orderDescMonthly: 'Mensile',
        },
        es: {
          minAmountError: 'El importe mínimo de donación es 1 RON.',
          invalidEmailError: 'Por favor, introduce una dirección de email válida.',
          paymentInitError: 'Se produjo un error al iniciar el pago. Por favor, inténtalo de nuevo.',
          tagline: 'Muzică pentru Viață 2025',
          titlePrefix: 'Juntos construimos',
          titleHighlight: 'el primer hospital para pacientes con cáncer',
          titleSuffix: 'en Reșița',
          summary:
            'Cada donación cuenta. Elige la cantidad con la que quieres contribuir a la construcción del hospital oncológico en Reșița.',
          modeSoonOne: 'Una vez',
          modeSoonMonthly: 'Mensual',
          modeSoonTitleOne: 'Las donaciones estarán disponibles pronto',
          modeSoonTitleMonthly: 'Las donaciones mensuales estarán disponibles pronto',
          customPlaceholder: 'Otra',
          nameLabel: 'Tu nombre (opcional):',
          namePlaceholder: "Tu nombre o 'Anónimo'",
          emailLabel: 'Email (necesario para confirmación):',
          emailPlaceholder: 'email@ejemplo.es',
          processing: 'Procesando...',
          donateNow: 'DONAR AHORA',
          donateWithAmount: (amount) => `DONAR ${amount}`,
          payNote:
            'El pago está asegurado por EuPlatesc. Serás redirigido a la página de pago. Tras completar la donación, serás añadido al muro de nuestra comunidad.',
          whyTitle: '¿Por qué es importante?',
          whyP1:
            'Cada año en Rumanía, aproximadamente 100.000 personas descubren que tienen cáncer. Para muchos, la lucha no es solo la enfermedad, sino también viajes largos, agotamiento, grandes costes y tiempo valioso perdido lejos de sus seres queridos.',
          whyP2:
            'Reșița no tiene un hospital oncológico. Los pacientes se ven obligados a viajar cientos de kilómetros para recibir tratamiento, en condiciones difíciles. OncoHelp trabaja para construir el primer hospital oncológico en Reșița: un lugar donde las personas puedan recibir atención de calidad más cerca de casa, con dignidad, esperanza y apoyo real.',
          whyImgAlt: 'Hospital en Reșița',
          hospitalTitle: 'El hospital en Reșița',
          hospitalP1:
            'Desde hace más de 10 años, Radio România Reșița da voz a la esperanza con la campaña “Muzică pentru Viață”: un maratón solidario que transformó la música en apoyo real y reunió cientos de miles de euros para personas necesitadas.',
          hospitalP2:
            'En 2025, cada nota, cada voz y cada donación se unen por un objetivo vital: construir el hospital oncológico en Reșița. Juntos demostramos que la solidaridad puede salvar vidas y que, cuando una comunidad se une, la esperanza se convierte en realidad.',
          hospitalImgAlt: 'Muzică pentru Viață 2016',
          rightImgAlt: 'Universidad en Reșița',
          orderDescOne: 'Una vez',
          orderDescMonthly: 'Mensual',
        },
        ar: {
          minAmountError: 'الحد الأدنى للتبرع هو 1 RON.',
          invalidEmailError: 'يرجى إدخال بريد إلكتروني صالح.',
          paymentInitError: 'حدث خطأ أثناء بدء الدفع. يرجى المحاولة مرة أخرى.',
          tagline: 'Muzică pentru Viață 2025',
          titlePrefix: 'معًا نبني',
          titleHighlight: 'أول مستشفى لمرضى السرطان',
          titleSuffix: 'في ريشيتسا',
          summary:
            'كل تبرع مهم. اختر المبلغ الذي ترغب في المساهمة به لبناء مستشفى الأورام في ريشيتسا.',
          modeSoonOne: 'مرة واحدة',
          modeSoonMonthly: 'شهريًا',
          modeSoonTitleOne: 'ستتوفر التبرعات قريبًا',
          modeSoonTitleMonthly: 'ستتوفر التبرعات الشهرية قريبًا',
          customPlaceholder: 'مبلغ آخر',
          nameLabel: 'اسمك (اختياري):',
          namePlaceholder: "اسمك أو 'مجهول'",
          emailLabel: 'البريد الإلكتروني (مطلوب للتأكيد):',
          emailPlaceholder: 'email@example.com',
          processing: 'جارٍ المعالجة...',
          donateNow: 'تبرّع الآن',
          donateWithAmount: (amount) => `تبرّع ${amount}`,
          payNote:
            'الدفع مؤمّن عبر EuPlatesc. سيتم تحويلك إلى صفحة الدفع. بعد إتمام التبرع ستتم إضافتك إلى جدار مجتمعنا.',
          whyTitle: 'لماذا هذا مهم؟',
          whyP1:
            'كل عام في رومانيا، يكتشف حوالي 100,000 شخص أنهم مصابون بالسرطان. بالنسبة للكثيرين لا تعني المعركة المرض فقط، بل أيضًا رحلات طويلة وإرهاق وتكاليف مرتفعة ووقت ثمين بعيدًا عن الأحبة.',
          whyP2:
            'لا يوجد في ريشيتسا مستشفى للأورام. يضطر المرضى إلى السفر مئات الكيلومترات للعلاج في ظروف صعبة. تعمل OncoHelp على بناء أول مستشفى للأورام في ريشيتسا: مكان يمكن للناس فيه تلقي علاج عالي الجودة أقرب إلى البيت، بكرامة وأمل ودعم حقيقي.',
          whyImgAlt: 'مستشفى في ريشيتسا',
          hospitalTitle: 'مستشفى ريشيتسا',
          hospitalP1:
            'لأكثر من 10 سنوات تمنح إذاعة Radio România Reșița صوتًا للأمل عبر حملة “Muzică pentru Viață” – ماراثون خيري حوّل الموسيقى إلى دعم حقيقي وجمع مئات الآلاف من اليورو للأشخاص المحتاجين.',
          hospitalP2:
            'في عام 2025 تتحد كل نغمة وكل صوت وكل تبرع من أجل هدف حيوي: بناء مستشفى الأورام في ريشيتسا. معًا نثبت أن التضامن قادر على إنقاذ الأرواح، وأنه عندما يتحد المجتمع يصبح الأمل حقيقة.',
          hospitalImgAlt: 'Muzică pentru Viață 2016',
          rightImgAlt: 'جامعة ريشيتسا',
          orderDescOne: 'مرة واحدة',
          orderDescMonthly: 'شهريًا',
        },
      }[lang] || {
        minAmountError: 'Suma minimă pentru donație este 1 RON.',
        invalidEmailError: 'Te rugăm să introduci o adresă de email validă.',
        paymentInitError: 'A apărut o eroare la inițierea plății. Te rugăm să încerci din nou.',
        tagline: 'Muzică pentru Viață 2025',
        titlePrefix: '',
        titleHighlight: '',
        titleSuffix: '',
        summary: '',
        modeSoonOne: '',
        modeSoonMonthly: '',
        modeSoonTitleOne: '',
        modeSoonTitleMonthly: '',
        customPlaceholder: '',
        nameLabel: '',
        namePlaceholder: '',
        emailLabel: '',
        emailPlaceholder: '',
        processing: '',
        donateNow: '',
        donateWithAmount: (amount) => amount,
        payNote: '',
        whyTitle: '',
        whyP1: '',
        whyP2: '',
        whyImgAlt: '',
        hospitalTitle: '',
        hospitalP1: '',
        hospitalP2: '',
        hospitalImgAlt: '',
        rightImgAlt: '',
        orderDescOne: '',
        orderDescMonthly: '',
      }),
    [lang]
  );

  // Preset donation amounts in selected currency
  // RON: 15, 25, 50, 100, ALTA
  // EUR/USD: 3, 5, 10, 20, OTHER
  const presetAmounts = React.useMemo(() => {
    if (currency === 'RON') return [15, 25, 50, 100, 'custom'];
    return [3, 5, 10, 20, 'custom']; // EUR & USD
  }, [currency]);

  // Handle successful payment return from EuPlatesc
  useEffect(() => {
    // Log all search params for debugging
    console.log('EuPlatesc return params:', Object.fromEntries(searchParams.entries()));

    const action = searchParams.get('action');
    const amount = searchParams.get('amount');
    const name = searchParams.get('fname') || searchParams.get('name');
    const invoiceId = searchParams.get('invoice_id') || searchParams.get('order_id');

    // Check for various possible success indicators from EuPlatesc
    const isSuccess = action === 'confirmed' ||
                      action === 'success' ||
                      searchParams.get('status') === 'confirmed' ||
                      searchParams.get('status') === 'success';

    if (isSuccess && amount && invoiceId) {
      console.log('Payment successful, redirecting to wall:', { action, amount, name, invoiceId });
      // Donation was already recorded when form was submitted, just redirect to wall
      navigate(withBase('/multumiri'), { replace: true });
    } else if (action || amount) {
      console.log('Payment return detected but not confirmed:', { action, amount, name, invoiceId });
    }
  }, [searchParams, navigate, withBase]);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setError('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
    setError('');
  };

  const getFinalAmount = () => {
    if (selectedAmount) return selectedAmount;
    const parsed = parseFloat(customAmount);
    return isFinite(parsed) && parsed > 0 ? parsed : 0;
  };

   const formatCurrency = (amount) => {
    if (!amount) return '';
    const value = Number(amount).toFixed(0);
    if (currency === 'RON') return `${value} RON`;
    if (currency === 'EUR') return `${value} €`;
    return `$${value}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const finalAmount = getFinalAmount();
    if (!finalAmount || finalAmount < 1) {
      setError(i18n.minAmountError);
      return;
    }

    if (!donorEmail || !donorEmail.includes('@')) {
      setError(i18n.invalidEmailError);
      return;
    }

    setIsProcessing(true);

    try {
      // First, create pending donation in Firestore
      const { addDoc, collection } = await import('firebase/firestore');
      const { db } = await import('../firebase.js');

      const invoiceId = 'MPV-' + Date.now();
      const donation = {
        name: donorName || 'Anonim',
        amount: finalAmount,
        message: `Donație confirmată prin EuPlatesc - Invoice: ${invoiceId}`,
        created_at: new Date().toISOString(),
        status: 'confirmed',
        invoiceId: invoiceId
      };

      console.log('Creating donation in Firestore...');
      await addDoc(collection(db, 'donations'), donation);
      console.log('Pending donation created');

      // Then call Netlify function to initiate payment
      const amountToSend = finalAmount.toFixed(2);
      const response = await fetch('/.netlify/functions/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountToSend,
          currency,
          orderDesc: `Donation Muzică pentru Viață - ${donationMode === 'monthly' ? i18n.orderDescMonthly : i18n.orderDescOne}`,
          email: donorEmail,
          invoiceId: invoiceId, // Pass the invoice ID
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate payment');
      }

      const paymentData = await response.json();

      // Create a form and submit it to EuPlatesc
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentData.endpoint;

      // Add all payment fields
      const fields = {
        amount: paymentData.amount,
        curr: paymentData.curr,
        invoice_id: paymentData.invoice_id,
        order_desc: paymentData.order_desc,
        merch_id: paymentData.merch_id,
        timestamp: paymentData.timestamp,
        nonce: paymentData.nonce,
        fp_hash: paymentData.fp_hash,
        email: paymentData.email,
        fname: donorName || 'Anonim',
        ExtraData: JSON.stringify({ donorName: donorName || 'Anonim' }),
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('Payment initiation error:', err);
      setError(i18n.paymentInitError);
      setIsProcessing(false);
    }
  };

  return (
    <div className="homepage-wrapper post-event-wrapper">
      <div className="homepage-vertical-layout">
        {/* Donation Panel */}
        <div className="donation-panel" id="donation-form">
          <div className="donation-panel-inner">
            <div className="donation-panel-left">
              <span className="tagline">{i18n.tagline}</span>
              <h1>
                {i18n.titlePrefix}{' '}
                <span className="highlight">{i18n.titleHighlight}</span>{' '}
                {i18n.titleSuffix}
              </h1>
              <p className="donation-summary">
                {i18n.summary}
              </p>

              <form onSubmit={handleSubmit}>
                {/* Donation Mode Tabs */}
                <div className="donation-mode-tabs">
                  <button
                    type="button"
                    className="donation-mode-tab donation-mode-tab--disabled"
                    disabled
                    title={i18n.modeSoonTitleOne}
                  >
                    {i18n.modeSoonOne}
                  </button>
                  <button
                    type="button"
                    className="donation-mode-tab donation-mode-tab--disabled"
                    disabled
                    title={i18n.modeSoonTitleMonthly}
                  >
                    {i18n.modeSoonMonthly}
                  </button>
                </div>

                {/* Preset Amounts */}
                <div className="donation-amounts-grid">
                  {presetAmounts.map((amount) => (
                    amount === 'custom' ? (
                      <div
                        key={amount}
                        className={`donation-amount-button ${selectedAmount === 'custom' ? 'donation-amount-button--active' : ''}`}
                        onClick={() => handleAmountSelect('custom')}
                      >
                        <input
                          type="number"
                          className="donation-amount-main donation-custom-input-inline"
                          placeholder={i18n.customPlaceholder}
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          min="1"
                          step="1"
                        />
                        <div className="donation-amount-ron">{currency}</div>
                      </div>
                    ) : (
                      <button
                        key={amount}
                        type="button"
                        className={`donation-amount-button ${selectedAmount === amount ? 'donation-amount-button--active' : ''}`}
                        onClick={() => handleAmountSelect(amount)}
                      >
                         <div className="donation-amount-main">{amount}</div>
                         <div className="donation-amount-ron">{currency}</div>
                      </button>
                    )
                  ))}
                </div>

                {/* Donor Information */}
                <div className="donor-info-row">
                  <div className="donation-custom">
                    <label className="donation-custom-label">{i18n.nameLabel}</label>
                    <input
                      type="text"
                      className="donation-custom-input"
                      placeholder={i18n.namePlaceholder}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                    />
                  </div>

                  <div className="donation-custom">
                    <label className="donation-custom-label">{i18n.emailLabel}</label>
                    <input
                      type="email"
                      className="donation-custom-input"
                      placeholder={i18n.emailPlaceholder}
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <p style={{ color: '#b71c1c', fontSize: '0.85rem', marginTop: '8px' }}>
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-primary donation-cta-big"
                  disabled={isProcessing}
                >
                  {isProcessing
                    ? i18n.processing
                     : getFinalAmount() > 0
                       ? i18n.donateWithAmount(formatCurrency(getFinalAmount()))
                       : i18n.donateNow}
                </button>

                <p className="donation-cta-note">
                  {i18n.payNote}
                </p>
              </form>
            </div>

            <div className="donation-panel-right">
              <img src="/IMG_1101.jpg" alt={i18n.rightImgAlt} style={{width: '100%', borderRadius: '18px', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.12)', display: 'block', margin: '0 auto'}} />
            </div>
          </div>
        </div>

        {/* Story Section - below donation form */}
        <div className="post-event-story">
          <div className="post-event-section">
            <div className="post-event-section-title">{i18n.whyTitle}</div>
            <p className="post-event-text">
              {i18n.whyP1}
            </p>
            <p className="post-event-text">
              {i18n.whyP2}
            </p>
            <div className="post-event-image-block post-event-image-block--clinic">
              <img src="/resita populatie.jpg" alt={i18n.whyImgAlt} />
            </div>
          </div>

          <div className="post-event-section">
            <div className="post-event-section-title">{i18n.hospitalTitle}</div>
            <p className="post-event-text">
              {i18n.hospitalP1}
            </p>
            <p className="post-event-text">
              {i18n.hospitalP2}
            </p>
            <div className="post-event-image-block post-event-image-block--history">
              <img src="/2016.jpg" alt={i18n.hospitalImgAlt} />
            </div>
          </div>

        </div>

        {/* Shorts Carousel Section */}
        <section className="shorts-carousel">
          <div className="shorts-carousel-header">
            <h2>Celebrități care susțin campania Muzică pentru Viață</h2>
            <p>Clipuri scurte verticale cu mesaje de susținere pentru spitalul oncologic din Reșița.</p>
          </div>
          <div className="shorts-carousel-frame-wrapper">
            <button
              type="button"
              className="shorts-carousel-nav shorts-carousel-nav-prev"
              onClick={handlePrevShort}
              aria-label="Previous video"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="shorts-carousel-frame">
              <iframe
                key={currentShortIndex}
                src={`https://www.youtube.com/embed/${getVideoId(shortsVideos[currentShortIndex]?.youtubeUrl)}?rel=0&modestbranding=1&playsinline=1&autoplay=0&controls=1&showinfo=0&iv_load_policy=3`}
                title={`YouTube Short ${currentShortIndex + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px',
                  border: 'none'
                }}
              />
            </div>
            <button
              type="button"
              className="shorts-carousel-nav shorts-carousel-nav-next"
              onClick={handleNextShort}
              aria-label="Next video"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="shorts-carousel-dots" aria-hidden="true">
            {shortsVideos.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={
                  'shorts-carousel-dot' +
                  (index === currentShortIndex ? ' shorts-carousel-dot-active' : '')
                }
                onClick={() => goToShort(index)}
              />
            ))}
          </div>
        </section>

        {/* Share Section */}
        <section className="share-section">
          <div className="share-section-header">
            <h2>Împarte cauza noastră</h2>
            <p>Distribuie mesajul nostru și ajută-ne să ajungem la mai mulți oameni care pot contribui la construirea spitalului oncologic din Reșița.</p>
          </div>

          <div className="share-buttons-container">
            <button
              className="share-button facebook-share"
              onClick={() => handleShare('facebook')}
              aria-label="Share on Facebook"
            >
              <span className="share-button-text">Facebook</span>
            </button>

            <button
              className="share-button whatsapp-share"
              onClick={() => handleShare('whatsapp')}
              aria-label="Share on WhatsApp"
            >
              <span className="share-button-text">WhatsApp</span>
            </button>

            <button
              className="share-button instagram-share"
              onClick={() => handleShare('instagram')}
              aria-label="Share on Instagram"
            >
              <span className="share-button-text">Instagram</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
