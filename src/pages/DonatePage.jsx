import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDonors } from '../DonorContext.jsx';

export default function DonatePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addDonor } = useDonors();

  const [donationMode, setDonationMode] = useState('onetime');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Preset donation amounts (minimum 15 RON)
  const presetAmounts = [15, 50, 100, 250];

  // Handle successful payment return from EuPlatesc
  useEffect(() => {
    const action = searchParams.get('action');
    const amount = searchParams.get('amount');
    const name = searchParams.get('fname');
    const invoiceId = searchParams.get('invoice_id');

    if (action === 'confirmed' && amount && invoiceId) {
      // Payment was successful - add donor to Firestore
      const donorAmount = parseFloat(amount);
      const donorName = name || 'Anonim';

      addDonor({
        name: donorName,
        amount: donorAmount,
        message: `Donație prin EuPlatesc - Invoice: ${invoiceId}`
      }).then(() => {
        // Redirect to wall page to show the donor
        navigate('/multumiri', { replace: true });
      }).catch((err) => {
        console.error('Error adding donor:', err);
      });
    }
  }, [searchParams, addDonor, navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const finalAmount = getFinalAmount();
    if (!finalAmount || finalAmount < 15) {
      setError('Suma minimă pentru donație este 15 RON (aproximativ 3 EUR / 3 USD).');
      return;
    }

    if (!donorEmail || !donorEmail.includes('@')) {
      setError('Te rugăm să introduci o adresă de email validă.');
      return;
    }

    setIsProcessing(true);

    try {
      // Call Netlify function to initiate payment
      const response = await fetch('/.netlify/functions/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount.toFixed(2),
          currency: 'RON',
          orderDesc: `Donație Muzică pentru Viață - ${donationMode === 'monthly' ? 'Lunar' : 'O singură dată'}`,
          email: donorEmail,
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
      setError('A apărut o eroare la inițierea plății. Te rugăm să încerci din nou.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="homepage-wrapper post-event-wrapper">
      <div className="post-event-grid">
        {/* Donation Panel */}
        <div className="donation-panel" id="donation-form">
          <div className="donation-panel-inner">
            <div className="donation-panel-left">
              <span className="tagline">Muzică pentru Viață 2025</span>
              <h1>
                Împreună construim <span className="highlight">primul spital oncologic</span> din Banatul de Munte
              </h1>
              <p className="donation-summary">
                Fiecare donație contează. Alege suma cu care vrei să contribui la construirea spitalului oncologic din Reșița.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Donation Mode Tabs */}
                <div className="donation-mode-tabs">
                  <button
                    type="button"
                    className={`donation-mode-tab ${donationMode === 'onetime' ? 'donation-mode-tab--active' : ''}`}
                    onClick={() => setDonationMode('onetime')}
                  >
                    O singură dată
                  </button>
                  <button
                    type="button"
                    className="donation-mode-tab donation-mode-tab--disabled"
                    disabled
                    title="Donațiile lunare vor fi disponibile în curând"
                  >
                    Lunar
                  </button>
                </div>

                {/* Preset Amounts */}
                <div className="donation-amounts-grid">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`donation-amount-button ${selectedAmount === amount ? 'donation-amount-button--active' : ''}`}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      <div className="donation-amount-main">{amount}</div>
                      <div className="donation-amount-ron">RON</div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="donation-custom">
                  <label className="donation-custom-label">Sau introdu o altă sumă:</label>
                  <div className="donation-custom-input-row">
                    <input
                      type="number"
                      className="donation-custom-input"
                      placeholder="Sumă personalizată (min. 15 RON)"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      min="15"
                      step="1"
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div className="donation-custom">
                  <label className="donation-custom-label">Numele tău (opțional):</label>
                  <input
                    type="text"
                    className="donation-custom-input"
                    placeholder="Numele tău sau 'Anonim'"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                  />
                </div>

                <div className="donation-custom">
                  <label className="donation-custom-label">Email (necesar pentru confirmare):</label>
                  <input
                    type="email"
                    className="donation-custom-input"
                    placeholder="email@exemplu.ro"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required
                  />
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
                  {isProcessing ? 'Se procesează...' : `DONEAZĂ ${getFinalAmount() > 0 ? getFinalAmount().toFixed(0) + ' RON' : 'ACUM'}`}
                </button>

                <p className="donation-cta-note">
                  Plata este securizată prin EuPlatesc. Vei fi redirecționat către pagina de plată.
                  După finalizarea donației, vei fi adăugat pe peretele comunității noastre.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="post-event-story">
          <div className="post-event-section">
            <div className="post-event-section-title">De ce este important?</div>
            <p className="post-event-text">
              Banatul de Munte nu are un spital oncologic. Pacienții sunt nevoiți să călătorească sute de kilometri
              pentru tratament, în condiții dificile și cu costuri mari. Fundația OncoHelp lucrează pentru a construi
              primul spital oncologic din regiune, oferind acces la tratament de calitate pentru toți pacienții.
            </p>
            <div className="post-event-image-block post-event-image-block--clinic">
              <img src="/onco-help-logo-d.png" alt="OncoHelp" />
            </div>
          </div>

          <div className="post-event-section">
            <div className="post-event-image-block post-event-image-block--history">
              <img src="/2024.jpg" alt="Muzică pentru Viață 2024" />
            </div>
            <div className="post-event-section-title">Muzică pentru Viață</div>
            <p className="post-event-text">
              De peste 10 ani, Radio România Reșița organizează campania "Muzică pentru Viață", un maraton caritabil
              care a reușit să strângă sute de mii de euro pentru cauze nobile. În 2025, ne unim forțele pentru a
              susține construirea spitalului oncologic din Reșița.
            </p>
          </div>

          <div className="post-event-section">
            <div className="post-event-section-title">Fiecare donație contează</div>
            <p className="post-event-text">
              Indiferent de sumă, fiecare contribuție ne apropie de obiectiv. Împreună putem face diferența și putem
              oferi speranță pacienților cu cancer din Banatul de Munte. Mulțumim pentru generozitate!
            </p>
            <div className="post-event-image-block post-event-image-block--live">
              <img src="/resita.jpg" alt="Reșița" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
