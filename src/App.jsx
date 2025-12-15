import React, { useState } from 'react';
import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import DonatePage from './pages/DonatePage.jsx';
import LivePage from './pages/LivePage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import AboutOncohelpPage from './pages/AboutOncohelpPage.jsx';
import AboutResitaPage from './pages/AboutResitaPage.jsx';
import WallPage from './pages/WallPage.jsx';
import PersonalizedWallPage from './pages/PersonalizedWallPage.jsx';
import SponsorsPage from './pages/SponsorsPage.jsx';
import MobileWallScreenshot from './pages/MobileWallScreenshot.jsx';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import SuccessPage from './pages/SuccessPage.jsx';
import FailedPage from './pages/FailedPage.jsx';
import GlobalRadioPlayer from './components/GlobalRadioPlayer.jsx';
import MoneyCounter from './components/MoneyCounter.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import { useI18n } from './i18n/I18nProvider.jsx';

function Layout({ children }) {
  const { t, withBase } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 50;

      setIsScrolled(scrolled);
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="app-shell">
      {/* Desktop Header */}
      <header className="site-header">
        <img
          src="/Logo Muzica pentru viata.svg"
          alt={t('alt.logoMain')}
          className="logo-main-top"
        />
      </header>

      {/* Mobile Header with Donate Button */}
      <header className="mobile-header-donate">
        <div className={`mobile-header-normal ${isScrolled ? 'hide' : ''}`}>
          <div className="mobile-logo-center">
            <img
              src="/Logo Muzica pentru viata.svg"
              alt={t('alt.logoMain')}
              style={{ height: '60px', maxWidth: '100%' }}
            />
          </div>
          <NavLink
            to={withBase('/#donation-form')}
            className="btn-primary mobile-donate-left"
            style={{ fontSize: '1.2rem', padding: '12px 18px' }}
          >
            {t('cta.donateNow')}
          </NavLink>
          <nav className="mobile-nav mobile-hamburger-right">
            <button
              className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label={t('mobile.menuOpen')}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </nav>
        </div>

        <div className={`mobile-header-compact ${isScrolled ? 'active' : ''}`}>
          <div></div> {/* Empty left column */}
          <NavLink
            to={withBase('/#donation-form')}
            className="btn-primary"
            style={{ fontSize: '1.35rem', padding: '15px 30px' }}
          >
            {t('cta.donateNow')}
          </NavLink>
          <div></div> {/* Empty right column */}
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <button
            className="mobile-drawer-close"
            onClick={closeMobileMenu}
            aria-label={t('mobile.menuClose')}
          >
            ×
          </button>

          <div className="mobile-money-counter">
            <MoneyCounter />
          </div>

          <div className="mobile-drawer-links">
            <NavLink
              to={withBase('/')}
              end
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              {t('nav.donate')}
            </NavLink>

            <NavLink
              to={withBase('/live')}
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              {t('nav.live')}
            </NavLink>

            <NavLink
              to={withBase('/galerie')}
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              {t('nav.timeline')}
            </NavLink>

            <NavLink
              to={withBase('/despre-oncohelp')}
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              {t('nav.aboutOncohelp')}
            </NavLink>

            <NavLink
              to={withBase('/despre-resita')}
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              {t('nav.aboutResita')}
            </NavLink>

            <NavLink
              to={withBase('/multumiri')}
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              {t('nav.community')}
            </NavLink>
          </div>

          <NavLink
            to={withBase('/#donation-form')}
            className="btn-primary mobile-nav-donate"
            onClick={closeMobileMenu}
          >
            {t('cta.donateNow')}
          </NavLink>

          <div className="mobile-drawer-language">
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="site-nav desktop-nav" aria-label="Navigație principală">
        <div className="site-nav-inner">
          <div className="site-nav-left">
            {isScrolled && (
              <img
                src="/Logo Muzica pentru viata.svg"
                alt={t('alt.logoMain')}
                className="nav-logo-scrolled"
              />
            )}
            <div className="site-nav-links">
              <NavLink
                to={withBase('/')}
                end
                className={({ isActive }) =>
                  'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
                }
              >
                {t('nav.donate')}
              </NavLink>

              <NavLink
                to={withBase('/live')}
                className={({ isActive }) =>
                  'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
                }
              >
                {t('nav.live')}
              </NavLink>

              <NavLink
                to={withBase('/galerie')}
                className={({ isActive }) =>
                  'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
                }
              >
                {t('nav.timeline')}
              </NavLink>

              <NavLink
                to={withBase('/despre-oncohelp')}
                className={({ isActive }) =>
                  'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
                }
              >
                {t('nav.aboutOncohelp')}
              </NavLink>

              <NavLink
                to={withBase('/despre-resita')}
                className={({ isActive }) =>
                  'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
                }
              >
                {t('nav.aboutResita')}
              </NavLink>

              <NavLink
                to={withBase('/multumiri')}
                className={({ isActive }) =>
                  'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
                }
              >
                {t('nav.community')}
              </NavLink>
            </div>
          </div>

          <div className="nav-right-actions">
            <MoneyCounter />
            <NavLink
              to={withBase('/#donation-form')}
              className="btn-primary nav-donate"
            >
              {t('cta.donateNow')}
            </NavLink>
            <LanguageSelector />
          </div>
        </div>
      </nav>

      <main className="app-shell-main">{children}</main>

      <SiteFooter isScrolled={isScrolled} />
    </div>
  );
}


