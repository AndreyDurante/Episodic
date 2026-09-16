import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Sparkles,
  Compass,
  Film,
  Tv,
} from 'lucide-react';
import { getContentDetails } from '../../services/tmdb';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Button from '../../components/Button/Button';
import './Details.css';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const details = await getContentDetails(id);
      setMovie(details);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os detalhes do conteúdo selecionado.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const requestTimer = window.setTimeout(() => {
      void fetchDetails();
    }, 0);

    return () => window.clearTimeout(requestTimer);
  }, [fetchDetails]);

  const handleBack = () => {
    // Retorna para a página anterior mantendo os resultados da busca
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/resultados');
    }
  };

  const handleNewDiscovery = () => {
    navigate('/descobrir');
  };

  if (loading) {
    return (
      <div className="details-page-loading">
        <Loading message="Carregando ficha técnica completa e sinopse..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-page-error">
        <ErrorMessage message={error} onRetry={fetchDetails} />
        <Button variant="secondary" onClick={handleBack}>
          <ArrowLeft size={16} />
          <span>Voltar para as recomendações</span>
        </Button>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const isMovie = movie.type === 'movie';

  return (
    <div className="details-page">
      {/* Imagem de backdrop de alta imersão */}
      {movie.backdrop && (
        <div className="details-backdrop-wrapper">
          <img
            src={movie.backdrop}
            alt=""
            className="details-backdrop-img"
            aria-hidden="true"
          />
          <div className="details-backdrop-overlay" />
        </div>
      )}

      {/* Barra superior de navegação */}
      <nav className="details-nav-bar">
        <Button variant="secondary" onClick={handleBack} className="back-nav-btn">
          <ArrowLeft size={18} />
          <span>Voltar às recomendações</span>
        </Button>

        <Button variant="ghost" onClick={handleNewDiscovery} className="new-discovery-nav-btn">
          <Compass size={18} />
          <span>Nova Descoberta</span>
        </Button>
      </nav>

      {/* Conteúdo principal */}
      <article className="details-content-card">
        <div className="details-poster-column">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={`Pôster de ${movie.title}`}
              className="details-poster-img"
            />
          ) : (
            <div className="details-poster-placeholder">
              {isMovie ? <Film size={48} /> : <Tv size={48} />}
              <span>Sem Pôster</span>
            </div>
          )}
        </div>

        <div className="details-info-column">
          <div className="details-badges-row">
            <span className="details-type-badge">
              {isMovie ? 'Filme' : 'Série de TV'}
            </span>

            {movie.rating > 0 && (
              <span className="details-rating-badge">
                <Star size={16} fill="#AD1818" color="#AD1818" />
                <strong>{movie.rating.toFixed(1)}</strong>
                {movie.voteCount > 0 && (
                  <span className="details-vote-count">({movie.voteCount} votos)</span>
                )}
              </span>
            )}
          </div>

          <h1 className="details-title">{movie.title}</h1>

          {movie.originalTitle && movie.originalTitle !== movie.title && (
            <h2 className="details-original-title">Título original: {movie.originalTitle}</h2>
          )}

          {movie.tagline && (
            <p className="details-tagline">“{movie.tagline}”</p>
          )}

          {/* Metadados rápidos */}
          <div className="details-quick-meta">
            {movie.year && (
              <div className="meta-item">
                <Calendar size={16} className="meta-icon" />
                <span>{movie.year}</span>
              </div>
            )}
            <div className="meta-item">
              <Clock size={16} className="meta-icon" />
              <span>{movie.durationOrSeasons}</span>
            </div>
          </div>

          {/* Gêneros */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="details-genres-list">
              {movie.genres.map((g) => (
                <span key={g.id} className="genre-pill">
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {/* Sinopse */}
          <section className="details-synopsis-section">
            <h3 className="section-label">Sinopse</h3>
            <p className="details-overview-text">{movie.overview}</p>
          </section>

          {/* Ações do rodapé do card */}
          <div className="details-actions-footer">
            <Button variant="primary" onClick={handleNewDiscovery} className="action-btn">
              <Sparkles size={18} />
              <span>Buscar Outro Conteúdo</span>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
