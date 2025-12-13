import React from 'react';
import { useDonors } from '../DonorContext.jsx';

function MoneyCounter() {
  const { donors, loading, error } = useDonors();

  const totalAmount = (donors || []).reduce(
    (sum, donor) => sum + (Number(donor?.amount) || 0),
    0
  );

  // Format the amount with commas and RON
  const formattedAmount = new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalAmount);

  return (
    <div className="money-counter">
      <div className="money-counter-label">Strânși până acum</div>
      <div className="money-counter-amount">
        {loading ? '...' : formattedAmount}
      </div>
    </div>
  );
}

export default MoneyCounter;
