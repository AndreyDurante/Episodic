import { Film } from 'lucide-react';
import './EmptyState.css';

export default function EmptyState({
  message = 'Nenhum título foi encontrado para a combinação selecionada.',
  action,
}) {
  return (
    <div className="empty-state-container">
      <div className="empty-icon-box">
        <Film size={40} className="empty-icon" />
      </div>
      <h3 className="empty-title">Nenhum resultado encontrado</h3>
      <p className="empty-message">{message}</p>
      {action && <div className="empty-action-wrapper">{action}</div>}
    </div>
  );
}
