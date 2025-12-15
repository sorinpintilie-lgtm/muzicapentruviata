import React from 'react';
import { useDonors } from '../DonorContext.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Approximate exchange rates (RON to other currencies)
// These are rough estimates and should be updated periodically
const EXCHANGE_RATES = {
  RON: 1,
  EUR: 0.201, // 1 RON ≈ 0.201 EUR
  USD: 0.222, // 1 RON ≈ 0.222 USD
};

function MoneyCounter() {
  const { donors, loading, error } = useDonors();
  const { t } = useI18n();

  // Convert all confirmed donations to RON for total calculation
  // Only count confirmed donations (exclude pending and failed)
  const totalAmountRON = (donors || [])
    .filter(donor => donor?.status === 'confirmed')
    .reduce((sum, donor) => {
      const amount = Number(donor?.amount) || 0;
      const currency = donor?.currency || 'RON'; // Default to RON if not specified
      const rate = EXCHANGE_RATES[currency] || 1; // Default to 1 if currency not found

      // Convert to RON: if amount is in EUR/USD, divide by rate; if already RON, use as-is
      const amountInRON = currency === 'RON' ? amount : amount / rate;
      return sum + amountInRON;
    }, 0);

  // Get currency from cookie, default to RON
  const currency = getCookie('mpv_currency') || 'RON';

  // Convert RON total to display currency
  const totalAmount = totalAmountRON * (EXCHANGE_RATES[currency] || 1);

  // Determine locale based on currency
  const locale = currency === 'EUR' ? 'de-DE' :
                 currency === 'USD' ? 'en-US' :
                 'ro-RO';

  // Format the amount with commas and the appropriate currency
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalAmount);

  return (
    <div className="money-counter">
      <div className="money-counter-label">{t('moneyCounter.label')}</div>
      <div className="money-counter-amount">
        {loading ? '...' : formattedAmount}
      </div>
    </div>
  );
}

export default MoneyCounter;
