'use client';

import ThemeToggle from '@components/ThemeToggle';
import '@styles/header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">
          <a href="/" className="header-logo">
            Faysk Crypto
          </a>
        </h1>
        <nav className="header-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#prices" className="nav-link">
                Preços
              </a>
            </li>
            <li className="nav-item">
              <a href="#charts" className="nav-link">
                Gráficos
              </a>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
