import { Link, useLocation } from 'react-router-dom';
import { Tv, Compass } from 'lucide-react';
import './Header.css';

export default function Header() {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="brand-logo" aria-label="Episodic Início">
          <div className="logo-icon-wrapper">
            <Tv size={22} className="logo-icon" />
          </div>
          <span className="brand-name">Episodic</span>
          <span className="brand-badge">Discovery</span>
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Início
          </Link>
          <Link
            to="/descobrir"
            className={`nav-link ${location.pathname === '/descobrir' ? 'active' : ''}`}
          >
            <Compass size={16} />
            <span>Quiz de Descoberta</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
