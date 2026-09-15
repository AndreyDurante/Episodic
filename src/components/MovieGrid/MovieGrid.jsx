import MovieCard from '../MovieCard/MovieCard';
import './MovieGrid.css';

export default function MovieGrid({ movies = [] }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="movie-grid-container">
      {movies.map((movie) => (
        <MovieCard
          key={`${movie.type || 'item'}-${movie.id}`}
          id={movie.id}
          title={movie.title}
          poster={movie.poster}
          type={movie.type}
          year={movie.year}
          rating={movie.rating}
          genres={movie.genres}
          overview={movie.overview}
        />
      ))}
    </div>
  );
}
