import { Link } from 'react-router-dom';
import { Film, Tv } from 'lucide-react';
import './MonthlyMostWatched.css';

function RankingSkeleton() {
  return (
    <article className="monthly-ranking-card monthly-ranking-skeleton" aria-hidden="true">
      <div className="monthly-ranking-skeleton-poster" />
      <div className="monthly-ranking-skeleton-title" />
    </article>
  );
}

export default function MonthlyMostWatched({ items, loading, error }) {
  return (
    <section className="monthly-most-watched" aria-labelledby="monthly-most-watched-title" aria-busy={loading}>
      <div className="monthly-most-watched-heading">
        <p className="monthly-most-watched-eyebrow">Em alta agora</p>
        <h2 id="monthly-most-watched-title">Mais assistidos do mês</h2>
      </div>

      {loading && (
        <div className="monthly-ranking-grid" aria-label="Carregando mais assistidos">
          {[1, 2, 3].map((position) => <RankingSkeleton key={position} />)}
        </div>
      )}

      {!loading && error && (
        <p className="monthly-ranking-error" role="status">
          Não foi possível carregar os mais assistidos agora. Tente novamente em alguns instantes.
        </p>
      )}

      {!loading && !error && (
        <div className="monthly-ranking-grid">
          {items.map((item) => {
            const isMovie = item.type === 'movie';
            const MediaIcon = isMovie ? Film : Tv;

            return (
              <article className="monthly-ranking-card" key={`${item.type}-${item.id}`}>
                <Link
                  to={isMovie ? `/filme/${item.id}` : `/serie/${item.id}`}
                  state={{ type: item.type, from: '/', backLabel: 'Voltar para a Home' }}
                  className="monthly-ranking-link"
                  aria-label={`Ver detalhes de ${item.title}`}
                >
                  <div className="monthly-ranking-poster-wrapper">
                    <span className="monthly-ranking-position">{item.rankPosition}º</span>
                    {item.poster ? (
                      <img
                        src={item.poster}
                        alt={`Pôster de ${item.title}`}
                        className="monthly-ranking-poster"
                        loading="lazy"
                      />
                    ) : (
                      <div className="monthly-ranking-poster-placeholder">
                        <MediaIcon size={40} aria-hidden="true" />
                        <span>{isMovie ? 'Filme' : 'Série'}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="monthly-ranking-title" title={item.title}>{item.title}</h3>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
