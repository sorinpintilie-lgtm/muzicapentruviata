import React, { useRef, useEffect, useState } from 'react';
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

  // Force exactly 3 names on the highlighted donor's row
  const isInHighlightedRow = index >= highlightedIndex - 1 && index <= highlightedIndex + 1;

  // Also prevent spacers right before the line that would make it start earlier
  const isBeforeHighlightedLine = index === highlightedIndex - 2;

  if (isInHighlightedRow || isBeforeHighlightedLine) {
    return false;
  }

  // For other lines, add spacers normally but ensure minimum 3 names per line
  const seed = index * 123456789;
  const minNamesPerRow = 3;

  return index > 0 && index % minNamesPerRow === 0 && seededRandom(seed) > 0.4; // 60% chance after minimum
}

export default function MobileWallScreenshot() {
  const { lang } = useI18n();
  const { donorName } = useParams();
  const { donors } = useDonors();
  const highlightedRef = useRef(null);

  const i18n = React.useMemo(
    () =>
      ({
        ro: {
          downloadScreenshot: 'Descarcă imagine',
          downloading: 'Se descarcă...',
          downloadVideo: 'Descarcă TikTok Video',
          generatingVideo: 'Se generează video...',
          banner: 'Și eu susțin campania Muzică pentru Viață',
        },
        en: {
          downloadScreenshot: 'Download screenshot',
          downloading: 'Downloading...',
          downloadVideo: 'Download TikTok video',
          generatingVideo: 'Generating video...',
          banner: 'I support Muzică pentru Viață too',
        },
        de: {
          downloadScreenshot: 'Screenshot herunterladen',
          downloading: 'Wird heruntergeladen...',
          downloadVideo: 'TikTok-Video herunterladen',
          generatingVideo: 'Video wird erstellt...',
          banner: 'Auch ich unterstütze Muzică pentru Viață',
        },
        fr: {
          downloadScreenshot: "Télécharger la capture",
          downloading: 'Téléchargement...',
          downloadVideo: 'Télécharger la vidéo TikTok',
          generatingVideo: 'Génération de la vidéo...',
          banner: 'Moi aussi, je soutiens Muzică pentru Viață',
        },
        it: {
          downloadScreenshot: 'Scarica screenshot',
          downloading: 'Download in corso...',
          downloadVideo: 'Scarica video TikTok',
          generatingVideo: 'Generazione video...',
          banner: 'Anch’io sostengo Muzică pentru Viață',
        },
        es: {
          downloadScreenshot: 'Descargar captura',
          downloading: 'Descargando...',
          downloadVideo: 'Descargar video TikTok',
          generatingVideo: 'Generando video...',
          banner: 'Yo también apoyo la campaña Muzică pentru Viață',
        },
        ar: {
          downloadScreenshot: 'تنزيل لقطة شاشة',
          downloading: 'جارٍ التنزيل...',
          downloadVideo: 'تنزيل فيديو تيك توك',
          generatingVideo: 'جارٍ إنشاء الفيديو...',
          banner: 'أنا أيضًا أدعم حملة Muzică pentru Viață',
        },
      }[lang] || {
        downloadScreenshot: 'Download Screenshot',
        downloading: 'Downloading...',
        downloadVideo: 'Download TikTok Video',
        generatingVideo: 'Generating video...',
        banner: 'Muzică pentru Viață',
      }),
    [lang]
  );

  // Decode the donor name from URL
  const decodedDonorName = decodeURIComponent(donorName || '');

  // Reorder donors to put the highlighted one in the middle
  // Only include confirmed donations, but always include the highlighted donor (even if pending)
  const reorderedDonors = React.useMemo(() => {
    // Filter to only confirmed donations, but add back the highlighted donor if they're pending
    let filteredDonors = donors.filter(d => d?.status === 'confirmed');
    const highlightedDonor = donors.find(
      d => d.name.toLowerCase() === decodedDonorName.toLowerCase()
    );

    // If highlighted donor exists but is not in confirmed list, add them
    if (highlightedDonor && !filteredDonors.find(d => d.id === highlightedDonor.id)) {
      filteredDonors = [highlightedDonor, ...filteredDonors];
    }

    const highlightedIndex = filteredDonors.findIndex(
      d => d.name.toLowerCase() === decodedDonorName.toLowerCase()
    );

    if (highlightedIndex === -1) return filteredDonors;

    const donorsCopy = [...donors];

    // Find a position where highlighted donor can be in the middle of a line
    // We want it to have one name on left and one on right
    let targetPosition = Math.floor(donors.length / 2);

    // Ensure the target position is not at the very start or end
    // We want at least one name before and after in the same "line"
    targetPosition = Math.max(1, Math.min(donors.length - 2, targetPosition));

    // Swap highlighted donor with the target position
    [donorsCopy[highlightedIndex], donorsCopy[targetPosition]] =
      [donorsCopy[targetPosition], donorsCopy[highlightedIndex]];

    return donorsCopy;
  }, [donors, decodedDonorName]);

  // Limit to a fixed window of donors around the highlighted one so the wall fits on a single screen
  const visibleDonors = React.useMemo(() => {
    if (!reorderedDonors || reorderedDonors.length === 0) return [];

    const highlightedIndex = reorderedDonors.findIndex(
      d => d.name.toLowerCase() === decodedDonorName.toLowerCase()
    );

    // If we can't find the highlighted donor or list is already small, show all
    const WINDOW_SIZE = 15; // total donors to show (before + after + highlighted)
    if (highlightedIndex === -1 || reorderedDonors.length <= WINDOW_SIZE) {
      return reorderedDonors;
    }

    const half = Math.floor(WINDOW_SIZE / 2);
    let start = highlightedIndex - half;
    let end = highlightedIndex + half + 1; // end is exclusive

    if (start < 0) {
      end += -start;
      start = 0;
    }
    if (end > reorderedDonors.length) {
      start -= (end - reorderedDonors.length);
      end = reorderedDonors.length;
      if (start < 0) start = 0;
    }

    return reorderedDonors.slice(start, end);
  }, [reorderedDonors, decodedDonorName]);

  // Scroll to highlighted name on mount
  useEffect(() => {
    if (highlightedRef.current) {
      setTimeout(() => {
        highlightedRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }, 100);
    }
  }, [decodedDonorName]);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  const downloadScreenshot = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const container = document.querySelector('.mobile-wall-content');
      if (container) {
        const canvas = await html2canvas(container, {
          // Use the CSS background and a 9:16 canvas size without extra upscaling
          backgroundColor: null,
          scale: 1,
          logging: false,
          useCORS: true,
          allowTaint: true
        });

        const link = document.createElement('a');
        link.download = `${decodedDonorName}_thank_you.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
      }
    } catch (error) {
      console.error('Error downloading screenshot:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadVideo = async () => {
    if (isGeneratingVideo) return;

    setIsGeneratingVideo(true);
    try {
      const container = document.querySelector('.mobile-wall-content');
      if (!container) {
        throw new Error('mobile-wall-content not found');
      }

      const canvas = await html2canvas(container, {
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
    } catch (error) {
      console.error('Error generating TikTok video:', error);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="mobile-screenshot-container">
      <button
        className="download-screenshot-btn"
        onClick={downloadScreenshot}
        disabled={isDownloading}
      >
        {isDownloading ? i18n.downloading : i18n.downloadScreenshot}
      </button>
      <button
        className="download-screenshot-btn"
        style={{ bottom: '60px' }}
        onClick={downloadVideo}
        disabled={isGeneratingVideo}
      >
        {isGeneratingVideo ? i18n.generatingVideo : i18n.downloadVideo}
      </button>
      <div className="mobile-wall-content">
        <div className="donor-wall-flow mobile-wall-flow">
          {visibleDonors.map((donor, index) => {
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

            // Find highlighted donor index within the visible window for special row handling
            const highlightedIndex = visibleDonors.findIndex(
              d => d.name.toLowerCase() === decodedDonorName.toLowerCase()
            );

            // ABSOLUTE GUARANTEE: Exactly 3 names on highlighted row
            const isInHighlightedRow = index >= highlightedIndex - 1 && index <= highlightedIndex + 1;
            const shouldForceRowBreakBefore = index === highlightedIndex - 1;
            const shouldForceRowBreakAfter = index === highlightedIndex + 2;

            return (
              <React.Fragment key={donor.id}>
                {/* ABSOLUTELY FORCE exactly 3 names on highlighted row */}
                {shouldForceRowBreakBefore && (
                  <div style={{ width: '100%', flexBasis: '100%', height: 0 }} />
                )}
                {shouldForceRowBreakAfter && index < visibleDonors.length - 1 && (
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
                {index < visibleDonors.length - 1 && !isInHighlightedRow && <div className="donor-separator" />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mobile-wall-footer-banner">
          <span>{i18n.banner}</span>
        </div>
      </div>
    </div>
  );
}
