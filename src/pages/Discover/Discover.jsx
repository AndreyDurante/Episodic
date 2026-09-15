import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Film,
  Tv,
  Zap,
  Smile,
  Heart,
  Sparkles,
  Compass,
  ArrowLeft,
  ArrowRight,
  Flame,
} from 'lucide-react';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import QuizQuestion from '../../components/QuizQuestion/QuizQuestion';
import Button from '../../components/Button/Button';
import './Discover.css';

export default function Discover() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState('movie');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);

  // Pergunta 1: Tipo de Conteúdo
  const typeOptions = [
    {
      value: 'movie',
      label: 'Filme',
      icon: Film,
      description: 'Uma história fechada com início, meio e fim em uma única sessão.',
    },
    {
      value: 'tv',
      label: 'Série de TV',
      icon: Tv,
      description: 'Múltiplos episódios e temporadas envolventes para maratonar.',
    },
  ];

  // Pergunta 2: Gêneros (Ajusta IDs dependendo de Filme ou Série)
  const isTv = contentType === 'tv';
  const genreOptions = [
    {
      value: isTv ? 10759 : 28,
      label: 'Ação & Aventura',
      icon: Zap,
      description: 'Adrenalina, perseguições épicas e ritmo acelerado.',
    },
    {
      value: 35,
      label: 'Comédia',
      icon: Smile,
      description: 'Para rir muito e aliviar as tensões do dia a dia.',
    },
    {
      value: 18,
      label: 'Drama',
      icon: Heart,
      description: 'Narrativas intensas, desenvolvimento profundo de personagens.',
    },
    {
      value: isTv ? 10765 : 878,
      label: 'Ficção Científica',
      icon: Sparkles,
      description: 'Futurismo, exploração espacial, tecnologia e mistérios cósmicos.',
    },
    {
      value: 53,
      label: 'Suspense & Mistério',
      icon: Flame,
      description: 'Clima tenso, investigações e reviravoltas inesperadas.',
    },
    {
      value: 16,
      label: 'Animação',
      icon: Film,
      description: 'Produções visuais artísticas que encantam públicos de todas as idades.',
    },
  ];

  // Pergunta 3: Clima da sessão (Vibe)
  const moodOptions = [
    {
      value: 'light',
      label: 'Para relaxar e rir',
      icon: Smile,
      description: 'Histórias descontraídas, alto astral e sem preocupações.',
    },
    {
      value: 'tense',
      label: 'Para roer as unhas',
      icon: Zap,
      description: 'Tensão constante, ritmo inquietante e surpresas.',
    },
    {
      value: 'emotional',
      label: 'Para se emocionar',
      icon: Heart,
      description: 'Enredos tocantes que provocam reflexão e lágrimas.',
    },
    {
      value: 'mindblowing',
      label: 'Para explodir a mente',
      icon: Sparkles,
      description: 'Tramas inteligentes e finais que vão te deixar pensando por dias.',
    },
  ];

  // Determina se o botão "Continuar" deve ficar ativo no passo atual
  const canContinue = () => {
    if (step === 1) return Boolean(contentType);
    if (step === 2) return Boolean(selectedGenre);
    if (step === 3) return Boolean(selectedMood);
    return false;
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finalização do quiz: consolidar preferências e navegar para resultados
      const genreObj = genreOptions.find((g) => g.value === selectedGenre);
      const moodObj = moodOptions.find((m) => m.value === selectedMood);

      const preferences = {
        type: contentType,
        typeLabel: contentType === 'tv' ? 'Série' : 'Filme',
        genre: selectedGenre,
        genreLabel: genreObj ? genreObj.label : 'Qualquer Gênero',
        mood: selectedMood,
        moodLabel: moodObj ? moodObj.label : 'Qualquer Clima',
      };

      navigate('/resultados', { state: { preferences } });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="discover-page">
      <ProgressBar currentStep={step} totalSteps={3} />

      <div className="quiz-card-wrapper">
        {step === 1 && (
          <QuizQuestion
            question="O que você está com vontade de assistir hoje?"
            description="Escolha o formato ideal para o seu momento de lazer."
            options={typeOptions}
            selectedOption={contentType}
            onSelect={(val) => setContentType(val)}
          />
        )}

        {step === 2 && (
          <QuizQuestion
            question="Qual gênero melhor define o seu gosto agora?"
            description={`Selecione uma categoria temática favorita para o seu ${contentType === 'tv' ? 'seriado' : 'filme'}.`}
            options={genreOptions}
            selectedOption={selectedGenre}
            onSelect={(val) => setSelectedGenre(val)}
          />
        )}

        {step === 3 && (
          <QuizQuestion
            question="Qual é a vibe ou clima que você deseja para a sessão?"
            description="Ajuste o tom emocional das sugestões que vamos selecionar para você."
            options={moodOptions}
            selectedOption={selectedMood}
            onSelect={(val) => setSelectedMood(val)}
          />
        )}

        <div className="quiz-actions-bar">
          <Button variant="ghost" onClick={handlePrev} className="quiz-nav-btn">
            <ArrowLeft size={18} />
            <span>{step === 1 ? 'Voltar ao Início' : 'Pergunta Anterior'}</span>
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!canContinue()}
            className="quiz-nav-btn"
          >
            <span>{step === 3 ? 'Buscar Recomendações' : 'Próxima Pergunta'}</span>
            {step === 3 ? <Compass size={18} /> : <ArrowRight size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
