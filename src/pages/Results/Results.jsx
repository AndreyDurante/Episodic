import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw, Sparkles, Tag } from 'lucide-react';
import { getRecommendations } from '../../services/tmdb';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import EmptyState from '../../components/EmptyState/EmptyState';
import Button from '../../components/Button/Button';
import './Results.css';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Preferências vindas do Discover via React Router state
  const preferences = location.state?.preferences || {
    type: 'movie',
    typeLabel: 'Filme',
    genre: 28,
    genreLabel: 'Ação & Aventura',
    mood: 'tense',
    moodLabel: 'Para roer as unhas',
  };

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await getRecommendations({
        type: preferences.type,
        genre: preferences.genre,
        mood: preferences.mood,
      });
      setMovies(results);
    } catch (err) {
      setError(err.message || 'Falha ao buscar recomendações.');
    } finally {
      setLoading(false);
    }
  }, [preferences.type, preferences.genre, preferences.mood]);

  useEffect(() => {
    const requestTimer = window.setTimeout(() => {
      void fetchRecommendations();
    }, 0);

    return () => window.clearTimeout(requestTimer);
  }, [fetchRecommendations]);

  const handleRestartQuiz = () => {
    navigate('/descobrir');
  };

  return (
    <div className="results-page">
      <header className="results-header">
        <div className="results-header-info">
          <div className="results-badge">
            <Sparkles size={16} />
            <span>Seleção Personalizada</span>
          </div>
          <h1 className="results-title">O que assistir hoje</h1>
          <p className="results-subtitle">
            Selecionamos as melhores opções com base no que você escolheu no quiz:
          </p>

          <div className="preferences-chips-row">
            <span className="pref-chip">
              <Tag size={13} />
              <strong>Formato:</strong> {preferences.typeLabel}
            </span>
            <span className="pref-chip">
              <Tag size={13} />
              <strong>Gênero:</strong> {preferences.genreLabel}
            </span>
            <span className="pref-chip">
              <Tag size={13} />
              <strong>Vibe:</strong> {preferences.moodLabel}
            </span>
          </div>
        </div>

        <div className="results-header-actions">
          <Button variant="secondary" onClick={handleRestartQuiz} className="restart-quiz-btn">
            <RotateCcw size={16} />
            <span>Refazer Quiz</span>
          </Button>
        </div>
      </header>

      <section className="results-content-area">
        {loading && <Loading message="Consultando o catálogo TMDB e cruzando suas preferências..." />}

        {!loading && error && (
          <ErrorMessage
            message={error}
            onRetry={fetchRecommendations}
          />
        )}

        {!loading && !error && movies.length === 0 && (
          <EmptyState
            message="Não encontramos nenhum filme ou série correspondente para esta combinação de filtros no catálogo."
            action={
              <Button variant="primary" onClick={handleRestartQuiz}>
                <RotateCcw size={18} />
                <span>Tentar com outras preferências</span>
              </Button>
            }
          />
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="results-grid-wrapper">
            <div className="results-count-line">
              <span>{movies.length} títulos encontrados com alta relevância</span>
            </div>
            <MovieGrid movies={movies} />
          </div>
        )}
      </section>
    </div>
  );
}
