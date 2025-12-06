import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import DonatePage from './pages/DonatePage.jsx';
import LivePage from './pages/LivePage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import AboutOncohelpPage from './pages/AboutOncohelpPage.jsx';
import WallPage from './pages/WallPage.jsx';
import PersonalizedWallPage from './pages/PersonalizedWallPage.jsx';
import SponsorsPage from './pages/SponsorsPage.jsx';
import MobileWallScreenshot from './pages/MobileWallScreenshot.jsx';

function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <img
          src="/Logo Muzica pentru viata.svg"
          alt="Muzică pentru Viață"
          className="logo-main-top"
        />
      </header>

      <nav className="site-nav" aria-label="Navigație principală">
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
              Galerie
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
              to="/multumiri"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Peretele Eroilor
            </NavLink>

            <NavLink
              to="/sponsori"
              className={({ isActive }) =>
                'site-nav-link' + (isActive ? ' site-nav-link-active' : '')
              }
            >
              Sponsori
            </NavLink>
          </div>

          <a
            className="btn-primary nav-donate"
            href="https://oncohelp.ro/donatii/"
            target="_blank"
            rel="noopener noreferrer"
          >
            DONEAZĂ ACUM
          </a>
        </div>
      </nav>

      <main className="app-shell-main">{children}</main>

      <footer className="app-footer">
        <section
          className="audio-section"
          aria-label="Ascultă piesa Muzică pentru Viață 2025"
        >
          <audio controls preload="none">
            <source src="/Muzică pentru Viață 2025.mp3" type="audio/mpeg" />
            Browserul dumneavoastră nu suportă redarea audio.
          </audio>
        </section>
      </footer>
    </div>
  );
}

function PasswordProtected({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Muzic@PentruViat@2025') {
      setIsAuthenticated(true);
      localStorage.setItem('authenticated', 'true');
    } else {
      setError('Parolă incorectă');
    }
  };

  React.useEffect(() => {
    const auth = localStorage.getItem('authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        padding: '20px'
      }}>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '300px',
          width: '100%'
        }}>
          <h2 style={{ textAlign: 'center', color: '#d81b60' }}>Acces restricționat</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Introduceți parola"
            style={{
              padding: '12px',
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              fontSize: '16px'
            }}
            required
          />
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <button type="submit" style={{
            padding: '12px',
            background: '#d81b60',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Accesează
          </button>
        </form>
      </div>
    );
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Homepage without layout */}
      <Route path="/" element={<DonatePage />} />
      <Route path="/donatii" element={<DonatePage />} />

      {/* Protected routes with layout */}
      <Route path="/live" element={
        <PasswordProtected>
          <Layout><LivePage /></Layout>
        </PasswordProtected>
      } />
      <Route path="/galerie" element={
        <PasswordProtected>
          <Layout><GalleryPage /></Layout>
        </PasswordProtected>
      } />
      <Route path="/despre-oncohelp" element={
        <PasswordProtected>
          <Layout><AboutOncohelpPage /></Layout>
        </PasswordProtected>
      } />
      <Route path="/multumiri" element={
        <PasswordProtected>
          <Layout><WallPage /></Layout>
        </PasswordProtected>
      } />
      <Route path="/multumiri/:donorName" element={
        <PasswordProtected>
          <Layout><PersonalizedWallPage /></Layout>
        </PasswordProtected>
      } />
      <Route path="/sponsori" element={
        <PasswordProtected>
          <Layout><SponsorsPage /></Layout>
        </PasswordProtected>
      } />
      <Route path="/mobile/:donorName" element={
        <PasswordProtected>
          <Layout><MobileWallScreenshot /></Layout>
        </PasswordProtected>
      } />

      {/* Fallback to homepage */}
      <Route path="*" element={<DonatePage />} />
    </Routes>
  );
}

export default App;