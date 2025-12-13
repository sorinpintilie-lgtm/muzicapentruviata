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

  // Preset donation amounts (minimum 1 RON)
  const presetAmounts = [15, 25, 50, 100, 'custom'];

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
      navigate('/multumiri', { replace: true });
    } else if (action || amount) {
      console.log('Payment return detected but not confirmed:', { action, amount, name, invoiceId });
    }
  }, [searchParams, navigate]);

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
    if (!finalAmount || finalAmount < 1) {
      setError('Suma minimă pentru donație este 1 RON.');
      return;
    }

    if (!donorEmail || !donorEmail.includes('@')) {
      setError('Te rugăm să introduci o adresă de email validă.');
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
      setError('A apărut o eroare la inițierea plății. Te rugăm să încerci din nou.');
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
              <span className="tagline">Muzică pentru Viață 2025</span>
              <h1>
                Împreună construim <span className="highlight">primul spital pentru bolnavii de cancer</span> din Reșița
              </h1>
              <p className="donation-summary">
                Fiecare donație contează. Alege suma cu care vrei să contribui la construirea spitalului oncologic din Reșița.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Donation Mode Tabs */}
                <div className="donation-mode-tabs">
                  <button
                    type="button"
                    className="donation-mode-tab donation-mode-tab--disabled"
                    disabled
                    title="Donațiile vor fi disponibile în curând"
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
                    amount === 'custom' ? (
                      <div
                        key={amount}
                        className={`donation-amount-button ${selectedAmount === 'custom' ? 'donation-amount-button--active' : ''}`}
                        onClick={() => handleAmountSelect('custom')}
                      >
                        <input
                          type="number"
                          className="donation-amount-main donation-custom-input-inline"
                          placeholder="Alta"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          min="1"
                          step="1"
                        />
                        <div className="donation-amount-ron">RON</div>
                      </div>
                    ) : (
                      <button
                        key={amount}
                        type="button"
                        className={`donation-amount-button ${selectedAmount === amount ? 'donation-amount-button--active' : ''}`}
                        onClick={() => handleAmountSelect(amount)}
                      >
                        <div className="donation-amount-main">{amount}</div>
                        <div className="donation-amount-ron">RON</div>
                      </button>
                    )
                  ))}
                </div>

                {/* Donor Information */}
                <div className="donor-info-row">
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

            <div className="donation-panel-right">
              <img src="/IMG_1101.jpg" alt="Universitatea din Reșița" style={{width: '100%', borderRadius: '18px', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.12)', display: 'block', margin: '0 auto'}} />
            </div>
          </div>
        </div>

        {/* Story Section - Now below donation form */}
        <div className="post-event-story">
          <div className="post-event-section">
            <div className="post-event-section-title">De ce este important?</div>
            <p className="post-event-text">
              În fiecare an, în România, aproximativ 100.000 de oameni află că au cancer. Pentru mulți dintre ei, lupta nu înseamnă doar boala, ci și drumuri lungi, epuizare, costuri mari și timp prețios pierdut departe de cei dragi.
            </p>
            <p className="post-event-text">
              Reșița nu are un spital oncologic. Pacienții sunt nevoiți să călătorească sute de kilometri pentru tratament, în condiții dificile. Fundația OncoHelp lucrează pentru a construi primul spital oncologic din Reșița, un loc unde oamenii pot primi tratament de calitate, mai aproape de casă, cu demnitate, speranță și sprijin real.
            </p>
            <div className="post-event-image-block post-event-image-block--clinic">
              <img src="/resita populatie.jpg" alt="Spitalul din Reșița" />
            </div>
          </div>

          <div className="post-event-section">
            <div className="post-event-section-title">Spitalul din Reșița</div>
            <p className="post-event-text">
              De peste 10 ani, Radio România Reșița dă glas speranței prin campania „Muzică pentru Viață" – un maraton caritabil care a transformat muzica în sprijin real și a adunat sute de mii de euro pentru oameni aflați în nevoie.
            </p>
            <p className="post-event-text">
              În 2025, fiecare notă, fiecare voce și fiecare donație se unesc pentru un scop vital: construirea spitalului oncologic la Reșița. Împreună, demonstrăm că solidaritatea poate salva vieți și că, atunci când o comunitate se unește, speranța devine realitate.
            </p>
            <div className="post-event-image-block post-event-image-block--history">
              <img src="/2016.jpg" alt="Muzică pentru Viață 2016" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
