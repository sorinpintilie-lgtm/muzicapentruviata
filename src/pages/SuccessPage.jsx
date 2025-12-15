import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { lang, withBase } = useI18n();

  const i18n = React.useMemo(
    () =>
      ({
        ro: {
          title: 'Mulțumim pentru donația ta!',
          subtitle: 'Plata ta a fost procesată cu succes.',
          message: 'Vei primi un email de confirmare în curând.',
          buttonText: 'Înapoi la pagina principală',
          shareTitle: 'Distribuie gestul tău generos',
          shareText: 'Și eu am contribuit la construirea spitalului oncologic din Reșița prin Muzică pentru Viață!'
        },
        en: {
          title: 'Thank you for your donation!',
          subtitle: 'Your payment has been processed successfully.',
          message: 'You will receive a confirmation email shortly.',
          buttonText: 'Back to main page',
          shareTitle: 'Share your generous gesture',
          shareText: 'I also contributed to building the oncological hospital in Reșița through Muzică pentru Viață!'
        },
        de: {
          title: 'Vielen Dank für Ihre Spende!',
          subtitle: 'Ihre Zahlung wurde erfolgreich verarbeitet.',
          message: 'Sie erhalten in Kürze eine Bestätigungs-E-Mail.',
          buttonText: 'Zurück zur Hauptseite',
          shareTitle: 'Teilen Sie Ihre großzügige Geste',
          shareText: 'Auch ich habe zum Bau des onkologischen Krankenhauses in Reșița durch Muzică pentru Viață beigetragen!'
        },
        fr: {
          title: 'Merci pour votre don !',
          subtitle: 'Votre paiement a été traité avec succès.',
          message: 'Vous recevrez un e-mail de confirmation sous peu.',
          buttonText: 'Retour à la page principale',
          shareTitle: 'Partagez votre geste généreux',
          shareText: 'J\'ai aussi contribué à la construction de l\'hôpital oncologique de Reșița grâce à Muzică pentru Viață !'
        },
        it: {
          title: 'Grazie per la tua donazione!',
          subtitle: 'Il tuo pagamento è stato elaborato con successo.',
          message: 'Riceverai un\'email di conferma a breve.',
          buttonText: 'Torna alla pagina principale',
          shareTitle: 'Condividi il tuo gesto generoso',
          shareText: 'Ho anche contribuito alla costruzione dell\'ospedale oncologico di Reșița attraverso Muzică pentru Viață!'
        },
        es: {
          title: '¡Gracias por tu donación!',
          subtitle: 'Tu pago ha sido procesado exitosamente.',
          message: 'Recibirás un correo electrónico de confirmación en breve.',
          buttonText: 'Volver a la página principal',
          shareTitle: 'Comparte tu gesto generoso',
          shareText: '¡También contribuí a la construcción del hospital oncológico de Reșița a través de Muzică pentru Viață!'
        },
        ar: {
          title: 'شكراً لتبرعك!',
          subtitle: 'تمت معالجة دفعتك بنجاح.',
          message: 'ستتلقى رسالة تأكيد عبر البريد الإلكتروني قريباً.',
          buttonText: 'العودة إلى الصفحة الرئيسية',
          shareTitle: 'شارك فعلتك الطيبة',
          shareText: 'ساهمت أيضاً في بناء المستشفى السرطاني في ريشيتسا من خلال حملة Muzică pentru Viață!'
        },
      }[lang] || {
        title: 'Mulțumim pentru donația ta!',
        subtitle: 'Plata ta a fost procesată cu succes.',
        message: 'Vei primi un email de confirmare în curând.',
        buttonText: 'Înapoi la pagina principală',
        shareTitle: 'Distribuie gestul tău generos',
        shareText: 'Și eu am contribuit la construirea spitalului oncologic din Reșița prin Muzică pentru Viață!'
      }),
    [lang]
  );

  const handleShare = async (platform) => {
    const shareText = i18n.shareText;
    const shareUrl = window.location.origin;

    try {
      switch (platform) {
        case 'facebook':
          window.open(
            `https://www.facebook.com/dialog/feed?display=popup&link=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}&redirect_uri=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'width=600,height=400'
          );
          break;

        case 'whatsapp':
          window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
            '_blank'
          );
          break;

        default:
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareText + ' ' + shareUrl);
            alert('Text copiat în clipboard!');
          }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText + ' ' + shareUrl);
        alert('Text copiat în clipboard!');
      }
    }
  };

  return (
    <div className="app-content">
      <section className="app-section success-section" aria-labelledby="success-title">
        <div className="app-section-header">
          <h1 id="success-title" className="app-section-title">
            {i18n.title}
          </h1>
          <p className="app-section-lead">
            {i18n.subtitle}
          </p>
          <p className="app-section-lead" style={{ marginTop: '10px', fontSize: '1.1rem' }}>
            {i18n.message}
          </p>
        </div>

        <div className="success-actions" style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={() => navigate(withBase('/'))}
            className="btn-primary"
            style={{ marginBottom: '30px', fontSize: '1.2rem', padding: '15px 30px' }}
          >
            {i18n.buttonText}
          </button>

          <div className="share-section" style={{ marginTop: '40px' }}>
            <h2 className="share-section-title" style={{ fontSize: '1.4rem', marginBottom: '20px' }}>
              {i18n.shareTitle}
            </h2>
            <div className="share-buttons-container">
              <button
                className="share-button facebook-share"
                onClick={() => handleShare('facebook')}
                aria-label="Share on Facebook"
              >
                <span className="share-button-text">Facebook</span>
              </button>

              <button
                className="share-button whatsapp-share"
                onClick={() => handleShare('whatsapp')}
                aria-label="Share on WhatsApp"
              >
                <span className="share-button-text">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}