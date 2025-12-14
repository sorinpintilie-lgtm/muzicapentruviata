import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDonors, getDonorSizeClass } from '../DonorContext.jsx';
import html2canvas from 'html2canvas';
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

function shouldAddRowSpacer(index, reorderedDonors, decodedDonorName) {
  // Find the highlighted donor index
  const highlightedIndex = reorderedDonors.findIndex(
    d => d.name.toLowerCase() === decodedDonorName.toLowerCase()
  );

  // Force exactly 3 names on the highlighted donor's line
  // Never add spacers that would break this arrangement
  const isInHighlightedLine = index >= highlightedIndex - 1 && index <= highlightedIndex + 1;

  // Also prevent spacers right before the line that would make it start earlier
  const isBeforeHighlightedLine = index === highlightedIndex - 2;

  if (isInHighlightedLine || isBeforeHighlightedLine) {
    return false;
  }

  // For other lines, add spacers normally but ensure minimum 3 names per line
  const seed = index * 123456789;
  const minNamesPerRow = 3;

  return index > 0 && index % minNamesPerRow === 0 && seededRandom(seed) > 0.4; // 60% chance after minimum
}

function getRowSpacerWidth(index) {
  // Random spacer width between 0-150px for variation
  const seed = index * 987654321;
  return Math.floor(seededRandom(seed) * 150);
}

