import React from 'react';
import { useDonors } from '../DonorContext.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function MoneyCounter() {
  const { donors, loading, error } = useDonors();
  const { t } = useI18n();

  const totalAmount = (donors || []).reduce(
    (sum, donor) => sum + (Number(donor?.amount) || 0),
    0
  );

  // Get currency from cookie, default to RON
  const currency = getCookie('mpv_currency') || 'RON';

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
