import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Film, Zap, CheckCircle2 } from 'lucide-react';
import Button from '../../components/Button/Button';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const handleStartDiscovery = () => {
    navigate('/descobrir');
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={16} className="hero-badge-icon" />
          <span>Fim da dúvida do que assistir</span>
        </div>

        <h1 className="hero-title">
          Descubra o filme ou série ideal em <span className="title-gradient">menos de 1 minuto</span>
        </h1>

        <p className="hero-description">
          Cansado de passar horas rolando o catálogo sem escolher nada? O <strong>Episodic</strong> faz
          um quiz rápido de 3 perguntas sobre suas preferências de hoje e recomenda as melhores opções com dados reais.
        </p>

        <div className="hero-cta-group">
          <Button onClick={handleStartDiscovery} variant="primary" className="hero-cta-btn">
            <Compass size={20} />
            <span>Encontrar algo para assistir</span>
          </Button>
        </div>

        <div className="hero-highlights">
          <div className="highlight-item">
            <CheckCircle2 size={16} className="highlight-icon" />
            <span>100% Gratuito e sem cadastro</span>
          </div>
          <div className="highlight-item">
            <Zap size={16} className="highlight-icon" />
            <span>Quiz rápido em 3 etapas</span>
          </div>
          <div className="highlight-item">
            <Film size={16} className="highlight-icon" />
            <span>Catálogo oficial TMDB</span>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2 className="section-title">Como funciona a descoberta</h2>
        <div className="steps-cards-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Escolha o Formato</h3>
            <p>Selecione se hoje é dia de maratonar uma série envolvente ou curtir um filme fechado.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Defina o Gênero</h3>
            <p>Selecione seu gênero favorito: ação, comédia, drama, ficção, suspense ou animação.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Sintonize a Vibe</h3>
            <p>Indique o clima da sua sessão: relaxar, rir, roer as unhas ou se emocionar.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
