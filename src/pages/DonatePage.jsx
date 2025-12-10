import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const EVENT_DATE = new Date(2025, 11, 14, 19, 0, 0);

// EuPlatesc configuration - ALL sensitive values come from backend in production
// Local development uses placeholder values that won't work with real EuPlatesc
// The actual merchant ID and secret key are stored securely in Netlify environment variables
const MERCHANT_ID = ''; // Will be provided by backend in production
const SECRET_KEY = ''; // Will be provided by backend in production
const ENDPOINT = 'https://secure.euplatesc.ro/tdsprocess/tranzactd.php';

export default function DonatePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Donation state (post-event)
  const [selectedAmount, setSelectedAmount] = useState(1); // EUR (smaller default for testing)
  const [customAmount, setCustomAmount] = useState('');
  const [donationMode, setDonationMode] = useState('monthly'); // 'monthly' | 'once'
  const [donorName, setDonorName] = useState(''); // Donor name field

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 50;

      setIsScrolled(scrolled);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Donation logic (EuPlătesc)
  // Allow smaller amounts for testing - can be changed back to [10, 25, 50, 100] for production
  const presetAmounts = [1, 5, 10, 25]; // EUR (smaller amounts for testing)

  const parsedCustom =
    customAmount !== ''
      ? parseFloat(customAmount.replace(',', '.'))
      : NaN;

  const effectiveAmountEur =
    customAmount !== '' && !Number.isNaN(parsedCustom) && parsedCustom > 0
      ? parsedCustom
      : selectedAmount;

  const ronAmount = effectiveAmountEur ? parseFloat((effectiveAmountEur * 5).toFixed(2)) : 0;

  // Approximate brick calculation: 1 cărămidă ≈ 2.40 RON
  const BRICK_RON_VALUE = 2.4;
  const bricksCount =
    ronAmount && ronAmount > 0 ? Math.max(1, Math.round(ronAmount / BRICK_RON_VALUE)) : 0;

  // Change image based on how many bricks you contribute
  let brickImageSrc = '/16.jpg';
  let brickImageAlt = 'Public la evenimentul Muzică pentru Viață în Reșița';

  if (bricksCount >= 10 && bricksCount < 40) {
    brickImageSrc = '/resita.jpg';
    brickImageAlt = 'Reșița – orașul în care construim spitalul oncologic';
  } else if (bricksCount >= 40) {
    brickImageSrc = '/tmk-resita-4-1200x675.jpg';
    brickImageAlt = 'Reșița industrială – un viitor construit cărămidă cu cărămidă';
  }

  const handlePresetClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  // Function to calculate FP_HASH for EuPlatesc (local development only)
  // In production, this function is not used - all hash calculation happens in the Netlify function
  const calculateFPHash = (amount, currency, invoiceId, orderDesc, timestamp, nonce) => {
    try {
      // Fields for MAC calculation (in exact order as per EuPlatesc docs)
      const fieldsForMac = [
        amount,
        currency,
        invoiceId,
        orderDesc,
        MERCHANT_ID,
        timestamp,
        nonce,
      ];

      // Build MAC source string: length(value) + value for each field
      let macSource = '';
      fieldsForMac.forEach(value => {
        macSource += value.length + value;
      });

      // Debug logging
      console.log('=== FP_HASH DEBUG INFO ===');
      console.log('Field values:', {
        amount: amount,
        currency: currency,
        invoiceId: invoiceId,
        orderDesc: orderDesc,
        merch_id: MERCHANT_ID,
        timestamp: timestamp,
        nonce: nonce
      });
      console.log('MAC Source String:', macSource);
      console.log('Secret Key (first 6 chars):', SECRET_KEY.substring(0, 6) + '...');

      // In production, this will return a placeholder since the real hash comes from the backend
      // For local development, you would need to load CryptoJS via CDN or install it
      console.log('FP_HASH calculation would happen here in local development');
      console.log('In production, the Netlify function calculates the real hash');
      console.log('=========================');

      // Return a placeholder hash for local development
      // Real hash calculation happens in the Netlify function using environment variables
      return 'local-development-hash-placeholder';
    } catch (error) {
      console.error('Error calculating FP_HASH:', error);
      return 'error-calculating-hash';
    }
  };

  const handleDonateClick = async (e) => {
    e.preventDefault();
    const amountRon = ronAmount && ronAmount > 0 ? ronAmount : 0;
    if (!amountRon) return;

    try {
      // For local development, use a mock response
      // In production, this will call the Netlify function
      // Check if we should force production mode (for testing deployed sites)
      const forceProduction = window.location.search.includes('forceProduction=true');
      const isLocalDevelopment = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && !forceProduction;
      console.log('Payment environment:', isLocalDevelopment ? 'Local Development' : 'Production');
      console.log('Force production mode:', forceProduction);

      let paymentData;

      if (isLocalDevelopment) {
        // Generate proper payment data with calculated hash for local development
        const amountValue = amountRon.toFixed(2);
        const currencyValue = 'RON';
        const invoiceIdValue = 'MPV-' + Date.now();
        const orderDescValue = donorName
          ? `Donație Muzică pentru Viață - ${donationMode === 'monthly' ? 'Lunar' : 'Unică'} - ${donorName}`
          : `Donație Muzică pentru Viață - ${donationMode === 'monthly' ? 'Lunar' : 'Unică'}`;

        // Generate timestamp (match working example exactly)
        const now = new Date();
        const timestampValue = now.getUTCFullYear().toString() +
                              (now.getUTCMonth() + 1).toString().padStart(2, '0') +
                              now.getUTCDate().toString().padStart(2, '0') +
                              now.getUTCHours().toString().padStart(2, '0') +
                              now.getUTCMinutes().toString().padStart(2, '0') +
                              now.getUTCSeconds().toString().padStart(2, '0');
        const nonceValue = Math.random().toString(36).substring(2, 18) + Math.random().toString(36).substring(2, 18);

        // Calculate hash using the exact field names that will be sent to EuPlatesc
        const fpHash = calculateFPHash(amountValue, currencyValue, invoiceIdValue, orderDescValue, timestampValue, nonceValue);

        paymentData = {
          amount: amountValue,
          curr: currencyValue,
          invoice_id: invoiceIdValue,
          order_desc: orderDescValue,
          merch_id: MERCHANT_ID,
          timestamp: timestampValue,
          nonce: nonceValue,
          fp_hash: fpHash,
          email: '',
          back_to_site: window.location.origin + '/',
          endpoint: ENDPOINT,
        };
      } else {
        // Production: Call Netlify function
        console.log('Calling Netlify function with amount:', amountRon);
        const response = await fetch('/.netlify/functions/initiate-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountRon,
            currency: 'RON',
            orderDesc: donorName
              ? `Donație Muzică pentru Viață - ${donationMode === 'monthly' ? 'Lunar' : 'Unică'} - ${donorName}`
              : `Donație Muzică pentru Viață - ${donationMode === 'monthly' ? 'Lunar' : 'Unică'}`,
            email: '', // Optional, can be collected later if needed
          }),
        });

        console.log('Netlify function response status:', response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Netlify function error:', errorText);
          throw new Error('Payment initiation failed: ' + errorText);
        }

        paymentData = await response.json();
        console.log('Payment data received:', paymentData);
      }

      // Create and submit form to EuPlatesc
      console.log('Submitting payment form to EuPlatesc...');
      console.log('Form data:', paymentData);

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentData.endpoint;
      form.style.display = 'none';
      form.target = '_blank'; // Open in new tab for better visibility

      // Add all required fields
      Object.keys(paymentData).forEach(key => {
        if (key !== 'endpoint') {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = paymentData[key];
          form.appendChild(input);
        }
      });

      document.body.appendChild(form);

      // Add a delay to ensure form is properly added to DOM
      setTimeout(() => {
        console.log('Form submission initiated');
        form.submit();

        // Show feedback to user
        alert('Payment form submitted to EuPlatesc. Check the new browser tab/window for the payment page.');

        // Remove the form after submission
        setTimeout(() => {
          document.body.removeChild(form);
        }, 5000);
      }, 100);

    } catch (error) {
      console.error('Payment error:', error);
      alert('A apărut o eroare la inițierea plății. Vă rugăm să încercați din nou.');
    }
  };

  // Always show post-event page (live donation page)
  return (
    <>
      {/* Desktop header (same as other pages) */}
      <header className="site-header">
        <img
          src="/Logo Muzica pentru viata.svg"
          alt="Muzică pentru Viață"
          className="logo-main-top"
        />
      </header>

      {/* Mobile Header with Donate Button */}
      <header className="mobile-header-donate">
        <div className={`mobile-header-normal ${isScrolled ? 'hide' : ''}`}>
          <div className="mobile-logo-center">
            <img
              src="/Logo Muzica pentru viata.svg"
              alt="Muzică pentru Viață"
              style={{ height: '60px', maxWidth: '100%' }}
            />
          </div>
          <a
            className="btn-primary mobile-donate-left"
            href="https://oncohelp.ro/donatii/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '1.2rem', padding: '12px 18px' }}
          >
            DONEAZĂ ACUM
          </a>
          <nav className="mobile-nav mobile-hamburger-right">
            <button
              className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Deschide meniul"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </nav>
        </div>

        <div className={`mobile-header-compact ${isScrolled ? 'active' : ''}`}>
          <div></div>
          <a
            className="btn-primary"
            href="https://oncohelp.ro/donatii/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '1.35rem', padding: '15px 30px' }}
          >
            DONEAZĂ ACUM
          </a>
          <div></div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <button
            className="mobile-drawer-close"
            onClick={closeMobileMenu}
            aria-label="Închide meniul"
          >
            ×
          </button>

          <div className="mobile-drawer-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Donează
            </NavLink>

            <NavLink
              to="/live"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Live & Video
            </NavLink>

            <NavLink
              to="/galerie"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Galerie
            </NavLink>

            <NavLink
              to="/despre-oncohelp"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Despre OncoHelp
            </NavLink>

            <NavLink
              to="/despre-resita"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Despre Reșița
            </NavLink>

            <NavLink
              to="/multumiri"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Peretele Eroilor
            </NavLink>

            <NavLink
              to="/sponsori"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Sponsori
            </NavLink>
          </div>

          <a
            className="btn-primary mobile-nav-donate"
            href="https://oncohelp.ro/donatii/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            DONEAZĂ ACUM
          </a>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="site-nav desktop-nav" aria-label="Navigație principală">
        <div className="site-nav-inner">
          <div className="site-nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Donează
            </NavLink>

            <NavLink
              to="/live"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Live & Video
            </NavLink>

            <NavLink
              to="/galerie"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Galerie
            </NavLink>

            <NavLink
              to="/despre-oncohelp"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Despre OncoHelp
            </NavLink>

            <NavLink
              to="/despre-resita"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Despre Reșița
            </NavLink>

            <NavLink
              to="/multumiri"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Peretele Eroilor
            </NavLink>

            <NavLink
              to="/sponsori"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Sponsori
            </NavLink>
          </div>

          <a
            className="btn-primary nav-donate"
            href="https://oncohelp.ro/donatii/"
            target="_blank"
            rel="noopener noreferrer"
          >
            DONEAZĂ ACUM
          </a>
        </div>
      </nav>

      <div className="homepage-wrapper post-event-wrapper">
        <main className="post-event-grid">
          <section
            className="hero-main donation-panel page-enter-bottom"
            aria-labelledby="post-hero-title"
          >
            <div className="donation-panel-inner">
              <div className="donation-panel-left">
                <p className="tagline">După concert, puterea ta de a schimba vieți rămâne.</p>

                <h1 id="post-hero-title">
                  Continuăm să construim{' '}
                  <span className="highlight">primul spital pentru pacienții cu cancer</span> din
                  Reșița.
                </h1>

                <div className="donation-mode-tabs">
                  <button
                    type="button"
                    className={
                      'donation-mode-tab' +
                      (donationMode === 'monthly' ? ' donation-mode-tab--active' : '')
                    }
                    onClick={() => setDonationMode('monthly')}
                  >
                    Lunar
                  </button>
                  <button
                    type="button"
                    className={
                      'donation-mode-tab' +
                      (donationMode === 'once' ? ' donation-mode-tab--active' : '')
                    }
                    onClick={() => setDonationMode('once')}
                  >
                    O singură dată
                  </button>
                </div>

                <div className="donation-summary">
                  {effectiveAmountEur ? (
                    <>
                      {donationMode === 'monthly' ? 'Donezi lunar ' : 'Donezi o singură dată '}
                      <strong>
                        {Number.isNaN(effectiveAmountEur) ? '' : effectiveAmountEur} €
                      </strong>{' '}
                      (aprox. <strong>{ronAmount} RON</strong>), adică contribui la aproximativ{' '}
                      <strong>{bricksCount || 1} {bricksCount === 1 ? 'cărămidă' : 'cărămizi'}</strong>{' '}
                      pentru spitalul oncologic din Reșița.
                      {donorName && ` Numele tău "${donorName}" va apărea pe Peretele Eroilor.`}
                    </>
                  ) : (
                    <>
                      Alege o sumă de mai jos sau introdu o valoare personalizată. Vom calcula automat
                      câte <strong>cărămizi</strong> adaugi la construcția spitalului.
                    </>
                  )}
                </div>

                {/* Sume presetate – selectează rapid o donație */}
                <div className="donation-amounts-grid">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={
                        'donation-amount-button' +
                        (customAmount === '' && selectedAmount === amount
                          ? ' donation-amount-button--active'
                          : '')
                      }
                      onClick={() => handlePresetClick(amount)}
                    >
                      <span className="donation-amount-main">{amount} €</span>
                      <span className="donation-amount-ron">≈ {Math.round(amount * 5)} RON</span>
                    </button>
                  ))}
                </div>

                <div className="donation-custom">
                  <label className="donation-custom-label" htmlFor="custom-amount">
                    Sau introdu altă sumă (în euro, se transformă automat în RON pe pagina de plată):
                  </label>
                  <div className="donation-custom-input-row">
                    <input
                      id="custom-amount"
                      type="number"
                      min="0.01"
                      step="0.01"
                      className="donation-custom-input"
                      placeholder="Ex: 0.50, 1.00, 5.00"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                  </div>
                </div>

                {/* Donor Name Field */}
                <div className="donation-custom" style={{ marginTop: '20px' }}>
                  <label className="donation-custom-label" htmlFor="donor-name">
                    Numele tău (opțional - pentru a apărea pe Peretele Eroilor):
                  </label>
                  <div className="donation-custom-input-row">
                    <input
                      id="donor-name"
                      type="text"
                      className="donation-custom-input"
                      placeholder="Ex: Ion Popescu"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary donation-cta-big"
                  onClick={handleDonateClick}
                  disabled={!ronAmount}
                >
                  DONEAZĂ ACUM PRIN EUPLĂTEȘC
                </button>

                <p className="donation-cta-note">
                  Vei fi redirecționat către pagina securizată EuPlătesc.ro, unde suma ta va fi
                  setată automat în RON. Tranzacția este procesată în siguranță, iar fondurile merg
                  direct către Fundația OncoHelp.
                </p>
              </div>

              <aside className="donation-panel-right">
                <div className="brick-visual">
                  <p className="brick-visual-title">Contribuția ta în cărămizi</p>
                  <div className="brick-visual-count">
                    <span className="brick-visual-number">
                      {bricksCount || '—'}
                    </span>
                    <span className="brick-visual-label">
                      {bricksCount === 1 ? 'cărămidă' : 'cărămizi'}
                    </span>
                  </div>
                  <p className="brick-visual-text">
                    {donationMode === 'monthly'
                      ? 'Donația ta lunară ridică spitalul cărămidă cu cărămidă, lună de lună, pentru pacienții din Banatul de Munte.'
                      : 'Cu această donație unică ajuți la construirea spitalului oncologic din Reșița, cărămidă cu cărămidă.'}
                  </p>
                  <div className="brick-visual-image">
                    <img src={brickImageSrc} alt={brickImageAlt} />
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <aside
            className="aside post-event-story page-enter-right"
            aria-label="Povestea campaniei Muzică pentru Viață"
          >
            <div className="post-event-section">
              <h2 className="post-event-section-title">Ce este Muzică pentru Viață</h2>
              <p className="post-event-text">
                Muzică pentru Viață a pornit din Reșița, din dorința de a transforma emoția unui
                concert într-un proiect care schimbă vieți. În fiecare an, oameni din tot Banatul
                de Munte se adună pentru a susține pacienții cu cancer.
              </p>
              <div className="post-event-image-block post-event-image-block--history">
                <img
                  src="/16.jpg"
                  alt="Public la evenimentul Muzică pentru Viață în Reșița"
                />
              </div>
            </div>

            <div className="post-event-section">
              <h2 className="post-event-section-title">
                De ce construim un spital oncologic la Reșița
              </h2>
              <p className="post-event-text">
                Astăzi, mulți pacienți din Banatul de Munte sunt nevoiți să străbată sute de
                kilometri pentru tratament. Un spital oncologic aici, în Reșița, înseamnă
                drumuri mai scurte, mai puțină suferință pe drumuri și mai mult timp petrecut
                alături de familie.
              </p>
              <div className="post-event-image-block post-event-image-block--clinic">
                <img
                  src="/resita.jpg"
                  alt="Reșița – orașul în care construim spitalul oncologic"
                />
              </div>
            </div>

            <div className="post-event-section">
              <h2 className="post-event-section-title">Cum poți ajuta chiar acum</h2>
              <p className="post-event-text">
                Fie că donezi o sumă mică sau mare, vorbești cu prietenii tăi despre proiect sau
                distribui campania în mediul online, devii parte din comunitatea care construiește
                speranță, aici, în Banatul de Munte.
              </p>
              <div className="post-event-image-block post-event-image-block--live">
                <img
                  src="/WhatsApp Image 2025-12-02 at 16.19.50.jpeg"
                  alt="Voluntari și public la Muzică pentru Viață"
                />
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* Footer - Added to DonatePage */}
      <footer className="app-footer">
        <div className="app-footer-inner">
          <section className="footer-top">
            <p className="footer-tagline">
              Muzică pentru Viață • Împreună pentru pacienții cu cancer din Banatul de Munte
            </p>
          </section>

          <section className="footer-logos" aria-label="Beneficiar, organizator și sponsori">
            <div className="footer-logos-row">
              <div className="footer-column">
                <span className="footer-column-title">Beneficiar donații</span>
                <div className="footer-logo-main footer-logo-main--oncohelp">
                  <img src="/onco-help-logo-d.png" alt="Fundația OncoHelp" />
                </div>
              </div>

              <div className="footer-column">
                <span className="footer-column-title">Organizat de</span>
                <div className="footer-logo-main footer-logo-main--radio" data-fallback-text="Radio România Reșița">
                  <img
                    src="/Logo Radio Romania Resita.svg"
                    alt="Radio România Reșița"
                    onError={(e) => {
                      console.error('Radio Romania Resita logo failed to load');
                      e.target.style.display = 'none';
                      e.target.parentElement.style.minHeight = '70px';
                      e.target.parentElement.style.justifyContent = 'center';
                    }}
                    style={{
                      maxHeight: '70px',
                      objectFit: 'contain',
                      filter: 'grayscale(0.15)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
              </div>

              <div className="footer-column">
                <span className="footer-column-title">Sponsori și parteneri</span>
                <div className="footer-sponsor-grid">
                  <img src="/dacus_logo_site.png" alt="Dacus" />
                  <img
                    src="/skyro-LOGO-6A-final -without tagline-01.png"
                    alt="Sky Radio"
                  />
                </div>
              </div>
            </div>
          </section>

          <section
            className="audio-section"
            aria-label="Ascultă piesa Muzică pentru Viață 2025"
          >
            <audio controls preload="none">
              <source src="/Muzică pentru Viață 2025.mp3" type="audio/mpeg" />
              Browserul dumneavoastră nu suportă redarea audio.
            </audio>
          </section>

          <section className="footer-legal">
            <div className="footer-legal-links">
              <NavLink to="/termeni-si-conditii" className="footer-legal-link">
                Termeni și condiții
              </NavLink>
              <span className="footer-legal-separator">|</span>
              <NavLink to="/politica-de-confidentialitate" className="footer-legal-link">
                Politica de confidențialitate
              </NavLink>
            </div>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Muzică pentru Viață. Toate drepturile rezervate.
            </p>
            {/* WhatsApp Contact - Improved styling and positioning */}
            <div className="footer-whatsapp-container" style={{
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid #e0e0e0',
              width: '100%',
              textAlign: 'center'
            }}>
              <a
                href="https://wa.me/0751288777"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-whatsapp-link"
                style={{
                  color: '#25D366',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  display: 'inline-block',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(37, 211, 102, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.1)'}
              >
                Contact WhatsApp: 0751288777
              </a>
            </div>
          </section>
        </div>
      </footer>
    </>
  );
}