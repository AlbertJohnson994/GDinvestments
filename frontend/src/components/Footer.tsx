import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>💰</span>
            <h3 style={{ margin: 0 }}>GD Investimentos</h3>
          </div>
          <p>
            Sua plataforma completa para gerenciamento de investimentos e análise de ativos. 
            Tome decisões inteligentes com dados em tempo real.
          </p>
        </div>

        <div className="footer-section">
          <h3>Links Rápidos</h3>
          <ul className="footer-links">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Minha Carteira</a></li>
            <li><a href="#">Análises de Mercado</a></li>
            <li><a href="#">Relatórios</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Suporte</h3>
          <ul className="footer-links">
            <li><a href="#">Central de Ajuda</a></li>
            <li><a href="#">Fale Conosco</a></li>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Política de Privacidade</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contato</h3>
          <p>📧 contato@gdinvestimentos.com.br</p>
          <p>📞 (11) 99999-9999</p>
          <p>📍 São Paulo, SP</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="#" style={{ fontSize: '1.5rem', opacity: 0.8 }}>📸</a>
            <a href="#" style={{ fontSize: '1.5rem', opacity: 0.8 }}>💼</a>
            <a href="#" style={{ fontSize: '1.5rem', opacity: 0.8 }}>🐦</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} GD Investimentos. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
