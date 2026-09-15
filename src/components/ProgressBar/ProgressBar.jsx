import './ProgressBar.css';

export default function ProgressBar({ currentStep = 1, totalSteps = 3 }) {
  const percentage = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <div className="quiz-progress-wrapper" aria-label={`Progresso do quiz: Etapa ${currentStep} de ${totalSteps}`}>
      <div className="quiz-progress-meta">
        <span className="step-badge">Etapa {currentStep} de {totalSteps}</span>
        <span className="step-percentage">{Math.round(percentage)}% concluído</span>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
