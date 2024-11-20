import '@styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© 2024 Faysk Crypto. Todos os direitos reservados.</p>
        <nav className="footer-nav" aria-label="Footer Navigation">
          <ul className="footer-links">
            <li className="footer-item">
              <a href="#about" className="footer-link">Sobre</a>
            </li>
            <li className="footer-item">
              <a href="#contact" className="footer-link">Contato</a>
            </li>
            <li className="footer-item">
              <a href="#privacy" className="footer-link">Política de Privacidade</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