function SiteFooter({ isScrolled }) {
  const { t, withBase } = useI18n();
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <section className="footer-top">
          <p className="footer-tagline">
            {t('footer.tagline')}
          </p>
        </section>

        <section className="footer-logos" aria-label="Beneficiar, organizator și sponsori">
          <div className="footer-logos-row">
            <div className="footer-column">
              <span className="footer-column-title">{t('footer.section.donationBeneficiary')}</span>
              <div className="footer-logo-main footer-logo-main--oncohelp">
                <a href="https://oncohelp.ro" target="_blank" rel="noopener noreferrer">
                  <img src="/onco-help-logo-d.png" alt={t('alt.logoOncohelp')} />
                </a>
              </div>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">{t('footer.section.organizedBy')}</span>
              <div className="footer-logo-main footer-logo-main--radio" data-fallback-text="Radio România Reșița">
                <a href="https://radioresita.ro" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/Logo Radio Romania Resita.svg"
                    alt={t('alt.logoRadio')}
                    onError={(e) => {
                      console.error('Radio Romania Resita logo failed to load');
                      e.target.style.display = 'none';
                      e.target.parentElement.style.minHeight = '70px';
                      e.target.parentElement.style.justifyContent = 'center';
                    }}
                    style={{
                      maxHeight: '70px',
                      objectFit: 'contain',
                      filter: 'grayscale(0.15)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </a>
              </div>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">{t('footer.section.sponsorsPartners')}</span>
              <div className="footer-sponsor-grid">
                <a href="https://dacus.ro" target="_blank" rel="noopener noreferrer">
                  <img src="/dacus_logo_site.png" alt="Dacus" />
                </a>
                <a href="https://sky.ro" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/Photoshoped png (1).png"
                    alt={t('alt.logoSky')}
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="footer-banking">
          <h3 className="footer-banking-title">{t('footer.banking.title')}</h3>
          <div className="footer-banking-details">
            <p>{t('footer.banking.beneficiary')}</p>
            <p>RO65 RZBR 0000 0600 1720 1882 - LEI</p>
            <p>RO97 RZBR 0000 0600 1720 1888 – EUR – SWIFT RZBRROBU</p>
            <p>Raiffeisen Bank Timișoara</p>
          </div>
        </section>

        <section
          className="audio-section"
          aria-label="Ascultă piesa Muzică pentru Viață 2025"
        >
          <audio controls preload="none">
            <source src="/Muzică pentru Viață 2025.mp3" type="audio/mpeg" />
            {t('footer.audio.fallback')}
          </audio>
        </section>

        <section className="footer-legal">
          <div className="footer-legal-links">
            <NavLink to={withBase('/termeni-si-conditii')} className="footer-legal-link">
              {t('footer.legal.terms')}
            </NavLink>
            <span className="footer-legal-separator">|</span>
            <NavLink to={withBase('/politica-de-confidentialitate')} className="footer-legal-link">
              {t('footer.legal.privacy')}
            </NavLink>
          </div>
          <div className="footer-contact">
            <a href="https://wa.me/40751288777" className="footer-contact-link" target="_blank" rel="noopener noreferrer">
              {t('footer.contact.whatsapp')}
            </a>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </section>

        <section className="footer-powered-by">
          <p className="footer-powered-by-text">
            {t('footer.poweredBy')}{' '}
            <a href="https://sky.ro" target="_blank" rel="noopener noreferrer" className="footer-powered-by-link">
              <img
                src="/Photoshoped png (1).png"
                alt={t('alt.logoSky')}
                className="footer-powered-by-logo"
              />
            </a>
          </p>
        </section>
      </div>
    </footer>
  );
}

const LANG_PREFIXES = ['en', 'de', 'fr', 'it', 'es', 'ar'];

function App() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Routes>
        {/* Romanian (default, no prefix) */}
        <Route path="/" element={<Layout><DonatePage /></Layout>} />
        <Route path="/donatii" element={<Layout><DonatePage /></Layout>} />
        <Route path="/live" element={<Layout><LivePage /></Layout>} />
        <Route path="/galerie" element={<Layout><GalleryPage /></Layout>} />
        <Route path="/despre-oncohelp" element={<Layout><AboutOncohelpPage /></Layout>} />
        <Route path="/despre-resita" element={<Layout><AboutResitaPage /></Layout>} />
        <Route path="/multumiri" element={<Layout><WallPage /></Layout>} />
        <Route path="/multumiri/:donorName" element={<Layout><PersonalizedWallPage /></Layout>} />
        <Route path="/sponsori" element={<Layout><SponsorsPage /></Layout>} />
        <Route path="/mobile/:donorName" element={<Layout><MobileWallScreenshot /></Layout>} />
        <Route path="/termeni-si-conditii" element={<Layout><TermsAndConditionsPage /></Layout>} />
        <Route path="/politica-de-confidentialitate" element={<Layout><PrivacyPolicyPage /></Layout>} />
        <Route path="/success" element={<Layout><SuccessPage /></Layout>} />
        <Route path="/failed" element={<Layout><FailedPage /></Layout>} />

        {/* Prefixed languages */}
        {LANG_PREFIXES.flatMap((prefix) => [
          <Route key={`${prefix}-root`} path={`/${prefix}`} element={<Layout><DonatePage /></Layout>} />,
          <Route key={`${prefix}-donatii`} path={`/${prefix}/donatii`} element={<Layout><DonatePage /></Layout>} />,
          <Route key={`${prefix}-live`} path={`/${prefix}/live`} element={<Layout><LivePage /></Layout>} />,
          <Route key={`${prefix}-galerie`} path={`/${prefix}/galerie`} element={<Layout><GalleryPage /></Layout>} />,
          <Route key={`${prefix}-oncohelp`} path={`/${prefix}/despre-oncohelp`} element={<Layout><AboutOncohelpPage /></Layout>} />,
          <Route key={`${prefix}-resita`} path={`/${prefix}/despre-resita`} element={<Layout><AboutResitaPage /></Layout>} />,
          <Route key={`${prefix}-wall`} path={`/${prefix}/multumiri`} element={<Layout><WallPage /></Layout>} />,
          <Route key={`${prefix}-wall-personal`} path={`/${prefix}/multumiri/:donorName`} element={<Layout><PersonalizedWallPage /></Layout>} />,
          <Route key={`${prefix}-sponsori`} path={`/${prefix}/sponsori`} element={<Layout><SponsorsPage /></Layout>} />,
          <Route key={`${prefix}-mobile`} path={`/${prefix}/mobile/:donorName`} element={<Layout><MobileWallScreenshot /></Layout>} />,
          <Route key={`${prefix}-terms`} path={`/${prefix}/termeni-si-conditii`} element={<Layout><TermsAndConditionsPage /></Layout>} />,
          <Route key={`${prefix}-privacy`} path={`/${prefix}/politica-de-confidentialitate`} element={<Layout><PrivacyPolicyPage /></Layout>} />,
          <Route key={`${prefix}-success`} path={`/${prefix}/success`} element={<Layout><SuccessPage /></Layout>} />,
          <Route key={`${prefix}-failed`} path={`/${prefix}/failed`} element={<Layout><FailedPage /></Layout>} />,
        ])}
      </Routes>

      {/* Global Radio Player - appears on all pages */}
      <GlobalRadioPlayer />
    </>
  );
}

export default App;
