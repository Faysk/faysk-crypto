'use client';

import { useEffect, useState } from 'react';
import '@styles/themeToggle.css';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Inicialização do tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  // Alternar tema
  const toggleTheme = () => {
    const htmlElement = document.documentElement;

    // Adiciona a classe de transição
    htmlElement.classList.add('transitioning');

    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    htmlElement.setAttribute('data-theme', newTheme);

    // Salvar no localStorage
    localStorage.setItem('theme', newTheme);

    // Remove a classe após o efeito
    setTimeout(() => {
      htmlElement.classList.remove('transitioning');
    }, 500); // 500ms corresponde ao tempo de transição
  };


  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Ativar modo ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
      <span className="theme-text">
        {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
      </span>
    </button>
  );
}
