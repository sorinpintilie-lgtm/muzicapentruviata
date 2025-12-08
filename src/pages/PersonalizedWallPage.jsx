import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const { donorName } = useParams();
  const { donors } = useDonors();
  const highlightedRef = useRef(null);
  
  // Decode the donor name from URL
  const decodedDonorName = decodeURIComponent(donorName || '');
  
  // Reorder donors to put the highlighted one in the second column of a row (middle position)
  const reorderedDonors = React.useMemo(() => {
    const highlightedIndex = donors.findIndex(
      d => d.name.toLowerCase() === decodedDonorName.toLowerCase()
    );

    if (highlightedIndex === -1) return donors;

    const donorsCopy = [...donors];

    // For 2-column grid, we want highlighted in second column (positions 1, 3, 5, etc.)
    // Choose a row in the middle, position 1 (second in first row), or 3, etc.
    let targetPosition = 1; // Start with second position

    // If more than 2 donors, choose a middle row
    if (donors.length > 4) {
      const middleRow = Math.floor(donors.length / 4); // Approximate middle row
      targetPosition = middleRow * 2 + 1; // Second column of that row
    }

    // Ensure within bounds
    targetPosition = Math.min(targetPosition, donors.length - 1);

    // Swap highlighted donor with the target position
    [donorsCopy[highlightedIndex], donorsCopy[targetPosition]] =
    [donorsCopy[targetPosition], donorsCopy[highlightedIndex]];

    return donorsCopy;
  }, [donors, decodedDonorName]);
  
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

  return (
    <div className="app-content">
      <section className="app-section wall-section" aria-labelledby="wall-title">
        <div className="app-section-header">
          <span className="app-section-overline">Mulțumim din inimă</span>
          <h1 id="wall-title" className="app-section-title">
            {decodedDonorName}, parte dintre eroi!
          </h1>
          <p className="app-section-lead">
            Numele tău strălucește printre toți cei care au ales să facă diferența.
            Fiecare gest contează, iar tu ai ales să fii parte din această poveste.
          </p>
        </div>

        <div className="donor-wall-flow">
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