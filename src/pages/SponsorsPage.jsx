import React from 'react';
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function SponsorsPage() {
  const { lang } = useI18n();

  const i18n = React.useMemo(
    () =>
      ({
        ro: {
          overline: 'Gestul care a schimbat o comunitate',
          title: 'Mulțumim partenerilor care susțin Muzică Pentru Viață la Reșița!',
          p1:
            'Mulțumim organizatorilor care au fondat campania Muzică Pentru Viață și care, în mod constant, dovedesc că există o unitate specială în această comunitate. Radio Reșița este instituția care ne-a adus împreună pentru o cauză care chiar contează cu adevărat.',
          p2:
            'Această campanie nu ar fi fost posibilă fără susținerea necondiționată a partenerilor noștri. Munca și suportul dumneavoastră ne aduc mai aproape de construirea primului spital oncologic la Reșița.',
          p3: 'Devino partenerul nostru. Contactează-ne aici.',
          organizer: 'Organizator',
          partners: 'Parteneri',
          organizerAlt: 'Radio România Reșița – organizator',
          dacusAlt: 'Dacus – partener',
          skyAlt: 'Sky Radio – partener',
          lastName: 'Nume',
          firstName: 'Prenume',
          email: 'Email',
          phone: 'Telefon',
          submit: 'Trimite mesajul',
        },
        en: {
          overline: 'The gesture that changed a community',
          title: 'Thank you to the partners who support Muzică Pentru Viață in Reșița!',
          p1:
            'We thank the organizers who founded the Muzică Pentru Viață campaign and continuously prove that there is a special unity in this community. Radio Reșița is the institution that brought us together for a cause that truly matters.',
          p2:
            'This campaign would not have been possible without the unconditional support of our partners. Your work and support bring us closer to building the first oncology hospital in Reșița.',
          p3: 'Become our partner. Contact us here.',
          organizer: 'Organizer',
          partners: 'Partners',
          organizerAlt: 'Radio România Reșița – organizer',
          dacusAlt: 'Dacus – partner',
          skyAlt: 'Sky Radio – partner',
          lastName: 'Last name',
          firstName: 'First name',
          email: 'Email',
          phone: 'Phone',
          submit: 'Send message',
        },
        de: {
          overline: 'Die Geste, die eine Gemeinschaft verändert hat',
          title: 'Vielen Dank an die Partner, die Muzică Pentru Viață in Reșița unterstützen!',
          p1:
            'Wir danken den Organisatoren, die die Kampagne Muzică Pentru Viață gegründet haben und immer wieder zeigen, dass es in dieser Gemeinschaft eine besondere Einheit gibt. Radio Reșița hat uns für eine wirklich bedeutende Sache zusammengebracht.',
          p2:
            'Diese Kampagne wäre ohne die bedingungslose Unterstützung unserer Partner nicht möglich gewesen. Eure Arbeit und Unterstützung bringen uns dem Bau des ersten Onkologie-Krankenhauses in Reșița näher.',
          p3: 'Werde unser Partner. Kontaktiere uns hier.',
          organizer: 'Organisator',
          partners: 'Partner',
          organizerAlt: 'Radio România Reșița – Organisator',
          dacusAlt: 'Dacus – Partner',
          skyAlt: 'Sky Radio – Partner',
          lastName: 'Nachname',
          firstName: 'Vorname',
          email: 'E-Mail',
          phone: 'Telefon',
          submit: 'Nachricht senden',
        },
        fr: {
          overline: 'Le geste qui a changé une communauté',
          title: 'Merci aux partenaires qui soutiennent Muzică Pentru Viață à Reșița !',
          p1:
            'Nous remercions les organisateurs qui ont fondé la campagne Muzică Pentru Viață et qui prouvent constamment qu’il existe une unité spéciale dans cette communauté. Radio Reșița est l’institution qui nous a réunis pour une cause qui compte vraiment.',
          p2:
            'Cette campagne n’aurait pas été possible sans le soutien inconditionnel de nos partenaires. Votre travail et votre soutien nous rapprochent de la construction du premier hôpital d’oncologie à Reșița.',
          p3: 'Devenez notre partenaire. Contactez-nous ici.',
          organizer: 'Organisateur',
          partners: 'Partenaires',
          organizerAlt: 'Radio România Reșița – organisateur',
          dacusAlt: 'Dacus – partenaire',
          skyAlt: 'Sky Radio – partenaire',
          lastName: 'Nom',
          firstName: 'Prénom',
          email: 'E-mail',
          phone: 'Téléphone',
          submit: 'Envoyer le message',
        },
        it: {
          overline: 'Il gesto che ha cambiato una comunità',
          title: 'Grazie ai partner che sostengono Muzică Pentru Viață a Reșița!',
          p1:
            'Ringraziamo gli organizzatori che hanno fondato la campagna Muzică Pentru Viață e che dimostrano costantemente che in questa comunità esiste un’unità speciale. Radio Reșița è l’istituzione che ci ha uniti per una causa che conta davvero.',
          p2:
            'Questa campagna non sarebbe stata possibile senza il sostegno incondizionato dei nostri partner. Il vostro lavoro e supporto ci avvicinano alla costruzione del primo ospedale oncologico a Reșița.',
          p3: 'Diventa nostro partner. Contattaci qui.',
          organizer: 'Organizzatore',
          partners: 'Partner',
          organizerAlt: 'Radio România Reșița – organizzatore',
          dacusAlt: 'Dacus – partner',
          skyAlt: 'Sky Radio – partner',
          lastName: 'Cognome',
          firstName: 'Nome',
          email: 'Email',
          phone: 'Telefono',
          submit: 'Invia messaggio',
        },
        es: {
          overline: 'El gesto que cambió una comunidad',
          title: '¡Gracias a los socios que apoyan Muzică Pentru Viață en Reșița!',
          p1:
            'Agradecemos a los organizadores que fundaron la campaña Muzică Pentru Viață y que demuestran constantemente que existe una unidad especial en esta comunidad. Radio Reșița es la institución que nos reunió por una causa que realmente importa.',
          p2:
            'Esta campaña no habría sido posible sin el apoyo incondicional de nuestros socios. Su trabajo y apoyo nos acercan a la construcción del primer hospital oncológico en Reșița.',
          p3: 'Conviértete en nuestro socio. Contáctanos aquí.',
          organizer: 'Organizador',
          partners: 'Socios',
          organizerAlt: 'Radio România Reșița – organizador',
          dacusAlt: 'Dacus – socio',
          skyAlt: 'Sky Radio – socio',
          lastName: 'Apellido',
          firstName: 'Nombre',
          email: 'Email',
          phone: 'Teléfono',
          submit: 'Enviar mensaje',
        },
        ar: {
          overline: 'اللفتة التي غيّرت مجتمعًا',
          title: 'شكرًا للشركاء الذين يدعمون Muzică Pentru Viață في ريشيتسا!',
          p1:
            'نشكر المنظمين الذين أسسوا حملة Muzică Pentru Viață والذين يثبتون باستمرار أن هناك وحدة خاصة في هذا المجتمع. راديو ريشيتسا هو المؤسسة التي جمعتنا من أجل قضية مهمة حقًا.',
          p2:
            'لم تكن هذه الحملة ممكنة دون الدعم غير المشروط من شركائنا. عملكم ودعمكم يقربنا من بناء أول مستشفى للأورام في ريشيتسا.',
          p3: 'كن شريكنا. تواصل معنا هنا.',
          organizer: 'المنظم',
          partners: 'الشركاء',
          organizerAlt: 'Radio România Reșița – المنظم',
          dacusAlt: 'Dacus – شريك',
          skyAlt: 'Sky Radio – شريك',
          lastName: 'اسم العائلة',
          firstName: 'الاسم الأول',
          email: 'البريد الإلكتروني',
          phone: 'الهاتف',
          submit: 'إرسال الرسالة',
        },
      }[lang] || {}),
    [lang]
  );

  return (
    <div className="app-content">
      <section
        className="app-section sponsors-section-extended"
        aria-labelledby="sponsori-title"
        >
        <div className="app-section-header">
          <span className="app-section-overline">{i18n.overline}</span>
          <h1 id="sponsori-title" className="app-section-title">
            {i18n.title}
          </h1>
        </div>

        <div className="sponsors-grid">
          <div className="sponsors-thanks">
            <p>
              {i18n.p1}
            </p>
            <p>
              {i18n.p2}
            </p>
            <p>
              {i18n.p3}
            </p>
          </div>
          <div className="sponsors-logos-extended">
            <div className="sponsor-section">
              <h3 className="sponsor-section-title">{i18n.organizer}</h3>
              <div className="sponsor-section-logos">
                <img
                  src="/Logo Radio Romania Resita.svg"
                  alt={i18n.organizerAlt}
                />
              </div>
            </div>
            <div className="sponsor-section">
              <h3 className="sponsor-section-title">{i18n.partners}</h3>
              <div className="sponsor-section-logos">
                <img src="/dacus_logo_site.png" alt={i18n.dacusAlt} />
                <img
                  src="/Photoshoped png (1).png"
                  alt={i18n.skyAlt}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="sponsor-contact-form-wrapper"
          style={{
            marginTop: '40px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <form
            className="sponsor-contact-form"
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: 'grid',
              gap: '14px',
              maxWidth: '480px',
              width: '100%',
              padding: '20px 24px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #fff5f8 0%, #ffffff 60%)',
              border: '1px solid rgba(216, 27, 96, 0.15)',
              boxShadow: '0 14px 32px rgba(216, 27, 96, 0.12)',
            }}
          >
            <div style={{ display: 'grid', gap: '6px' }}>
              <label htmlFor="sponsor-last-name" style={{ fontSize: '0.85rem', color: '#666' }}>
                {i18n.lastName}
              </label>
              <input
                id="sponsor-last-name"
                type="text"
                name="lastName"
                required
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <div style={{ display: 'grid', gap: '6px' }}>
              <label htmlFor="sponsor-first-name" style={{ fontSize: '0.85rem', color: '#666' }}>
                {i18n.firstName}
              </label>
              <input
                id="sponsor-first-name"
                type="text"
                name="firstName"
                required
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <div style={{ display: 'grid', gap: '6px' }}>
              <label htmlFor="sponsor-email" style={{ fontSize: '0.85rem', color: '#666' }}>
                {i18n.email}
              </label>
              <input
                id="sponsor-email"
                type="email"
                name="email"
                required
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <div style={{ display: 'grid', gap: '6px' }}>
              <label htmlFor="sponsor-phone" style={{ fontSize: '0.85rem', color: '#666' }}>
                {i18n.phone}
              </label>
              <input
                id="sponsor-phone"
                type="tel"
                name="phone"
                required
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ marginTop: '12px', justifySelf: 'center', minWidth: '60%' }}
            >
              {i18n.submit}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
