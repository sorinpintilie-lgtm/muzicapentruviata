import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function FailedPage() {
  const navigate = useNavigate();
  const { lang, withBase } = useI18n();

  const i18n = React.useMemo(
    () =>
      ({
        ro: {
          title: 'Plata nu a reușit',
          subtitle: 'Din păcate, plata ta nu a putut fi procesată.',
          message: 'Te rugăm să încerci din nou sau să folosești o altă metodă de plată.',
          buttonText: 'Încearcă din nou',
          alternativeText: 'Dacă întâmpini dificultăți, poți dona direct în contul bancar.',
          bankingTitle: 'Detalii bancare',
          beneficiary: 'Beneficiar: Asociația OncoHelp',
          accountRON: 'RO65 RZBR 0000 0600 1720 1882 - LEI',
          accountEUR: 'RO97 RZBR 0000 0600 1720 1888 – EUR – SWIFT RZBRROBU',
          bank: 'Raiffeisen Bank Timișoara'
        },
        en: {
          title: 'Payment Failed',
          subtitle: 'Unfortunately, your payment could not be processed.',
          message: 'Please try again or use a different payment method.',
          buttonText: 'Try Again',
          alternativeText: 'If you encounter difficulties, you can donate directly to the bank account.',
          bankingTitle: 'Banking Details',
          beneficiary: 'Beneficiary: OncoHelp Association',
          accountRON: 'RO65 RZBR 0000 0600 1720 1882 - LEI',
          accountEUR: 'RO97 RZBR 0000 0600 1720 1888 – EUR – SWIFT RZBRROBU',
          bank: 'Raiffeisen Bank Timișoara'
        },
        de: {
          title: 'Zahlung fehlgeschlagen',
          subtitle: 'Leider konnte Ihre Zahlung nicht verarbeitet werden.',
          message: 'Bitte versuchen Sie es erneut oder verwenden Sie eine andere Zahlungsmethode.',
          buttonText: 'Erneut versuchen',
          alternativeText: 'Bei Schwierigkeiten können Sie direkt auf das Bankkonto spenden.',
          bankingTitle: 'Bankdaten',
          beneficiary: 'Begünstigter: OncoHelp Verein',
          accountRON: 'RO65 RZBR 0000 0600 1720 1882 - LEI',
          accountEUR: 'RO97 RZBR 0000 0600 1720 1888 – EUR – SWIFT RZBRROBU',
          bank: 'Raiffeisen Bank Timișoara'
        },
        fr: {
          title: 'Paiement échoué',
          subtitle: 'Malheureusement, votre paiement n\'a pas pu être traité.',
          message: 'Veuillez réessayer ou utiliser un autre mode de paiement.',
          buttonText: 'Réessayer',
          alternativeText: 'En cas de difficultés, vous pouvez faire un don directement sur le compte bancaire.',
          bankingTitle: 'Coordonnées bancaires',
          beneficiary: 'Bénéficiaire : Association OncoHelp',
          accountRON: 'RO65 RZBR 0000 0600 1720 1882 - LEI',
          accountEUR: 'RO97 RZBR 0000 0600 1720 1888 – EUR – SWIFT RZBRROBU',
          bank: 'Raiffeisen Bank Timișoara'
        },
        it: {
          title: 'Pagamento fallito',
          subtitle: 'Purtroppo, il tuo pagamento non ha potuto essere elaborato.',
          message: 'Ti preghiamo di riprovare o di utilizzare un altro metodo di pagamento.',
          buttonText: 'Riprova',
          alternativeText: 'In caso di difficoltà, puoi donare direttamente sul conto bancario.',
          bankingTitle: 'Dettagli bancari',
          beneficiary: 'Beneficiario: Associazione OncoHelp',
          accountRON: 'RO65 RZBR 0000 0600 1720 1882 - LEI',
          accountEUR: 'RO97 RZBR 0000 0600 1720 1888 – EUR – SWIFT RZBRROBU',
          bank: 'Raiffeisen Bank Timișoara'
        },
        es: {
          title: 'Pago fallido',
          subtitle: 'Desafortunadamente, tu pago no pudo ser procesado.',
          message: 'Por favor, inténtalo de nuevo o usa un método de pago diferente.',
          buttonText: 'Intentar de nuevo',
          alternativeText: 'Si encuentras dificultades, puedes donar directamente a la cuenta bancaria.',
          bankingTitle: 'Detalles bancarios',
          beneficiary: 'Beneficiario: Asociación OncoHelp',
          accountRON: 'RO65 RZBR 0000 0600 1720 1882 - LEI',
          accountEUR: 'RO97 RZBR 0000 0600 1720 1888 – EUR – SWIFT RZBRROBU',
          bank: 'Raiffeisen Bank Timișoara'
        },
        ar: {
          title: 'فشل الدفع',
          subtitle: 'للأسف، لم يتمكن من معالجة دفعتك.',
          message: 'يرجى المحاولة مرة أخرى أو استخدام طريقة دفع مختلفة.',
          buttonText: 'حاول مرة أخرى',
          alternativeText: 'إذا واجهت صعوبات، يمكنك التبرع مباشرة في الحساب البنكي.',
          bankingTitle: 'تفاصيل البنك',
          beneficiary: 'المستفيد: جمعية OncoHelp',
          accountRON: 'RO65 RZBR 0000 0600 1720 1882 - LEI',
          accountEUR: 'RO97 RZBR 0000 0600 1720 1888 – EUR – SWIFT RZBRROBU',
          bank: 'Raiffeisen Bank Timișoara'
        },
      }[lang] || {
        title: 'Plata nu a reușit',
        subtitle: 'Din păcate, plata ta nu a putut fi procesată.',
        message: 'Te rugăm să încerci din nou sau să folosești o altă metodă de plată.',
        buttonText: 'Încearcă din nou',
        alternativeText: 'Dacă întâmpini dificultăți, poți dona direct în contul bancar.',
        bankingTitle: 'Detalii bancare',
        beneficiary: 'Beneficiar: Asociația OncoHelp',
        accountRON: 'RO65 RZBR 0000 0600 1720 1882 - LEI',
        accountEUR: 'RO97 RZBR 0000 0600 1720 1888 – EUR – SWIFT RZBRROBU',
        bank: 'Raiffeisen Bank Timișoara'
      }),
    [lang]
  );

  return (
    <div className="app-content">
      <section className="app-section failed-section" aria-labelledby="failed-title">
        <div className="app-section-header">
          <h1 id="failed-title" className="app-section-title">
            {i18n.title}
          </h1>
          <p className="app-section-lead">
            {i18n.subtitle}
          </p>
          <p className="app-section-lead" style={{ marginTop: '10px', fontSize: '1.1rem' }}>
            {i18n.message}
          </p>
        </div>

        <div className="failed-actions" style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={() => navigate(withBase('/#donation-form'))}
            className="btn-primary"
            style={{ marginBottom: '30px', fontSize: '1.2rem', padding: '15px 30px' }}
          >
            {i18n.buttonText}
          </button>

          <div className="alternative-donation" style={{ marginTop: '40px', maxWidth: '600px', margin: '40px auto' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#666' }}>
              {i18n.alternativeText}
            </p>

            <div className="banking-details" style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'left',
              border: '1px solid #e9ecef'
            }}>
              <h3 style={{ marginBottom: '15px', color: '#333', fontSize: '1.2rem' }}>
                {i18n.bankingTitle}
              </h3>
              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <p><strong>{i18n.beneficiary}</strong></p>
                <p>{i18n.accountRON}</p>
                <p>{i18n.accountEUR}</p>
                <p>{i18n.bank}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}