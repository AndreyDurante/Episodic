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
          Descubra o filme ou série ideal em <span className="title-highlight">menos de 1 minuto</span>
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
      </section>

    </div>
  );
}
