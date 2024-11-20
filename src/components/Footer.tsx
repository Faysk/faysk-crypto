import '@styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© 2024 Faysk Crypto. Todos os direitos reservados.</p>
        <nav className="footer-nav" aria-label="Navegação do Rodapé">
          <ul className="footer-links">
            <li className="footer-item">
              <a href="#about" className="footer-link" aria-label="Saiba mais sobre nós">Sobre</a>
            </li>
            <li className="footer-item">
              <a href="#contact" className="footer-link" aria-label="Entre em contato conosco">Contato</a>
            </li>
            <li className="footer-item">
              <a href="#privacy" className="footer-link" aria-label="Veja nossa política de privacidade">Política de Privacidade</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
