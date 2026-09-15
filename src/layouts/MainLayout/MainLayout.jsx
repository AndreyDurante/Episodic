import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './MainLayout.css';

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="main-footer">
        <div className="footer-container">
          <p className="footer-text">
            <strong>Episodic</strong> — Seu assistente inteligente para descobrir o que assistir.
          </p>
          <p className="footer-disclaimer">
            Dados e imagens fornecidos em tempo real pela API oficial do The Movie Database (TMDB).
          </p>
        </div>
      </footer>
    </div>
  );
}
