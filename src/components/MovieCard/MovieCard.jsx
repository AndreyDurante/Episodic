import { Link } from 'react-router-dom';
import { Star, Film, Tv } from 'lucide-react';
import './MovieCard.css';

export default function MovieCard({
  id,
  title,
  poster,
  type = 'movie',
  year,
  rating,
  overview,
}) {
  const formattedRating = rating ? Number(rating).toFixed(1) : 'N/A';
  const isMovie = type === 'movie';

  return (
    <article className="movie-card">
      <Link to={`/filme/${id}`} className="movie-card-link" aria-label={`Ver detalhes de ${title}`}>
        <div className="movie-poster-wrapper">
          {poster ? (
            <img
              src={poster}
              alt={`Pôster de ${title}`}
              className="movie-poster-img"
              loading="lazy"
            />
          ) : (
            <div className="movie-poster-placeholder">
              {isMovie ? <Film size={40} /> : <Tv size={40} />}
              <span>Sem Imagem</span>
            </div>
          )}

          <div className="movie-poster-overlay">
            <span className="movie-type-badge">
              {isMovie ? 'Filme' : 'Série'}
            </span>
            {rating > 0 && (
              <span className="movie-rating-badge">
                <Star size={12} className="star-icon" fill="#AD1818" color="#AD1818" />
                {formattedRating}
              </span>
            )}
          </div>
        </div>

        <div className="movie-card-info">
          <div className="movie-meta-line">
            <span className="movie-year">{year || 'Ano não informado'}</span>
          </div>
          <h3 className="movie-title" title={title}>{title}</h3>
          {overview && (
            <p className="movie-overview-snippet">
              {overview.length > 110 ? `${overview.substring(0, 110)}...` : overview}
            </p>
          )}
          <span className="movie-details-cta">Ver detalhes →</span>
        </div>
      </Link>
    </article>
  );
}
