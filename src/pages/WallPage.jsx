import React, { useEffect, useRef, useState } from 'react';
import { useDonors, getDonorSizeClass } from '../DonorContext.jsx';

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
  const { donors } = useDonors();
  const containerRef = useRef(null);
  const [namesPerLine, setNamesPerLine] = useState([]);

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
          <span className="app-section-overline">Mulțumim din inimă</span>
          <h1 id="wall-title" className="app-section-title">
            Peretele Eroilor
          </h1>
          <p className="app-section-lead">
            Fiecare nume de aici înseamnă o poveste. Unele sunt scrise cu emoție, altele cu
            dor. Toate însă spun același lucru: &quot;Sunt aici. Contezi.&quot;
          </p>
        </div>

        <div className="donor-wall-flow" ref={containerRef}>
          {donors.map((donor, index) => {
            const sizeClass = getDonorSizeClass(donor.amount);
            const animClass = getRandomAnimation(index);
            const margins = getRandomMargins(index);
            const classes = ['donor-name-simple', sizeClass, animClass];
            // No highlighting on general wall
            return (
              <React.Fragment key={donor.id}>
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
                    {donor.name}
                  </span>
                </div>
                {index < donors.length - 1 && <div className="donor-separator" />}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </div>
  );
}