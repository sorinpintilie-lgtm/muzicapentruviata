import React, { useState, useRef, useEffect } from 'react';

export default function GlobalRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef(null);

  // Load visibility preference from localStorage
  useEffect(() => {
    const savedVisibility = localStorage.getItem('radioPlayerVisible');
    if (savedVisibility !== null) {
      setIsVisible(savedVisibility === 'true');
    }
  }, []);

  // Save visibility preference to localStorage
  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    localStorage.setItem('radioPlayerVisible', newVisibility.toString());
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  // Allow external controls (e.g. Live & Video page button) to toggle the global radio
  useEffect(() => {
    const handleExternalToggle = async () => {
      if (!audioRef.current) return;
      try {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        // isPlaying state will be updated via audio onPlay/onPause handlers
      } catch (error) {
        console.error('Error toggling global radio from external control:', error);
      }
    };

    window.addEventListener('global-radio-toggle', handleExternalToggle);
    return () => {
      window.removeEventListener('global-radio-toggle', handleExternalToggle);
    };
  }, []);

  // Don't render if hidden
  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="radio-toggle-button"
        aria-label="Afișează player radio"
        title="Afișează Radio Reșița"
      >
        Radio
      </button>
    );
  }

  return (
    <>
      <div className="global-radio-player">
        <div className="radio-player-content">
          <div className="radio-info">
            <span className="radio-station">Radio Reșița</span>
            <span className="radio-status">
              {isPlaying ? '• Live' : '• Oprit'}
            </span>
          </div>

          <button
            onClick={togglePlay}
            className="radio-control-button"
            aria-label={isPlaying ? "Oprește Radio Reșița" : "Porneste Radio Reșița"}
          >
            <span className="play-symbol">{isPlaying ? '⏸' : '▶'}</span>
          </button>

          <button
            onClick={toggleVisibility}
            className="radio-hide-button"
            aria-label="Ascunde player radio"
            title="Ascunde player"
          >
            ×
          </button>
        </div>

        <audio
          ref={audioRef}
          preload="none"
          className="radio-audio-hidden"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src="/api/radio-proxy" type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
}