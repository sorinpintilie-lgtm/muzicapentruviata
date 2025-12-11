import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDonors } from '../DonorContext.jsx';

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
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [highlightForm, setHighlightForm] = useState(false);
  const location = useLocation();

  // Donation state (post-event)
  const [selectedAmount, setSelectedAmount] = useState(5); // RON (smaller default for testing)
  const [customAmount, setCustomAmount] = useState('');
  const [donationMode, setDonationMode] = useState('once'); // 'monthly' | 'once'
  const [donorName, setDonorName] = useState(''); // Donor name field
  const [currency, setCurrency] = useState('RON'); // RON, EUR or USD
  const [locationDetected, setLocationDetected] = useState(false);

  const { addDonor } = useDonors();

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

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Detect user location on component mount
  useEffect(() => {
    detectUserLocation();
  }, []);

  // If navigated with #donation-form anchor, scroll to the form and highlight it briefly
  useEffect(() => {
    if (location.hash === '#donation-form') {
      // Small delay to ensure layout is ready
      setTimeout(() => {
        const el = document.getElementById('donation-form');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);

      setHighlightForm(true);
      const timer = setTimeout(() => setHighlightForm(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // When returning from EuPlătesc, add confirmed donor to Peretele Eroilor
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const completed = params.get('donationCompleted');
    const donorNameFromQuery = params.get('donor_name');
    const amountFromQuery = params.get('donor_amount');
    const donationIdFromQuery = params.get('donation_id');

    if (completed === '1' && donorNameFromQuery && donationIdFromQuery) {
      const storageKey = `mpv_donation_${donationIdFromQuery}`;
      if (!sessionStorage.getItem(storageKey)) {
        const parsedAmount = amountFromQuery
          ? parseFloat(String(amountFromQuery).replace(',', '.'))
          : 0;

        addDonor({
          name: donorNameFromQuery,
          amount: Number.isFinite(parsedAmount) ? parsedAmount : 0,
          message: '',
        });

        sessionStorage.setItem(storageKey, 'true');

        // Clean sensitive query params from URL after processing
        const url = new URL(window.location.href);
        url.searchParams.delete('donationCompleted');
        url.searchParams.delete('donor_name');
        url.searchParams.delete('donor_amount');
        url.searchParams.delete('donation_id');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [addDonor]);

  function calculateTimeLeft() {
    const now = new Date();
    const difference = EVENT_DATE - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isEventOver: true
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isEventOver: false
    };
  }

  // Donation logic (EuPlătesc)
  // Preset amounts for each currency
  const presetAmounts = {
    RON: [5, 25, 50, 100],
    EUR: [1, 5, 10, 25],
    USD: [1, 5, 10, 25]
  };

  // Detect user location and set default currency
  const detectUserLocation = async () => {
    try {
      // Use ipapi.co for IP geolocation (free tier)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data.country_code) {
        let defaultCurrency = 'USD'; // Default for non-Europe

        if (data.country_code === 'RO') {
          // Romania
          defaultCurrency = 'RON';
        } else if (data.continent_code === 'EU') {
          // Europe (excluding Romania)
          defaultCurrency = 'EUR';
        }
        // USD for everywhere else (already set as default)

        console.log('Detected location:', data.country_name, data.country_code, '- Setting currency to:', defaultCurrency);
        setCurrency(defaultCurrency);
      }
    } catch (error) {
      console.error('Failed to detect location:', error);
      // Keep default RON currency
    } finally {
      setLocationDetected(true);
    }
  };


  const parsedCustom =
    customAmount !== ''
      ? parseFloat(customAmount.replace(',', '.'))
      : NaN;

  const effectiveAmount = customAmount !== '' && !Number.isNaN(parsedCustom) && parsedCustom > 0
    ? parsedCustom
    : selectedAmount;

  // Brick calculation only for RON donations
  const BRICK_RON_VALUE = 2.4;
  const bricksCount = (currency === 'RON' && effectiveAmount > 0)
    ? Math.max(1, Math.round(effectiveAmount / BRICK_RON_VALUE))
    : 0;

  // Change image based on how many bricks you contribute (only for RON)
  let brickImageSrc = '/16.jpg';
  let brickImageAlt = 'Public la evenimentul Muzică pentru Viață în Reșița';

  if (currency === 'RON') {
    if (bricksCount >= 10 && bricksCount < 40) {
      brickImageSrc = '/resita.jpg';
      brickImageAlt = 'Reșița – orașul în care construim spitalul oncologic';
    } else if (bricksCount >= 40) {
      brickImageSrc = '/tmk-resita-4-1200x675.jpg';
      brickImageAlt = 'Reșița industrială – un viitor construit cărămidă cu cărămidă';
    }
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
    const amountToSend = effectiveAmount && effectiveAmount > 0 ? effectiveAmount : 0;
    if (!amountToSend) return;

    const safeDonorName = (donorName || '').trim();
    const donationId = Date.now().toString(36) + Math.random().toString(16).slice(2);
    const backToSiteBase = window.location.origin + '/';
    const backToSiteParams =
      safeDonorName
        ? new URLSearchParams({
            donationCompleted: '1',
            donor_name: safeDonorName,
            donor_amount: amountToSend.toFixed(2),
            donation_id: donationId,
          })
        : null;

    try {
      // For local development, use a mock response
      // In production, this will call the Netlify function
      // Check if we should force production mode (for testing deployed sites)
      const forceProduction = window.location.search.includes('forceProduction=true');
      const isLocalDevelopment =
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && !forceProduction;
      console.log('Payment environment:', isLocalDevelopment ? 'Local Development' : 'Production');
      console.log('Force production mode:', forceProduction);

      let paymentData;

      if (isLocalDevelopment) {
        // Generate proper payment data with calculated hash for local development
        const amountValue = amountToSend.toFixed(2);
        const currencyValue = currency;
        const invoiceIdValue = 'MPV-' + Date.now();
        const orderDescValue = safeDonorName
          ? `Donație Muzică pentru Viață - ${donationMode === 'monthly' ? 'Lunar' : 'Unică'} - ${safeDonorName}`
          : `Donație Muzică pentru Viață - ${donationMode === 'monthly' ? 'Lunar' : 'Unică'}`;

        // Generate timestamp (match working example exactly)
        const now = new Date();
        const timestampValue =
          now.getUTCFullYear().toString() +
          (now.getUTCMonth() + 1).toString().padStart(2, '0') +
          now.getUTCDate().toString().padStart(2, '0') +
          now.getUTCHours().toString().padStart(2, '0') +
          now.getUTCMinutes().toString().padStart(2, '0') +
          now.getUTCSeconds().toString().padStart(2, '0');
        const nonceValue =
          Math.random().toString(36).substring(2, 18) +
          Math.random().toString(36).substring(2, 18);

        // Calculate hash using the exact field names that will be sent to EuPlatesc
        const fpHash = calculateFPHash(
          amountValue,
          currencyValue,
          invoiceIdValue,
          orderDescValue,
          timestampValue,
          nonceValue
        );

        const backToSite =
          backToSiteParams && safeDonorName
            ? `${backToSiteBase}?${backToSiteParams.toString()}`
            : backToSiteBase;

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
          back_to_site: backToSite,
          endpoint: ENDPOINT,
        };
      } else {
        // Production: Call Netlify function
        console.log('Calling Netlify function with amount:', amountToSend, 'currency:', currency);
        const response = await fetch('/.netlify/functions/initiate-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountToSend,
            currency: currency,
            orderDesc: safeDonorName
              ? `Donație Muzică pentru Viață - ${donationMode === 'monthly' ? 'Lunar' : 'Unică'} - ${safeDonorName}`
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

        if (backToSiteParams && safeDonorName) {
          const backToSite = `${backToSiteBase}?${backToSiteParams.toString()}`;
          paymentData.back_to_site = backToSite;
        }
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

  // Show pre-event countdown page (before the concert)
  return (
    <>
      <div className="homepage-wrapper post-event-wrapper">
        <main className="post-event-grid">
          {/* Left column: Donation form */}
          <section
            id="donation-form"
            className={
              'hero-main donation-panel page-enter-bottom' +
              (highlightForm ? ' donation-form-highlight' : '')
            }
            aria-labelledby="pre-hero-title"
          >
            <div className="donation-panel-inner">
              <div className="donation-panel-left">
                <p className="tagline">Un gest mic poate schimba o lume.</p>

                <h1 id="pre-hero-title">
                  Împreună construim{' '}
                  <span className="highlight">primul spital pentru pacienții cu cancer</span> din
                  Reșița.
                </h1>

                <p className="pre-event-subtitle">
                  Fiecare cărămidă contează. Fiecare donație aduce speranță.
                </p>

                <div className="donation-mode-tabs">
                  <button
                    type="button"
                    className="donation-mode-tab donation-mode-tab--disabled"
                    disabled={true}
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
                  {effectiveAmount ? (
                    <>
                      {donationMode === 'monthly' ? 'Donezi lunar ' : 'Donezi o singură dată '}
                      <strong>
                        {Number.isNaN(effectiveAmount) ? '' : effectiveAmount} {currency}
                      </strong>
                      {currency === 'RON' && bricksCount > 0 && (
                        <>, adică contribui la aproximativ{' '}
                        <strong>{bricksCount} {bricksCount === 1 ? 'cărămidă' : 'cărămizi'}</strong>{' '}
                        pentru spitalul oncologic din Reșița.
                      </>
                      )}
                      {donorName && ` Numele tău "${donorName}" va apărea pe Peretele Eroilor.`}
                    </>
                  ) : (
                    <>
                      Alege o sumă de mai jos sau introdu o valoare personalizată.
                      {currency === 'RON' && ' Vom calcula automat câte cărămizi adaugi la construcția spitalului.'}
                    </>
                  )}
                </div>

                {/* Sume presetate – selectează rapid o donație */}
                <div className="donation-amounts-grid">
                  {presetAmounts[currency].map((amount) => (
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
                      <span className="donation-amount-main">{amount} {currency}</span>
                    </button>
                  ))}
                </div>

                <div className="donation-custom">
                  <label className="donation-custom-label" htmlFor="custom-amount">
                    Sau introdu altă sumă (în {currency}):
                  </label>
                  <div className="donation-custom-input-row">
                    <input
                      id="custom-amount"
                      type="number"
                      min="0.01"
                      step="0.01"
                      className="donation-custom-input"
                      placeholder={`Ex: ${currency === 'RON' ? '5.00, 25.00, 50.00' : '0.50, 1.00, 5.00'} ${currency}`}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                  </div>
                </div>

                {/* Currency Selector */}
                <div className="donation-custom" style={{ marginTop: '20px' }}>
                  <label className="donation-custom-label" htmlFor="currency-select">
                    Alege moneda:
                  </label>
                  <div className="donation-custom-input-row">
                    <select
                      id="currency-select"
                      className="donation-custom-input"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="RON">RON (lei)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="USD">USD ($)</option>
                    </select>
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
                  disabled={!effectiveAmount}
                >
                  DONEAZĂ ACUM
                </button>

                <p className="donation-cta-note">
                  Vei fi redirecționat către pagina securizată EuPlătesc.ro.
                  Tranzacția este procesată în siguranță, iar fondurile merg
                  direct către Fundația OncoHelp.
                </p>

                {/* Image and Countdown for mobile - moved here */}
                <div className="mobile-image-counter">
                  <img src={brickImageSrc} alt={brickImageAlt} className="brick-image" />

                  {/* Countdown Timer */}
                  <div className="countdown">
                    <div className="time-box">
                      <span className="time-value">{timeLeft.days}</span>
                      <span className="time-label">zile</span>
                    </div>
                    <div className="time-box">
                      <span className="time-value">{timeLeft.hours}</span>
                      <span className="time-label">ore</span>
                    </div>
                    <div className="time-box">
                      <span className="time-value">{timeLeft.minutes}</span>
                      <span className="time-label">minute</span>
                    </div>
                    <div className="time-box">
                      <span className="time-value">{timeLeft.seconds}</span>
                      <span className="time-label">secunde</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right column: Image and Countdown for desktop */}
          <section className="donation-panel-right-section">
            <img src={brickImageSrc} alt={brickImageAlt} className="brick-image" />

            {/* Countdown Timer */}
            <div className="countdown">
              <div className="time-box">
                <span className="time-value">{timeLeft.days}</span>
                <span className="time-label">zile</span>
              </div>
              <div className="time-box">
                <span className="time-value">{timeLeft.hours}</span>
                <span className="time-label">ore</span>
              </div>
              <div className="time-box">
                <span className="time-value">{timeLeft.minutes}</span>
                <span className="time-label">minute</span>
              </div>
              <div className="time-box">
                <span className="time-value">{timeLeft.seconds}</span>
                <span className="time-label">secunde</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>);
}