export default function PersonalizedWallPage() {
  const { lang } = useI18n();
  const { donorName } = useParams();
  const { donors } = useDonors();
  const highlightedRef = useRef(null);
  const wallRef = useRef(null);
  const [isImageDownloading, setIsImageDownloading] = useState(false);
  const [isVideoDownloading, setIsVideoDownloading] = useState(false);

  const i18n = React.useMemo(
    () =>
      ({
        ro: {
          overline: 'Mulțumim din inimă',
          title: (name) => `${name}, parte dintre eroi!`,
          lead:
            'Numele tău strălucește printre toți cei care au ales să facă diferența. Fiecare gest contează, iar tu ai ales să fii parte din această poveste.',
          shareTitle: 'Distribuie recunoștința ta',
          shareSubtitle: 'Trimite prietenilor peretele tău de onoare sau descarcă imaginea și TikTok video.',
          shareFacebook: 'Distribuie pe Facebook',
          shareWhatsApp: 'Trimite pe WhatsApp',
          downloading: 'Se descarcă...',
          downloadImage: 'Descarcă imagine',
          generatingVideo: 'Se generează video...',
          downloadVideo: 'Descarcă TikTok video',
          whatsappText: (url) => `Și eu susțin campania Muzică pentru Viață – vezi peretele meu de onoare:\n\n${url}`,
        },
        en: {
          overline: 'With heartfelt thanks',
          title: (name) => `${name}, one of the heroes!`,
          lead:
            'Your name shines among everyone who chose to make a difference. Every gesture matters—and you chose to be part of this story.',
          shareTitle: 'Share your gratitude',
          shareSubtitle: 'Send your honor wall to friends or download the image and TikTok video.',
          shareFacebook: 'Share on Facebook',
          shareWhatsApp: 'Send on WhatsApp',
          downloading: 'Downloading...',
          downloadImage: 'Download image',
          generatingVideo: 'Generating video...',
          downloadVideo: 'Download TikTok video',
          whatsappText: (url) => `I support Muzică pentru Viață too — see my honor wall:\n\n${url}`,
        },
        de: {
          overline: 'Von Herzen danke',
          title: (name) => `${name}, einer der Held:innen!`,
          lead:
            'Dein Name leuchtet unter all jenen, die sich entschieden haben, einen Unterschied zu machen. Jede Geste zählt – und du bist Teil dieser Geschichte.',
          shareTitle: 'Teile deine Dankbarkeit',
          shareSubtitle: 'Schicke deine Ehrenwand an Freunde oder lade Bild und TikTok-Video herunter.',
          shareFacebook: 'Auf Facebook teilen',
          shareWhatsApp: 'Per WhatsApp senden',
          downloading: 'Wird heruntergeladen...',
          downloadImage: 'Bild herunterladen',
          generatingVideo: 'Video wird erstellt...',
          downloadVideo: 'TikTok-Video herunterladen',
          whatsappText: (url) => `Auch ich unterstütze Muzică pentru Viață – sieh dir meine Ehrenwand an:\n\n${url}`,
        },
        fr: {
          overline: 'Merci de tout cœur',
          title: (name) => `${name}, parmi les héros !`,
          lead:
            'Votre nom brille parmi toutes celles et ceux qui ont choisi de faire la différence. Chaque geste compte, et vous avez choisi de faire partie de cette histoire.',
          shareTitle: 'Partagez votre gratitude',
          shareSubtitle: 'Envoyez votre mur d’honneur à vos amis ou téléchargez l’image et la vidéo TikTok.',
          shareFacebook: 'Partager sur Facebook',
          shareWhatsApp: 'Envoyer sur WhatsApp',
          downloading: 'Téléchargement...',
          downloadImage: "Télécharger l’image",
          generatingVideo: 'Génération de la vidéo...',
          downloadVideo: 'Télécharger la vidéo TikTok',
          whatsappText: (url) => `Moi aussi, je soutiens Muzică pentru Viață – voici mon mur d’honneur :\n\n${url}`,
        },
        it: {
          overline: 'Grazie di cuore',
          title: (name) => `${name}, tra gli eroi!`,
          lead:
            'Il tuo nome brilla tra tutti coloro che hanno scelto di fare la differenza. Ogni gesto conta, e tu hai scelto di far parte di questa storia.',
          shareTitle: 'Condividi la tua gratitudine',
          shareSubtitle: 'Invia ai tuoi amici il tuo muro d’onore o scarica l’immagine e il video TikTok.',
          shareFacebook: 'Condividi su Facebook',
          shareWhatsApp: 'Invia su WhatsApp',
          downloading: 'Download in corso...',
          downloadImage: 'Scarica immagine',
          generatingVideo: 'Generazione video...',
          downloadVideo: 'Scarica video TikTok',
          whatsappText: (url) => `Anch’io sostengo Muzică pentru Viață – guarda il mio muro d’onore:\n\n${url}`,
        },
        es: {
          overline: 'Gracias de corazón',
          title: (name) => `${name}, ¡entre los héroes!`,
          lead:
            'Tu nombre brilla entre todos los que eligieron marcar la diferencia. Cada gesto cuenta, y tú has elegido ser parte de esta historia.',
          shareTitle: 'Comparte tu agradecimiento',
          shareSubtitle: 'Envía tu muro de honor a tus amigos o descarga la imagen y el video de TikTok.',
          shareFacebook: 'Compartir en Facebook',
          shareWhatsApp: 'Enviar por WhatsApp',
          downloading: 'Descargando...',
          downloadImage: 'Descargar imagen',
          generatingVideo: 'Generando video...',
          downloadVideo: 'Descargar video TikTok',
          whatsappText: (url) => `Yo también apoyo Muzică pentru Viață — mira mi muro de honor:\n\n${url}`,
        },
        ar: {
          overline: 'شكرًا من القلب',
          title: (name) => `${name}، من بين الأبطال!`,
          lead:
            'اسمك يلمع بين كل من اختار أن يصنع فرقًا. كل لفتة مهمة، وقد اخترت أن تكون جزءًا من هذه القصة.',
          shareTitle: 'شارك امتنانك',
          shareSubtitle: 'أرسل جدار الشرف لأصدقائك أو قم بتنزيل الصورة وفيديو تيك توك.',
          shareFacebook: 'شارك على فيسبوك',
          shareWhatsApp: 'أرسل عبر واتساب',
          downloading: 'جارٍ التنزيل...',
          downloadImage: 'تنزيل الصورة',
          generatingVideo: 'جارٍ إنشاء الفيديو...',
          downloadVideo: 'تنزيل فيديو تيك توك',
          whatsappText: (url) => `أنا أيضًا أدعم Muzică pentru Viață – شاهد جدار الشرف الخاص بي:\n\n${url}`,
        },
      }[lang] || {}),
    [lang]
  );

  // Decode the donor name from URL
  const decodedDonorName = decodeURIComponent(donorName || '');
  
  // Reorder donors to put the highlighted one a few rows below the top of the wall
  // (2–3 rows down), still surrounded by others and visible on the first screen.
  const reorderedDonors = React.useMemo(() => {
    const highlightedIndex = donors.findIndex(
      d => d.name.toLowerCase() === decodedDonorName.toLowerCase()
    );

    if (highlightedIndex === -1) return donors;

    const donorsCopy = [...donors];

    // Approximate a 2-column layout:
    // row 0 => indexes 0,1 ; row 1 => 2,3 ; row 2 => 4,5 ; row 3 => 6,7 ...
    // We want the highlighted donor on row 2 (3rd row), second column if possible.
    let targetRow = 2; // 0-based => 3rd row
    const maxRow = Math.floor((donors.length - 1) / 2);
    targetRow = Math.min(targetRow, maxRow);

    let targetPosition = targetRow * 2 + 1; // second column on that row

    // Ensure within bounds
    targetPosition = Math.min(targetPosition, donors.length - 1);

    // Swap highlighted donor with the target position
    [donorsCopy[highlightedIndex], donorsCopy[targetPosition]] =
      [donorsCopy[targetPosition], donorsCopy[highlightedIndex]];

    return donorsCopy;
  }, [donors, decodedDonorName]);

  // Share & download handlers for buttons at the top of the page
  const handleDownloadImage = async () => {
    if (isImageDownloading) return;
    setIsImageDownloading(true);
    try {
      if (!wallRef.current) throw new Error('wallRef not set');
      const canvas = await html2canvas(wallRef.current, {
        backgroundColor: null,
        scale: 1,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      const link = document.createElement('a');
      link.download = `${decodedDonorName || 'donor'}_thank_you.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    } catch (e) {
      console.error('Error downloading wall image:', e);
    } finally {
      setIsImageDownloading(false);
    }
  };

  const handleDownloadVideo = async () => {
    if (isVideoDownloading) return;
    setIsVideoDownloading(true);
    try {
      if (!wallRef.current) throw new Error('wallRef not set');
      const canvas = await html2canvas(wallRef.current, {
        backgroundColor: null,
        scale: 1,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      const response = await fetch('/.netlify/functions/generate-tiktok-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageData: dataUrl,
          donorName: decodedDonorName
        })
      });

      if (!response.ok) {
        console.error(
          'Error from generate-tiktok-video function:',
          response.status,
          response.statusText
        );
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${decodedDonorName || 'donor'}_muzica_pentru_viata.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Error generating TikTok video:', e);
    } finally {
      setIsVideoDownloading(false);
    }
  };

  const handleShareFacebook = () => {
    const shareUrl = window.location.href;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const shareUrl = window.location.href;
    const text = i18n.whatsappText(shareUrl);
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  

  return (
    <div className="app-content">
      <section className="app-section wall-section" aria-labelledby="wall-title">
        <div className="app-section-header">
          <span className="app-section-overline">{i18n.overline}</span>
          <h1 id="wall-title" className="app-section-title">
            {i18n.title(decodedDonorName)}
          </h1>
          <p className="app-section-lead">
            {i18n.lead}
          </p>
        </div>

        <div className="share-buttons-section">
          <h2 className="share-section-title">{i18n.shareTitle}</h2>
          <p className="share-section-subtitle">
            {i18n.shareSubtitle}
          </p>
          <div className="share-buttons-container">
            <button
              type="button"
              className="share-button facebook-share"
              onClick={handleShareFacebook}
            >
              <span className="share-button-icon">f</span>
              <span className="share-button-text">{i18n.shareFacebook}</span>
            </button>
            <button
              type="button"
              className="share-button whatsapp-share"
              onClick={handleShareWhatsApp}
            >
              <span className="share-button-icon">↗</span>
              <span className="share-button-text">{i18n.shareWhatsApp}</span>
            </button>
            <button
              type="button"
              className="share-button download-share"
              onClick={handleDownloadImage}
              disabled={isImageDownloading}
            >
              <span className="share-button-icon">⬇</span>
              <span className="share-button-text">
                {isImageDownloading ? i18n.downloading : i18n.downloadImage}
              </span>
            </button>
            <button
              type="button"
              className="share-button download-share"
              onClick={handleDownloadVideo}
              disabled={isVideoDownloading}
            >
              <span className="share-button-icon">▶</span>
              <span className="share-button-text">
                {isVideoDownloading ? i18n.generatingVideo : i18n.downloadVideo}
              </span>
            </button>
          </div>
        </div>

        <div className="donor-wall-flow" ref={wallRef}>
          {reorderedDonors.map((donor, index) => {
            const sizeClass = getDonorSizeClass(donor.amount);
            const animClass = getRandomAnimation(index);
            const margins = getRandomMargins(index);
            const classes = ['donor-name-simple', sizeClass, animClass];

            // Highlight the specific donor's name in red and blur others
            const isHighlighted = donor.name.toLowerCase() === decodedDonorName.toLowerCase();
            if (isHighlighted) {
              classes.push('donor-name-highlighted');
            } else {
              classes.push('donor-name-blurred');
            }

            // Find highlighted donor index for special row handling
            const highlightedIndex = reorderedDonors.findIndex(
              d => d.name.toLowerCase() === decodedDonorName.toLowerCase()
            );

            // ABSOLUTE GUARANTEE: Exactly 3 names on highlighted row
            const isInHighlightedRow = index >= highlightedIndex - 1 && index <= highlightedIndex + 1;
            const shouldForceRowBreakBefore = index === highlightedIndex - 1;
            const shouldForceRowBreakAfter = index === highlightedIndex + 2; // Move to AFTER the right neighbor

            return (
              <React.Fragment key={donor.id}>
                {/* ABSOLUTELY FORCE exactly 3 names on highlighted row */}
                {shouldForceRowBreakBefore && (
                  <div style={{ width: '100%', flexBasis: '100%', height: 0 }} />
                )}
                {shouldForceRowBreakAfter && index < donors.length - 1 && (
                  <div style={{ width: '100%', flexBasis: '100%', height: 0 }} />
                )}
                <div
                  className="donor-name-container"
                  ref={isHighlighted ? highlightedRef : null}
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
                    {donor.name}
                  </span>
                </div>
                {index < donors.length - 1 && !isInHighlightedRow && <div className="donor-separator" />}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </div>
  );
}
