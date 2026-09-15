import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from '../Button/Button';
import './ErrorMessage.css';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-state-container" role="alert">
      <div className="error-icon-box">
        <AlertCircle size={36} className="error-icon" />
      </div>
      <h3 className="error-title">Oops! Algo não saiu como esperado</h3>
      <p className="error-text">{message || 'Ocorreu um problema ao carregar os dados. Por favor, tente novamente.'}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" className="error-retry-btn">
          <RotateCcw size={18} />
          <span>Tentar Novamente</span>
        </Button>
      )}
    </div>
  );
}
