'use client';

import ThemeToggle from '@components/ThemeToggle';
import '@styles/header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <h1 className="header-title">
          <a href="/" className="header-logo" aria-label="Voltar para a página inicial">
            Faysk Crypto
          </a>
        </h1>

        {/* Navegação */}
        <nav className="header-nav" aria-label="Navegação Principal">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#prices" className="nav-link" aria-label="Ir para a seção de preços">
                Preços
              </a>
            </li>
            <li className="nav-item">
              <a href="#charts" className="nav-link" aria-label="Ir para a seção de gráficos">
                Gráficos
              </a>
            </li>
          </ul>
        </nav>

        {/* Alternador de Tema */}
        <ThemeToggle />
      </div>
    </header>
  );
}
