import { Loader2 } from 'lucide-react';
import './Loading.css';

export default function Loading({ message = 'Buscando recomendações para você...' }) {
  return (
    <div className="loading-state-container" role="status" aria-live="polite">
      <div className="loading-spinner-wrapper">
        <Loader2 className="loading-spinner-icon" size={48} />
      </div>
      <p className="loading-message">{message}</p>
      <span className="loading-subtext">Consultando catálogo oficial do TMDB</span>
    </div>
  );
}
