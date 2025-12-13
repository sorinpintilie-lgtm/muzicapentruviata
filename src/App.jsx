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
import GlobalRadioPlayer from './components/GlobalRadioPlayer.jsx';
import MoneyCounter from './components/MoneyCounter.jsx';

function Layout({ children }) {
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
          alt="Muzică pentru Viață"
          className="logo-main-top"
        />
      </header>

      {/* Mobile Header with Donate Button */}
      <header className="mobile-header-donate">
        <div className={`mobile-header-normal ${isScrolled ? 'hide' : ''}`}>
          <div className="mobile-logo-center">
            <img
              src="/Logo Muzica pentru viata.svg"
              alt="Muzică pentru Viață"
              style={{ height: '60px', maxWidth: '100%' }}
            />
          </div>
          <NavLink
            to="/#donation-form"
            className="btn-primary mobile-donate-left"
            style={{ fontSize: '1.2rem', padding: '12px 18px' }}
          >
            DONEAZĂ ACUM
          </NavLink>
          <nav className="mobile-nav mobile-hamburger-right">
            <button
              className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Deschide meniul"
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
            to="/#donation-form"
            className="btn-primary"
            style={{ fontSize: '1.35rem', padding: '15px 30px' }}
          >
            DONEAZĂ ACUM
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
            aria-label="Închide meniul"
          >
            ×
          </button>

          <div className="mobile-money-counter">
            <MoneyCounter />
          </div>

          <div className="mobile-drawer-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Donează
            </NavLink>

            <NavLink
              to="/live"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Live & Video
            </NavLink>

            <NavLink
              to="/galerie"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Cronologie
            </NavLink>

            <NavLink
              to="/despre-oncohelp"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Despre OncoHelp
            </NavLink>

            <NavLink
              to="/despre-resita"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Despre Reșița
            </NavLink>

            <NavLink
              to="/multumiri"
              className={({ isActive }) =>
                'mobile-nav-link' + (isActive ? ' mobile-nav-link-active' : '')
              }
              onClick={closeMobileMenu}
            >
              Comunitatea
            </NavLink>
          </div>

          <NavLink
            to="/#donation-form"
            className="btn-primary mobile-nav-donate"
            onClick={closeMobileMenu}
          >
            DONEAZĂ ACUM
          </NavLink>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="site-nav desktop-nav" aria-label="Navigație principală">
        <div className="site-nav-inner">
          <div className="site-nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Donează
            </NavLink>

            <NavLink
              to="/live"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Live & Video
            </NavLink>

            <NavLink
              to="/galerie"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Cronologie
            </NavLink>

            <NavLink
              to="/despre-oncohelp"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Despre OncoHelp
            </NavLink>

            <NavLink
              to="/despre-resita"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Despre Reșița
            </NavLink>

            <NavLink
              to="/multumiri"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Comunitatea
            </NavLink>
          </div>

          <MoneyCounter />

          <NavLink
            to="/#donation-form"
            className="btn-primary nav-donate"
          >
            DONEAZĂ ACUM
          </NavLink>
        </div>
      </nav>

      <main className="app-shell-main">{children}</main>
    </div>
  );
}


function SiteFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <section className="footer-top">
          <p className="footer-tagline">
            Muzică pentru Viață • Împreună pentru pacienții cu cancer din Banatul de Munte
          </p>
        </section>

        <section className="footer-logos" aria-label="Beneficiar, organizator și sponsori">
          <div className="footer-logos-row">
            <div className="footer-column">
              <span className="footer-column-title">Beneficiar donații</span>
              <div className="footer-logo-main footer-logo-main--oncohelp">
                <a href="https://oncohelp.ro" target="_blank" rel="noopener noreferrer">
                  <img src="/onco-help-logo-d.png" alt="Fundația OncoHelp" />
                </a>
              </div>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">Organizat de</span>
              <div className="footer-logo-main footer-logo-main--radio" data-fallback-text="Radio România Reșița">
                <a href="https://radioresita.ro" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/Logo Radio Romania Resita.svg"
                    alt="Radio România Reșița"
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
              <span className="footer-column-title">Sponsori și parteneri</span>
              <div className="footer-sponsor-grid">
                <a href="https://dacus.ro" target="_blank" rel="noopener noreferrer">
                  <img src="/dacus_logo_site.png" alt="Dacus" />
                </a>
                <a href="https://sky.ro" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/skyro-LOGO-6A-final -without tagline-01.png"
                    alt="Sky Radio"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="audio-section"
          aria-label="Ascultă piesa Muzică pentru Viață 2025"
        >
          <audio controls preload="none">
            <source src="/Muzică pentru Viață 2025.mp3" type="audio/mpeg" />
            Browserul dumneavoastră nu suportă redarea audio.
          </audio>
        </section>

        <section className="footer-legal">
          <div className="footer-legal-links">
            <NavLink to="/termeni-si-conditii" className="footer-legal-link">
              Termeni și condiții
            </NavLink>
            <span className="footer-legal-separator">|</span>
            <NavLink to="/politica-de-confidentialitate" className="footer-legal-link">
              Politica de confidențialitate
            </NavLink>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Muzică pentru Viață. Toate drepturile rezervate.
          </p>
        </section>
      </div>
    </footer>
  );
}

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        {/* Homepage with layout */}
        <Route path="/" element={<Layout><DonatePage /></Layout>} />
        <Route path="/donatii" element={<Layout><DonatePage /></Layout>} />

        {/* Routes with layout */}
        <Route path="/live" element={<Layout><LivePage /></Layout>} />
        <Route path="/galerie" element={<Layout><GalleryPage /></Layout>} />
        <Route path="/despre-oncohelp" element={<Layout><AboutOncohelpPage /></Layout>} />
        <Route path="/despre-resita" element={<Layout><AboutResitaPage /></Layout>} />
        <Route path="/multumiri" element={<Layout><WallPage /></Layout>} />
        <Route path="/multumiri/:donorName" element={<Layout><PersonalizedWallPage /></Layout>} />
        <Route path="/sponsori" element={<Layout><SponsorsPage /></Layout>} />
        <Route path="/mobile/:donorName" element={<Layout><MobileWallScreenshot /></Layout>} />

        {/* Terms and Conditions page - accessible without password */}
        <Route path="/termeni-si-conditii" element={<Layout><TermsAndConditionsPage /></Layout>} />

        {/* Privacy Policy page - accessible without password */}
        <Route path="/politica-de-confidentialitate" element={<Layout><PrivacyPolicyPage /></Layout>} />
      </Routes>

      <SiteFooter />

      {/* Global Radio Player - appears on all pages */}
      <GlobalRadioPlayer />
    </>
  );
}

export default App;
