import React from 'react';

export default function SponsorsPage() {
  return (
    <div className="app-content">
      <section
        className="app-section sponsors-section-extended"
        aria-labelledby="sponsori-title"
      >
        <div className="app-section-header">
          <span className="app-section-overline">Gestul care a schimbat o comunitate</span>
          <h1 id="sponsori-title" className="app-section-title">
            Mulțumim partenerilor care susțin Muzică Pentru Viață la Reșița!
          </h1>
        </div>

        <div className="sponsors-grid">
          <div className="sponsors-thanks">
            <p>
              Mulțumim organizatorilor care au fondat campania{' '}
              <strong>Muzică Pentru Viață</strong> și care, în mod constant, dovedesc că există o
              unitate specială în această comunitate. Radio Reșița este instituția care ne-a adus
              împreună pentru o cauză care chiar contează cu adevărat.
            </p>
            <p>
              Această campanie nu ar fi fost posibilă fără susținerea necondiționată a
              partenerilor noștri. Munca și suportul dumneavoastră ne aduc mai aproape de
              construirea primului spital oncologic la Reșița.
            </p>
            <p>
              Devino partenerul nostru. <strong>Contactează-ne aici.</strong>
            </p>
          </div>
          <div className="sponsors-logos-extended">
            <div className="sponsor-section">
              <h3 className="sponsor-section-title">Organizator</h3>
              <div className="sponsor-section-logos">
                <img
                  src="/Logo Radio Romania Resita.svg"
                  alt="Radio România Reșița – organizator"
                />
              </div>
            </div>
            <div className="sponsor-section">
              <h3 className="sponsor-section-title">Parteneri</h3>
              <div className="sponsor-section-logos">
                <img src="/dacus_logo_site.png" alt="Dacus – partener" />
                <img
                  src="/skyro-LOGO-6A-final -without tagline-01.png"
                  alt="Sky Radio – partener"
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
                Nume
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
                Prenume
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
                Email
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
                Telefon
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
              Trimite mesajul
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}