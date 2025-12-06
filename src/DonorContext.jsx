import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DonorContext = createContext(undefined);

const STORAGE_KEY = 'mpv_donors_v1';

const INITIAL_DONORS = [
  {
    id: '1',
    name: 'Familia Popescu',
    amount: 500,
    message: '',
    createdAt: '2025-12-01T19:00:00Z',
  },
  {
    id: '2',
    name: 'Familia Ionescu',
    amount: 1000,
    message: '',
    createdAt: '2025-12-02T09:30:00Z',
  },
  {
    id: '3',
    name: 'O prietenă anonimă',
    amount: 200,
    message: '',
    createdAt: '2025-12-03T16:15:00Z',
  },
  {
    id: '4',
    name: 'Echipa Radio Reșița',
    amount: 800,
    message: '',
    createdAt: '2025-12-04T11:00:00Z',
  },
  {
    id: '5',
    name: 'Familia Marinescu',
    amount: 1500,
    message: '',
    createdAt: '2025-12-05T08:30:00Z',
  },
  {
    id: '6',
    name: 'Compania Locală SRL',
    amount: 3000,
    message: '',
    createdAt: '2025-12-06T10:15:00Z',
  },
  {
    id: '7',
    name: 'Asociația Prietenii Spitalului',
    amount: 2500,
    message: '',
    createdAt: '2025-12-07T14:45:00Z',
  },
  {
    id: '8',
    name: 'Familia Dinescu',
    amount: 1200,
    message: '',
    createdAt: '2025-12-08T09:00:00Z',
  },
  {
    id: '9',
    name: 'Grupul de Voluntari',
    amount: 1800,
    message: '',
    createdAt: '2025-12-09T11:30:00Z',
  },
  {
    id: '10',
    name: 'Familia Georgescu',
    amount: 900,
    message: '',
    createdAt: '2025-12-10T13:15:00Z',
  },
  {
    id: '11',
    name: 'Comunitatea Locală',
    amount: 2200,
    message: '',
    createdAt: '2025-12-11T15:45:00Z',
  },
  {
    id: '12',
    name: 'Familia Radu',
    amount: 700,
    message: '',
    createdAt: '2025-12-12T08:00:00Z',
  },
  {
    id: '13',
    name: 'Echipa de Medici',
    amount: 2800,
    message: '',
    createdAt: '2025-12-13T10:30:00Z',
  },
  {
    id: '14',
    name: 'Familia Stoica',
    amount: 1100,
    message: '',
    createdAt: '2025-12-14T09:15:00Z',
  },
  {
    id: '15',
    name: 'Grupul de Susținători',
    amount: 1600,
    message: '',
    createdAt: '2025-12-15T11:00:00Z',
  },
  {
    id: '16',
    name: 'Familia Popa',
    amount: 850,
    message: '',
    createdAt: '2025-12-16T13:30:00Z',
  },
  {
    id: '17',
    name: 'Asociația Speranța',
    amount: 2100,
    message: '',
    createdAt: '2025-12-17T15:15:00Z',
  },
  {
    id: '18',
    name: 'Familia Constantin',
    amount: 1300,
    message: '',
    createdAt: '2025-12-18T08:45:00Z',
  },
  {
    id: '19',
    name: 'Echipa de Voluntari',
    amount: 1900,
    message: '',
    createdAt: '2025-12-19T10:00:00Z',
  },
  {
    id: '20',
    name: 'Familia Stan',
    amount: 600,
    message: '',
    createdAt: '2025-12-20T11:30:00Z',
  },
  {
    id: '21',
    name: 'Compania Generoasă',
    amount: 3500,
    message: '',
    createdAt: '2025-12-21T13:45:00Z',
  },
  {
    id: '22',
    name: 'Familia Iancu',
    amount: 1400,
    message: '',
    createdAt: '2025-12-22T09:15:00Z',
  },
  {
    id: '23',
    name: 'Grupul de Prieteni',
    amount: 1700,
    message: '',
    createdAt: '2025-12-23T11:00:00Z',
  },
  {
    id: '24',
    name: 'Familia Dima',
    amount: 950,
    message: '',
    createdAt: '2025-12-24T13:30:00Z',
  },
  {
    id: '25',
    name: 'Asociația Solidaritate',
    amount: 2600,
    message: '',
    createdAt: '2025-12-25T15:00:00Z',
  },
  {
    id: '26',
    name: 'Familia Voicu',
    amount: 1050,
    message: '',
    createdAt: '2025-12-26T08:30:00Z',
  },
  {
    id: '27',
    name: 'Echipa de Sprijin',
    amount: 2000,
    message: '',
    createdAt: '2025-12-27T10:15:00Z',
  },
  {
    id: '28',
    name: 'Familia Moraru',
    amount: 750,
    message: '',
    createdAt: '2025-12-28T12:00:00Z',
  },
  {
    id: '29',
    name: 'Compania Altruistă',
    amount: 3200,
    message: '',
    createdAt: '2025-12-29T14:30:00Z',
  },
  {
    id: '30',
    name: 'Familia Neagu',
    amount: 1250,
    message: '',
    createdAt: '2025-12-30T09:45:00Z',
  }
];

function loadInitialDonors() {
  // Always use the current INITIAL_DONORS to ensure consistency
  // This prevents showing old cached data from localStorage
  console.log('Using current INITIAL_DONORS (ignoring localStorage)');
  return INITIAL_DONORS;
}

export function DonorProvider({ children }) {
  const [donors, setDonors] = useState(() => {
    const initialDonors = loadInitialDonors();
    console.log('DonorProvider initialized with donors:', initialDonors);
    return initialDonors;
  });

  // Removed localStorage saving to prevent caching issues

  function addDonor({ name, amount, message }) {
    const trimmedName = (name || '').trim();
    if (!trimmedName) return;

    const normalized = String(amount ?? '')
      .replace(',', '.')
      .trim();

    const parsed = normalized ? Number.parseFloat(normalized) : 0;
    const safeAmount = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;

    const newDonor = {
      id: Date.now().toString(36) + Math.random().toString(16).slice(2),
      name: trimmedName,
      amount: safeAmount,
      message: (message || '').trim(),
      createdAt: new Date().toISOString(),
    };

    setDonors((prev) => [newDonor, ...prev]);
  }

  const value = useMemo(
    () => ({
      donors,
      addDonor,
    }),
    [donors]
  );

  return <DonorContext.Provider value={value}>{children}</DonorContext.Provider>;
}

export function useDonors() {
  const ctx = useContext(DonorContext);
  if (!ctx) {
    throw new Error('useDonors must be used within a DonorProvider');
  }
  return ctx;
}

export function getDonorSizeClass(amount) {
  if (!amount || amount <= 0) return 'donor-chip-xs';
  if (amount >= 2000) return 'donor-chip-xxl';
  if (amount >= 1000) return 'donor-chip-xl';
  if (amount >= 500) return 'donor-chip-lg';
  if (amount >= 200) return 'donor-chip-md';
  if (amount >= 50) return 'donor-chip-sm';
  return 'donor-chip-xs';
}

export function getPersonalizedWallUrl(donorName) {
  return `/multumiri/${encodeURIComponent(donorName)}`;
}